import './searchModal.css'
import {useSelector, useDispatch} from 'react-redux'
import { searchState, setSearch } from '../../store/uiReducer'
import SearchBar from '../searchBar/searchBar'
import Result from '../result/result'
import { selectSearchResults } from '../../store/searchReducer'
import { selectServer } from '../../store/serverReducer'
import { resetResults } from '../../store/searchReducer'
import { fetchFriends, selectFriends } from '../../store/friendsReducer'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'

const SearchModal = ({searchModal,setSearchModal}) => {
    const searchMode = useSelector(searchState)

    const dispatch = useDispatch()
    const { serverId } = useParams()    
    const conditionalResults = () => {
        switch(searchMode){
            case 'friendship':
                return useSelector(selectSearchResults)
            case 'server':
                const server = useSelector(selectServer(parseInt(serverId)))
                const friends = useSelector(selectFriends)
                const filteredFriends = friends.filter((friend) => 
                    !server.members.includes(friend.id) && 
                    !server.pendingMembers.includes(friend.id))
                return filteredFriends
            default:
                return [];
        }
    }
    const results = conditionalResults()

    const [searchMessage, setSearchMessage] = useState("")

    const handleClose = (e) => {
        e.stopPropagation()
        setSearchModal(false)
        dispatch(resetResults())
    }
    
    useEffect(()=> {
        if (searchMode === 'server'){
            dispatch(fetchFriends())
        }
    }, [searchMode])

    useEffect( () => {
        if(searchMessage){
            if (!results.length && searchMode==='friendship') {
                setSearchMessage("Nobody by that username exists. :(") 
            }else if (results.length && searchMode ==='friendship'){
                setSearchMessage('')
            }
        }
        if (!results.length && searchMode ==='server'){
            setSearchMessage("No friends available to invite.")
        }
    }, [searchMessage, results])


    if(searchMode && searchModal ){
        return(
            <div className="search-modal-bg" onClick={handleClose}>
                <div className={searchMode === 'friendship' ? 
                "search-modal-friend" : "search-modal-server"}
                    onClick={(e)=> e.stopPropagation()}>
                    { searchMode === 'friendship' && (
                        <div className='search-area'>
                            <SearchBar type={true} setSearchMessage={setSearchMessage}/>
                        </div>
                    )}
                    { searchMode === 'server' && (
                        <h1>Invite your friends to this server!</h1>
                    )}
                    <div className="results-list">
                        {results.length > 0 && (
                            results.map( user => (
                                <Result key={user.id} user={user} setSearchModal={setSearchModal}/>
                            ))
                        )}
                        {searchMessage && (
                            <div className="wahp-wahp">
                                {searchMessage}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

export default SearchModal;