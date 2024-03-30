import { useDispatch } from "react-redux"
import { createUser, loginUser } from "../store/sessionReducer"
import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import './auth.css'

const Auth = ({ type }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const isLogin = type === 'login'
    const isRegister = type === 'register'

    const formType = isLogin ? {
        credential: '',
        password: ''
        } : {
            email: '',
            username: '',
            password: '',
            displayName: ''
        }

    const [formData, setFormData] = useState(formType)
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

            if (data.password[0] === "can't be blank") {
                newErrors.password = "Required"
            }else{
                console.log(data.password)
                newErrors.password = data.password[0]
            }
        }
        if (data.username){
            newErrors.username = data.username[0]
        }

        setRegErrors(newErrors)
    }


    useEffect( () => {
        setFormData(() => formType)
    }, [type]) 


    const handleChange = field => e => (
        setFormData( old => ({ ...old, [field] : e.target.value }))
    )

    const handleSubmit = e => {
        e.preventDefault()
        if (isLogin) {
            dispatch(loginUser(formData)).catch( async res => {
                let data = await res.json()
                setErrors( old => ({...old, messages:data.errors}))

            })
        } else {
            dispatch(createUser(formData)).catch( async res => {
                let data = await res.json()
                formatErrors(data)
                console.log(regErrors)
            })
        }
    }
    return(
        <div className="page-wrapper">
        <div className={ isLogin ? "signin-wrapper" : "register-wrapper"}> 
            {isLogin && 
            <form className="signin" onSubmit={handleSubmit}>
                <div className="welcome">
                    <h1>Welcome Back!</h1>
                    <p>We're so excited to see you again!</p>
                </div>
                <label className={errors.messages ? "error" : "required"}> Email or username {errors.messages && (
                        <span className="err-msg"> - {errors.messages}</span>)}
                </label>
                    <input type="text" value={formData.credential} onChange={handleChange('credential')} />
                
                <label className={errors.messages ? "error" : "required"}> Password {errors.messages && (
                        <span className="err-msg"> - {errors.messages}</span>)}
                </label>
                    <input type="password" value={formData.password} onChange={handleChange('password')} />
                
                <button type="submit"> Log In </button>
                <p className="bottom">Need an account? <Link to={`/register`}> Register </Link></p>
            </form>}
            {isLogin && <div className="separator"></div> }
            {isLogin && 
            <div className="signin-right">
                <p>Placeholder for dummy accounts</p>
            </div>}
            {isRegister && 
                <form className="register" onSubmit={handleSubmit}>
                    <h1>Create an account</h1>
                    <label className={regErrors.email ? "error" : "required"}> 
                        Email 
                        {(regErrors.email === 'Required') && (
                        <span className="err-msg"> - {regErrors.email}</span>
                        )}
                    </label>
                        <input type="text" value={formData.email} onChange={handleChange('email')}/>
                        { regErrors.email && regErrors.email !== 'Required' && (
                            <span className="err-msg"> {regErrors.email}</span>
                        )}
                    <label > Display Name </label>
                        <input type="text" value={formData.displayName} onChange={handleChange('displayName')}/>
                    <label className={regErrors.username ? "error" : "required"}> Username 
                        {(regErrors.username === 'Required') && (
                        <span className="err-msg"> - {regErrors.username}</span>
                        )}
                    </label>
                        <input type="text" value={formData.username} onChange={handleChange('username')}/>
                        { regErrors.username && regErrors.username !== 'Required' && (
                            <span className="err-msg"> {regErrors.username}</span>
                        )}
                    <label className={regErrors.password ? "error" : "required"}> Password 
                        {(regErrors.password === 'Required') && (
                        <span className="err-msg"> - {regErrors.password}</span>
                        )}
                    </label>
                        <input type="password" value={formData.password} onChange={handleChange('password')}/>
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

// Add a pseudo class for form labels to indicate 'required' and place a red asterisk at the end.

//it would be kind of nice to dynamically generate these fields based on my backend fields. 