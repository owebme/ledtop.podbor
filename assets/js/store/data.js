$store.data = _.extend(new Baobab([]),
    {
        getItemByArticle: function(art){
            return _.findWhere($store.data.get(), {"article": art});
        }
    }
);
