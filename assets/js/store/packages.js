$store.packages = _.extend(new Baobab([]),
    {
        getItemsByParams: function(options, items){
            return _.filter(items ? items : $store.packages.get(), function(item){
                return item.light == options.light && item.length == String(options.length) && item.group == options.group;
            });
        },
        getItemById: function(id){
            return $store.packages.select({ "_id": id }).get();
        }
    }
);
