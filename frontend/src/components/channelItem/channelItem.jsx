import { NavLink, useNavigate } from 'react-router-dom'
import './channelItem.css'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import ChannelForm from '../channelForm/channelForm'
import { useDispatch } from 'react-redux'
import { removeChannel } from '../../store/channelReducer'

const ChannelItem = ( { channel, server, currentUser } ) => {
    const {serverId} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [modalState, setModalState] = useState()

    const handleDelete = () => {
        dispatch(removeChannel(channel.id))
            .then( () =>  
                navigate(`/channels/${serverId}/${server.channels[0]}`)
            )
    }

    const conditionalIcons = () => {
        if (channel.id !== server.defaultChannelId && 
            currentUser.id === server.ownerId ){
                return(
                    <>
                    <img src="https://dischord-clone-seeds.s3.us-west-1.amazonaws.com/icons/icon-edit.png" 
                            className="channel-setting"
                            onClick={()=> setModalState('edit')} />
                    <img src="https://dischord-clone-seeds.s3.us-west-1.amazonaws.com/icons/guildDeleteServer.png" 
                            className='channel-setting'
                            onClick={handleDelete}/>
                    </>
                ) 
        }else{
               return(
                <img src="https://dischord-clone-seeds.s3.us-west-1.amazonaws.com/icons/icon-edit.png" 
                        className="channel-setting"
                        onClick={()=> setModalState('edit')} />
            ) 
        }
    }
    
    return(
        <>
            <NavLink to={`/channels/${channel.serverId}/${channel.id}`}>
                <div className="channel-item">
                    <img src="https://dischord-clone-seeds.s3.us-west-1.amazonaws.com/icons/channelTextThread.png" className="channel-icon" />
                    <h1 className='channel-name'>{channel.name}</h1>
                    {conditionalIcons()}
                </div>
            </NavLink>
            { modalState === 'edit' && (
                <ChannelForm modalState={modalState}
                    server={server}    
                    setModalState={setModalState} 
                    channel={channel}
                ></ChannelForm>
            )}            
        </>
    )
}

export default ChannelItem