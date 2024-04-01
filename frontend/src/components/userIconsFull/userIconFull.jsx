
const UserIconFull = ( {user} ) => {
    console.log('inside usericonfull')
    return (
        <>
            <span className="user-icon-text">
                <h4>{ user ? user.username : 'sonataformftw'}</h4>
                <p>{user.status || 'placeholder status'}</p>
            </span>
        </>

    )
}

export default UserIconFull;