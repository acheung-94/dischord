import './messageList.css'
import MessageItem from '../messageItem/messageItem';
const MessageList = ( {messages, channelId, channel}) => {

    return(

        <div className="message-list">
            <div className="message-list-inner">
                <div className="new-channel-thing">
                    <img src="/src/assets/icons/channelTextWhite.png" />
                </div>
                <h1 className='message-list-welcome'>
                    Welcome to #{channel.name}!
                </h1>
                <p>This is the start of the #{channel.name} channel.</p>
                <span className="list-separator"></span>
                { messages.map( message => (
                    <MessageItem message={message}/>
                )) }

            </div>
        </div>
    )
}

export default MessageList;