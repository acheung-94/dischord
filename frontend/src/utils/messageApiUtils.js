import { csrfFetch } from "./csrfUtils";

export const getMessages = (channelId) => (
    csrfFetch(`/api/channels/${channelId}/messages`)
)

export const postMessage = (messageInfo) => (
    csrfFetch(`/api/messages`, {
        method: 'post',
        body: JSON.stringify(messageInfo) 
    })
)

export const destroyMessage = (messageId) => (
    csrfFetch(`/api/messages/${messageId}`, {
        method: 'delete'
    })
)

// export const getChannel = (serverId, channelId) => (
//     csrfFetch(`/api/servers/${serverId}/channels/${channelId}`)
// )

export const patchMessage = (messageInfo) => (
    csrfFetch(`/api/messages/${messageInfo.id}`, {
        method: 'PATCH',
        body: JSON.stringify(messageInfo)
    })
)
