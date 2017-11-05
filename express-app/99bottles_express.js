// init project
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('<h1>99 Bottles of Beer on the wall</h1>' 
            + '<a href=/98>Take one down, pass it around</a>');
})

app.get('/:number_of_bottles', function(req, res) {
  let numberOfBottles = parseInt(req.params.number_of_bottles);
  let nextBottleNumber = numberOfBottles - 1; 
  
  //1. Number of Bottles is 0
  //2. Number of Bottles is 1
  //3. Number of Bottles is above 1 
  if (numberOfBottles === 0){ 
      res.send(`<h1>${numberOfBottles} Bottles of Beer on the wall</h1><h2>Go Home, you're drunk</h2>`);
  }
  else if (numberOfBottles === 1){ 
      res.send(`<h1>${numberOfBottles} Bottle of Beer on the wall</h1>`
      + `<a href=/${nextBottleNumber}>Take one down, pass it around </a>`);
  }
  else if (numberOfBottles > 1){ 
    res.send(`<h1>${numberOfBottles} Bottles of Beer on the wall</h1>`
      + `<a href=/${nextBottleNumber}>Take one down, pass it around </a>`);
  }
  else {
    res.send(`<iframe src="https://giphy.com/embed/3ornk6UHtk276vLtkY" width="480" height="211" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/starwars-3ornk6UHtk276vLtkY">via GIPHY</a></p>`)
  }
    
})





app.listen(3000, function () {
   console.log('Example app listening on port 3000!')
 })

// listen for requests :)
//var listener = app.listen(process.env.PORT, function () {
//  console.log('Your app is listening on port ' + listener.address().port);
//});
