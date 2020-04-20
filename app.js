const express = require('express');
const favicon = require('serve-favicon');

const app = express();
app.use(favicon(__dirname+'/public/favicon.ico'))


app.listen(3000);