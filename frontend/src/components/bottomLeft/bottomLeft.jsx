import { useSelector } from 'react-redux';
import './bottomLeft.css'
import { selectCurrentUser } from '../../store/sessionReducer';

const BottomLeft = () => {
    const currentUser = useSelector(selectCurrentUser)
    return(
        <div className='bottom-left'>
            <div className="user-icon">
                <img src="../../assets/avatar-gold.png" />
            </div>
            <div className="user-icon-text">
                <h4>{currentUser.username}</h4>
                <p>status</p>
            </div>
        </div>
    )
}

export default BottomLeft;