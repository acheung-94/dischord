import { useEffect } from 'react'
import './memberList.css'
import { useDispatch, useSelector } from "react-redux"
import { fetchMembers, selectMembers } from '../../store/membersReducer'
import { useParams } from "react-router-dom"
import UserIcon from '../userIcon/userIcon'
import { selectServer } from '../../store/serverReducer'

const MemberList = ( {props} ) => {
    const dispatch = useDispatch()
    const {serverId} = useParams()
    const members = useSelector(selectMembers)
    const server = useSelector(selectServer(serverId))
    useEffect(()=> {
        dispatch(fetchMembers(serverId))
    }, [serverId])
    
    if (members) {
        return(
            <div className='member-list'>
                <span className='members-heading'>Online - {members.length}</span>
                { members.map( (member) => (
                    <UserIcon user={member} server={server} key={member.id} type="preview"/>
                ))}
            </div>
            
        )

    }
}

export default MemberList