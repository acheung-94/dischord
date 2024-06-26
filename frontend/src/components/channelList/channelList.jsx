import ChannelForm from '../channelForm/channelForm';
import './channelList.css'
import ChannelItem from '../channelItem/channelItem';
import { useState } from 'react';
const ChannelList = ( { channels, server, currentUser } ) => {
    const [modalState, setModalState] = useState(false)


    if (channels) {
        return(
            <>
            <div className='channel-list'>
                <div className="channel-header">
                    Text Channels
                    <img className='add-channel' 
                        src="https://dischord-clone-seeds.s3.us-west-1.amazonaws.com/icons/green-plus.png" 
                        onClick={()=> setModalState('new')}
                         />
                </div>
                {channels.map((channel) => (
                    <ChannelItem 
                        channel={channel}
                        server={server}
                        currentUser={currentUser} 
                        key={channel.id} />
                ))}
            </div>
            {modalState === 'new' && (
                 <ChannelForm 
                    modalState={modalState} 
                    setModalState={setModalState}
                /> )}
            </>
        )
    }
}

export default ChannelList;