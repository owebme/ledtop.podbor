$store.products = _.extend(new Baobab([]),
    {
        getItemByArt: function(art){
            return _.findWhere($store.products.get(), {"p_art": art});
        }
    }
);
