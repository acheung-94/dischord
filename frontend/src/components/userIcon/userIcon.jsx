import './userIcon.css'
import { useDispatch, useSelector} from "react-redux"
import { useRef, useState } from 'react'
import UserProfile from '../userProfile/userProfile'
import { NavLink } from 'react-router-dom'
import { profileState, searchState, setProfile, previewState, setPreview } from '../../store/uiReducer'
import { updateFriends, deleteRequest } from '../../store/friendsReducer'
const UserIcon = ({user, type}) => {
    // const [userPreview, setUserPreview] = useState(false)
    const searchMode = useSelector(searchState)
    const currentPreview = useSelector(previewState)
    const currentRef = useRef()
    const dispatch = useDispatch()
    
    const handleClick = (e) => {
        e.stopPropagation()
        console.log(e.currentTarget.className)
        if (type === 'friends'){
            dispatch(setProfile(user))
        }else if (type==='preview' ){
            dispatch(setProfile(null))
            if(currentPreview && e.currentTarget.className.includes('active')){
                dispatch(setPreview(false))
            }else{
                dispatch(setPreview(user))
            }
            // setUserPreview(!userPreview)
        }
    }

    const unFriend = (e) => {
        e.stopPropagation()
        const friendship = {
            id: user.requestId,
            status: 'rejected'
        }
        dispatch(updateFriends(friendship))
    }

    const reFriend = (e) => {
        e.stopPropagation()
        const friendship = {
            id: user.requestId,
            status: 'accepted'
        }
        dispatch(updateFriends(friendship))
    }

    const unBlock = (e) => {
        e.stopPropagation()
        dispatch(deleteRequest(user.requestId))
    }
        return(
            <div className="user-icon-wrapper">
                <div className={(currentPreview.id === user.id && type !== 'bottom-left')? 'user-icon active' : 'user-icon'} 
                    onClick={handleClick} 
                    >
                    <div className="icon-img">
                        <img className="avatar" src={user.avatarUrl} />
                        <img className='status' src="/src/assets/icons/icon-on.png" />
                    </div>
                    <div className="user-icon-text">
                        {type ? (<h4>{user.username}</h4>) : <p>{user.username}</p>}
                        { type === 'bottom-left' && (<p>"status"</p>)}
                    </div>
                    {user.owner && (
                        <div className="owner-icon">
                            <img src="/src/assets/icons/guildOwner.png" />
                        </div>
                    )}
          
                    {(currentPreview && currentPreview.id === user.id && type !== 'bottom-left') && (
                        <UserProfile type={type} user={user} />
                    )}
                </div>
                    {type === 'friends' && (
                        <img className="delete-friend" 
                            src="/src/assets/icons/guildCross.png" 
                            onClick={unFriend} />
                    )}
                    { type === 'rejected' && (
                        <div className="reject-buttons">
                            <div className='restore' onClick={reFriend}> Restore </div>
                            <div className="unblock" onClick={unBlock} > Unblock </div>
                        </div>
                    )}
            </div>
        )


}

export default UserIcon; 