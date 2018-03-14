var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

// db.dropDatabase();

var defSchema = mongoose.Schema({
  word: String,
  definition: String,
  pronunciation: String,
  example: String
});

var Def = mongoose.model('Def', defSchema);

var addWord = function(defObj, callback) {
  new Def(defObj)
  .save(function (err, def) {
    if (err) return console.error(err);
    selectWord(def.word, callback)
  });
}

var selectWord = function(word, callback) {
  Def.findOne({'word': word }, function(err, data) {
    if(err) {
      console.log(err);
    }
    callback(data)
  });
};

module.exports.addWord = addWord;
module.exports.selectWord = selectWord;
