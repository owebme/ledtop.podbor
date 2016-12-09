var app=app||{};app.define=function(t){var e,n=t.split("."),i=app;for("app"==n[0]&&(n=n.slice(1)),e=0;e<n.length;e++)"undefined"==typeof i[n[e]]&&(i[n[e]]={}),i=i[n[e]];return i},app.tag=function(t){if(window.riot)return _.filter(riot.vdom,function(e){if(e.root.nodeName.toLowerCase()==t)return e})[0]},window.Store=window.store||{},window.$store={},function(t){app.define("config"),app.define("effects"),app.define("sizes"),app.define("utils"),app.define("plugins"),app.define("device"),app.define("events"),app.define("loader"),app.define("$dom"),app.$dom={html:t("html"),body:t("body"),document:t(document),window:t(window),root:t("#app")},app.events={click:document&&"ontouchstart"in document.documentElement?"tap":"click"},app.keys={LEFT:37,UP:38,RIGHT:39,DOWN:40,DEL:8,TAB:9,RETURN:13,ENTER:13,ESC:27,PAGEUP:33,PAGEDOWN:34,SPACE:32},window.KEY=app.keys,app.prefixed={transform:Modernizr.prefixed("transform"),"transform-origin":Modernizr.prefixed("transformOrigin")},$$=window.jQuery,window.moment&&moment.locale("ru"),t.fn.api=function(t){return this.data(t)?this.data(t):this.data(t,{}).data(t)}}($),window.$afterlag={run:function(t,e){var n={delay:0,iterations:1};e&&_.extend(n,e);var i=new Afterlag(n);i.run(t)},xs:function(t,e){var n={iterations:2,timeout:200};e&&_.extend(n,e),$afterlag.run(t,n)},s:function(t,e){var n={iterations:3,timeout:300};e&&_.extend(n,e),$afterlag.run(t,n)},m:function(t,e){var n={iterations:5,timeout:500};e&&_.extend(n,e),$afterlag.run(t,n)},l:function(t,e){var n={iterations:7,timeout:700};e&&_.extend(n,e),$afterlag.run(t,n)},xl:function(t,e){var n={iterations:10,timeout:1e3};e&&_.extend(n,e),$afterlag.run(t,n)}},function(t,e,n,i,o){t.define("compatible"),t.compatible={init:function(t,e){i.isPhone?i.isAndroid&&(!i.verOS||i.verOS&&i.verOS<4.4)?this.render("android"):i.isIOS&&(!i.verOS||i.verOS&&i.verOS<7)?this.render("ios"):i.isAndroid||i.isIOS?t.call(this,e):this.render("unknown"):t.call(this,e)},render:function(t){var e;"android"==t?e="Версия вашего Android должна быть не ниже 4.4":"ios"==t?e="Версия вашей iOS должна быть не ниже 7.0":"unknown"==t&&(e="К сожалению ваше устройство не поддерживается. Android не ниже 4.4 или iOS 7.0"),n.body.append('<div class="incompatible-device"><div class="incompatible-device-wrapper"><svg class="incompatible-device-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 125" enable-background="new 0 0 100 100" xml:space="preserve"><path fill="#fff" d="M94.553,36.928c2.689-2.691,2.689-7.07,0-9.761L70.861,3.475c-1.303-1.304-3.036-2.021-4.879-2.021  c-1.844,0-3.577,0.718-4.881,2.022L4.256,60.321c-2.689,2.69-2.689,7.069,0,9.761l23.691,23.689  c0.152,0.152,0.312,0.295,0.475,0.432H14.688c-1.327,0-2.403,1.075-2.403,2.401c0,1.327,1.076,2.403,2.403,2.403h47.691  c1.326,0,2.401-1.076,2.401-2.403c0-1.326-1.075-2.401-2.401-2.401H37.234c0.162-0.137,0.322-0.278,0.473-0.431L94.553,36.928z   M42.95,81.643L16.387,55.078c-0.016-0.016-0.035-0.025-0.051-0.041l41.975-41.974c0.016,0.016,0.026,0.035,0.042,0.051  l26.562,26.563c0.016,0.016,0.035,0.026,0.051,0.042L42.991,81.693C42.976,81.678,42.966,81.658,42.95,81.643z M65.982,6.259  c0.559,0,1.087,0.219,1.482,0.614l23.69,23.692c0.816,0.817,0.816,2.148,0,2.966l-2.802,2.801c-0.016-0.017-0.026-0.036-0.043-0.052  L61.75,9.717c-0.017-0.016-0.035-0.026-0.051-0.042L64.5,6.873C64.896,6.477,65.422,6.259,65.982,6.259z M7.655,66.684  c-0.817-0.817-0.817-2.147,0-2.965l5.293-5.295c0.015,0.018,0.026,0.036,0.042,0.053L39.552,85.04  c0.016,0.017,0.035,0.026,0.052,0.041l-5.294,5.294c-0.792,0.794-2.171,0.791-2.964-0.001L7.655,66.684z"/><path fill="#fff" d="M82.905,28.24c0.344,0.345,0.905,0.345,1.249,0.001c0.344-0.345,0.342-0.905,0-1.248l-7.246-7.246  c-0.346-0.344-0.902-0.345-1.248,0c-0.344,0.344-0.344,0.903,0,1.249L82.905,28.24z"/><circle cx="72.533" cy="16.621" r="0.842"/><circle fill="#fff" cx="22.921" cy="75.107" r="2.759"/></svg><p class="incompatible-device-text">'+e+"</p></div></div>")}}}(app,$$,app.$dom,app.device,app.utils),function(t){t.history=[],t.resources=function(e,n,i){n=n||$.noop,i=i||$.noop;for(var o=[],r=0;r<e.length;r++)t.history.indexOf(e[r])<0&&o.push(e[r]);return o.length?void Modernizr.load({load:o,callback:function(e){t.history.push(e),i()},complete:n}):n()},t.images=function(t,e,n){var i=0;e=e||$.noop,n=n||$.noop,t.imagesLoaded({background:".bg-cover"}).always(e).progress(function(t){i++,n(i,t.images.length)})}}(app.loader),function(t,e){var n=function(){t.width=e.window.width(),t.height=parseInt(window.innerHeight,10)};e.window.on("resize.app",n),n()}(app.sizes,app.$dom),function(t,e){t.support=Modernizr,t.isMobile=t.support.touch,e.html.addClass(t.isMobile?"d-mobile":"d-no-mobile"),t.isRetina=window.devicePixelRatio&&window.devicePixelRatio>1,e.html.addClass(t.isRetina?"d-retina":"d-no-retina");var n=function(){var n=e.window.width();t.isPhone=n<768,t.isTablet=n<1025&&n>767,t.orientation=t.isTablet&&n<1025&&n>991||t.isPhone&&n>480?"landscape":"portrait",e.html.addClass(t.isPhone?"d-phone":"d-no-phone").removeClass(t.isPhone?"d-no-phone":"d-phone").addClass(t.isTablet?"d-tablet":"d-no-tablet").removeClass(t.isTablet?"d-no-tablet":"d-tablet").addClass("landscape"===t.orientation?"r-landscape":"r-portrait").removeClass("landscape"!==t.orientation?"r-landscape":"r-portrait")};if(e.window.on("resize.sizeCheck",n),n(),navigator.userAgent.match(/(iPhone)/i)&&(t.isPhone=!0),navigator.userAgent.match(/iPad/i)&&(e.html.addClass("d-ipad"),t.isIPad=!0),navigator.userAgent.match(/(iPhone|iPod touch)/i)&&(e.html.addClass("d-iphone"),t.isIPhone=!0),navigator.userAgent.match(/(iPad|iPhone|iPod touch)/i)){e.html.addClass("d-ios"),t.isIOS=!0;var i=navigator.userAgent.match(/.*CPU.*OS (\d)_(\d)/i);t.verOS=!(!i||!i[1])&&i[1]+(i[2]?"."+i[2]:"")}else e.html.addClass("d-no-ios");if(navigator.userAgent.match(/.*CPU.*OS 7_\d/i)&&(e.html.addClass("d-ios7"),t.isIOS7=!0),navigator.userAgent.match(/Android/i)){e.html.addClass("d-android"),t.isAndroid=!0;var i=navigator.userAgent.match(/Android (\d)\.(\d)/i);t.verOS=!(!i||!i[1])&&i[1]+(i[2]?"."+i[2]:"")}if(e.html.hasClass("d-ipad d-ios7")&&e.window.on("resize orientationchange focusout",function(){window.scrollTo(0,0)}),t.isWin=navigator.platform.indexOf("Win")>-1,t.isMac=navigator.platform.indexOf("Mac")>-1,t.isLinux=navigator.platform.indexOf("Linux")>-1,e.html.addClass(t.isMac?"d-macOS":"d-no-macOS"),t.isSafari=/constructor/i.test(window.HTMLElement),e.html.addClass(t.isSafari?"d-safari":"d-no-safari"),t.isFirefox=navigator.userAgent.toLowerCase().indexOf("firefox")>-1,e.html.addClass(t.isFirefox?"d-firefox":"d-no-firefox"),t.isMobile&&window.FastClick&&"addEventListener"in document&&document.addEventListener("DOMContentLoaded",function(){FastClick.attach(document.body)},!1),!t.isMobile){var o,r=e.body[0];e.window[0].addEventListener("scroll",function(){clearTimeout(o),r.getAttribute("class")&&r.getAttribute("class").match(/disable__hover/)||r.classList.add("disable__hover"),o=setTimeout(function(){r.classList.remove("disable__hover")},300)},!1)}}(app.device,app.$dom),function(t,e){t.light={},t.light.show=function(t,n,i,o){t[0].style.opacity=1,t[0].style[e.transform]="translateY("+Math.round(i-n*i)+"px) translateZ(0)",0==n&&(t[0].style[e.transform]="translateY(110%)")},t.light.hide=function(t,n,i,o){t[0].style.opacity=(1-.4*n).toFixed(3),t[0].style[e.transform]="translateY("+Math.round(-(o-1)*i-n*i*.5)+"px) translateZ(0)",1==n&&(t[0].style[e.transform]="translateY(-110%)"),0==n&&(t[0].style[e.transform]="translateY("+Math.round(-(o-1)*i)+"px) translateZ(0)")},t.light.move=function(t,n,i){t[0].style.opacity=1,t[0].style[e.transform]="translateY("+Math.round(-n*i)+"px) translateZ(0)"},t.space={},t.space.show=function(t,n){t[0].style.opacity=.33+.67*n;var i="";0==n?i="translate3d(110%, 0, 0)":app.device.isPhone?i="perspective(500px) translate3d("+(-8+8*n)+"%, 0, 0) rotateY("+(-6+6*n)+"deg) scale("+(.8+.2*n)+")":(i="perspective(500px) translate3d("+(-4+4*n)+"%, 0, 0) scale("+(.9+.1*n)+")",app.device.isFirefox||(i=i+"rotateY("+(-4+4*n)+"deg)")),t[0].style[e.transform]=i},t.space.hide=function(t,n){t[0].style.opacity=1,t[0].style[e.transform]="translate3d("+-100*n+"%, 0, 0)",1==n&&(t[0].style[e.transform]="translate3d(-110%, 0, 0)")},t.fold={},t.fold.show=function(t,n){t[0].style.opacity=1,t[0].style[e.transform]="translateY("+(100-100*n)+"%)"},t.fold.hide=function(t,n){t[0].style.opacity=1-.67*n,t[0].style[e.transform]="perspective(500px) translateY("+4*n+"%) rotateX("+3*-n+"deg) scale("+(1-.05*n)+")",1==n&&(t[0].style[e.transform]="translateY(-101%)")}}(app.effects,app.prefixed),function(t,e){e.init=function(n){if(n){var i,o=n.split("."),r=t;for(i=0;i<o.length;i++)r=r[o[i]];r&&"function"==typeof r.init?(r.init(),e.log("Initialize: <"+n+"> ready")):e.log("ERROR: <"+n+"> initialize")}},e.is=function(n,i){if(n){var o,r=n.split("."),a=t;for(o=0;o<r.length;o++)a=a[r[o]];a?i&&"function"==typeof i&&i():e.log("NOT found: <"+n+">")}},e.log=function(t){t&&("object"==typeof t?console.dir(t):console.log(t))},e.logger=function(t,n){t&&n&&("init"===t?e.log("Initialize: <"+n+"> ready"):"open"===t?e.log("OPEN: <"+n+">"):"close"===t?e.log("CLOSE: <"+n+">"):e.log(t+": <"+n+">"))},e.random=function(t,e){return Math.floor(Math.random()*(e-t+1)+t)},e.template=function(n,i,o){if(!t.templates[n])return void e.log("NOT found: <"+n+"> template");var r=Mustache.render(t.templates[n](),i?i:{}),a=$(r).appendTo(o?o:t.$dom.root);return a},e.copyArray=function(t){var n=null===t?null:e.isObject(t)?{}:[];for(var i in t)"object"==typeof t[i]&&"prototype"!==i?n[i]=e.copyArray(t[i]):n[i]=t[i];return n},e.sortArray=function(t,e,n){var i=_.sortBy(t,function(t){return t[e]});return"desc"===n?i.reverse():i},e.isArray=function(t){if(t&&"[object Array]"===Object.prototype.toString.call(t))return!0},e.isFunction=function(t){if(t&&"function"==typeof t)return!0},e.fixTouchScroll=function(e,n){var i=null,o=null;e.on("touchmove MSPointerMove",function(e){if(0===o){var n=e.changedTouches[0].clientY;n<i?(i=0,e.preventDefault()):t.device&&t.device.isIOS?setTimeout(function(){i=n},1e3):i=n}}),n.on("scroll",function(){o=this.scrollTop})},e.raf=function(t){var e=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame;return e?e(t):window.setTimeout(t,1e3/60)},e.caf=function(t){var e=window.cancelAnimationFrame||window.webkitCancelRequestAnimationFrame||window.mozCancelRequestAnimationFrame||window.oCancelRequestAnimationFrame||window.msCancelRequestAnimationFrame||clearTimeout;e(t),t=null},e.support={transitions:Modernizr.csstransitions},e.transEndEventNames={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd",msTransition:"MSTransitionEnd",transition:"transitionend"},e.transEndEventName=e.transEndEventNames[Modernizr.prefixed("transition")],e.animEndEventNames={WebkitAnimation:"webkitAnimationEnd",MozAnimation:"animationend",OAnimation:"oAnimationEnd",msAnimation:"MSAnimationEnd",animation:"animationend"},e.animEndEventName=e.animEndEventNames[Modernizr.prefixed("animation")],e.onEndTransition=function(t,n){var i=function(t){if(e.support.transitions){if(t.target!=this)return;this.removeEventListener(e.transEndEventName,i)}n&&"function"==typeof n&&n.call(this)};e.support.transitions?t.addEventListener(e.transEndEventName,i):i()},e.onEndAnimation=function(t,n){var i=function(t){if(e.support.transitions){if(t.target!=this)return;this.removeEventListener(e.animEndEventName,i)}n&&"function"==typeof n&&n.call(this)};e.support.transitions?t.addEventListener(e.animEndEventName,i):i()},e.onLoadImage=function(t,e){function n(){r||(r=!0,e(!0))}function i(){e(!1)}var o=new Image,r=!1;o.src=t,o.onerror=i,o.onload=n,o.complete&&n()},e.getSizeImage=function(t,e){function n(){r||(r=!0,e(o.naturalWidth,o.naturalHeight))}function i(){e(!1)}var o=new Image,r=!1;o.src=t,o.onerror=i,o.onload=n,o.complete&&n()},e.getScroll=function(t){var e=t.x*-1,n=t.y*-1,i=t.maxScrollX*-1,o=t.maxScrollY*-1;return{x:e,y:n,maxX:i,maxY:o}},e.throttle=function(t,e){var n=!0;return function(i){n&&(n=!1,setTimeout(function(){n=!0},e),t(i))}},e.debounce=function(t,e,n,i){3==arguments.length&&"boolean"!=typeof n&&(i=n,n=!1);var o;return function(){var r=arguments;i=i||this,n&&!o&&t.apply(i,r),clearTimeout(o),o=setTimeout(function(){!n&&t.apply(i,r),o=null},e)}},e.indexOf=function(t,e,n){for(var i=n||0,o=(t||[]).length;i<o;i++)if(t[i]==e)return i;return-1},e.inArray=function(t,n){return e.indexOf(t,n)!=-1},e.trim=function(t){return(t||"").replace(/^\s+|\s+$/g,"")},e.underscored=function(t){return e.trim(t).replace(/([a-z\d])([A-Z]+)/g,"$1_$2").replace(/[-\s]+/g,"_").toLowerCase()},e.numberFormat=function(t,e,n,i){if(isNaN(t)||null==t)return"";t=parseInt(t).toFixed(~~e),i="string"==typeof i?i:",";var o=t.split("."),r=o[0],a=o[1]?(n||".")+o[1]:"";return r.replace(/(\d)(?=(?:\d{3})+$)/g,"$1"+i)+a},e.clean=function(t,n){return t=_.escape(e.trim(t)),t?t:n?n:null},e.isObject=function(t){return"[object Object]"===Object.prototype.toString.call(t)},e.isEmail=function(t){return t.match(/.+@.+\..+/i)},e.newId=function(){return String(Math.round((new Date).getTime()/1e3))},e.getDateNow=function(){var t=new Date,e=t.getHours(),n=t.getMinutes(),i=t.getSeconds(),o=t.getMonth()+1,r=t.getDate(),a=t.getFullYear();return e<10&&(e="0"+e),n<10&&(n="0"+n),i<10&&(i="0"+i),o<10&&(o="0"+o),r<10&&(r="0"+r),a+"-"+o+"-"+r+" "+e+":"+n+":"+i},e.bbUpdate=function(t,e){t.on("update",function(t){var n=t.data&&t.data.transaction&&t.data.transaction.length&&t.data.transaction[0].path?t.data.transaction[0].path[0]:null,i=t.data&&t.data.transaction&&t.data.transaction.length?t.data.transaction[0].value:null;e(n,i,t)})},window._?_.extend(_,e):window._=e,t.utils=window._}(app,app.utils),function(){app.url=function(){return app.config.domain+app.config.api},app.fetch=function(t){var e=[],n=[],o=t.split(", ");return new Promise(function(t,r){for(i=0;i<o.length;i++)_.isFunction(app.fetch.API[o[i]])&&e.push(o[i]);o.length!==e.length&&(n=_.difference(o,e)),Promise.all(e.map(app.fetch.API).concat(n.map(app.request))).then(function(e){t(e)})})},app.request=function(t,e){return new Promise(function(n,i){var o=_.underscored(t).replace(/^(get|set|add|del)/g,"").replace(/_/g,"/"),r=null;if(t.match(/^get/)?r="GET":t.match(/^set/)?r="PUT":t.match(/^add/)?r="POST":t.match(/^del/)&&(r="DELETE"),!r)return void i("Error type request: "+t);"GET"===r&&e&&(o+="/"+e,e=null),window.$LoaderAjax&&$LoaderAjax.show();var a=new XMLHttpRequest;a.open(r,app.url()+o,!0),a.setRequestHeader("Accept","application/json"),a.setRequestHeader("Content-Type","application/json");try{app.request.list&&app.request.list.method===t&&app.request.list.params==JSON.stringify(e)&&app.request.list.xhr.abort(),a.send(e?JSON.stringify(e):{})}catch(t){}a.onload=function(t){try{if(200==this.status){var e=JSON.parse(this.response);n("OK"===e.status&&e.result?e.result:e)}else{app.errHandler(this.status);var o=new Error(this.statusText);o.code=this.status,i(o)}}catch(t){}app.request.list={},window.$LoaderAjax&&$LoaderAjax.hide()},a.onerror=function(){i(new Error("Network Error")),window.$LoaderAjax&&$LoaderAjax.hide()};try{app.request.list={method:t,xhr:a,params:JSON.stringify(e)}}catch(t){}})},app.errHandler=function(t){401==t?window.$Notify?$Notify.show({color:"info",text:"Авторизируйтесь снова"}):alert("Авторизируйтесь снова"):window.$Notify?$Notify.show({color:"danger",text:"Ошибка проведения операции повторите ее чуть позже"}):alert("Ошибка проведения операции повторите ее чуть позже")},window.onerror=function(t,e,n){app&&app.config&&app.config.logger&&app.config.logger.report&&app.request(app.config.logger.method,{msg:t,line:n,url:e,date:_.getDateNow(),version:null,platform:null,type:"error"})}}(),app.fetch.API=function(t){return app.fetch.API[t]()},app.fetch.API.getDataInit=function(){return new Promise(function(t,e){app.request("getDataInit").then(function(e){$store.products.set(e.products?e.products:[]),$store.packages.set(e.packages?e.packages:[]),t(e)})})},app.config={domain:"http://192.168.1.64:3000",api:"/public/api",logger:{method:"addLog",report:!1},changeStyles:!0},function(t){t.define("plugins.tutorial.podbor"),t.plugins.tutorial.podbor=[function(){return{figure:"square",target:"section-packages-select",position:"down",padding:20,title:"Выбор готовых наборов",text:"Вы можете выбрать готовые наборы компонентов. Все наборы прошли тщательный отбор и сохраняют отличный баланс между ценой и предложением."}},function(){return{figure:"square",target:"product-item[data-product='ledribbon']",position:"right",padding:10,title:"Светодиодная лента",text:'Мы вам предлагаем пройти обзор по интерфейсу. Это займет не более одной минуты. Перед вами один из трех и основной компонент набора, светодиодная лента. Фото, описание, класс и указание цены за метр. Чтобы перейти на следующий шаг нажмите "Далее".'}},function(){return{figure:"circle",target:"product-item[data-product='ledribbon'] .product__select",position:"right",padding:20,title:"Открыть предложения",text:"Открываем предложения светодиодных лент. Мы подготовили для вас несколько вариантов для каждого из компонентов. Сейчас ваши действия не активны, но после прохождения обзора вы сможете все выбрать."}},function(){return{figure:"square",target:"product-item[data-product='power']",position:"left",padding:30,actions:{toggle:function(t){$Product.ledribbon.tags["products-list"].toggle()}},title:"Предложения",text:'Предложения поделены на группы: "LUX", "Норма" и "Эконом". Вы можете выбрать любое предложение ориентируясь на свой бюджет. На самом деле вариантов гораздо больше, вы сможете настроить требуемые параметры и предложения сразу адаптируются под ваши требования.'}},function(){return{figure:"circle",target:"product-item[data-product='power'] .connect__control",position:"left",padding:30,activeZone:!0,title:"Управление освещением",text:"Если вам не требуется управлять своим будущим освещением, просто нажмите на эту кнопку."}},function(){return{figure:"square",target:"control-light",position:"right",width:380,height:170,offset:{top:-67},actions:{toggle:function(t){$Control.light.toggle()}},title:"Тип освещенности",text:'Варианты освещенности вашей подстветки, это: "монохромная", "мультицветная" или "бегущий огонь".'}},function(){return{figure:"square",target:"control-length",position:"right",width:400,height:170,offset:{top:-67},actions:{toggle:function(t){$Control.length.toggle()}},title:"Длина ленты",text:"Один из наиболее важных параметров. Измерьте требуемую длину для светодиодной ленты. Изменив, длину вы получите новые предложения по всем компонентам, максимально отвечающим вашим новым требованиям."}},function(){return{figure:"square",target:"control-color",position:"right",width:620,height:170,offset:{top:-67},actions:{toggle:function(t){$Control.color.toggle()}},title:"Цвет освещения",text:"Вы можете выбрать нужный вам цвет вашего освещения."}},function(){return{figure:"square",target:"control-humidity",position:"right",width:380,height:170,offset:{top:-67},actions:{toggle:function(t){$Control.humidity.toggle()}},title:"Влагозащищенность",text:"Выбор влагозащищенности ваших компонентов от брызгов воды или попадания под струю воды."}},function(){return{figure:"square",target:".section__control .total",position:"right",padding:20,title:"Итоговая цена",text:"Итоговая цена за весь выбранный комплект."}},function(){return{figure:"circle",target:".control .button__ok",position:"right",padding:15,title:'Кнопка "Все ОК!"',text:"После того, как вы закончите свой выбор, нажмите на эту кнопку, чтобы отправить предзаказ и связаться с нашим менеджером для дальнейшей консультации.\n Приятного Вам освещения!"}},function(){return{figure:"circle",target:"section-menu .menu__item[data-item='email']",position:"left",title:"Отправить расчет",text:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}},function(){return{figure:"circle",target:"section-menu .menu__item[data-item='order']",position:"left",title:"Отправить предзаказ",text:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}},function(){return{figure:"circle",target:"section-menu .menu__item[data-item='payment']",position:"left",title:"Оплатить заказ",text:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}},function(){return{figure:"circle",target:"section-menu .menu__item[data-item='callback']",position:"left",title:"Заказать звонок",text:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}}]}(app),function(t,e,n,i,o){t.define("router"),t.router={base:"#",start:!1,init:function(){window.route&&(riot.route=window.route),riot.route("/",function(){o.isEmpty(r.params.get())?r.mount("begin"):r.mount("podbor")}),riot.route("podbor",function(){r.mount("podbor")}),riot.route("offerManager",function(){$Config.select("offers","manager").set(!0),r.mount("podbor")}),riot.route.base(this.base),riot.route.start(!0)},params:{get:function(){return Url.parseQuery()},set:function(t){Url.updateSearchParam(t)}},nav:function(t){riot.route(t)},mount:function(e){r.start||(t.compatible?t.compatible.init(r.render,e):r.render(e))},render:function(e){var i=n.body.find("#loader"),a=riot.mount(".screens","screens"+(t.device.isPhone?"-mobile":""))[0];a.one("updated",function(){$afterlag.run(function(){n.body.removeClass("appLoading"),o.onEndTransition(i[0],function(){i.remove()})},{iterations:"podbor"==e?7:2,timeout:"podbor"==e?2e3:500}),$afterlag.run(function(){$Screens[e].show()},{iterations:3,timeout:1e3}),r.start=!0})}};var r=t.router;$Router=t.router}(app,$$,app.$dom,app.events,app.utils),function(t,e,n,i,o){t.define("plugins.styles"),t.plugins.styles={ready:!1,init:function(n){r.ready||(this.el=e(n.elem),this.screen=n.default,this.screens=n.screens,this.callback=n.callback,r.resizer(t.$dom.window[0].innerWidth),t.$dom.window.on("resize.styles",function(){r.resizer(this.innerWidth).length&&r.callback&&r.callback(r.screen)}),r.ready=!0)},resizer:function(t){return o.filter(r.screens,function(e){if((e.minWidth&&e.maxWidth&&t>e.minWidth-1&&t<e.maxWidth+1||e.minWidth&&!e.maxWidth&&t>e.minWidth||e.maxWidth&&!e.minWidth&&t<e.maxWidth)&&r.screen!==e.title)return e.reload&&r.ready?window.location.reload():e.path&&r.el.attr("href",e.path),r.screen=e.title,console.log("resize: "+e.title),r.screen})}};var r=t.plugins.styles}(app,$,app.$dom,app.events,app.utils),function(t,e,n,i,o){t.define("plugins.animate"),t.plugins.animate=function(t,n){var i=this;this.groups=[],this.options=n,this.scope=e(t),this.scope.find("*").each(function(){var t=this.getAttribute("class");if(t&&t.match(/anim-group/)){var e=t.match(/anim-group(\d+)/)[1],n=t.match(/anim-delay-(\w+)/),r=o.findWhere(i.groups,{num:e}),a={elem:this,delay:n&&n.length&&n[1]?i.delay.getNumByTitle(n[1]):"0"};r?r.items.push(a):i.groups.push({num:e,items:[a]})}})},t.plugins.animate.prototype={show:function(t){var e=this;this.groups.length&&o.each(o.sortArray(this.groups,"num"),function(n,i){!function(){if(e.groups[i+1]){var r=null,a=null;e.options&&e.options.showAfter?(r=o.sortArray(n.items,"delay","asc"),a=r[e.options.showAfter-1].elem):(r=o.sortArray(n.items,"delay","desc"),a=r[0].elem),a&&o.onEndTransition(a,function(){e.scope.addClass("showAnim-group"+(1*n.num+1)),e.groups.length==1*n.num+1&&o.isFunction(t)&&t()})}}(n,i),0==i&&e.scope.addClass("showAnim-group"+n.num)})},hide:function(t){if(this.groups.length&&(this.scope.removeClass(o.map(o.pluck(this.groups,"num"),function(t){return"showAnim-group"+t}).join(" ")),o.isFunction(t))){var e=o.sortArray(this.groups[0].items,"delay","desc")[0].elem;o.onEndTransition(e,function(){t()})}},delay:{items:[{title:"xs",num:"1"},{title:"s",num:"2"},{title:"m",num:"3"},{title:"l",num:"4"},{title:"xl",num:"5"}],getNumByTitle:function(t){return o.findWhere(this.items,{title:t}).num}}}}(app,$,app.$dom,app.events,app.utils),$store.products=_.extend(new Baobab([]),{getItemsByParams:function(t,e){return _.filter(e?e:$store.products.get(),function(e){return e.light==t.light&&e.type==t.type&&e.length==String(t.length)&&e.group==t.group})},getItemsByParamsWithoutType:function(t,e){return _.filter(e?e:$store.products.get(),function(e){return e.light==t.light&&e.length==String(t.length)&&e.group==t.group})},getItemByArticle:function(t){return $store.products.select({article:t}).get()},getImageByArticle:function(t){return t?"http://ledtop-shop.ru/files/catalog/"+t+".jpg":null}}),$store.packages=_.extend(new Baobab([]),{getItemsByParams:function(t,e){return _.filter(e?e:$store.packages.get(),function(e){return e.light==t.light&&e.length==String(t.length)&&e.group==t.group})},getItemById:function(t){return $store.packages.select({_id:t}).get()}}),$store.light=_.extend(new Baobab([{_id:"1",title:"Монохромная"},{_id:"2",title:"Мультицветная"},{_id:"3",title:"Бегущий огонь"}]),{getTitleById:function(t){return _.findWhere($store.light.get(),{_id:t}).title}}),$store.type=_.extend(new Baobab([{_id:"ledribbon",title:"Лента"},{_id:"power",title:"Питание"},{_id:"control",title:"Управление"}]),{getTitleById:function(t){return _.findWhere($store.type.get(),{_id:t}).title}}),$store.group=_.extend(new Baobab([{_id:"econom",title:"Эконом"},{_id:"norm",title:"Норма"},{_id:"lux",title:"LUX"}]),{getTitleById:function(t){return _.findWhere($store.group.get(),{_id:t}).title}}),$store.data=_.extend(new Baobab([{_id:"ledribbon",title:"Лента",product:null,products:null},{_id:"power",title:"Блок питания",product:null,products:null},{_id:"control",title:"Управление",product:null,products:null}],{autoCommit:!0}),{setProduct:function(t){$store.data.select({_id:t.type},"product").set(t)},setProducts:function(t){_.each(t,function(t,e){$store.data.select({_id:e},"product").set($store.products.getItemByArticle(t))})},setProductsAll:function(t){_.each(t,function(t,e){$store.data.select({_id:e},"products").set(t)})},getProductCursor:function(t){return $store.data.select({_id:t})},getProduct:function(t){return $store.data.get({_id:t},"product")},getProducts:function(t){return $store.data.get({_id:t},"products")},getProductsByGroup:function(t,e){return _.where($store.data.get({_id:t},"products"),{group:e})},getProductsCount:function(t){var e=$store.data.get({_id:t},"products");return e?e.length:0}}),$store.humidity=_.extend(new Baobab([]),{setStore:function(){var t=[];_.each($store.data.getProducts("ledribbon"),function(e){e.hum&&!_.findWhere(t,{hum:e.hum})&&t.push({article:e.article,hum:e.hum})}),$store.humidity.set(t)}}),$store.color=_.extend(new Baobab([]),{setStore:function(){var t=[];related=_.compact(_.flatten(_.pluck($store.data.getProducts("ledribbon"),"related"))),_.each(related,function(e){_.findWhere(t,{color:e.color})||t.push(e)}),_.each($store.data.getProducts("ledribbon"),function(e){_.findWhere(t,{color:e.color})||t.push({article:e.article,color:e.color})}),$store.color.set(t)}});