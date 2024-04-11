import './userIcon.css'
import { useDispatch, useSelector} from "react-redux"
import { setProfile } from '../../store/uiReducer'
import { useState } from 'react'
import UserProfile from '../userProfile/userProfile'
import { NavLink } from 'react-router-dom'
import { profileState, searchState } from '../../store/uiReducer'
const UserIcon = ({user, type}) => {
    const [userPreview, setUserPreview] = useState(false)
    const searchMode = useSelector(searchState)

    // const userPreview = useSelector(profileState)
    const dispatch = useDispatch()
    const handleClick = (e) => {
        e.stopPropagation()
        if (type === 'friends'){
            dispatch(setProfile(user))
        }else if (type==='preview'){
            dispatch(setProfile(null))
            setUserPreview(!userPreview)
        }
    }

        return(
            <div className="user-icon-wrapper">
                <div className="user-icon" onClick={handleClick} >
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
                    {userPreview && (
                        <UserProfile type={type} user={user} />
                    )}
                </div>
                    {type === 'friends' && (
                        <img className="delete-friend" src="/src/assets/icons/guildCross.png" alt="" />
                    )}
            </div>
        )


}

export default UserIcon; 