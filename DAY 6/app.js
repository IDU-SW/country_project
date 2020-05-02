const express = require('express');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(favicon(__dirname+'/public/favicon.ico'))

const countryRouter = require('./router/countryRouter');
app.use(countryRouter);

app.listen(3000);