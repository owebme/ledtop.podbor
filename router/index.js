module.exports = function(app){

    app.get('/', function(req, res) {
        res.render('index');
    });

    app.get('/login', function(req, res) {
        res.render('login');
    });

    app.get('/podbor/', function(req, res) {
        res.render('podbor');
    });

    app.get('/private/', function(req, res) {
        res.render('private');
    });

    require(process.cwd() + '/assets/API')(app);
}
