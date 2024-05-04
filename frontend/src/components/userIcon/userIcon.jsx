import './userIcon.css'
import { useDispatch, useSelector} from "react-redux"
import UserProfile from '../userProfile/userProfile'
import { setProfile, previewState, setPreview } from '../../store/uiReducer'
import { updateFriends, deleteRequest } from '../../store/friendsReducer'
import serverInviteReducer from '../../store/serverInviteReducer'


const UserIcon = ({user, server, type}) => {

    const currentPreview = useSelector(previewState)

    const dispatch = useDispatch()
    
    const handleClick = (e) => {
        e.stopPropagation()
        if (type === 'friends'){
            dispatch(setProfile(user))
        }else if (type==='preview' ){
            dispatch(setProfile(null))
            if(currentPreview && e.currentTarget.className.includes('active')){
                dispatch(setPreview(false))
            }else{
                dispatch(setPreview(user.userId))
            }

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
        return(//user.userId?
            <div className="user-icon-wrapper"> 
                <div className={(currentPreview === user.userId && type !== 'bottom-left')? 'user-icon active' : 'user-icon'} 
                    onClick={handleClick} 
                    >
                    <div className="icon-img">
                        <img className="avatar" src={user.avatarUrl} />
                        <img className='status' src="https://dischord-clone-seeds.s3.us-west-1.amazonaws.com/icons/icon-on.png" />
                    </div>
                    <div className="user-icon-text">
                        {type ? (<h4>{user.displayName}</h4>) : <p>{user.displayName}</p>}
                        { type === 'bottom-left' && (<p>Online</p>)}
                    </div>
                    { (server && user.userId === server.ownerId) && (
                        <div className="owner-icon">
                            <img src="https://dischord-clone-seeds.s3.us-west-1.amazonaws.com/icons/guildOwner.png" />
                        </div>
                    )}
          
                    {(currentPreview && currentPreview === user.userId && type !== 'bottom-left') && (
                        <UserProfile type={type} user={user} />
                    )}
                </div>
                    {type === 'friends' && (
                        <img className="delete-friend" 
                            src="https://dischord-clone-seeds.s3.us-west-1.amazonaws.com/icons/guildCross.png" 
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