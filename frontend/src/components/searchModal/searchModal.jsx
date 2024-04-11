import './searchModal.css'
import {useSelector, useDispatch} from 'react-redux'
import { searchState, setSearch } from '../../store/uiReducer'
import SearchBar from '../searchBar/searchBar'
import Result from '../result/result'
import { selectSearchResults } from '../../store/searchReducer'
import { resetResults } from '../../store/searchReducer'
const SearchModal = ({searchModal,setSearchModal}) => {
    const searchMode = useSelector(searchState)
    const results = useSelector(selectSearchResults)
    const dispatch = useDispatch()
    
    const handleClose = (e) => {
        e.stopPropagation()
        setSearchModal(false)
        dispatch(resetResults())
    } 
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