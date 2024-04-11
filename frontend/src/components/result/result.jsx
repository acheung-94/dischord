import { makeFriends } from '../../store/friendsReducer'
import { postInvite } from '../../store/serverInviteReducer'
import { selectCurrentUser } from '../../store/sessionReducer'
import { searchState } from '../../store/uiReducer'
import './result.css'
import {useDispatch, useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'

const Result = ({user, setSearchModal}) => {
    const searchMode = useSelector(searchState)
    const currentUser = useSelector(selectCurrentUser)
    const { serverId } = useParams()
    const dispatch = useDispatch()
    const handleRequest = ()=>{
        if (searchMode === 'friendship'){
            const friendship = {
                senderId : currentUser.id,
                recipientId : user.id,
                status: 'pending'
            }
            dispatch(makeFriends(friendship))
            setSearchModal(false)
        }else if (searchMode === 'server'){
            const membership = {
                userId : user.id,
                serverId : serverId,
                status: 'pending'
            }
            postInvite(membership)
            setSearchModal(false)
        }
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
            </div>
                <div className="initiate-request">
                    {searchMode === 'friendship' ? (
                        <div className="initiate-friendship"
                            onClick={handleRequest}>
                            Send Friend Request
                        </div>
                    ):(
                        <div className="initiate-membership"
                            onClick={handleRequest}>
                            Invite to Server
                        </div>
                    )}
                </div>
        </div>
    )
}

export default Result;