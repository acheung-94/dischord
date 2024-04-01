import './serverList.css'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../../store/sessionReducer'
const ServerList = () => {
    const currentUser = useSelector(selectCurrentUser)
    return(
        <div className="server-list">
            {`${currentUser.username}'s servers go here!`}
        </div>
    )
}

export default ServerList