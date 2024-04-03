import { useDispatch, useSelector } from 'react-redux'
import './left.css'
import { selectCurrentUser, logoutUser } from '../../store/sessionReducer'
import { useNavigate } from 'react-router-dom'
import TopLeft from '../topLeft/topLeft'
// import { UserIconFull } from '../userIconsFull/userIconFull'
const Left = ( {type}) => {
    const currentUser = useSelector(selectCurrentUser)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout=()=>{
        dispatch(logoutUser())
        navigate('/')
    }
    return(
        <div className="left-base">
            <TopLeft type={type}/>
            <button onClick={handleLogout}>Log out placeholder!</button>
        </div>
    )
}

export default Left