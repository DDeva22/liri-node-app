require("dotenv").config();
const axios = require("axios");
const inquirer = require("inquirer");
const keys = require("./keys.js");
const moment = require("moment");
const spotify = require("node-spotify-api");

const spotifyK = keys.spotify;
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
    
    const spotifyFunc = new spotify({

        id: spotifyK.id,
        secret: spotifyK.secret

    });

    spotifyFunc.search({type: "track", query: input}) 
    .then(function(response){
        
        console.log("\n");
        
        console.log(`Artist: ${response.tracks.items[0].artists[0].name}`);
        console.log(`Album: ${response.tracks.items[0].album.name}  Song: ${response.tracks.items[0].name}`);
        console.log("\n");
        console.log(`Preview Link: '${response.tracks.items[0].preview_url}'`);
        

    });
    





    


}




function omdbS(input){
    console.log(`OMDB Activated`);
    if (input === ""){
        input = "mr.nobody";
    }




    axios
        .get(`https://www.omdbapi.com/?t=${input}&plot=short&tomatoes=True&apikey=${omdb.id}`)
        .then( function (response){
            console.log("\n");
            console.log(`Title: ${response.data.Title}`);
            console.log(`Year: ${response.data.Year}`);
            console.log(`IMDB Rating: ${response.data.imdbRating}`);


            //"The Rotten Tomatoes data was removed to comply with a legal request from Fandango (who owns Rotten Tomatoes)."
            //https://github.com/omdbapi/OMDb-API/issues/5
            console.log(`SEE CODE FOR EXPLAINATION: ${response.data.tomatoMeter}`);
            console.log(`Country: ${response.data.Country}`);
            console.log(`Language: ${response.data.Language}`);
            console.log(`Plot: ${response.data.Plot}`);
            console.log(`Actors: ${response.data.Actors}`);
        });




}




function bATS(input){
    console.log(`BIT Activated`);
    



    const reinput = input.replace(" ", "%20");
    




    axios
        .get(`https://rest.bandsintown.com/artists/${reinput}/events?app_id=codingbootcamp`)
        .then( function (response){
            // console.log(response.data);
            for (i = 0; i <= 5; i++){
                console.log("\n");
                
                console.log(`The place is called ${response.data[i].venue.name} located in ${response.data[i].venue.city}, ${response.data[i].venue.country}`);
                console.log(i);
                console.log(`The Date of the event is ${moment(response.data[0].datetime).format("LLL")}`);
            }
        





        })

        .catch( function(error){
            console.log(`No Events at this time!`);
        });



        // 2020-01-10T20:00:00










}


















inquire();