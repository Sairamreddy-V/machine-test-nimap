import {useState,useEffect} from 'react'
import { useParams } from "react-router-dom"
import axios from 'axios'
import Loader from '../Loader'
import CastCard from '../CastCard'
import './index.css'

const SingleMovie=()=>{
    const {id}=useParams()
    const [movieDetails,setMovieDetails]=useState(null)
    const [castDetails,setCastDetails]=useState([])
    const [isApiSuccess,setApiStatus]=useState(true)
    const [isLoading,setLoadingStatus]=useState(true)

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
        const formatedDate=date.toLocaleDateString('en-US', options);
        return formatedDate.replace(/,/g,' ');
    }
      

    useEffect(()=>{
        setLoadingStatus(true)
        const getMovieDetails=async()=>{
            try{
                const response= await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US`)
                if(response.status===200){
                    const data=await response.data
                    const details={
                        backgroundImage:`https://image.tmdb.org/t/p/w500/${data.backdrop_path}`,
                        movieImage:`https://image.tmdb.org/t/p/w500/${data.poster_path}`,
                        rating:data.vote_average,
                        genres:data.genres,
                        runtime:data.runtime,
                        releaseDate:formatDate(data.release_date),
                        overview:data.overview,
                        title:data.title,
                        genresLength:data.genres.length
                    }
                    setMovieDetails(details)
                }else{
                    setApiStatus(false)
                }
            }catch(error){
                setApiStatus(false)
                console.log(error.message)
            }
        }

        const getCastDetails=async()=>{
            try{
                const response= await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US`)
                if(response.status===200){
                    const data=await response.data
                    const details=data.cast.map(eachCast=>(
                        {
                            castImage:`https://image.tmdb.org/t/p/w500/${eachCast.profile_path}`,
                            name:eachCast.name,
                            originalName:eachCast.original_name,
                            character:eachCast.character
                        }
                    ))
                    setCastDetails(details)
                    setApiStatus(true)
                    setLoadingStatus(false)
                }else{
                    setApiStatus(false)
                }
            }catch(error){
                setApiStatus(false)
                console.log(error.message)
            }
        }
        getMovieDetails()
        getCastDetails()
    },[id])





    const renderMoviedeatails=()=>(
        isApiSuccess && movieDetails!==null &&
        <div className='cast-main-container'>
            <div className='movie-details-container'>
                <div className='movie-details-text-container'>
                    <div className='image-text-container'>
                        <img className='movie-image' alt="movieImage" src={movieDetails.movieImage}/>
                        <div className='text-main-container'>
                            <h1 className='movie-title'>{movieDetails.title}</h1>
                            <p className='movie-rating'>Rating : {movieDetails.rating}</p>
                            <div className='span-elements-container'>
                                <span className='span-element'>{movieDetails.runtime} min</span> 
                                <ul className='genre-ul-container'>
                                    {movieDetails.genresLength!==1 ?
                                    movieDetails.genres.map(eachOne=>(
                                        <li key={eachOne.id} className='genre-items'>{eachOne.name},</li>
                                    )):<li className='genre-items'>{movieDetails.genres[0].name}</li>}
                                </ul>
                            </div>
                            <p className='release-date'>Release Date : {movieDetails.releaseDate}</p>
                        </div>
                    </div>
                    <div>
                        <h2 className='overview-h'>Overview</h2>
                        <p className='overview-p'>{movieDetails.overview}</p>
                    </div>
                </div>
                <img className='backdrop-image' alt="backDropImage" src={movieDetails.backgroundImage}/>
            </div>
            {renderCastDetails()}
        </div>
    )

    const renderCastDetails=()=>(
        <div className='cast-container'>
            <h1 className='cast-h'>Cast</h1>
            {castDetails.length!==0 ? 
            <ul className='cast-ul'>
                {castDetails.map(eachOne=>(
                    <CastCard key={eachOne.character} details={eachOne}/>
                ))}
            </ul>:
            <div className='no-cast-container'>
                <h1 className='no-cast-heading'>We couldn't find any cast details for this movie</h1>
            </div>}
        </div>
    )


    return (
        isLoading ? <Loader/>:renderMoviedeatails()
    )
}


export default SingleMovie