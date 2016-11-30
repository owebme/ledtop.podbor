app.fetch.API = function(method){
    return app.fetch.API[method]();
};

app.fetch.API.getDataInit = function(){
    return new Promise(function(resolve, reject){
        app.request('getDataInit').then(function(res){

            if (!_.isEmpty(res.data) && !_.isEmpty(res.products)){
                _.each(res.products, function(item){
                    var result = _.findWhere(res.data, {'p_art': item._id});
                    if (result) result.disabled = true;
                });
            }

            $store.data.set(res.data ? res.data : []);
            $store.products.set(res.products ? res.products : []);

            resolve(res);
        });
    });
};
