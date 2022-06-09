import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getOnePokemon } from "../redux/actions";
import CardDetail from './CardDetail';
import Classes from './PokemonDetail.module.css'
import CharmanderHome from '../img/goHome.png';

const PokemonDetail = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const DataPoke = useSelector((state) => state.pokemonPorID)

    useEffect(() => {
        dispatch(getOnePokemon(id));
    }, [dispatch, id]);


    return (
        <div className={Classes.container}>
            <div className={Classes.subContainer}>
                <main >
                    <div className={Classes.subContainer_name}>
                        {DataPoke.name?.toUpperCase()}
                        <img className={Classes.subContainer_img} alt="pokemon" src={DataPoke.img}></img>
                    </div>
                </main>
                <span className={Classes.subContainer_card}>
                    <CardDetail pokeInfo={DataPoke} />
                </span>
            </div>
            <div >
                <Link to='/home'>
                    <img className={Classes.goHome} alt='CharmanderHome' src={CharmanderHome} width='130px' />
                </Link>
            </div>
        </div>
    );
};

export default PokemonDetail;