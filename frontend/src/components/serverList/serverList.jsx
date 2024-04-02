import './serverList.css'
import { useDispatch, useSelector } from 'react-redux'
import ServerIcon from '../serverIcon/serverIcon'
import { currentUserServers, getUserServers } from '../../store/serverReducer'
import { useEffect } from 'react'
const ServerList = () => {
    const servers = useSelector(currentUserServers)
    const dispatch = useDispatch()
    useEffect( ()=>{
        dispatch(getUserServers())
    },[])
    return(
        <div className="server-list">
            <ServerIcon />
            <div className='server-separator'></div>
            {servers.map( server => <ServerIcon serverId={server.id} key={server.id} />)}
            <ServerIcon type = {'new'}/>
        </div>
    )
}

export default ServerList