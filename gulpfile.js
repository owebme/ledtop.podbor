var gulp = require('gulp');
var sass = require('gulp-sass');
var csso = require('gulp-csso');
var base64 = require('gulp-base64');
var autoprefixer = require('gulp-autoprefixer');
var notify = require('gulp-notify');
var riot = require('gulp-riot');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var px2vw = require('gulp-px2vw');
var combiner = require('stream-combiner2').obj;
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

browserSync.init({
	open: false,
	notify: false,
	watchOptions: {
        usePolling: true
    },
	// proxy: "http://localhost:8080/"
	server: {
		baseDir: "./"
	}
});

gulp.task('css', function() {
	return combiner(
		gulp.src('assets/css/style.scss'),
		sass(),
		csso(),
		autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}),
        base64({
            baseDir: './',
            extensions: ['svg'],
            maxImageSize: 16*1024, // bytes
            debug: false
        }),
		gulp.dest('assets/css'),
		browserSync.stream()
	).on('error', notify.onError({
		"sound": false,
	}));
});

gulp.task('css.largeScreen', function() {
	return combiner(
		gulp.src('assets/css/style.scss'),
		sass(),
		csso(),
		autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}),
        base64({
            baseDir: './',
            extensions: ['svg'],
            maxImageSize: 16*1024, // bytes
            debug: false
        }),
		px2vw({
			width: 1400,
			minPx: 2,
			maxPx: 10000,
			replace: true
		}),
		rename("style.largeScreen.css"),
		gulp.dest('assets/css'),
		browserSync.stream()
	).on('error', notify.onError({
		"sound": false,
	}));
});

gulp.task('styleguide', function() {
	return combiner(
		gulp.src('assets/css/styleguide.scss'),
		sass(),
		csso(),
		autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}),
        base64({
            baseDir: './',
            extensions: ['svg', 'png', 'jpg'],
            maxImageSize: 16*1024, // bytes
            debug: false
        }),
		gulp.dest('assets/css'),
		browserSync.stream()
	).on('error', notify.onError({
		"sound": false,
	}));
});

gulp.task('libs', function() {
	gulp.src(['assets/js/libs/jquery.min.js',
		'assets/js/libs/modernizr.custom.js',
		'assets/js/libs/fastclick.min.js',
		'assets/js/libs/riot/riot+compiler.update.js',
		'assets/js/libs/baobab.js',
		'assets/js/libs/underscore-min.js',
		'assets/js/libs/rangeslider.js',
		'assets/js/libs/afterlag-js/dist/afterlag.min.js',
		'assets/js/libs/url.min.js',
		'assets/js/libs/store.min.js'])
		.pipe(concat('libs.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./assets/js'));
});

gulp.task('app', function() {
	gulp.src(['assets/js/components/app.js',
		'assets/js/components/common.js',
		'assets/js/components/config.js',
		'assets/js/components/modules.js',
		'assets/js/components/utils.js',
	    'assets/js/components/tutorial.js',
		'assets/js/components/router.js',
		'assets/js/components/compatible.js',
		'assets/js/plugins/animate.js',
		'assets/js/plugins/styles.js',
		'assets/js/store/control.js',
		'assets/js/store/ledribbon.js',
		'assets/js/store/power.js'])
		.pipe(concat('app.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./assets/js'));
});

gulp.task('templates', function() {
	gulp.src(['assets/templates/*.html',
		'assets/templates/**/*.html'])
		.pipe(riot())
		.pipe(concat('templates.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./assets/js'));
});

gulp.task('app.build', function() {
	gulp.src(['assets/js/libs.js',
		'assets/js/templates.js',
		'assets/js/app.js',
		'assets/js/init.js'])
		.pipe(concat('app.build.js'))
		.pipe(gulp.dest('./assets/js'));
});

gulp.task('css.build', gulp.parallel('css', 'css.largeScreen', 'styleguide'));

gulp.task('js.build', gulp.parallel('libs', 'app', 'templates'));

gulp.task('build', gulp.series('css.build', 'js.build'));

// gulp.task('build', gulp.series(gulp.parallel('css', 'css.largeScreen', 'styleguide', 'libs', 'app', 'templates'), 'app.build'));

gulp.watch([
	'assets/css/style.scss',
	'assets/css/**/*.scss'
], gulp.series('css'));

// gulp.watch([
// 	'assets/css/styleguide.scss',
// 	'assets/css/**/*.scss'
// ], gulp.series('styleguide'));

gulp.watch([
	'assets/js/*.js',
	'assets/js/**/*.js',
	// 'assets/styleguide/*.html',
	// 'assets/styleguide/**/*.html',
	'assets/templates/*.html',
	'assets/templates/**/*.html'
]).on('change', reload);

gulp.watch([
	// 'styleguide.html',
	'podbor.html'
]).on('change', reload);
