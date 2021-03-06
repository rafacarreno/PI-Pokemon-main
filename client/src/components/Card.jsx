import React from "react";
import { Link } from "react-router-dom";
import Classes from './Card.module.css'

export default function Card({ img, name, types, id }) {
    return (
        <div className={Classes.container}>
            <div className={Classes.top}>
                <h3>{(name && name[0].toUpperCase()).concat(name.slice(1, name.length))}</h3>
            </div>
            <div className={Classes.rest}>
                <Link to={`/home/${id}`}>
                    <div className={Classes.img}>
                        <img src={img} alt='Img not found!' />
                    </div>
                </Link>
            </div>
            <div className={Classes.types}>
                {types.map((type) => {
                    return (
                        <div className="type" key={type}>
                            <p>{type && (type[0].toUpperCase()).concat(type.slice(1, type.length))}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};