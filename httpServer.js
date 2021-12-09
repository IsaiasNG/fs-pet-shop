// 'use strict';

const fs = require('fs');
const path = require('path');
const petsPath = path.join(__dirname, 'pets.json');

const http = require('http');
const PORT = 8000;

const petRegExp = /^\/pets\/(.*)$/;

const server = http.createServer(function(req, res) {
    

  if (req.method === 'GET' && req.url === '/pets') {
    allPetsJson(req, res);
  }
  else if (req.method === 'GET' && req.url === `/pets/0`) {
    firstPetJson(req, res);
  }
  else if (req.method === 'GET' && req.url === '/pets/1') {
    secondPetJson(req, res);
  }
  else {
    notFound(req, res)
  }
});


server.listen(PORT, function() {
  console.log(`Listening on port: ${PORT}`);
});



function allPetsJson(req, res){
        fs.readFile(petsPath, 'utf8', function(err, petsJSON) {
          if (err) {
            console.error(err.stack);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'text/plain');
            return res.end('Internal Server Error');
          }
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(petsJSON);
        });
}


function firstPetJson(req, res) {
fs.readFile(petsPath, 'utf8', function(err, petsJSON) {
    if (err) {
      console.error(err.stack);
      res.statusCode = 500;
      res.setHeader('Content-Type', 'text/plain');
      return res.end('Internal Server Error');
    }

    var pets = JSON.parse(petsJSON);
    var petJSON = JSON.stringify(pets[0]);

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(petJSON);
  });
}

function secondPetJson(req, res){
    fs.readFile(petsPath, 'utf8', function(err, petsJSON) {
        if (err) {
          console.error(err.stack);
          res.statusCode = 500;
          res.setHeader('Content-Type', 'text/plain');
          return res.end('Internal Server Error');
        }
  
        var pets = JSON.parse(petsJSON);
        var petJSON = JSON.stringify(pets[1]);
  
        res.setHeader('Content-Type', 'application/json');
        res.end(petJSON);
      });
}

function notFound(req, res){
    res.statusCode = 404;
    console.log(res.statusCode)
    console.log(req.url)
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not found');
}