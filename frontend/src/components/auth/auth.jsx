import { useDispatch, useSelector } from "react-redux"
import { createUser, loginUser, selectCurrentUser } from "../../store/sessionReducer"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import './auth.css'
import Demo from "../demo/demo"

const Auth = ({ type }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const currentUser = useSelector(selectCurrentUser)
    
    const isLogin = type === 'login'
    const isRegister = type === 'register'

    const [loginData, setLoginData] = useState(isLogin ? {
        credential: '',
        password: ''
        } : '')

    const [registerData, setRegisterData] = useState( isRegister ? {
        email: '',
        username: '',
        password: '',
        displayName: ''
    } : '')

    const [errors, setErrors] = useState({
        messages: ""
    })
    
    const [regErrors, setRegErrors] = useState({
        email: '',
        username: '',
        password: ''
    })

    const formatErrors = data  => {
        let newErrors = {}
        if (data.email) {
            newErrors.email = data.email[0]
        }
        if (data.password ){
            //TODO: find the source of this extra validation message and destroy it.
            if (data.password[0] === "can't be blank") {
                newErrors.password = "Required"
            }else{
                newErrors.password = data.password[0]
            }
        }
        if (data.username){
            newErrors.username = data.username[0]
        }
        setRegErrors(newErrors)
    }


    useEffect( () => {
        if (currentUser){
            navigate('/channels/@me')
        }

        setLoginData(()=> ({
            credential: '',
            password: ''
            }))
        setRegisterData(()=> ({
            email: '',
            username: '',
            password: '',
            displayName: ''
        }))
        setRegErrors({
            email: '',
            username: '',
            password: ''
        })
        setErrors({
            messages: ""
        })
    }, [type]) 


    const handleChange = field => e => (
        isLogin ? 
            setLoginData( old => ({ ...old, [field] : e.target.value })) : 
            setRegisterData( old => ({ ...old, [field] : e.target.value }))
    )

    const handleSubmit = e => {
        e.preventDefault()
        if (isLogin) {
            dispatch(loginUser(loginData))
                .then(()=> navigate('/channels/@me'))
                .catch( async res => {
                    let data = await res.json()
                    setErrors( old => ({...old, messages:data.errors}))
                })
        } else {
            dispatch(createUser(registerData))
                .then(()=> navigate('/channels/@me'))
                .catch( async res => {
                    let data = await res.json()
                    formatErrors(data)
                })
        }
    }


    return(
        <div className="page-wrapper">
        <div className={ isLogin ? "signin-wrapper active" : "register-wrapper active"}> 
            {isLogin && 
            <form className="signin" onSubmit={handleSubmit}>
                <div className="welcome">
                    <h1>Welcome Back!</h1>
                    <p>We're so excited to see you again!</p>
                </div>
                <label className={errors.messages ? "error" : "required"}> Email or username {errors.messages && (
                        <span className="err-msg"> - {errors.messages}</span>)}
                </label>
                    <input type="text" value={loginData.credential} onChange={handleChange('credential')} />
                
                <label className={errors.messages ? "error" : "required"}> Password {errors.messages && (
                        <span className="err-msg"> - {errors.messages}</span>)}
                </label>
                    <input type="password" value={loginData.password} onChange={handleChange('password')} />
                
                <button type="submit"> Log In </button>
                <p className="bottom">Need an account? <Link to={`/register`}> Register </Link></p>
            </form>}
            {isLogin && <div className="separator"></div> }
            {isLogin && ( <div className="signin-right"><Demo /></div> )}
            {isRegister && 
                <form className="register" onSubmit={handleSubmit}>
                    <h1>Create an account</h1>
                    <label className={regErrors.email ? "error" : "required"}> 
                        Email 
                        {(regErrors.email === 'Required') && (
                        <span className="err-msg"> - {regErrors.email}</span>
                        )}
                    </label>
                        <input type="text" value={registerData.email} onChange={handleChange('email')}/>
                        { regErrors.email && regErrors.email !== 'Required' && (
                            <span className="err-msg"> {regErrors.email}</span>
                        )}
                    <label > Display Name </label>
                        <input type="text" value={registerData.displayName} onChange={handleChange('displayName')}/>
                    <label className={regErrors.username ? "error" : "required"}> Username 
                        {(regErrors.username === 'Required') && (
                        <span className="err-msg"> - {regErrors.username}</span>
                        )}
                    </label>
                        <input type="text" value={registerData.username} onChange={handleChange('username')}/>
                        { regErrors.username && regErrors.username !== 'Required' && (
                            <span className="err-msg"> {regErrors.username}</span>
                        )}
                    <label className={regErrors.password ? "error" : "required"}> Password 
                        {(regErrors.password === 'Required') && (
                        <span className="err-msg"> - {regErrors.password}</span>
                        )}
                    </label>
                        <input type="password" value={registerData.password} onChange={handleChange('password')}/>
                        { regErrors.password && regErrors.password !== 'Required' && (
                            <span className="err-msg"> {regErrors.password}</span>
                        )}
                    <button type="submit"> Continue </button>
                    <p className="bottom"> <Link to={`/login`}> Already have an account? </Link></p>
                </form>
            }
        </div>
        </div>
    )

}

export default Auth

//TODO: modularize modularize modularize

// Add a pseudo class for form labels to indicate 'required' and place a red asterisk at the end.

//it would be kind of nice to dynamically generate these fields based on my backend fields. 