import './right.css'
const Right = ({type}) => {
    return(
        <div className={type === '@me' ? "right-base thick" : "right-base thin"}>
            Right panel!
            yay width fixed
        </div>
    )
}

export default Right