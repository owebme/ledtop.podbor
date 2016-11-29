(function(loader){
	// history
	loader.history = [];
	// {fn} load resources
	loader.resources = function(resources, complete, callback){
		// check callbacks
		complete = complete || $.noop;
		callback = callback || $.noop;
		// unchached resources
		var unchached = [];
		for (var i=0; i<resources.length; i++) {
			if (loader.history.indexOf(resources[i])<0) unchached.push(resources[i]);
		};
		// if resources is empty
		if (!unchached.length) return complete();
		// load
		Modernizr.load({
			load: unchached,
			callback: function(url){
				loader.history.push(url);
				callback();
			},
			complete: complete
		});
	};
	// {fn} load images
	loader.images = function($scope, complete, callback){
		var loaded = 0;
		// check callbacks
		complete = complete || $.noop;
		callback = callback || $.noop;
		// init plugin
		$scope.imagesLoaded({ background: '.bg-cover' }).always(complete).progress(function(instance){
			loaded++;
			callback(loaded, instance.images.length)
		});
	}
})(app.loader);

(function(sizes, $dom){
	// {fn} update sizes
	var updateSizes = function(){
		sizes.width = $dom.window.width();
		sizes.height = parseInt(window.innerHeight,10);
	};
	// {event} window resize
	$dom.window.on('resize.app', updateSizes);
	// init
	updateSizes();
})(app.sizes, app.$dom);

(function(device, $dom){

	/* --- Mobile --- */
	device.support = Modernizr;

	/* --- Mobile --- */
	device.isMobile = device.support.touch;
	$dom.html.addClass(device.isMobile ? 'd-mobile' : 'd-no-mobile');

	/* --- Retina --- */
	device.isRetina = (window.devicePixelRatio && window.devicePixelRatio>1);
	$dom.html.addClass(device.isRetina ? 'd-retina' : 'd-no-retina');

	/* --- sizeCheck --- */
	var sizeCheck = function(){
		var width = $dom.window.width();
		device.isPhone = (width < 768);
		device.isTablet = (width < 1025 && width > 767);
		device.orientation = (device.isTablet && width < 1025 && width > 991 || device.isPhone && width > 480 ? "landscape" : "portrait");
		$dom.html
		.addClass(device.isPhone ? 'd-phone' : 'd-no-phone')
		.removeClass(device.isPhone ? 'd-no-phone' : 'd-phone')
		.addClass(device.isTablet ? 'd-tablet' : 'd-no-tablet')
		.removeClass(device.isTablet ? 'd-no-tablet' : 'd-tablet')
		.addClass(device.orientation === "landscape" ? 'r-landscape' : 'r-portrait')
		.removeClass(device.orientation !== "landscape" ? 'r-landscape' : 'r-portrait');
	};
	$dom.window.on('resize.sizeCheck', sizeCheck);
	sizeCheck();

	if (navigator.userAgent.match(/(iPhone)/i)) device.isPhone = true;

	/* --- iOS --- */
	if (navigator.userAgent.match(/iPad/i)) {
		$dom.html.addClass('d-ipad');
		device.isIPad = true;
	};
	if (navigator.userAgent.match(/(iPhone|iPod touch)/i)) {
		$dom.html.addClass('d-iphone');
		device.isIPhone = true;
	};
	if (navigator.userAgent.match(/(iPad|iPhone|iPod touch)/i)) {
		$dom.html.addClass('d-ios');
		device.isIOS = true;
		var expr = navigator.userAgent.match(/.*CPU.*OS (\d)_(\d)/i);
		device.verOS = expr && expr[1] ? expr[1] + (expr[2] ? "." + expr[2] : "") : false;
	}
	else {
		$dom.html.addClass('d-no-ios');
	};
	if (navigator.userAgent.match(/.*CPU.*OS 7_\d/i)) {
		$dom.html.addClass('d-ios7');
		device.isIOS7 = true;
	};
	if (navigator.userAgent.match(/Android/i)) {
		$dom.html.addClass('d-android');
		device.isAndroid = true;
		var expr = navigator.userAgent.match(/Android (\d)\.(\d)/i);
		device.verOS = expr && expr[1] ? expr[1] + (expr[2] ? "." + expr[2] : "") : false;
	};

	/* --- iPad (for fix wrong window height) --- */
	if ($dom.html.hasClass('d-ipad d-ios7')) {
		$dom.window.on('resize orientationchange focusout', function(){
			window.scrollTo(0,0);
		});
	};

	device.isWin = navigator.platform.indexOf("Win") > -1;
	device.isMac = navigator.platform.indexOf("Mac") > -1;
	device.isLinux = navigator.platform.indexOf("Linux") > -1;

	$dom.html.addClass(device.isMac ? 'd-macOS' : 'd-no-macOS');

	/* --- Safari --- */
	device.isSafari = /constructor/i.test(window.HTMLElement);
	$dom.html.addClass(device.isSafari ? 'd-safari' : 'd-no-safari');

	/* --- Firefox --- */
	device.isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
	$dom.html.addClass(device.isFirefox ? 'd-firefox' : 'd-no-firefox');

	/* --- Fix click onTouch device --- */
	if (device.isMobile && window.FastClick && 'addEventListener' in document) {
		document.addEventListener('DOMContentLoaded', function() {
			FastClick.attach(document.body);
		}, false);
	}

	if (!device.isMobile){
		var timer, body = $dom.body[0];
		$dom.window[0].addEventListener('scroll', function(){
			clearTimeout(timer);
			if (!body.getAttribute("class") || !body.getAttribute("class").match(/disable__hover/)){
				body.classList.add('disable__hover');
			}

			timer = setTimeout(function(){
				body.classList.remove('disable__hover')
			}, 300);
		}, false);
	}

})(app.device, app.$dom);

(function(effects, prefixed){
	// light effect
	effects.light = {};
	effects.light.show = function($block, position, size, ratio){
		$block[0].style.opacity = 1;
		$block[0].style[prefixed.transform] = 'translateY(' + Math.round(size-position*size) + 'px) translateZ(0)';
		if (position==0) $block[0].style[prefixed.transform] = 'translateY(110%)';
	};
	effects.light.hide = function($block, position, size, ratio){
		$block[0].style.opacity = (1-position*0.4).toFixed(3);
		$block[0].style[prefixed.transform] = 'translateY(' + Math.round(-(ratio-1)*size - (position*size*0.5)) + 'px) translateZ(0)';
		if (position==1) $block[0].style[prefixed.transform] = 'translateY(-110%)';
		if (position==0) $block[0].style[prefixed.transform] = 'translateY(' + Math.round(-(ratio-1)*size) + 'px) translateZ(0)';
	};
	effects.light.move = function($block, position, size){
		$block[0].style.opacity = 1;
		$block[0].style[prefixed.transform] = 'translateY(' + Math.round(-position*size) + 'px) translateZ(0)';
	};
	// space effect
	effects.space = {};
	effects.space.show = function($block, position){
		$block[0].style.opacity = 0.33+position*0.67;
		var transform = '';
		if (position==0) {
			transform = 'translate3d(110%, 0, 0)';
		} else if (app.device.isPhone) {
			transform = 'perspective(500px) translate3d(' + (-8+8*position) + '%, 0, 0) rotateY(' + (-6+position*6) + 'deg) scale(' + (0.8+position*0.2) + ')';
		} else {
			transform = 'perspective(500px) translate3d(' + (-4+4*position) + '%, 0, 0) scale(' + (0.9+position*0.1) + ')';
			if (!app.device.isFirefox) transform = transform + 'rotateY(' + (-4+position*4) + 'deg)';
		}
		$block[0].style[prefixed.transform] = transform;
	};
	effects.space.hide = function($block, position){
		$block[0].style.opacity = 1;
		$block[0].style[prefixed.transform] = 'translate3d(' + (-100*position) + '%, 0, 0)';
		if (position==1) $block[0].style[prefixed.transform] = 'translate3d(-110%, 0, 0)';
	};
	// fold effect
	effects.fold = {};
	effects.fold.show = function($block, position){
		$block[0].style.opacity = 1;
		$block[0].style[prefixed.transform] = 'translateY(' + (100-position*100) + '%)';
	};
	effects.fold.hide = function($block, position){
		$block[0].style.opacity = 1-position*0.67;
		$block[0].style[prefixed.transform] = 'perspective(500px) translateY(' + (4*position) + '%) rotateX(' + (-position*3) + 'deg) scale(' + (1-position*0.05) + ')';
		if (position==1) $block[0].style[prefixed.transform] = 'translateY(-101%)';
	};
})(app.effects, app.prefixed);
