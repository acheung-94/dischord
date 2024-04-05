import ChannelForm from '../channelForm/channelForm';
import './channelList.css'
import ChannelItem from '../channelItem/channelItem';
import { useState } from 'react';
const ChannelList = ( { channels, server, currentUser } ) => {
    const [modalState, setModalState] = useState(false)

    //at this point maybe consider adding modal state to your global state Hmmm...
    if (channels) {
        return(
            <>
            <div className='channel-list'>
                <div className="channel-header">
                    Text Channels
                    <img className='add-channel' 
                        src="/src/assets/icons/green-plus.png" 
                        onClick={()=> setModalState('new')}//OnClick
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