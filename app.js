const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api', (req, res) => {
    res.json({message: "Welcome to the API"})
})

app.post('/api/posts', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {

            res.json({message: "Post created",authData})
        }
    })
})

app.post('/api/login', (req, res) => {

    //MockUser
    const user = {
        id: 1,
        username: 'brad',
        email: 'brad@gmail.com'
    }

    jwt.sign({
        user: user
    }, 'secretkey',{expiresIn:'30s'}, (err, token) => {
        res.json({token: token})
    });
})
// FORMAT OF TOKEN Authorization:  Bearer <access_token> verify token
function verifyToken(req, res, next) {
    // Get auth header value
    var bearerHeader = req.headers['authorization']

    // check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        // split at space
        const bearer = bearerHeader.split(' ')
        const bearerToken = bearer[1];

        // set the token
        req.token = bearerToken;

        // next middleware
        next();

    } else {
        // forbidden
        res.sendStatus(403);
    }
}

app.listen(47533, () => console.log("Server started on port 47533"));