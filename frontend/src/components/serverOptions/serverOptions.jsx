import { removeServer, selectServer } from '../../store/serverReducer'
import { selectCurrentUser } from '../../store/sessionReducer'
import './serverOptions.css'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
const ServerOptions = ( {server}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const serverId = useParams()
    // const server = useSelector(selectServer(serverId))
    const currentUser = useSelector(selectCurrentUser)
    const [modalState, setModalState] = useState(null) 

    const handleDelete = () => {
        dispatch(removeServer(server.id))
        navigate('/channels/@me')
    }

    return(
        <div className="server-options-modal">
            <div className="invite-people">
                Invite People
                <img src='/src/assets/icons/guildInvitePeople.png' />
            </div>
            <div className="edit-server">
                Edit Server Profile
                <img src='/src/assets/icons/icon-edit.png' />
            </div>

            { currentUser.id === server.ownerId && (
                <div className="delete-server"
                    onClick={handleDelete}>
                    Delete Server
                    <img src='/src/assets/icons/guildDeleteServer.png' />
                </div>
            )}
            
            <div className="leave-server"
                    >
                Leave Server
                <img src="/src/assets/icons/leaving.png" />
            </div>
        </div>
    )
}

export default ServerOptions