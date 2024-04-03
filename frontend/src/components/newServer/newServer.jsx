import { useDispatch, useSelector } from "react-redux"
import { selectCurrentUser } from "../../store/sessionReducer"
import { createMembership, createServer } from "../../store/serverReducer"
import { useState } from "react"
import './newServer.css'


const NewServer = ( {modalState, setModalState}) => {
    const currentUser = useSelector(selectCurrentUser)
    const dispatch = useDispatch()
    const [serverData, setServerData] = useState({
        name: ''
        // placeholder for user uploaded img
    })
    const handleChange = e => {
        setServerData( old => ( {...old, name : e.target.value} ))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(createServer(serverData))
        //don't forget to create a membership too!
        setModalState(null)
    }
    const closeModal = e => {
        e.stopPropagation()
        setModalState(null)
    }

    return (
        <div className="new-server-bg" >
            <div className="new-server-content">
                <div className="close-modal" onClick={closeModal}>
                    <img src="/src/assets/icons/close-x.png" />
                </div>
                <div className="new-server-text">
                    <h1>Create Your Server</h1>
                    <p>Give your new server a personality with a name and an icon. You can always change it later.</p>
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
                    <button type="submit" disabled={ serverData.name ? false : true} onClick={handleSubmit}>Create</button>
                </div>
            </div>
        </div>
    )
}

export default NewServer