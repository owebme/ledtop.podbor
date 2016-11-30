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

gulp.task('public.css', function() {
	return combiner(
		gulp.src('public/css/style.scss'),
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
		gulp.dest('public/css'),
		browserSync.stream()
	).on('error', notify.onError({
		"sound": false,
	}));
});

gulp.task('public.css.largeScreen', function() {
	return combiner(
		gulp.src('public/css/style.scss'),
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
		gulp.dest('public/css'),
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

gulp.task('public.libs', function() {
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
		.pipe(gulp.dest('./public/js'));
});

gulp.task('public.app', function() {
	gulp.src(['assets/js/components/commons/app.js',
		'assets/js/components/commons/common.js',
		'assets/js/components/commons/afterlag.js',
		'assets/js/components/commons/compatible.js',
		'assets/js/components/commons/modules.js',
		'assets/js/components/commons/utils.js',
		'public/js/components/config.js',
	    'public/js/components/tutorial.js',
		'public/js/components/router.js',
		'assets/js/plugins/animate.js',
		'assets/js/plugins/styles.js',
		'public/js/store/control.js',
		'public/js/store/ledribbon.js',
		'public/js/store/power.js'])
		.pipe(concat('app.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./public/js'));
});

gulp.task('public.templates', function() {
	gulp.src(['assets/templates/ui/*.html',
		'assets/templates/ui/**/*.html',
		'assets/templates/modules/notify.html',
		'assets/templates/modules/tutorial.html',
		'public/templates/*.html',
		'public/templates/**/*.html'])
		.pipe(riot())
		.pipe(concat('templates.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./public/js'));
});

gulp.task('public.app.build', function() {
	gulp.src(['public/js/libs.js',
		'public/js/templates.js',
		'public/js/app.js',
		'public/js/init.js'])
		.pipe(concat('app.build.js'))
		.pipe(gulp.dest('./public/js'));
});

gulp.task('public.css.build', gulp.parallel('public.css', 'public.css.largeScreen', 'styleguide'));

gulp.task('public.js.build', gulp.parallel('public.libs', 'public.app', 'public.templates'));

gulp.task('build', gulp.parallel('public.css.build', 'public.app.build'));

gulp.task('dev', gulp.parallel('public.css', 'public.js.build'));

// gulp.task('build', gulp.series(gulp.parallel('css', 'css.largeScreen', 'styleguide', 'libs', 'app', 'templates'), 'app.build'));

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
	'assets/templates/ui/*.html',
	'assets/templates/ui/**/*.html',
	'public/templates/*.html',
	'public/templates/**/*.html',
	'podbor.html'
]).on('change', reload);
