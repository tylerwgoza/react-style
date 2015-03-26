'use strict';

var assign                          = require("react/lib/Object.assign");
var ReactElementExtended            = require('./ReactElementExtended');
var ReactCompositeComponentExtended = require('./ReactCompositeComponentExtended.js');
var ExecutionEnvironment            = require('react/lib/ExecutionEnvironment');

var applyMediaQueries               = require('./applyMediaQueries');
var generateUniqueCSSClassName      = require('./generateUniqueCSSClassName');
var stylesToCSS                     = require('./stylesToCSS');

var isArray                         = Array.isArray;

var registeredMediaQueries          = [];
var styles                          = [];

function createStyle(props, className) {
  styles.push({
    style: props,
    className: className
  });
  return className;
}

function hasPseudoClass(style) {
  var props = Object.keys(style);
  for (var i = 0, l = props.length; i < l; i++) {
    var prop = props[i];
    if (prop.charAt(0) === ':') {
      return true;
    }
  }
  return false;
}

function createStyleSheet(stylesheet, useClassName) {
  if (!useClassName) {
    // default
    stylesheet = applyMediaQueries(registeredMediaQueries, stylesheet, true);
    return stylesheet;
  }
  else {
    ReactElementExtended.maxOverridesLength = StyleSheet.maxOverridesLength;

    // export to separate CSS classes
    var styleSheetStyles = Object.keys(stylesheet);
    var results = {};
    for (var i = 0, l = styleSheetStyles.length; i < l; i++) {
      var styleName = styleSheetStyles[i];
      var isMediaQuery = !styleName.indexOf('@media ');
      var style = stylesheet[styleName];

      var uniqueKey = generateUniqueCSSClassName();
      if ("production" !== process.env.NODE_ENV) {
        uniqueKey = styleName + '_' + uniqueKey;
      }

      if (hasPseudoClass(style)) {
        ReactElementExtended.hasPseudoClass[uniqueKey] = true;
      }

      if (isMediaQuery) {
        var mqStyleNames = Object.keys(style);
        var newStyle = {};
        for (var i2 = 0, l2 = mqStyleNames.length; i2 < l2; i2++) {
          var mqStyleName = mqStyleNames[i2];
          var mqStyle = style[mqStyleName];

          var uniqueKey2 = results[mqStyleName];
          if (uniqueKey2) {
            newStyle[uniqueKey2] = mqStyle;
          }
          if (hasPseudoClass(mqStyle)) {
            ReactElementExtended.hasPseudoClass[uniqueKey2] = true;
          }
        }
        style = newStyle;
      }
      results[styleName] = createStyle(style, isMediaQuery ? styleName : uniqueKey);
    }

    return results;
  }
}

var StyleSheet = {
  compile: function(maxLength) {
    return stylesToCSS(styles, maxLength || 10);
  },
  create: createStyleSheet
};

ReactCompositeComponentExtended.associateToMediaQuery = function(comp) {
  var styles = comp.props.__cachedStyles;
  for (var i = 0, l = styles.length; i < l; i++) {
    var style = styles[i];
    for (var j = 0, l2 = registeredMediaQueries.length; j < l2; j++) {
      var registeredMediaQuery = registeredMediaQueries[j];
      var stylesheet = registeredMediaQuery.compiled;
      var stylesheetNames = registeredMediaQuery.styleNames;
      for (var i2 = 0, l3 = stylesheetNames.length; i2 < l3; i2++) {
        var styleName = stylesheetNames[i2];
        var compiledStyle = stylesheet[styleName];
        if (style === compiledStyle) {
          registeredMediaQuery.elements.push(comp);
        }
      }
    }
  }
};


module.exports = StyleSheet;
