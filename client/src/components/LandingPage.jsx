import React from "react";
import { Link } from "react-router-dom";
import BtnClass from './LandingPage.module.css'

export default function LandingPage() {
    return (
        <div className={BtnClass.body}>
            <h1>¡Bienvenidos!</h1>
            <Link to='/Home'>
                <div>
                    <button className={BtnClass.btn}></button>
                </div>
            </Link>
        </div>
    );
};