import './serverList.css'
import { useDispatch, useSelector } from 'react-redux'
import ServerIcon from '../serverIcon/serverIcon'
import { currentUserServers2, getUserServers } from '../../store/serverReducer'
import { useEffect, useState } from 'react'
import NewServer from '../newServer/newServer'
const ServerList = () => {
    const servers = useSelector(currentUserServers2)
    const dispatch = useDispatch()
    const [modalState, setModalState] = useState(null)

    // useEffect( ()=>{
    //     dispatch(getUserServers())
    // },[])
    
    if(servers) {
        return(
            <div className="server-list">
                <ServerIcon type ='@me' />
                <div className='server-separator'></div>
                {servers.map( server => <ServerIcon 
                    serverId={server.id} 
                    server = {server}
                    key={server.id} />)}
                <div onClick={()=>setModalState('new')}><ServerIcon type = {'new'}/></div>
                {modalState && (
                    <NewServer modalState={modalState} 
                        setModalState={setModalState} /> 
                )}
            </div>
        )
    }
}

export default ServerList