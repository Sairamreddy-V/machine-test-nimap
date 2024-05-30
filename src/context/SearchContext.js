import React from 'react'

const SearchInputContext = React.createContext({
  searchInput: '',
  updateSearchInput: () => {},
  clearSearchInput:()=>{},
})

export default SearchInputContext