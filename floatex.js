(function (window, document, undefined) {
	function Floatex (element) {
		this._mainElement_ = element;
		this._options_ = {

		};

	}
	function _init () {
		var elements = this._mainElement_.children;
		var self = this._mainElement_;
		var that = this;
		this.effect = false;
		that.swap = false;
		this._children_ = elements;
		for (var i = 0; i < elements.length ; i++) {
			var child = elements[i];
			if (child.tagName == "DIV") {

				child.addEventListener('dblclick', function (e) {
					var el = this
					  , copy = this.cloneNode(true)
					  , hover;
					el.style.opacity = '0.3';
					copy.style.opacity = '0.7';
					copy.style.position = 'absolute';
					copy.style.zIndex = '9999999';
					copy.id = 'copy';
					self.style.outline = '#000000 dashed thick';
					this.parentNode.insertBefore(copy, this);
					function _documentMousemove (e) {

						copy.style.left = (e.clientX - (copy.offsetWidth/2)) + 'px';
						copy.style.top = (e.clientY - (copy.offsetHeight/2)) + 'px';
						copy.style.cursor = 'move';
						hover = _find.call(that, e.clientX, e.clientY);
						var outline = document.getElementById('outline');
						if (outline && hover.id !== 'outline'){
	
							
							that.swap = false;
							outline.parentNode.removeChild(outline);
							if (that.effect === false){
								_swap.call(that, that.hover, that.el);	
							} else {
								that._swapCallback = function(){
									_swap.call(this, this.hover, this.el);
								}
							}
						}
						if (that.effect === false) {
							if (hover !== false && hover !== el){
								if (hover.id !== 'outline'){
									var outline = _outline(hover);
									el.parentNode.insertBefore(outline, self.children[0]);
									that.swap = true;
									that.hover = hover;
									that.el = el;
									_swap.call(that, el, hover);
								}
							}
						}
					}
					document.addEventListener('mousemove', _documentMousemove);
					copy.addEventListener('click', function (e) {
						document.removeEventListener('mousemove', _documentMousemove);
						copy.parentNode.removeChild(copy);
						self.style.outline = 'none';
						el.style.opacity = '1';
						var outline = document.getElementById('outline');
						if (outline) outline.parentNode.removeChild(outline);
						that.swap = false;
					});
				});

			}
		}
	}
	function _outline (el) {
		var outline = document.createElement('div');
		console.log('s');
		outline.style.position = 'absolute';
		outline.style.top = (el.offsetTop -35) + 'px';
		outline.style.left = (el.offsetLeft -35) + 'px';
		outline.style.width = (el.offsetWidth + 70) + 'px';
		outline.style.height = (el.offsetHeight + 70) + 'px';
		outline.style.outline = 'black dashed thick';
		outline.style.visibility = 'hidden';
		outline.id = 'outline';
		return outline;
	}
	function _find (clientX, clientY) {
		var elements = Array.prototype.slice.call(this._children_);
		for (var i = 0; i < elements.length; i++) {
			if (clientX > elements[i].offsetLeft && clientX < (elements[i].offsetWidth + elements[i].offsetLeft) && clientY > elements[i].offsetTop && clientY < (elements[i].offsetHeight + elements[i].offsetTop)){
				if (elements[i].id !== 'copy'){
					return this._children_[i];
				}
			}
		}
		return false;
	}
	function _swap (element1, element2) {
		var top1 = parseFloat(element1.style.top, 10)
		  , top2 = parseFloat(element2.style.top, 10)
		  , left1 = parseFloat(element1.style.left, 10)
		  , left2 = parseFloat(element2.style.left, 10)
		  , nTop = top2-top1
		  , nLeft = left2-left1
		  , self = this
		  , time = 30;
		self.effect = true;
		if (nTop > 0) {
			var top21 = true;
		} else {
			var top21 = false;
		}
		if (nLeft > 0) {
			var left21 = true;
		} else {
			var left21 = false;
		}
		nLeft = window.Math.abs(nLeft);
		nTop = window.Math.abs(nTop);
		topIncDec = parseFloat(nTop/time);
		leftIncDec = parseFloat(nLeft/time);
		var i = 0;
		if (!self.interval) {
		self.interval = setInterval(function () {
			if (top21 === true){
				element1.style.top = (parseFloat(element1.style.top) + topIncDec) + 'px';
				element2.style.top = (parseFloat(element2.style.top) - topIncDec) + 'px';
			} else {
				element1.style.top = (parseFloat(element1.style.top) - topIncDec) + 'px';
				element2.style.top = (parseFloat(element2.style.top) + topIncDec) + 'px';
			}
			if (left21 === true){
				element1.style.left = (parseFloat(element1.style.left) + leftIncDec) + 'px';
				element2.style.left = (parseFloat(element2.style.left) - leftIncDec) + 'px';
			} else {
				element1.style.left = (parseFloat(element1.style.left) - leftIncDec) + 'px';
				element2.style.left = (parseFloat(element2.style.left) + leftIncDec) + 'px';
			}
			i++;
			if (i === time) {
				clearInterval(self.interval);
				self.interval = null;
				element2.style.top = top1 + 'px';
				element1.style.top = top2 + 'px';

				element2.style.left = left1 + 'px';
				element1.style.left = left2 + 'px';

				if (typeof self._swapCallback === 'function'){
					self._swapCallback();
				}
				self._swapCallback = null;
				self.effect = false;
			}
		}, 1);
		}
	}

	function floatex (id) {
		if (typeof id === 'string'){
			var element = document.getElementById(id);
			return new Floatex(element);
		}
	}

	floatex.fn = Floatex.prototype = {
		init: function () {
			_init.call(this);
		}
	};
	window.floatex = floatex;

})(window, window.document);