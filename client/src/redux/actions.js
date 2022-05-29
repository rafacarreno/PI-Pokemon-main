import axios from 'axios';


export function getPokemons() {
    return async function (dispatch) {
        const pokemons = await axios.get('http://localhost:3001/pokemons');
        return dispatch({
            type: 'GET_POKEMONS',
            payload: pokemons.data,
        });
    };
};

export function getOnePokemon(id) {
    return async function (dispatch) {
        const thisPokemon = await axios.get(`http://localhost:3001/pokemons/${id}`);
        return dispatch({
            type: 'GET_ONE_POKEMON',
            payload: thisPokemon.data,
        });
    };
};

export function getTypes() {
    return async function (dispatch) {
        try {
            const types = await axios.get('http://localhost:3001/types');
            return dispatch({
                type: 'GET_TYPES',
                payload: types.data,
            });
        } catch(error){
            console.log(error);
        }
    };
};

export function postPokemon(data) {
    return async function (dispatch) {
        await axios.post('http://localhost:3001/pokemons', data);
        return dispatch({
            type: 'CREATE_POKEMON',
        });
    };
};

export function searchPokemon(name) {
    return {
        type: 'SEARCH_POKEMON',
        payload: name,
    };
};

export function orderPokemon(orderSelected){
    return {
        type: 'ORDER_POKEMON',
        payload: orderSelected,
    };
};

export function filterPokemon(filterSelected) {
    return {
        type: 'FILTER_POKEMON',
        payload: filterSelected,
    };
};

export function filterByTypes(type, origin) {
    return {
        type: 'FILTER_BY_TYPES',
        payload: {type, origin},
    };
};




