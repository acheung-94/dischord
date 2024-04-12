
import './serverIcon.css'
import { NavLink} from "react-router-dom"
const ServerIcon = ({server, serverId, type }) => {

    const conditionalImage = () => {
        if (serverId) {
            if (server.iconUrl) {
                return (
                    <img className="server-image" src={server.iconUrl} />
                )
            }else {
                return (
                    <div className="no-server-image"> 
                        {server.name.substring(0,1).toUpperCase()} 
                    </div>
                )
            }
        } else {
            return (
                <img src="https://dischord-clone-seeds.s3.us-west-1.amazonaws.com/icons/Vector.png" />
            )
        }
    }
    
    
    if (type === 'new'){
        return (
            <div className="server-icon-wrapper"
                to={`/channels/${serverId}`} >
                <div className="pill-wrapper"><span className="pill"></span></div>
                
                <div className="server-icon new">
                    +                    
                </div>
            </div>
        )
    }else if (type === '@me') {
        return(
            <NavLink className="server-icon-wrapper"
                to={ serverId ? `/channels/${serverId}` : `/channels/@me`} >
                <div className="pill-wrapper"><span className="pill"></span></div>
                <div className="server-icon"
                    >
                    { conditionalImage() }
                </div> 
            </NavLink>
        )
    }else{
        if (server) {
            return (
            <NavLink className="server-icon-wrapper"
                to={ serverId ? `/channels/${serverId}/${server.channels[0]}` : `/channels/@me`} >
                <div className="pill-wrapper"><span className="pill"></span></div>
                <div className="server-icon"
                    title={server.name}>
                    { conditionalImage() }
                </div> 
            </NavLink>
        )
        }
        
    }


}

export default ServerIcon


