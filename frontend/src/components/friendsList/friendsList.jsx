import './friendsList.css'
import {useSelector, useDispatch} from 'react-redux'
import { friendsListState } from '../../store/uiReducer'
import { selectAccepted, selectPending, selectRejected } from '../../store/friendsReducer'
import UserIcon from '../userIcon/userIcon'
const FriendsList = ({type}) => {
    const view = useSelector(friendsListState)
    
    const conditionalList = () => {
        switch(view){
            case "accepted":
                return useSelector(selectAccepted);
            case "pending":
                return useSelector(selectPending);
            case "rejected":
                return useSelector(selectRejected)
            default:
                return ["default"]
        }
    }
    const list = conditionalList()
    return(
        <div className='friends-list'>
            { list.length > 0 && (
                <>
                <h1 className='friends-list-header' > All Friends - {list.length}</h1>
                {list.map( friend => (
                    <div className='friends-list-item'>
                        <span className='friends-list-sep'></span>
                        <UserIcon key={`fr${friend.id}`} user={friend} type="friends" />
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