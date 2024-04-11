import './searchModal.css'
import {useSelector, useDispatch} from 'react-redux'
import { searchState, setSearch } from '../../store/uiReducer'
import SearchBar from '../searchBar/searchBar'
import Result from '../result/result'
import { selectSearchResults } from '../../store/searchReducer'
import { selectServer } from '../../store/serverReducer'
import { resetResults } from '../../store/searchReducer'
import { selectAccepted, fetchFriends } from '../../store/friendsReducer'
import { useEffect } from 'react'
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
                const friends = useSelector(selectAccepted)
                const filteredFriends = friends.filter((friend) => !server.members.includes(friend.id))
                return filteredFriends
            default:
                return [];
        }
    }
    const results = conditionalResults()

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

    console.log(results, searchMode)

    if(searchMode && searchModal ){
        return(
            <div className="search-modal-bg" onClick={handleClose}>
                <div className={searchMode === 'friendship' ? 
                "search-modal-friend" : "search-modal-server"}
                    onClick={(e)=> e.stopPropagation()}>
                    { searchMode === 'friendship' && (
                        <div className='search-area'>
                            <SearchBar type={true}/>
                        </div>
                    )}
                    <div className="results-list">
                        {results.length > 0 && (
                            results.map( user => (
                                <Result key={user.id} user={user} setSearchModal={setSearchModal}/>
                            ))
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

export default SearchModal;