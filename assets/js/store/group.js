$store.group = _.extend(new Baobab([
    {
        _id: "econom",
        title: "Эконом"
    },
    {
        _id: "norm",
        title: "Норма"
    },
    {
        _id: "lux",
        title: "LUX"
    }
    ]),
    {
        getTitleById: function(id){
            return _.findWhere($store.group.get(), {"_id": id}).title;
        }
    }
);
