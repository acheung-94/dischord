import { useDispatch } from 'react-redux'
import './messageForm.css'
import { useState } from 'react'
import { createMessage } from '../../store/messageReducer'

const MessageForm = ({channel, currentUser}) => {
    const dispatch = useDispatch()
    const [message, setMessage] = useState({
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

    const handleSubmit = (e) => {
        console.log(e)
        e.preventDefault()
        if (message.body){
            dispatch(createMessage(message))
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
                <img src="/src/assets/icons/chatAttachment.png" />
                <input type="textarea"
                    className='message-input'
                    onChange={handleChange}
                    value={message.body}
                    onKeyDown={handleKeyPress}
                    placeholder={`Message #${channel.name}...`}/>
            </form>
        </div>
    )
}

export default MessageForm;