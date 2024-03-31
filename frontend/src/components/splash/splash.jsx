import { Link } from "react-router-dom";
import './splash.css'

const Splash = () => {

    return(
        <>
        <div className="splash-page-wrapper">
            <div className="splash-navbar">
                <Link to={`/login`}>Login</Link>
            </div>
            <div className="welcome-msg">
                <h1> Imagine a place... </h1>
                <p>...where you can belong to a school club, a gaming group, or a worldwide art community. Where just you and a handful of friends can spend time together. A place that makes it easy to talk every day and hang out more often.</p>
            </div>          
        </div>
        </>

    )
}

export default Splash;