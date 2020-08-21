const mongoose = require('mongoose');

const URI = "mongodb://localhost:27017/abatalib";


mongoose.connect(URI, {useUnifiedTopology: true, useNewUrlParser: true}, (err) => {
    if (!err) { console.log('Connection Succeeded.') }
    else { console.log('DB connection error: ' + err) }
});