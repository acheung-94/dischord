import './friendBar.css'
import { useDispatch, useSelector } from 'react-redux'
import { friendsListState, setFriendsList, searchState, setSearch } from '../../store/uiReducer'
import { fetchFriends } from '../../store/friendsReducer'
import { useEffect, useState } from 'react'
import SearchModal from '../searchModal/searchModal'


const FriendBar = () => {
    const dispatch = useDispatch()
    const view = useSelector(friendsListState)
    const [searchModal, setSearchModal] = useState(false)


    useEffect( () => {
        dispatch(fetchFriends())
    }, [])

    const handleClick = (e) => {
        let section = e.target.className.split(' ')[0]
        dispatch(setFriendsList(section))
    }

    const openUserSearch = e =>{
        e.stopPropagation()
        dispatch(setSearch('friendship'))
        setSearchModal(!searchModal)
    }

    return(
        <div className='friend-bar'>
            <div className="friend-bar-header">
                <img src="/src/assets/icons/appdirectorySocial.png" />
                <h2>Friends</h2>    
            </div>
            <span className='friend-bar-separator'></span>
            <ul className='view-bar'>
                <li className={view === 'accepted' ? "accepted active" : "accepted"}
                    onClick={handleClick}>
                    All
                </li>
                <li className={view === 'pending' ? "pending active" : "pending"}
                    onClick={handleClick}>
                    Pending
                </li>
                <li className={view === 'rejected' ? "rejected active" : "rejected"}
                    onClick={handleClick}>
                    Blocked
                </li>
                <li className='add-friend'
                    onClick={openUserSearch}>
                    Add Friend
                </li>
            </ul>
                {searchModal && (
                    <SearchModal/>
                )}
        </div>
    )
}

export default FriendBar;