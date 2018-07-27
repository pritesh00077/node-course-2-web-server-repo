const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');

app.use((req,res,next) => {   //next tells when middleware function is done
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log',log +'\n', (err) => {
    if(err){
      console.log('Unable to write to the File server.log');
    }
  });

  next();   //application continues to run
});

// app.use((req,res,next) => {   //next tells when middleware function is done
//   res.render('Maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));       //Make default directory to render, Register MiddleWare

hbs.registerHelper('getCurrentYear',() => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text) => {
  return text.toUpperCase();
});

app.get('/',(req,res) => {                      //setup a handler
  res.render('home.hbs',{
    pageTitle: 'Home Page',
    welcomeText: 'Welcome to My Home Page'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs',{
    pageTitle: 'About Page',
    welcomeText: 'Welcome to My About Page'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to get Request'
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
