require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const MOVIES = require('./movies.json');

const app = express();

let validGenres = [
    "Action",
    "Adventure",
    "Animation",
    "Biblical",
    "Biography",
    "Comedy",
    "Crime",
    "Documentary",
    "Drama",
    "Fantasy",
    "Gangster",
    "Grotesque",
    "History",
    "Horror",
    "Musical",
    "Mythology",
    "Mélo",
    "N/A",
    "Noir",
    "Romantic",
    "Sperimental",
    "Sport",
    "Spy",
    "Super-hero",
    "Thriller",
    "War",
    "Western"
];

// NOT USED WITH COMPLETE DATASET
let validCountries = [
    "Canada",
    "China",
    "France",
    "Germany",
    "Great Britain",
    "Hungary",
    "Israel",
    "Italy",
    "Japan",
    "Spain",
    "United States",
];

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());

function validateToken(req, res, next) {
    const apiToken = process.env.API_TOKEN;
    const authToken = req.get('Authorization').split(' ')[1];

    if(!authToken || authToken !== apiToken) {
        return res.status(401).json({error: 'Invalid Request'});
    }

    next();
}

app.use(validateToken);

function handleGetMovie(req, res) {
    let results = MOVIES;
    const {genre, country, avg_vote} = req.query;
    
    if(genre) {
        validGenres = validGenres.map(gen => gen.toLowerCase());
        if(!validGenres.includes(genre.toLowerCase())) {
            return res
                .status(400)
                .send(`${genre} isn't a valid genre`);
        }

        results = results.filter(movie => 
            movie.genre.toLowerCase().includes(genre.toLowerCase())
        );
    }

    if(country) {
        /*  TOO MANY COUNTRIES IN COMPLETE DATA SET
        validCountries = validCountries.map(country => country.toLowerCase());
        if(!validCountries.includes(country.toLowerCase())) {
            return res
                .status(400)
                .send(`${country} isn't a valid country`);
        }
        */

        results = results.filter(movie => 
            movie.country.toLowerCase().includes(country.toLowerCase())
        );
    }

    if(avg_vote) {
        const vote = parseFloat(avg_vote);
        if(Number.isNaN(vote)) {
            return res
                .status(400)
                .send(`${avg_vote} is not a number`);
        }

        results = results
            .filter(movie => movie.avg_vote >= avg_vote)
            .sort((a, b) => b.avg_vote - a.avg_vote);
    }

    res.json(results);
}

app.get('/movie', handleGetMovie);

const PORT = 8000;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

/*  TO FIND VALIDE GENRES AND COUNTRIES
    const arr = [];
    
    results.forEach(mov => {
        if(!arr.includes(mov.genre)) {
            arr.push(mov.genre);
        }
    });
    arr.sort();
    
   results.forEach(mov => {
    if(!arr.includes(mov.country)) {
        arr.push(mov.country);
    }
});
arr.sort();

res.json(arr);
*/