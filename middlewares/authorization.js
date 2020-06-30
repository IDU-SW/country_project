const jwt = require('jsonwebtoken');
const config = require(__dirname + '/../config/jwt_key.json')
const YOUR_SECRET_KEY = config.secretKey;

const verifyToken = (req, res, next) => {
    try {
        const clientToken = req.cookies.user;
        const decoded = jwt.verify(clientToken, YOUR_SECRET_KEY);
        if (decoded) {
            res.locals.userId = decoded.id;
            next();
        } else {
            res.status(401).json({ error: 'unauthorized' });
        }
    } catch (err) {
        res.status(401).json({ error: 'token expired' });
    }
};
exports.verifyToken = verifyToken;