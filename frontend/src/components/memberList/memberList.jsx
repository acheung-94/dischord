import { useEffect } from 'react'
import './memberList.css'
import { useDispatch, useSelector } from "react-redux"
import { fetchMembers, selectMembers } from '../../store/membersReducer'
import { useParams } from "react-router-dom"
import UserIcon from '../userIcon/userIcon'
import { selectServer } from '../../store/serverReducer'
import { contextMenu } from '../../store/uiReducer'
import ContextMenu from '../contextMenu/contextMenu'
import { selectCurrentUser } from '../../store/sessionReducer'

const MemberList = ( {props} ) => {
    const dispatch = useDispatch()
    const {serverId} = useParams()
    const members = useSelector(selectMembers)
    const server = useSelector(selectServer(serverId))
    const target = useSelector(contextMenu)
    const currentUser = useSelector(selectCurrentUser)

    useEffect(()=> {
        dispatch(fetchMembers(serverId))
    }, [serverId])
    

    if (members) {
        return(
            <div className='member-list' >
                <span className='members-heading'>Online - {members.length}</span>
                { members.map( (member) => (
                    <UserIcon user={member} server={server} key={member.id} type="preview"/>
                ))}
                {(target && currentUser.id === server.ownerId) && (<ContextMenu target={target}/>)}
            </div>
            
        )

    }
}

export default MemberList