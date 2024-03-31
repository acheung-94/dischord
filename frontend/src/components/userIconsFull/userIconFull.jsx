import { UserIcon } from "../userIcon/userIcon"

const UserIconFull = ( {user}) => {
    return (
        <div className="user-1">
        <UserIcon user = {user}/>
        <span className="user-1-text">
            <p>Log in as</p>
            <h4>sonataformftw</h4>
        </span>
        </div>

    )
}

export const UserIconFull