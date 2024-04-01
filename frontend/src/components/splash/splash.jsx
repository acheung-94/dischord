import { useNavigate } from "react-router-dom";
import './splash.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareGithub, faLinkedin, faDiscord } from '@fortawesome/free-brands-svg-icons'
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/sessionReducer";
const Splash = () => {
    const navigate = useNavigate()
    const currentUser = useSelector(selectCurrentUser)
    return(
        <>
            <div className="splash-page-wrapper">
            <div className="welcome-wrapper">
                <div className="splash-navbar">
                    <span className="logo"><FontAwesomeIcon icon={faDiscord} /> Dischord</span>
                    <div className="links">
                        <a href="https://github.com/acheung-94"><FontAwesomeIcon icon={faSquareGithub} /> Github </a>
                        <a href="https://www.linkedin.com/in/andrea-cheung-b9b5072b2/"><FontAwesomeIcon icon={faLinkedin} /> LinkedIn  </a>
                        <a href="https://discord.com"> The Real Discord  </a>
                    </div>
                    <button className="to-login" onClick={
                        ()=> currentUser ? navigate('/channels/@me') : navigate('/login')}>
                         {currentUser ? "Open Dischord" : "Login"}
                    </button>
                </div>
                <div className="welcome-msg">
                    <h1> Imagine a place... </h1>
                    <p>...where you can belong to a school club, a gaming group, or a worldwide art community. Where just you and a handful of friends can spend time together. A place that makes it easy to talk every day and hang out more often.</p>
                    <p>Well... you've found it.</p>
                    <h4>Welcome to Dischord.</h4>
                </div>
                <div className="welcome-footer"></div>   
              </div>     
            </div>
            
        </>
    )
}

export default Splash;