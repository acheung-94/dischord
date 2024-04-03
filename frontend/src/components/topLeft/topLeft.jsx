import './topLeft.css'
import SearchBar from '../searchBar/searchBar';
import ServerControls from '../serverControls/serverControls';
const TopLeft = ({type}) => {


    return (
        <div className="top-left">
            { type === '@me' ? <SearchBar /> : (<ServerControls />)}
        </div>
    )
    
}

export default TopLeft;