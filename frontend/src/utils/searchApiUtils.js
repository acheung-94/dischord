export const getMembers = serverId => (
    fetch(`/api/users/?server_id=${serverId}`)
)

export const getUsers = username => (
    fetch(`/api/users/?username=${username}`)
)