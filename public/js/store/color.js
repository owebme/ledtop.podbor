$store.color = _.extend(new Baobab([]),
    {
        setStore: function(){
            var colors = [];
                related = _.compact(_.flatten(_.pluck($store.data.getProducts("ledribbon"), "related")));

            _.each(related, function(item){
                if (!_.findWhere(colors, {"color": item.color})){
                    colors.push(item);
                }
            });
            _.each($store.data.getProducts("ledribbon"), function(item){
                if (!_.findWhere(colors, {"color": item.color})){
                    colors.push({
                        article: item.article,
                        color: item.color
                    });
                }
            });
            $store.color.set(colors);
        }
    }
);
