const express = require('express');
const router = express.Router();
const country = require('../model/country');


router.get('/country', countryList);
router.get('/country/:id', countryDetail);

function countryList(req, res) {

    const countryList = country.getcontryList();
    const data = countryList;
    const result = { count: data.length, data: data };
    res.send(result);

}

async function countryDetail(req, res) {
    const id = req.params.id;
    const data = await country.getcontrydetal(id);
    res.send(data);
}


module.exports = router;
