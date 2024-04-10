import './searchModal.css'
import {useSelector, useDispatch} from 'react-redux'
import { searchState, setSearch } from '../../store/uiReducer'
import SearchBar from '../searchBar/searchBar'
import Result from '../result/result'
import { selectSearchResults } from '../../store/searchReducer'

const SearchModal = () => {
    const searchMode = useSelector(searchState)
    const results = useSelector(selectSearchResults)
    console.log(results)
    if(searchMode){
        return(
            <div className="search-modal-bg">
                <div className={searchMode === 'friendship' ? "search-modal-friend" : "search-modal-server"}>
                    { searchMode === 'friendship' && (
                        <div className='search-area'>
                            <SearchBar type={true}/>
                        </div>
                    )}
                    <div className="results-list">
                        {results.length > 0 && (
                            results.map( user => (
                                <Result user={user}/>
                            ))
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

export default SearchModal;