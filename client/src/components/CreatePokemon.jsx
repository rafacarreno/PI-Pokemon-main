import Classes from './CreatePokemon.module.css'
import { useEffect, useState } from "react";
import { getTypes, postPokemon, getPokemonName } from "../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import CharmanderHome from '../img/goHome.png';


const CreatePokemon = () => {

    const dispatch = useDispatch();
    const types = useSelector((state) => state.types);
    //const [selectedTypes, setSelectedTypes] = useState([]);
    const [input, setInput] = useState({
        name: "",
        height: "",
        weight: "",
        hp: "",
        attack: "",
        defense: "",
        speed: "",
        img: "",
        types: [],
    });


    useEffect(() => {
        dispatch(getTypes());
    }, [dispatch]);

    const handleSelect = (e) => {
        if (e.target.value !== 'select' && input.types.length < 2 && !input.types.includes(e.target.value)) {
            setInput({
                ...input,
                types: [...input.types, e.target.value],
            });
        } else if (input.types.length === 2) {
            if (input.types.includes(e.target.value)) {
                alert('¡Un Pokémon no puede ser parte de más de dos tipos y tampoco se pueden repetir! Por favor, revise su selección...');
            } else {
                alert('¡Un Pokémon no puede ser parte de más de dos tipos! Por favor, revise su selección...');
            }
        } else {
            alert('¡No se pueden repetir los tipos! Por favor, revise su selección...');
        }
    }
    const handleDelete = (e) => {
        setInput({
            ...input,
            types: input.types.filter((type) => type !== e),
        });
    }

    const handleSubmit = (e) => {
        dispatch(postPokemon(input));
        dispatch(setInput({
            name: "",
            height: "",
            weight: "",
            hp: "",
            attack: "",
            defense: "",
            speed: "",
            img: "",
            types: [],
        }));

    };

    const handleChange = (e) => {
        if (e.target.name === 'name') {
            const nameValid = dispatch(getPokemonName(e.target.value));
            if (nameValid.length > 0) {
                alert(`El nombre "${e.target.value}" ya existe. Por favor elige otro.`);
                setInput({
                    ...input,
                });
            } else {
                setInput({
                    ...input,
                    [e.target.name]: e.target.value,
                });
            }
        }

        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className={Classes.container}>
            <NavLink to='/home'>
                <img className={Classes.goHome} alt='CharmanderHome' src={CharmanderHome} width='130px' />
            </NavLink>
            <div>
                <h1>Creá tu propio Pokémon:</h1>
            </div>
            <form onSubmit={(e) => handleSubmit(e)} className={Classes.form}>
                <div>
                    <div className={Classes.bloque1Form}>
                        <label>
                            Nombre:
                            <input
                                value={input.name}
                                onChange={handleChange}
                                name='name'
                                type='text'
                            />
                        </label>
                        <label>
                            Altura:
                            <input
                                onChange={handleChange}
                                value={input.height}
                                name='height'
                                type='number'
                                min='1'
                                placeholder="Medida en (cm) ..."
                            />
                        </label>
                        <label>
                            Peso:
                            <input
                                onChange={handleChange}
                                value={input.weight}
                                name='weight'
                                type='number'
                                min='1'
                                placeholder="Medida en (kg) ..."
                            />
                        </label>
                        <label>
                            Vida:
                            <input
                                onChange={handleChange}
                                value={input.hp}
                                name='hp'
                                type='number'
                                min='1'
                            />
                        </label>
                    </div>
                    <div className={Classes.bloque2Form}>
                        <label>
                            Ataque:
                            <input
                                onChange={handleChange}
                                value={input.attack}
                                name='attack'
                                type='number'
                                min='1'
                            />
                        </label>
                        <label>
                            Defensa:
                            <input
                                onChange={handleChange}
                                value={input.defense}
                                name='defense'
                                type='number'
                                min='1'
                            />
                        </label>
                        <label>
                            Velocidad:
                            <input
                                onChange={handleChange}
                                value={input.speed}
                                name='speed'
                                type='number'
                                min='1'
                            />
                        </label>
                        <label>
                            Imagen:
                            <input
                                onChange={handleChange}
                                value={input.img}
                                name='img'
                                type='url'
                                placeholder="Ingresar url de la imagen..."
                            />
                        </label>
                    </div>
                </div>
                <div name='types' className={Classes.types}>
                    <label>Tipos:</label>
                    <select onChange={(e) => handleSelect(e)}>
                        <option value='select'>Seleccionar</option>
                        {types && types.map((e) => (
                            <option key={e} name='types' value={e.name}>{e.name}</option>
                        ))}
                    </select>
                </div>
                <div className={Classes.type}>
                    {input.types?.map((e) => (
                        <div key={e}>
                            <label>{e}</label>
                            <button onClick={() => handleDelete(e)} >X</button>
                        </div>
                    ))}
                </div>
                <button type="submit" className={Classes.form_button}>¡Crear!</button>
            </form>
        </div>
    );
};

export default CreatePokemon;