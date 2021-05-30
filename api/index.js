const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');
const formatsAccepted = require('./Serializer').formatsAccepted;
const serializerError = require('./Serializer').SerializerErrors;

app = express();
app.use(bodyParser.json()); //depreciated
// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//   })
// );

//middleware to filter contents types of header
app.use((req, res, next) => {
  let formatRequested = req.header('Accept');

  if (formatRequested === '*/*') formatRequested = 'application/json';

  if (formatsAccepted.indexOf(formatRequested) === -1) {
    res.status(406);
    res.end();
    return;
  }

  res.setHeader('Content-Type', formatRequested);
  next();
});

app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  next();
});

const NotFound = require('../errors/NotFound');
const InvalidField = require('../errors/InvalidField');
const DataIsEmpty = require('../errors/DatasIsEmpty');
const ValueNotSupport = require('../errors/ValueNotSupport');

const routesMaterials = require('../router/materials');
app.use('/api/materials', routesMaterials);

const routesMaterialV2 = require('../router/materials/router-v2');
app.use('/api/v2/materials', routesMaterialV2);

//middleware to catch errors
app.use((error, req, res, next) => {
  let status = 500;

  if (error instanceof NotFound) status = 404;
  if (error instanceof InvalidField || error instanceof DataIsEmpty)
    status = 400;
  if (error instanceof ValueNotSupport) status = 406;

  serializer = new serializerError(res.getHeader('Content-Type'));

  res.status(status);
  res.send(
    //     JSON.stringify({
    //         id:  error.errorId,
    //         message: error.message
    // })
    serializer.serializer({
      message: error.message,
      id: error.errorId,
    })
  );
});

app.listen(config.get('api.port'), () =>
  console.log('Api running in port 3000')
);
