const express = require('express');
const router = express.Router();
const country = require('../model/country');

router.get('/country', showcountryList);


module.exports = router;

function showcountryList(req,res) {
    const countryList = country.getcontryList();
    res.send(countryList);
}