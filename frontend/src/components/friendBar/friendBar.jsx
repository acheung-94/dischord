import './friendBar.css'
import { useDispatch, useSelector } from 'react-redux'
import { friendsListState, setFriendsList } from '../../store/uiReducer'
import { fetchFriends } from '../../store/friendsReducer'
import { useEffect } from 'react'
const FriendBar = () => {
    const dispatch = useDispatch()
    const view = useSelector(friendsListState)

    useEffect( () => {
        dispatch(fetchFriends())
        console.log('fetching friends!')
    }, [])

    const handleClick = (e) => {
        console.log(e.target.className)
        console.log(e.target.className.split(' ')[0])
        let section = e.target.className.split(' ')[0]
        dispatch(setFriendsList(section))
    }

    return(
        <div className='friend-bar'>
            <div className="friend-bar-header">
                <img src="/src/assets/icons/appdirectorySocial.png" />
                <h2>Friends</h2>    
            </div>
            <span className='friend-bar-separator'></span>
            <div className='view-bar'>
                <div className={view === 'accepted' ? "accepted active" : "accepted"}
                    onClick={handleClick}>
                    All
                </div>
                <div className={view === 'pending' ? "pending active" : "pending"}
                    onClick={handleClick}>
                    Pending
                </div>
                <div className={view === 'rejected' ? "rejected active" : "rejected"}
                    onClick={handleClick}>
                    Blocked
                </div>
                <div className='add-friend'>
                    Add Friend
                </div>
            </div>
        </div>
    )
}

export default FriendBar;