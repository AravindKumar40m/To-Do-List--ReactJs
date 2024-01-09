import React from 'react'

const SearchItem = ({search,setSearch}) => {
  return (
    <form className='searchForm'>
        {/* <label htmlFor="">search</label> */}
        <input type="text" 
            placeholder='search'
            role='searchbox'
            id='search'
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
        />
    </form>
  )
}

export default SearchItem