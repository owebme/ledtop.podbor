$store.control = _.extend(new Baobab([
    {
        article: "012985",
        photo: "http://ledtop-shop.ru/files/catalog/012985.jpg",
        price: "457",
        desc: "Здесь нужно предоставить на выбор цвета ленты из категории Norma. Выбранный артикул будет зависить от выбранного цвета."
    },
    {
        article: "015668",
        photo: "http://ledtop-shop.ru/files/catalog/015668.jpg",
        price: "553",
        desc: "Стандартный диммер с улучшенным пультом и держателем для него."
    },
    {
        article: "015669",
        photo: "http://ledtop-shop.ru/files/catalog/015669.jpg",
        price: "1213",
        desc: "Бюджетный вариант с сенсорным пультом."
    },
    {
        article: "021223",
        photo: "http://ledtop-shop.ru/files/catalog/021223.jpg",
        price: "2021",
        desc: "Сенсорный диммер с компактными размерами."
    },
    {
        article: "021626",
        photo: "http://ledtop-shop.ru/files/catalog/021626.jpg",
        price: "1521",
        desc: "Мощный сенсорный диммер."
    }
    ]),
    {
        getTitleById: function(id){
            return _.findWhere($store.data.get(), {"_id": id}).title;
        }
    }
);
