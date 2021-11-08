
// calling express to create an instance app
const express = require('express');
const app = express();

// Creating an empty javascript object to save data
weatherData = {};

/* you may need the bodyParser as a middle ware, if so call it:
const bodyParser = require('body-parser'); otherwise it is 
a part of the express */
app.use(express.urlencoded({ extended : false }));
app.use(express.json());
app.use(express.static('Website'));

// Now calling the cors which shall work as a gate allowing requests
const cors = require('cors');
const { info } = require('console');
app.use(cors());

// creating a server
const port = 3000;
/* const link = '127.0.0.1'; */
const server = app.listen(port, () => {console.log(`running on localhost: http://localhost:${port}/`)})

/* Building a post funvtion to recieve the body form the user site */
app.post('/weather', (req,res) => {
  weatherData = req.body;
  console.log(weatherData);
  res.send(weatherData).end();
})

/* now the get method */
app.get('/getAll', (req, res) => {
  res.send(weatherData).end();
});