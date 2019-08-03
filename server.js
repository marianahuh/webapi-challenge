const express = require('express');
const actionRouter = require('./actions/actionRouter');
const projectRouter = require('./projects/projectRouter');
const helmet = require('helmet');
const logger = require('morgan');

const server = express();

server.use('/api/actions', actionRouter);
server.use('/api/projects', projectRouter);
server.use(logger('dev'), detailedLogger, express.json(), helmet());

server.get('/', (req, res) => {
  res.send('<h1>Web API Sprint Challenge!</h1><h2>Projects & Actions</h2>');
});

function detailedLogger(req, res, next) {
  console.log(
    `Request Method: ${req.method}, Request Url: ${
      req.url
    }, Requested on:${Date()}`
  );
  next();
}

module.exports = server;
