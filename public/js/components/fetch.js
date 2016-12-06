app.fetch.API = function(method){
    return app.fetch.API[method]();
};

app.fetch.API.getDataInit = function(){
    return new Promise(function(resolve, reject){
        app.request('getDataInit').then(function(res){

            $store.products.set(res.products ? res.products : []);
            $store.packages.set(res.packages ? res.packages : []);

            resolve(res);
        });
    });
};
