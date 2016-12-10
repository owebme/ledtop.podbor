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
var GulpSSH = require('gulp-ssh');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var _ = require('underscore');

var config = {
	host: '5.101.124.21',
	port: 22,
	username: 'root',
	password: '6T9Qxia2XyrrD68W'
}
var gulpSSH = new GulpSSH({
	ignoreErrors: false,
	sshConfig: config
})

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
	return gulp.src(['assets/js/libs/jquery.min.js',
		'assets/js/libs/modernizr.custom.js',
		'assets/js/libs/fastclick.min.js',
		'assets/js/libs/riot/riot+compiler.update.js',
		'assets/js/libs/baobab.js',
		'assets/js/libs/underscore-min.js',
		'assets/js/libs/rangeslider.js',
		'assets/js/libs/afterlag-js/dist/afterlag.min.js',
		'assets/js/libs/url.min.js',
		'assets/js/libs/store.min.js',
		'assets/js/libs/iscroll.js'])
		.pipe(concat('libs.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./public/js'));
});

gulp.task('public.app', function() {
	return gulp.src(['assets/js/components/commons/app.js',
		'assets/js/components/commons/common.js',
		'assets/js/components/commons/afterlag.js',
		'assets/js/components/commons/compatible.js',
		'assets/js/components/commons/modules.js',
		'assets/js/components/commons/utils.js',
		'assets/js/components/commons/request.js',
		'public/js/components/fetch.js',
		'public/js/components/config.js',
	    'public/js/components/tutorial.js',
		'public/js/components/router.js',
		'assets/js/plugins/styles.js',
		'assets/js/plugins/animate.js',
		'assets/js/plugins/marquee.js',
		'assets/js/plugins/screens.js',
		'assets/js/store/products.js',
		'assets/js/store/packages.js',
		'assets/js/store/light.js',
		'assets/js/store/type.js',
		'assets/js/store/group.js',
		'public/js/store/data.js',
		'public/js/store/humidity.js',
		'public/js/store/color.js',
		'public/js/store/order.js'])
		.pipe(concat('app.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./public/js'));
});

gulp.task('public.templates', function() {
	return gulp.src(['assets/templates/ui/*.html',
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
	return gulp.src(['public/js/libs.js',
		'public/js/templates.js',
		'public/js/app.js',
		'public/js/init.js'])
		.pipe(concat('app.build.js'))
		.pipe(gulp.dest('./public/js'));
});

gulp.task('serve', function() {
	browserSync.init({
		open: false,
		notify: false,
		watchOptions: {
	        usePolling: true
	    },
		proxy: "http://localhost:8080/"
		// server: {
		// 	baseDir: "./"
		// }
	});

	browserSync.watch([
		'public/**/*.js',
		'public/**/*.html',
		'assets/templates/ui/*.html',
		'assets/templates/ui/**/*.html'
	]).on('change', reload);

	browserSync.watch([
		'public/API/*.js',
		'public/API/**/*.js',
		'views/podbor.html'
	]).on('change', _.debounce(reload, 3000));
});

gulp.task('watch', function() {
	gulp.watch([
		'public/css/style.scss',
		'public/css/**/*.scss'
	], gulp.parallel('public.css', 'public.css.largeScreen'));
});

gulp.task('sftp-app.js', function () {
	return gulp.src('public/js/app.build.js')
      .pipe(gulpSSH.sftp('write', '/var/www/ledtop-podbor/data/www/v.ledtop-shop.ru/public/js/app.build.js'));
});
gulp.task('sftp-css', function () {
	return gulp.src('public/css/style.css')
	  .pipe(gulpSSH.sftp('write', '/var/www/ledtop-podbor/data/www/v.ledtop-shop.ru/public/css/style.css'));
});
gulp.task('sftp-css.largeScreen', function () {
	return gulp.src('public/css/style.largeScreen.css')
	  .pipe(gulpSSH.sftp('write', '/var/www/ledtop-podbor/data/www/v.ledtop-shop.ru/public/css/style.largeScreen.css'));
});

gulp.task('public.css.build', gulp.parallel('public.css', 'public.css.largeScreen', 'styleguide'));

gulp.task('public.js.build', gulp.parallel('public.libs', 'public.app', 'public.templates'));

gulp.task('build', gulp.series(
	gulp.parallel('public.css.build', gulp.series('public.js.build', 'public.app.build')),
	gulp.parallel('sftp-app.js', 'sftp-css', 'sftp-css.largeScreen')
));

gulp.task('dev', gulp.series(
	'public.css',
	gulp.parallel('serve', 'watch')
));
