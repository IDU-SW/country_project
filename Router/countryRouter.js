const express = require('express');
const router = express.Router();
const country = require('../model/country');



router.get('/country', countryList);
router.get('/country/:id', countryDetail);
router.post('/country', addcountry);
router.put('/country', updatecountry);
module.exports = router;

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

async function addcountry(req, res) {
    const data = req.body;
    try {
        const result = await country.addcontry(data);
        res.send({ msg: 'success', data: result });
    } catch (error) {
        res.status(500).send(error.msg);
    }
}

async function updatecountry(req,res){
    const data = req.body;
    if(data.id=""){
        res.status(400).send({error:'id 누락'});
        return;
    }
    try {
        const result = await country.updatecontry(data);
        res.send({ msg: 'success', data: result });
    } catch (error) {
        res.status(500).send(error.msg);
    }

}