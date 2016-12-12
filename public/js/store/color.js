$store.color = _.extend(new Baobab([]),
    {
        mergeItems: function(items){
            var colors = [];
                related = _.compact(_.flatten(_.pluck(items, "related")));

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
            return colors;
        },
        setStore: function(){
            $store.color.set(
                $store.color.mergeItems($store.data.getProducts("ledribbon"))
            );
        }
    }
);
