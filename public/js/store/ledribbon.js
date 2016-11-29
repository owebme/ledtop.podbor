$store.ledribbon = _.extend(new Baobab([
    {
        article: "014383",
        photo: "http://ledtop-shop.ru/files/catalog/014383.jpg",
        price: "168",
        desc: "Отлично подойдет как декоративная подсветка внутри помещений, офисов и квартир."
    },
    {
        article: "014380",
        photo: "http://ledtop-shop.ru/files/catalog/014380.jpg",
        price: "168",
        desc: "Здесь нужно предоставить на выбор цвета ленты из категории Norma. Выбранный артикул будет зависить от выбранного цвета."
    }
    ]),
    {
        getTitleById: function(id){
            return _.findWhere($store.data.get(), {"_id": id}).title;
        }
    }
);
