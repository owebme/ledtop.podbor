module.exports = function(app) {

	return function(req, res, next){

		app.async.parallel({

			account: function(callback){
				if (req.session.user){
					app.db.collection('accounts').findOne({
						"_id": req.session.user.accountID
					},
					function(err, data){
						app.errHandler(res, err, data, callback);
					});
				}
				else {
					app.errHandler(res, false, null, callback);
				}
			},

			data: function(callback){
				app.mysql.query("SELECT p_art AS article, p_name AS title, p_price AS price, p_color AS color FROM cat_product WHERE p_show = '1'", function(err, data){
		            app.errHandler(res, err, data, callback);
		        });
			},

			params: function(callback){
				app.mysql.query("SELECT p.p_art AS article, p.p_color AS color, p.p_color_rel AS related, f.field, f.value FROM cat_product AS p JOIN cat_product_fields AS f ON(f.p_id=p.p_id) WHERE p.p_show = '1' AND (p.p_color != '' AND f.field = 'Класс пыле-влагозащиты' OR f.field = 'Размер' OR f.field = 'Габариты, мм')" , function(err, data){
					app.errHandler(res, err, data, callback);
				});
			},

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
			if (results.params){
				results.data = app.utils.map(results.data, function(item){
					var _item = app.utils.findWhere(results.params, { "article": item.article });
					if (_item && _item.value) {
						if (item.color && _item.field == "Класс пыле-влагозащиты"){
							item.hum = _item.value;
							if (_item.related){
								item.related = _item.related.split(";");
								item.related = app.utils.map(item.related, function(related){
									var expr = related.match(/(\d+)\[(.*)\]/);
									related = {
										article: expr[1],
										color: expr[2]
									}
									return related;
								});
							}
						}
						else if (!item.color && (_item.field == "Размер" || _item.field == "Габариты, мм")){
							var expr = _item.value.match(/(\d+).(\d+).(\d+)/);
							if (expr){
								item.size = {
									length: expr[1] ? expr[1] : null,
									width: expr[2] ? expr[2] : null,
									height: expr[3] ? expr[3] : null
								}
							}
							delete item.color;
						}
					}
					return item;
				});
				delete results.params;
            }
			results.user = req.session.user;
			app.errHandler(res, err, results);
		});
	}
};
