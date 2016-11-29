(function(app, $, $dom, EV, _){

    app.define("plugins.styles");

    app.plugins.styles = {

        ready: false,

        init: function(options) {

            if (WD.ready) return;

            this.el = $(options.elem);

            this.screen = options.default;

            this.screens = options.screens;

            this.callback = options.callback;

            WD.resizer(app.$dom.window[0].innerWidth);

            app.$dom.window.on('resize.styles', function(){
               if (WD.resizer(this.innerWidth).length && WD.callback){
                   WD.callback(WD.screen);
               }
            });

            WD.ready = true;
        },

        resizer: function(width){
            return _.filter(WD.screens, function(screen){

                if ((screen.minWidth && screen.maxWidth && width > screen.minWidth - 1 && width < screen.maxWidth + 1 ||
                screen.minWidth && !screen.maxWidth && width > screen.minWidth ||
                screen.maxWidth && !screen.minWidth && width < screen.maxWidth) && WD.screen !== screen.title){

                    if (screen.reload && WD.ready){
                        window.location.reload();
                    }
                    else if (screen.path){
                        WD.el.attr("href", screen.path);
                    }

                    WD.screen = screen.title;

                    console.log("resize: " + screen.title);

                    return WD.screen;
                }
            })
        }
    };

    var WD = app.plugins.styles;

})(app, $, app.$dom, app.events, app.utils);
