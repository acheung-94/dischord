import { panelState } from '../../store/uiReducer'
import { useSelector } from 'react-redux'
import './right.css'
import { useEffect } from 'react'
import MemberList from '../memberList/memberList'
const Right = ({type}) => {
    
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
            {type === 'channel' && (
                <MemberList />
            )}
        </div>
    )
}

export default Right