(function(){

    app.url = function(){
        return app.config.domain + app.config.api;
    };

    app.fetch = function(methods){
        var listMain = [],
            listSecond = [],
            parts = methods.split(", ");

        return new Promise(function(resolve, reject){
            for (i = 0; i < parts.length; i++) {
                if (_.isFunction(app.fetch.API[parts[i]])) {
                    listMain.push(parts[i]);
                }
            }
            if (parts.length !== listMain.length){
                listSecond = _.difference(parts, listMain);
            }
            Promise.all(listMain.map(app.fetch.API).concat(listSecond.map(app.request)))
            .then(function(results) {
                resolve(results);
            })
        });
    };

    app.request = function(method, params){
        return new Promise(function(resolve, reject){
            var url = _.underscored(method)
                        .replace(/^(get|set|add|del)/g, "")
                        .replace(/_/g, "/"),
                type = null;

            if (method.match(/^get/)) type = 'GET';
            else if (method.match(/^set/)) type = 'PUT';
            else if (method.match(/^add/)) type = 'POST';
            else if (method.match(/^del/)) type = 'DELETE';

            if (!type) {
                reject('Error type request: ' + method);
                return;
            }
            if (type === "GET" && params){
                url += "/" + params;
                params = null;
            }
            if (window.$LoaderAjax){
                $LoaderAjax.show();
            }

            var xhr = new XMLHttpRequest();
            xhr.open(type, app.url() + url, true);
            xhr.setRequestHeader("Accept", "application/json");
            xhr.setRequestHeader("Content-Type", "application/json");

            try {
                if (app.request.list && app.request.list.method === method && app.request.list.params == JSON.stringify(params)) {
                    app.request.list.xhr.abort();
                }
                xhr.send(params ? JSON.stringify(params) : {});
            } catch(e){}

            xhr.onload = function(e) {
                try {
                    if (this.status == 200) {
                        var data = JSON.parse(this.response);
                        if (data.status === "OK" && data.result){
                            resolve(data.result);
                        }
                        else resolve(data);
                    }
                    else {
                        app.errHandler(this.status);
                        var error = new Error(this.statusText);
                        error.code = this.status;
                        reject(error);
                    }
                } catch(e){}

                app.request.list = {};

                if (window.$LoaderAjax){
                    $LoaderAjax.hide();
                }
            };

            xhr.onerror = function() {
                reject(new Error("Network Error"));

                if (window.$LoaderAjax){
                    $LoaderAjax.hide();
                }
            };

            try {
                app.request.list = {
                    method: method,
                    xhr: xhr,
                    params: JSON.stringify(params)
                };
            } catch(e){}
        });
    };

    app.errHandler = function(status){
        if (status == 401){
            if (window.$Notify){
                $Notify.show({
                    color: "info",
                    text: "Авторизируйтесь снова"
                })
            }
            else {
                alert("Авторизируйтесь снова");
            }
        }
        else {
            if (window.$Notify){
                $Notify.show({
                    color: "danger",
                    text: "Ошибка проведения операции повторите ее чуть позже"
                })
            }
            else {
                alert("Ошибка проведения операции повторите ее чуть позже");
            }
        }
    };

    window.onerror = function(msg, url, line) {
    	if (app && app.config && app.config.logger && app.config.logger.report){
    		app.request(app.config.logger.method, {
    			msg: msg,
    			line: line,
    			url: url,
    			date: _.getDateNow(),
    			version: null,
    			platform: null,
    			type: "error"
    		});
    	}
    };

})();
