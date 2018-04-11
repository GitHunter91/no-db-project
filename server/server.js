require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const m = require('./controllers/Music_controller');
const massive = require('massive');
const session = require('express-session');
const axios = require('axios');

massive(process.env.CONNECTION_STRING).then(db=>app.set('db',db))

const PORT = 4200;

const app = express();
app.use(bodyParser.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false
}))
app.use(express.static(`${__dirname}/../build`))

app.get('/auth/callback', ( req, res ) => {
    axios.post( `https://${ process.env.REACT_APP_AUTH0_DOMAIN }/oauth/token`, {
        client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        code: req.query.code,
        grant_type: 'authorization_code',
        redirect_uri: `http://${req.headers.host}/auth/callback`
        }).then( accessTokenResponse => {
                const accessToken = accessTokenResponse.data.access_token;
                console.log('-------------accessToken', accessToken)
                    return axios.get( `https://${process.env.REACT_APP_AUTH0_DOMAIN}/userinfo/?access_token=${ accessToken }` )
                        .then( userInfoResponse => {
                            const userData = userInfoResponse.data;
                            console.log('--------------userData', userData)
                                req.session.user = userData;
                                res.redirect( '/' );
                        })
        }).catch( error => { 
                console.log(' error in /auth/callback', error );
                res.status( 500 ).json({ message: 'An unexpected error occured on the server.' })
    });
});

app.post('/api/logout',( req, res ) => {
    req.session.destroy();
    res.send();
})
app.get('/api/user-data', (req, res ) => {
    res.json({
        user: req.session.user
    });
})
app.get('/api/viewPlaylist',m.read);
app.post('/api/addSong',m.create);
app.put('/api/updateSong/:id',m.update);
app.delete('/api/deleteSong/:id',m.delete);

app.listen( PORT, ()=> console.log( `You are running on Port ${PORT}` ));
