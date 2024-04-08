import { useDispatch } from 'react-redux'
import './messageForm.css'
import { useParams } from 'react-router-dom';
import { selectCurrentUser } from '../../store/sessionReducer'
import { useEffect, useRef, useState } from 'react'
import { currentChannel } from '../../store/channelReducer';
import { createMessage } from '../../store/messageReducer'
import { useSelector } from 'react-redux';
const MessageForm = ({messageState, oldMessage, setMessageState }) => {
    const dispatch = useDispatch()
    const { channelId } = useParams()
    const attachRef = useRef()
    const currentUser = useSelector(selectCurrentUser)
    const channel = useSelector(currentChannel(channelId))
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
        console.log(message)
    }
    const triggerUpload = () => attachRef.current.click()
    const handleFile = (e) => {
        const file = e.currentTarget.files[0]
        setMessage( old => ( {...old, attachment : file } ))
    }

    useEffect(()=>{
        //make sure to update the state between channels
        if(currentUser && channel){
            if (messageState) {
                setMessage(oldMessage)
            }else{
                setMessage( old => ({
                    ...old,
                    body: ''
                }))
            }
        }
    }, [channel])


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
            }
            setMessage(old => ({...old, body: ''}))
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

        return(
            <div className='message-form-wrapper'>
                <form className="message-form" onSubmit={handleSubmit}>
                    { !messageState && 
                    (<>
                    <input type="file" className='hidden-message-input' ref={attachRef} onChange={handleFile} />
                    <img className='upload-attachment' src="/src/assets/icons/chatAttachment.png" onClick={triggerUpload} />
                    </>)}
                    
                    <input type="textarea"
                        className='message-input'
                        onChange={handleChange}
                        value={message.body}
                        onKeyDown={handleKeyPress}
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
