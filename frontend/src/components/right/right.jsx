import './right.css'
const Right = ({type}) => {
    return(
        <div className={type === '@me' ? "right-base thick" : "right-base thin"}>
            Right panel!
        </div>
    )
}

export default Right