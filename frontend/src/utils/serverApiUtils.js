import { csrfFetch } from "./csrfUtils";

export const postServer = (serverInfo) => (
    csrfFetch('/api/servers', {
        method: 'post',
        body: JSON.stringify(serverInfo)
    })
)

export const destroyServer = (serverId) => (
    csrfFetch(`api/servers/${serverId}`, {
        method: 'delete'
    })
)

export const getServer = (serverId) => (
    csrfFetch(`api/servers/${serverId}`)
)

export const patchServer = (server) => (
    csrfFetch(`api/servers/${server.id}`, {
        method: 'patch',
        body: JSON.stringify(server)
    })
)