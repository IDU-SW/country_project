const express = require('express');
const router = express.Router();
const country = require('../model/country');


router.get('/country', (req, res) => {

    const countryList = country.getcontryList();
    const data = countryList;
    const result = { count: data.length, data: data };
    res.send(result);

});

router.get('/country/:id', (req, res) => {
    const id = req.params.id;
    const data = country.getcontrydetal(id);
    res.send(data);
});


module.exports = router;
