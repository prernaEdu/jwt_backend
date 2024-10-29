const jwt = require('jsonwebtoken');
const secretKey = 'secretkey';  

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log(authHeader);
    
    if (!authHeader) return res.status(401).send('Access Denied: No Token Provided');

    const token = authHeader.split(" ")[0];
    
    jwt.verify(token, secretKey, (err, user) => {
        console.log('error::::',err)
        console.log('user::::',user)
        console.log('token::::::', token);
        
        if (err) return res.status(403).send('Access Denied: Invalid Token');
        
        req.user = user;
        next();
    });
};

module.exports = authenticateToken;
