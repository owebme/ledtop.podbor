$store.humidity = _.extend(new Baobab([]),
    {
        setStore: function(){
            var items = [];

            _.each($store.data.getProducts("ledribbon"), function(item){
                if (item.hum && !_.findWhere(items, {"hum": item.hum})){
                    items.push({
                        article: item.article,
                        hum: item.hum
                    });
                }
            });
            $store.humidity.set(items);
        }
    }
);
