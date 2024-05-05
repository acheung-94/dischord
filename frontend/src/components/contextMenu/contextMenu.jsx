import { useDispatch, useSelector } from 'react-redux'
import './contextMenu.css'
import { useParams } from 'react-router-dom'
import { selectServer, updateServer } from '../../store/serverReducer'
import { contextMenu, setContextTarget } from '../../store/uiReducer'
import { useEffect } from 'react'

const ContextMenu = ( { target } ) => {
    const { serverId } = useParams()
    const server = useSelector(selectServer(serverId))
    const dispatch = useDispatch()
    const context = useSelector(contextMenu)

    const handleClick = (e) => {
        e.stopPropagation()
        const serverData = new FormData()
        serverData.append('server[ownerId]', target.userId)
        dispatch(updateServer(serverData, serverId))
        dispatch(setContextTarget(null))
    }
    useEffect(() => {
        const handleClose = (e) => {
            if (context && !e.target.closest('.context-menu')) {
              dispatch(setContextTarget(null));
            }
        }
        document.addEventListener('click', handleClose)
        return () => {
            document.removeEventListener('click', handleClose)
        }
    }, [context, dispatch])

    return(
        <div className="member-context-menu"
            style={
                {position: "absolute",
                top: target.y,
                left: target.x - 200
                }
            }>
            <div className="transfer-ownership" onClick={handleClick}>
                <p>Transfer Server Ownership</p>
                <img src="https://dischord-clone-seeds.s3.us-west-1.amazonaws.com/icons/guildPricacySettings.svg" />
            </div>
            <div className="add-friend">

            </div>
        </div>
    )
}

export default ContextMenu