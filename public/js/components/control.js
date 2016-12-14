(function(app, $dom, _){

    app.define("control");

    var $ = null;

    app.control.init = function(tag){
        if (!tag) return;

        $ = tag;
        if (app.device.isPhone) $Control = $.tags["section-control-mobile"];
        else $Control = $.tags["section-control"];
        $Control.wrapper = $Control.tags["control-wrapper"];
        $Control.light = $Control.wrapper.tags["control-light"];
        $Control.bright = $Control.wrapper.tags["control-bright"];
        $Control.humidity = $Control.wrapper.tags["control-humidity"];
        $Control.color = $Control.wrapper.tags["control-color"];
        $Control.length = $Control.wrapper.tags["control-length"];

        $Control.refresh = {
            humidity: function(){
                $Options.set('hum', $Cursor.ledribbon.get("product", "hum"));
            },
            color: function(){
                $Options.set('color', $Cursor.ledribbon.get("product", "color"));
            }
        };

        $Product = {
            "ledribbon": $["ledribbon"]._tag,
            "power": $["power"]._tag,
            "control": $["control"]._tag
        };

        $Cursor = {
            ledribbon: $store.data.getProductCursor("ledribbon"),
            power: $store.data.getProductCursor("power"),
            control: $store.data.getProductCursor("control")
        };

        app.control.tag = tag;

        var tag = _.extend(tag, app.control);

        app.control.listen();

        return tag;
    };

    app.control.render = function(){

        var group = $State.get("group"),
            options = {
                "active": true,
                "light": $Options.get("light"),
                "length": $Options.get("length")
            };

        // get package with url
        var pkg = $Options.get("package") ?
            $store.packages.getItemById(
                $Options.get("package"), options
            ) : false;

        if (pkg){
            $State.select("group").set(pkg.group);
            $.set.productsAll(options);
            $.set.products({
                "ledribbon": pkg.ledribbon,
                "power": pkg.power,
                "control": pkg.control
            });
        }
        else {
            $.set.productsAll(options);
            options.group = group;

            // find first package with options
            pkg = _.sortArray(
                $store.packages.getItemsByParams(options)
            , "pos")[0];

            if (pkg){
                $State.select("group").set(pkg.group);
                $Options.select("package").set(pkg._id);
                $.set.products(pkg);
            }
            // other take the first of the list
            else {
                group = "norm";
                $Options.select("package").set();
                $.set.products({
                    "ledribbon": $Cursor.ledribbon.get("products", {"group": group}),
                    "power": $Cursor.power.get("products", {"group": group}),
                    "control": $Cursor.control.get("products", {"group": group})
                });
            }
        }

        $store.humidity.setStore();
        $Control.refresh.humidity();

        $store.color.setStore();
        $Control.refresh.color();

        $.set.totalPrice();

        $.update();
    };

    app.control.set = {
        params: function(){
            $Router.params.set($Options.get());
        },
        products: function(data){
            if (!data) return;

            $store.data.setProducts({
                "ledribbon": data.ledribbon && data.ledribbon.article ? data.ledribbon.article : data.ledribbon,
                "power": data.power && data.power.article ? data.power.article : data.power,
                "control": data.control && data.control.article ? data.control.article : data.control,
            });
        },
        productsAll: function(options){
            if (!options) return;

            $store.data.setProductsAll({
                "ledribbon": _.sortArray($store.products.getItemsByParamsWithoutGroup(
                    _.extend(options, {"type": "ledribbon"})
                ), "pos"),
                "power": _.sortArray($store.products.getItemsByParamsWithoutGroup(
                    _.extend(options, {"type": "power"})
                ), "pos"),
                "control": _.sortArray($store.products.getItemsByParamsWithoutGroup(
                    _.extend(options, {"type": "control"})
                ), "pos")
            });
        },
        totalPrice: function(){
            if (app.device.isPhone){
                $.sections.resultCount.update();
            }
            else {
                var result = 0,
                    products = {
                        ledribbon: $Cursor.ledribbon.get("product", "price"),
                        power: $Cursor.power.get("product", "price"),
                        control: $Options.get("controlled") ? $Cursor.control.get("product", "price") : null
                    };

                result += products.ledribbon ? products.ledribbon * $Options.get("length") : 0;
                result += products.power ? products.power : 0;
                result += products.control ? products.control : 0;

                $.sections.totalPrice.refresh(result);
                $Menu.totalPrice.refresh(result);
            }
        }
    };

    app.control.listen = function(){

        $.on("mode", function(mode, active){
            $.root.setAttribute("data-" + mode, active);
        });

        var setParams = _.debounce($.set.params, 300),
            reRender = _.debounce($.render, 300);

        $Options.on("write", function(e){
            var prop = e.data.path[0];

            if (prop == "controlled"){
                $Product["control"].update();
            }
            else if (prop == "light" || prop == "length"){
                reRender();
            }
            else if (prop == "hum"){
                $Control.humidity.update();
            }
            else if (prop == "color"){
                $Control.color.update();
            }
            if ($.active){
                setParams();
                if (prop != "length") $.set.totalPrice();
            }
        });

        _.bbUpdate($store.data, function(prop, value, e){
            if ($.active){
                if (value){
                    if (value.type == "ledribbon"){
                        $Product["ledribbon"].update();
                    }
                    else if (value.type == "power"){
                        $Product["power"].update();
                    }
                    else if (value.type == "control"){
                        $Product["control"].update();
                    }
                }
                $.set.totalPrice();
            }
        });
    };

})(app, app.$dom, app.utils);
