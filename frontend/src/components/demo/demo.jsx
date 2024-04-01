import { useDispatch, useSelector } from 'react-redux'
import './demo.css'
import { loginUser, selectCurrentUser } from '../../store/sessionReducer'
import { useNavigate } from 'react-router-dom'

const Demo = () => {
    const demoInfo = {
        credential: 'demo1',
        password: 'themostsecure'
    }
    const dispatch = useDispatch()

    const navigate = useNavigate()
    const handleDemo = () => {
        dispatch(loginUser(demoInfo))
        navigate('/channels/@me')
    }
    
    return(
        <div className="demo-login">
            <h4>Log in as a demo user!</h4>
            <div className="user-1" onClick={handleDemo}>
                <span className='user-1-icon'></span>
                <span className="user-1-text">
                <h4>sonataformftw</h4>
                <p>Online</p>
            </span>
            </div>
        </div>
    )
}

export default Demo;

//TODO modularize the user icons! Will need to reuse them throughout application. 