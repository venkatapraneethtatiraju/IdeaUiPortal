import React from 'react'
import './SearchBar.scss';
import SearchIcon from '../../images/tools-and-utensils.svg'


const SearchBox = (props) => (

    <div className="searchBody">
    <input className='search'
     type='Search' 
     placeholder="Search Users by EmailId and Name"
     onChange={e=>props.onChange(e.target.value)}
     />
     <div className="searchIconBody">
     <img src={SearchIcon} className='searchIcon'  />
     </div>
     </div>
)

export default SearchBox;