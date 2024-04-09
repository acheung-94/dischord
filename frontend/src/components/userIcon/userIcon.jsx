import './userIcon.css'

const UserIcon = ({user, type}) => {
    const defaultColors = ["blurple", "gold", "gray", "green", "magenta", "red"]
 // TODO: MOVE THIS LOGIC TO USERS CONTROLLER.
    const assignImage = () => {
        if (user.avatarUrl){
            return user.avatarUrl
        }else{
            let color = defaultColors[Math.floor(Math.random() * 5)]
            return `/src/assets/icons/avatar-${color}.png`
        }
    }
    return(
        <div className="user-icon">
                <img className="avatar" src={assignImage()} />
                <img className='status' src="/src/assets/icons/icon-on.png" />
                <div className="user-icon-text">
                    <h4>{user.username}</h4>
                    { type === 'bottom-left' && (<p>"status"</p>)}
                </div>
        </div>
    )
}

export default UserIcon; 