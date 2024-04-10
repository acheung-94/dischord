import './searchBar.css'
import { searchState } from '../../store/uiReducer';
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react';
const SearchBar = ({type}) => {
    const searchMode = useSelector(searchState)
    const dispatch = useDispatch()
    const [username, setUsername] = useState('')


    const handleSubmit = e => {
        e.preventDefault()
        if (searchMode === 'friendship'){
            dispatch()// search users, eventually can search messages, servers, etc. 
            setUsername('') 
        }
    }
    if(!type){ // ie if this is just for looks
        return(
            <div className="search-bar">
                 <input type="text" placeholder="This does nothing :)"/>
                 <img src="/src/assets/icons/discoverySearch.png" />
            </div>
        )
    }else{
        return(
            <form className='search-form'>
                <label> Search for users by username:</label>
                <div className="search-form-b">
                    <input type="text" />
                    <button type="submit">Search</button>
                </div>
            </form>
        )
    }
}

export default SearchBar;