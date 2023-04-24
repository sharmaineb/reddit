const express = require('express');
const { engine } = require('express-handlebars');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

require('./controllers/posts')(app);
require('./controllers/comments.js')(app);

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