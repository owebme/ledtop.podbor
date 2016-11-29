(function(app, $, $dom, EV, _){

    app.define("router");

    app.router = {

        base: "#",

        start: false,

        init: function(){

            if (window.route) riot.route = window.route;

            riot.route('/', function(){
                if (!_.isEmpty(Router.params.get())){
                    Router.mount('podbor');
                }
                else {
                    Router.mount('begin');
                }
            });

            riot.route('podbor', function(){
                Router.mount('podbor');
            });

            riot.route('offerManager', function(){
                $Config.select('offers', 'manager').set(true);
                Router.mount('podbor');
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

        mount: function(screen){
            if (!Router.start){
                if (app.compatible){
                    app.compatible.init(Router.render, screen);
                }
                else {
                    Router.render(screen);
                }
            }
        },

        render: function(screen){
            var $loader = $dom.body.find("#loader"),
                section = riot.mount(".screens", "screens" + (app.device.isPhone ? "-mobile" : ""))[0];

            section.one("updated", function(){
                $afterlag.run(function(){
                    $dom.body.removeClass("appLoading");
                    _.onEndTransition($loader[0], function(){
                        $loader.remove();
                    });
                }, {
                    iterations: screen == "podbor" ? 10 : 2,
                    timeout: screen == "podbor" ? 2000 : 500
                });
                $afterlag.run(function(){
                    $Screens[screen].show();
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
