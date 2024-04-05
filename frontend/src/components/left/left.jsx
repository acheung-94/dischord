import { useDispatch, useSelector } from 'react-redux'
import './left.css'
import { selectCurrentUser, logoutUser } from '../../store/sessionReducer'
import { currentChannels, getServerChannels } from '../../store/channelReducer'
import { useNavigate, useParams } from 'react-router-dom'
import TopLeft from '../topLeft/topLeft'
import BottomLeft from '../bottomLeft/bottomLeft'
import { useEffect } from 'react'
// import { UserIconFull } from '../userIconsFull/userIconFull'
const Left = ( {type}) => {
    const currentUser = useSelector(selectCurrentUser)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const channels = useSelector(currentChannels)
    const { serverId }= useParams()
    useEffect( () => {
        dispatch(getServerChannels(serverId))
    }, [])

    //if channels here ?? 
    return(
        <div className="left-base">
            <TopLeft type={type}/>
            <h1>DM/Channel list placeholder</h1>
            <BottomLeft />
        </div>
    )
}

export default Left