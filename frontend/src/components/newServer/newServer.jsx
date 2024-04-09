import { useDispatch, useSelector } from "react-redux"
import { selectCurrentUser } from "../../store/sessionReducer"
import { createMembership, createServer, updateServer } from "../../store/serverReducer"
import { useEffect, useRef, useState } from "react"
import './newServer.css'
import { useNavigate, useParams } from "react-router-dom"


const NewServer = ( {modalState, setModalState, type, server}) => {
    const currentUser = useSelector(selectCurrentUser)
    const hiddenUpload = useRef()
    const navigate = useNavigate()
    const serverId = useParams()
    const dispatch = useDispatch()
    const [serverData, setServerData] = useState(
        type ? {
            id: server.id,
            name: server.name,
            serverIcon: null //was server.iconUrl
        } : {
            name: '',
            serverIcon: null
        })
    
     


    const triggerUpload = () => hiddenUpload.current.click()
    const handleFile = (e) => {
        const file = e.currentTarget.files[0]
        setServerData( old => ( {...old, serverIcon : file } ))
    }
    const handleChange = e => {
        setServerData( old => ( {...old, name : e.target.value} ))
        console.log(serverData)
    }

    //when hitting enter to submit....
    const handleSubmit = (e) => {
        e.preventDefault() // it's not actually preventing default when i hit enter

        const serverFormObj = new FormData();
        serverFormObj.append('server[name]', serverData.name)
        if (serverData.serverIcon){
            serverFormObj.append('server[serverIcon]', serverData.serverIcon)
        }

        if (type) {
            dispatch(updateServer(serverFormObj, server.id))
        }else{
            dispatch(createServer(serverFormObj)).then(newServer => (
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
                <div className={type ? 'upload-icon edit' : 'upload-icon'} onClick={triggerUpload}>
                    <input type="file" className="hidden-upload" ref={hiddenUpload} onChange={handleFile}/>
                    {type ? 
                    <>
                        <img src={server.iconUrl} className="preloaded" />
                        <img src="/src/assets/icons/icon-edit.png" className="preloaded-overlay" />
                    </>
                        : <>
                        <img src="/src/assets/icons/guildChooseRoleIcon.png" className="pic-icon"/>
                        <p>upload</p>
                        <img src="/src/assets/icons/guildCreateChannel.png" className="upload-plus" /> 
                     </>}
                    
                </div>      
                    
                <form className="new-server-form" onSubmit={handleSubmit}>
                    <label > server name </label>
                    <input type="text"
                        placeholder={ `${currentUser.username}'s server` }
                        value={serverData.name}
                        onChange={handleChange} />
                <div className="new-server-footer">
                    <button type="submit" 
                        disabled={ serverData.name ? false : true} 
                        >
                            {type ? "Save" : "Create"}
                    </button>
                </div>
                </form>
            </div>
        </div>
    )
}

export default NewServer