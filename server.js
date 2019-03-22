//Require packages
const express = require('express');
const app = express();
const port = 3000;
const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({extended: true}));

const persondb = require('./person');

//Add static content directory
app.use(express.static('public'));

//Initialize pug templating engine
app.set('view engine', 'pug');

//Routes
app.get('/', (req, res) => {
    res.render('index!')
})

app.get('/about', (req,res) => {
    let p = person.getPerson(0);
    res.render('about', p);
})

app.get('/person/:id', (req,res) => {
    let personId = req.params.id;
    let p = persondb.getPerson(personId);

    if (p === null) {
        res.status(404).send('Not found');
    } else {
        res.render('person', p);
    }
})

app.get('/persons', (req,res) => {
    let p = persondb.getPersons();
    res.render('persons', { persons: p });
})

app.post('/person', (req,res) => {

})

app.post('/person/register', (req,res) => {
    console.log("Register new person...");
    console.log(req.body);
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let age = req.body.age;
    let gender = req.body.gender;
    let sports = req.body.sports;
     
    let person = new persondb.Person(firstname, lastname);
    person.setGender(gender);
    person.setAge(age);
    person.addSport(sports);
    persondb.addPerson(person);

    res.writeHead(302, { 'Location' : '/persons' });
    res.end();
})

app.get('/test', (req,res)=>{
    res.status(404).send('Not found');
})

app.listen(port);