import { csrfFetch } from "./csrfUtils";

export const postServer = (serverInfo) => (
    csrfFetch('/api/servers', {
        method: 'post',
        body: JSON.stringify(serverInfo)  // CHANGE THIS WHEN IMG
    })
)

export const destroyServer = (serverId) => (
    csrfFetch(`/api/servers/${serverId}`, {
        method: 'delete'
    })
)

export const getServer = (serverId) => (
    csrfFetch(`/api/servers/${serverId}`)
)

export const patchServer = (server) => (
    csrfFetch(`/api/servers/${server.id}`, {
        method: 'PATCH',
        body: JSON.stringify(server) // CHANGE THIS WHEN IMG
    })
)

export const getServers = () => (
    fetch(`/api/servers`)
)

export const postMembership = (membership) => (
    csrfFetch('/api/memberships', {
        method: 'post',
        body: JSON.stringify(membership)
    })
)

export const deleteMembership = serverId => (
    csrfFetch(`/api/memberships/${serverId}`, {
        method: 'delete'
    })
)