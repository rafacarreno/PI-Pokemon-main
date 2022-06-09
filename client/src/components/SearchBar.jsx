import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { getPokemonName } from '../redux/actions';
import Classes from './SearchBar.module.css';
import IconCrear from '../img/pokedexCrearPokemon.png';
import PokedexSearch from '../img/pokedexHomeCrearPokemon.png';
//import CirculoPokeballOff from '../img/SearchBar/CirculoPokeballApagado.png';
//import CirculoPokeballOn from '../img/SearchBar/CirculoPokeballEncendido.png';


const SearchBar = () => {
    const dispatch = useDispatch();
    const [value, setValue] = useState('');

    const handleSearchValue = (e) => {
        e.preventDefault();
        setValue(e.target.value);
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(getPokemonName(value));
        setValue('');
    };

    return (
        <nav className={Classes.navbar}>
            <div className={Classes.left_navbar}>
                <img className={Classes.img} alt="PokedexSearch" src={PokedexSearch}></img>
                <p>PI Pokémon</p>
            </div>
            <div className={Classes.middle_navbar}>
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

            <div className={Classes.right_navbar}>
                <NavLink to='/createPokemon'>
                    <div className={Classes.right_navbar_div}>
                        <img alt="Crear" src={IconCrear} margin='0' />
                        <p>Crear</p>
                    </div>
                </NavLink>
            </div>
        </nav>
    );
};

export default SearchBar;