import { csrfFetch } from "./csrfUtils";

export const getMessages = (channelId) => (
    csrfFetch(`/api/channels/${channelId}/messages`)
)

export const postMessage = (messageInfo) => (
    csrfFetch(`/api/messages`, {
        method: 'post',
        body: messageInfo
    })
)

export const destroyMessage = (messageId) => (
    csrfFetch(`/api/messages/${messageId}`, {
        method: 'delete'
    })
)

export const patchMessage = (messageInfo, messageId) => (
    csrfFetch(`/api/messages/${messageId}`, {
        method: 'PATCH',
        body: messageInfo
    })
)
