import { useDispatch, useSelector } from "react-redux"
import { selectCurrentUser } from "../../store/sessionReducer"
import { createMembership, createServer, updateServer } from "../../store/serverReducer"
import { useEffect, useState } from "react"
import './newServer.css'
import { useNavigate, useParams } from "react-router-dom"


const NewServer = ( {modalState, setModalState, type, server}) => {
    const currentUser = useSelector(selectCurrentUser)
    const navigate = useNavigate()
    const serverId = useParams()
    const dispatch = useDispatch()
    const [serverData, setServerData] = useState(
        type ? {
            name: server.name,
        } : {
            name: ''
        // eventually user uploaded img
        })


    const handleChange = e => {
        setServerData( old => ( {...old, name : e.target.value} ))
    }
    console.log("serverId", serverId)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (type) {
            dispatch(updateServer({...server, ...serverData}))
        }else{
            dispatch(createServer(serverData)).then(newServer => (
                navigate(`/channels/${newServer.id}/${newServer.channels[0]}`)
            ))
        }
        setModalState(null)
    }
    const closeModal = e => {
        e.stopPropagation()
        setModalState(null)
    }
    //this is awful.
    const doNotClose = (e) => {
        e.stopPropagation()
    } 
    return (
        <div className={ type ? "new-server-bg edit" : "new-server-bg"} onClick={doNotClose} >
            <div className="new-server-content">
                <div className="close-modal" onClick={closeModal}>
                    <img className="close-modal-img" src="/src/assets/icons/close-x.png" />
                </div>
                <div className="new-server-text">
                    <h1> { type ? "Server Overview" : "Create Your Server"}</h1>
                    { !type && (
                        <p>Give your new server a personality with a name and an icon.
                            You can always change it later.</p>
                    )}
                   
                </div>
                <div className="upload-icon">
                    <img src="/src/assets/icons/guildChooseRoleIcon.png"/>
                    <p>upload</p>
                    <img src="/src/assets/icons/guildCreateChannel.png" className="upload-plus" />
                </div>      
                    
                <form className="new-server-form">
                    <label > server name </label>
                    <input type="text"
                        placeholder={ `${currentUser.username}'s server` }
                        value={serverData.name}
                        onChange={handleChange} />
                </form>
                <div className="new-server-footer">
                    <button type="submit" disabled={ serverData.name ? false : true} onClick={handleSubmit}>{type ? "Save" : "Create"}</button>
                </div>
            </div>
        </div>
    )
}

export default NewServer