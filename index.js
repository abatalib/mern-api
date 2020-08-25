const express = require('express');
const cors = require('cors');
const Router = require('./routes/routes.js');

require('./database/connexion.js');

const app = express();

app.use(express.json());

app.use(cors());

// app.use(function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     next();
// });

app.use('/api', Router);

app.listen(8000, ()=> console.log('Port 8000 en écoute...'));