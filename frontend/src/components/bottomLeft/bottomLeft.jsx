import { useSelector, useDispatch } from 'react-redux';
import './bottomLeft.css'
import { logoutUser, selectCurrentUser } from '../../store/sessionReducer';

const BottomLeft = () => {
    const currentUser = useSelector(selectCurrentUser)
    const dispatch = useDispatch()
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
            <div className='user-options'
                    onClick={() => dispatch(logoutUser())}>
                <img src="/src/assets/icons/leaving.png" />
            </div>
        </div>
    )
}

export default BottomLeft;