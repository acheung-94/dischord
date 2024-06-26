import './request.css'
import {useSelector, useDispatch} from 'react-redux'
import { deleteRequest, updateFriends } from '../../store/friendsReducer'
import { updateInvites } from '../../store/serverInviteReducer'
import { getUserServers } from '../../store/serverReducer'

const PendingRequest = ( {request, type}) => {
    const dispatch = useDispatch()

    const handleAccept = () => {
        let invitation = { ...request, status: 'accepted'}
        if (type === 'server'){
            dispatch(updateInvites(invitation))
            dispatch(getUserServers())
        }else{
            dispatch(updateFriends(invitation))
        }
    }

    const handleReject = () => {
        let invitation = { ...request, status: 'rejected'}
        if (type ==='server'){
            dispatch(updateInvites(invitation))
        }else{
            dispatch(updateFriends(invitation))
        }
    }

    const handleCancel = () => {
        dispatch(deleteRequest(request.id))
     }

    const conditionalIcon = () => {
        if (type === 'server'){
            return request.iconUrl
        } else{
            return request.avatarUrl
        }
    }

    return(
        <div className='request-item' >
            <div className="request-item-inner">
                <div className='request-icon'>
                    { request.iconUrl || request.avatarUrl ? 
                    <img src={conditionalIcon()} /> : 
                    request.serverName.substring(0,1).toUpperCase() }
                </div>
                { type !== 'server' && (
                    <div className="request-text">
                        <h3>{request.outgoing ? request.recipient : request.sender}</h3>
                        <p>{request.outgoing ? "Outgoing" : "Incoming"}</p>
                    </div>
                )}
                { type === 'server' && (
                    <div className="request-server-text">
                        <h3> {request.serverName} </h3>
                    </div>
                )}
            </div>
            { (request.incoming || type === 'server') && (
                <div className='response-icons'>
                    <img src='https://dischord-clone-seeds.s3.us-west-1.amazonaws.com/icons/guildCheckmark.png' 
                        className='request-accept'
                        onClick={handleAccept}/>
                    <img src='https://dischord-clone-seeds.s3.us-west-1.amazonaws.com/icons/guildCross.png'
                        className='request-deny'
                        onClick={handleReject}/>
                </div>
            )}
            { (request.outgoing) && (
                <div className="response-icons">
                    <img src="https://dischord-clone-seeds.s3.us-west-1.amazonaws.com/icons/guildCross.png" 
                        className='request-deny'
                        onClick={handleCancel}/>
                </div>
            )}
        </div>
    )


}

export default PendingRequest;
