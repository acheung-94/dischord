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
    console.log(invitations)
    return(
        <div className="server-inv-list">
            <h1> Server Invitations </h1>
            <div>{ !invitations.length ? "nothing to see here" : "you've got an invite!"}</div>
            {invitations.length && (
                invitations.map(invite => (
                    <PendingRequest request={invite} type="server"/>
                ))
            )}
        </div>
    )
}

export default ServerInvitations