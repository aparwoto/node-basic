var express = require('express');
var request = require('request');
var router = express.Router();


let friends = ['ananto','balanto','cakur','dalmarno','eko','fulhanto','guslaw'];
let movies;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/speak/:animal', function(req, res, next){
  let animal = req.params.animal.toLowerCase();
  let sounds = {
    pig: 'Oink',
    dog: 'Woof',
    cat: 'Meow',
    tiara: 'Mas rapihin lagi'
  };
  let sound = ((sounds[animal] == undefined)? 'wadaw' : sounds[animal]);
  res.render('speak', {animal: animal, sound: sound});
});

router.get('/friends',function(req, res, next) {
  res.render('friends', {friends: friends});
});

router.post('/addfriend',function(req, res, next){
  console.log(req.body);
  friends.push(req.body.newfriend);
  res.redirect('/friends');
});

router.post('/searchmovies',function(req, res, next){
  let listOfMovies = req.body.movies;
  request('http://www.omdbapi.com/?s='+ listOfMovies.replace(/ /g, '+') +'&apikey=thewdb', function(error, response, body){
    if(!error && response.statusCode == 200) {
      movies = JSON.parse(body);
      console.log(movies);
      res.redirect('/movies');
    }
  });  
});

router.get('/movies', function(req, res, next){
  res.render('movies', {movies: movies});
})


module.exports = router;
