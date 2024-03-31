import { useDispatch } from 'react-redux'
import './demo.css'
import { loginUser } from '../../store/sessionReducer'

const Demo = () => {
    const demoInfo = {
        credential: 'demo1',
        password: 'themostsecure'
    }
    const dispatch = useDispatch()
    return(
        <div className="demo-login">
            <div className="user-1" onClick={()=> dispatch(loginUser(demoInfo))}>
                <span className="user-1-icon"></span>
                <span className="user-1-text">
                    <p>Log in as</p>
                    <h4>sonataformftw</h4>
                </span>
            </div>

        </div>
    )
}

export default Demo;

//TODO modularize the user icons! Will need to reuse them throughout application. 