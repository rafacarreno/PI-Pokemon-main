import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getOnePokemon } from "../redux/actions";
import CardDetail from './CardDetail';
import Classes from './PokemonDetail.module.css'

const PokemonDetail = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const DataPoke = useSelector((state) => state.pokemonPorID)

    useEffect(() => {
        dispatch(getOnePokemon(id));
    }, [dispatch, id]);//se dispara la funcion cuando se genera un cambio en el dispatch o en el id


    return (
        <div className={Classes.containerFather}>
            <div className={Classes.button}>
                <Link to='/home'>
                    <button className={Classes.backHome}>BACK TO HOME</button>
                </Link>
            </div>
            <div className={Classes.limite}>
                <main className={Classes.pokeImg}>
                    <div>
                        {DataPoke.name?.toUpperCase()}
                    </div>
                    <div>
                        <img alt="pokemon" src={DataPoke.img}></img>
                    </div>
                </main>
                <div className={Classes.cardStyle}>
                    <CardDetail pokeInfo={DataPoke} className={Classes.pokeCard} />
                </div>
            </div>
        </div>
    );
};

export default PokemonDetail;