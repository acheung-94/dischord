import { useDispatch, useSelector } from 'react-redux'
import './demo.css'
import { loginUser } from '../../store/sessionReducer'
import { useNavigate } from 'react-router-dom'

const Demo = ({user}) => {
    const demoInfo1 = {
        credential: 'demo1',
        password: 'themostsecure'
    }
    const demoInfo2 = {
        credential: 'demo2',
        password: 'themostsecure2'
    }
    const dispatch = useDispatch()

    const navigate = useNavigate()
    const handleDemo = () => {
        if (user === 1){
            dispatch(loginUser(demoInfo1))
        }else if (user === 2){
            dispatch(loginUser(demoInfo2))
        }
        navigate('/channels/@me')
    }
    
    return(
        <div className="demo-login">
            <h4>Log in as a demo user!</h4>
            <div className="user-1" onClick={handleDemo}>
                { user === 1 ? 
                    (<span className='user-1-icon'></span>) : 
                    (<span className='user-2-icon'></span>)}
                <span className="user-1-text">
                { user === 1 && (
                    <>
                        <h4>demo1</h4>
                        <p></p>
                    </>
                )}
                { user === 2 && (
                    <>
                    <h4>demo2</h4>
                    <p></p>
                </>
                )}
            </span>
            </div>
        </div>
    )
}

export default Demo;

//TODO modularize the user icons! Will need to reuse them throughout application. 