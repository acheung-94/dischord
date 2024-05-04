
import './userProfile.css'
import {useSelector, useDispatch} from 'react-redux'
import { profileState, setProfile } from '../../store/uiReducer'
const UserProfile = ({type, user}) => {

    const profile = useSelector(profileState) //selects the user to display
    const dispatch = useDispatch()
    const conditionalClass = () => {
        switch(type){
            case "preview":
                return "user-preview"
            case "@me":
                return "user-profile"
            case "bottom-left":
                return "user-preview-bottom"
            default:
                return "user-preview"
        }
    }
    if(profile || type !== '@me') {
        return(
            <div className={ conditionalClass()}>
                <div className="user-icon-large">
                    <img src={ profile ? profile.avatarUrl : user.avatarUrl} alt="" />
                </div>
                { type === '@me' && ( <img className="close-profile" onClick={()=> dispatch(setProfile(false))}src='https://dischord-clone-seeds.s3.us-west-1.amazonaws.com/icons/close-x.png' />)}
                <div className="banner">
                    <div className="preview-middle">
                        <div className='preview-bottom'>
                            <div className="username-display">
                                <h2>{!profile ? user.displayName : profile.displayName}</h2>
                                <h3>{!profile ? user.username :profile.username}</h3>
                            </div>
                            <span className="preview-sep"></span>
                            <div className='member-since'>
                                <h3>Member Since:</h3>
                                <div className="date">
                                    <img src="https://dischord-clone-seeds.s3.us-west-1.amazonaws.com/icons/Vector.png" />
                                    <p>{ !profile ? user.memberSince : profile.joinDate}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else if (type === '@me' && !profile ) {
        return(
            <div className='user-profile'>
                <div className="no-activity">
                    <h1>Active Now</h1>
                    <img src="https://dischord-clone-seeds.s3.us-west-1.amazonaws.com/68691bc51a5e2da8e8cf.svg" />
                    It's all quiet for now...
                </div>
               
            </div>
        )
    }
}

export default UserProfile