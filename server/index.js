var express = require('express');
var bodyParser = require('body-parser');
var axios = require('axios');
var mongo = require('../database-mongo');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../react-client/dist'));

var rand = ["random", "this defines the random word"]


app.get('/random', function (req, res) {
  axios.get(`http://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&minLength=5&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5`)
  .then(function (response) {
    res.json(response.data)
  })
  .catch(function (error) {
    console.log(error);
  });
});

app.get('/word', function (req, res) {
  var query = req.query.query;
  axios.get(`http://api.wordnik.com/v4/word.json/${query}/definitions?useCanonical=true&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5`)
  .then(function (response) {
    var defObj = {
      word: response.data[0].word,
      definition: response.data[0].text
    }
    axios.get(`http://api.wordnik.com:80/v4/word.json/${query}/pronunciations?useCanonical=true&limit=50&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5`)
    .then(function(response2) {
      defObj.pronunciation = response2.data[0].raw;

      axios.get(`http://api.wordnik.com:80/v4/word.json/${query}/examples?includeDuplicates=false&useCanonical=true&skip=0&limit=5&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5`)
      .then(function(response3) {
        defObj.example = response3.data.examples[0].text;

        mongo.addWord(defObj, (data) => {
          res.json(data)
        });
      })
       
    })
  })
  .catch(function (error) {
    console.log(error);
  });
});


app.listen(3000, function() {
  console.log('listening on port 3000!');
});
