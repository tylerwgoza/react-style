/**
 * A list of unsupported pseudo classes
 */
'use strict';

var unsupportedPseudoClasses = {
  ':checked': true,
  ':default': true,
  ':dir': true,
  ':disabled': true,
  ':empty': true,
  ':enabled': true,
  ':first': true,
  ':first-child': true,
  ':first-of-type': true,
  ':indeterminate': true,
  ':in-range': true,
  ':invalid': true,
  ':lang': true,
  ':last-child': true,
  ':last-of-type': true,
  ':left': true,
  ':link': true,
  ':not': true,
  ':nth-child': true,
  ':nth-last-child': true,
  ':nth-last-of-type': true,
  ':nth-of-type': true,
  ':only-child': true,
  ':only-of-type': true,
  ':optional': true,
  ':out-of-range': true,
  ':read-only': true,
  ':read-write': true,
  ':required': true,
  ':right': true,
  ':root': true,
  ':scope': true,
  ':target': true,
  ':valid': true,
  ':visited': true
};

module.exports = unsupportedPseudoClasses;
