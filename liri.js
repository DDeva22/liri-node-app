require("dotenv").config();
const keys = require("./keys.js");

const spotify = new Spotify(keys.spotify);



const {
    OMDB_API_KEY,
    SPOTIFY_API_KEY,
    BANDS_IN_TOWN_API_KEY
} = process.env

console.log(OMDB_API_KEY);
console.log(SPOTIFY_API_KEY);
console.log(BANDS_IN_TOWN_API_KEY);
