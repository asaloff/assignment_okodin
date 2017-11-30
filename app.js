const express = require('express');
const app = express();


// Body Parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));


// Method Override
app.use((req, res, next) => {
  if (req.query._method || (typeof req.body === 'object' && req.body._method)) {
    let method = req.query._method || req.body._method;
    req.method = method.toUpperCase();
    req.url = req.path;
  }
  next();
});


// Public
app.use(express.static(`${__dirname}/public`));


// Logging
const logger = require('morgan');
const morganToolkit = require('morgan-toolkit')(logger);

app.use(morganToolkit());


// Sessions/Cookies
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');

app.use(cookieParser());

app.use(cookieSession({
  name: 'session',
  keys: ['asdf1234567890qwer']
}));


// Flash Messages
var flash = require('express-flash-messages');
app.use(flash());


// Authentication Redirection
const authRedirect = require('./lib/auth_redirect');
app.use(authRedirect);


// Routes
const signup = require('./routers/sign_up');
const sessions = require('./routers/sessions');
const profiles = require('./routers/profiles');
const search = require('./routers/search');
const views = require('./routers/views');

app.use('/', signup);
app.use('/sign_up', signup);
app.use('/sessions', sessions);
app.use('/profiles', profiles);
app.use('/search', search);
app.use('/views', views);


// Template Engine
const expressHandlebars = require('express-handlebars');
const helpers = require('./helpers');

const hbs = expressHandlebars.create({
  helpers: helpers,
  partialsDir: 'views/',
  defaultLayout: 'application',
  extname: '.hbs'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');


// Server
var port = process.env.PORT ||
  process.argv[2] ||
  3000;
var host = 'localhost';

var args;
if (process.env.NODE_ENV === 'production') {
  args = [port];
} else {
  args = [port, host];
}

args.push(() => {
  console.log(`Listening: http://${ host }:${ port }`);
});

app.listen.apply(app, args);
