import "./index.css"

const CastCard=(props)=>{
    const {details}=props
    const {name,character,castImage}=details 

    return(
        <li className="li-item">
            <img  className="cast-image" alt="CastImage" src={castImage}/>
            <p className="cast-name">{name}</p>
            <p className="cast-character">Character: {character}</p>
        </li>
    )
}

export default CastCard