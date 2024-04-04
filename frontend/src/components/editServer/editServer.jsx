import './editServer.css'

const EditServer = ( {server}) => {

    const [serverData, setServerData ] = useState({
        name: server.name
    })

    const handleChange = e => {
        setServerData( old => ( {...old, name : e.target.value} ))
    }

    const closeModal = e => {
        e.stopPropagation()
        setModalState(null)
    }

    return(
        <div className="edit-bg">
            <div className='edit-content'>
                <div className="close-modal" onClick={closeModal}>
                    <img src="/src/assets/icons/close-x.png" />
                </div>
                <h1>Edit {server.name} </h1>
                <div className="upload-icon">
                    <img src="/src/assets/icons/guildChooseRoleIcon.png"/>
                    <p>upload</p>
                    <img src="/src/assets/icons/guildCreateChannel.png" className="upload-plus" />
                </div>
                <form className="new-server-form">
                    <label > server name </label>
                    <input type="text"
                        placeholder={ server.name }
                        value={serverData.name}
                        onChange={handleChange} />
                </form>
                <div className="new-server-footer">
                    <button type="submit" disabled={ serverData.name ? false : true} onClick={handleSubmit}>Update</button>
                </div>
            </div>
        </div>
    )
}

export default EditServer