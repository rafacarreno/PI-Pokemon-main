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
            return arr.filter((poke) => (poke.createdInDB));
        default:
            return arr;
    }
};

const filterByOrigin = (origin, apiPokes, dbPokes, allPokes) => {
    switch (origin) {
        case 'API':
            return apiPokes;
        case 'DB':
            if (dbPokes.length === 0){
                alert('Aún no se ha creado ningun Pokémon.');
                return allPokes;
            }
            return dbPokes;
        default:
            return allPokes;
    }
};


const filterByTypes = (type, arr) => {
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
        case 'FILTER_POKEMON': // filterPokemon(action.payload, state.pokemonAux),
            // const filterResult =
            //     action.payload['Origen'] === 'Predeterminado'
            //         ? state.pokemonAux
            //         : action.payload['Origen'] === 'API'
            //             ? state.apiPoke
            //             : action.payload['Origen'] === 'DB'
            //                 ? state.createdPokemon
            return {
                ...state,
                pokemonAux: filterByOrigin(action.payload, state.apiPoke, state.createdPokemon, state.pokemon),
                    // action.payload === 'API'
                    // ? state.apiPoke
                    // : action.payload === 'DB'
                    //     ? state.createdPokemon
                    //     : state.pokemon,
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

