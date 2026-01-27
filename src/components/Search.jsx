import React from 'react'

// const person={
//   name:'bruce wayne',
//   age:36,
//   location:'gotham city'
// }

// const{name,age,location}=person;

const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className='search'>
      <div>
        <img src='search.svg' alt="Search" />
        <input
          type='text'
          placeholder='Search through thousands of movies'
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>
    </div>
  )
}

export default Search;