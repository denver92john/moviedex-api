require('dotenv').config();
const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));

function handleGetMovie(req, res) {
    // code
}

app.get('/movie', handleGetMovie);

const PORT = 8000;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});