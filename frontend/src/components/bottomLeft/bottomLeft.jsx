import { useSelector, useDispatch } from 'react-redux';
import './bottomLeft.css'
import { logoutUser, selectCurrentUser } from '../../store/sessionReducer';
import UserIcon from '../userIcon/userIcon';

const BottomLeft = () => {
    const currentUser = useSelector(selectCurrentUser)
    const dispatch = useDispatch()
    return(
        <div className='bottom-left'>
            <UserIcon user={currentUser} type="bottom-left" />

            <div className='user-options'
                    onClick={() => dispatch(logoutUser())}>
                <img src="https://dischord-clone-seeds.s3.us-west-1.amazonaws.com/icons/leaving.png" />
            </div>
        </div>
    )
}

export default BottomLeft;