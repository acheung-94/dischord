import { useSelector } from "react-redux"
import { selectServer } from "../../store/serverReducer"

const ServerIcon = ({serverId}) => {
    const server = useSelector(selectServer(serverId))

    const conditionalImage = () => {
        if (server.imgPath) {
            return (
                <img className="server-image" src={`${server.imgPath}`} />
            )
        }else {
            return (
                <div className="no-server-image"> 
                    {server.name.substring(0,1).toUpperCase()} 
                </div>
            )
        }
    }

    if (serverId) {
        return (
            <>
                <div className="server-pill"></div>
                <div className="server-icon">
                    { conditionalImage() }
                </div>
            </>
        )
    } else {
        return(
            <>
                <div className="dm-icon">
                    <img src="" />
                </div>
            </>
        )
    }
}

export default ServerIcon