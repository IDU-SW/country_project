const express = require('express');
const router = express.Router();
const country = require('../model/country');



router.get('/', countryList);
router.get('/add', countryaddform);
router.get('/:id', countryDetail);
router.get('/edit/:id', countryEditform);
router.post('/', addcountry);
router.put('/', updatecountry);
router.delete('/:id', deltecountry);

module.exports = router;

async function countryList(req, res) {
    const countryList = await country.getcontryList();
    const result = { count: countryList.length, data: countryList };
    // res.send(result);
    console.log(result);
    res.render('index', { result: result });
}

async function countryDetail(req, res) {
    const id = req.params.id;
    const data = await country.getcontrydetal(id);
    // res.send(data);
    res.render('detail', { result: data });
}

function countryaddform(req, res) {
    res.render('add');
}

async function countryEditform(req, res) {
    const id = req.params.id;
    const data = await country.getcontrydetal(id);
    // res.send(data);
    res.render('edit', { result: data });
}

async function addcountry(req, res) {
    const data = req.body;
    try {
        const result = await country.addcontry(data);
        res.render('success', { msg: 'success', data: result[0], type: 'add' });
    } catch (error) {
        res.status(500).send(error.msg);
    }
}

async function updatecountry(req, res) {
    const data = req.body;
    if (data.id == "") {
        res.status(400).send({ error: 'id 누락' });
        return;
    }
    try {
        const result = await country.updatecontry(data);
        res.render('success', { msg: 'success', data: result, type: 'edit' });
    } catch (error) {
        res.status(500).send(error.msg);
    }

}

async function deltecountry(req, res) {
    const id = req.params.id;
    try {
        const result = await country.deltecountry(id);
        res.send({ msg: 'success', data: result + "번 삭제 완료" });
    } catch (error) {
        res.status(500).send(error.msg);
    }
}