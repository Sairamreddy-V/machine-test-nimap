import {Link} from 'react-router-dom'
import './index.css'

const MovieCard=(props)=>{
    const {details,isHome}=props
    const {id,movieImage,title,rating}=details
    const alignClassName=isHome===false && "card-li-item-left"
    return(
        <Link className='link-item' to={`/single-movie-details/${id}`}>
            <li className={`card-li-item ${alignClassName}`}>
                <img className='card-image' alt="movieImage" src={movieImage}/>
                <h2 className='card-title'>{title}</h2>
                <p className='card-rating'>rating: {rating}</p>
            </li>
        </Link>
    )
}

export default MovieCard