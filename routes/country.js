const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const country = require('../model/country');
const config = require(__dirname + '/../config/jwt_key.json')

const secretKey = config.secretKey;



router.get('/', countryList);
router.get('/add', countryaddform);
router.get('/login', Loginform);
router.get('/create_member', create_memberform);
router.get('/tokenchk',tokenVerifier);
router.get('/:id', countryDetail);
router.get('/edit/:id', countryEditform);
router.post('/', addcountry);
router.post('/comment', addcomment);
router.post('/member', createmember);
router.post('/login', login);
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
    const data = await country.getcontrydetail(id);
    const comment = await country.getcontry_comment(id);
    res.render('detail', { result: data ,comment:comment});
}

async function login(req, res) {
    const login_data = req.body;
    const data = await country.memberlogin(login_data);
    if (data != undefined) {
        const token = jwt.sign({ id: data.member_id, name: data.name }, secretKey ,{expiresIn: '1h'});
        res.send({ msg: 'success', token: token ,name:data.name });
    } else {
        res.sendStatus(401)
    }
}

function countryaddform(req, res) {
    res.render('add');
}

function Loginform(req, res) {
    res.render('login');
}

function create_memberform(req, res) {
    res.render('create_member');
}
async function countryEditform(req, res) {
    const id = req.params.id;
    const data = await country.getcontrydetail(id);
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
async function createmember(req, res) {
    const data = req.body;
    try {
        const result = await country.createmember(data);
        console.log(result);
        if(result == 'fail'){
            res.render('fail', { msg: 'id중복'});
        }else{
            res.render('success', { msg: 'success', data: result[0] ,type:'member_create'});
        }
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

function tokenVerifier(req, res) {
    let token = req.headers['authorization'];
    if (token) {
        jwt.verify(token, secretKey, (err, decoded) => {
            if (decoded) {
                console.log(decoded);
                res.send(decoded);
            }
            else {
                res.statusMessage = 'fail decoded';
                res.status(500).end();
            }            
        });
    }
    else {
        res.statusMessage ='not token';
        res.status(500).end();
    }    
}