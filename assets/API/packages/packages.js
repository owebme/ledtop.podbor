module.exports = function(app, url){

	var route = app.express.Router();

    route.post('/', function(req, res) {
        app.db.collection('packages').insert(req.body,
        function(err, data){
            app.errHandler(res, err, data);
        });
	});

    route.delete('/', function(req, res) {
        app.db.collection('packages').remove({
            "_id": req.body.id
		},
		function(err, data){
			app.errHandler(res, err, data);
		});
	});

	route.put('/item', function(req, res) {
		app.db.collection('packages').update({
			"_id": req.body.id
		},{
			$set: req.body.item
		},
		function(err, data){
			app.errHandler(res, err, data);
		});
	});

	route.put('/sort', function(req, res) {
		app.async.each(req.body, function(item, callback){
			app.db.collection('packages').update({
				"_id": item._id,
			},{
				$set: { "pos": item.pos }
			},
			function(err, data){
				app.errHandler(res, err, data, callback);
			});
		},
		function(err, data){
			app.errHandler(res, err, "OK");
		});
	});

	app.use(url, route);
};
