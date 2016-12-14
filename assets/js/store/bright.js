$store.bright = _.extend(new Baobab([
    {
        _id: "1",
        title: "Стандарт"
    },
    {
        _id: "2",
        title: "Яркая"
    },
    {
        _id: "3",
        title: "Супер яркая"
    }
    ]),
    {
        getTitleById: function(id){
            return _.findWhere($store.bright.get(), {"_id": id}).title;
        }
    }
);
