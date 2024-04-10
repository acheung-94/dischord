import { useParams } from 'react-router-dom';
import './middle.css'
import { useDispatch, useSelector } from 'react-redux';
import { currentChannel } from '../../store/channelReducer';
import { useEffect } from 'react';
import { getChannelMessages, currentMessages, addMessage, deleteMessage } from '../../store/messageReducer';
import MessageList from '../messageList/messageList';
import MessageForm from '../messageForm/messageForm';
import { selectCurrentUser } from '../../store/sessionReducer';
import Right from '../right/right';
import consumer from '../../utils/consumer';
import { setPanel } from '../../store/uiReducer';
import FriendsList from '../friendsList/friendsList';

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

            dispatch(getChannelMessages(channelId))
            const sub = consumer.subscriptions.create( {
                channel: 'ChannelsChannel',
                channelId
            }, {
                received(message){
                    if (message.type === 'delete'){
                        dispatch(deleteMessage(message.messageId))
                    }else{
                        dispatch(addMessage(message))
                    }
                }
            })
            return () => consumer.subscriptions.remove(sub)
        }
    }, [channelId])

    useEffect(() => {
        if(type === '@me'){
            dispatch(setPanel())
        }
    }, [])
    

    // RENDER
    
    if ( type === 'channel') { // yikers there's gotta be a simpler way of ensuring channel and messages
        if (channel && messages) {

            return(<div className='middle-base-wrapper'>
                <div className="middle-base">
                    <MessageList currentUser = {currentUser}
                        messages = {messages}
                         channel={channel} />
                    <MessageForm channel={channel} currentUser={currentUser} />
                </div>
                <Right type={type} />
            </div>
            )
        }
    }else if (type === '@me') {
        return (
            <div className="middle-base-wrapper">
                <div className="middle-base">
                    <FriendsList></FriendsList>
                </div>
                <Right type={type} />
            </div>
        )
    }


}


export default Middle;