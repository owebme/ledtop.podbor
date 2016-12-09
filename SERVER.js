var config          = require('./libs/config'),
    log             = require('./libs/log')(module),
    express         = require('express'),
    http            = require('http'),
    request         = require('request'),
    path            = require('path'),
    fs              = require('fs'),
    swig            = require('swig'),
    favicon         = require('serve-favicon'),
    logger          = require('morgan'),
    bodyParser      = require('body-parser'),
    session         = require('express-session'),
    memoryStore     = session.MemoryStore,
    underscore      = require('underscore'),
    MobileDetect    = require('mobile-detect');
//var generate = require('./generate');

var app = express();
app.express = express;
app.config = config;
app.async = require('async');
app.db = require('./libs/db/mongoose')(log, config);
app.mysql = require('./libs/db/mysql')(log, config);
app.log = log;
app.errHandler = require('./libs/errHandler');
app.ObjectId = require('mongodb').ObjectID;
app.utils = require('./libs/utils');
underscore.extend(app.utils, underscore);

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + (app.config.get('env') == "production" ? "/views/production" : "/views"));
swig.setDefaults({ cache: false });
app.set('view cache', false);
app.swig = swig;

app.use(favicon(path.join(__dirname, '/', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({limit: '2mb'}));
app.use(bodyParser.urlencoded({ limit: '2mb', extended: false }));
app.use(session({
    secret: config.get('session:secret'),
	key: config.get('session:key'),
    cookie: config.get('session:cookie'),
    store: new memoryStore(),
    resave: true,
    saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, '/')));

app.checkAuth = require('./router/checkAuth');

require('./router')(app);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  app.log.error('Internal error(%d): %s', (err.status || 500), err.message);
  res.status(err.status || 500);
  res.render('error', {
    message: err.status || "Error",
    error: {
        status: err.message
    }
  });
});

var server = http.createServer(app);
server.listen(config.get('port'), function(){
	app.log.info('Express server listening on port ' + config.get('port'));
});
