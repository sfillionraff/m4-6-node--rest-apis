'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { v4: uuidv4 } = require('uuid');
const { clients } = require('./data/clients.js');
const { words } = require('./data/words.js');
const { playHangman } = require('./handlers/hangmanHandlers.js');

express()
  .use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  })
  .use(morgan('tiny'))
  .use(express.static('public'))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))

  // endpoints

  .get('/clients', (req, res) => {
    res.status(200).json({
      status: 200,
      data: clients
    })
  })

  .get(('/client/:id'), (req, res) => {
    let clientId = req.params.id;
    let client = clients.find((client) => {
      return clientId === client.id
    });
    res.status(200).json({
      status: 200,
      data: client
    })
  })

  .post(('/client/add'), (req, res) => {
    const { isActive, age, name, gender, company, email, phone, address } = req.body;
    let emailExists = clients.map((client) => {
      if (client.email === email) {
        return true;
      } else {
        return false;
      }
    })
    if (emailExists) {
      res.status(400).json({
        status: "error",
        message: "this client already exists in the database"
      })
    } else {
      let id = uuidv4();
      req.body.id = id;
      clients.push(req.body);
      res.status(200).json({
        status: 400,
        message: "client added successfully to the database"
      })
    }
  })

  .delete(('/client/:id'), (req, res) => {
    let id = req.params.id;
    let clientIndex;
    clients.find((client) => {
      if (id === client.id) {
        clientIndex = clients.indexOf(client);
        return client;
      }
    })
    clients.splice((`${clientIndex}, 1`));
    res.status(200).json({
      status: 200,
      message: 'client deleted'
    })
  })

  .get(('/hangman/word/:id'), (req, res) => {
    let wordId = req.params.id;
    let selectedWord = words.find((word) => {
      return wordId === word.id;
    })
    res.status(200).json({
      status: 200,
      data: selectedWord
    })
  })

  .get(('/hangman/word'), (req, res) => {
    let randomWord = words[Math.floor(Math.random() * Math.floor(10))];
    let wordId = randomWord.id;
    let wordCount = randomWord.letterCount;

    res.status(200).json({
      status: 200,
      data: {wordId, wordCount}
    })
  })

  .get(('/hangman/guess/:id/:letter'), playHangman)
  
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })
  .listen(8000, () => console.log(`Listening on port 8000`));
