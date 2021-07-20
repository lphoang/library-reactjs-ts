import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../Navbar.scss'

function SearchForm() {
    const [search, setSearch] = useState('');

    const history = useHistory();
    const onSubmitHandler = (e : any) => {
        e.preventDefault();
        search && history.push(`/search/t=${search}`)
    }

    return (
        <div>
            <form onSubmit={onSubmitHandler}>
                <label htmlFor="nav-search">
                    <span className="visually-hidden">Search</span>
                </label>
                <input 
                    type="text"
                    id="nav-search"
                    placeholder="Search by title"
                    onChange={(e) => {
                        setSearch(e.target.value);
                    }}
                 />
                 <button type="submit" className="button button--mimas">
                        <span>Search</span>
                 </button>
            </form>
        </div>
    );
}

export default SearchForm;