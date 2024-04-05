import { csrfFetch } from "./csrfUtils";

export const getChannels = (serverId) => (
    csrfFetch(`/api/servers/${serverId}/channels`)
        
)

export const postChannel = (channelInfo) => (
    csrfFetch(`/api/servers/${channelInfo.serverId}/channels`, {
        method: 'post',
        body: JSON.stringify(channelInfo) 
    })
)

export const destroyChannel = (serverId, channelId) => (
    csrfFetch(`/api/servers/${serverId}/channels/${channelId}`, {
        method: 'delete'
    })
)

export const getChannel = (serverId, channelId) => (
    csrfFetch(`/api/servers/${serverId}/channels/${channelId}`)
)

export const patchChannel = (channelInfo) => (
    csrfFetch(`/api/servers/${channelInfo.serverId}/channels/${channelInfo.id}`, {
        method: 'PATCH',
        body: JSON.stringify(channelInfo)
    })
)
