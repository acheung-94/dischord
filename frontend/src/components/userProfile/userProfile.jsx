import { useEffect } from 'react'
import './userProfile.css'

const UserProfile = ({type, user}) => {
    // type = preview, profile, and edit? 
    const conditionalClass = () => {
        switch(type){
            case "preview":
                return "user-preview"
            case "profile":
                return "user-profile"
            case "bottom-left":
                return "user-preview-bottom"
            default:
                return "user-preview"
        }
    }
    return(
        <div className={ conditionalClass()}>
            <div className="user-icon-large">
                <img src={user.avatarUrl} alt="" />
            </div>
            <div className="banner">
                <div className="preview-middle">
                    <div className='preview-bottom'>
                        <div className="username-display">
                            <h2>{user.username}</h2>
                            <h3>{user.displayName}</h3>
                        </div>
                        <span className="preview-sep"></span>
                        <div className='member-since'>
                            <h3>Member Since:</h3>
                            <div className="date">
                                <img src="/src/assets/icons/Vector.png" />
                                <p>{user.accountCreated}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile