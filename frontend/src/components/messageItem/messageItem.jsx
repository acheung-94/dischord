import './messageItem.css'

const MessageItem = ({message}) => {

    return(
        <div className='message-item'>
            <p className='message-time'>{message.timestamp}</p>
            <h4 className='message-author'> {message.author} </h4>
            <p className='message-body'>{message.body}</p>
        </div>
    )
}

export default MessageItem;