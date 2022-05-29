import React, { useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {
    getPokemons,
    getTypes,
    searchPokemon,
    orderPokemon,
    filterByTypes,
    filterPokemon
} from '../redux/actions';
import SearchBar from './SearchBar';
import Card from './Card';
import Pagination from "./Pagination";
import Classes from './Home.module.css'


export default function Home() {
    const dispatch = useDispatch();
    const allPokemons = useSelector((state) => state.pokemonAux);
    const allTypes = useSelector((state) => state.types);

    const [currentPage, setCurrentPage] = useState(1);//pag selected
    const [pokemonsPerPage] = useState(12);//cards x page
    const indexOfLastCard = currentPage * pokemonsPerPage; //12
    const indexOfFirstCard = indexOfLastCard - pokemonsPerPage;//0 or 1
    const currentPokemon = allPokemons?.slice(indexOfFirstCard, indexOfLastCard);//de todos los pokemones, solo toma los de la primer posicion y la ultima sin incluir a esta.

    const [, setReloadState] = useState(false);
    const [origin, setOrigin] = useState('All');


    useEffect(() => {
        dispatch(getPokemons());
        dispatch(getTypes());
    }, [dispatch]);

    const setOrder = (e) => {
        dispatch(orderPokemon(e.target.value));
        setReloadState((stateAux) => !stateAux);
        setCurrentPage(1);
    };

    const handleFilterByType = (e) => {
        dispatch(filterByTypes(e.target.value, origin));
        setCurrentPage(1);
        setReloadState((stateAux) => !stateAux);
    };

    const paginated = (pageNum) => {
        setCurrentPage(pageNum)
    };

    const handleFilter = (e) => {
        setOrigin(e.target.value);
        dispatch(filterPokemon(e.target.value));
        setCurrentPage(1);
        setReloadState((stateAux) => !stateAux);
    }

    const getSearch = (value) => {
        dispatch(searchPokemon(value));
        setCurrentPage(1);
    };

    return (
        <Fragment>
            <SearchBar onSearch={getSearch} />
            <main className={Classes.mainFlex}>
                <div className={Classes.filters}>
                    {/* FILTROS Y ORDENAMIENTO */}
                    <div className={Classes.selects}>
                        <select className={Classes.select} onChange={setOrder} name='Type'>
                            <option
                                value='Ordenar por nombre'
                                selected disabled>
                                Ordenar por nombre
                            </option>
                            <option value='Ascendiente'>A-Z</option>
                            <option value='Descendiente'>Z-A</option>
                        </select>
                        <select className={Classes.select} onChange={setOrder} name='Type'>
                            <option
                                value='Ordenar por ataque'
                                selected disabled>
                                Ordenar por ataque
                            </option>
                            <option value='MayorAtaque'>Débil a Fuerte</option>
                            <option value='MenorAtaque'>Fuerte a Débil</option>
                        </select>
                        <select className={Classes.select} onChange={handleFilterByType} name='Type'>
                            <option
                                value='Filtro por tipo'
                                selected disabled> Ordenar por tipo</option>
                            {allTypes?.map((type) => {
                                return (
                                    <option
                                        key={type.name}
                                        value={type.name}>{type.name}</option>
                                )
                            })
                            }
                        </select>
                        <select className={Classes.select} onChange={handleFilter} name='Origen'>
                            <option value='Filtro por origen' selected disabled>Filtrar por origen</option>
                            <option value='All'>Todos los Pokemones</option>
                            <option value='API'>Solo los de la API</option>
                            <option value='DB'>Solo los Creados en BD</option>
                        </select>
                    </div>
                </div>
                <div>

                    <Pagination
                        pokemonsPerPage={pokemonsPerPage}
                        amountPokemons={allPokemons.length}
                        paginated={paginated}
                    />

                    <section className={Classes.sectionFlex}>
                        {currentPokemon?.map((e) => {
                            return (
                                <Fragment key={e.id}>
                                    <div>
                                        <Card
                                            key={e.id}
                                            name={e.name}
                                            img={e.img}
                                            types={e.types}
                                            id={e.id}
                                        />
                                    </div>
                                </Fragment>
                            )
                        })}
                    </section>
                </div>

            </main>

        </Fragment>
    );
};