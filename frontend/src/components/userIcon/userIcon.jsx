import './userIcon.css'

const UserIcon = ({user, type}) => {

    return(
        <div className="user-icon">
            <div className="icon-img">
                <img className="avatar" src={user.avatarUrl} />
                <img className='status' src="/src/assets/icons/icon-on.png" />
            </div>
                <div className="user-icon-text">
                    <h4>{user.username}</h4>
                    { type === 'bottom-left' && (<p>"status"</p>)}
                </div>
        </div>
    )
}

export default UserIcon; 