(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Liquid = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var strftime = require('strftime').timezone(-new Date().getTimezoneOffset());

module.exports = function (liquid) {
    liquid.registerFilter('abs', function (v) {
        return Math.abs(v);
    });
    liquid.registerFilter('append', function (v, arg) {
        return v + arg;
    });
    liquid.registerFilter('capitalize', function (str) {
        return (str || '').charAt(0).toUpperCase() + str.slice(1);
    });
    liquid.registerFilter('ceil', function (v) {
        return Math.ceil(v);
    });

    liquid.registerFilter('date', function (v, arg) {
        return strftime(arg, v);
    });

    liquid.registerFilter('default', function (v, arg) {
        return arg || v;
    });
    liquid.registerFilter('divided_by', function (v, arg) {
        return Math.floor(v / arg);
    });
    liquid.registerFilter('downcase', function (v) {
        return v.toLowerCase();
    });

    var escapeMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&#34;',
        "'": '&#39;'
    };

    function escape(str) {
        return (str || '').replace(/&|<|>|"|'/g, function (m) {
            return escapeMap[m];
        });
    }
    liquid.registerFilter('escape', escape);

    var unescapeMap = {
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&#34;': '"',
        '&#39;': "'"
    };

    function unescape(str) {
        return (str || '').replace(/&(amp|lt|gt|#34|#39);/g, function (m) {
            return unescapeMap[m];
        });
    }
    liquid.registerFilter('escape_once', function (str) {
        return escape(unescape(str));
    });
    liquid.registerFilter('first', function (v) {
        return v[0];
    });
    liquid.registerFilter('floor', function (v) {
        return Math.floor(v);
    });
    liquid.registerFilter('join', function (v, arg) {
        return v.join(arg);
    });
    liquid.registerFilter('last', function (v) {
        return v[v.length - 1];
    });
    liquid.registerFilter('lstrip', function (v) {
        return (v || '').replace(/^\s+/, '');
    });
    liquid.registerFilter('map', function (arr, arg) {
        return arr.map(function (v) {
            return v[arg];
        });
    });
    liquid.registerFilter('minus', bindFixed(function (v, arg) {
        return v - arg;
    }));
    liquid.registerFilter('modulo', bindFixed(function (v, arg) {
        return v % arg;
    }));
    liquid.registerFilter('newline_to_br', function (v) {
        return v.replace(/\n/g, '<br />');
    });
    liquid.registerFilter('plus', bindFixed(function (v, arg) {
        return v + arg;
    }));
    liquid.registerFilter('prepend', function (v, arg) {
        return arg + v;
    });
    liquid.registerFilter('remove', function (v, arg) {
        return v.split(arg).join('');
    });
    liquid.registerFilter('remove_first', function (v, l) {
        return v.replace(l, '');
    });
    liquid.registerFilter('replace', function (v, pattern, replacement) {
        return (v || '').split(pattern).join(replacement);
    });
    liquid.registerFilter('replace_first', function (v, arg1, arg2) {
        return (v || '').replace(arg1, arg2);
    });
    liquid.registerFilter('reverse', function (v) {
        return (v || '').reverse();
    });
    liquid.registerFilter('round', function (v, arg) {
        var amp = Math.pow(10, arg || 0);
        return Math.round(v * amp, arg) / amp;
    });
    liquid.registerFilter('rstrip', function (str) {
        return (str || '').replace(/\s+$/, '');
    });
    liquid.registerFilter('size', function (v) {
        return v.length;
    });
    liquid.registerFilter('slice', function (v, begin, length) {
        return v.substr(begin, length === undefined ? 1 : length);
    });
    liquid.registerFilter('sort', function (v, arg) {
        return (v || '').sort(arg);
    });
    liquid.registerFilter('split', function (v, arg) {
        return (v || '').split(arg);
    });
    liquid.registerFilter('strip', function (v) {
        return (v || '').trim();
    });
    liquid.registerFilter('strip_html', function (v) {
        return (v || '').replace(/<\/?\s*\w+\s*\/?>/g, '');
    });
    liquid.registerFilter('strip_newlines', function (v) {
        return (v || '').replace(/\n/g, '');
    });
    liquid.registerFilter('times', function (v, arg) {
        return v * arg;
    });
    liquid.registerFilter('truncate', function (v, l, o) {
        v = v || '';
        o = o === undefined ? '...' : o;
        l = l || 16;
        if (v.length <= l) return v;
        return v.substr(0, l - o.length) + o;
    });
    liquid.registerFilter('truncatewords', function (v, l, o) {
        if (o === undefined) o = '...';
        var arr = v.split(' ');
        var ret = arr.slice(0, l).join(' ');
        if (arr.length > l) ret += o;
        return ret;
    });
    liquid.registerFilter('uniq', function (arr) {
        var u = {};
        return (arr || []).filter(function (val) {
            if (u.hasOwnProperty(val)) {
                return false;
            }
            u[val] = true;
            return true;
        });
    });
    liquid.registerFilter('upcase', function (str) {
        return (str || '').toUpperCase();
    });
    liquid.registerFilter('url_encode', encodeURIComponent);
};

function getFixed(v) {
    var p = (v + "").split(".");
    return p.length > 1 ? p[1].length : 0;
}

function getMaxFixed(l, r) {
    return Math.max(getFixed(l), getFixed(r));
}

function bindFixed(cb) {
    return function (l, r) {
        var f = getMaxFixed(l, r);
        return cb(l, r).toFixed(f);
    };
}

},{"strftime":10}],2:[function(require,module,exports){
'use strict';

var Scope = require('./src/scope');
var assert = require('assert');
var tokenizer = require('./src/tokenizer.js');
var Render = require('./src/render.js');
var lexical = require('./src/lexical.js');
var path = require("path");
var fs = require('fs');
var Tag = require('./src/tag.js');
var Filter = require('./src/filter.js');
var Template = require('./src/parser');
var Expression = require('./src/expression.js');
var tags = require('./tags');
var filters = require('./filters');
var Promise = require('any-promise');

var _engine = {
    init: function init(tag, filter, options) {
        if (options.cache) {
            this.cache = {};
        }
        this.options = options;
        this.tag = tag;
        this.filter = filter;
        this.parser = Template(tag, filter);
        this.renderer = Render();

        tags(this);
        filters(this);

        return this;
    },
    parse: function parse(html) {
        var tokens = tokenizer.parse(html);
        return this.parser.parse(tokens);
    },
    render: function render(tpl, ctx, opts) {
        opts = opts || {};
        opts.strict_variables = opts.strict_variables || false;
        opts.strict_filters = opts.strict_filters || false;

        this.renderer.resetRegisters();
        var scope = Scope.factory(ctx, {
            strict: opts.strict_variables
        });
        return this.renderer.renderTemplates(tpl, scope, opts);
    },
    parseAndRender: function parseAndRender(html, ctx, opts) {
        try {
            var tpl = this.parse(html);
            return this.render(tpl, ctx, opts);
        } catch (error) {
            // A throw inside of a then or catch of a Promise automatically rejects, but since we mix a sync call
            //  with an async call, we need to do this in case the sync call throws.
            return Promise.reject(error);
        }
    },
    renderFile: function renderFile(filepath, ctx, opts) {
        var _this = this;

        return this.handleCache(filepath).then(function (templates) {
            return _this.render(templates, ctx, opts);
        }).catch(function (e) {
            e.file = filepath;
            throw e;
        });
    },
    evalOutput: function evalOutput(str, scope) {
        var tpl = this.parser.parseOutput(str.trim());
        return this.renderer.evalOutput(tpl, scope);
    },
    registerFilter: function registerFilter(name, filter) {
        return this.filter.register(name, filter);
    },
    registerTag: function registerTag(name, tag) {
        return this.tag.register(name, tag);
    },
    handleCache: function handleCache(filepath) {
        var _this2 = this;

        assert(filepath, 'filepath cannot be null');
        filepath = path.resolve(this.options.root, filepath);
        if (path.extname(filepath) === '') {
            filepath += this.options.extname;
        }

        return this.getTemplate(filepath).then(function (html) {
            var tpl = _this2.options.cache && _this2.cache[filepath] || _this2.parse(html);
            return _this2.options.cache ? _this2.cache[filepath] = tpl : tpl;
        });
    },
    getTemplate: function getTemplate(filepath) {
        return new Promise(function (resolve, reject) {
            fs.readFile(filepath, 'utf8', function (err, html) {
                err ? reject(err) : resolve(html);
            });
        });
    },
    express: function express(renderingOptions) {
        var _this3 = this;

        return function (filePath, options, callback) {
            _this3.renderFile(filePath, options, renderingOptions).then(function (html) {
                return callback(null, html);
            }).catch(function (e) {
                return callback(e);
            });
        };
    }
};

function factory(options) {
    options = options || {};
    options.root = options.root || '';
    options.extname = options.extname || '.liquid';

    var engine = Object.create(_engine);

    engine.init(Tag(), Filter(), options);
    return engine;
}

factory.lexical = lexical;
factory.isTruthy = Expression.isTruthy;
factory.isFalsy = Expression.isFalsy;
factory.evalExp = Expression.evalExp;
factory.evalValue = Expression.evalValue;

module.exports = factory;

},{"./filters":1,"./src/expression.js":15,"./src/filter.js":16,"./src/lexical.js":17,"./src/parser":18,"./src/render.js":19,"./src/scope":20,"./src/tag.js":22,"./src/tokenizer.js":23,"./tags":34,"any-promise":3,"assert":6,"fs":7,"path":8}],3:[function(require,module,exports){
'use strict';

module.exports = require('./register')().Promise;

},{"./register":5}],4:[function(require,module,exports){
"use strict";
// global key for user preferred registration

var REGISTRATION_KEY = '@@any-promise/REGISTRATION',

// Prior registration (preferred or detected)
registered = null;

/**
 * Registers the given implementation.  An implementation must
 * be registered prior to any call to `require("any-promise")`,
 * typically on application load.
 *
 * If called with no arguments, will return registration in
 * following priority:
 *
 * For Node.js:
 *
 * 1. Previous registration
 * 2. global.Promise if node.js version >= 0.12
 * 3. Auto detected promise based on first sucessful require of
 *    known promise libraries. Note this is a last resort, as the
 *    loaded library is non-deterministic. node.js >= 0.12 will
 *    always use global.Promise over this priority list.
 * 4. Throws error.
 *
 * For Browser:
 *
 * 1. Previous registration
 * 2. window.Promise
 * 3. Throws error.
 *
 * Options:
 *
 * Promise: Desired Promise constructor
 * global: Boolean - Should the registration be cached in a global variable to
 * allow cross dependency/bundle registration?  (default true)
 */
module.exports = function (root, loadImplementation) {
  return function register(implementation, opts) {
    implementation = implementation || null;
    opts = opts || {};
    // global registration unless explicitly  {global: false} in options (default true)
    var registerGlobal = opts.global !== false;

    // load any previous global registration
    if (registered === null && registerGlobal) {
      registered = root[REGISTRATION_KEY] || null;
    }

    if (registered !== null && implementation !== null && registered.implementation !== implementation) {
      // Throw error if attempting to redefine implementation
      throw new Error('any-promise already defined as "' + registered.implementation + '".  You can only register an implementation before the first ' + ' call to require("any-promise") and an implementation cannot be changed');
    }

    if (registered === null) {
      // use provided implementation
      if (implementation !== null && typeof opts.Promise !== 'undefined') {
        registered = {
          Promise: opts.Promise,
          implementation: implementation
        };
      } else {
        // require implementation if implementation is specified but not provided
        registered = loadImplementation(implementation);
      }

      if (registerGlobal) {
        // register preference globally in case multiple installations
        root[REGISTRATION_KEY] = registered;
      }
    }

    return registered;
  };
};

},{}],5:[function(require,module,exports){
"use strict";

module.exports = require('./loader')(window, loadImplementation);

/**
 * Browser specific loadImplementation.  Always uses `window.Promise`
 *
 * To register a custom implementation, must register with `Promise` option.
 */
function loadImplementation() {
  if (typeof window.Promise === 'undefined') {
    throw new Error("any-promise browser requires a polyfill or explicit registration" + " e.g: require('any-promise/register/bluebird')");
  }
  return {
    Promise: window.Promise,
    implementation: 'window.Promise'
  };
}

},{"./loader":4}],6:[function(require,module,exports){
'use strict';

// http://wiki.commonjs.org/wiki/Unit_Testing/1.0
//
// THIS IS NOT TESTED NOR LIKELY TO WORK OUTSIDE V8!
//
// Originally from narwhal.js (http://narwhaljs.org)
// Copyright (c) 2009 Thomas Robinson <280north.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the 'Software'), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

// when used in node, this will actually load the util module we depend on
// versus loading the builtin util module as happens otherwise
// this is a bug in node module loading as far as I am concerned
var util = require('util/');

var pSlice = Array.prototype.slice;
var hasOwn = Object.prototype.hasOwnProperty;

// 1. The assert module provides functions that throw
// AssertionError's when particular conditions are not met. The
// assert module must conform to the following interface.

var assert = module.exports = ok;

// 2. The AssertionError is defined in assert.
// new assert.AssertionError({ message: message,
//                             actual: actual,
//                             expected: expected })

assert.AssertionError = function AssertionError(options) {
  this.name = 'AssertionError';
  this.actual = options.actual;
  this.expected = options.expected;
  this.operator = options.operator;
  if (options.message) {
    this.message = options.message;
    this.generatedMessage = false;
  } else {
    this.message = getMessage(this);
    this.generatedMessage = true;
  }
  var stackStartFunction = options.stackStartFunction || fail;

  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, stackStartFunction);
  } else {
    // non v8 browsers so we can have a stacktrace
    var err = new Error();
    if (err.stack) {
      var out = err.stack;

      // try to strip useless frames
      var fn_name = stackStartFunction.name;
      var idx = out.indexOf('\n' + fn_name);
      if (idx >= 0) {
        // once we have located the function frame
        // we need to strip out everything before it (and its line)
        var next_line = out.indexOf('\n', idx + 1);
        out = out.substring(next_line + 1);
      }

      this.stack = out;
    }
  }
};

// assert.AssertionError instanceof Error
util.inherits(assert.AssertionError, Error);

function replacer(key, value) {
  if (util.isUndefined(value)) {
    return '' + value;
  }
  if (util.isNumber(value) && !isFinite(value)) {
    return value.toString();
  }
  if (util.isFunction(value) || util.isRegExp(value)) {
    return value.toString();
  }
  return value;
}

function truncate(s, n) {
  if (util.isString(s)) {
    return s.length < n ? s : s.slice(0, n);
  } else {
    return s;
  }
}

function getMessage(self) {
  return truncate(JSON.stringify(self.actual, replacer), 128) + ' ' + self.operator + ' ' + truncate(JSON.stringify(self.expected, replacer), 128);
}

// At present only the three keys mentioned above are used and
// understood by the spec. Implementations or sub modules can pass
// other keys to the AssertionError's constructor - they will be
// ignored.

// 3. All of the following functions must throw an AssertionError
// when a corresponding condition is not met, with a message that
// may be undefined if not provided.  All assertion methods provide
// both the actual and expected values to the assertion error for
// display purposes.

function fail(actual, expected, message, operator, stackStartFunction) {
  throw new assert.AssertionError({
    message: message,
    actual: actual,
    expected: expected,
    operator: operator,
    stackStartFunction: stackStartFunction
  });
}

// EXTENSION! allows for well behaved errors defined elsewhere.
assert.fail = fail;

// 4. Pure assertion tests whether a value is truthy, as determined
// by !!guard.
// assert.ok(guard, message_opt);
// This statement is equivalent to assert.equal(true, !!guard,
// message_opt);. To test strictly for the value true, use
// assert.strictEqual(true, guard, message_opt);.

function ok(value, message) {
  if (!value) fail(value, true, message, '==', assert.ok);
}
assert.ok = ok;

// 5. The equality assertion tests shallow, coercive equality with
// ==.
// assert.equal(actual, expected, message_opt);

assert.equal = function equal(actual, expected, message) {
  if (actual != expected) fail(actual, expected, message, '==', assert.equal);
};

// 6. The non-equality assertion tests for whether two objects are not equal
// with != assert.notEqual(actual, expected, message_opt);

assert.notEqual = function notEqual(actual, expected, message) {
  if (actual == expected) {
    fail(actual, expected, message, '!=', assert.notEqual);
  }
};

// 7. The equivalence assertion tests a deep equality relation.
// assert.deepEqual(actual, expected, message_opt);

assert.deepEqual = function deepEqual(actual, expected, message) {
  if (!_deepEqual(actual, expected)) {
    fail(actual, expected, message, 'deepEqual', assert.deepEqual);
  }
};

function _deepEqual(actual, expected) {
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;
  } else if (util.isBuffer(actual) && util.isBuffer(expected)) {
    if (actual.length != expected.length) return false;

    for (var i = 0; i < actual.length; i++) {
      if (actual[i] !== expected[i]) return false;
    }

    return true;

    // 7.2. If the expected value is a Date object, the actual value is
    // equivalent if it is also a Date object that refers to the same time.
  } else if (util.isDate(actual) && util.isDate(expected)) {
    return actual.getTime() === expected.getTime();

    // 7.3 If the expected value is a RegExp object, the actual value is
    // equivalent if it is also a RegExp object with the same source and
    // properties (`global`, `multiline`, `lastIndex`, `ignoreCase`).
  } else if (util.isRegExp(actual) && util.isRegExp(expected)) {
    return actual.source === expected.source && actual.global === expected.global && actual.multiline === expected.multiline && actual.lastIndex === expected.lastIndex && actual.ignoreCase === expected.ignoreCase;

    // 7.4. Other pairs that do not both pass typeof value == 'object',
    // equivalence is determined by ==.
  } else if (!util.isObject(actual) && !util.isObject(expected)) {
    return actual == expected;

    // 7.5 For all other Object pairs, including Array objects, equivalence is
    // determined by having the same number of owned properties (as verified
    // with Object.prototype.hasOwnProperty.call), the same set of keys
    // (although not necessarily the same order), equivalent values for every
    // corresponding key, and an identical 'prototype' property. Note: this
    // accounts for both named and indexed properties on Arrays.
  } else {
    return objEquiv(actual, expected);
  }
}

function isArguments(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
}

function objEquiv(a, b) {
  if (util.isNullOrUndefined(a) || util.isNullOrUndefined(b)) return false;
  // an identical 'prototype' property.
  if (a.prototype !== b.prototype) return false;
  // if one is a primitive, the other must be same
  if (util.isPrimitive(a) || util.isPrimitive(b)) {
    return a === b;
  }
  var aIsArgs = isArguments(a),
      bIsArgs = isArguments(b);
  if (aIsArgs && !bIsArgs || !aIsArgs && bIsArgs) return false;
  if (aIsArgs) {
    a = pSlice.call(a);
    b = pSlice.call(b);
    return _deepEqual(a, b);
  }
  var ka = objectKeys(a),
      kb = objectKeys(b),
      key,
      i;
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length != kb.length) return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i]) return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!_deepEqual(a[key], b[key])) return false;
  }
  return true;
}

// 8. The non-equivalence assertion tests for any deep inequality.
// assert.notDeepEqual(actual, expected, message_opt);

assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
  if (_deepEqual(actual, expected)) {
    fail(actual, expected, message, 'notDeepEqual', assert.notDeepEqual);
  }
};

// 9. The strict equality assertion tests strict equality, as determined by ===.
// assert.strictEqual(actual, expected, message_opt);

assert.strictEqual = function strictEqual(actual, expected, message) {
  if (actual !== expected) {
    fail(actual, expected, message, '===', assert.strictEqual);
  }
};

// 10. The strict non-equality assertion tests for strict inequality, as
// determined by !==.  assert.notStrictEqual(actual, expected, message_opt);

assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
  if (actual === expected) {
    fail(actual, expected, message, '!==', assert.notStrictEqual);
  }
};

function expectedException(actual, expected) {
  if (!actual || !expected) {
    return false;
  }

  if (Object.prototype.toString.call(expected) == '[object RegExp]') {
    return expected.test(actual);
  } else if (actual instanceof expected) {
    return true;
  } else if (expected.call({}, actual) === true) {
    return true;
  }

  return false;
}

function _throws(shouldThrow, block, expected, message) {
  var actual;

  if (util.isString(expected)) {
    message = expected;
    expected = null;
  }

  try {
    block();
  } catch (e) {
    actual = e;
  }

  message = (expected && expected.name ? ' (' + expected.name + ').' : '.') + (message ? ' ' + message : '.');

  if (shouldThrow && !actual) {
    fail(actual, expected, 'Missing expected exception' + message);
  }

  if (!shouldThrow && expectedException(actual, expected)) {
    fail(actual, expected, 'Got unwanted exception' + message);
  }

  if (shouldThrow && actual && expected && !expectedException(actual, expected) || !shouldThrow && actual) {
    throw actual;
  }
}

// 11. Expected to throw an error:
// assert.throws(block, Error_opt, message_opt);

assert.throws = function (block, /*optional*/error, /*optional*/message) {
  _throws.apply(this, [true].concat(pSlice.call(arguments)));
};

// EXTENSION! This is annoying to write outside this module.
assert.doesNotThrow = function (block, /*optional*/message) {
  _throws.apply(this, [false].concat(pSlice.call(arguments)));
};

assert.ifError = function (err) {
  if (err) {
    throw err;
  }
};

var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) {
    if (hasOwn.call(obj, key)) keys.push(key);
  }
  return keys;
};

},{"util/":13}],7:[function(require,module,exports){
"use strict";

},{}],8:[function(require,module,exports){
(function (process){
'use strict';

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function splitPath(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function () {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = i >= 0 ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function (p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return (resolvedAbsolute ? '/' : '') + resolvedPath || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function (path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function (p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function (path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function () {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function (p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};

// path.relative(from, to)
// posix version
exports.relative = function (from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function (path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};

exports.basename = function (path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};

exports.extname = function (path) {
  return splitPath(path)[3];
};

function filter(xs, f) {
  if (xs.filter) return xs.filter(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    if (f(xs[i], i, xs)) res.push(xs[i]);
  }
  return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b' ? function (str, start, len) {
  return str.substr(start, len);
} : function (str, start, len) {
  if (start < 0) start = str.length + start;
  return str.substr(start, len);
};

}).call(this,require('_process'))
},{"_process":9}],9:[function(require,module,exports){
'use strict';

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout() {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
})();
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }
}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while (len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () {
    return '/';
};
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function () {
    return 0;
};

},{}],10:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

//
// strftime
// github.com/samsonjs/strftime
// @_sjs
//
// Copyright 2010 - 2015 Sami Samhuri <sami@samhuri.net>
//
// MIT License
// http://sjs.mit-license.org
//

;(function () {

    var DefaultLocale = {
        days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        shortDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        AM: 'AM',
        PM: 'PM',
        am: 'am',
        pm: 'pm',
        formats: {
            D: '%m/%d/%y',
            F: '%Y-%m-%d',
            R: '%H:%M',
            T: '%H:%M:%S',
            X: '%T',
            c: '%a %b %d %X %Y',
            r: '%I:%M:%S %p',
            v: '%e-%b-%Y',
            x: '%D'
        }
    },
        defaultStrftime = new Strftime(DefaultLocale, 0, false),
        isCommonJS = typeof module !== 'undefined',
        namespace;

    // CommonJS / Node module
    if (isCommonJS) {
        namespace = module.exports = adaptedStrftime;
        namespace.strftime = deprecatedStrftime;
    }
    // Browsers and other environments
    else {
            // Get the global object. Works in ES3, ES5, and ES5 strict mode.
            namespace = function () {
                return this || (1, eval)('this');
            }();
            namespace.strftime = adaptedStrftime;
        }

    // Deprecated API, to be removed in v1.0
    var _require = isCommonJS ? "require('strftime')" : "strftime";
    var _deprecationWarnings = {};
    function deprecationWarning(name, instead) {
        if (!_deprecationWarnings[name]) {
            if (typeof console !== 'undefined' && typeof console.warn == 'function') {
                console.warn("[WARNING] " + name + " is deprecated and will be removed in version 1.0. Instead, use `" + instead + "`.");
            }
            _deprecationWarnings[name] = true;
        }
    }

    namespace.strftimeTZ = deprecatedStrftimeTZ;
    namespace.strftimeUTC = deprecatedStrftimeUTC;
    namespace.localizedStrftime = deprecatedStrftimeLocalized;

    // Adapt the old API while preserving the new API.
    function adaptForwards(fn) {
        fn.localize = defaultStrftime.localize.bind(defaultStrftime);
        fn.timezone = defaultStrftime.timezone.bind(defaultStrftime);
        fn.utc = defaultStrftime.utc.bind(defaultStrftime);
    }

    adaptForwards(adaptedStrftime);
    function adaptedStrftime(fmt, d, locale) {
        // d and locale are optional, check if this is (format, locale)
        if (d && d.days) {
            locale = d;
            d = undefined;
        }
        if (locale) {
            deprecationWarning("`" + _require + "(format, [date], [locale])`", "var s = " + _require + ".localize(locale); s(format, [date])");
        }
        var strftime = locale ? defaultStrftime.localize(locale) : defaultStrftime;
        return strftime(fmt, d);
    }

    adaptForwards(deprecatedStrftime);
    function deprecatedStrftime(fmt, d, locale) {
        if (locale) {
            deprecationWarning("`" + _require + ".strftime(format, [date], [locale])`", "var s = " + _require + ".localize(locale); s(format, [date])");
        } else {
            deprecationWarning("`" + _require + ".strftime(format, [date])`", _require + "(format, [date])");
        }
        var strftime = locale ? defaultStrftime.localize(locale) : defaultStrftime;
        return strftime(fmt, d);
    }

    function deprecatedStrftimeTZ(fmt, d, locale, timezone) {
        // locale is optional, check if this is (format, date, timezone)
        if ((typeof locale == 'number' || typeof locale == 'string') && timezone == null) {
            timezone = locale;
            locale = undefined;
        }

        if (locale) {
            deprecationWarning("`" + _require + ".strftimeTZ(format, date, locale, tz)`", "var s = " + _require + ".localize(locale).timezone(tz); s(format, [date])` or `var s = " + _require + ".localize(locale); s.timezone(tz)(format, [date])");
        } else {
            deprecationWarning("`" + _require + ".strftimeTZ(format, date, tz)`", "var s = " + _require + ".timezone(tz); s(format, [date])` or `" + _require + ".timezone(tz)(format, [date])");
        }

        var strftime = (locale ? defaultStrftime.localize(locale) : defaultStrftime).timezone(timezone);
        return strftime(fmt, d);
    }

    var utcStrftime = defaultStrftime.utc();
    function deprecatedStrftimeUTC(fmt, d, locale) {
        if (locale) {
            deprecationWarning("`" + _require + ".strftimeUTC(format, date, locale)`", "var s = " + _require + ".localize(locale).utc(); s(format, [date])");
        } else {
            deprecationWarning("`" + _require + ".strftimeUTC(format, [date])`", "var s = " + _require + ".utc(); s(format, [date])");
        }
        var strftime = locale ? utcStrftime.localize(locale) : utcStrftime;
        return strftime(fmt, d);
    }

    function deprecatedStrftimeLocalized(locale) {
        deprecationWarning("`" + _require + ".localizedStrftime(locale)`", _require + ".localize(locale)");
        return defaultStrftime.localize(locale);
    }
    // End of deprecated API

    // Polyfill Date.now for old browsers.
    if (typeof Date.now !== 'function') {
        Date.now = function () {
            return +new Date();
        };
    }

    function Strftime(locale, customTimezoneOffset, useUtcTimezone) {
        var _locale = locale || DefaultLocale,
            _customTimezoneOffset = customTimezoneOffset || 0,
            _useUtcBasedDate = useUtcTimezone || false,


        // we store unix timestamp value here to not create new Date() each iteration (each millisecond)
        // Date.now() is 2 times faster than new Date()
        // while millisecond precise is enough here
        // this could be very helpful when strftime triggered a lot of times one by one
        _cachedDateTimestamp = 0,
            _cachedDate;

        function _strftime(format, date) {
            var timestamp;

            if (!date) {
                var currentTimestamp = Date.now();
                if (currentTimestamp > _cachedDateTimestamp) {
                    _cachedDateTimestamp = currentTimestamp;
                    _cachedDate = new Date(_cachedDateTimestamp);

                    timestamp = _cachedDateTimestamp;

                    if (_useUtcBasedDate) {
                        // how to avoid duplication of date instantiation for utc here?
                        // we tied to getTimezoneOffset of the current date
                        _cachedDate = new Date(_cachedDateTimestamp + getTimestampToUtcOffsetFor(_cachedDate) + _customTimezoneOffset);
                    }
                } else {
                    timestamp = _cachedDateTimestamp;
                }
                date = _cachedDate;
            } else {
                timestamp = date.getTime();

                if (_useUtcBasedDate) {
                    date = new Date(date.getTime() + getTimestampToUtcOffsetFor(date) + _customTimezoneOffset);
                }
            }

            return _processFormat(format, date, _locale, timestamp);
        }

        function _processFormat(format, date, locale, timestamp) {
            var resultString = '',
                padding = null,
                isInScope = false,
                length = format.length,
                extendedTZ = false;

            for (var i = 0; i < length; i++) {

                var currentCharCode = format.charCodeAt(i);

                if (isInScope === true) {
                    // '-'
                    if (currentCharCode === 45) {
                        padding = '';
                        continue;
                    }
                    // '_'
                    else if (currentCharCode === 95) {
                            padding = ' ';
                            continue;
                        }
                        // '0'
                        else if (currentCharCode === 48) {
                                padding = '0';
                                continue;
                            }
                            // ':'
                            else if (currentCharCode === 58) {
                                    if (extendedTZ) {
                                        if (typeof console !== 'undefined' && typeof console.warn == 'function') {
                                            console.warn("[WARNING] detected use of unsupported %:: or %::: modifiers to strftime");
                                        }
                                    }
                                    extendedTZ = true;
                                    continue;
                                }

                    switch (currentCharCode) {

                        // Examples for new Date(0) in GMT

                        // 'Thursday'
                        // case 'A':
                        case 65:
                            resultString += locale.days[date.getDay()];
                            break;

                        // 'January'
                        // case 'B':
                        case 66:
                            resultString += locale.months[date.getMonth()];
                            break;

                        // '19'
                        // case 'C':
                        case 67:
                            resultString += padTill2(Math.floor(date.getFullYear() / 100), padding);
                            break;

                        // '01/01/70'
                        // case 'D':
                        case 68:
                            resultString += _processFormat(locale.formats.D, date, locale, timestamp);
                            break;

                        // '1970-01-01'
                        // case 'F':
                        case 70:
                            resultString += _processFormat(locale.formats.F, date, locale, timestamp);
                            break;

                        // '00'
                        // case 'H':
                        case 72:
                            resultString += padTill2(date.getHours(), padding);
                            break;

                        // '12'
                        // case 'I':
                        case 73:
                            resultString += padTill2(hours12(date.getHours()), padding);
                            break;

                        // '000'
                        // case 'L':
                        case 76:
                            resultString += padTill3(Math.floor(timestamp % 1000));
                            break;

                        // '00'
                        // case 'M':
                        case 77:
                            resultString += padTill2(date.getMinutes(), padding);
                            break;

                        // 'am'
                        // case 'P':
                        case 80:
                            resultString += date.getHours() < 12 ? locale.am : locale.pm;
                            break;

                        // '00:00'
                        // case 'R':
                        case 82:
                            resultString += _processFormat(locale.formats.R, date, locale, timestamp);
                            break;

                        // '00'
                        // case 'S':
                        case 83:
                            resultString += padTill2(date.getSeconds(), padding);
                            break;

                        // '00:00:00'
                        // case 'T':
                        case 84:
                            resultString += _processFormat(locale.formats.T, date, locale, timestamp);
                            break;

                        // '00'
                        // case 'U':
                        case 85:
                            resultString += padTill2(weekNumber(date, 'sunday'), padding);
                            break;

                        // '00'
                        // case 'W':
                        case 87:
                            resultString += padTill2(weekNumber(date, 'monday'), padding);
                            break;

                        // '16:00:00'
                        // case 'X':
                        case 88:
                            resultString += _processFormat(locale.formats.X, date, locale, timestamp);
                            break;

                        // '1970'
                        // case 'Y':
                        case 89:
                            resultString += date.getFullYear();
                            break;

                        // 'GMT'
                        // case 'Z':
                        case 90:
                            if (_useUtcBasedDate && _customTimezoneOffset === 0) {
                                resultString += "GMT";
                            } else {
                                // fixme optimize
                                var tzString = date.toString().match(/\(([\w\s]+)\)/);
                                resultString += tzString && tzString[1] || '';
                            }
                            break;

                        // 'Thu'
                        // case 'a':
                        case 97:
                            resultString += locale.shortDays[date.getDay()];
                            break;

                        // 'Jan'
                        // case 'b':
                        case 98:
                            resultString += locale.shortMonths[date.getMonth()];
                            break;

                        // ''
                        // case 'c':
                        case 99:
                            resultString += _processFormat(locale.formats.c, date, locale, timestamp);
                            break;

                        // '01'
                        // case 'd':
                        case 100:
                            resultString += padTill2(date.getDate(), padding);
                            break;

                        // ' 1'
                        // case 'e':
                        case 101:
                            resultString += padTill2(date.getDate(), padding == null ? ' ' : padding);
                            break;

                        // 'Jan'
                        // case 'h':
                        case 104:
                            resultString += locale.shortMonths[date.getMonth()];
                            break;

                        // '000'
                        // case 'j':
                        case 106:
                            var y = new Date(date.getFullYear(), 0, 1);
                            var day = Math.ceil((date.getTime() - y.getTime()) / (1000 * 60 * 60 * 24));
                            resultString += padTill3(day);
                            break;

                        // ' 0'
                        // case 'k':
                        case 107:
                            resultString += padTill2(date.getHours(), padding == null ? ' ' : padding);
                            break;

                        // '12'
                        // case 'l':
                        case 108:
                            resultString += padTill2(hours12(date.getHours()), padding == null ? ' ' : padding);
                            break;

                        // '01'
                        // case 'm':
                        case 109:
                            resultString += padTill2(date.getMonth() + 1, padding);
                            break;

                        // '\n'
                        // case 'n':
                        case 110:
                            resultString += '\n';
                            break;

                        // '1st'
                        // case 'o':
                        case 111:
                            resultString += String(date.getDate()) + ordinal(date.getDate());
                            break;

                        // 'AM'
                        // case 'p':
                        case 112:
                            resultString += date.getHours() < 12 ? locale.AM : locale.PM;
                            break;

                        // '12:00:00 AM'
                        // case 'r':
                        case 114:
                            resultString += _processFormat(locale.formats.r, date, locale, timestamp);
                            break;

                        // '0'
                        // case 's':
                        case 115:
                            resultString += Math.floor(timestamp / 1000);
                            break;

                        // '\t'
                        // case 't':
                        case 116:
                            resultString += '\t';
                            break;

                        // '4'
                        // case 'u':
                        case 117:
                            var day = date.getDay();
                            resultString += day === 0 ? 7 : day;
                            break; // 1 - 7, Monday is first day of the week

                        // ' 1-Jan-1970'
                        // case 'v':
                        case 118:
                            resultString += _processFormat(locale.formats.v, date, locale, timestamp);
                            break;

                        // '4'
                        // case 'w':
                        case 119:
                            resultString += date.getDay();
                            break; // 0 - 6, Sunday is first day of the week

                        // '12/31/69'
                        // case 'x':
                        case 120:
                            resultString += _processFormat(locale.formats.x, date, locale, timestamp);
                            break;

                        // '70'
                        // case 'y':
                        case 121:
                            resultString += ('' + date.getFullYear()).slice(2);
                            break;

                        // '+0000'
                        // case 'z':
                        case 122:
                            if (_useUtcBasedDate && _customTimezoneOffset === 0) {
                                resultString += extendedTZ ? "+00:00" : "+0000";
                            } else {
                                var off;
                                if (_customTimezoneOffset !== 0) {
                                    off = _customTimezoneOffset / (60 * 1000);
                                } else {
                                    off = -date.getTimezoneOffset();
                                }
                                var sign = off < 0 ? '-' : '+';
                                var sep = extendedTZ ? ':' : '';
                                var hours = Math.floor(Math.abs(off / 60));
                                var mins = Math.abs(off % 60);
                                resultString += sign + padTill2(hours) + sep + padTill2(mins);
                            }
                            break;

                        default:
                            resultString += format[i];
                            break;
                    }

                    padding = null;
                    isInScope = false;
                    continue;
                }

                // '%'
                if (currentCharCode === 37) {
                    isInScope = true;
                    continue;
                }

                resultString += format[i];
            }

            return resultString;
        }

        var strftime = _strftime;

        strftime.localize = function (locale) {
            return new Strftime(locale || _locale, _customTimezoneOffset, _useUtcBasedDate);
        };

        strftime.timezone = function (timezone) {
            var customTimezoneOffset = _customTimezoneOffset;
            var useUtcBasedDate = _useUtcBasedDate;

            var timezoneType = typeof timezone === 'undefined' ? 'undefined' : _typeof(timezone);
            if (timezoneType === 'number' || timezoneType === 'string') {
                useUtcBasedDate = true;

                // ISO 8601 format timezone string, [-+]HHMM
                if (timezoneType === 'string') {
                    var sign = timezone[0] === '-' ? -1 : 1,
                        hours = parseInt(timezone.slice(1, 3), 10),
                        minutes = parseInt(timezone.slice(3, 5), 10);

                    customTimezoneOffset = sign * (60 * hours + minutes) * 60 * 1000;
                    // in minutes: 420
                } else if (timezoneType === 'number') {
                    customTimezoneOffset = timezone * 60 * 1000;
                }
            }

            return new Strftime(_locale, customTimezoneOffset, useUtcBasedDate);
        };

        strftime.utc = function () {
            return new Strftime(_locale, _customTimezoneOffset, true);
        };

        return strftime;
    }

    function padTill2(numberToPad, paddingChar) {
        if (paddingChar === '' || numberToPad > 9) {
            return numberToPad;
        }
        if (paddingChar == null) {
            paddingChar = '0';
        }
        return paddingChar + numberToPad;
    }

    function padTill3(numberToPad) {
        if (numberToPad > 99) {
            return numberToPad;
        }
        if (numberToPad > 9) {
            return '0' + numberToPad;
        }
        return '00' + numberToPad;
    }

    function hours12(hour) {
        if (hour === 0) {
            return 12;
        } else if (hour > 12) {
            return hour - 12;
        }
        return hour;
    }

    // firstWeekday: 'sunday' or 'monday', default is 'sunday'
    //
    // Pilfered & ported from Ruby's strftime implementation.
    function weekNumber(date, firstWeekday) {
        firstWeekday = firstWeekday || 'sunday';

        // This works by shifting the weekday back by one day if we
        // are treating Monday as the first day of the week.
        var weekday = date.getDay();
        if (firstWeekday === 'monday') {
            if (weekday === 0) // Sunday
                weekday = 6;else weekday--;
        }

        var firstDayOfYearUtc = Date.UTC(date.getFullYear(), 0, 1),
            dateUtc = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
            yday = Math.floor((dateUtc - firstDayOfYearUtc) / 86400000),
            weekNum = (yday + 7 - weekday) / 7;

        return Math.floor(weekNum);
    }

    // Get the ordinal suffix for a number: st, nd, rd, or th
    function ordinal(number) {
        var i = number % 10;
        var ii = number % 100;

        if (ii >= 11 && ii <= 13 || i === 0 || i >= 4) {
            return 'th';
        }
        switch (i) {
            case 1:
                return 'st';
            case 2:
                return 'nd';
            case 3:
                return 'rd';
        }
    }

    function getTimestampToUtcOffsetFor(date) {
        return (date.getTimezoneOffset() || 0) * 60000;
    }
})();

},{}],11:[function(require,module,exports){
'use strict';

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor;
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor;
    var TempCtor = function TempCtor() {};
    TempCtor.prototype = superCtor.prototype;
    ctor.prototype = new TempCtor();
    ctor.prototype.constructor = ctor;
  };
}

},{}],12:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

module.exports = function isBuffer(arg) {
  return arg && (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'object' && typeof arg.copy === 'function' && typeof arg.fill === 'function' && typeof arg.readUInt8 === 'function';
};

},{}],13:[function(require,module,exports){
(function (process,global){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function (f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function (x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s':
        return String(args[i++]);
      case '%d':
        return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};

// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function (fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function () {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};

var debugs = {};
var debugEnviron;
exports.debuglog = function (set) {
  if (isUndefined(debugEnviron)) debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function () {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function () {};
    }
  }
  return debugs[set];
};

/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;

// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold': [1, 22],
  'italic': [3, 23],
  'underline': [4, 24],
  'inverse': [7, 27],
  'white': [37, 39],
  'grey': [90, 39],
  'black': [30, 39],
  'blue': [34, 39],
  'cyan': [36, 39],
  'green': [32, 39],
  'magenta': [35, 39],
  'red': [31, 39],
  'yellow': [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};

function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str + '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}

function stylizeNoColor(str, styleType) {
  return str;
}

function arrayToHash(array) {
  var hash = {};

  array.forEach(function (val, idx) {
    hash[val] = true;
  });

  return hash;
}

function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect && value && isFunction(value.inspect) &&
  // Filter out the util module, it's inspect function is special
  value.inspect !== exports.inspect &&
  // Also filter out any prototype objects using the circular check.
  !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value) && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '',
      array = false,
      braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function (key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}

function formatPrimitive(ctx, value) {
  if (isUndefined(value)) return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '').replace(/'/g, "\\'").replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value)) return ctx.stylize('' + value, 'number');
  if (isBoolean(value)) return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value)) return ctx.stylize('null', 'null');
}

function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}

function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function (key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, key, true));
    }
  });
  return output;
}

function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function (line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function (line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}

function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function (prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] + (base === '' ? '' : base + '\n ') + ' ' + output.join(',\n  ') + ' ' + braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}

// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) && (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null || typeof arg === 'boolean' || typeof arg === 'number' || typeof arg === 'string' || (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'symbol' || // ES6 symbol
  typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = require('./support/isBuffer');

function objectToString(o) {
  return Object.prototype.toString.call(o);
}

function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}

var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()), pad(d.getMinutes()), pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}

// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function () {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};

/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = require('inherits');

exports._extend = function (origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./support/isBuffer":12,"_process":9,"inherits":11}],14:[function(require,module,exports){
"use strict";

var util = require('util');

function TokenizationError(message, input, line) {
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;

    this.message = message || "";
    this.input = input;
    this.line = line;
}
util.inherits(TokenizationError, Error);

function ParseError(message, input, line) {
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;

    this.message = message || "";
    this.input = input;
    this.line = line;
}
util.inherits(ParseError, Error);

module.exports = {
    TokenizationError: TokenizationError, ParseError: ParseError
};

},{"util":13}],15:[function(require,module,exports){
'use strict';

var syntax = require('./syntax.js');
var Exp = require('./expression.js');
var lexical = require('./lexical.js');

function evalExp(exp, scope) {
    if (!scope) throw new Error('unable to evalExp: scope undefined');
    var operatorREs = lexical.operators,
        match;
    for (var i = 0; i < operatorREs.length; i++) {
        var operatorRE = operatorREs[i];
        var expRE = new RegExp('^(' + lexical.quoteBalanced.source + ')(' + operatorRE.source + ')(' + lexical.quoteBalanced.source + ')$');
        if (match = exp.match(expRE)) {
            var l = evalExp(match[1], scope);
            var op = syntax.operators[match[2].trim()];
            var r = evalExp(match[3], scope);
            return op(l, r);
        }
    }

    if (match = exp.match(lexical.rangeLine)) {
        var low = evalValue(match[1], scope),
            high = evalValue(match[2], scope);
        var range = [];
        for (var j = low; j <= high; j++) {
            range.push(j);
        }
        return range;
    }

    return evalValue(exp, scope);
}

function evalValue(str, scope) {
    str = str && str.trim();
    if (!str) return undefined;

    if (lexical.isLiteral(str)) {
        var a = lexical.parseLiteral(str);
        return lexical.parseLiteral(str);
    }
    if (lexical.isVariable(str)) {
        return scope.get(str);
    }
}

function isTruthy(val) {
    if (val instanceof Array) return !!val.length;
    return !!val;
}

function isFalsy(val) {
    return !isTruthy(val);
}

module.exports = {
    evalExp: evalExp, evalValue: evalValue, isTruthy: isTruthy, isFalsy: isFalsy
};

},{"./expression.js":15,"./lexical.js":17,"./syntax.js":21}],16:[function(require,module,exports){
'use strict';

var lexical = require('./lexical.js');
var Exp = require('./expression.js');

var valueRE = new RegExp('' + lexical.value.source, 'g');

module.exports = function () {
    var filters = {};

    var _filterInstance = {
        render: function render(output, scope) {
            var args = this.args.map(function (arg) {
                return Exp.evalValue(arg, scope);
            });
            args.unshift(output);
            return this.filter.apply(null, args);
        },
        parse: function parse(str) {
            var match = lexical.filterLine.exec(str);
            if (!match) throw new Error('illegal filter: ' + str);

            var name = match[1],
                argList = match[2] || '',
                filter = filters[name];
            if (typeof filter !== 'function') {
                return {
                    name: name,
                    error: new Error('undefined filter: ' + name)
                };
            }

            var args = [];
            while (match = valueRE.exec(argList.trim())) {
                args.push(match[0]);
            }

            this.name = name;
            this.filter = filter;
            this.args = args;

            return this;
        }
    };

    function construct(str) {
        var instance = Object.create(_filterInstance);
        return instance.parse(str);
    }

    function register(name, filter) {
        filters[name] = filter;
    }

    function clear() {
        filters = {};
    }

    return {
        construct: construct, register: register, clear: clear
    };
};

},{"./expression.js":15,"./lexical.js":17}],17:[function(require,module,exports){
'use strict';

// quote related
var singleQuoted = /'[^']*'/;
var doubleQuoted = /"[^"]*"/;
var quoteBalanced = new RegExp('(?:' + singleQuoted.source + '|' + doubleQuoted.source + '|[^\'"])*');

var number = /(?:-?\d+\.?\d*|\.?\d+)/;
var bool = /true|false/;
var identifier = /[a-zA-Z_$][a-zA-Z_$0-9]*/;
var subscript = /\[\d+\]/;

var quoted = new RegExp('(?:' + singleQuoted.source + '|' + doubleQuoted.source + ')');
var literal = new RegExp('(?:' + quoted.source + '|' + bool.source + '|' + number.source + ')');
var variable = new RegExp(identifier.source + '(?:\\.' + identifier.source + '|' + subscript.source + ')*');

// range related
var rangeLimit = new RegExp('(?:' + variable.source + '|' + number.source + ')');
var range = new RegExp('\\(' + rangeLimit.source + '\\.\\.' + rangeLimit.source + '\\)');
var rangeCapture = new RegExp('\\((' + rangeLimit.source + ')\\.\\.(' + rangeLimit.source + ')\\)');

var value = new RegExp('(?:' + literal.source + '|' + variable.source + '|' + range.source + ')');

// hash related
var hash = new RegExp('(?:' + identifier.source + ')\\s*:\\s*(?:' + value.source + ')');
var hashCapture = new RegExp('(' + identifier.source + ')\\s*:\\s*(' + value.source + ')', 'g');

var tagLine = new RegExp('^\\s*(' + identifier.source + ')\\s*(.*)\\s*$');
var literalLine = new RegExp('^' + literal.source + '$', 'i');
var variableLine = new RegExp('^' + variable.source + '$');
var numberLine = new RegExp('^' + number.source + '$');
var boolLine = new RegExp('^' + bool.source + '$', 'i');
var quotedLine = new RegExp('^' + quoted.source + '$');
var rangeLine = new RegExp('^' + rangeCapture.source + '$');

// filter related
var valueList = new RegExp(value.source + '(\\s*,\\s*' + value.source + ')*');
var filter = new RegExp(identifier.source + '(?:\\s*:\\s*' + valueList.source + ')?', 'g');
var filterCapture = new RegExp('(' + identifier.source + ')(?:\\s*:\\s*(' + valueList.source + '))?');
var filterLine = new RegExp('^' + filterCapture.source + '$');

var operators = [/\s+or\s+/, /\s+and\s+/, /==|!=|<=|>=|<|>|\s+contains\s+/];

function isLiteral(str) {
    return literalLine.test(str);
}

function isRange(str) {
    return rangeLine.test(str);
}

function isVariable(str) {
    return variableLine.test(str);
}

function parseLiteral(str) {
    var res;
    if (res = str.match(numberLine)) {
        return Number(str);
    }
    if (res = str.match(boolLine)) {
        return str.toLowerCase() === 'true';
    }
    if (res = str.match(quotedLine)) {
        return str.slice(1, -1);
    }
}

module.exports = {
    quoted: quoted, number: number, bool: bool, literal: literal, filter: filter,
    hash: hash, hashCapture: hashCapture,
    range: range, rangeCapture: rangeCapture,
    identifier: identifier, value: value, quoteBalanced: quoteBalanced, operators: operators,
    quotedLine: quotedLine, numberLine: numberLine, boolLine: boolLine, rangeLine: rangeLine, literalLine: literalLine, filterLine: filterLine, tagLine: tagLine,
    isLiteral: isLiteral, isVariable: isVariable, parseLiteral: parseLiteral, isRange: isRange
};

},{}],18:[function(require,module,exports){
'use strict';

var lexical = require('./lexical.js');
var ParseError = require('./error.js').ParseError;

module.exports = function (Tag, Filter) {

    var stream = {
        init: function init(tokens) {
            this.tokens = tokens;
            this.handlers = {};
            return this;
        },
        on: function on(name, cb) {
            this.handlers[name] = cb;
            return this;
        },
        trigger: function trigger(event, arg) {
            var h = this.handlers[event];
            if (typeof h === 'function') {
                h(arg);
                return true;
            }
        },
        start: function start() {
            this.trigger('start');
            while (!this.stopRequested && (token = this.tokens.shift())) {
                if (this.trigger('token', token)) continue;
                if (token.type == 'tag' && this.trigger('tag:' + token.name, token)) {
                    continue;
                }
                var template = parseToken(token, this.tokens);
                this.trigger('template', template);
            }
            if (!this.stopRequested) this.trigger('end');
            return this;
        },
        stop: function stop() {
            this.stopRequested = true;
            return this;
        }
    };

    function parse(tokens) {
        var token,
            templates = [];
        while (token = tokens.shift()) {
            templates.push(parseToken(token, tokens));
        }
        return templates;
    }

    function parseToken(token, tokens) {
        try {
            switch (token.type) {
                case 'tag':
                    return parseTag(token, tokens);
                case 'output':
                    return parseOutput(token.value);
                case 'html':
                    return token;
            }
        } catch (e) {
            throw new ParseError(e.message, token.input, token.line);
        }
    }

    function parseTag(token, tokens) {
        if (token.name === 'continue' || token.name === 'break') return token;
        return Tag.construct(token, tokens);
    }

    function parseOutput(str) {
        var match = lexical.value.exec(str);
        if (!match) throw new Error('illegal output string: ' + str);

        var initial = match[0];
        str = str.substr(match.index + match[0].length);

        var filters = [];
        while (match = lexical.filter.exec(str)) {
            filters.push([match[0].trim()]);
        }

        return {
            type: 'output',
            initial: initial,
            filters: filters.map(function (str) {
                return Filter.construct(str);
            })
        };
    }

    function parseStream(tokens) {
        var s = Object.create(stream);
        return s.init(tokens);
    }

    return {
        parse: parse, parseTag: parseTag, parseStream: parseStream, parseOutput: parseOutput
    };
};

},{"./error.js":14,"./lexical.js":17}],19:[function(require,module,exports){
'use strict';

var error = require('./error.js');
var Exp = require('./expression.js');
var assert = require('assert');
var Promise = require('any-promise');

var render = {

    renderTemplates: function renderTemplates(templates, scope, opts) {
        var _this = this;

        assert(scope, 'unable to evalTemplates: scope undefined');
        opts = opts || {};
        opts.strict_filters = opts.strict_filters || false;

        var html = '';

        // This executes an array of promises sequentially for every template in the templates array - http://webcache.googleusercontent.com/search?q=cache:rNbMUn9TPtkJ:joost.vunderink.net/blog/2014/12/15/processing-an-array-of-promises-sequentially-in-node-js/+&cd=5&hl=en&ct=clnk&gl=us
        // It's fundamentally equivalent to the following...
        //  emptyPromise.then(renderTag(template0).then(renderTag(template1).then(renderTag(template2)...
        var lastPromise = templates.reduce(function (promise, template) {
            return promise.then(function (partial) {
                if (scope.safeGet('forloop.skip')) {
                    return Promise.resolve('');
                }
                if (scope.safeGet('forloop.stop')) {
                    throw new Error('forloop.stop'); // this will stop/break the sequential promise chain and go to the catch
                }

                var promiseLink = Promise.resolve('');
                switch (template.type) {
                    case 'tag':
                        // Add Promises to the chain
                        promiseLink = _this.renderTag(template, scope, _this.register).then(function (partial) {
                            if (partial === undefined) {
                                return true; // basically a noop (do nothing)
                            }
                            return html += partial;
                        });
                        break;
                    case 'html':
                        promiseLink = Promise.resolve(template.value).then(function (partial) {
                            return html += partial;
                        });
                        break;
                    case 'output':
                        var val = _this.evalOutput(template, scope, opts);
                        promiseLink = Promise.resolve(val === undefined ? '' : stringify(val)).then(function (partial) {
                            return html += partial;
                        });
                        break;
                }

                return promiseLink;
            }).catch(function (error) {
                if (error.message === 'forloop.skip') {
                    // the error is a controlled, purposeful stop. so just return the html that we have up to this point
                    return html;
                } else {
                    // rethrow actual error
                    throw error;
                }
            });
        }, Promise.resolve('')); // start the reduce chain with a resolved Promise. After first run, the "promise" argument
        //  in our reduce callback will be the returned promise from our "then" above.  In this
        //  case, that's the promise returned from this.renderTag or a resolved promise with raw html.

        return lastPromise.then(function (renderedHtml) {
            return renderedHtml;
        }).catch(function (error) {
            throw error;
        });
    },

    renderTag: function renderTag(template, scope, register) {
        if (template.name === 'continue') {
            scope.set('forloop.skip', true);
            return Promise.resolve('');
        }
        if (template.name === 'break') {
            scope.set('forloop.stop', true);
            scope.set('forloop.skip', true);
            return Promise.reject(new Error('forloop.stop')); // this will stop the sequential promise chain
        }
        return template.render(scope, register);
    },

    evalOutput: function evalOutput(template, scope, opts) {
        assert(scope, 'unable to evalOutput: scope undefined');
        var val = Exp.evalExp(template.initial, scope);
        template.filters.some(function (filter) {
            if (filter.error) {
                if (opts.strict_filters) {
                    throw filter.error;
                } else {
                    // render as null
                    val = '';
                    return true;
                }
            }
            val = filter.render(val, scope);
        });
        return val;
    },

    resetRegisters: function resetRegisters() {
        return this.register = {};
    }
};

function factory() {
    var instance = Object.create(render);
    instance.register = {};
    return instance;
}

function stringify(val) {
    if (typeof val === 'string') return val;
    return JSON.stringify(val);
}

module.exports = factory;

},{"./error.js":14,"./expression.js":15,"any-promise":3,"assert":6}],20:[function(require,module,exports){
'use strict';

var lexical = require('./lexical.js');

var Scope = {
    safeGet: function safeGet(str) {
        var i;
        // get all
        if (str === undefined) {
            var ctx = {};
            for (i = this.scopes.length - 1; i >= 0; i--) {
                var scp = this.scopes[i];
                for (var k in scp) {
                    if (scp.hasOwnProperty(k)) {
                        ctx[k] = scp[k];
                    }
                }
            }
            return ctx;
        }
        // get one path
        for (i = this.scopes.length - 1; i >= 0; i--) {
            var v = getPropertyByPath(this.scopes[i], str);
            if (v !== undefined) return v;
        }
    },
    get: function get(str) {
        var val = this.safeGet(str);
        if (val === undefined && this.opts.strict) {
            throw new Error('[strict_variables] undefined variable: ' + str);
        }
        return val;
    },
    set: function set(k, v) {
        setPropertyByPath(this.scopes[this.scopes.length - 1], k, v);
        return this;
    },
    push: function push(ctx) {
        if (!ctx) throw new Error('trying to push ' + ctx + ' into scopes');
        return this.scopes.push(ctx);
    },
    pop: function pop() {
        return this.scopes.pop();
    }
};

function setPropertyByPath(obj, path, val) {
    if (path instanceof String || typeof path === 'string') {
        var paths = path.replace(/\[/g, '.').replace(/\]/g, '').split('.');
        for (var i = 0; i < paths.length; i++) {
            var key = paths[i];
            if (i === paths.length - 1) {
                return obj[key] = val;
            }
            if (undefined === obj[key]) obj[key] = {};
            // case for readonly objects
            obj = obj[key] || {};
        }
        return obj;
    }
    return obj[path] = val;
}

function getPropertyByPath(obj, path) {
    if (path instanceof String || typeof path === 'string') {
        var paths = path.replace(/\[/g, '.').replace(/\]/g, '').split('.');
        paths.forEach(function (p) {
            return obj = obj && obj[p];
        });
        return obj;
    }
    return obj[path];
}

exports.factory = function (_ctx, opts) {
    opts = opts || {};
    opts.strict = opts.strict || false;

    var scope = Object.create(Scope);
    scope.opts = opts;
    scope.scopes = [_ctx || {}];
    return scope;
};

},{"./lexical.js":17}],21:[function(require,module,exports){
'use strict';

var operators = {
    '==': function _(l, r) {
        return l == r;
    },
    '!=': function _(l, r) {
        return l != r;
    },
    '>': function _(l, r) {
        return l > r;
    },
    '<': function _(l, r) {
        return l < r;
    },
    '>=': function _(l, r) {
        return l >= r;
    },
    '<=': function _(l, r) {
        return l <= r;
    },
    'contains': function contains(l, r) {
        return l.indexOf(r) > -1;
    },
    'and': function and(l, r) {
        return l && r;
    },
    'or': function or(l, r) {
        return l || r;
    }
};

exports.operators = operators;

},{}],22:[function(require,module,exports){
'use strict';

var lexical = require('./lexical.js');
var Promise = require('any-promise');
var Exp = require('./expression.js');
var TokenizationError = require('./error.js').TokenizationError;

function hash(markup, scope) {
    var obj = {};
    lexical.hashCapture.lastIndex = 0;
    while (match = lexical.hashCapture.exec(markup)) {
        var k = match[1],
            v = match[2];
        obj[k] = Exp.evalValue(v, scope);
    }
    return obj;
}

module.exports = function () {
    var tagImpls = {};

    var _tagInstance = {
        render: function render(scope, register) {
            var reg = register[this.name];
            if (!reg) reg = register[this.name] = {};
            var obj = hash(this.token.args, scope);
            return this.tagImpl.render && this.tagImpl.render(scope, obj, reg) || Promise.resolve('');
        },
        parse: function parse(token, tokens) {
            this.type = 'tag';
            this.token = token;
            this.name = token.name;

            var tagImpl = tagImpls[this.name];
            if (!tagImpl) throw new Error('tag ' + this.name + ' not found');
            this.tagImpl = Object.create(tagImpl);
            if (this.tagImpl.parse) {
                this.tagImpl.parse(token, tokens);
            }
        }
    };

    function register(name, tag) {
        tagImpls[name] = tag;
    }

    function construct(token, tokens) {
        var instance = Object.create(_tagInstance);
        instance.parse(token, tokens);
        return instance;
    }

    function clear() {
        tagImpls = {};
    }

    return {
        construct: construct, register: register, clear: clear
    };
};

},{"./error.js":14,"./expression.js":15,"./lexical.js":17,"any-promise":3}],23:[function(require,module,exports){
'use strict';

var lexical = require('./lexical.js');
var TokenizationError = require('./error.js').TokenizationError;

function parse(html) {
    var tokens = [];
    if (!html) return tokens;

    var syntax = /({%(.*?)%})|({{(.*?)}})/g;
    var result, htmlFragment, token;
    var lastMatchEnd = 0,
        lastMatchBegin = -1,
        parsedLinesCount = 0;

    while ((result = syntax.exec(html)) !== null) {
        // passed html fragments
        if (result.index > lastMatchEnd) {
            htmlFragment = html.slice(lastMatchEnd, result.index);
            tokens.push({
                type: 'html',
                raw: htmlFragment,
                value: htmlFragment
            });
        }
        // tag appeared
        if (result[1]) {
            token = factory('tag', 1, result);

            var match = token.value.match(lexical.tagLine);
            if (!match) {
                throw new TokenizationError('illegal tag: ' + token.raw, token.input, token.line);
            }
            token.name = match[1];
            token.args = match[2];

            tokens.push(token);
        }
        // output
        else {
                token = factory('output', 3, result);
                tokens.push(token);
            }
        lastMatchEnd = syntax.lastIndex;
    }

    // remaining html
    if (html.length > lastMatchEnd) {
        htmlFragment = html.slice(lastMatchEnd, html.length);
        tokens.push({
            type: 'html',
            raw: htmlFragment,
            value: htmlFragment
        });
    }
    return tokens;

    function factory(type, offset, match) {
        return {
            type: type,
            raw: match[offset],
            value: match[offset + 1].trim(),
            line: getLineNum(match),
            input: getLineContent(match)
        };
    }

    function getLineContent(match) {
        var idx1 = match.input.lastIndexOf('\n', match.index);
        var idx2 = match.input.indexOf('\n', match.index);
        if (idx2 === -1) idx2 = match.input.length;
        return match.input.slice(idx1 + 1, idx2);
    }

    function getLineNum(match) {
        var lines = match.input.slice(lastMatchBegin + 1, match.index).split('\n');
        parsedLinesCount += lines.length - 1;
        lastMatchBegin = match.index;
        return parsedLinesCount + 1;
    }
}

exports.parse = parse;

},{"./error.js":14,"./lexical.js":17}],24:[function(require,module,exports){
'use strict';

var Liquid = require('..');
var Promise = require('any-promise');
var lexical = Liquid.lexical;
var re = new RegExp('(' + lexical.identifier.source + ')\\s*=(.*)');

module.exports = function (liquid) {

    liquid.registerTag('assign', {
        parse: function parse(token) {
            var match = token.args.match(re);
            if (!match) throw new Error('illegal token ' + token.raw);
            this.key = match[1];
            this.value = match[2];
        },
        render: function render(scope, hash) {
            scope.set(this.key, liquid.evalOutput(this.value, scope));
            return Promise.resolve('');
        }
    });
};

},{"..":2,"any-promise":3}],25:[function(require,module,exports){
'use strict';

var Liquid = require('..');
var lexical = Liquid.lexical;
var re = new RegExp('(' + lexical.identifier.source + ')');

module.exports = function (liquid) {

    liquid.registerTag('capture', {
        parse: function parse(tagToken, remainTokens) {
            var _this = this;

            var match = tagToken.args.match(re);
            if (!match) throw new Error(tagToken.args + ' not valid identifier');

            this.variable = match[1];
            this.templates = [];

            var stream = liquid.parser.parseStream(remainTokens);
            stream.on('tag:endcapture', function (token) {
                return stream.stop();
            }).on('template', function (tpl) {
                return _this.templates.push(tpl);
            }).on('end', function (x) {
                throw new Error('tag ' + tagToken.raw + ' not closed');
            });
            stream.start();
        },
        render: function render(scope, hash) {
            var _this2 = this;

            return liquid.renderer.renderTemplates(this.templates, scope).then(function (html) {
                scope.set(_this2.variable, html);
            });
        }
    });
};

},{"..":2}],26:[function(require,module,exports){
'use strict';

var Liquid = require('..');
var lexical = Liquid.lexical;

module.exports = function (liquid) {
    liquid.registerTag('case', {

        parse: function parse(tagToken, remainTokens) {
            var _this = this;

            this.cond = tagToken.args;
            this.cases = [];
            this.elseTemplates = [];

            var p = [],
                stream = liquid.parser.parseStream(remainTokens).on('tag:when', function (token) {
                if (!_this.cases[token.args]) {
                    _this.cases.push({
                        val: token.args,
                        templates: p = []
                    });
                }
            }).on('tag:else', function (token) {
                return p = _this.elseTemplates;
            }).on('tag:endcase', function (token) {
                return stream.stop();
            }).on('template', function (tpl) {
                return p.push(tpl);
            }).on('end', function (x) {
                throw new Error('tag ' + tagToken.raw + ' not closed');
            });

            stream.start();
        },

        render: function render(scope, hash) {
            for (var i = 0; i < this.cases.length; i++) {
                var branch = this.cases[i];
                var val = Liquid.evalExp(branch.val, scope);
                var cond = Liquid.evalExp(this.cond, scope);
                if (val === cond) {
                    return liquid.renderer.renderTemplates(branch.templates, scope);
                }
            }
            return liquid.renderer.renderTemplates(this.elseTemplates, scope);
        }

    });
};

},{"..":2}],27:[function(require,module,exports){
'use strict';

var Liquid = require('..');
var lexical = Liquid.lexical;
var re = new RegExp('(' + lexical.identifier.source + ')');

module.exports = function (liquid) {

    liquid.registerTag('comment', {
        parse: function parse(tagToken, remainTokens) {
            var stream = liquid.parser.parseStream(remainTokens);
            stream.on('token', function (token) {
                if (token.name === 'endcomment') stream.stop();
            }).on('end', function (x) {
                throw new Error('tag ' + tagToken.raw + ' not closed');
            });
            stream.start();
        }
    });
};

},{"..":2}],28:[function(require,module,exports){
'use strict';

var Liquid = require('..');
var Promise = require('any-promise');
var lexical = Liquid.lexical;
var groupRE = new RegExp('^(?:(' + lexical.value.source + ')\\s*:\\s*)?(.*)$');
var candidatesRE = new RegExp(lexical.value.source, 'g');

module.exports = function (liquid) {
    liquid.registerTag('cycle', {

        parse: function parse(tagToken, remainTokens) {
            var match = groupRE.exec(tagToken.args);
            if (!match) throw new Error('illegal tag: ' + tagToken.raw);

            this.group = match[1] || '';
            var candidates = match[2];

            this.candidates = [];

            while (match = candidatesRE.exec(candidates)) {
                this.candidates.push(match[0]);
            }

            if (!this.candidates.length) {
                throw new Error('empty candidates: ' + tagToken.raw);
            }
        },

        render: function render(scope, hash, register) {
            var fingerprint = Liquid.evalValue(this.group, scope) + ':' + this.candidates.join(',');
            var idx = register[fingerprint];

            if (idx === undefined) {
                idx = register[fingerprint] = 0;
            }

            var candidate = this.candidates[idx];
            idx = (idx + 1) % this.candidates.length;
            register[fingerprint] = idx;

            return Promise.resolve(Liquid.evalValue(candidate, scope));
        }
    });
};

},{"..":2,"any-promise":3}],29:[function(require,module,exports){
'use strict';

var Liquid = require('..');
var lexical = Liquid.lexical;
var error = Liquid.error;

module.exports = function (liquid) {

    liquid.registerTag('decrement', {
        parse: function parse(token) {
            var match = token.args.match(lexical.identifier);
            if (!match) throw new Error('illegal identifier ' + token.args);
            this.variable = match[0];
        },
        render: function render(scope, hash) {
            var v = scope.get(this.variable);
            if (typeof v !== 'number') v = 0;
            scope.set(this.variable, v - 1);
        }
    });
};

},{"..":2}],30:[function(require,module,exports){
'use strict';

var Liquid = require('..');
var Promise = require('any-promise');
var lexical = Liquid.lexical;
var re = new RegExp('^(' + lexical.identifier.source + ')\\s+in\\s+' + ('(' + lexical.value.source + ')') + ('(?:\\s+' + lexical.hash.source + ')*') + '(?:\\s+(reversed))?$');

module.exports = function (liquid) {
    liquid.registerTag('for', {

        parse: function parse(tagToken, remainTokens) {
            var _this = this;

            var match = re.exec(tagToken.args);
            if (!match) throw new Error('illegal tag: ' + tagToken.raw);
            this.variable = match[1];
            this.collection = match[2];
            this.reversed = !!match[3];

            this.templates = [];
            this.elseTemplates = [];

            var p,
                stream = liquid.parser.parseStream(remainTokens).on('start', function (x) {
                return p = _this.templates;
            }).on('tag:else', function (token) {
                return p = _this.elseTemplates;
            }).on('tag:endfor', function (token) {
                return stream.stop();
            }).on('template', function (tpl) {
                return p.push(tpl);
            }).on('end', function (x) {
                throw new Error('tag ' + tagToken.raw + ' not closed');
            });

            stream.start();
        },

        render: function render(scope, hash) {
            var _this2 = this;

            var collection = Liquid.evalExp(this.collection, scope);
            if (Liquid.isFalsy(collection)) {
                return liquid.renderer.renderTemplates(this.elseTemplates, scope);
            }

            var html = '';
            var length = collection.length;
            var offset = hash.offset || 0;
            var limit = hash.limit === undefined ? collection.length : hash.limit;

            collection = collection.slice(offset, offset + limit);
            if (this.reversed) collection.reverse();

            // for needs to execute the promises sequentially, not just resolve them sequentially, due to break and continue.
            // We can't just loop through executing everything then resolve them all sequentially like we do for render.renderTemplates
            // First, we build the array of parameters we are going to use for each call to renderTemplates
            var contexts = [];
            collection.some(function (item, i) {
                var ctx = {};
                ctx[_this2.variable] = item;
                ctx.forloop = {
                    first: i === 0,
                    index: i + 1,
                    index0: i,
                    last: i === length - 1,
                    length: length,
                    rindex: length - i,
                    rindex0: length - i - 1,
                    stop: false,
                    skip: false
                };
                // We are just putting together an array of the arguments we will be passing to our sequential promises
                contexts.push(ctx);
            });

            // This is some pretty tricksy javascript, at least to me.
            // This executes an array of promises sequentially for every argument in the contexts array - http://webcache.googleusercontent.com/search?q=cache:rNbMUn9TPtkJ:joost.vunderink.net/blog/2014/12/15/processing-an-array-of-promises-sequentially-in-node-js/+&cd=5&hl=en&ct=clnk&gl=us
            // It's fundamentally equivalent to the following...
            //  emptyPromise.then(renderTemplates(args0).then(renderTemplates(args1).then(renderTemplates(args2)...
            var lastPromise = contexts.reduce(function (promise, context) {
                return promise.then(function (partial) {
                    if (scope.get('forloop.stop')) {
                        throw new Error('forloop.stop'); // this will stop the sequential promise chain
                    }

                    return html += partial;
                }).then(function (partial) {
                    // todo: Make sure our scope management is sound here.  Create some tests that revolve around loops
                    //  with sections that take differing amounts of time to complete.  Make sure the order is maintained
                    //  and scope doesn't bleed over into other renderTemplate calls.
                    scope.push(context);
                    return liquid.renderer.renderTemplates(_this2.templates, scope);
                }).then(function (partial) {
                    scope.pop(context);
                    return partial;
                });
            }, Promise.resolve('')); // start the reduce chain with a resolved Promise. After first run, the "promise" argument
            //  in our reduce callback will be the returned promise from our "then" above.  In this
            //  case, the promise returned from liquid.renderer.renderTemplates.

            return lastPromise.then(function (partial) {
                return html += partial;
            }).catch(function (error) {
                if (error.message === 'forloop.stop') {
                    // the error is a controlled, purposeful stop. so just return the html that we have up to this point
                    return html;
                } else {
                    // rethrow actual error
                    throw error;
                }
            });
        }
    });
};

},{"..":2,"any-promise":3}],31:[function(require,module,exports){
'use strict';

var Liquid = require('..');
var lexical = Liquid.lexical;

module.exports = function (liquid) {
    liquid.registerTag('if', {

        parse: function parse(tagToken, remainTokens) {
            var _this = this;

            this.branches = [];
            this.elseTemplates = [];

            var p,
                stream = liquid.parser.parseStream(remainTokens).on('start', function (x) {
                return _this.branches.push({
                    cond: tagToken.args,
                    templates: p = []
                });
            }).on('tag:elsif', function (token) {
                if (!_this.branches[token.args]) {
                    _this.branches.push({
                        cond: token.args,
                        templates: p = []
                    });
                }
            }).on('tag:else', function (token) {
                return p = _this.elseTemplates;
            }).on('tag:endif', function (token) {
                return stream.stop();
            }).on('template', function (tpl) {
                return p.push(tpl);
            }).on('end', function (x) {
                throw new Error('tag ' + tagToken.raw + ' not closed');
            });

            stream.start();
        },

        render: function render(scope, hash) {
            for (var i = 0; i < this.branches.length; i++) {
                var branch = this.branches[i];
                var cond = Liquid.evalExp(branch.cond, scope);
                if (Liquid.isTruthy(cond)) {
                    return liquid.renderer.renderTemplates(branch.templates, scope);
                }
            }
            return liquid.renderer.renderTemplates(this.elseTemplates, scope);
        }

    });
};

},{"..":2}],32:[function(require,module,exports){
'use strict';

var Liquid = require('..');
var Promise = require('any-promise');
var lexical = Liquid.lexical;
var withRE = new RegExp('with\\s+(' + lexical.value.source + ')');

module.exports = function (liquid) {

    liquid.registerTag('include', {
        parse: function parse(token) {
            var match = lexical.value.exec(token.args);
            if (!match) throw new Error('illegal token ' + token.raw);
            this.value = match[0];

            match = withRE.exec(token.args);
            if (match) {
                this.with = match[1];
            }
        },
        render: function render(scope, hash) {
            var filepath = Liquid.evalValue(this.value, scope);
            if (this.with) {
                hash[filepath] = Liquid.evalValue(this.with, scope);
            }
            return liquid.handleCache(filepath).then(function (templates) {
                scope.push(hash);
                return liquid.renderer.renderTemplates(templates, scope);
            }).then(function (html) {
                scope.pop();
                return html;
            });
        }
    });
};

},{"..":2,"any-promise":3}],33:[function(require,module,exports){
'use strict';

var Liquid = require('..');
var lexical = Liquid.lexical;

module.exports = function (liquid) {

    liquid.registerTag('increment', {
        parse: function parse(token) {
            var match = token.args.match(lexical.identifier);
            if (!match) throw new Error('illegal identifier ' + token.args);
            this.variable = match[0];
        },
        render: function render(scope, hash) {
            var v = scope.get(this.variable);
            if (typeof v !== 'number') v = 0;
            scope.set(this.variable, v + 1);
        }
    });
};

},{"..":2}],34:[function(require,module,exports){
"use strict";

module.exports = function (engine) {
    require("./assign.js")(engine);
    require("./capture.js")(engine);
    require("./case.js")(engine);
    require("./comment.js")(engine);
    require("./cycle.js")(engine);
    require("./decrement.js")(engine);
    require("./for.js")(engine);
    require("./if.js")(engine);
    require("./include.js")(engine);
    require("./increment.js")(engine);
    require("./layout.js")(engine);
    require("./raw.js")(engine);
    require("./tablerow.js")(engine);
    require("./unless.js")(engine);
};

},{"./assign.js":24,"./capture.js":25,"./case.js":26,"./comment.js":27,"./cycle.js":28,"./decrement.js":29,"./for.js":30,"./if.js":31,"./include.js":32,"./increment.js":33,"./layout.js":35,"./raw.js":36,"./tablerow.js":37,"./unless.js":38}],35:[function(require,module,exports){
'use strict';

var Liquid = require('..');
var Promise = require('any-promise');
var lexical = Liquid.lexical;
var withRE = new RegExp('with\\s+(' + lexical.value.source + ')');

module.exports = function (liquid) {

    liquid.registerTag('layout', {
        parse: function parse(token, remainTokens) {
            var match = lexical.value.exec(token.args);
            if (!match) throw new Error('illegal token ' + token.raw);

            this.layout = match[0];
            this.tpls = liquid.parser.parse(remainTokens);
        },
        render: function render(scope, hash) {
            var layout = Liquid.evalValue(this.layout, scope);

            var html = '';
            scope.push({});
            // not sure if this first one is needed, since the results are ignored
            return liquid.renderer.renderTemplates(this.tpls, scope).then(function (partial) {
                html += partial;
                return liquid.handleCache(layout);
            }).then(function (templates) {
                return liquid.renderer.renderTemplates(templates, scope);
            }).then(function (partial) {
                scope.pop();
                return partial;
            }).catch(function (e) {
                e.file = layout;
                throw e;
            });

            //            var tpl = liquid.handleCache(layout);
            //
            //            scope.push({});
            //            liquid.renderer.renderTemplates(this.tpls, scope);  // what's the point of this line?
            //            var html = liquid.renderer.renderTemplates(tpl, scope);
            //            scope.pop();
            //            return html;
        }
    });

    liquid.registerTag('block', {
        parse: function parse(token, remainTokens) {
            var _this = this;

            var match = /\w+/.exec(token.args);
            this.block = match ? match[0] : '';

            this.tpls = [];
            var p,
                stream = liquid.parser.parseStream(remainTokens).on('tag:endblock', function (token) {
                return stream.stop();
            }).on('template', function (tpl) {
                return _this.tpls.push(tpl);
            }).on('end', function (x) {
                throw new Error('tag ' + token.raw + ' not closed');
            });
            stream.start();
        },
        render: function render(scope, hash) {
            var _this2 = this;

            var html = scope.get('_liquid.blocks.' + this.block);
            var promise = Promise.resolve('');
            if (html === undefined) {
                promise = liquid.renderer.renderTemplates(this.tpls, scope).then(function (partial) {
                    scope.set('_liquid.blocks.' + _this2.block, partial);
                    return partial;
                });
            } else {
                scope.set('_liquid.blocks.' + this.block, html);
                promise = Promise.resolve(html);
            }
            return promise;

            //            if(html === undefined){
            //                html = liquid.renderer.renderTemplates(this.tpls, scope);
            //            }
            //            scope.set(`_liquid.blocks.${this.block}`, html);
            //            return html;
        }
    });
};

},{"..":2,"any-promise":3}],36:[function(require,module,exports){
'use strict';

var Liquid = require('..');
var Promise = require('any-promise');
var lexical = Liquid.lexical;
var re = new RegExp('(' + lexical.identifier.source + ')');

module.exports = function (liquid) {

    liquid.registerTag('raw', {
        parse: function parse(tagToken, remainTokens) {
            var _this = this;

            this.tokens = [];

            var stream = liquid.parser.parseStream(remainTokens);
            stream.on('token', function (token) {
                if (token.name === 'endraw') stream.stop();else _this.tokens.push(token);
            }).on('end', function (x) {
                throw new Error('tag ' + tagToken.raw + ' not closed');
            });
            stream.start();
        },
        render: function render(scope, hash) {
            var tokens = this.tokens.map(function (token) {
                return token.raw;
            }).join('');
            return Promise.resolve(tokens);
        }
    });
};

},{"..":2,"any-promise":3}],37:[function(require,module,exports){
'use strict';

var Liquid = require('..');
var Promise = require('any-promise');
var lexical = Liquid.lexical;
var re = new RegExp('^(' + lexical.identifier.source + ')\\s+in\\s+' + ('(' + lexical.value.source + ')') + ('(?:\\s+' + lexical.hash.source + ')*$'));

module.exports = function (liquid) {
    liquid.registerTag('tablerow', {

        parse: function parse(tagToken, remainTokens) {
            var _this = this;

            var match = re.exec(tagToken.args);
            if (!match) throw new Error('illegal tag: ' + tagToken.raw);
            this.variable = match[1];
            this.collection = match[2];

            this.templates = [];

            var p,
                stream = liquid.parser.parseStream(remainTokens).on('start', function (x) {
                return p = _this.templates;
            }).on('tag:endtablerow', function (token) {
                return stream.stop();
            }).on('template', function (tpl) {
                return p.push(tpl);
            }).on('end', function (x) {
                throw new Error('tag ' + tagToken.raw + ' not closed');
            });

            stream.start();
        },

        render: function render(scope, hash) {
            var _this2 = this;

            var collection = Liquid.evalExp(this.collection, scope) || [];

            var html = '<table>',
                promiseChain = Promise.resolve(''); // create an empty promise to begin the chain
            length = collection.length;
            var offset = hash.offset || 0;
            var limit = hash.limit === undefined ? collection.length : hash.limit;

            var cols = hash.cols,
                row,
                col;
            if (!cols) throw new Error('illegal cols: ' + cols);

            // build array of arguments to pass to sequential promises...
            collection = collection.slice(offset, offset + limit);
            var contexts = [];
            collection.some(function (item, i) {
                var ctx = {};
                ctx[_this2.variable] = item;
                // We are just putting together an array of the arguments we will be passing to our sequential promises
                contexts.push(ctx);
            });

            // This executes an array of promises sequentially for every argument in the contexts array - http://webcache.googleusercontent.com/search?q=cache:rNbMUn9TPtkJ:joost.vunderink.net/blog/2014/12/15/processing-an-array-of-promises-sequentially-in-node-js/+&cd=5&hl=en&ct=clnk&gl=us
            // It's fundamentally equivalent to the following...
            //  emptyPromise.then(renderTemplates(args0).then(renderTemplates(args1).then(renderTemplates(args2)...
            var lastPromise = contexts.reduce(function (promise, context, currentIndex) {
                return promise.then(function (partial) {
                    row = Math.floor(currentIndex / cols) + 1;
                    col = currentIndex % cols + 1;
                    if (col === 1) {
                        if (row !== 1) {
                            html += '</tr>';
                        }
                        html += '<tr class="row' + row + '">';
                    }

                    //ctx[this.variable] = context;

                    return html += '<td class="col' + col + '">';
                }).then(function (partial) {
                    scope.push(context);
                    return liquid.renderer.renderTemplates(_this2.templates, scope);
                }).then(function (partial) {
                    scope.pop(context);
                    html += partial;
                    return html += '</td>';
                });
            }, Promise.resolve('')); // start the reduce chain with a resolved Promise. After first run, the "promise" argument
            //  in our reduce callback will be the returned promise from our "then" above.  In this
            //  case, the promise returned from liquid.renderer.renderTemplates.

            return lastPromise.then(function () {
                if (row > 0) {
                    html += '</tr>';
                }
                html += '</table>';
                return html;
            }).catch(function (error) {
                throw error;
            });
        }
    });
};

},{"..":2,"any-promise":3}],38:[function(require,module,exports){
'use strict';

var Liquid = require('..');
var lexical = Liquid.lexical;

module.exports = function (liquid) {
    liquid.registerTag('unless', {
        parse: function parse(tagToken, remainTokens) {
            var _this = this;

            this.templates = [];
            this.elseTemplates = [];
            var p,
                stream = liquid.parser.parseStream(remainTokens).on('start', function (x) {
                p = _this.templates;
                _this.cond = tagToken.args;
            }).on('tag:else', function (token) {
                return p = _this.elseTemplates;
            }).on('tag:endunless', function (token) {
                return stream.stop();
            }).on('template', function (tpl) {
                return p.push(tpl);
            }).on('end', function (x) {
                throw new Error('tag ' + tagToken.raw + ' not closed');
            });

            stream.start();
        },

        render: function render(scope, hash) {
            var cond = Liquid.evalExp(this.cond, scope);
            return Liquid.isFalsy(cond) ? liquid.renderer.renderTemplates(this.templates, scope) : liquid.renderer.renderTemplates(this.elseTemplates, scope);
        }
    });
};

},{"..":2}]},{},[2])(2)
});