const initialState = {
    pokemon: [],
    pokemonAux: [],
    apiPoke: [],
    createdPokemon: [],
    types: [],
};

const search = (name, allPokemons) => {
    return allPokemons.filter((e) => e.name.toLowerCase() === name.toLowerCase());
};

const orderPoke = (orderSelected, arr) => {
    switch (orderSelected) {
        case 'Ascendiente':
            return arr.sort((a, b) => {
                return a.name.localeCompare(b.name);
            });
        case 'Descendiente':
            return arr.sort((a, b) => {
                return b.name.localeCompare(a.name);
            });
        case 'MayorAtaque':
            return arr.sort((a, b) => {
                return a.attack - b.attack;
            });
        case 'MenorAtaque':
            return arr.sort((a, b) => {
                return b.attack - a.attack;
            });
        default:
            return arr;
    }
}

const filterPokemon = (filterSelected, arr) => {
    switch (filterSelected) {
        case 'API':
            return arr.filter((poke) => !poke.createdInDB);//filtro a todos los pokemones por el que cuentra con la propiedad createdInDB en false/no exista
        case 'DB':
            return arr.filter((poke) => poke.createdInDB); //filtro a todos los pokemones por el que cuentra con la propiedad createdInDB en true
        default:
            return arr;
    }
};

const filterByTypes = (type, arr) => {
    return arr.filter((po) => po.types.includes(type));
};


export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_POKEMONS':
            return {
                ...state,
                pokemon: action.payload,
                pokemonAux: action.payload,
                apiPoke: filterPokemon('API', action.payload),
                createdPokemon: filterPokemon('DB', action.payload),
            };
        case 'GET_ONE_POKEMON':
            return {
                ...state,
                pokemonAux: action.payload,
            };
        case 'GET_TYPES':
            return {
                ...state,
                types: action.payload,
            };
        case 'CREATE_POKEMON':
            return {
                ...state,
            }
        case 'SEARCH_POKEMON':
            return {
                ...state,
                pokemonAux: search(action.payload, state.pokemon),
            };
        case 'ORDER_POKEMON':
            return {
                ...state,
                pokemonAux: orderPoke(action.payload, state.pokemonAux),
            };
        case 'FILTER_POKEMON':
            return {
                ...state,
                pokemonAux: filterPokemon(action.payload, state.pokemon),
            };
        case 'FILTER_BY_TYPES':
            return {
                ...state,
                pokemonAux: filterByTypes(
                    action.payload['type'],
                    action.payload['Origen'] === 'API'
                        ? state.apiPoke
                        : action.payload['Origen'] === 'DB'
                            ? state.createdPokemon
                            : state.pokemon
                ),
            };
        default:
            return {
                ...state
            };
    }

};

