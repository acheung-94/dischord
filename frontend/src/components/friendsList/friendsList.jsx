import './friendsList.css'
import {useSelector, useDispatch} from 'react-redux'
import { friendsListState } from '../../store/uiReducer'
import { selectAccepted, selectPending, selectRejected } from '../../store/friendsReducer'
import UserIcon from '../userIcon/userIcon'
import PendingRequest from '../pendingRequests/PendingRequest'
const FriendsList = ({type}) => {
    const view = useSelector(friendsListState)
    let headerText;
    const conditionalList = () => {
        switch(view){
            case "accepted":
                headerText = "All Friends"
                return useSelector(selectAccepted);
            case "pending":
                headerText = "Pending Requests"
                return useSelector(selectPending)
            case "rejected":
                headerText = "Blocked Requests"
                return useSelector(selectRejected);
            case "server":
                return useSelector(selectAccepted);
            default:
                return ["default"]
        }
    }
    const list = conditionalList()
    return(
        <div className='friends-list'>
            {( list.length > 0) && (
                <>
                <h1 className='friends-list-header' > {headerText} - {list.length}</h1>
                {list.map( friend => (
                    <div className='friends-list-item' key={`fr${friend.id}`}>
                        <span className='friends-list-sep'></span>
                        {view === 'pending' ? <PendingRequest request={friend} /> : <UserIcon  user={friend} type="friends" />}
                    </div>
                ))}
                </>
            )}
            { list.length === 0 && (
                <h1> There are no {view} friend requests.</h1>
            )}

        </div>

    )
}

export default FriendsList;