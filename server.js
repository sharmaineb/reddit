import express from 'express';
import { engine } from 'express-handlebars';

const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('home');
});

// CASES RESOURCE

// NEW

app.get('/cases/new', (req, res) => {
    res.render('cases-new', {});
})

// CREATE

app.post('/cases', (req, res) => {
    console.log("hello")

    const caseId = "3"
    res.redirect(`/cases/${caseId}`)
});

// INDEX 

// SHOW

app.get('/cases/:id', (req, res) => {
    console.log(req.params.id);

    res.render('cases-show', { case })
});

// EDIT

app.get('/cases/:id/edit', (req, res) => {
// find the case
// render edit form
})
  
// UPDATE

app.put('/cases/:id', (req, res) => {
// update the case
// redirect show
})
  
// DESTROY

app.delete('/cases/:id', (req, res) => {
// delete the case
// redirect to index
})

app.listen(3000);