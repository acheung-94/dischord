import { leaveServer, removeServer, selectServer } from '../../store/serverReducer'
import { selectCurrentUser } from '../../store/sessionReducer'
import './serverOptions.css'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { setSearch, searchState } from '../../store/uiReducer'
import NewServer from '../newServer/newServer'
import { selectMembers } from '../../store/membersReducer'

const ServerOptions = ( {server, setSearchModal}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const currentUser = useSelector(selectCurrentUser)
    const [modalState, setModalState] = useState(false) 
    const members = useSelector(selectMembers)
    const handleDelete = () => {
        dispatch(removeServer(server.id))
        navigate('/channels/@me')
    }

    const handleLeaving = () => {
        const membership = members.find(membership => membership.userId === currentUser.id)
        dispatch(leaveServer(membership.id))
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
                <img className='options-icons' src='https://dischord-clone-seeds.s3.us-west-1.amazonaws.com/icons/guildInvitePeople.png' />
            </span>
            <span className="edit-server"
                    onClick={showEdit}>
                Edit Server
                <img className='options-icons' src='https://dischord-clone-seeds.s3.us-west-1.amazonaws.com/icons/icon-edit.png' />
            </span>

            { currentUser.id === server.ownerId && (
                <span className="delete-server"
                    onClick={handleDelete}>
                    Delete Server
                    <img className='options-icons' src='https://dischord-clone-seeds.s3.us-west-1.amazonaws.com/icons/guildDeleteServer.png' />
                </span>
            )}
            { currentUser.id !== server.ownerId && (
               <span className="leave-server"
                    onClick={handleLeaving}>
                Leave Server
                    <img className='options-icons' src="https://dischord-clone-seeds.s3.us-west-1.amazonaws.com/icons/leaving.png" />
                </span> 
            )}
            

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