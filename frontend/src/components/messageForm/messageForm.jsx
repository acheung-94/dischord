import { useDispatch } from 'react-redux'
import './messageForm.css'
import { selectCurrentUser } from '../../store/sessionReducer'
import { useEffect, useRef, useState } from 'react'

import { createMessage, updateMessage } from '../../store/messageReducer'
import { useSelector } from 'react-redux';
const MessageForm = ({messageState, oldMessage, setMessageState, channel }) => {
    const dispatch = useDispatch()
    const attachRef = useRef()
    const currentUser = useSelector(selectCurrentUser)
    const msgRef = useRef()

    const [filePreview, setFilePreview] = useState(null)
    const [message, setMessage] = useState(
        messageState ? oldMessage : {
            body: '',
            authorId: currentUser.id,
            channelId: channel.id,
            attachment: null
    })


    const handleChange = (e) => {
        setMessage( old => ({
            ...old,
            body: e.target.value
        }))

    }
    const triggerUpload = () => attachRef.current.click()
    const handleFile = (e) => {
        const file = e.currentTarget.files[0]
        setMessage( old => ( {...old, attachment : file } ))
        setFilePreview(URL.createObjectURL(file))
    }

    useEffect(()=>{

        let newchannel = channel
        if(currentUser && channel){
            if (messageState) {
                setMessage(oldMessage)
                setFilePreview(null)
            }else{
                setMessage( old => ({
                    ...old,
                    body: '',
                    channelId: newchannel.id
                }))
                setFilePreview(null)

            }
        }
        
    }, [channel])

    useEffect( () => {
        msgRef.current.focus()
    }, [])

    const handleSubmit = (e) => {
        
        e.preventDefault()
        let messageFormObj = new FormData()
        messageFormObj.append('message[body]', message.body)
        messageFormObj.append('message[authorId]', message.authorId)
        messageFormObj.append('message[channelId]', message.channelId)

        if (message.attachment){
            messageFormObj.append('message[attachment]', message.attachment)
        }
        if (message.body){
            if (messageState) {
                dispatch(updateMessage(messageFormObj, oldMessage.id))
                setMessageState(false)
            
            }else{
                dispatch(createMessage(messageFormObj))
                setFilePreview(null)
            }
            setMessage(old => ({...old, body: '', attachment: null}))
        }
    }

    const handleKeyPress = e => {
        e.stopPropagation();
        if (e.shiftKey && e.key == 'Enter') {
            e.preventDefault()
            // enter new line... but how?
            setMessage(old => ({...old, body: `${old.body}\n`}))
        }
        if (e.keyCode === 27){ // press esc to cancel edit
            setMessageState(false)
        }
    }

    const handleDetach = e => {
        e.stopPropagation()
        setFilePreview(null)
        setMessage(old => ({...old, attachment: null}))
    }
        return(
            <div className='message-form-wrapper'>
                {filePreview && (
                    <div className="attachment-preview">
                        <div className='preview-wrapper'>
                            <img  src={filePreview} />
                            <span className='delete-attach' onClick={handleDetach}> <img src="https://dischord-clone-seeds.s3.us-west-1.amazonaws.com/icons/chatContextMenuDeleteMessage.png" /></span>
                         </div>
                    </div>
                )}
                <form className="message-form" onSubmit={handleSubmit}>
                    { !messageState && 
                    (<>
                    <input type="file" className='hidden-message-input' ref={attachRef} onChange={handleFile} />
                    <img className='upload-attachment' src="https://dischord-clone-seeds.s3.us-west-1.amazonaws.com/icons/chatAttachment.png" onClick={triggerUpload} />
                    </>)}
                    
                    <input type="textarea"
                        className='message-input'
                        onChange={handleChange}
                        value={message.body}
                        onKeyDown={handleKeyPress}
                        ref={ msgRef }
                        placeholder={ messageState ? '' : `Message #${channel.name}...`}/>
                </form>
                { messageState && (
                <p className='edit-inst'> 
                    <span>escape</span> to cancel • <span>enter</span> to save 
                </p>)}
            </div>
        )

}

export default MessageForm;
