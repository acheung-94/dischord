import { useDispatch } from 'react-redux'
import './messageForm.css'
import { useEffect, useState } from 'react'
import { createMessage } from '../../store/messageReducer'

const MessageForm = ({channel, currentUser, messageState, oldMessage, setMessageState }) => {
    const dispatch = useDispatch()
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
        //make sure to reset the state since it doesn't automatically change with channel
        setMessage({
            body: '',
            authorId: currentUser.id,
            channelId: channel.id
    })
    }, [channel])


    const handleSubmit = (e) => {
        
        e.preventDefault()
        if (message.body){
            if (messageState) {
                
                dispatch(updateMessage(message))
                setMessageState(false)
            
            }else{
                console.log(messageState)
                console.log(channel.id)
                dispatch(createMessage(message))
            }
            setMessage(old => ({...old, body: ''}))
        }
    }

    const handleKeyPress = e => {
        if (e.shiftKey && e.key == 'Enter') {
            e.preventDefault()
            // enter new line... but how?
            console.log('yer')
            setMessage(old => ({...old, body: `${old.body}\n`}))
            console.log(message)
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
        </div>
    )
}

export default MessageForm;
