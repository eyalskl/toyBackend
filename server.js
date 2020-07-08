const express = require('express');
const bodyParser = require('body-parser');
// const session = require('express-session')
const app = express()
const port = process.env.PORT || 3000;


const cors = require('cors')
app.use(bodyParser.json())
    // app.use(session({
    //     secret: 'fdspu4thipo43hf8fv8v',
    //     resave: false,
    //     saveUninitialized: true,
    //     cookie: { secure: false }
    // }))
app.use(cors())
app.use(express.static('public'))

const toyRoute = require('./api/toy.route');
const userRoute = require('./api/user.route');

app.use('/api/toy', toyRoute);
app.use('/api/user', userRoute);

app.listen(port,
    () => console.log(`App listening on port ${port}`))