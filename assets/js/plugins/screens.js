(function(app, $, $dom, EV, _){

    app.define("plugins.screens");

    app.plugins.screens = function(scope, options){
        this.active = false;
        this.scope = $(scope);
        this.options = options || {};
        this.state = null;
        this.items = [];
    };

    app.plugins.screens.prototype = {

        init: function(screen){
            var _this = this;

            if (this.active) return;

            this.scope.on('touchmove MSPointerMove', function(e){
        		e.preventDefault();
        	});

            this.scope.on('dragstart selectstart', function() {
                return false;
            });

            var options = {
                vertical: true,
                screens: '.screen',
                effect: this.options.vertical === false ? 'space' : 'light',
                mousewheel: this.options.vertical === false ? false : true,
                spaceClass: this.options.vertical === false ? 'horizontal__space' : 'vertical__space',
                longClass: this.options.vertical === false ? false : 'screen--long',
                contentClass: this.options.vertical === false ? false : 'screen__content',
                hideSections: true,
                navPrev: this.options.navPrev,
        		navNext: this.options.navNext,
                duration: this.options.vertical === false ? (app.device.isPhone ? 375 : 450) : 500,
            }

            if (this.options) _.extend(options, this.options);

            var index = 100;
            this.scope.find(options.screens).each(function(i) {
                _this.items[this.getAttribute("data-marquee")] = i;
                if (!options.vertical) this.style.zIndex = index;
                index--;
            });

            this.marquee = app.plugins.marquee(this.scope, options);
            this.marquee.enable();

            this.marquee.scroll.on('scrollEnd', function(){
                _this.state = _this.marquee.section;
            });

            if (screen) this.nav(screen, 0);

            this.active = true;
        },

        nav: function(screen, duration){
            if (!screen) return;
            var i = this.items[screen];
            if (i !== undefined) {
                this.state = screen;
                this.marquee.scrollTo(i, duration !== undefined ? duration : undefined);
            }
        },

        get: function(parameter){
    		return this.marquee[parameter];
    	},

        refresh: function(){
            this.marquee.resize();
        },

        destroy: function(){
            this.scope.off();
            this.marquee.scroll.off();
            this.marquee.destroy();
            this.active = false;
        }
    };

})(app, $, app.$dom, app.events, app.utils);
