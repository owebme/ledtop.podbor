$store.products = _.extend(new Baobab([]),
    {
        getItemsByParams: function(options, items){
            return _.filter(items ? items : $store.products.get(), function(item){
                return item.light == options.light && item.type == options.type && item.length == String(options.length) && item.group == options.group;
            });
        },
        getItemsByParamsWithoutType: function(options, items){
            return _.filter(items ? items : $store.products.get(), function(item){
                return item.light == options.light && item.length == String(options.length) && item.group == options.group;
            });
        },
        getItemByArticle: function(article){
            return $store.products.select({ "article": article }).get();
        },
        getImageByArticle: function(article){
            return article ? 'http://ledtop-shop.ru/files/catalog/' + article + '.jpg' : null;
        }
    }
);
