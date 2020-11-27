require('./models/User');
require('./models/Track');
const express = require('express');
require('colors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const trackRoutes = require('./routes/trackRoutes');
const authRoutes = require('./routes/authRoutes');
const requireAuth = require('./middlewares/requireAuth');

// @desc initializing dotenv
dotenv.config();

const app = express();

app.use(bodyParser.json());

app.use(authRoutes);
app.use(trackRoutes);

// @desc allow to accept json data from the body "req.body"
app.use(express.json());

// @desc mongoDB config
const mongoUri = process.env.MONGO_URI;
mongoose.connect(mongoUri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
});
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB ...'.brightCyan);
});
mongoose.connection.on('error', (err) => {
    console.log('Error connecting to mongoDB', err);
});

app.get('/', requireAuth, (req, res) => {

    res.send(`Your email: ${ req.user.email }`);
});

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${ process.env.PORT } ...`.brightBlue);
});
