import { useDispatch } from 'react-redux'
import './messageForm.css'
import { useParams } from 'react-router-dom';
import { selectCurrentUser } from '../../store/sessionReducer'
import { useEffect, useState } from 'react'
import { currentChannel } from '../../store/channelReducer';
import { createMessage } from '../../store/messageReducer'
import { useSelector } from 'react-redux';
const MessageForm = ({messageState, oldMessage, setMessageState }) => {
    const dispatch = useDispatch()
    const { channelId } = useParams()
    const currentUser = useSelector(selectCurrentUser)
    const channel = useSelector(currentChannel(channelId))
    const [message, setMessage] = useState(
        messageState ? oldMessage : {
            body: '',
            authorId: currentUser.id,
            channelId: channel.id
    })


    const handleChange = (e) => {
        setMessage( old => ({
            ...old,
            body: e.target.value
        }))
    }
    useEffect(()=>{
        //make sure to reset the state since it doesn't automatically change with channel ... or does it
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
        if (message.body){
            if (messageState) {
                
                dispatch(updateMessage(message))
                setMessageState(false)
            
            }else{
                dispatch(createMessage(message))
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
                    (<img src="/src/assets/icons/chatAttachment.png" />)}
                    
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
