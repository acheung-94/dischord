import { useSelector } from 'react-redux'
import './serverControls.css'
import { selectServer } from '../../store/serverReducer'
import { useParams } from 'react-router-dom'

const ServerControls = () => {
    const {serverId} = useParams()
    const server = useSelector(selectServer(serverId))
    console.lo
    return(
        <div className="server-controls">
            <h1>{server.name}</h1>

        </div>
    )
}

export default ServerControls