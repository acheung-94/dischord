import { leaveServer, removeServer, selectServer } from '../../store/serverReducer'
import { selectCurrentUser } from '../../store/sessionReducer'
import './serverOptions.css'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { setSearch, searchState } from '../../store/uiReducer'
import NewServer from '../newServer/newServer'
import SearchModal from '../searchModal/searchModal'
const ServerOptions = ( {server, searchModal, setSearchModal}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const serverId = useParams()
    const currentUser = useSelector(selectCurrentUser)
    const [modalState, setModalState] = useState(false) 
    const invitationMode = useSelector(searchState)
    
    const handleDelete = () => {
        dispatch(removeServer(server.id))
        navigate('/channels/@me')
    }

    const handleLeaving = () => {
        dispatch(leaveServer(parseInt(serverId.serverId)))
        navigate('/channels/@me')
    }

    const showEdit = (e) => {
        e.stopPropagation()
        setModalState(true)
    }

    const openInvitation = () => {
        dispatch(setSearch('server'))
        setSearchModal(true)
    }

    return(
    <>
        <div className="server-options-modal">
            <span className="invite-people"
                onClick={openInvitation}>
                Invite People
                <img className='options-icons' src='/src/assets/icons/guildInvitePeople.png' />
            </span>
            <span className="edit-server"
                    onClick={showEdit}>
                Edit Server
                <img className='options-icons' src='/src/assets/icons/icon-edit.png' />
            </span>

            { currentUser.id === server.ownerId && (
                <span className="delete-server"
                    onClick={handleDelete}>
                    Delete Server
                    <img className='options-icons' src='/src/assets/icons/guildDeleteServer.png' />
                </span>
            )}
            
            <span className="leave-server"
                    onClick={handleLeaving}>
                Leave Server
                <img className='options-icons' src="/src/assets/icons/leaving.png" />
            </span>

        </div>
            { modalState && (
                <NewServer 
                    type = { modalState } 
                    setModalState={setModalState} 
                    server={ server }/>
            ) }



    </>
    )
}

export default ServerOptions