import './messageItem.css'

const MessageItem = ({message}) => {

    return(
        <div className='message-item'>
            
            <p className='message-body'>
                <div className='message-header'>
                    <p className='message-time'>{message.timestamp}</p>
                    <h4 className='message-author'> {message.author} </h4>
                </div>  
            {message.body}
            </p>
        </div>
    )
}

export default MessageItem;