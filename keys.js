
console.log('this is loaded');

exports.spotify = {
  id: process.env.SPOTIFY_API_KEY,
  secret: process.env.SPOTIFY_SECRET
};

exports.bandsintown = {
    id: process.env.BANDS_IN_TOWN_API_KEY,
    
};


exports.omdb = {
    id: process.env.OMDB_API_KEY,
    
};