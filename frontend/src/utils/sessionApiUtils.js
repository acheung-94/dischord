// WRITE FETCHES

import { csrfFetch } from "./csrfUtils"

export const postUser = userInfo => (
    csrfFetch('/api/users', {
        method: 'post',
        body: JSON.stringify(userInfo)
    })
)

export const postSession = sessionInfo => (
    csrfFetch('/api/session', {
        method: 'post',
        body: JSON.stringify(sessionInfo)
    })
)
export const deleteSession = () => (
    csrfFetch('/api/session', {
        method: 'delete'
    })
)

