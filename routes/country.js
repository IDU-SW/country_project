const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const country = require('../model/country');
const config = require(__dirname + '/../config/jwt_key.json')
const { verifyToken } = require('../middlewares/authorization');

const YOUR_SECRET_KEY = config.secretKey;



router.get('/', countryList);
router.get('/add',verifyToken, countryaddform);
router.get('/login', Loginform);
router.get('/logout', logout);
router.get('/create_member', create_memberform);
router.post('/tokenchk',tokenchk);
router.get('/:id', countryDetail);
router.get('/edit/:id', verifyToken, countryEditform);
router.post('/', verifyToken, addcountry);
router.post('/comment',verifyToken, addcomment);
router.post('/member', createmember);
router.post('/login', login);
router.put('/',verifyToken, updatecountry);
router.delete('/:id',verifyToken, deltecountry);

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
        const token = jwt.sign({ id: data.member_id, name: data.name }, YOUR_SECRET_KEY ,{expiresIn: '1h'});
        res.cookie('user', token);
        res.send({ msg: 'success', token: token ,name:data.name });
    } else {
        res.sendStatus(401)
    }
}

function countryaddform(req, res) {
    console.log('/111')
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
    data.writer = res.locals.userId;
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

function logout(req, res) {
    res.clearCookie('user');
    res.status(200).end();
}

function tokenchk(req, res) {
    // let token = req.headers['authorization'];
    let token = req.body.data;
    if (!token) {
        res.status(400).json({
            'status': 400,
            'msg': 'Token 없음'
        });
    }
    const checkToken = new Promise((resolve, reject) => {
        jwt.verify(token, YOUR_SECRET_KEY, function (err, decoded) {
            if (err) reject(err);
            resolve(decoded);
        }); 
    });

    checkToken.then(
        token => {
            console.log(token);
            res.status(200).json({
                'status': 200,
                'msg': 'success',
                token
            });
        }
    )
}
