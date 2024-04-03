import './topLeft.css'
import SearchBar from '../searchBar/searchBar';
const TopLeft = ({type}) => {


    return (
        <div className="top-left">
            { type === '@me' ? <SearchBar /> : (<div>server controls</div>)}
        </div>
    )
    
}

export default TopLeft;