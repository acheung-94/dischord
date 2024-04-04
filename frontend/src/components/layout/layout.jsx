import { useSelector } from "react-redux";

import { useNavigate, useParams } from "react-router-dom";
import { selectCurrentUser } from "../../store/sessionReducer";
import ServerList from "../serverList/serverList";
import Left from "../left/left";
import Middle from "../middle/middle";
import Right from "../right/right";
import Top from "../top/top";
import './layout.css'
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserServers } from "../../store/serverReducer";

const Layout = ({type}) => {
    const {serverId, channelId} = useParams()
    const currentUser = useSelector(selectCurrentUser)
    const navigate = useNavigate()
    const dispatch = useDispatch()

     useEffect( ()=>{
        console.log('fetching servers...')
        dispatch(getUserServers())
    },[])
    
    if (currentUser) {
        return(

        <div className="layout">
            <ServerList />
            <div className="main-grid">
                <Left type={type}/>
                <Middle type={type}/>
                <Top type={type} />
                <Right type={type}/>
            </div>
        </div>

    )
    }else{
        navigate('/')
    }
    
   
}

export default Layout;