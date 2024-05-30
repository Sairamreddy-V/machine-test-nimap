import{useState,useContext} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import SearchInputContext from '../../context/SearchContext'
import './index.css'


const sections=[
    {
        id:"",
        name:"Popular"
    },
    {
        id:"top-rated",
        name:"Top Rated"
    },
    {
        id:"upcoming",
        name:"Upcoming"
    },
]

const Header=()=>{
    const [searchInput,setSearchInput]=useState("")
    const {updateSearchInput,clearSearchInput}=useContext(SearchInputContext)
    const navigate=useNavigate()
    const onSelectElement=(event)=>{
        const {value}=event.target
        const clicked=sections.filter(eachOne=>(eachOne.id===value))
        navigate(`/${clicked[0].id}`)
    }
    const onInputChange=(event)=>{
        const {value}=event.target 
        setSearchInput(value)
    }
    const onSearchButton=()=>{
        updateSearchInput(searchInput)
        setSearchInput("")
        navigate('/search-results')
    }

    const onLiclick=()=>{
        clearSearchInput()
    }
                
    return(
        <nav className='nav-elelment'>
            <h1 className='nav-title'>MovieDB</h1>
            <div className='nav-section-container'>
                <ul className='nav-ul-con'>
                    {sections.map(eachOne=>(
                        <Link key={eachOne.id} className='nav-link' to={`/${eachOne.id}`}>
                            <li onClick={onLiclick} className='nav-sections'>{eachOne.name}</li>
                        </Link>
                    ))}
                </ul>
                <select onChange={onSelectElement} className='select-element'>
                    {sections.map(eachOne=>(
                        <option key={eachOne.id} value={eachOne.id} className='option-element'>{eachOne.name}</option>
                    ))}
                </select>
                <input onChange={onInputChange} value={searchInput} className='nav-search-element' type="search" placeholder='Movie Name'/>
                <button onClick={onSearchButton} className='nav-search-button' type="button" data-testid="search-button">Search</button>
            </div>
        </nav>
    )
}

export default Header