$store.light = _.extend(new Baobab([
    {
        _id: "1",
        title: "Монохромная"
    },
    {
        _id: "2",
        title: "Мультицветная"
    },
    {
        _id: "3",
        title: "Бегущий огонь"
    }
    ]),
    {
        getTitleById: function(id){
            return _.findWhere($store.light.get(), {"_id": id}).title;
        }
    }
);
