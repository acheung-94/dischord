import { csrfFetch } from "./csrfUtils";

export const getChannels = (serverId) => (
    csrfFetch(`/api/servers/${serverId}/channels`)
        
)

export const postChannel = (channelInfo) => (
    csrfFetch(`/api/channels`, {
        method: 'post',
        body: JSON.stringify(channelInfo) 
    })
)

export const destroyChannel = (channelId) => (
    csrfFetch(`/api/channels/${channelId}`, {
        method: 'delete'
    })
)

export const patchChannel = (channelInfo) => (
    csrfFetch(`/api/channels/${channelInfo.id}`, {
        method: 'PATCH',
        body: JSON.stringify(channelInfo)
    })
)
