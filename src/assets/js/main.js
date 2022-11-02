"use strict";

import "bootstrap";

const apiUrl = 'https://api.pokemontcg.io/v2/cards';
const showCards = document.querySelector('.cardImg');

const getCards = async () => {
    const response = await fetch(apiUrl);
    if (response.status !== 200) {
        throw new Error('Cannot fetch the data'); // ett nytt "error-objekt", visas om det är något problem med url'n.
    }
    const data = await response.json();
    return data;
};

getCards()
    .then(dataValue => {
        let output = "";
        dataValue.data.map(values => {
            output += `<div class="card">
            <img class="card-img-top" src="${values.images.small}" alt="Card image cap">
            <div class="card-body p-2">
                <div class="text-center">
                    <h5 class="fw-bolder">${values.name}</h5>
                    <p class="card-desc">Expansion: ${values.set.series}</p>
                    <p class="card-desc">Released: ${values.set.releaseDate}</p>
                    <p class="mark d-inline-flex pb-0">$${values.cardmarket.prices.trendPrice}</p>
                </div>
            </div>
                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div class="text-center"><a class="btn btn-info mt-auto" href="#">View options</a></div>
                </div>
            </div>`;
        });
        console.log('Resolved:', dataValue);
        showCards.innerHTML = output;
    })
    .catch(err => console.log('Rejected:', err.message)); // om promise blir nekat.
