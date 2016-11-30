(function(app, $, $dom, EV, _){

    app.define("router");

    app.router = {

        base: "#/",

        start: false,

        section: null,

        init: function(){

            riot.route('/', function(){
                Router.routes.products();
            });

            riot.route('/packages', function(){
                Router.routes.packages();
            });

            riot.route('/offers', function(){
                Router.routes.offers();
            });

            riot.route('/managers', function(){
                Router.routes.managers();
            });

            riot.route.base(this.base);
            riot.route.start(true);
        },

        routes: {
            products: function(){
                Router.section = "products";
                Router.mount('section-products');
            },
            packages: function(){
                Router.section = "packages";
                Router.mount('section-packages');
            },
            offers: function(){
                Router.section = "offers";
                Router.mount('section-offers');
            },
            managers: function(){
                Router.section = "managers";
                Router.mount('section-managers');
            }
        },

        nav: function(url){
            riot.route(url);
        },

        mount: function(tag){
            if (Router.start){
                $Loader.show().then(function(){
                    var section = riot.mount("section-content", tag)[0];
                    section.one("updated", function(){
                        $Loader.hide();
                    });
                });
            }
            else {
                app.$dom.body.addClass("appLoading");
                var section = riot.mount("section-content", tag)[0];
                section.one("updated", function(){
                    Router.start = true;
                    $afterlag.run(function(){
                        app.$dom.body
                        .removeClass("appLoading")
                        .addClass("isLoading");
                    }, {
                        timeout: 1000
                    });
                });
            }
            $Nav.update();
        }
    };

    var Router = app.router;

    $Router = app.router;

})(app, $$, app.$dom, app.events, app.utils);
