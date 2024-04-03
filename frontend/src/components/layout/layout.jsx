import { useSelector } from "react-redux";

import { useParams } from "react-router-dom";
import { selectCurrentUser } from "../../store/sessionReducer";
import ServerList from "../serverList/serverList";
import Left from "../left/left";
import Middle from "../middle/middle";
import Right from "../right/right";
import Top from "../top/top";
import './layout.css'
import { useEffect } from "react";

const Layout = ({type}) => {
    const {serverId, channelId} = useParams()
    const currentUser = useSelector(selectCurrentUser)
    // if (serverId === '@me') {
    //     console.log(serverId)
    // }
    //types = @me, server
    if (type === '@me'){ //this will be handled in the router eventually
    
    return(
        <>
        {currentUser && 
        <div className="layout">
            <ServerList />
            <div className="main-grid">
                <Left type='@me'/>
                <Middle type='@me'/>
                <Top type='@me' />
                <Right type='@me'/>
            </div>
        </div>}
        </>
    )
    }
}

export default Layout;