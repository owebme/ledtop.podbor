$store.packages = _.extend(new Baobab([]),
    {
        getTitleById: function(id){
            return _.findWhere($store.packages.get(), {"_id": id});
        }
    }
);
