(function(app, $, $dom, EV, _){

    app.define("plugins.scroll.progress");

    app.plugins.scroll.progress = function(options){

        if (!options || options && !options.scroll) return;

        this.active = false;
        this.scroll = $(options.scroll);
        this.scope = options.container ? $(options.container) : this.scroll;
    };

    app.plugins.scroll.progress.prototype = {

        start: function(){
            var _this = this;

            if (this.active) return;

            this.progress = $('<div class="oScreen__scroll__progress"></div>').appendTo(this.scope);

            this.line = $('<div class="oScreen__scroll__progress__line"></div>').appendTo(this.progress)[0];

            this.height = parseInt(Math.max(this.scroll.outerHeight(), this.scroll[0].scrollHeight));

            setTimeout(function(){
                _this.progress.attr("data-active", "true");
            }, 20);

            this.scroll.on("scroll.progress", function(){
                _this.update(this.scrollTop);
            });

            this.active = true;
        },

        update: function(scroll){
            this.line.style[app.prefixed.transform] = "translate3d(-" + (100 - (scroll / this.height) * 100) + "%, 0, 0)";
        },

        destroy: function(){
            if (!this.active) return;
            this.scroll.off("scroll.progress");
            this.progress.remove();
            this.active = false;
        }
    };

})(app, $, app.$dom, app.events, app.utils);
