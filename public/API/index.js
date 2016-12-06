module.exports = function(app){

	// Initialize
	app.get('/public/api/data/init', require('./data/init')(app));

}
