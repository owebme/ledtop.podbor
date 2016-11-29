$store.power = _.extend(new Baobab([
    {
        article: "019122",
        photo: "http://ledtop-shop.ru/files/catalog/019122.jpg",
        price: "452",
        desc: "Блок питания для светодиодных лент, входное напряжение 100-264V АС, выходное напряжение 12V, мощность 36W, размеры 85x58x33 мм."
    },
    {
        article: "014980",
        photo: "http://ledtop-shop.ru/files/catalog/014980.jpg",
        price: "713",
        desc: "Блок питание марки Haitaik — отличается высокой надежностью. Рекомендуется использовать в ответственных местах."
    },
    {
        article: "018968",
        photo: "http://ledtop-shop.ru/files/catalog/018968.jpg",
        price: "638",
        desc: "Герметичный блок питания в пластиковом корпусе. Рекомендуется использовать в более запыленных и влажных условиях."
    },
    {
        article: "019372",
        photo: "http://ledtop-shop.ru/files/catalog/019372.jpg",
        price: "612",
        desc: "Сверхтонкий блок для узких мест."
    }
    ]),
    {
        getTitleById: function(id){
            return _.findWhere($store.data.get(), {"_id": id}).title;
        }
    }
);
