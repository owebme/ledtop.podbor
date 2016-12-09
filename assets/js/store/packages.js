$store.packages = _.extend(new Baobab([]),
    {
        getItemsByParams: function(options, items){
            return _.filter(items ? items : $store.packages.get(), function(item){
                return item.light == options.light && item.length == String(options.length) && item.group == options.group && (_.isBoolean(options.active) ? options.active === item.active : true);
            });
        },
        getItemById: function(id, options){
            var params = { "_id": id };
            if (options) _.extend(params, options);

            return $store.packages.select(params).get();
        },
        getTitleById: function(id){
            return $store.packages.select({ "_id": id }).get("title");
        },
        getPrice: function(id, length){
            var pk = $store.packages.get({ "_id": id }),
                result = 0,
                products = {
                    ledribbon: $store.products.getItemByArticle(pk.ledribbon),
                    power: $store.products.getItemByArticle(pk.power),
                    control: $store.products.getItemByArticle(pk.control)
                };

            result += products.ledribbon ? products.ledribbon.price * length : 0;
            result += products.power ? products.power.price : 0;
            result += products.control ? products.control.price : 0;

            return result;
        }
    }
);
