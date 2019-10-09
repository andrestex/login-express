const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const flash = require('connect-flash');
const morgan = require('morgan');
const cokkieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');
const app = express();


//SETTING
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views')); //define el directorio de las rutas
app.set('view engine', 'ejs'); //define el template engine

//MIDDLEWEARS
app.use(cokkieParser());
app.use(morgan('dev'));
app.use(bodyParser.json()); // permite interpretar estructura JSON
app.use(bodyParser.urlencoded({
  extended: false
})); // permite interpretar formulario
app.use(session({
    secret: 'keyboard',
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//ROUTERS
app.use(require('./app/routers/index.js'));
passport.use(require('./app/routers/index.js'));
passport.use(require('./config/passport.js'));

//STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));

//START SERVER
app.listen(app.get('port'), () => {

  console.log('Servidor en el puerto', app.get('port'));

});
