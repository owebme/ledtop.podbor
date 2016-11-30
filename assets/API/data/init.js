module.exports = function(app) {

	return function(req, res, next){

		app.async.parallel([

			// function(callback){
			// 	app.db.collection('accounts').findOne({
			// 		"_id": req.session.user.accountID
			// 	},
			// 	function(err, data){
			// 		app.errHandler(res, err, data, callback);
			// 	});
			// },

			function(callback){
				app.mysql.query("SELECT p_art, p_name, p_price FROM cat_product", function(err, data){
		            app.errHandler(res, err, data, callback);
		        });
			},

			function(callback){
				app.db.collection('products').find().toArray(function(err, data){
					app.errHandler(res, err, data, callback);
				});
			},
		],

		function(err, data){
			if (data && data.length){
				data = {
					// account: data[0],
					//user: req.session.user,
					data: data[0],
					products: data[1]
				}
			}
			app.errHandler(res, err, data);
		});
	}
};
