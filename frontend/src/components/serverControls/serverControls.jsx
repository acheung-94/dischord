import { useSelector } from 'react-redux'
import './serverControls.css'
import { selectServer } from '../../store/serverReducer'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import ServerOptions from '../serverOptions/serverOptions'

import SearchModal from '../searchModal/searchModal'
const ServerControls = () => {
    const {serverId} = useParams()

    const server = useSelector(selectServer(serverId))
    const [serverModal, setServerModal] = useState(null)
    const [searchModal, setSearchModal] = useState(false)

    if (server) {
        return(
            <div className={serverModal ? "server-controls active" : "server-controls"}
            onClick={()=> setServerModal(!serverModal)} > 
                <h1 className='server-name'>{server.name}</h1>
                <img className='server-controls-img' src="/src/assets/icons/guildDropdownMenu.png" />
                { serverModal && (
                    <ServerOptions server = {server} searchModal={searchModal} 
                    setSearchModal = {setSearchModal} />
                )}
                { searchModal && (
                    <SearchModal searchModal={searchModal} 
                        setSearchModal = {setSearchModal}/>
                )}
            </div>
        )
    }
}

export default ServerControls
