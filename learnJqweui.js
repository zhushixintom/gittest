(function($) {
	"use strict";

	$.fn.transitionEnd = function(callback) {
		var events = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'],
		i, dom = this;

		function fireCallBack(e) {
			/*jshint validthis:true */
			if (e.target !== this) return;
			callback.call(this,e);
			for (i = 0;i< events.length; i++) {
				dom.off(events[i], fireCallBack);
			}
		}
		if (callback) {
			for (i = 0; i < events.length; i++) {
				dom.on(events[i],fireCallBack);
			}
		}
		return this;
	};

	$.sopport = (function() {
		var support = {
			touch: !!(('ontouchstart' in window) || window.
				DocumentTouch && document instanceof window.
				DocumentTouch)
		};
		return support;
	})();

	$.touchEvents = {
		start: $.support.touch ? 'touchstart' : 'mousedown',
		move: $.support.touch ? 'touchmove' : 'mousemove',
		end: $.support.touch ? 'touchend' : 'mouseup'
	};


})