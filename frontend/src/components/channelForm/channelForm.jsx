import { createChannel, updateChannel } from '../../store/channelReducer';
import { useState } from 'react';
import './channelForm.css'
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router';

const ChannelForm = ( { modalState, setModalState, channel, server }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {serverId }= useParams()
    const [name, setName] = useState(
        modalState === 'edit' ? channel.name : ''
    )
    
    const handleSubmit = e => {
        e.preventDefault()
        if (modalState === 'edit'){
            dispatch(updateChannel({...channel, name: name}))
            setModalState(false)
            navigate(`/channels/${serverId}/${channel.id}`)
        }else{
            dispatch(createChannel({name, serverId: parseInt(serverId)}))
                .then( (data) => {
                    setModalState(false)
                    navigate(`/channels/${serverId}/${data.id}`)
                }) 
        }
    }
    const handleClose = e => {
        e.stopPropagation()
        setModalState(false)
    }

    return(
        <>
        <div className="channel-form-bg" onClick={handleClose}>
            <div className="channel-form-content" onClick={e => e.stopPropagation()}>
                { modalState && (
                    <form className="channel-form" onSubmit={handleSubmit}>
                        {modalState === 'edit' ? 
                            (<h1>Edit Channel Name</h1>) :
                            (<h1>Create a New Channel</h1>)}
                        <div className="channel-input-area">
                             <img src="https://dischord-clone-seeds.s3.us-west-1.amazonaws.com/icons/channelTextThread.png" />
                        <input type="text" 
                            className='channel-input' 
                            value={name} 
                            onChange={e => setName( e.target.value)}
                            placeholder={modalState === 'new' ? "new-channel" : ""}/>
                        </div>
                       
                        <p>Text channel: Send messages, opinions, and puns </p>
                        <button type="submit" className='channel-submit'
                            disabled={ name ? false : true}
                            > {modalState === 'new' ? 'Create Channel' : 'Save'}</button>
                    </form>
                )}

            </div>
        </div>
        </>
    )
}

export default ChannelForm;