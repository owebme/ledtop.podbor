(function(app, $, $dom, EV, _){

    app.define("router");

    app.router = {

        base: "#",

        start: false,

        init: function(){

            if (window.route) riot.route = window.route;

            riot.route('/', function(){
                if (!_.isEmpty(Router.params.get())){
                    Router.mount({
                        screen: 'podbor'
                    });
                }
                else {
                    Router.mount({
                        screen: 'begin'
                    });
                }
            });

            riot.route('podbor', function(){
                Router.mount({
                    screen: 'podbor'
                });
            });

            riot.route('order', function(){
                Router.mount({
                    screen: 'podbor',
                    section: 'order'
                });
            });

            riot.route('sendmail', function(){
                Router.mount({
                    screen: 'podbor',
                    section: 'sendmail'
                });
            });

            riot.route('payment', function(){
                Router.mount({
                    screen: 'podbor',
                    section: 'payment'
                });
            });

            riot.route('gallery', function(){
                Router.mount({
                    screen: 'podbor',
                    section: 'gallery'
                });
            });

            riot.route.base(this.base);
            riot.route.start(true);
        },

        params: {
            get: function(){
                return Url.parseQuery();
            },
            set: function(params){
                Url.updateSearchParam(params);
            }
        },

        nav: function(url){
            riot.route(url);
        },

        mount: function(options){
            if (!Router.start){
                if (app.compatible){
                    app.compatible.init(Router.render, options);
                }
                else {
                    Router.render(options);
                }
            }
        },

        render: function(options){
            var $loader = $dom.body.find("#loader"),
                section = riot.mount(".screens", "screens" + (app.device.isPhone ? "-mobile" : ""))[0];

            section.one("updated", function(){
                $afterlag.run(function(){
                    $dom.body.removeClass("appLoading");
                    _.onEndTransition($loader[0], function(){
                        $loader.remove();
                    });
                }, {
                    iterations: options.screen == "podbor" ? 7 : 2,
                    timeout: options.screen == "podbor" ? 2000 : 500
                });
                $afterlag.run(function(){
                    $Screens[options.screen].show({
                        section: options.section
                    });
                }, {
                    iterations: 3,
                    timeout: 1000
                });
                Router.start = true;
            });
        }
    };

    var Router = app.router;

    $Router = app.router;

})(app, $$, app.$dom, app.events, app.utils);
