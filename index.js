require("dotenv").config();
const inquirer = require("inquirer");
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



/////////////////////////////////////////////////////////////////////////
//Spotify//


const questions = [
    {
        type: "list",
        choices: [
            "Songs",
            "Movies",
            "Events"
        ],
        message: "CHOOSE!",
        name: "action"
    },
    {
        type: "input",
        message: "What do you want to search for?",
        name: "searchFor"
    }
    
];

const areYouDone = [
    {
        type: "confirm",
        message: "Search for something else?",
        name: "continue"
    }
];




function inquire(){
    inquirer.prompt(questions).then(function (response){
        console.log(response);
        inquirer.prompt(areYouDone).then(function (again){
            if (again.continue) {
                inquire();
            }
        });

    });
}


// function askAgain(){
//     return inquirer.prompt(areYouDone);
// }









inquire();