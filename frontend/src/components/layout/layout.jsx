import { useSelector } from "react-redux";

import { useParams } from "react-router-dom";
import { selectCurrentUser } from "../../store/sessionReducer";
import ServerList from "../serverList/serverList";
import Left from "../left/left";
import Middle from "../middle/middle";
import Right from "../right/right";
import './layout.css'
import { useEffect } from "react";

const Layout = () => {
    const {serverId, channelId} = useParams()
    const currentUser = useSelector(selectCurrentUser)
    // if (serverId === '@me') {
    //     console.log(serverId)
    // }
    return(
        <>
        {currentUser && 
        <div className="layout">
            <ServerList />
            <Left />
            <Middle />
            <Right />
        </div>}
        </>
    )
}

export default Layout;