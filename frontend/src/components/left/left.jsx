import { useDispatch, useSelector } from 'react-redux'
import './left.css'
import { selectCurrentUser, logoutUser } from '../../store/sessionReducer'
import { currentChannels, getServerChannels } from '../../store/channelReducer'
import { useNavigate, useParams } from 'react-router-dom'
import TopLeft from '../topLeft/topLeft'
import BottomLeft from '../bottomLeft/bottomLeft'
import ChannelList from '../channelList/channelList'
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
            <ChannelList channels={channels}/>
            <BottomLeft />
        </div>
    )
}

export default Left