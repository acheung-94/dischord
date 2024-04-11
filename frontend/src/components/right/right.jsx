import { panelState } from '../../store/uiReducer'
import { useSelector, useDispatch } from 'react-redux'
import './right.css'

import { useEffect } from 'react'
import MemberList from '../memberList/memberList'
import UserProfile from '../userProfile/userProfile'
import { setPanel } from '../../store/uiReducer';
const Right = ({type}) => {
    const dispatch = useDispatch()
    const visibility = useSelector(panelState)
    useEffect( () => {
        if(visibility){
            console.log(visibility)
            //probably do more stuff here
            // fetch members, feed MemberList
        }
    }, [])



    return(
        <div className={visibility ? "right-base visible" : "right-base"}>
            {(type === 'channel' && visibility ) && (
                <MemberList />
            )}
            {type === '@me' && (
                <UserProfile type={type}/>
            )}
        </div>
    )
}

export default Right