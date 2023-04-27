const express = require('express');
const { engine } = require('express-handlebars');
const cookieParser = require('cookie-parser');
const checkAuth = require('./middleware/checkAuth');
const app = express();
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); // Add this after you initialize express.
app.use(checkAuth);

require('./controllers/posts')(app);
require('./controllers/comments.js')(app);
require('./controllers/auth.js')(app);
require('./controllers/replies.js')(app);


// Set db
require('./data/reddit-db');

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// HOME

app.get('/', (req, res) => {
    res.render('home');
});

// NEW

app.get('/posts/new', (req, res) => {
    res.render('posts-new', {});
})

module.exports = app;
app.listen(3000);