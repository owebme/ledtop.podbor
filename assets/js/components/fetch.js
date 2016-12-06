app.fetch.API = function(method){
    return app.fetch.API[method]();
};

app.fetch.API.getDataInit = function(){
    return new Promise(function(resolve, reject){
        app.request('getDataInit').then(function(res){

            // if (!_.isEmpty(res.data) && !_.isEmpty(res.products)){
            //     _.each(res.products, function(item){
            //         var result = _.findWhere(res.data, {'article': item.article});
            //         if (result) result.selected = true;
            //     });
            // }

            //console.dir(res);

            $store.data.set(res.data ? res.data : []);
            $store.products.set(res.products ? res.products : []);
            $store.packages.set(res.packages ? res.packages : []);

            resolve(res);
        });
    });
};
