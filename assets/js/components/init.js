(function(){

    app.$dom.window.on("load", function(){
        riot.compile(function(e){
            riot.mount("*");
        });
    });

    // if (app.device.isPhone && app.sizes.width < 360){
    //     document.getElementById("styles").setAttribute("href", "/assets/css/style.phone.css");
    // }

})();
