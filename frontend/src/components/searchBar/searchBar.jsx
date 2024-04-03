import './searchBar.css'

const SearchBar = () => {

    return(
        <div className="search-bar">
             <input type="text" placeholder="This does nothing :)"/>
             <img src="/src/assets/icons/discoverySearch.png" />
        </div>
    )
}

export default SearchBar;