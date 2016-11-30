$store.data = _.extend(new Baobab([]),
    {
        getItemByArt: function(art){
            return _.findWhere($store.data.get(), {"p_art": art});
        }
    }
);
