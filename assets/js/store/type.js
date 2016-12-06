$store.type = _.extend(new Baobab([
    {
        _id: "ledribbon",
        title: "Лента"
    },
    {
        _id: "power",
        title: "Питание"
    },
    {
        _id: "control",
        title: "Управление"
    }
    ]),
    {
        getTitleById: function(id){
            return _.findWhere($store.type.get(), {"_id": id}).title;
        }
    }
);
