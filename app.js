const express = require('express');
const favicon = require('serve-favicon');

const app = express();
app.use(favicon(__dirname+'/public/favicon.ico'))

const countryRouter = require('./router/countryRouter');
app.use(countryRouter);

app.listen(3000);