(function(app, $, $dom, EV, _){

    app.define("plugins.scroll.content");

    app.plugins.scroll.content = function(scope, options){
        if (!scope) return;

        this.active = false;
        this.scope = $(scope);
        this.content = this.scope.find('.scroll__content');
        this.options = options;
    };

    app.plugins.scroll.content.prototype = {

        init: function(){
            var _this = this;

            if (this.active || !this.content.length) return;

            var options = {
                disableMouse: true,
                mouseWheel: true,
                scrollX: false,
                scrollY: true,
                click: false,
                tap: false,
                scrollbars: 'custom',
                interactiveScrollbars: !app.device.support.touch,
                probeType: 3
            }
            if (this.options) _.extend(options, this.options);

        	this.scroll = new IScroll(this.content[0], options);

            if (options.keyboard) this.keyboard();
        	this.embeds();

            this.active = true;
        },

        show: function(){
            this.scroll.enable();
        },

        hide: function(){
            this.scroll.disable();
        },

        keyboard: function(){
            var scroll = this.scroll,
                eventName = 'keydown.keyboards-scroll-' + String(Math.round(new Date().getTime() / 1000));
                paused = false,
                duration = 500;

            // scroll to
            var scrollTo = function(y){
                if (paused) return false;
                paused = true;
                scrollTimer = setTimeout(function(){
                    paused = false;
                }, 50);
                scroll.scrollTo(0, y, duration, IScroll.utils.ease.cubicOut);
            };

            // prev
            var prev = function(){
                var y = Math.min(0, scroll.y + 100);
                scrollTo(y);
            };

            // next
            var next = function(){
                var y = Math.max(scroll.maxScrollY, scroll.y - 100);
                scrollTo(y);
            };

            // prev
            var pageUp = function(){
                var y = Math.min(0, scroll.y + scroll.wrapperHeight);
                scrollTo(y);
            };

            // next
            var pageDown = function(){
                var y = Math.max(scroll.maxScrollY, scroll.y - scroll.wrapperHeight);
                scrollTo(y);
            };

            // start
            var toStart = function(){
                scrollTo(0);
            };

            // start
            var toEnd = function(){
                scrollTo(scroll.maxScrollY);
            };

            // {fn} enable
            scroll.enableKeyboardScroll = function(){
                if (!app.device.support.touch) $dom.document.on(eventName, function(e){
                    if (e.which==38) prev();
                    if (e.which==40) next();
                    if (e.which==33) pageUp();
                    if (e.which==34) pageDown();
                    if (e.which==36) toStart();
                    if (e.which==35) toEnd();
                });
            };

            // {fn} disable
            scroll.disableKeyboardScroll = function(){
                if (!app.device.support.touch) $dom.document.off(eventName);
            };

            // init
            if (scroll.enabled) scroll.enableKeyboardScroll();

            scroll.on('enable', function(){
                scroll.enableKeyboardScroll();
            });

            scroll.on('disable', function(){
                scroll.disableKeyboardScroll();
            });
        },

        embeds: function(){
            var scroll = this.scroll,
                $block = $(scroll.wrapper),
        	    isScrolled = false,
        	    grabTimer;

            $dom.window.on('resize', function(){
        		if ($block.css('position') != 'static') scroll.refresh();
        	});

        	var start = function(){
        		clearTimeout(grabTimer);
        		if (!isScrolled) {
        			$block.addClass('i-scrolling');
        			isScrolled = true;
        		}
        	};
        	var end = function(){
        		clearTimeout(grabTimer);
        		if (isScrolled) {
        			$block.removeClass('i-scrolling');
        			isScrolled = false;
        		}
        	};

        	scroll.on('grab', function(){
        		start();
        		grabTimer = setTimeout(function(){
        			scroll.reset();
        			end();
        		}, 500);
        	});

        	scroll.on('scroll', function(){
        		if (scroll.moved) start();
        	});

        	scroll.on('scrollEnd', function(){
        		end();
        	});
        },

        destroy: function(){
            this.scroll.destroy();
            this.active = false;
        }
    };
