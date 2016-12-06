$store.data = _.extend(new Baobab([
    {
        _id: "ledribbon",
        title: "Лента",
        product: null,
        products: null
    },
    {
        _id: "power",
        title: "Блок питания",
        product: null,
        products: null
    },
    {
        _id: "control",
        title: "Управление",
        product: null,
        products: null
    }
    ], {
        autoCommit: true
    }),
    {
        setProduct: function(item){
            $store.data.select({"_id": item.type}, "product").set(item);
        },
        setProducts: function(items){
            _.each(items, function(article, type){
                $store.data.select({"_id": type}, "product").set(
                    $store.products.getItemByArticle(article)
                );
            });
        },
        setProductsAll: function(items){
            _.each(items, function(items, type){
                $store.data.select({"_id": type}, "products").set(items);
            });
        },
        getProductCursor: function(type){
            return $store.data.select({"_id": type});
        },
        getProduct: function(type){
            return $store.data.get({"_id": type}, "product");
        },
        getProducts: function(type){
            return $store.data.get({"_id": type}, "products");
        },
        getProductsByGroup: function(type, group){
            return _.where($store.data.get({"_id": type}, "products"), {"group": group});
        },
        getProductsCount: function(type){
            var count = $store.data.get({"_id": type}, "products");
            return count ? count.length : 0;
        }
    }
);
