require("dotenv").config();
const keys = require("./keys.js");

const spotify = keys.spotify;
const bands = keys.bandsintown;
const omdb = keys.omdb;



const {
    OMDB_API_KEY,
    SPOTIFY_API_KEY,
    BANDS_IN_TOWN_API_KEY
} = process.env

console.log(OMDB_API_KEY);
console.log(SPOTIFY_API_KEY);
console.log(BANDS_IN_TOWN_API_KEY);


console.log(spotify);
console.log(omdb);
console.log(bands);