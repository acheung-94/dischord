import { useSelector } from "react-redux";

import { useNavigate, useParams } from "react-router-dom";
import { selectCurrentUser } from "../../store/sessionReducer";
import ServerList from "../serverList/serverList";
import Left from "../left/left";
import Middle from "../middle/middle";
import Right from "../right/right";
import Top from "../top/top";
import './layout.css'
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUserServers } from "../../store/serverReducer";
import { getServerChannels } from "../../store/channelReducer";

const Layout = ({type}) => {
    // STATE
    const currentUser = useSelector(selectCurrentUser)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true)
    const {serverId, channelId} = useParams()
    // AFTER RENDER

    useEffect( ()=>{
        if(currentUser){
        console.log('fetching servers...')
        dispatch(getUserServers())
        setIsLoading(true)}
    },[currentUser])

    useEffect(()=> {
        if (currentUser){
            setIsLoading(false)
        }
    }, [currentUser])

    useEffect( () => {
        if (!currentUser && !isLoading){
            navigate('/')
        }
    }, [currentUser, isLoading])

    useEffect( () => {
        if (type === 'channel'){
            console.log(serverId)
            dispatch(getServerChannels(serverId))
        }
    }, [serverId])
    
    console.log(type)
    // RENDER

    if (currentUser && !isLoading) {
        return(

        <div className="layout">
            <ServerList />
            <div className={ type === '@me' ? "main-grid-thick" : "main-grid-thin"}>
                <Left type={type}/>
                <Middle type={type}/>
                <Top type={type} />
                <Right type={type}/>
            </div>
        </div>
    )}else if (isLoading) {
        return(<h1>Loading....</h1>)
    }
   
}

export default Layout;

