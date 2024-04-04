import { useSelector } from 'react-redux'
import './serverControls.css'
import { selectServer } from '../../store/serverReducer'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import ServerOptions from '../serverOptions/serverOptions'

const ServerControls = () => {
    const {serverId} = useParams()
    const server = useSelector(selectServer(serverId))
    const [serverModal, setServerModal] = useState(null)

    return(
        <div className={serverModal ? "server-controls active" : "server-controls"}
        onClick={()=> setServerModal(!serverModal)} > 
            <h1 className='server-name'>{server.name}</h1>
            <img src="/src/assets/icons/guildDropdownMenu.png" />
            { serverModal && (
                <ServerOptions server = {server}></ServerOptions>
            )}
        </div>
    )
}

export default ServerControls

//ok i'm pretty proud of my onclick tbh