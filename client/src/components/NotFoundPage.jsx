import React from "react";
import { NavLink } from "react-router-dom";
import Classes from './NotFoundPage.module.css';
import Pokeball from '../img/PokebollPNG.png';
import Charmander from '../img/CharisarGoHome.png';

const NotFoundPage = () => {
    return (
        <div className={Classes.container}>
            <div className={Classes.container_div1}>
                <h1 className={Classes.container_h1}>4 <img alt='Pokeball' src={Pokeball} />  4</h1>
                <h2 className={Classes.container_h2}>OOPS! PAGE NOT FOUND.</h2>
            </div>
            <NavLink to='/home'>
                <img className={Classes.container_img} alt="Charmander" src={Charmander} />
            </NavLink>
        </div>
    )
}

export default NotFoundPage