//ITE5315--Professor: Shahdad
const express = require('express')
const bodyParser = require('body-parser')
const { check, validationResult } = require('express-validator')

const app = express()
const port = process.env.PORT || 5000;

// Set Templating Engine
const handlebars = require('express-handlebars');
const HBS = handlebars.create({
    extname: '.hbs',
    //Create custom helper
    helpers: {
        calculation: function(num){
            return num+10;
        },
        strong: function(options) {
            return '<strong>' + options.fn(this) + '</strong>'
        }
    },
    defaultLayout: 'main'
})
app.engine('hbs', HBS.engine);
app.set('view engine', 'hbs');

const urlencodedParser = bodyParser.urlencoded({ extended: false })

// Navigation
app.get('', (req, res)=> {
    // res.render('index', {
    //     layout: 'main' // do not use the default Layout (main.hbs) 
    // });
    res.render('index');
})

app.get('/register', (req, res)=> {
    // res.render('register', {
    //     layout: false // do not use the default Layout (main.hbs) 
    // });
    res.render('register')
})

app.post('/register', urlencodedParser, [
    check('username', 'This username must me 3+ characters long')
        .exists()
        .isLength({ min: 3 }),
    check('email', 'Email is not valid')
        .isEmail()
        .normalizeEmail()

], (req, res)=> {
    console.log(req);
    const errors =  validationResult(req)
    if(!errors.isEmpty()) {
        // return res.status(422).jsonp(errors.array())
      
        const alert = errors.array()
        // res.render('register', {
        //     errs: alert,
        //     // layout: false // do not use the default Layout (main.hbs) 
        // });
        res.render('register');
    }
    // res.render('output', {
    //     data: req.body,
    //     // layout: false 
    // });
    res.render('output');
 
  
})

app.listen(port, () => console.info(`App listening on port: ${port}`))