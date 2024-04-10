import { makeFriends } from '../../store/friendsReducer'
import { selectCurrentUser } from '../../store/sessionReducer'
import { searchState } from '../../store/uiReducer'
import './result.css'
import {useDispatch, useSelector} from 'react-redux'
const Result = ({user}) => {
    const searchMode = useSelector(searchState)
    const currentUser = useSelector(selectCurrentUser)
    const dispatch = useDispatch()
    const handleRequest = ()=>{
        const friendship = {
            senderId : currentUser.id,
            recipientId : user.id,
            status: 'pending'
        }
        dispatch(makeFriends(friendship))
    }

    return(
        <div className="user-icon-wrapper search">
            <div className="user-icon">
                <div className="icon-img">
                    <img className="avatar" src={user.avatarUrl} />
                    <img className='status' src="/src/assets/icons/icon-on.png" />
                </div>
                <div className="user-icon-text">
                    <h4>{user.username}</h4>
                </div>
                <div className="initiate-request">
                    {searchMode === 'friendship' ? (
                        <div className="initiate-friendship">
                            Send Friend Request
                        </div>
                    ):(
                        <div className="initiate-membership">
                            Invite to Server
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Result;