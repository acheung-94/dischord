import { useDispatch, useSelector } from 'react-redux'
import './left.css'
import { selectCurrentUser, logoutUser } from '../../store/sessionReducer'
import { useNavigate } from 'react-router-dom'
import TopLeft from '../topLeft/topLeft'
import BottomLeft from '../bottomLeft/bottomLeft'
// import { UserIconFull } from '../userIconsFull/userIconFull'
const Left = ( {type}) => {
    const currentUser = useSelector(selectCurrentUser)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    return(
        <div className="left-base">
            <TopLeft type={type}/>
            <h1>DM/Channel list placeholder</h1>
            <BottomLeft />
        </div>
    )
}

export default Left