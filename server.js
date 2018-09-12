const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
//hbs line under
hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now  = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err) {
      console.log('Unable to append server.log');
    }
  });
  next();
});

app.use((req, res, next) => {
  res.render('maintenance.hbs');
});

app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

//hbs.registerHelper('uper', (text) => {
//  return text.toUpperCase()
//});

app.get('/', (req, res) => {
  //res.send('<h1>hello epress!</h1>');
  res.render('home.hbs', {
    pageTitle: 'home page',
    //currentYear: new Date().getFullYear(),  (hbs register helper)
    welcome: 'welcome to your home page'

  });
});

app.get('/about', (req, res) => {
  //send na render
  res.render('about.hbs', {
    pageTitle: 'about page',
    //currentYear: new Date().getFullYear() (hbs register helper)
  });
});


app.get('/bad', (req, res) => {
  res.send({
    erorMesage: 'unable to conenct'
  });
});

app.listen(3000, () => {
  console.log('server is starting port 3000');
});
