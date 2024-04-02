import { useSelector } from "react-redux"
import { selectServer } from "../../store/serverReducer"
import './serverIcon.css'
const ServerIcon = ({serverId, type }) => {
    const server = useSelector(selectServer(serverId))

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
        <div className="server-icon-wrapper">
            <div className="pill-wrapper"><span className="pill"></span></div>
            { (type === "new") ? (
                <div className="server-icon new">
                    +                    
                </div>
            ) : (<div className="server-icon">
                { conditionalImage() }
            </div>) }
            
        </div>
    )

}

export default ServerIcon


//<img src="/src/assets/icons/green-plus.png"/>