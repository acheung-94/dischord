import { useParams } from 'react-router-dom';
import './middle.css'
import { useDispatch, useSelector } from 'react-redux';
import { currentChannel } from '../../store/channelReducer';
import { useEffect } from 'react';
import { getChannelMessages, currentMessages, addMessage, deleteMessage } from '../../store/messageReducer';
import MessageList from '../messageList/messageList';
import MessageForm from '../messageForm/messageForm';
import { selectCurrentUser } from '../../store/sessionReducer';

import consumer from '../../utils/consumer';


const Middle = ({type}) => {
    // STATE
    const dispatch = useDispatch()
    const { channelId } = useParams()
    const messages = useSelector(currentMessages)
    const channel = useSelector(currentChannel(channelId))
    const currentUser = useSelector(selectCurrentUser)
    // POST-RENDER
    useEffect(() => {
        if (type === 'channel') {
            console.log('firing useEffect from middle!')
            dispatch(getChannelMessages(channelId))
            const sub = consumer.subscriptions.create( {
                channel: 'ChannelsChannel',
                channelId
            }, {
                received(message){
                    console.log(message)
                    if (message.type === 'delete'){
                        console.log('message has been destroyed!')
                        dispatch(deleteMessage(message.messageId))
                    }else{
                        console.log('received this message')
                        dispatch(addMessage(message))
                    }
                }
            })
            return () => consumer.subscriptions.remove(sub)
        }
    }, [channelId])
    // RENDER
    
    if ( type === 'channel') { // yikers there's gotta be a simpler way of ensuring channel and messages
        if (channel && messages) {
            // console.log(channel)
            return(
                <div className="middle-base">
                    <MessageList currentUser = {currentUser}
                        messages = {messages}
                         channel={channel} />
                    <MessageForm channel={channel} currentUser={currentUser} />
                </div>
            )
        }
    }else if (type === '@me') {
        return (
            <div className="middle-base">
                <h1>Placeholder for friends list ?</h1>
            </div>
        )
    }


}


export default Middle;