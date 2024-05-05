export const getMembers = serverId => (
    fetch(`/api/servers/${serverId}/memberships`)
)

export const getUsers = username => (
    fetch(`/api/users/?username=${username}`)
)