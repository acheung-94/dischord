import './messageList.css'
import MessageItem from '../messageItem/messageItem';
const MessageList = ( {messages, currentUser, channel}) => {

    return(

        <div className="message-list">
            <div className="message-list-inner">
                <div className="new-channel-thing">
                    <img src="/src/assets/icons/channelTextWhite.png" />
                </div>
                <h1 className='message-list-welcome'>
                    Welcome to #{channel.name}!
                </h1>
                <p className='message-start'>This is the start of the #{channel.name} channel.</p>
                <span className="list-separator"></span>
                { messages.map( (message, idx) => {
                    if (idx === 0 || message.date !== messages[idx - 1].date){
                        return (
                            <>
                            <span className="list-separator"> 
                                <span></span>
                                <div>{message.date} </div>
                                <span></span>
                            </span>
                            <MessageItem key = {message.id} 
                                            message={message} 
                                            currentUser={currentUser} 
                                            channel={channel}/>
                            </>
                        )
                    }else{
                        return (
                            <MessageItem key = {message.id} 
                                            message={message} 
                                            currentUser={currentUser} 
                                            channel={channel}/>
                        )
                    }
                }) }

            </div>
        </div>
    )
}

export default MessageList;
