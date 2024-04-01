import { useSelector } from 'react-redux'
import './left.css'
import { selectCurrentUser } from '../../store/sessionReducer'
// import { UserIconFull } from '../userIconsFull/userIconFull'
const Left = ({user}) => {
    const currentUser = useSelector(selectCurrentUser)
    return(
        <div className="left-panel">
            Left panel!
            <h1>{currentUser.username}</h1>
            {/* <UserIconFull user={user} /> */}
        </div>
    )
}

export default Left