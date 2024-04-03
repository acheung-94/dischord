import { useSelector } from "react-redux"
import { selectServer } from "../../store/serverReducer"
import './serverIcon.css'
import { NavLink, useNavigate } from "react-router-dom"
const ServerIcon = ({serverId, type }) => {
    const server = useSelector(selectServer(serverId))
    const navigate = useNavigate()
    const conditionalImage = () => {
        if (serverId) {
            if (server.imgPath) {
                return (
                    <img className="server-image" src={server.imgPath} />
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
                <img src="/src/assets/icons/Vector.png" />
            )
        }
    }

    return (
        <NavLink className="server-icon-wrapper"
            to={`/channels/${serverId}`} >
            <div className="pill-wrapper"><span className="pill"></span></div>
            { (type === "new") ? (
                <div className="server-icon new">
                    +                    
                </div>
            ) : (<div className="server-icon">
                { conditionalImage() }
            </div>) }
        </NavLink>
    )

}

export default ServerIcon


//<img src="/src/assets/icons/green-plus.png"/>