import { useEffect } from 'react'
import './serverInvites.css'
import {useSelector, useDispatch} from 'react-redux'
import PendingRequest from '../pendingRequests/PendingRequest'
import { selectServerInvites, loadInvites, updateInvites } from '../../store/serverInviteReducer'
const ServerInvitations = () => {
    //fetch invites.
    //render request list.
    const dispatch = useDispatch()
    const invitations = useSelector(selectServerInvites)
    useEffect(() => {
        dispatch(loadInvites())
    }, [])
    return(
        <div className="server-inv-container">
            <h1> Server Invitations </h1>
            <span className="s-inv-sep"></span>
            <div>{ !invitations.length && "You have no new server invitations."}</div>
            <div className="inv-list">
                {invitations.length > 0 && (
                    invitations.map(invite => (
                        <PendingRequest key={invite.id} request={invite} type="server"/>
                    ))
                )}
            </div>
        </div>
    )
}

export default ServerInvitations