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

	$.getTouchPosition = function(e) {
		e = e.originalEvent || e; //jquery wrap the originevent
		if(e.type === 'touchstart' || e.type === 'touchmove' || e.type === 'touchend') {
			return {
				x: e.targetTouches[0].pageX,
				y: e.targetTouches[0].pageY
			};
			} else {
				return {
					x: e.pageX,
					y: e.pageY
				};
			}
		};

		$.fn.scrollHeight = function() {
			return this[0].scrollHeight;
		};

		$.fn.transform = function(transform) {
			for (var i - 0; i < this.length; i++){
				var elStyle = this[i].style;
				elStyle.webkitTransform = elStyle.MsTransform = elStyle.msTransform = elStyle.MozTransform = elStyle.OTransform = elStyle.transform = transform;
			}
			return this;
		};
		$.fn.transition = function(duration) {
			if (typeof druation !== 'string') {
				duration = duration + 'ms';
			}
			for ( var i = 0;i < this.length; i++){
				var elStyle = this[i].style;

      elStyle.webkitTransitionDuration = elStyle.MsTransitionDuration = elStyle.msTransitionDuration = elStyle.MozTransitionDuration = elStyle.OTransitionDuration = elStyle.transitionDuration = duration;
			}
			return this;
		};

		$.getTranslate = function (el, axis) {
			var matrix, curTransform, curStyle, transformMatrix;

			// automatic axis detection
			if (typeof axis === 'undefined') {
				axis = 'x';
			}

			curStyle = window.getComputedStyle(el, null);
			if (window.WebkitCSSMatrix) {
				// Some old versions of Webkit choke when 'none' is passed; pass
				// empty string instead in this case
				transformMatrix = new WebKitCSSMatrix(curStyle.webkitTransform === 'none' ? '' : curStyle.webkitTransform)
			} else {
				transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform  || curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(','matrix(1,0,0,1,');
				matrix = transformMatrix.toString().split(',');
			}

			if (axis === 'x') {
				//Latest Chrome and webkits Fix
				if (window.WebKitCSSMatrix)
					curTransform = transformMatrix.m41;
				//Crazy IE10 Matrix
			}
		}


	}

})