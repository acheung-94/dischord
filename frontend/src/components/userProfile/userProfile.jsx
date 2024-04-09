import './userProfile.css'

const UserProfile = ({type, user}) => {

    return(
        <div className="user-profile">
            <h1>user profile for type: {type}</h1>
        </div>
    )
}

export default UserProfile