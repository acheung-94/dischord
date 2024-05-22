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
import { loadingState} from "../../store/uiReducer";
import consumer from "../../utils/consumer";
import { addFriend } from "../../store/friendsReducer";
const Layout = ({type}) => {
    // STATE
    const currentUser = useSelector(selectCurrentUser)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {serverId, channelId} = useParams()
    const loading = useSelector(loadingState)
    const isValid = () => {
        if (!currentUser){
            return false
        }else if (!currentUser.servers[parseInt(serverId)]){
            return false
        }else if (currentUser.servers[parseInt(serverId)]){
            return true
        }
    }

    // AFTER RENDER


    useEffect( () => {
        if (type === 'channel'){
            dispatch(getServerChannels(serverId))
        }
    }, [serverId])

    useEffect(() => {
        if (!currentUser) {
            navigate('/')
        }else{
            dispatch(getUserServers())
        }
    }, [currentUser])
    
    useEffect(() => {
        if (currentUser){
            const sub = consumer.subscriptions.create( {
                channel: 'UsersChannel'
            }, {
                received(friendRequest){
                    console.log("got a friend request!!")
                    dispatch(addFriend(friendRequest))
                }
            })
            return () => consumer.subscriptions.remove(sub)
        }
    }, [currentUser, dispatch])
    // RENDER
    
    if (currentUser) {
        return(

        <div className="layout">
            <ServerList />
            <div className={ type === '@me' ? "main-grid-thick" : "main-grid-thin"}>
                <Left type={type}/>
                <Middle type={type}/>
                <Top type={type} />

            </div>
        </div>
    )}
   
}

export default Layout;

