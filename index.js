require("dotenv").config();
const axios = require("axios");
const inquirer = require("inquirer");
const keys = require("./keys.js");
const moment = require("moment");
const spotify = require("node-spotify-api");
const chalk = require("chalk");

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
        message: "SEARCH FOR SOMETHING ELSE?",
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

    spotifyFunc.search({type: "track", query: input}, function(error, response){

        if (error) {
            return console.log(chalk.yellow(`ERROR! This search could not be conducted. Either We do not have that song/Artist available OR \n you must check your spelling.`));
        }
        


        console.log("\n \n");
        
        console.log(chalk.cyan(`Artist: ${response.tracks.items[0].artists[0].name}`));
        console.log(chalk.cyan(`Album: ${response.tracks.items[0].album.name}  Song: ${response.tracks.items[0].name}`));
        console.log("\n");
        console.log(chalk.green(`Preview Link: '${response.tracks.items[0].preview_url}'`));



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
            console.log(chalk.cyan(`Title: ${response.data.Title}`));
            console.log(`Year: ${response.data.Year}`);
            console.log(chalk.green(`IMDB Rating: ${response.data.imdbRating}`));


            //"The Rotten Tomatoes data was removed to comply with a legal request from Fandango (who owns Rotten Tomatoes)."
            //https://github.com/omdbapi/OMDb-API/issues/5
            console.log(chalk.red(`SEE CODE FOR EXPLAINATION: ${response.data.tomatoMeter}`));
            console.log(`Country: ${response.data.Country}`);
            console.log(`Language: ${response.data.Language}`);
            console.log(chalk.green(`Plot: ${response.data.Plot}`));
            console.log(`Actors: ${response.data.Actors}`);
        })
        



}




function bATS(input){
    //The API will repeat entries for certain artists. I have come to the conclusion that this is on their end vs. mine.
    



    const reinput = input.replace(" ", "%20");
    




    axios
        .get(`https://rest.bandsintown.com/artists/${reinput}/events?app_id=codingbootcamp`)
        .then( function (response){
            // console.log(response.data);
            for (i = 0; i <= 5; i++){
                console.log("\n");
                
                console.log(i);
                console.log(chalk.cyan(`The place is called ${response.data[i].venue.name} located in ${response.data[i].venue.city}, ${response.data[i].venue.country}`));
                
                console.log(chalk.green(`The Date of the event is ${moment(response.data[0].datetime).format("LLL")}`));
            }
        





        })

        .catch( function(error){
            console.log(chalk.yellow(`No more Events at this time!`));
        });



        










}


















inquire();