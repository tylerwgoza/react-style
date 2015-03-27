'use strict';

function onMouseEnter(originalOnMouseEnter) {
  return function() {
    //console.log('enable hover state please');
  };
}

function onMouseLeave(originalOnMouseLeave) {
  return function() {
    //console.log('disable hover state please');
  };
}

function applyHoverHandler(component, props, hasPseudoClass) {
  // do we have a hover style here?!
  var hover;
  for (var i = 0, l = props.__cachedStyles.length; i < l; i++) {
    var style = props.__cachedStyles[i];
    for (var style2 in hasPseudoClass) {
      if (style === style2) {
        //console.log('yes:', style, style2);
      }
    }
  }
  props.onMouseEnter = onMouseEnter(component, props.onMouseEnter);
  props.onMouseLeave = onMouseLeave(component, props.onMouseLeave);
}

module.exports = applyHoverHandler;
