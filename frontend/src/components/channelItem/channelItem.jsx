import { NavLink } from 'react-router-dom'
import './channelItem.css'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import ChannelForm from '../channelForm/channelForm'

const ChannelItem = ( { channel, server, currentUser } ) => {
    const serverId = useParams()
    const [modalState, setModalState] = useState()
    return(
        <>
            <NavLink to={`/channels/${channel.serverId}/${channel.id}`}>
                <div className="channel-item">
                    <img src="/src/assets/icons/channelTextThread.png" className="channel-icon" />
                    <h1 className='channel-name'>{channel.name}</h1>
                    <img src="/src/assets/icons/icon-edit.png" 
                        className="channel-setting"
                        onClick={()=> setModalState('edit')} />
                    { currentUser.id === server.ownerId && (
                        <img src="/src/assets/icons/guildDeleteServer.png" className='channel-setting'/>
                    )}
                </div>
            </NavLink>
            { modalState === 'edit' && (
                <ChannelForm modalState={modalState} setModalState={setModalState} channel={channel}></ChannelForm>
            )}            
        </>
    )
}

export default ChannelItem