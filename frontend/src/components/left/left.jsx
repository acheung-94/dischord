import { useDispatch, useSelector } from 'react-redux'
import './left.css'
import { selectCurrentUser, logoutUser } from '../../store/sessionReducer'
import { currentChannels, getServerChannels } from '../../store/channelReducer'
import { useParams } from 'react-router-dom'
import { selectServer } from '../../store/serverReducer'
import TopLeft from '../topLeft/topLeft'
import BottomLeft from '../bottomLeft/bottomLeft'
import ChannelList from '../channelList/channelList'
import { useEffect } from 'react'
// import { UserIconFull } from '../userIconsFull/userIconFull'
const Left = ( {type}) => {
    const currentUser = useSelector(selectCurrentUser)
    const dispatch = useDispatch()
    const { serverId }= useParams()

    const channels = useSelector(currentChannels)
    const server = useSelector(selectServer(serverId))
    useEffect( () => {
        dispatch(getServerChannels(serverId))
    }, [])

    if (channels && server) {
        if (type !== '@me'){
            return(
                <div className="left-base">
                    <TopLeft type={type}/>
                    <ChannelList channels={channels} server={server} currentUser={currentUser}/>
                    <BottomLeft />
                </div>
            )
        } 
    }

    if (type === '@me') {
        return(
            <div className="left-base">
                <TopLeft type={type}/>
                <h1>DM placeholder is back c:</h1>
                <BottomLeft />
            </div>
        )
    }
}

export default Left