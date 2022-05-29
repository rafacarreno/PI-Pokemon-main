import { useEffect, useState } from "react";
import { getTypes, postPokemon } from "../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";


const CreatePokemon = () => {

    const dispatch = useDispatch();

    


    const types = useSelector((state) => state.types);


    
    const [selectedTypes, setSelectedTypes] = useState([]);
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

    const handleClick = (e) => {
        if (!selectedTypes.includes(e.target.name) && selectedTypes.length < 2) {
            selectedTypes.push(e.target.name);
        }
        setSelectedTypes(selectedTypes);
        setInput({ ...input, types: selectedTypes });
    }

    const handleDelete = () => {
        selectedTypes.pop();
        setSelectedTypes(selectedTypes);
        setInput({
            ...input,
            types: selectedTypes,
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(postPokemon(input));
        dispatch (setInput({
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

    //---------------------------------------------------------------------VALIDACIONES----------------------------------------------------------------------------
    //   >STAST: LOS DATOS NUMERICOS(UNICAMENTE) DE LOS STATS, PORQUE VALORES NEGATIVOS O VALOR CERO EN ALGUNOS STATS COMO VIDA, ALTURA Y PESO, DECIMALES NO SE SI SE PODRAN PERMITIR, !
    //   >NOMBRE: NO SE PUEDEN INGRESAR NOMBRES DE POKEMONS YA EXISTENTES EN LA API O EN DB, Y NO PERMITIR INGRESAR SIMBOLOS (BUSCAR LA FORMULITA)
    //   >VER COMO A MEDIDA QUE SE VA INGRESANDO EL INPUT, ADVERTIR SI YA ESTA INGRESANDO VALORES NEGATIVOS O DECIMALES, LOS NEGATIVOS PUEDEN SER CON EL MISMO DE LOS SIMBOLOS PARA TODOS LOS INPUTS!
       
    
    //     let createOrUpdateStat = input;
    //     createOrUpdateStat ={----> 
    //         ...input,
    //         hp: createOrUpdateStat.hp,

    //     }
    // }


    const handleChange = (e) => {
            setInput({
                ...input,
                [e.target.name]: e.target.value,
            });    
   
    };

    const addTypes = (e) => {
        setInput({
            ...input,
            types: [...input.types, e.target.value]
        });
    };



    return (
        <div>
            <NavLink to='/home'>
                <button>¡Go Home!</button>
            </NavLink>
            <form onSubmit={handleSubmit}>
                <label>
                    Nombre:
                    <input
                        onChange={handleChange}
                        value={input.name}
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
                <label>Tipos:</label>
                <div name='types'>
                    {/* {selectedTypes?.map((type) => {
                        return <p key={type}>{type}</p>;
                    })}; */}
                    {selectedTypes.length > 0 && (
                        <button onClick={handleDelete}>X</button>
                    )}   
                </div>
                <select onChange={addTypes}>
                    {types.map((e) => (
                        <option key={e.id} value={e.name}>{e.name}</option>
                    ))}
                </select>
                <ul>
                    <li>
                        <h5>Tipos elegido:</h5>
                        {input.types.map((t) => (t + ", "))}
                    </li>
                </ul>


                {/* <div name="types">
                    {selectedTypes?.map((e) => {
                        return <p key={e}>{e}</p>;
                    })}
                </div> */}

                <button type="submit">¡Crear!</button>

            </form>

        </div>
    );
};

export default CreatePokemon;