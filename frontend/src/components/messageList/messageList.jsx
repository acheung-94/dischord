import './messageList.css'
import MessageItem from '../messageItem/messageItem';
import { Fragment } from 'react';

const MessageList = ( {messages, currentUser, channel}) => {
    const conditionalTimestamp = (message, idx) => {
        let diffTime = message.timestamp !== messages[idx-1].timestamp
        let diffUser = message.authorId !== messages[idx-1].authorId
        return ( diffTime || diffUser)
    }
    return(

        <div className="message-list">
            <div className="message-list-inner">
                <div className="new-channel-thing">
                    <img src="https://dischord-clone-seeds.s3.us-west-1.amazonaws.com/icons/channelTextWhite.png" />
                </div>
                <h1 className='message-list-welcome'>
                    Welcome to #{channel.name}!
                </h1>
                <p className='message-start'>This is the start of the #{channel.name} channel.</p>
                <span className="list-separator"></span>
                { messages.map( (message, idx) => {
                    if (idx === 0 || message.date !== messages[idx - 1].date){
                        return (
                            <Fragment key = {message.id}>
                                <span  className="list-separator"> 
                                    <span></span>
                                    <div>{message.date} </div>
                                    <span></span>
                                </span>
                                <MessageItem message={message} 
                                            currentUser={currentUser} 
                                            channel={channel}
                                            newTime={true}
                                            isLast={(idx === messages.length-1) ? true : false}
                                            />
                            </Fragment>
                        )
                    }else{
                        return (
                            <MessageItem key = {message.id} 
                                        message={message} 
                                        currentUser={currentUser} 
                                        channel={channel}
                                        isLast={(idx === messages.length-1) ? true : false}
                                        newTime={conditionalTimestamp(message, idx) ? true : false}/>
                        )
                    }
                }) }

            </div>
        </div>
    )
}

export default MessageList;
