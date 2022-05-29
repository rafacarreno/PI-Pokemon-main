import React, { useState, useParams } from "react";
import { NavLink } from "react-router-dom";


const SearchBar = ({ onSearch }) => {
    //const { id } = useParams();//por si buscan por id!
    // useEffect(() => {
    //     dispatch(getTypes());
    //     id && dispatch(getOnePokemon(id));
    // }, [dispatch, id]);
    const [value, setValue] = useState('');

    const handleSearchValue = (e) => {
        setValue(e.target.value);       
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(value);
    };

    return (
        <nav>
            <div>
                <form onSubmit={handleSubmit}>
                    <input
                        onChange={handleSearchValue}
                        value={value}
                        type='search'
                        placeholder="Busca tu Pokémon..."
                    />
                    <button type="submit">Buscar</button>
                </form>
            </div>

            <div>
                <NavLink to='/createPokemon'>
                    <button>¿Quiéres crear tu propio Pokémon?</button>
                </NavLink>
            </div>
        </nav>
    );
};

export default SearchBar;