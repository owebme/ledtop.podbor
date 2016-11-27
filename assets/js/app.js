var app=app||{};app.define=function(t){var e,n=t.split("."),o=app;for("app"==n[0]&&(n=n.slice(1)),e=0;e<n.length;e++)"undefined"==typeof o[n[e]]&&(o[n[e]]={}),o=o[n[e]];return o},app.tag=function(t){if(window.riot)return _.filter(riot.vdom,function(e){if(e.root.nodeName.toLowerCase()==t)return e})[0]},window.Store=window.store||{},window.$store={},window.$afterlag={run:function(t,e){var n={delay:0,iterations:1};e&&_.extend(n,e);var o=new Afterlag(n);o.run(t)}},function(t){app.define("config"),app.define("effects"),app.define("sizes"),app.define("utils"),app.define("plugins"),app.define("device"),app.define("events"),app.define("loader"),app.define("$dom"),app.$dom={html:t("html"),body:t("body"),document:t(document),window:t(window),root:t("#app")},app.events={click:document&&"ontouchstart"in document.documentElement?"tap":"click"},app.keys={LEFT:37,UP:38,RIGHT:39,DOWN:40,DEL:8,TAB:9,RETURN:13,ENTER:13,ESC:27,PAGEUP:33,PAGEDOWN:34,SPACE:32},window.KEY=app.keys,app.prefixed={transform:Modernizr.prefixed("transform"),"transform-origin":Modernizr.prefixed("transformOrigin")},$$=window.jQuery,window.moment&&moment.locale("ru"),t.fn.api=function(t){return this.data(t)?this.data(t):this.data(t,{}).data(t)}}($),app.config={logger:{report:!1},changeStyles:!0},function(t){t.history=[],t.resources=function(e,n,o){n=n||$.noop,o=o||$.noop;for(var i=[],r=0;r<e.length;r++)t.history.indexOf(e[r])<0&&i.push(e[r]);return i.length?void Modernizr.load({load:i,callback:function(e){t.history.push(e),o()},complete:n}):n()},t.images=function(t,e,n){var o=0;e=e||$.noop,n=n||$.noop,t.imagesLoaded({background:".bg-cover"}).always(e).progress(function(t){o++,n(o,t.images.length)})}}(app.loader),function(t,e){var n=function(){t.width=e.window.width(),t.height=parseInt(window.innerHeight,10)};e.window.on("resize.app",n),n()}(app.sizes,app.$dom),function(t,e){t.support=Modernizr,t.isMobile=t.support.touch,e.html.addClass(t.isMobile?"d-mobile":"d-no-mobile"),t.isRetina=window.devicePixelRatio&&window.devicePixelRatio>1,e.html.addClass(t.isRetina?"d-retina":"d-no-retina");var n=function(){var n=e.window.width();t.isPhone=n<768,t.isTablet=n<1025&&n>767,t.orientation=t.isTablet&&n<1025&&n>991||t.isPhone&&n>480?"landscape":"portrait",e.html.addClass(t.isPhone?"d-phone":"d-no-phone").removeClass(t.isPhone?"d-no-phone":"d-phone").addClass(t.isTablet?"d-tablet":"d-no-tablet").removeClass(t.isTablet?"d-no-tablet":"d-tablet").addClass("landscape"===t.orientation?"r-landscape":"r-portrait").removeClass("landscape"!==t.orientation?"r-landscape":"r-portrait")};if(e.window.on("resize.sizeCheck",n),n(),navigator.userAgent.match(/(iPhone)/i)&&(t.isPhone=!0),navigator.userAgent.match(/iPad/i)&&(e.html.addClass("d-ipad"),t.isIPad=!0),navigator.userAgent.match(/(iPhone|iPod touch)/i)&&(e.html.addClass("d-iphone"),t.isIPhone=!0),navigator.userAgent.match(/(iPad|iPhone|iPod touch)/i)?(e.html.addClass("d-ios"),t.isIOS=!0):e.html.addClass("d-no-ios"),navigator.userAgent.match(/.*CPU.*OS 7_\d/i)&&(e.html.addClass("d-ios7"),t.isIOS7=!0),e.html.hasClass("d-ipad d-ios7")&&e.window.on("resize orientationchange focusout",function(){window.scrollTo(0,0)}),t.isWin=navigator.platform.indexOf("Win")>-1,t.isMac=navigator.platform.indexOf("Mac")>-1,t.isLinux=navigator.platform.indexOf("Linux")>-1,e.html.addClass(t.isMac?"d-macOS":"d-no-macOS"),t.isSafari=/constructor/i.test(window.HTMLElement),e.html.addClass(t.isSafari?"d-safari":"d-no-safari"),t.isFirefox=navigator.userAgent.toLowerCase().indexOf("firefox")>-1,e.html.addClass(t.isFirefox?"d-firefox":"d-no-firefox"),t.isMobile&&window.FastClick&&"addEventListener"in document&&document.addEventListener("DOMContentLoaded",function(){FastClick.attach(document.body)},!1),!t.isMobile){var o,i=e.body[0];e.window[0].addEventListener("scroll",function(){clearTimeout(o),i.getAttribute("class")&&i.getAttribute("class").match(/disable__hover/)||i.classList.add("disable__hover"),o=setTimeout(function(){i.classList.remove("disable__hover")},300)},!1)}}(app.device,app.$dom),function(t,e){t.light={},t.light.show=function(t,n,o,i){t[0].style.opacity=1,t[0].style[e.transform]="translateY("+Math.round(o-n*o)+"px) translateZ(0)",0==n&&(t[0].style[e.transform]="translateY(110%)")},t.light.hide=function(t,n,o,i){t[0].style.opacity=(1-.4*n).toFixed(3),t[0].style[e.transform]="translateY("+Math.round(-(i-1)*o-n*o*.5)+"px) translateZ(0)",1==n&&(t[0].style[e.transform]="translateY(-110%)"),0==n&&(t[0].style[e.transform]="translateY("+Math.round(-(i-1)*o)+"px) translateZ(0)")},t.light.move=function(t,n,o){t[0].style.opacity=1,t[0].style[e.transform]="translateY("+Math.round(-n*o)+"px) translateZ(0)"},t.space={},t.space.show=function(t,n){t[0].style.opacity=.33+.67*n;var o="";0==n?o="translate3d(110%, 0, 0)":app.device.isPhone?o="perspective(500px) translate3d("+(-8+8*n)+"%, 0, 0) rotateY("+(-6+6*n)+"deg) scale("+(.8+.2*n)+")":(o="perspective(500px) translate3d("+(-4+4*n)+"%, 0, 0) scale("+(.9+.1*n)+")",app.device.isFirefox||(o=o+"rotateY("+(-4+4*n)+"deg)")),t[0].style[e.transform]=o},t.space.hide=function(t,n){t[0].style.opacity=1,t[0].style[e.transform]="translate3d("+-100*n+"%, 0, 0)",1==n&&(t[0].style[e.transform]="translate3d(-110%, 0, 0)")},t.fold={},t.fold.show=function(t,n){t[0].style.opacity=1,t[0].style[e.transform]="translateY("+(100-100*n)+"%)"},t.fold.hide=function(t,n){t[0].style.opacity=1-.67*n,t[0].style[e.transform]="perspective(500px) translateY("+4*n+"%) rotateX("+3*-n+"deg) scale("+(1-.05*n)+")",1==n&&(t[0].style[e.transform]="translateY(-101%)")}}(app.effects,app.prefixed),function(t,e){e.init=function(n){if(n){var o,i=n.split("."),r=t;for(o=0;o<i.length;o++)r=r[i[o]];r&&"function"==typeof r.init?(r.init(),e.log("Initialize: <"+n+"> ready")):e.log("ERROR: <"+n+"> initialize")}},e.is=function(n,o){if(n){var i,r=n.split("."),a=t;for(i=0;i<r.length;i++)a=a[r[i]];a?o&&"function"==typeof o&&o():e.log("NOT found: <"+n+">")}},e.log=function(t){t&&("object"==typeof t?console.dir(t):console.log(t))},e.logger=function(t,n){t&&n&&("init"===t?e.log("Initialize: <"+n+"> ready"):"open"===t?e.log("OPEN: <"+n+">"):"close"===t?e.log("CLOSE: <"+n+">"):e.log(t+": <"+n+">"))},e.random=function(t,e){return Math.floor(Math.random()*(e-t+1)+t)},e.template=function(n,o,i){if(!t.templates[n])return void e.log("NOT found: <"+n+"> template");var r=Mustache.render(t.templates[n](),o?o:{}),a=$(r).appendTo(i?i:t.$dom.root);return a},e.copyArray=function(t){var n=null===t?null:e.isObject(t)?{}:[];for(var o in t)"object"==typeof t[o]&&"prototype"!==o?n[o]=e.copyArray(t[o]):n[o]=t[o];return n},e.sortArray=function(t,e,n){var o=_.sortBy(t,function(t){return t[e]});return"desc"===n?o.reverse():o},e.isArray=function(t){if(t&&"[object Array]"===Object.prototype.toString.call(t))return!0},e.isFunction=function(t){if(t&&"function"==typeof t)return!0},e.fixTouchScroll=function(e,n){var o=null,i=null;e.on("touchmove MSPointerMove",function(e){if(0===i){var n=e.changedTouches[0].clientY;n<o?(o=0,e.preventDefault()):t.device&&t.device.isIOS?setTimeout(function(){o=n},1e3):o=n}}),n.on("scroll",function(){i=this.scrollTop})},e.raf=function(t){var e=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame;return e?e(t):window.setTimeout(t,1e3/60)},e.caf=function(t){var e=window.cancelAnimationFrame||window.webkitCancelRequestAnimationFrame||window.mozCancelRequestAnimationFrame||window.oCancelRequestAnimationFrame||window.msCancelRequestAnimationFrame||clearTimeout;e(t),t=null},e.support={transitions:Modernizr.csstransitions},e.transEndEventNames={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd",msTransition:"MSTransitionEnd",transition:"transitionend"},e.transEndEventName=e.transEndEventNames[Modernizr.prefixed("transition")],e.animEndEventNames={WebkitAnimation:"webkitAnimationEnd",MozAnimation:"animationend",OAnimation:"oAnimationEnd",msAnimation:"MSAnimationEnd",animation:"animationend"},e.animEndEventName=e.animEndEventNames[Modernizr.prefixed("animation")],e.onEndTransition=function(t,n){var o=function(t){if(e.support.transitions){if(t.target!=this)return;this.removeEventListener(e.transEndEventName,o)}n&&"function"==typeof n&&n.call(this)};e.support.transitions?t.addEventListener(e.transEndEventName,o):o()},e.onEndAnimation=function(t,n){var o=function(t){if(e.support.transitions){if(t.target!=this)return;this.removeEventListener(e.animEndEventName,o)}n&&"function"==typeof n&&n.call(this)};e.support.transitions?t.addEventListener(e.animEndEventName,o):o()},e.onLoadImage=function(t,e){function n(){r||(r=!0,e(!0))}function o(){e(!1)}var i=new Image,r=!1;i.src=t,i.onerror=o,i.onload=n,i.complete&&n()},e.getSizeImage=function(t,e){function n(){r||(r=!0,e(i.naturalWidth,i.naturalHeight))}function o(){e(!1)}var i=new Image,r=!1;i.src=t,i.onerror=o,i.onload=n,i.complete&&n()},e.getScroll=function(t){var e=t.x*-1,n=t.y*-1,o=t.maxScrollX*-1,i=t.maxScrollY*-1;return{x:e,y:n,maxX:o,maxY:i}},e.throttle=function(t,e){var n=!0;return function(o){n&&(n=!1,setTimeout(function(){n=!0},e),t(o))}},e.debounce=function(t,e,n,o){3==arguments.length&&"boolean"!=typeof n&&(o=n,n=!1);var i;return function(){var r=arguments;o=o||this,n&&!i&&t.apply(o,r),clearTimeout(i),i=setTimeout(function(){!n&&t.apply(o,r),i=null},e)}},e.indexOf=function(t,e,n){for(var o=n||0,i=(t||[]).length;o<i;o++)if(t[o]==e)return o;return-1},e.inArray=function(t,n){return e.indexOf(t,n)!=-1},e.trim=function(t){return(t||"").replace(/^\s+|\s+$/g,"")},e.underscored=function(t){return e.trim(t).replace(/([a-z\d])([A-Z]+)/g,"$1_$2").replace(/[-\s]+/g,"_").toLowerCase()},e.numberFormat=function(t,e,n,o){if(isNaN(t)||null==t)return"";t=parseInt(t).toFixed(~~e),o="string"==typeof o?o:",";var i=t.split("."),r=i[0],a=i[1]?(n||".")+i[1]:"";return r.replace(/(\d)(?=(?:\d{3})+$)/g,"$1"+o)+a},e.clean=function(t,n){return t=_.escape(e.trim(t)),t?t:n?n:null},e.isObject=function(t){return"[object Object]"===Object.prototype.toString.call(t)},e.isEmail=function(t){return t.match(/.+@.+\..+/i)},e.newId=function(){return String(Math.round((new Date).getTime()/1e3))},e.getDateNow=function(){var t=new Date,e=t.getHours(),n=t.getMinutes(),o=t.getSeconds(),i=t.getMonth()+1,r=t.getDate(),a=t.getFullYear();return e<10&&(e="0"+e),n<10&&(n="0"+n),o<10&&(o="0"+o),i<10&&(i="0"+i),r<10&&(r="0"+r),a+"-"+i+"-"+r+" "+e+":"+n+":"+o},window._?_.extend(_,e):window._=e,t.utils=window._}(app,app.utils),function(t){t.define("plugins.tutorial.podbor"),t.plugins.tutorial.podbor=[function(){return{figure:"square",target:"product-item[data-product='ledribbon']",position:"right",padding:10,title:"Светодиодная лента",text:'Мы вам предлагаем пройти обзор по интерфейсу. Это займет не более одной минуты. Перед вами один из трех и основной компонент набора, светодиодная лента. Фото, описание, класс и указание цены за метр. Чтобы перейти на следующий шаг нажмите "Далее".'}},function(){return{figure:"circle",target:"product-item[data-product='ledribbon'] .product__select",position:"right",padding:20,title:"Открыть предложения",text:"Открываем предложения светодиодных лент. Мы подготовили для вас несколько вариантов для каждого из компонентов. Сейчас ваши действия не активны, но после прохождения обзора вы сможете все выбрать."}},function(){return{figure:"square",target:"product-item[data-product='power-supply']",position:"left",padding:30,actions:{toggle:function(t){$Product.ledribbon.tags["products-list"].toggle()}},title:"Предложения",text:'Предложения поделены на группы: "LUX", "Норма" и "Эконом". Вы можете выбрать любое предложение ориентируясь на свой бюджет. На самом деле вариантов гораздо больше, вы сможете настроить требуемые параметры и предложения сразу адаптируются под ваши требования.'}},function(){return{figure:"circle",target:"product-item[data-product='power-supply'] .connect__control",position:"left",padding:30,activeZone:!0,title:"Управление освещением",text:"Если вам не требуется управлять своим будущим освещением, просто нажмите на эту кнопку."}},function(){return{figure:"square",target:"control-light",position:"right",width:380,height:170,offset:{top:-67},actions:{toggle:function(t){$Control.light.toggle()}},title:"Тип освещенности",text:'Варианты освещенности вашей подстветки, это: "монохромная", "мультицветная" или "бегущий огонь".'}},function(){return{figure:"square",target:"control-humidity",position:"right",width:380,height:170,offset:{top:-67},actions:{toggle:function(t){$Control.humidity.toggle()}},title:"Влагозащищенность",text:"Выбор влагозащищенности ваших компонентов от брызгов воды или попадания под струю воды."}},function(){return{figure:"square",target:"control-color",position:"right",width:620,height:170,offset:{top:-67},actions:{toggle:function(t){$Control.color.toggle()}},title:"Цвет освещения",text:"Вы можете выбрать нужный вам цвет вашего освещения."}},function(){return{figure:"square",target:"control-length",position:"right",width:400,height:170,offset:{top:-67},actions:{toggle:function(t){$Control.length.toggle()}},title:"Длина ленты",text:"Один из наиболее важных параметров. Измерьте требуемую длину для светодиодной ленты. Изменив, длину вы получите новые предложения по всем компонентам, максимально отвечающим вашим новым требованиям."}},function(){return{figure:"circle",target:".control .button__ok",position:"right",padding:15,title:'Кнопка "Все ОК!"',text:"После того, как вы закончите свой выбор, нажмите на эту кнопку, чтобы отправить предзаказ и связаться с нашим менеджером для дальнейшей консультации.\n Приятного Вам освещения!"}}]}(app),function(t,e,n,o,i){t.define("router"),t.router={base:"#",start:!1,init:function(){window.route&&(riot.route=window.route),riot.route("/",function(){i.isEmpty(r.params.get())?r.mount("podbor"):r.mount("podbor")}),riot.route("podbor",function(){r.mount("podbor")}),riot.route("offerManager",function(){$Config.select("offers","manager").set(!0),r.mount("podbor")}),riot.route.base(this.base),riot.route.start(!0)},params:{get:function(){return Url.parseQuery()},set:function(t){Url.updateSearchParam(t)}},nav:function(t){riot.route(t)},mount:function(e){if(!r.start){var o=n.body.find("#loader"),a=riot.mount(".screens","screens"+(t.device.isPhone?"-mobile":""))[0];a.one("updated",function(){$afterlag.run(function(){n.body.removeClass("appLoading"),i.onEndTransition(o[0],function(){o.remove()})},{iterations:"podbor"==e?10:2,timeout:"podbor"==e?2e3:500}),$afterlag.run(function(){$Screens[e].show()},{iterations:3,timeout:1e3}),r.start=!0})}}};var r=t.router;$Router=t.router}(app,$$,app.$dom,app.events,app.utils),function(t,e,n,o,i){t.define("plugins.styles"),t.plugins.styles={ready:!1,init:function(n){r.ready||(this.el=e(n.elem),this.screen=n.default,this.screens=n.screens,this.callback=n.callback,r.resizer(t.$dom.window[0].innerWidth),t.$dom.window.on("resize.styles",function(){r.resizer(this.innerWidth).length&&r.callback&&r.callback(r.screen)}),r.ready=!0)},resizer:function(t){return i.filter(r.screens,function(e){if((e.minWidth&&e.maxWidth&&t>e.minWidth-1&&t<e.maxWidth+1||e.minWidth&&!e.maxWidth&&t>e.minWidth||e.maxWidth&&!e.minWidth&&t<e.maxWidth)&&r.screen!==e.title)return e.reload&&r.ready?window.location.reload():e.path&&r.el.attr("href",e.path),r.screen=e.title,console.log("resize: "+e.title),r.screen})}};var r=t.plugins.styles}(app,$,app.$dom,app.events,app.utils),$store.control=_.extend(new Baobab([{article:"012985",photo:"http://ledtop-shop.ru/files/catalog/012985.jpg",price:"457",desc:"Здесь нужно предоставить на выбор цвета ленты из категории Norma. Выбранный артикул будет зависить от выбранного цвета."},{article:"015668",photo:"http://ledtop-shop.ru/files/catalog/015668.jpg",price:"553",desc:"Стандартный диммер с улучшенным пультом и держателем для него."},{article:"015669",photo:"http://ledtop-shop.ru/files/catalog/015669.jpg",price:"1213",desc:"Бюджетный вариант с сенсорным пультом."},{article:"021223",photo:"http://ledtop-shop.ru/files/catalog/021223.jpg",price:"2021",desc:"Сенсорный диммер с компактными размерами."},{article:"021626",photo:"http://ledtop-shop.ru/files/catalog/021626.jpg",price:"1521",desc:"Мощный сенсорный диммер."}]),{getTitleById:function(t){return _.findWhere($store.data.get(),{_id:t}).title}}),$store.ledribbon=_.extend(new Baobab([{article:"014383",photo:"http://ledtop-shop.ru/files/catalog/014383.jpg",price:"168",desc:"Отлично подойдет как декоративная подсветка внутри помещений, офисов и квартир."},{article:"014380",photo:"http://ledtop-shop.ru/files/catalog/014380.jpg",price:"168",desc:"Здесь нужно предоставить на выбор цвета ленты из категории Norma. Выбранный артикул будет зависить от выбранного цвета."}]),{getTitleById:function(t){return _.findWhere($store.data.get(),{_id:t}).title}}),$store.power=_.extend(new Baobab([{article:"019122",photo:"http://ledtop-shop.ru/files/catalog/019122.jpg",price:"452",desc:"Блок питания для светодиодных лент, входное напряжение 100-264V АС, выходное напряжение 12V, мощность 36W, размеры 85x58x33 мм."},{article:"014980",photo:"http://ledtop-shop.ru/files/catalog/014980.jpg",price:"713",desc:"Блок питание марки Haitaik — отличается высокой надежностью. Рекомендуется использовать в ответственных местах."},{article:"018968",photo:"http://ledtop-shop.ru/files/catalog/018968.jpg",price:"638",desc:"Герметичный блок питания в пластиковом корпусе. Рекомендуется использовать в более запыленных и влажных условиях."},{article:"019372",photo:"http://ledtop-shop.ru/files/catalog/019372.jpg",price:"612",desc:"Сверхтонкий блок для узких мест."}]),{getTitleById:function(t){return _.findWhere($store.data.get(),{_id:t}).title}});