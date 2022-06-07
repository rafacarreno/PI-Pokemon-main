import React from "react";
import Classes from './CardDetail.module.css';

// Ruta de detalle de Pokemon: debe contener

// [ ] Los campos mostrados en la ruta principal para cada pokemon (imagen, nombre y tipos)
// [ ] Número de Pokemon (id)
// [ ] Estadísticas (vida, fuerza, defensa, velocidad)
// [ ] Altura y peso

const CardDetail = ({ pokeInfo }) => {
    return (
        <div className={Classes.container}>
            <h3 className={Classes.top}>ESTADÍSTICAS</h3>
            <div className={Classes.stats}>
                <div className={Classes.stat}>
                    ID: {pokeInfo.id}
                </div>
                <div className={Classes.stat}>
                    HP: {pokeInfo.hp}
                </div>
                <div className={Classes.stat}>
                    FUERZA: {pokeInfo.attack}
                </div>
                <div className={Classes.stat}>
                    DEFENSA: {pokeInfo.defense}
                </div>
                <div className={Classes.stat}>
                    VELOCIDAD: {pokeInfo.speed}
                </div>
                <div className={Classes.stat}>
                    ALTURA: {pokeInfo.height}
                </div>
                <div className={Classes.stat}>
                    PESO: {pokeInfo.weight}
                </div>
            </div>
            <h3>TIPOS</h3>
            <div className={Classes.types}>
                {pokeInfo.types?.map((e) => {
                    return (
                        <div key={e}>
                            <p>{e.toUpperCase()}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CardDetail;