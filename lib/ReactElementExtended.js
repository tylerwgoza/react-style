'use strict';

var ReactElement  = require('react/lib/ReactElement');
var assign        = require('react/lib/Object.assign');
var applyHoverHandler = require('./applyHoverHandler');
var applyStyles   = require('./applyStyles');
var isArray       = Array.isArray;
var slice         = Array.prototype.slice;

var helperObj = {
  hasPseudoClass: {}
};

var originalCreateElement = ReactElement.createElement;
ReactElement.createElement = function(type, props) {
  var args = arguments;
  if (props &&
      props.styles &&
      !props.__cachedStyles &&
      typeof type === 'string') {
    props.__cachedStyles = isArray(props.styles) ? props.styles : [props.styles];
    applyStyles(props, props.styles, 0, null, helperObj.maxOverridesLength, helperObj.hasPseudoClass);
    applyHoverHandler(this, props, helperObj.hasPseudoClass);
  }
  // TODO: remove slice inside React - so we can remove this also :-)
  return originalCreateElement.call(this, type, props, slice.call(args, 2));
};

module.exports = helperObj;
