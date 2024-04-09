import { useState } from 'react';
import { removeMessage } from '../../store/messageReducer';

import './messageItem.css'
import { useDispatch } from 'react-redux'
import MessageForm from '../messageForm/messageForm';
const MessageItem = ({message, currentUser}) => {
    const dispatch = useDispatch()
    const [messageState, setMessageState] = useState(false)
    const handleDelete = () => {
        dispatch(removeMessage(message.id))
    }

    const handleEdit = () => {
        setMessageState('edit')
    }

    return(
        <>
        <div className='message-item'>
            <div className='message-body'>
                <span className='message-header'>
                    <p className='message-time'>{message.timestamp}</p>
                    <h4 className='message-author'> {message.author} </h4>
                </span>  
            {!messageState ? (message.body) : 
            <MessageForm oldMessage={message} 
                messageState={messageState} 
                setMessageState={setMessageState}/> }
            
        {message.attachmentUrl && (
            <div className="message-attachment">
                <img src={message.attachmentUrl}/>
            </div>
        )}</div>
        <span className='message-options'>
            {
                currentUser.id === message.authorId && (
                    <>
                    <img src="/src/assets/icons/icon-edit.png"
                        className="message-edit" 
                        onClick={handleEdit}/>
                    <img src="/src/assets/icons/guildDeleteServer.png" 
                        className="message-delete"
                        onClick={handleDelete} />
                    </>
                )
            }
        </span>
        </div>
        </>
    )
}

export default MessageItem;