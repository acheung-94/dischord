import { useSelector } from 'react-redux';
import './bottomLeft.css'
import { selectCurrentUser } from '../../store/sessionReducer';

const BottomLeft = () => {
    const currentUser = useSelector(selectCurrentUser)
    return(
        <div className='bottom-left'>
            <div className="user-icon">
                <img className="avatar" src="/src/assets/icons/avatar-gold.png" />
                <img className='status' src="/src/assets/icons/icon-on.png" />
                <div className="user-icon-text">
                    <h4>{currentUser.username}</h4>
                    <p>Online</p>
                </div>
            
            </div>
            <div className='user-options'>
                <img src="/src/assets/icons/icon-gear.png" alt="" />
            </div>
        </div>
    )
}

export default BottomLeft;