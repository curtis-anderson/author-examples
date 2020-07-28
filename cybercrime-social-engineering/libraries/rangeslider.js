!function(t){"use strict";"function"==typeof define&&define.amd?define(["jquery"],t):"object"==typeof exports?module.exports=t(require("jquery")):t(jQuery)}(function(o){"use strict";Number.isNaN=Number.isNaN||function(t){return"number"==typeof t&&t!=t};var t,r="rangeslider",e=0,n=((t=document.createElement("input")).setAttribute("type","range"),"text"!==t.type),h={polyfill:!0,orientation:"horizontal",rangeClass:"rangeslider",disabledClass:"rangeslider--disabled",activeClass:"rangeslider--active",horizontalClass:"rangeslider--horizontal",verticalClass:"rangeslider--vertical",dirRTLClass:"rangeslider__rtl",dirTTBClass:"rangeslider__ttb",fillClass:"rangeslider__fill",handleClass:"rangeslider__handle",startEvent:["mousedown","touchstart","pointerdown"],moveEvent:["mousemove","touchmove","pointermove"],endEvent:["mouseup","touchend","pointerup"]},a={orientation:{horizontal:{dimension:"width",direction:{ltr:"left",rtl:"right"},directionStyle:{ltr:"left",rtl:"right"},coordinate:"x"},vertical:{dimension:"height",direction:{btt:"top",ttb:"bottom"},directionStyle:{btt:"bottom",ttb:"top"},coordinate:"y"}}};function s(t,i){var e=function(t){for(var i,e=[],n=t.parentNode;(i=n)&&(0===i.offsetWidth||0===i.offsetHeight||!1===i.open);)e.push(n),n=n.parentNode;return e}(t),n=e.length,s=[],o=t[i];function r(t){void 0!==t.open&&(t.open=!t.open)}if(n){for(var h=0;h<n;h++)s[h]=e[h].style.cssText,e[h].style.setProperty?e[h].style.setProperty("display","block","important"):e[h].style.cssText+=";display: block !important",e[h].style.height="0",e[h].style.overflow="hidden",e[h].style.visibility="hidden",r(e[h]);o=t[i];for(var a=0;a<n;a++)e[a].style.cssText=s[a],r(e[a])}return o}function l(t,i){var e=parseFloat(t);return Number.isNaN(e)?i:e}function d(t){return t.charAt(0).toUpperCase()+t.substr(1)}function u(t,i){if(this.$window=o(window),this.$document=o(document),this.$element=o(t),this.options=o.extend({},h,i),this.polyfill=this.options.polyfill,this.orientation=this.$element[0].getAttribute("data-orientation")||this.options.orientation,this.dir=function(t,i){var e=t[0].getAttribute("data-direction")||("vertical"===i?"btt":"ltr");return a.orientation[i].direction[e]?e:"vertical"===i?"btt":"ltr"}(this.$element,this.orientation),this.onInit=this.options.onInit,this.onSlide=this.options.onSlide,this.onSlideEnd=this.options.onSlideEnd,this.DIMENSION=a.orientation[this.orientation].dimension,this.DIRECTION=a.orientation[this.orientation].direction[this.dir],this.DIRECTION_STYLE=a.orientation[this.orientation].directionStyle[this.dir],this.COORDINATE=a.orientation[this.orientation].coordinate,this.polyfill&&n)return!1;this.identifier="js-"+r+"-"+e++,this.startEvent=this.options.startEvent.join("."+this.identifier+" ")+"."+this.identifier,this.moveEvent=this.options.moveEvent.join("."+this.identifier+" ")+"."+this.identifier,this.endEvent=this.options.endEvent.join("."+this.identifier+" ")+"."+this.identifier,this.toFixed=(this.step+"").replace(".","").length-1,this.$fill=o('<div class="'+this.options.fillClass+" "+("ttb"===this.dir&&"vertical"===this.orientation?this.options.dirTTBClass:"")+'" />'),this.$handle=o('<div class="'+this.options.handleClass+'" />'),this.$range=o('<div class="'+this.options.rangeClass+" "+("rtl"===this.dir&&"horizontal"===this.orientation?this.options.dirRTLClass:"")+" "+this.options[this.orientation+"Class"]+'" id="'+this.identifier+'" />').insertAfter(this.$element).prepend(this.$fill,this.$handle),this.$element.css({position:"absolute",width:"1px",height:"1px",overflow:"hidden",opacity:"0"}),this.handleDown=o.proxy(this.handleDown,this),this.handleMove=o.proxy(this.handleMove,this),this.handleEnd=o.proxy(this.handleEnd,this),this.init();var s=this;this.$window.on("resize."+this.identifier,function(i,e){return e=e||100,function(){if(!i.debouncing){var t=Array.prototype.slice.apply(arguments);i.lastReturnVal=i.apply(window,t),i.debouncing=!0}return clearTimeout(i.debounceTimeout),i.debounceTimeout=setTimeout(function(){i.debouncing=!1},e),i.lastReturnVal}}(function(){!function(t,i){var e=Array.prototype.slice.call(arguments,2);setTimeout(function(){return t.apply(null,e)},i)}(function(){s.update(!1,!1)},300)},20)),this.$document.on(this.startEvent,"#"+this.identifier+":not(."+this.options.disabledClass+")",this.handleDown),this.$element.on("change."+this.identifier,function(t,i){if(!i||i.origin!==s.identifier){var e=t.target.value,n=s.getPositionFromValue(e);s.setPosition(n)}})}return u.prototype.init=function(){this.update(!0,!1),this.onInit&&"function"==typeof this.onInit&&this.onInit()},u.prototype.update=function(t,i){(t=t||!1)&&(this.min=l(this.$element[0].getAttribute("min"),0),this.max=l(this.$element[0].getAttribute("max"),100),this.value=l(this.$element[0].value,Math.round(this.min+(this.max-this.min)/2)),this.step=l(this.$element[0].getAttribute("step"),1)),this.handleDimension=s(this.$handle[0],"offset"+d(this.DIMENSION)),this.rangeDimension=s(this.$range[0],"offset"+d(this.DIMENSION)),this.maxHandlePos=this.rangeDimension-this.handleDimension,this.grabPos=this.handleDimension/2,this.position=this.getPositionFromValue(this.value),this.$element[0].disabled?this.$range.addClass(this.options.disabledClass):this.$range.removeClass(this.options.disabledClass),this.setPosition(this.position,i)},u.prototype.handleDown=function(t){if(t.preventDefault(),this.$document.on(this.moveEvent,this.handleMove),this.$document.on(this.endEvent,this.handleEnd),this.$range.addClass(this.options.activeClass),!(-1<(" "+t.target.className+" ").replace(/[\n\t]/g," ").indexOf(this.options.handleClass))){var i=this.getRelativePosition(t),e=this.$range[0].getBoundingClientRect()[this.DIRECTION],n=this.getPositionFromNode(this.$handle[0])-e,s="vertical"===this.orientation?this.maxHandlePos-(i-this.grabPos):i-this.grabPos;this.setPosition(s),n<=i&&i<n+this.handleDimension&&(this.grabPos=i-n)}},u.prototype.handleMove=function(t){t.preventDefault();var i=this.getRelativePosition(t),e="vertical"===this.orientation?this.maxHandlePos-(i-this.grabPos):i-this.grabPos;this.setPosition(e)},u.prototype.handleEnd=function(t){t.preventDefault(),this.$document.off(this.moveEvent,this.handleMove),this.$document.off(this.endEvent,this.handleEnd),this.$range.removeClass(this.options.activeClass),this.$element.trigger("change",{origin:this.identifier}),this.onSlideEnd&&"function"==typeof this.onSlideEnd&&this.onSlideEnd(this.position,this.value)},u.prototype.cap=function(t,i,e){return t<i?i:e<t?e:t},u.prototype.setPosition=function(t,i){var e,n;void 0===i&&(i=!0),e=this.getValueFromPosition(this.cap(t,0,this.maxHandlePos)),n=this.getPositionFromValue(e),this.$fill[0].style[this.DIMENSION]=e==this.max?"100%":n+this.grabPos+"px",this.$handle[0].style[this.DIRECTION_STYLE]=n+"px",this.setValue(e),this.position=n,this.value=e,i&&this.onSlide&&"function"==typeof this.onSlide&&this.onSlide(n,e)},u.prototype.getPositionFromNode=function(t){for(var i=0;null!==t;)i+=t.offsetLeft,t=t.offsetParent;return i},u.prototype.getRelativePosition=function(t){var i=d(this.COORDINATE),e=this.$range[0].getBoundingClientRect()[this.DIRECTION],n=0;return void 0!==t.originalEvent["client"+i]?n=t.originalEvent["client"+i]:t.originalEvent.touches&&t.originalEvent.touches[0]&&void 0!==t.originalEvent.touches[0]["client"+i]?n=t.originalEvent.touches[0]["client"+i]:t.currentPoint&&void 0!==t.currentPoint[this.COORDINATE]&&(n=t.currentPoint[this.COORDINATE]),"rtl"===this.dir||"ttb"===this.dir?e-n:n-e},u.prototype.getPositionFromValue=function(t){var i;return i=(t-this.min)/(this.max-this.min),Number.isNaN(i)?0:i*this.maxHandlePos},u.prototype.getValueFromPosition=function(t){var i,e;return i=t/(this.maxHandlePos||1),e=this.step*Math.round(i*(this.max-this.min)/this.step)+this.min,Number(e.toFixed(this.toFixed))},u.prototype.setValue=function(t){t===this.value&&""!==this.$element[0].value||this.$element.val(t).trigger("input",{origin:this.identifier})},u.prototype.destroy=function(){this.$document.off("."+this.identifier),this.$window.off("."+this.identifier),this.$element.off("."+this.identifier).removeAttr("style").removeData("plugin_"+r),this.$range&&this.$range.length&&this.$range[0].parentNode.removeChild(this.$range[0])},o.fn[r]=function(e){var n=Array.prototype.slice.call(arguments,1);return this.each(function(){var t=o(this),i=t.data("plugin_"+r);i||t.data("plugin_"+r,i=new u(this,e)),"string"==typeof e&&i[e].apply(i,n)})},"rangeslider.js is available in jQuery context e.g $(selector).rangeslider(options);"});