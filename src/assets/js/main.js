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
            output += `<div class="card h-100">
            <!-- Product details-->
            <div class="card-body p-4">
                <div class="text-center">
                    <!-- Product name-->
                    <h5 class="fw-bolder">${values.name}</h5>
                    <!-- Product price-->
                    $40.00 - $80.00
                </div>
            </div>
                <!-- Product actions-->
                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">View options</a></div>
                </div>
            </div>`;
        });
        console.log('Resolved:', dataValue);
        showCards.innerHTML = output;
    })
    .catch(err => console.log('Rejected:', err.message)); // om promise blir nekat.
