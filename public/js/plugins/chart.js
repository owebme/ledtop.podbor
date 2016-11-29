(function(app, $, $dom, EV, _){

    app.define("plugins.chart");

    app.plugins.chart = {

        graph: [],

        colors: ['#0084ff', '#ff2d55', '#ffc43a'],

        init: function(elem, data) {

            if (WD.graph && WD.graph.length){
                _.each(WD.graph, function(item, i){
                    item.reset();
                    item.start(data[i]);
                });
            }
            else {

                WD.graph.push(WD.render(elem.find('.chart__radial__graph1')[0], data[0], {
                    color: WD.colors[0],
                    autostart: true
                }));

                WD.graph.push(WD.render(elem.find('.chart__radial__graph2')[0], data[1], {
                    color: WD.colors[1],
                    autostart: true
                }));

                WD.graph.push(WD.render(elem.find('.chart__radial__graph3')[0], data[2], {
                    color: WD.colors[2],
                    autostart: true
                }));

                WD.labels = elem.find('.chart__radial__labels');

                WD.labels.find(".chart__radial__label__color").each(function(i){
                    this.style.backgroundColor = WD.colors[i];
                });
            }
        },

        render: function(box, value, _option) {

        	var canvas = document.createElement('canvas'),
        		context = canvas.getContext('2d'),

        		boxsize = box.offsetWidth,

        		option = _option || {},
        		linewidth = option.linewidth || 24,
        		barcolor = option.color || '#fff',
        		noanimation = option.noanimation || false,

        		from = option.from || 0,
        		to = value,
        		now = {percent: from},

        		nowanimating = false,
        		animateduration = 2,
        		animateoptions = {ease: 'easeInOutCubic', onUpdate: onupdate, onComplete: onend};


        	canvas.width = canvas.height = boxsize;
        	box.appendChild(canvas);

        	context.lineWidth = linewidth;
        	context.lineCap = 'round';
        	context.strokeStyle = barcolor;

        	if (noanimation) {
        		option.autostart = true;
        	}

        	option.autostart ? start(to) : reset();


        	function ready() {
        		draw(from);
        	}

        	function start(to) {
        		if (!nowanimating) {
        			now.percent = noanimation ? value : from;
        			if (now.percent == to) {
        				draw(now.percent);
        			} else {
        				nowanimating = true;
        				animateoptions.percent = to;
        				TweenLite.to(now, animateduration, animateoptions);
        			}
        		}
        	}

        	function onupdate() {
        		draw(now.percent);
        	}

        	function onend() {
        		nowanimating = false;
        	}

        	function draw(percent) {

        		var boxhalfsize = boxsize/2;

        		percent = Math.max(percent, 0.005);

        		context.clearRect(0, 0, boxsize, boxsize);

        		// bg
        		context.beginPath();
        		context.globalAlpha = 0.2;
        		context.arc(boxhalfsize, boxhalfsize, boxhalfsize-linewidth/2, 0, 2*Math.PI);
        		context.stroke();

        		// bar
        		context.beginPath();
        		context.arc(boxhalfsize, boxhalfsize, boxhalfsize-linewidth/2, 0-Math.PI/2, (2*Math.PI)*percent/100-Math.PI/2);
        		context.globalAlpha = 1;
        		context.stroke();

        	}

        	function reset() {
        		draw(from);
        	}

        	return {
        		start: start,
        		reset: reset
        	}
        }
    };

    var WD = app.plugins.chart;

})(app, $, app.$dom, app.events, app.utils);
