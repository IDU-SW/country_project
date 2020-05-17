const express = require('express');
const router = express.Router();
const country = require('../model/country');



router.get('/', countryList);
router.get('/add', countryaddform);
router.get('/:id', countryDetail);
router.get('/edit/:id', countryEditform);
router.post('/', addcountry);
router.post('/comment', addcomment);
router.put('/', updatecountry);
router.delete('/:id', deltecountry);

module.exports = router;

async function countryList(req, res) {
    const countryList = await country.getcontryList();
    const result = { count: countryList.length, data: countryList };
    res.render('index', { result: result });
}

async function countryDetail(req, res) {
    const id = req.params.id;
    const data = await country.getcontrydetal(id);
    const comment = await country.getcontry_comment(id);
    res.render('detail', { result: data ,comment:comment});
}

function countryaddform(req, res) {
    res.render('add');
}

async function countryEditform(req, res) {
    const id = req.params.id;
    const data = await country.getcontrydetal(id);
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
async function addcomment(req, res) {
    const data = req.body;
    try {
        const result = await country.addcomment(data);
        res.redirect('/country/'+data.id);
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
        res.redirect('/country');
    } catch (error) {
        res.status(500).send(error.msg);
    }

}

async function deltecountry(req, res) {
    const id = req.params.id;
    try {
        const result = await country.deltecountry(id);
        const result_sub = await country.deltecountry_comment(id);
        res.send({ msg: 'success', data: result + "번 삭제 완료" });
    } catch (error) {
        res.status(500).send(error.msg);
    }
}