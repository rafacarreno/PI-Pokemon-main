import Classes from "./LandingPage.module.css";
import { NavLink } from "react-router-dom";
import GoHome from '../img/LandingPage/gohome.png';
import PokeLogo from '../img/LandingPage/pokelogo.png';


export default function LandingPage() {
    return (
        <div className={Classes.container_landing}>
            <img alt='pokelogo' src={PokeLogo} className={Classes.container_landing_img} />
            <h1 >¡Bienvenidos!</h1>
            <div>
                <NavLink to='/Home'>
                    <div >
                        <img alt='gohome' src={GoHome} className={Classes.imgBottom} />
                    </div>
                </NavLink>
            </div>
        </div>
    )
}