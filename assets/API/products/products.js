module.exports = function(app, url){

	var route = app.express.Router();

    route.post('/', function(req, res) {
        app.db.collection('products').insert(req.body,
        function(err, data){
            app.errHandler(res, err, data);
        });
	});

    route.delete('/', function(req, res) {
        app.db.collection('products').remove({
			"_id": {
				$in: req.body.ids
			}
		},{
			multi: true
		},
		function(err, data){
			app.errHandler(res, err, data);
		});
	});

	route.put('/item', function(req, res) {
		app.db.collection('products').update({
			"article": req.body.article
		},{
			$set: { "text": req.body.text }
		},{
			multi: true
		},
		function(err, data){
			app.errHandler(res, err, data);
		});
	});

	route.put('/sort', function(req, res) {
		app.async.each(req.body, function(item, callback){
			app.db.collection('products').update({
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
