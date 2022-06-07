const initialState = {
    pokemon: [],
    pokemonAux: [],
    apiPoke: [],
    createdPokemon: [],
    pokemonPorID: [],
    types: [],
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
        case 'AMayorAtaque':
            return arr.sort((a, b) => {
                return a.attack - b.attack;
            });
        case 'AMenorAtaque':
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
            return arr.filter((poke) => !poke.createdInDB);
        case 'DB':
            return arr.filter((poke) => poke.createdInDB);
        default:
            return arr;
    }
};

const filterByTypes = (type, arr) => {
    console.log('TYPEEE-->', type);
    console.log('ARRRFILTER-->', arr);
    let filterAux = arr.filter((po) => po.types.includes(type));
    if (!filterAux.length > 0) {
        alert(`No se encontraron Pokémons del Tipo: "${type}".`);
        return arr;
    } else {
        return filterAux;
    }
};


export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_POKEMONS':
            return {
                ...state,
                pokemon: action.payload,
                pokemonAux: action.payload,
                pokemonPorID: action.payload,
                apiPoke: filterPokemon('API', action.payload),
                createdPokemon: filterPokemon('DB', action.payload),
            };
        case 'GET_POKEMON_ID':
            return {
                ...state,
                pokemonPorID: action.payload,
            };
        case 'GET_POKEMON_NAME':
            return {
                ...state,
                pokemonAux: [action.payload],
            }
        case 'GET_TYPES':
            return {
                ...state,
                types: action.payload,
            };
        case 'CREATE_POKEMON':
            return {
                ...state,
            }
        case 'ORDER_POKEMON':
            return {
                ...state,
                pokemonAux: orderPoke(action.payload, state.pokemonAux),
            };
        case 'FILTER_POKEMON':
            return {
                ...state,
                pokemonAux: filterPokemon(action.payload, state.pokemonAux),
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
                            : state.pokemon,
                ),
            };
        default:
            return {
                ...state
            };
    }
};

