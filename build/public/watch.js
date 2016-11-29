module.exports = function() {

	gulp.task('public.watch', function() {
		gulp.watch([
			'public/css/style.scss',
			'public/css/**/*.scss'
		], gulp.series('public.css'));

		// gulp.watch([
		// 	'public/css/styleguide.scss',
		// 	'public/css/**/*.scss'
		// ], gulp.series('styleguide'));

		gulp.watch([
			'public/js/*.js',
			'public/js/**/*.js',
			// 'public/styleguide/*.html',
			// 'public/styleguide/**/*.html',
			'public/templates/*.html',
			'public/templates/**/*.html',
			'podbor.html'
		]).on('change', reload);
	});
};
