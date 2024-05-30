import {useState,useEffect,useContext} from 'react'
import MovieCard from '../MovieCard'
import axios from 'axios'
import Loader from '../Loader'
import SearchInputContext from '../../context/SearchContext'
import '../Home/index.css'


const Search=()=>{
    const [searchMoviesArray,setSearchMovies]=useState([])
    const [isApiSuccess,setApiStatus]=useState(true)
    const [page,setPageNo]=useState(1)
    const [isLoading,setLoadingStatus]=useState(true)
    const {searchInput}=useContext(SearchInputContext)
    
    useEffect(()=>{
        setLoadingStatus(true)
        const getAllMovies= async()=>{
            try{
                const response= await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&query=${searchInput}&page=${page}`)
                if(response.status===200){
                    const data= await response.data
                    const results=data.results 
                    const detailsArray=results.map(eachItem=>(
                        {
                            id:eachItem.id,
                            movieImage:`https://image.tmdb.org/t/p/w500/${eachItem.poster_path}`,
                            title:eachItem.title,
                            rating:eachItem.vote_average   
                        }
                    ))
                    setSearchMovies(detailsArray)
                    setLoadingStatus(false)
                    setApiStatus(true)
                }else{
                    setApiStatus(false)
                }
            }catch(error){
                console.log(`error occurred:${error.message}`)
                setApiStatus(false)
            }
        }
        getAllMovies()
    },[page,searchInput])

    const onPreviousButton=()=>{
        setPageNo(prevState=>{
            if(prevState===1){
                return prevState
            }else{
                return prevState-1
            }
        })
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }
    const onNextButton=()=>{
        setPageNo(prevState=>(prevState+1))
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }

    const renderApiSuccessView=()=>(
        isLoading ? (<Loader/>):
        <div className='main-container'>
            {searchMoviesArray.length===0 ? <div className='no-movies-container'><h1>No Movies Match Your Search</h1></div>:
            <>
            <ul className='ul-container'>
                {searchMoviesArray.map(eachItem=>(
                    <MovieCard key={eachItem.id} details={eachItem} isHome={true}/>
                ))}
            </ul>
            <div className='page-navigation-container'>
                <button onClick={onPreviousButton} className='page-buttons'>Previous Page</button>
                <p className='current-page'>{page}</p>
                {!searchMoviesArray.length<20 && <button onClick={onNextButton} className='page-buttons'>Next Page</button>}
            </div>
            </>}
        </div>
    )

    return(
        isApiSuccess && renderApiSuccessView()
    )

}


export default Search 