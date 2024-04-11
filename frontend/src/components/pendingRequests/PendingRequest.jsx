import './request.css'
import {useSelector, useDispatch} from 'react-redux'
import { updateFriends } from '../../store/friendsReducer'

const PendingRequest = ( {request}) => {
    const dispatch = useDispatch()

    const handleAccept = () => {
        let friendship = { ...request, status: 'accepted'}
        dispatch(updateFriends(friendship))
    }

    const handleReject = () => {
        let friendship = { ...request, status: 'rejected'}
        dispatch(updateFriends(friendship))
    }

    return(
        <div className='request-item' >
            <div className='request-icon'>
                <img src={request.avatarUrl} />
            </div>
            <div className="request-text">
                <h3>{request.outgoing ? request.recipient : request.sender}</h3>
                <p>{request.outgoing ? "Outgoing" : "Incoming"}</p>
            </div>
            { request.incoming && (
                <div className='response-icons'>
                    <img src='/src/assets/icons/guildCheckmark.png' 
                        className='request-accept'
                        onClick={handleAccept}/>
                    <img src='/src/assets/icons/guildCross.png'
                        className='request-deny'
                        onClick={handleReject}/>
                </div>
            )}
        </div>
    )


}

export default PendingRequest;
