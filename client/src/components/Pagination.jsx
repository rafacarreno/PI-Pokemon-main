import React, { Fragment } from "react";

export default function Pagination({ pokemonsPerPage, amountPokemons, paginated }) {
    const pagesNumbers = [];

    for (let i = 1; i <= Math.ceil(amountPokemons / pokemonsPerPage); i++) {
        pagesNumbers.push(i);
    };

    return (
        <Fragment>
            <nav>
                <ul>
                    {pagesNumbers.map((page) => {
                        return (
                            <button key={page} onClick={() => paginated(page)}>{page}</button>
                        )
                    })}
                </ul>
            </nav>
        </Fragment>
    )
}