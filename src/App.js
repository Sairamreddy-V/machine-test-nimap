import { BrowserRouter,Routes,Route } from 'react-router-dom';
import {useState} from 'react'
import Header from './components/Header'
import Home from './components/Home'
import TopRated from './components/TopRated'
import Upcoming from './components/Upcoming'
import SingleMovie from './components/SingleMovie'
import Search from './components/Search';
import SearchInputContext from './context/SearchContext'
import './App.css';

const App=()=>{
  const [inputValue,setinput]=useState("")
  const onUpdateInput=(searchValue)=>{
    console.log(searchValue)
    setinput(searchValue)
  }
  const clearInputValue=()=>{
    setinput("")
  }
  return(
    <SearchInputContext.Provider value={{searchInput:inputValue,updateSearchInput:onUpdateInput,clearSearchInput:clearInputValue}}>
        <BrowserRouter>
          <Header/>
          <Routes>
              <Route exact path="/" element={<Home/>}/>
              <Route exact path="/top-rated" element={<TopRated/>}/>
              <Route exact path="/upcoming" element={<Upcoming/>}/>
              <Route exact path="/single-movie-details/:id" element={<SingleMovie/>}/>
              <Route exact path="/search-results" element={<Search/>}/>
          </Routes>
        </BrowserRouter>
    </SearchInputContext.Provider>
  )
}

export default App;
