module.exports = function(app) {

	return function(req, res, next){

		app.async.parallel({

			products: function(callback){
				app.db.collection('products').find().toArray(function(err, data){
					app.errHandler(res, err, data, callback);
				});
			},

			packages: function(callback){
				app.db.collection('packages').find().toArray(function(err, data){
					app.errHandler(res, err, data, callback);
				});
			}
		},

		function(err, results){
			app.errHandler(res, err, results);
		});
	}
};
