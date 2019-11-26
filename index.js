require("dotenv").config();
const inquirer = require("inquirer");
const keys = require("./keys.js");

const spotify = keys.spotify;
const bands = keys.bandsintown;
const omdb = keys.omdb;


//Variable for the 'questions' object. I do this to pass it into the switch case below
let questAnswer = "";
let doneAnswer = "";

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
        console.log(`This is your choice -> ${response["action"]}`);
        console.log(`This is your choice -> ${response["searchFor"]}`);
        questAnswer = response["action"];
        
        doneAnswer = response["searchFor"];

        switch (questAnswer){
            case "Songs":
                spotifyS(doneAnswer);
                break;
            case "Movies":
                omdbS(doneAnswer);
                break;
            case "Events":
                bATS(doneAnswer);
                break;
        
        }




        inquirer.prompt(areYouDone).then(function (again){
            doneAnswer = again["continue"];



            if (again.continue) {
                inquire();
            }
        });

    });
}







function spotifyS(input){
    console.log(`Spotify Activated`);

}




function omdbS(input){
    console.log(`OMDB Activated`);

}




function bATS(input){
    console.log(`BIT Activated`);

}


















inquire();