import { useDispatch, useSelector } from 'react-redux'
import './left.css'
import { selectCurrentUser, logoutUser } from '../../store/sessionReducer'
import { useNavigate } from 'react-router-dom'
// import { UserIconFull } from '../userIconsFull/userIconFull'
const Left = () => {
    const currentUser = useSelector(selectCurrentUser)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout=()=>{
        dispatch(logoutUser())
        navigate('/')
    }
    return(
        <div className="left-panel">
            Left panel!
            <h1>{currentUser.username}</h1>

            <button onClick={handleLogout}>Log out placeholder!</button>
        </div>
    )
}

export default Left