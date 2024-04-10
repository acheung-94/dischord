export const getMembers = serverId => (
    fetch(`/api/users/?server_id=${serverId}`)
)