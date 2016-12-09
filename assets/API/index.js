module.exports = function(app){

	// Initialize
	app.get('/private/api/data/init', app.checkAuth(), require('./data/init')(app));

	// Products
	require('./products/products')(app, '/private/api/products');

	// Packages
	require('./packages/packages')(app, '/private/api/packages');

}
