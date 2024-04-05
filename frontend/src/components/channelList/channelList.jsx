import { useState } from 'react';
import './channelList.css'

const ChannelList = ( { channels } ) => {
    const [modalState, setModalState] = useState()
    //at this point maybe consider adding modal state to your global state Hmmm...
    return(
        <div className='channel-list'>
            <div className="channel-header">
                Text Channels
                <img className='add-channel' 
                    src="/src/assets/icons/green-plus.png" 
                    //OnClick
                     />
            </div>
            {channels.map((channel) => (
                <div className="channel-item">
                    <img src="/src/assets/icons/channelTextThread.png" className="channel-icon" />
                    <h1>{channel.name}</h1>
                </div>
            ))}
        </div>
    )
}

export default ChannelList;