import fetch from 'fetch';

const url = 'http://localhost:3000';

fetch(url)
    .then((response) => {
        console.log(response.json());
    })
    .then((data))
    .catch((error) => {
        console.log(error);
    });