module.exports = function(app, url){

	var route = app.express.Router();

    route.post('/', function(req, res) {
        app.db.collection('products').insert(req.body,
        function(err, data){
            app.errHandler(res, err, data);
        });
	});

	app.use(url, route);
};
