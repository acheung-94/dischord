import './searchBar.css'
import { searchState } from '../../store/uiReducer';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react';
import { findUsers } from '../../store/searchReducer';
import { resetResults } from '../../store/searchReducer';
const SearchBar = ({type, setSearchMessage}) => {
    const searchMode = useSelector(searchState)
    const dispatch = useDispatch()
    const searchRef = useRef()
    const [username, setUsername] = useState('')

    const handleSubmit = e => {
        e.preventDefault()
        if (searchMode === 'friendship'){
            dispatch(resetResults())
            dispatch(findUsers(username))// search users, eventually can search messages, servers, etc. 
            setUsername('')
            setSearchMessage('Loading...') 
        }
    }
    useEffect(() => {
        searchRef.current && searchRef.current.focus()
    }, [searchRef])

    if(!type){ // ie if this is just for looks
        return(
            <div className="search-bar">
                 <input type="text" placeholder="This does nothing :)"/>
                 <img src="https://dischord-clone-seeds.s3.us-west-1.amazonaws.com/icons/discoverySearch.png" />
            </div>
        )
    }else{
        return(
            <form className='search-form' onSubmit={handleSubmit}>
                <label> Search for users by username:</label>
                <div className="search-form-b">
                    <input type="text"
                        placeholder='Type in a username to search...'
                        ref={searchRef} 
                        onChange={(e)=> setUsername(e.target.value)} 
                        onClick={(e)=> e.stopPropagation()} 
                        value={username}/>
                    <button type="submit">Search</button>
                </div>
            </form>
        )
    }
}

export default SearchBar;