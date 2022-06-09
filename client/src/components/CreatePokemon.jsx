import Classes from './CreatePokemon.module.css'
import { useEffect, useState } from "react";
import { postPokemon, getTypes, getPokemons } from "../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import CharmanderHome from '../img/goHome.png';





const CreatePokemon = () => {

    const dispatch = useDispatch();

    const nameUsed = useSelector((state) => state.pokemonAux); 

    const types = useSelector((state) => state.types);

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


    const uniqueName =  () => {
        return nameUsed?.find((e)=> e.name.toLowerCase() === input.name.toLowerCase())
    }
    
    function validate() {
        let onlyCharacters = /^[A-Za-z\s]+$/g.test(input.name);
        //console.log('CHARACTERS', onlyCharacters);
        if (onlyCharacters === false) {
            alert('El nombre no puede contener numeros o caracteres especiales');
            return false;
        }
        if (input.height.length > 4) { alert('La altura no puede contener mas de 4 digitos.'); return false; }
        if (input.weight.length > 4) { alert('El peso no puede contener mas de 4 digitos.'); return false; }
        if (input.hp.length > 3) { alert('La vida no puede contener mas de 3 digitos.'); return false; }
        if (input.attack.length > 3) { alert('El ataque no puede contener mas de 3 digitos.'); return false; }
        if (input.defense.length > 3) { alert('La defensa no puede contener mas de 3 digitos.'); return false; }
        if (input.speed.length > 3) { alert('La velocidad no puede contener mas de 3 digitos.'); return false; }
        if (input.types.length === 0) { alert('Se debe de seleccionar al menos un tipo de Pokémon.'); return false; }

        return true;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!uniqueName()) {
            if (validate()) {
                dispatch(postPokemon(input));
                setInput({
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
                alert(`Se ha creado con exito el Pokémon: "${input.name}"`);
                dispatch(getPokemons())           
            }
        } else {
            alert(`El nombre: "${input.name}" ya existe. Por favor modifique el nombre.`);        }
    }

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    };

    const handleSelect = (e) => {
        if (e.target.value !== 'select' && input.types.length < 2 && !input.types.includes(e.target.value)) {
            setInput({ ...input, types: [...input.types, e.target.value], });
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
                                onChange={(e) => handleChange(e)}
                                name='name'
                                type='text'
                                required
                            />
                        </label>
                        <label>
                            Altura:
                            <input
                                onChange={(e) => handleChange(e)}
                                value={input.height}
                                name='height'
                                type='number'
                                min='1'
                                placeholder="Medida en (cm) ..."
                                required
                            />
                        </label>
                        <label>
                            Peso:
                            <input
                                onChange={(e) => handleChange(e)}
                                value={input.weight}
                                name='weight'
                                type='number'
                                min='1'
                                placeholder="Medida en (kg) ..."
                                required
                            />
                        </label>
                        <label>
                            Vida:
                            <input
                                onChange={(e) => handleChange(e)}
                                value={input.hp}
                                name='hp'
                                type='number'
                                min='1'
                                required
                            />
                        </label>
                    </div>
                    <div className={Classes.bloque2Form}>
                        <label>
                            Ataque:
                            <input
                                onChange={(e) => handleChange(e)}
                                value={input.attack}
                                name='attack'
                                type='number'
                                min='1'
                                required
                            />
                        </label>
                        <label>
                            Defensa:
                            <input
                                onChange={(e) => handleChange(e)}
                                value={input.defense}
                                name='defense'
                                type='number'
                                min='1'
                                required
                            />
                        </label>
                        <label>
                            Velocidad:
                            <input
                                onChange={(e) => handleChange(e)}
                                value={input.speed}
                                name='speed'
                                type='number'
                                min='1'
                                required
                            />
                        </label>
                        <label>
                            Imagen:
                            <input
                                onChange={(e) => handleChange(e)}
                                value={input.img}
                                name='img'
                                type='url'
                                required
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
                            <option key={e.name} name='types' value={e.name}>{e.name}</option>
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
                <button
                    type="submit" className={Classes.form_button}>Crear Pokémon</button>
            </form>
        </div>
    );
};

export default CreatePokemon;