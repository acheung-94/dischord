import { useParams } from 'react-router';
import './top.css'
import { useDispatch, useSelector } from 'react-redux';
import { currentChannel } from '../../store/channelReducer';
import SearchBar from '../searchBar/searchBar';
import { togglePanel } from '../../store/uiReducer';
import { useEffect } from 'react';
const Top = ( {type} ) => {
    const {channelId} = useParams()
    const dispatch = useDispatch()
    const channel = useSelector(currentChannel(channelId))

    const handleClick = () =>{
        dispatch(togglePanel())
    }

    if (channel) {
        return(
            <div className="top-base">
                { type === 'channel' && (
                    <>
                        <div className="channel-bar">
                            <img className = "channel-bar-icons" src="/src/assets/icons/channelText.png" />
                            <h1 className='channel-bar-title' >{channel.name}</h1>
                            <div className="member-list-toggle"
                                onClick={handleClick}>
                                <img className = "channel-bar-icons" src="/src/assets/icons/guildDefaultRolePermissions.png" />
                            </div>
                            <div className='searchbar-container'>
                                <SearchBar></SearchBar>
                            </div>
                        </div>
                    </>
                )}
            </div>
        )
    }

    if (type === '@me'){
        return(
            <div className="top-base">
                <h1> Placeholder for friendsey stuff</h1>
            </div>
        )
    }

}

export default Top;