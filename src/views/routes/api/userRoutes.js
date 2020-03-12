import jsonwebtoken as jwt;

const createToken = (res, user, lifeTime = '1h') => {
    jwt.sign(user, 'privatekey', { expiresIn: lifeTime }, (err, token) => {
        if (err) { return callback(err) }
        res.send(token)
    });
}

const verifyToken = (req, res) => {
    jwt.verify(req.token, 'privatekey', (err, authorizedData) => {
        if (err) {
            console.log('ERROR: Could not connect to the protected route');
            return
        } else {
            res.json({
                message: 'Successful log in',
                authorizedData
            });
            console.log('SUCCESS: Connected to protected route');
        }
    })
}
const checkToken = (req, res, next) => {
    const header = req.headers['authorization'];

    if (typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];

        req.token = token;
        next();
    } else {
        res.sendStatus(403)
    }
}

module.exports =  {
    verifyToken,
    checkToken
}