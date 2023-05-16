(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["LowcodeMaterialAntVueMeta"] = factory();
	else
		root["LowcodeMaterialAntVueMeta"] = factory();
})((typeof self !== 'undefined' ? self : this), function() {
return /******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 9662:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isCallable = __webpack_require__(614);
var tryToString = __webpack_require__(6330);

var $TypeError = TypeError;

// `Assert: IsCallable(argument) is true`
module.exports = function (argument) {
  if (isCallable(argument)) return argument;
  throw $TypeError(tryToString(argument) + ' is not a function');
};


/***/ }),

/***/ 9670:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isObject = __webpack_require__(111);

var $String = String;
var $TypeError = TypeError;

// `Assert: Type(argument) is Object`
module.exports = function (argument) {
  if (isObject(argument)) return argument;
  throw $TypeError($String(argument) + ' is not an object');
};


/***/ }),

/***/ 1318:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toIndexedObject = __webpack_require__(5656);
var toAbsoluteIndex = __webpack_require__(1400);
var lengthOfArrayLike = __webpack_require__(6244);

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = lengthOfArrayLike(O);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};


/***/ }),

/***/ 3658:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var DESCRIPTORS = __webpack_require__(9781);
var isArray = __webpack_require__(3157);

var $TypeError = TypeError;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Safari < 13 does not throw an error in this case
var SILENT_ON_NON_WRITABLE_LENGTH_SET = DESCRIPTORS && !function () {
  // makes no sense without proper strict mode support
  if (this !== undefined) return true;
  try {
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    Object.defineProperty([], 'length', { writable: false }).length = 1;
  } catch (error) {
    return error instanceof TypeError;
  }
}();

module.exports = SILENT_ON_NON_WRITABLE_LENGTH_SET ? function (O, length) {
  if (isArray(O) && !getOwnPropertyDescriptor(O, 'length').writable) {
    throw $TypeError('Cannot set read only .length');
  } return O.length = length;
} : function (O, length) {
  return O.length = length;
};


/***/ }),

/***/ 4326:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);

var toString = uncurryThis({}.toString);
var stringSlice = uncurryThis(''.slice);

module.exports = function (it) {
  return stringSlice(toString(it), 8, -1);
};


/***/ }),

/***/ 9920:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var hasOwn = __webpack_require__(2597);
var ownKeys = __webpack_require__(3887);
var getOwnPropertyDescriptorModule = __webpack_require__(1236);
var definePropertyModule = __webpack_require__(3070);

module.exports = function (target, source, exceptions) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key))) {
      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  }
};


/***/ }),

/***/ 8880:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(9781);
var definePropertyModule = __webpack_require__(3070);
var createPropertyDescriptor = __webpack_require__(9114);

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ 9114:
/***/ (function(module) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ 8052:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isCallable = __webpack_require__(614);
var definePropertyModule = __webpack_require__(3070);
var makeBuiltIn = __webpack_require__(6339);
var defineGlobalProperty = __webpack_require__(3072);

module.exports = function (O, key, value, options) {
  if (!options) options = {};
  var simple = options.enumerable;
  var name = options.name !== undefined ? options.name : key;
  if (isCallable(value)) makeBuiltIn(value, name, options);
  if (options.global) {
    if (simple) O[key] = value;
    else defineGlobalProperty(key, value);
  } else {
    try {
      if (!options.unsafe) delete O[key];
      else if (O[key]) simple = true;
    } catch (error) { /* empty */ }
    if (simple) O[key] = value;
    else definePropertyModule.f(O, key, {
      value: value,
      enumerable: false,
      configurable: !options.nonConfigurable,
      writable: !options.nonWritable
    });
  } return O;
};


/***/ }),

/***/ 3072:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);

// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;

module.exports = function (key, value) {
  try {
    defineProperty(global, key, { value: value, configurable: true, writable: true });
  } catch (error) {
    global[key] = value;
  } return value;
};


/***/ }),

/***/ 9781:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(7293);

// Detect IE8's incomplete defineProperty implementation
module.exports = !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});


/***/ }),

/***/ 4154:
/***/ (function(module) {

var documentAll = typeof document == 'object' && document.all;

// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
// eslint-disable-next-line unicorn/no-typeof-undefined -- required for testing
var IS_HTMLDDA = typeof documentAll == 'undefined' && documentAll !== undefined;

module.exports = {
  all: documentAll,
  IS_HTMLDDA: IS_HTMLDDA
};


/***/ }),

/***/ 317:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var isObject = __webpack_require__(111);

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),

/***/ 7207:
/***/ (function(module) {

var $TypeError = TypeError;
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF; // 2 ** 53 - 1 == 9007199254740991

module.exports = function (it) {
  if (it > MAX_SAFE_INTEGER) throw $TypeError('Maximum allowed index exceeded');
  return it;
};


/***/ }),

/***/ 8113:
/***/ (function(module) {

module.exports = typeof navigator != 'undefined' && String(navigator.userAgent) || '';


/***/ }),

/***/ 7392:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var userAgent = __webpack_require__(8113);

var process = global.process;
var Deno = global.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us
  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
}

// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0
if (!version && userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = +match[1];
  }
}

module.exports = version;


/***/ }),

/***/ 748:
/***/ (function(module) {

// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ }),

/***/ 2109:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var getOwnPropertyDescriptor = (__webpack_require__(1236).f);
var createNonEnumerableProperty = __webpack_require__(8880);
var defineBuiltIn = __webpack_require__(8052);
var defineGlobalProperty = __webpack_require__(3072);
var copyConstructorProperties = __webpack_require__(9920);
var isForced = __webpack_require__(4705);

/*
  options.target         - name of the target object
  options.global         - target is the global object
  options.stat           - export as static methods of target
  options.proto          - export as prototype methods of target
  options.real           - real prototype method for the `pure` version
  options.forced         - export even if the native feature is available
  options.bind           - bind methods to the target, required for the `pure` version
  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
  options.sham           - add a flag to not completely full polyfills
  options.enumerable     - export as enumerable property
  options.dontCallGetSet - prevent calling a getter on target
  options.name           - the .name of the function if it does not match the key
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || defineGlobalProperty(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.dontCallGetSet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty == typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    defineBuiltIn(target, key, sourceProperty, options);
  }
};


/***/ }),

/***/ 7293:
/***/ (function(module) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),

/***/ 4374:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(7293);

module.exports = !fails(function () {
  // eslint-disable-next-line es/no-function-prototype-bind -- safe
  var test = (function () { /* empty */ }).bind();
  // eslint-disable-next-line no-prototype-builtins -- safe
  return typeof test != 'function' || test.hasOwnProperty('prototype');
});


/***/ }),

/***/ 6916:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var NATIVE_BIND = __webpack_require__(4374);

var call = Function.prototype.call;

module.exports = NATIVE_BIND ? call.bind(call) : function () {
  return call.apply(call, arguments);
};


/***/ }),

/***/ 6530:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(9781);
var hasOwn = __webpack_require__(2597);

var FunctionPrototype = Function.prototype;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;

var EXISTS = hasOwn(FunctionPrototype, 'name');
// additional protection from minified / mangled / dropped function names
var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
var CONFIGURABLE = EXISTS && (!DESCRIPTORS || (DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable));

module.exports = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE
};


/***/ }),

/***/ 1702:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var NATIVE_BIND = __webpack_require__(4374);

var FunctionPrototype = Function.prototype;
var call = FunctionPrototype.call;
var uncurryThisWithBind = NATIVE_BIND && FunctionPrototype.bind.bind(call, call);

module.exports = NATIVE_BIND ? uncurryThisWithBind : function (fn) {
  return function () {
    return call.apply(fn, arguments);
  };
};


/***/ }),

/***/ 5005:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var isCallable = __webpack_require__(614);

var aFunction = function (argument) {
  return isCallable(argument) ? argument : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(global[namespace]) : global[namespace] && global[namespace][method];
};


/***/ }),

/***/ 8173:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var aCallable = __webpack_require__(9662);
var isNullOrUndefined = __webpack_require__(8554);

// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
module.exports = function (V, P) {
  var func = V[P];
  return isNullOrUndefined(func) ? undefined : aCallable(func);
};


/***/ }),

/***/ 7854:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof __webpack_require__.g == 'object' && __webpack_require__.g) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || Function('return this')();


/***/ }),

/***/ 2597:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);
var toObject = __webpack_require__(7908);

var hasOwnProperty = uncurryThis({}.hasOwnProperty);

// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
// eslint-disable-next-line es/no-object-hasown -- safe
module.exports = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject(it), key);
};


/***/ }),

/***/ 3501:
/***/ (function(module) {

module.exports = {};


/***/ }),

/***/ 4664:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(9781);
var fails = __webpack_require__(7293);
var createElement = __webpack_require__(317);

// Thanks to IE8 for its funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});


/***/ }),

/***/ 8361:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);
var fails = __webpack_require__(7293);
var classof = __webpack_require__(4326);

var $Object = Object;
var split = uncurryThis(''.split);

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !$Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split(it, '') : $Object(it);
} : $Object;


/***/ }),

/***/ 2788:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);
var isCallable = __webpack_require__(614);
var store = __webpack_require__(5465);

var functionToString = uncurryThis(Function.toString);

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable(store.inspectSource)) {
  store.inspectSource = function (it) {
    return functionToString(it);
  };
}

module.exports = store.inspectSource;


/***/ }),

/***/ 9909:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var NATIVE_WEAK_MAP = __webpack_require__(4811);
var global = __webpack_require__(7854);
var isObject = __webpack_require__(111);
var createNonEnumerableProperty = __webpack_require__(8880);
var hasOwn = __webpack_require__(2597);
var shared = __webpack_require__(5465);
var sharedKey = __webpack_require__(6200);
var hiddenKeys = __webpack_require__(3501);

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError = global.TypeError;
var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap());
  /* eslint-disable no-self-assign -- prototype methods protection */
  store.get = store.get;
  store.has = store.has;
  store.set = store.set;
  /* eslint-enable no-self-assign -- prototype methods protection */
  set = function (it, metadata) {
    if (store.has(it)) throw TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    store.set(it, metadata);
    return metadata;
  };
  get = function (it) {
    return store.get(it) || {};
  };
  has = function (it) {
    return store.has(it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    if (hasOwn(it, STATE)) throw TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return hasOwn(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return hasOwn(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),

/***/ 3157:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var classof = __webpack_require__(4326);

// `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es/no-array-isarray -- safe
module.exports = Array.isArray || function isArray(argument) {
  return classof(argument) == 'Array';
};


/***/ }),

/***/ 614:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var $documentAll = __webpack_require__(4154);

var documentAll = $documentAll.all;

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
module.exports = $documentAll.IS_HTMLDDA ? function (argument) {
  return typeof argument == 'function' || argument === documentAll;
} : function (argument) {
  return typeof argument == 'function';
};


/***/ }),

/***/ 4705:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(7293);
var isCallable = __webpack_require__(614);

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : isCallable(detection) ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;


/***/ }),

/***/ 8554:
/***/ (function(module) {

// we can't use just `it == null` since of `document.all` special case
// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
module.exports = function (it) {
  return it === null || it === undefined;
};


/***/ }),

/***/ 111:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isCallable = __webpack_require__(614);
var $documentAll = __webpack_require__(4154);

var documentAll = $documentAll.all;

module.exports = $documentAll.IS_HTMLDDA ? function (it) {
  return typeof it == 'object' ? it !== null : isCallable(it) || it === documentAll;
} : function (it) {
  return typeof it == 'object' ? it !== null : isCallable(it);
};


/***/ }),

/***/ 1913:
/***/ (function(module) {

module.exports = false;


/***/ }),

/***/ 2190:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(5005);
var isCallable = __webpack_require__(614);
var isPrototypeOf = __webpack_require__(7976);
var USE_SYMBOL_AS_UID = __webpack_require__(3307);

var $Object = Object;

module.exports = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn('Symbol');
  return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, $Object(it));
};


/***/ }),

/***/ 6244:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toLength = __webpack_require__(7466);

// `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike
module.exports = function (obj) {
  return toLength(obj.length);
};


/***/ }),

/***/ 6339:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);
var fails = __webpack_require__(7293);
var isCallable = __webpack_require__(614);
var hasOwn = __webpack_require__(2597);
var DESCRIPTORS = __webpack_require__(9781);
var CONFIGURABLE_FUNCTION_NAME = (__webpack_require__(6530).CONFIGURABLE);
var inspectSource = __webpack_require__(2788);
var InternalStateModule = __webpack_require__(9909);

var enforceInternalState = InternalStateModule.enforce;
var getInternalState = InternalStateModule.get;
var $String = String;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;
var stringSlice = uncurryThis(''.slice);
var replace = uncurryThis(''.replace);
var join = uncurryThis([].join);

var CONFIGURABLE_LENGTH = DESCRIPTORS && !fails(function () {
  return defineProperty(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;
});

var TEMPLATE = String(String).split('String');

var makeBuiltIn = module.exports = function (value, name, options) {
  if (stringSlice($String(name), 0, 7) === 'Symbol(') {
    name = '[' + replace($String(name), /^Symbol\(([^)]*)\)/, '$1') + ']';
  }
  if (options && options.getter) name = 'get ' + name;
  if (options && options.setter) name = 'set ' + name;
  if (!hasOwn(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
    if (DESCRIPTORS) defineProperty(value, 'name', { value: name, configurable: true });
    else value.name = name;
  }
  if (CONFIGURABLE_LENGTH && options && hasOwn(options, 'arity') && value.length !== options.arity) {
    defineProperty(value, 'length', { value: options.arity });
  }
  try {
    if (options && hasOwn(options, 'constructor') && options.constructor) {
      if (DESCRIPTORS) defineProperty(value, 'prototype', { writable: false });
    // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
    } else if (value.prototype) value.prototype = undefined;
  } catch (error) { /* empty */ }
  var state = enforceInternalState(value);
  if (!hasOwn(state, 'source')) {
    state.source = join(TEMPLATE, typeof name == 'string' ? name : '');
  } return value;
};

// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
// eslint-disable-next-line no-extend-native -- required
Function.prototype.toString = makeBuiltIn(function toString() {
  return isCallable(this) && getInternalState(this).source || inspectSource(this);
}, 'toString');


/***/ }),

/***/ 4758:
/***/ (function(module) {

var ceil = Math.ceil;
var floor = Math.floor;

// `Math.trunc` method
// https://tc39.es/ecma262/#sec-math.trunc
// eslint-disable-next-line es/no-math-trunc -- safe
module.exports = Math.trunc || function trunc(x) {
  var n = +x;
  return (n > 0 ? floor : ceil)(n);
};


/***/ }),

/***/ 3070:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(9781);
var IE8_DOM_DEFINE = __webpack_require__(4664);
var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__(3353);
var anObject = __webpack_require__(9670);
var toPropertyKey = __webpack_require__(4948);

var $TypeError = TypeError;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ENUMERABLE = 'enumerable';
var CONFIGURABLE = 'configurable';
var WRITABLE = 'writable';

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
    var current = $getOwnPropertyDescriptor(O, P);
    if (current && current[WRITABLE]) {
      O[P] = Attributes.value;
      Attributes = {
        configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
        writable: false
      };
    }
  } return $defineProperty(O, P, Attributes);
} : $defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw $TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ 1236:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(9781);
var call = __webpack_require__(6916);
var propertyIsEnumerableModule = __webpack_require__(5296);
var createPropertyDescriptor = __webpack_require__(9114);
var toIndexedObject = __webpack_require__(5656);
var toPropertyKey = __webpack_require__(4948);
var hasOwn = __webpack_require__(2597);
var IE8_DOM_DEFINE = __webpack_require__(4664);

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPropertyKey(P);
  if (IE8_DOM_DEFINE) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
};


/***/ }),

/***/ 8006:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__(6324);
var enumBugKeys = __webpack_require__(748);

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),

/***/ 5181:
/***/ (function(__unused_webpack_module, exports) {

// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ 7976:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);

module.exports = uncurryThis({}.isPrototypeOf);


/***/ }),

/***/ 6324:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);
var hasOwn = __webpack_require__(2597);
var toIndexedObject = __webpack_require__(5656);
var indexOf = (__webpack_require__(1318).indexOf);
var hiddenKeys = __webpack_require__(3501);

var push = uncurryThis([].push);

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (hasOwn(O, key = names[i++])) {
    ~indexOf(result, key) || push(result, key);
  }
  return result;
};


/***/ }),

/***/ 5296:
/***/ (function(__unused_webpack_module, exports) {

"use strict";

var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;


/***/ }),

/***/ 2140:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var call = __webpack_require__(6916);
var isCallable = __webpack_require__(614);
var isObject = __webpack_require__(111);

var $TypeError = TypeError;

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
module.exports = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input))) return val;
  if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  throw $TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ 3887:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(5005);
var uncurryThis = __webpack_require__(1702);
var getOwnPropertyNamesModule = __webpack_require__(8006);
var getOwnPropertySymbolsModule = __webpack_require__(5181);
var anObject = __webpack_require__(9670);

var concat = uncurryThis([].concat);

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
};


/***/ }),

/***/ 4488:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isNullOrUndefined = __webpack_require__(8554);

var $TypeError = TypeError;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (isNullOrUndefined(it)) throw $TypeError("Can't call method on " + it);
  return it;
};


/***/ }),

/***/ 6200:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var shared = __webpack_require__(2309);
var uid = __webpack_require__(9711);

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ }),

/***/ 5465:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var defineGlobalProperty = __webpack_require__(3072);

var SHARED = '__core-js_shared__';
var store = global[SHARED] || defineGlobalProperty(SHARED, {});

module.exports = store;


/***/ }),

/***/ 2309:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var IS_PURE = __webpack_require__(1913);
var store = __webpack_require__(5465);

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.30.1',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2014-2023 Denis Pushkarev (zloirock.ru)',
  license: 'https://github.com/zloirock/core-js/blob/v3.30.1/LICENSE',
  source: 'https://github.com/zloirock/core-js'
});


/***/ }),

/***/ 6293:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/* eslint-disable es/no-symbol -- required for testing */
var V8_VERSION = __webpack_require__(7392);
var fails = __webpack_require__(7293);

// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  var symbol = Symbol();
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});


/***/ }),

/***/ 1400:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toIntegerOrInfinity = __webpack_require__(9303);

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toIntegerOrInfinity(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),

/***/ 5656:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__(8361);
var requireObjectCoercible = __webpack_require__(4488);

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),

/***/ 9303:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var trunc = __webpack_require__(4758);

// `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity
module.exports = function (argument) {
  var number = +argument;
  // eslint-disable-next-line no-self-compare -- NaN check
  return number !== number || number === 0 ? 0 : trunc(number);
};


/***/ }),

/***/ 7466:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toIntegerOrInfinity = __webpack_require__(9303);

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toIntegerOrInfinity(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),

/***/ 7908:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var requireObjectCoercible = __webpack_require__(4488);

var $Object = Object;

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
module.exports = function (argument) {
  return $Object(requireObjectCoercible(argument));
};


/***/ }),

/***/ 7593:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var call = __webpack_require__(6916);
var isObject = __webpack_require__(111);
var isSymbol = __webpack_require__(2190);
var getMethod = __webpack_require__(8173);
var ordinaryToPrimitive = __webpack_require__(2140);
var wellKnownSymbol = __webpack_require__(5112);

var $TypeError = TypeError;
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
module.exports = function (input, pref) {
  if (!isObject(input) || isSymbol(input)) return input;
  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call(exoticToPrim, input, pref);
    if (!isObject(result) || isSymbol(result)) return result;
    throw $TypeError("Can't convert object to primitive value");
  }
  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};


/***/ }),

/***/ 4948:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toPrimitive = __webpack_require__(7593);
var isSymbol = __webpack_require__(2190);

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
module.exports = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol(key) ? key : key + '';
};


/***/ }),

/***/ 6330:
/***/ (function(module) {

var $String = String;

module.exports = function (argument) {
  try {
    return $String(argument);
  } catch (error) {
    return 'Object';
  }
};


/***/ }),

/***/ 9711:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);

var id = 0;
var postfix = Math.random();
var toString = uncurryThis(1.0.toString);

module.exports = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
};


/***/ }),

/***/ 3307:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/* eslint-disable es/no-symbol -- required for testing */
var NATIVE_SYMBOL = __webpack_require__(6293);

module.exports = NATIVE_SYMBOL
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';


/***/ }),

/***/ 3353:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(9781);
var fails = __webpack_require__(7293);

// V8 ~ Chrome 36-
// https://bugs.chromium.org/p/v8/issues/detail?id=3334
module.exports = DESCRIPTORS && fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
    value: 42,
    writable: false
  }).prototype != 42;
});


/***/ }),

/***/ 4811:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var isCallable = __webpack_require__(614);

var WeakMap = global.WeakMap;

module.exports = isCallable(WeakMap) && /native code/.test(String(WeakMap));


/***/ }),

/***/ 5112:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var shared = __webpack_require__(2309);
var hasOwn = __webpack_require__(2597);
var uid = __webpack_require__(9711);
var NATIVE_SYMBOL = __webpack_require__(6293);
var USE_SYMBOL_AS_UID = __webpack_require__(3307);

var Symbol = global.Symbol;
var WellKnownSymbolsStore = shared('wks');
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol['for'] || Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!hasOwn(WellKnownSymbolsStore, name)) {
    WellKnownSymbolsStore[name] = NATIVE_SYMBOL && hasOwn(Symbol, name)
      ? Symbol[name]
      : createWellKnownSymbol('Symbol.' + name);
  } return WellKnownSymbolsStore[name];
};


/***/ }),

/***/ 7658:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2109);
var toObject = __webpack_require__(7908);
var lengthOfArrayLike = __webpack_require__(6244);
var setArrayLength = __webpack_require__(3658);
var doesNotExceedSafeInteger = __webpack_require__(7207);
var fails = __webpack_require__(7293);

var INCORRECT_TO_LENGTH = fails(function () {
  return [].push.call({ length: 0x100000000 }, 1) !== 4294967297;
});

// V8 and Safari <= 15.4, FF < 23 throws InternalError
// https://bugs.chromium.org/p/v8/issues/detail?id=12681
var properErrorOnNonWritableLength = function () {
  try {
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    Object.defineProperty([], 'length', { writable: false }).push();
  } catch (error) {
    return error instanceof TypeError;
  }
};

var FORCED = INCORRECT_TO_LENGTH || !properErrorOnNonWritableLength();

// `Array.prototype.push` method
// https://tc39.es/ecma262/#sec-array.prototype.push
$({ target: 'Array', proto: true, arity: 1, forced: FORCED }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  push: function push(item) {
    var O = toObject(this);
    var len = lengthOfArrayLike(O);
    var argCount = arguments.length;
    doesNotExceedSafeInteger(len + argCount);
    for (var i = 0; i < argCount; i++) {
      O[len] = arguments[i];
      len++;
    }
    setArrayLength(O, len);
    return len;
  }
});


/***/ }),

/***/ 313:
/***/ (function(module, exports, __webpack_require__) {

/* module decorator */ module = __webpack_require__.nmd(module);
var __WEBPACK_AMD_DEFINE_RESULT__;/**
 * @license
 * Lodash <https://lodash.com/>
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */;(function(){/** Used as a safe reference for `undefined` in pre-ES5 environments. */var undefined;/** Used as the semantic version number. */var VERSION='4.17.21';/** Used as the size to enable large array optimizations. */var LARGE_ARRAY_SIZE=200;/** Error message constants. */var CORE_ERROR_TEXT='Unsupported core-js use. Try https://npms.io/search?q=ponyfill.',FUNC_ERROR_TEXT='Expected a function',INVALID_TEMPL_VAR_ERROR_TEXT='Invalid `variable` option passed into `_.template`';/** Used to stand-in for `undefined` hash values. */var HASH_UNDEFINED='__lodash_hash_undefined__';/** Used as the maximum memoize cache size. */var MAX_MEMOIZE_SIZE=500;/** Used as the internal argument placeholder. */var PLACEHOLDER='__lodash_placeholder__';/** Used to compose bitmasks for cloning. */var CLONE_DEEP_FLAG=1,CLONE_FLAT_FLAG=2,CLONE_SYMBOLS_FLAG=4;/** Used to compose bitmasks for value comparisons. */var COMPARE_PARTIAL_FLAG=1,COMPARE_UNORDERED_FLAG=2;/** Used to compose bitmasks for function metadata. */var WRAP_BIND_FLAG=1,WRAP_BIND_KEY_FLAG=2,WRAP_CURRY_BOUND_FLAG=4,WRAP_CURRY_FLAG=8,WRAP_CURRY_RIGHT_FLAG=16,WRAP_PARTIAL_FLAG=32,WRAP_PARTIAL_RIGHT_FLAG=64,WRAP_ARY_FLAG=128,WRAP_REARG_FLAG=256,WRAP_FLIP_FLAG=512;/** Used as default options for `_.truncate`. */var DEFAULT_TRUNC_LENGTH=30,DEFAULT_TRUNC_OMISSION='...';/** Used to detect hot functions by number of calls within a span of milliseconds. */var HOT_COUNT=800,HOT_SPAN=16;/** Used to indicate the type of lazy iteratees. */var LAZY_FILTER_FLAG=1,LAZY_MAP_FLAG=2,LAZY_WHILE_FLAG=3;/** Used as references for various `Number` constants. */var INFINITY=1/0,MAX_SAFE_INTEGER=9007199254740991,MAX_INTEGER=1.7976931348623157e+308,NAN=0/0;/** Used as references for the maximum length and index of an array. */var MAX_ARRAY_LENGTH=4294967295,MAX_ARRAY_INDEX=MAX_ARRAY_LENGTH-1,HALF_MAX_ARRAY_LENGTH=MAX_ARRAY_LENGTH>>>1;/** Used to associate wrap methods with their bit flags. */var wrapFlags=[['ary',WRAP_ARY_FLAG],['bind',WRAP_BIND_FLAG],['bindKey',WRAP_BIND_KEY_FLAG],['curry',WRAP_CURRY_FLAG],['curryRight',WRAP_CURRY_RIGHT_FLAG],['flip',WRAP_FLIP_FLAG],['partial',WRAP_PARTIAL_FLAG],['partialRight',WRAP_PARTIAL_RIGHT_FLAG],['rearg',WRAP_REARG_FLAG]];/** `Object#toString` result references. */var argsTag='[object Arguments]',arrayTag='[object Array]',asyncTag='[object AsyncFunction]',boolTag='[object Boolean]',dateTag='[object Date]',domExcTag='[object DOMException]',errorTag='[object Error]',funcTag='[object Function]',genTag='[object GeneratorFunction]',mapTag='[object Map]',numberTag='[object Number]',nullTag='[object Null]',objectTag='[object Object]',promiseTag='[object Promise]',proxyTag='[object Proxy]',regexpTag='[object RegExp]',setTag='[object Set]',stringTag='[object String]',symbolTag='[object Symbol]',undefinedTag='[object Undefined]',weakMapTag='[object WeakMap]',weakSetTag='[object WeakSet]';var arrayBufferTag='[object ArrayBuffer]',dataViewTag='[object DataView]',float32Tag='[object Float32Array]',float64Tag='[object Float64Array]',int8Tag='[object Int8Array]',int16Tag='[object Int16Array]',int32Tag='[object Int32Array]',uint8Tag='[object Uint8Array]',uint8ClampedTag='[object Uint8ClampedArray]',uint16Tag='[object Uint16Array]',uint32Tag='[object Uint32Array]';/** Used to match empty string literals in compiled template source. */var reEmptyStringLeading=/\b__p \+= '';/g,reEmptyStringMiddle=/\b(__p \+=) '' \+/g,reEmptyStringTrailing=/(__e\(.*?\)|\b__t\)) \+\n'';/g;/** Used to match HTML entities and HTML characters. */var reEscapedHtml=/&(?:amp|lt|gt|quot|#39);/g,reUnescapedHtml=/[&<>"']/g,reHasEscapedHtml=RegExp(reEscapedHtml.source),reHasUnescapedHtml=RegExp(reUnescapedHtml.source);/** Used to match template delimiters. */var reEscape=/<%-([\s\S]+?)%>/g,reEvaluate=/<%([\s\S]+?)%>/g,reInterpolate=/<%=([\s\S]+?)%>/g;/** Used to match property names within property paths. */var reIsDeepProp=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,reIsPlainProp=/^\w*$/,rePropName=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;/**
   * Used to match `RegExp`
   * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
   */var reRegExpChar=/[\\^$.*+?()[\]{}|]/g,reHasRegExpChar=RegExp(reRegExpChar.source);/** Used to match leading whitespace. */var reTrimStart=/^\s+/;/** Used to match a single whitespace character. */var reWhitespace=/\s/;/** Used to match wrap detail comments. */var reWrapComment=/\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/,reWrapDetails=/\{\n\/\* \[wrapped with (.+)\] \*/,reSplitDetails=/,? & /;/** Used to match words composed of alphanumeric characters. */var reAsciiWord=/[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;/**
   * Used to validate the `validate` option in `_.template` variable.
   *
   * Forbids characters which could potentially change the meaning of the function argument definition:
   * - "()," (modification of function parameters)
   * - "=" (default value)
   * - "[]{}" (destructuring of function parameters)
   * - "/" (beginning of a comment)
   * - whitespace
   */var reForbiddenIdentifierChars=/[()=,{}\[\]\/\s]/;/** Used to match backslashes in property paths. */var reEscapeChar=/\\(\\)?/g;/**
   * Used to match
   * [ES template delimiters](http://ecma-international.org/ecma-262/7.0/#sec-template-literal-lexical-components).
   */var reEsTemplate=/\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;/** Used to match `RegExp` flags from their coerced string values. */var reFlags=/\w*$/;/** Used to detect bad signed hexadecimal string values. */var reIsBadHex=/^[-+]0x[0-9a-f]+$/i;/** Used to detect binary string values. */var reIsBinary=/^0b[01]+$/i;/** Used to detect host constructors (Safari). */var reIsHostCtor=/^\[object .+?Constructor\]$/;/** Used to detect octal string values. */var reIsOctal=/^0o[0-7]+$/i;/** Used to detect unsigned integer values. */var reIsUint=/^(?:0|[1-9]\d*)$/;/** Used to match Latin Unicode letters (excluding mathematical operators). */var reLatin=/[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;/** Used to ensure capturing order of template delimiters. */var reNoMatch=/($^)/;/** Used to match unescaped characters in compiled string literals. */var reUnescapedString=/['\n\r\u2028\u2029\\]/g;/** Used to compose unicode character classes. */var rsAstralRange='\\ud800-\\udfff',rsComboMarksRange='\\u0300-\\u036f',reComboHalfMarksRange='\\ufe20-\\ufe2f',rsComboSymbolsRange='\\u20d0-\\u20ff',rsComboRange=rsComboMarksRange+reComboHalfMarksRange+rsComboSymbolsRange,rsDingbatRange='\\u2700-\\u27bf',rsLowerRange='a-z\\xdf-\\xf6\\xf8-\\xff',rsMathOpRange='\\xac\\xb1\\xd7\\xf7',rsNonCharRange='\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf',rsPunctuationRange='\\u2000-\\u206f',rsSpaceRange=' \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000',rsUpperRange='A-Z\\xc0-\\xd6\\xd8-\\xde',rsVarRange='\\ufe0e\\ufe0f',rsBreakRange=rsMathOpRange+rsNonCharRange+rsPunctuationRange+rsSpaceRange;/** Used to compose unicode capture groups. */var rsApos="['\u2019]",rsAstral='['+rsAstralRange+']',rsBreak='['+rsBreakRange+']',rsCombo='['+rsComboRange+']',rsDigits='\\d+',rsDingbat='['+rsDingbatRange+']',rsLower='['+rsLowerRange+']',rsMisc='[^'+rsAstralRange+rsBreakRange+rsDigits+rsDingbatRange+rsLowerRange+rsUpperRange+']',rsFitz='\\ud83c[\\udffb-\\udfff]',rsModifier='(?:'+rsCombo+'|'+rsFitz+')',rsNonAstral='[^'+rsAstralRange+']',rsRegional='(?:\\ud83c[\\udde6-\\uddff]){2}',rsSurrPair='[\\ud800-\\udbff][\\udc00-\\udfff]',rsUpper='['+rsUpperRange+']',rsZWJ='\\u200d';/** Used to compose unicode regexes. */var rsMiscLower='(?:'+rsLower+'|'+rsMisc+')',rsMiscUpper='(?:'+rsUpper+'|'+rsMisc+')',rsOptContrLower='(?:'+rsApos+'(?:d|ll|m|re|s|t|ve))?',rsOptContrUpper='(?:'+rsApos+'(?:D|LL|M|RE|S|T|VE))?',reOptMod=rsModifier+'?',rsOptVar='['+rsVarRange+']?',rsOptJoin='(?:'+rsZWJ+'(?:'+[rsNonAstral,rsRegional,rsSurrPair].join('|')+')'+rsOptVar+reOptMod+')*',rsOrdLower='\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])',rsOrdUpper='\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])',rsSeq=rsOptVar+reOptMod+rsOptJoin,rsEmoji='(?:'+[rsDingbat,rsRegional,rsSurrPair].join('|')+')'+rsSeq,rsSymbol='(?:'+[rsNonAstral+rsCombo+'?',rsCombo,rsRegional,rsSurrPair,rsAstral].join('|')+')';/** Used to match apostrophes. */var reApos=RegExp(rsApos,'g');/**
   * Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks) and
   * [combining diacritical marks for symbols](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks_for_Symbols).
   */var reComboMark=RegExp(rsCombo,'g');/** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */var reUnicode=RegExp(rsFitz+'(?='+rsFitz+')|'+rsSymbol+rsSeq,'g');/** Used to match complex or compound words. */var reUnicodeWord=RegExp([rsUpper+'?'+rsLower+'+'+rsOptContrLower+'(?='+[rsBreak,rsUpper,'$'].join('|')+')',rsMiscUpper+'+'+rsOptContrUpper+'(?='+[rsBreak,rsUpper+rsMiscLower,'$'].join('|')+')',rsUpper+'?'+rsMiscLower+'+'+rsOptContrLower,rsUpper+'+'+rsOptContrUpper,rsOrdUpper,rsOrdLower,rsDigits,rsEmoji].join('|'),'g');/** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */var reHasUnicode=RegExp('['+rsZWJ+rsAstralRange+rsComboRange+rsVarRange+']');/** Used to detect strings that need a more robust regexp to match words. */var reHasUnicodeWord=/[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;/** Used to assign default `context` object properties. */var contextProps=['Array','Buffer','DataView','Date','Error','Float32Array','Float64Array','Function','Int8Array','Int16Array','Int32Array','Map','Math','Object','Promise','RegExp','Set','String','Symbol','TypeError','Uint8Array','Uint8ClampedArray','Uint16Array','Uint32Array','WeakMap','_','clearTimeout','isFinite','parseInt','setTimeout'];/** Used to make template sourceURLs easier to identify. */var templateCounter=-1;/** Used to identify `toStringTag` values of typed arrays. */var typedArrayTags={};typedArrayTags[float32Tag]=typedArrayTags[float64Tag]=typedArrayTags[int8Tag]=typedArrayTags[int16Tag]=typedArrayTags[int32Tag]=typedArrayTags[uint8Tag]=typedArrayTags[uint8ClampedTag]=typedArrayTags[uint16Tag]=typedArrayTags[uint32Tag]=true;typedArrayTags[argsTag]=typedArrayTags[arrayTag]=typedArrayTags[arrayBufferTag]=typedArrayTags[boolTag]=typedArrayTags[dataViewTag]=typedArrayTags[dateTag]=typedArrayTags[errorTag]=typedArrayTags[funcTag]=typedArrayTags[mapTag]=typedArrayTags[numberTag]=typedArrayTags[objectTag]=typedArrayTags[regexpTag]=typedArrayTags[setTag]=typedArrayTags[stringTag]=typedArrayTags[weakMapTag]=false;/** Used to identify `toStringTag` values supported by `_.clone`. */var cloneableTags={};cloneableTags[argsTag]=cloneableTags[arrayTag]=cloneableTags[arrayBufferTag]=cloneableTags[dataViewTag]=cloneableTags[boolTag]=cloneableTags[dateTag]=cloneableTags[float32Tag]=cloneableTags[float64Tag]=cloneableTags[int8Tag]=cloneableTags[int16Tag]=cloneableTags[int32Tag]=cloneableTags[mapTag]=cloneableTags[numberTag]=cloneableTags[objectTag]=cloneableTags[regexpTag]=cloneableTags[setTag]=cloneableTags[stringTag]=cloneableTags[symbolTag]=cloneableTags[uint8Tag]=cloneableTags[uint8ClampedTag]=cloneableTags[uint16Tag]=cloneableTags[uint32Tag]=true;cloneableTags[errorTag]=cloneableTags[funcTag]=cloneableTags[weakMapTag]=false;/** Used to map Latin Unicode letters to basic Latin letters. */var deburredLetters={// Latin-1 Supplement block.
'\xc0':'A','\xc1':'A','\xc2':'A','\xc3':'A','\xc4':'A','\xc5':'A','\xe0':'a','\xe1':'a','\xe2':'a','\xe3':'a','\xe4':'a','\xe5':'a','\xc7':'C','\xe7':'c','\xd0':'D','\xf0':'d','\xc8':'E','\xc9':'E','\xca':'E','\xcb':'E','\xe8':'e','\xe9':'e','\xea':'e','\xeb':'e','\xcc':'I','\xcd':'I','\xce':'I','\xcf':'I','\xec':'i','\xed':'i','\xee':'i','\xef':'i','\xd1':'N','\xf1':'n','\xd2':'O','\xd3':'O','\xd4':'O','\xd5':'O','\xd6':'O','\xd8':'O','\xf2':'o','\xf3':'o','\xf4':'o','\xf5':'o','\xf6':'o','\xf8':'o','\xd9':'U','\xda':'U','\xdb':'U','\xdc':'U','\xf9':'u','\xfa':'u','\xfb':'u','\xfc':'u','\xdd':'Y','\xfd':'y','\xff':'y','\xc6':'Ae','\xe6':'ae','\xde':'Th','\xfe':'th','\xdf':'ss',// Latin Extended-A block.
'\u0100':'A','\u0102':'A','\u0104':'A','\u0101':'a','\u0103':'a','\u0105':'a','\u0106':'C','\u0108':'C','\u010a':'C','\u010c':'C','\u0107':'c','\u0109':'c','\u010b':'c','\u010d':'c','\u010e':'D','\u0110':'D','\u010f':'d','\u0111':'d','\u0112':'E','\u0114':'E','\u0116':'E','\u0118':'E','\u011a':'E','\u0113':'e','\u0115':'e','\u0117':'e','\u0119':'e','\u011b':'e','\u011c':'G','\u011e':'G','\u0120':'G','\u0122':'G','\u011d':'g','\u011f':'g','\u0121':'g','\u0123':'g','\u0124':'H','\u0126':'H','\u0125':'h','\u0127':'h','\u0128':'I','\u012a':'I','\u012c':'I','\u012e':'I','\u0130':'I','\u0129':'i','\u012b':'i','\u012d':'i','\u012f':'i','\u0131':'i','\u0134':'J','\u0135':'j','\u0136':'K','\u0137':'k','\u0138':'k','\u0139':'L','\u013b':'L','\u013d':'L','\u013f':'L','\u0141':'L','\u013a':'l','\u013c':'l','\u013e':'l','\u0140':'l','\u0142':'l','\u0143':'N','\u0145':'N','\u0147':'N','\u014a':'N','\u0144':'n','\u0146':'n','\u0148':'n','\u014b':'n','\u014c':'O','\u014e':'O','\u0150':'O','\u014d':'o','\u014f':'o','\u0151':'o','\u0154':'R','\u0156':'R','\u0158':'R','\u0155':'r','\u0157':'r','\u0159':'r','\u015a':'S','\u015c':'S','\u015e':'S','\u0160':'S','\u015b':'s','\u015d':'s','\u015f':'s','\u0161':'s','\u0162':'T','\u0164':'T','\u0166':'T','\u0163':'t','\u0165':'t','\u0167':'t','\u0168':'U','\u016a':'U','\u016c':'U','\u016e':'U','\u0170':'U','\u0172':'U','\u0169':'u','\u016b':'u','\u016d':'u','\u016f':'u','\u0171':'u','\u0173':'u','\u0174':'W','\u0175':'w','\u0176':'Y','\u0177':'y','\u0178':'Y','\u0179':'Z','\u017b':'Z','\u017d':'Z','\u017a':'z','\u017c':'z','\u017e':'z','\u0132':'IJ','\u0133':'ij','\u0152':'Oe','\u0153':'oe','\u0149':"'n",'\u017f':'s'};/** Used to map characters to HTML entities. */var htmlEscapes={'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'};/** Used to map HTML entities to characters. */var htmlUnescapes={'&amp;':'&','&lt;':'<','&gt;':'>','&quot;':'"','&#39;':"'"};/** Used to escape characters for inclusion in compiled string literals. */var stringEscapes={'\\':'\\',"'":"'",'\n':'n','\r':'r','\u2028':'u2028','\u2029':'u2029'};/** Built-in method references without a dependency on `root`. */var freeParseFloat=parseFloat,freeParseInt=parseInt;/** Detect free variable `global` from Node.js. */var freeGlobal=typeof __webpack_require__.g=='object'&&__webpack_require__.g&&__webpack_require__.g.Object===Object&&__webpack_require__.g;/** Detect free variable `self`. */var freeSelf=typeof self=='object'&&self&&self.Object===Object&&self;/** Used as a reference to the global object. */var root=freeGlobal||freeSelf||Function('return this')();/** Detect free variable `exports`. */var freeExports= true&&exports&&!exports.nodeType&&exports;/** Detect free variable `module`. */var freeModule=freeExports&&"object"=='object'&&module&&!module.nodeType&&module;/** Detect the popular CommonJS extension `module.exports`. */var moduleExports=freeModule&&freeModule.exports===freeExports;/** Detect free variable `process` from Node.js. */var freeProcess=moduleExports&&freeGlobal.process;/** Used to access faster Node.js helpers. */var nodeUtil=function(){try{// Use `util.types` for Node.js 10+.
var types=freeModule&&freeModule.require&&freeModule.require('util').types;if(types){return types;}// Legacy `process.binding('util')` for Node.js < 10.
return freeProcess&&freeProcess.binding&&freeProcess.binding('util');}catch(e){}}();/* Node.js helper references. */var nodeIsArrayBuffer=nodeUtil&&nodeUtil.isArrayBuffer,nodeIsDate=nodeUtil&&nodeUtil.isDate,nodeIsMap=nodeUtil&&nodeUtil.isMap,nodeIsRegExp=nodeUtil&&nodeUtil.isRegExp,nodeIsSet=nodeUtil&&nodeUtil.isSet,nodeIsTypedArray=nodeUtil&&nodeUtil.isTypedArray;/*--------------------------------------------------------------------------*/ /**
   * A faster alternative to `Function#apply`, this function invokes `func`
   * with the `this` binding of `thisArg` and the arguments of `args`.
   *
   * @private
   * @param {Function} func The function to invoke.
   * @param {*} thisArg The `this` binding of `func`.
   * @param {Array} args The arguments to invoke `func` with.
   * @returns {*} Returns the result of `func`.
   */function apply(func,thisArg,args){switch(args.length){case 0:return func.call(thisArg);case 1:return func.call(thisArg,args[0]);case 2:return func.call(thisArg,args[0],args[1]);case 3:return func.call(thisArg,args[0],args[1],args[2]);}return func.apply(thisArg,args);}/**
   * A specialized version of `baseAggregator` for arrays.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} setter The function to set `accumulator` values.
   * @param {Function} iteratee The iteratee to transform keys.
   * @param {Object} accumulator The initial aggregated object.
   * @returns {Function} Returns `accumulator`.
   */function arrayAggregator(array,setter,iteratee,accumulator){var index=-1,length=array==null?0:array.length;while(++index<length){var value=array[index];setter(accumulator,value,iteratee(value),array);}return accumulator;}/**
   * A specialized version of `_.forEach` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns `array`.
   */function arrayEach(array,iteratee){var index=-1,length=array==null?0:array.length;while(++index<length){if(iteratee(array[index],index,array)===false){break;}}return array;}/**
   * A specialized version of `_.forEachRight` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns `array`.
   */function arrayEachRight(array,iteratee){var length=array==null?0:array.length;while(length--){if(iteratee(array[length],length,array)===false){break;}}return array;}/**
   * A specialized version of `_.every` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {boolean} Returns `true` if all elements pass the predicate check,
   *  else `false`.
   */function arrayEvery(array,predicate){var index=-1,length=array==null?0:array.length;while(++index<length){if(!predicate(array[index],index,array)){return false;}}return true;}/**
   * A specialized version of `_.filter` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {Array} Returns the new filtered array.
   */function arrayFilter(array,predicate){var index=-1,length=array==null?0:array.length,resIndex=0,result=[];while(++index<length){var value=array[index];if(predicate(value,index,array)){result[resIndex++]=value;}}return result;}/**
   * A specialized version of `_.includes` for arrays without support for
   * specifying an index to search from.
   *
   * @private
   * @param {Array} [array] The array to inspect.
   * @param {*} target The value to search for.
   * @returns {boolean} Returns `true` if `target` is found, else `false`.
   */function arrayIncludes(array,value){var length=array==null?0:array.length;return!!length&&baseIndexOf(array,value,0)>-1;}/**
   * This function is like `arrayIncludes` except that it accepts a comparator.
   *
   * @private
   * @param {Array} [array] The array to inspect.
   * @param {*} target The value to search for.
   * @param {Function} comparator The comparator invoked per element.
   * @returns {boolean} Returns `true` if `target` is found, else `false`.
   */function arrayIncludesWith(array,value,comparator){var index=-1,length=array==null?0:array.length;while(++index<length){if(comparator(value,array[index])){return true;}}return false;}/**
   * A specialized version of `_.map` for arrays without support for iteratee
   * shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the new mapped array.
   */function arrayMap(array,iteratee){var index=-1,length=array==null?0:array.length,result=Array(length);while(++index<length){result[index]=iteratee(array[index],index,array);}return result;}/**
   * Appends the elements of `values` to `array`.
   *
   * @private
   * @param {Array} array The array to modify.
   * @param {Array} values The values to append.
   * @returns {Array} Returns `array`.
   */function arrayPush(array,values){var index=-1,length=values.length,offset=array.length;while(++index<length){array[offset+index]=values[index];}return array;}/**
   * A specialized version of `_.reduce` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @param {*} [accumulator] The initial value.
   * @param {boolean} [initAccum] Specify using the first element of `array` as
   *  the initial value.
   * @returns {*} Returns the accumulated value.
   */function arrayReduce(array,iteratee,accumulator,initAccum){var index=-1,length=array==null?0:array.length;if(initAccum&&length){accumulator=array[++index];}while(++index<length){accumulator=iteratee(accumulator,array[index],index,array);}return accumulator;}/**
   * A specialized version of `_.reduceRight` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @param {*} [accumulator] The initial value.
   * @param {boolean} [initAccum] Specify using the last element of `array` as
   *  the initial value.
   * @returns {*} Returns the accumulated value.
   */function arrayReduceRight(array,iteratee,accumulator,initAccum){var length=array==null?0:array.length;if(initAccum&&length){accumulator=array[--length];}while(length--){accumulator=iteratee(accumulator,array[length],length,array);}return accumulator;}/**
   * A specialized version of `_.some` for arrays without support for iteratee
   * shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {boolean} Returns `true` if any element passes the predicate check,
   *  else `false`.
   */function arraySome(array,predicate){var index=-1,length=array==null?0:array.length;while(++index<length){if(predicate(array[index],index,array)){return true;}}return false;}/**
   * Gets the size of an ASCII `string`.
   *
   * @private
   * @param {string} string The string inspect.
   * @returns {number} Returns the string size.
   */var asciiSize=baseProperty('length');/**
   * Converts an ASCII `string` to an array.
   *
   * @private
   * @param {string} string The string to convert.
   * @returns {Array} Returns the converted array.
   */function asciiToArray(string){return string.split('');}/**
   * Splits an ASCII `string` into an array of its words.
   *
   * @private
   * @param {string} The string to inspect.
   * @returns {Array} Returns the words of `string`.
   */function asciiWords(string){return string.match(reAsciiWord)||[];}/**
   * The base implementation of methods like `_.findKey` and `_.findLastKey`,
   * without support for iteratee shorthands, which iterates over `collection`
   * using `eachFunc`.
   *
   * @private
   * @param {Array|Object} collection The collection to inspect.
   * @param {Function} predicate The function invoked per iteration.
   * @param {Function} eachFunc The function to iterate over `collection`.
   * @returns {*} Returns the found element or its key, else `undefined`.
   */function baseFindKey(collection,predicate,eachFunc){var result;eachFunc(collection,function(value,key,collection){if(predicate(value,key,collection)){result=key;return false;}});return result;}/**
   * The base implementation of `_.findIndex` and `_.findLastIndex` without
   * support for iteratee shorthands.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {Function} predicate The function invoked per iteration.
   * @param {number} fromIndex The index to search from.
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */function baseFindIndex(array,predicate,fromIndex,fromRight){var length=array.length,index=fromIndex+(fromRight?1:-1);while(fromRight?index--:++index<length){if(predicate(array[index],index,array)){return index;}}return-1;}/**
   * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} value The value to search for.
   * @param {number} fromIndex The index to search from.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */function baseIndexOf(array,value,fromIndex){return value===value?strictIndexOf(array,value,fromIndex):baseFindIndex(array,baseIsNaN,fromIndex);}/**
   * This function is like `baseIndexOf` except that it accepts a comparator.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} value The value to search for.
   * @param {number} fromIndex The index to search from.
   * @param {Function} comparator The comparator invoked per element.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */function baseIndexOfWith(array,value,fromIndex,comparator){var index=fromIndex-1,length=array.length;while(++index<length){if(comparator(array[index],value)){return index;}}return-1;}/**
   * The base implementation of `_.isNaN` without support for number objects.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
   */function baseIsNaN(value){return value!==value;}/**
   * The base implementation of `_.mean` and `_.meanBy` without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} array The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {number} Returns the mean.
   */function baseMean(array,iteratee){var length=array==null?0:array.length;return length?baseSum(array,iteratee)/length:NAN;}/**
   * The base implementation of `_.property` without support for deep paths.
   *
   * @private
   * @param {string} key The key of the property to get.
   * @returns {Function} Returns the new accessor function.
   */function baseProperty(key){return function(object){return object==null?undefined:object[key];};}/**
   * The base implementation of `_.propertyOf` without support for deep paths.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Function} Returns the new accessor function.
   */function basePropertyOf(object){return function(key){return object==null?undefined:object[key];};}/**
   * The base implementation of `_.reduce` and `_.reduceRight`, without support
   * for iteratee shorthands, which iterates over `collection` using `eachFunc`.
   *
   * @private
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @param {*} accumulator The initial value.
   * @param {boolean} initAccum Specify using the first or last element of
   *  `collection` as the initial value.
   * @param {Function} eachFunc The function to iterate over `collection`.
   * @returns {*} Returns the accumulated value.
   */function baseReduce(collection,iteratee,accumulator,initAccum,eachFunc){eachFunc(collection,function(value,index,collection){accumulator=initAccum?(initAccum=false,value):iteratee(accumulator,value,index,collection);});return accumulator;}/**
   * The base implementation of `_.sortBy` which uses `comparer` to define the
   * sort order of `array` and replaces criteria objects with their corresponding
   * values.
   *
   * @private
   * @param {Array} array The array to sort.
   * @param {Function} comparer The function to define sort order.
   * @returns {Array} Returns `array`.
   */function baseSortBy(array,comparer){var length=array.length;array.sort(comparer);while(length--){array[length]=array[length].value;}return array;}/**
   * The base implementation of `_.sum` and `_.sumBy` without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} array The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {number} Returns the sum.
   */function baseSum(array,iteratee){var result,index=-1,length=array.length;while(++index<length){var current=iteratee(array[index]);if(current!==undefined){result=result===undefined?current:result+current;}}return result;}/**
   * The base implementation of `_.times` without support for iteratee shorthands
   * or max array length checks.
   *
   * @private
   * @param {number} n The number of times to invoke `iteratee`.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the array of results.
   */function baseTimes(n,iteratee){var index=-1,result=Array(n);while(++index<n){result[index]=iteratee(index);}return result;}/**
   * The base implementation of `_.toPairs` and `_.toPairsIn` which creates an array
   * of key-value pairs for `object` corresponding to the property names of `props`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Array} props The property names to get values for.
   * @returns {Object} Returns the key-value pairs.
   */function baseToPairs(object,props){return arrayMap(props,function(key){return[key,object[key]];});}/**
   * The base implementation of `_.trim`.
   *
   * @private
   * @param {string} string The string to trim.
   * @returns {string} Returns the trimmed string.
   */function baseTrim(string){return string?string.slice(0,trimmedEndIndex(string)+1).replace(reTrimStart,''):string;}/**
   * The base implementation of `_.unary` without support for storing metadata.
   *
   * @private
   * @param {Function} func The function to cap arguments for.
   * @returns {Function} Returns the new capped function.
   */function baseUnary(func){return function(value){return func(value);};}/**
   * The base implementation of `_.values` and `_.valuesIn` which creates an
   * array of `object` property values corresponding to the property names
   * of `props`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Array} props The property names to get values for.
   * @returns {Object} Returns the array of property values.
   */function baseValues(object,props){return arrayMap(props,function(key){return object[key];});}/**
   * Checks if a `cache` value for `key` exists.
   *
   * @private
   * @param {Object} cache The cache to query.
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */function cacheHas(cache,key){return cache.has(key);}/**
   * Used by `_.trim` and `_.trimStart` to get the index of the first string symbol
   * that is not found in the character symbols.
   *
   * @private
   * @param {Array} strSymbols The string symbols to inspect.
   * @param {Array} chrSymbols The character symbols to find.
   * @returns {number} Returns the index of the first unmatched string symbol.
   */function charsStartIndex(strSymbols,chrSymbols){var index=-1,length=strSymbols.length;while(++index<length&&baseIndexOf(chrSymbols,strSymbols[index],0)>-1){}return index;}/**
   * Used by `_.trim` and `_.trimEnd` to get the index of the last string symbol
   * that is not found in the character symbols.
   *
   * @private
   * @param {Array} strSymbols The string symbols to inspect.
   * @param {Array} chrSymbols The character symbols to find.
   * @returns {number} Returns the index of the last unmatched string symbol.
   */function charsEndIndex(strSymbols,chrSymbols){var index=strSymbols.length;while(index--&&baseIndexOf(chrSymbols,strSymbols[index],0)>-1){}return index;}/**
   * Gets the number of `placeholder` occurrences in `array`.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} placeholder The placeholder to search for.
   * @returns {number} Returns the placeholder count.
   */function countHolders(array,placeholder){var length=array.length,result=0;while(length--){if(array[length]===placeholder){++result;}}return result;}/**
   * Used by `_.deburr` to convert Latin-1 Supplement and Latin Extended-A
   * letters to basic Latin letters.
   *
   * @private
   * @param {string} letter The matched letter to deburr.
   * @returns {string} Returns the deburred letter.
   */var deburrLetter=basePropertyOf(deburredLetters);/**
   * Used by `_.escape` to convert characters to HTML entities.
   *
   * @private
   * @param {string} chr The matched character to escape.
   * @returns {string} Returns the escaped character.
   */var escapeHtmlChar=basePropertyOf(htmlEscapes);/**
   * Used by `_.template` to escape characters for inclusion in compiled string literals.
   *
   * @private
   * @param {string} chr The matched character to escape.
   * @returns {string} Returns the escaped character.
   */function escapeStringChar(chr){return'\\'+stringEscapes[chr];}/**
   * Gets the value at `key` of `object`.
   *
   * @private
   * @param {Object} [object] The object to query.
   * @param {string} key The key of the property to get.
   * @returns {*} Returns the property value.
   */function getValue(object,key){return object==null?undefined:object[key];}/**
   * Checks if `string` contains Unicode symbols.
   *
   * @private
   * @param {string} string The string to inspect.
   * @returns {boolean} Returns `true` if a symbol is found, else `false`.
   */function hasUnicode(string){return reHasUnicode.test(string);}/**
   * Checks if `string` contains a word composed of Unicode symbols.
   *
   * @private
   * @param {string} string The string to inspect.
   * @returns {boolean} Returns `true` if a word is found, else `false`.
   */function hasUnicodeWord(string){return reHasUnicodeWord.test(string);}/**
   * Converts `iterator` to an array.
   *
   * @private
   * @param {Object} iterator The iterator to convert.
   * @returns {Array} Returns the converted array.
   */function iteratorToArray(iterator){var data,result=[];while(!(data=iterator.next()).done){result.push(data.value);}return result;}/**
   * Converts `map` to its key-value pairs.
   *
   * @private
   * @param {Object} map The map to convert.
   * @returns {Array} Returns the key-value pairs.
   */function mapToArray(map){var index=-1,result=Array(map.size);map.forEach(function(value,key){result[++index]=[key,value];});return result;}/**
   * Creates a unary function that invokes `func` with its argument transformed.
   *
   * @private
   * @param {Function} func The function to wrap.
   * @param {Function} transform The argument transform.
   * @returns {Function} Returns the new function.
   */function overArg(func,transform){return function(arg){return func(transform(arg));};}/**
   * Replaces all `placeholder` elements in `array` with an internal placeholder
   * and returns an array of their indexes.
   *
   * @private
   * @param {Array} array The array to modify.
   * @param {*} placeholder The placeholder to replace.
   * @returns {Array} Returns the new array of placeholder indexes.
   */function replaceHolders(array,placeholder){var index=-1,length=array.length,resIndex=0,result=[];while(++index<length){var value=array[index];if(value===placeholder||value===PLACEHOLDER){array[index]=PLACEHOLDER;result[resIndex++]=index;}}return result;}/**
   * Converts `set` to an array of its values.
   *
   * @private
   * @param {Object} set The set to convert.
   * @returns {Array} Returns the values.
   */function setToArray(set){var index=-1,result=Array(set.size);set.forEach(function(value){result[++index]=value;});return result;}/**
   * Converts `set` to its value-value pairs.
   *
   * @private
   * @param {Object} set The set to convert.
   * @returns {Array} Returns the value-value pairs.
   */function setToPairs(set){var index=-1,result=Array(set.size);set.forEach(function(value){result[++index]=[value,value];});return result;}/**
   * A specialized version of `_.indexOf` which performs strict equality
   * comparisons of values, i.e. `===`.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} value The value to search for.
   * @param {number} fromIndex The index to search from.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */function strictIndexOf(array,value,fromIndex){var index=fromIndex-1,length=array.length;while(++index<length){if(array[index]===value){return index;}}return-1;}/**
   * A specialized version of `_.lastIndexOf` which performs strict equality
   * comparisons of values, i.e. `===`.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} value The value to search for.
   * @param {number} fromIndex The index to search from.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */function strictLastIndexOf(array,value,fromIndex){var index=fromIndex+1;while(index--){if(array[index]===value){return index;}}return index;}/**
   * Gets the number of symbols in `string`.
   *
   * @private
   * @param {string} string The string to inspect.
   * @returns {number} Returns the string size.
   */function stringSize(string){return hasUnicode(string)?unicodeSize(string):asciiSize(string);}/**
   * Converts `string` to an array.
   *
   * @private
   * @param {string} string The string to convert.
   * @returns {Array} Returns the converted array.
   */function stringToArray(string){return hasUnicode(string)?unicodeToArray(string):asciiToArray(string);}/**
   * Used by `_.trim` and `_.trimEnd` to get the index of the last non-whitespace
   * character of `string`.
   *
   * @private
   * @param {string} string The string to inspect.
   * @returns {number} Returns the index of the last non-whitespace character.
   */function trimmedEndIndex(string){var index=string.length;while(index--&&reWhitespace.test(string.charAt(index))){}return index;}/**
   * Used by `_.unescape` to convert HTML entities to characters.
   *
   * @private
   * @param {string} chr The matched character to unescape.
   * @returns {string} Returns the unescaped character.
   */var unescapeHtmlChar=basePropertyOf(htmlUnescapes);/**
   * Gets the size of a Unicode `string`.
   *
   * @private
   * @param {string} string The string inspect.
   * @returns {number} Returns the string size.
   */function unicodeSize(string){var result=reUnicode.lastIndex=0;while(reUnicode.test(string)){++result;}return result;}/**
   * Converts a Unicode `string` to an array.
   *
   * @private
   * @param {string} string The string to convert.
   * @returns {Array} Returns the converted array.
   */function unicodeToArray(string){return string.match(reUnicode)||[];}/**
   * Splits a Unicode `string` into an array of its words.
   *
   * @private
   * @param {string} The string to inspect.
   * @returns {Array} Returns the words of `string`.
   */function unicodeWords(string){return string.match(reUnicodeWord)||[];}/*--------------------------------------------------------------------------*/ /**
   * Create a new pristine `lodash` function using the `context` object.
   *
   * @static
   * @memberOf _
   * @since 1.1.0
   * @category Util
   * @param {Object} [context=root] The context object.
   * @returns {Function} Returns a new `lodash` function.
   * @example
   *
   * _.mixin({ 'foo': _.constant('foo') });
   *
   * var lodash = _.runInContext();
   * lodash.mixin({ 'bar': lodash.constant('bar') });
   *
   * _.isFunction(_.foo);
   * // => true
   * _.isFunction(_.bar);
   * // => false
   *
   * lodash.isFunction(lodash.foo);
   * // => false
   * lodash.isFunction(lodash.bar);
   * // => true
   *
   * // Create a suped-up `defer` in Node.js.
   * var defer = _.runInContext({ 'setTimeout': setImmediate }).defer;
   */var runInContext=function runInContext(context){context=context==null?root:_.defaults(root.Object(),context,_.pick(root,contextProps));/** Built-in constructor references. */var Array=context.Array,Date=context.Date,Error=context.Error,Function=context.Function,Math=context.Math,Object=context.Object,RegExp=context.RegExp,String=context.String,TypeError=context.TypeError;/** Used for built-in method references. */var arrayProto=Array.prototype,funcProto=Function.prototype,objectProto=Object.prototype;/** Used to detect overreaching core-js shims. */var coreJsData=context['__core-js_shared__'];/** Used to resolve the decompiled source of functions. */var funcToString=funcProto.toString;/** Used to check objects for own properties. */var hasOwnProperty=objectProto.hasOwnProperty;/** Used to generate unique IDs. */var idCounter=0;/** Used to detect methods masquerading as native. */var maskSrcKey=function(){var uid=/[^.]+$/.exec(coreJsData&&coreJsData.keys&&coreJsData.keys.IE_PROTO||'');return uid?'Symbol(src)_1.'+uid:'';}();/**
     * Used to resolve the
     * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
     * of values.
     */var nativeObjectToString=objectProto.toString;/** Used to infer the `Object` constructor. */var objectCtorString=funcToString.call(Object);/** Used to restore the original `_` reference in `_.noConflict`. */var oldDash=root._;/** Used to detect if a method is native. */var reIsNative=RegExp('^'+funcToString.call(hasOwnProperty).replace(reRegExpChar,'\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,'$1.*?')+'$');/** Built-in value references. */var Buffer=moduleExports?context.Buffer:undefined,Symbol=context.Symbol,Uint8Array=context.Uint8Array,allocUnsafe=Buffer?Buffer.allocUnsafe:undefined,getPrototype=overArg(Object.getPrototypeOf,Object),objectCreate=Object.create,propertyIsEnumerable=objectProto.propertyIsEnumerable,splice=arrayProto.splice,spreadableSymbol=Symbol?Symbol.isConcatSpreadable:undefined,symIterator=Symbol?Symbol.iterator:undefined,symToStringTag=Symbol?Symbol.toStringTag:undefined;var defineProperty=function(){try{var func=getNative(Object,'defineProperty');func({},'',{});return func;}catch(e){}}();/** Mocked built-ins. */var ctxClearTimeout=context.clearTimeout!==root.clearTimeout&&context.clearTimeout,ctxNow=Date&&Date.now!==root.Date.now&&Date.now,ctxSetTimeout=context.setTimeout!==root.setTimeout&&context.setTimeout;/* Built-in method references for those with the same name as other `lodash` methods. */var nativeCeil=Math.ceil,nativeFloor=Math.floor,nativeGetSymbols=Object.getOwnPropertySymbols,nativeIsBuffer=Buffer?Buffer.isBuffer:undefined,nativeIsFinite=context.isFinite,nativeJoin=arrayProto.join,nativeKeys=overArg(Object.keys,Object),nativeMax=Math.max,nativeMin=Math.min,nativeNow=Date.now,nativeParseInt=context.parseInt,nativeRandom=Math.random,nativeReverse=arrayProto.reverse;/* Built-in method references that are verified to be native. */var DataView=getNative(context,'DataView'),Map=getNative(context,'Map'),Promise=getNative(context,'Promise'),Set=getNative(context,'Set'),WeakMap=getNative(context,'WeakMap'),nativeCreate=getNative(Object,'create');/** Used to store function metadata. */var metaMap=WeakMap&&new WeakMap();/** Used to lookup unminified function names. */var realNames={};/** Used to detect maps, sets, and weakmaps. */var dataViewCtorString=toSource(DataView),mapCtorString=toSource(Map),promiseCtorString=toSource(Promise),setCtorString=toSource(Set),weakMapCtorString=toSource(WeakMap);/** Used to convert symbols to primitives and strings. */var symbolProto=Symbol?Symbol.prototype:undefined,symbolValueOf=symbolProto?symbolProto.valueOf:undefined,symbolToString=symbolProto?symbolProto.toString:undefined;/*------------------------------------------------------------------------*/ /**
     * Creates a `lodash` object which wraps `value` to enable implicit method
     * chain sequences. Methods that operate on and return arrays, collections,
     * and functions can be chained together. Methods that retrieve a single value
     * or may return a primitive value will automatically end the chain sequence
     * and return the unwrapped value. Otherwise, the value must be unwrapped
     * with `_#value`.
     *
     * Explicit chain sequences, which must be unwrapped with `_#value`, may be
     * enabled using `_.chain`.
     *
     * The execution of chained methods is lazy, that is, it's deferred until
     * `_#value` is implicitly or explicitly called.
     *
     * Lazy evaluation allows several methods to support shortcut fusion.
     * Shortcut fusion is an optimization to merge iteratee calls; this avoids
     * the creation of intermediate arrays and can greatly reduce the number of
     * iteratee executions. Sections of a chain sequence qualify for shortcut
     * fusion if the section is applied to an array and iteratees accept only
     * one argument. The heuristic for whether a section qualifies for shortcut
     * fusion is subject to change.
     *
     * Chaining is supported in custom builds as long as the `_#value` method is
     * directly or indirectly included in the build.
     *
     * In addition to lodash methods, wrappers have `Array` and `String` methods.
     *
     * The wrapper `Array` methods are:
     * `concat`, `join`, `pop`, `push`, `shift`, `sort`, `splice`, and `unshift`
     *
     * The wrapper `String` methods are:
     * `replace` and `split`
     *
     * The wrapper methods that support shortcut fusion are:
     * `at`, `compact`, `drop`, `dropRight`, `dropWhile`, `filter`, `find`,
     * `findLast`, `head`, `initial`, `last`, `map`, `reject`, `reverse`, `slice`,
     * `tail`, `take`, `takeRight`, `takeRightWhile`, `takeWhile`, and `toArray`
     *
     * The chainable wrapper methods are:
     * `after`, `ary`, `assign`, `assignIn`, `assignInWith`, `assignWith`, `at`,
     * `before`, `bind`, `bindAll`, `bindKey`, `castArray`, `chain`, `chunk`,
     * `commit`, `compact`, `concat`, `conforms`, `constant`, `countBy`, `create`,
     * `curry`, `debounce`, `defaults`, `defaultsDeep`, `defer`, `delay`,
     * `difference`, `differenceBy`, `differenceWith`, `drop`, `dropRight`,
     * `dropRightWhile`, `dropWhile`, `extend`, `extendWith`, `fill`, `filter`,
     * `flatMap`, `flatMapDeep`, `flatMapDepth`, `flatten`, `flattenDeep`,
     * `flattenDepth`, `flip`, `flow`, `flowRight`, `fromPairs`, `functions`,
     * `functionsIn`, `groupBy`, `initial`, `intersection`, `intersectionBy`,
     * `intersectionWith`, `invert`, `invertBy`, `invokeMap`, `iteratee`, `keyBy`,
     * `keys`, `keysIn`, `map`, `mapKeys`, `mapValues`, `matches`, `matchesProperty`,
     * `memoize`, `merge`, `mergeWith`, `method`, `methodOf`, `mixin`, `negate`,
     * `nthArg`, `omit`, `omitBy`, `once`, `orderBy`, `over`, `overArgs`,
     * `overEvery`, `overSome`, `partial`, `partialRight`, `partition`, `pick`,
     * `pickBy`, `plant`, `property`, `propertyOf`, `pull`, `pullAll`, `pullAllBy`,
     * `pullAllWith`, `pullAt`, `push`, `range`, `rangeRight`, `rearg`, `reject`,
     * `remove`, `rest`, `reverse`, `sampleSize`, `set`, `setWith`, `shuffle`,
     * `slice`, `sort`, `sortBy`, `splice`, `spread`, `tail`, `take`, `takeRight`,
     * `takeRightWhile`, `takeWhile`, `tap`, `throttle`, `thru`, `toArray`,
     * `toPairs`, `toPairsIn`, `toPath`, `toPlainObject`, `transform`, `unary`,
     * `union`, `unionBy`, `unionWith`, `uniq`, `uniqBy`, `uniqWith`, `unset`,
     * `unshift`, `unzip`, `unzipWith`, `update`, `updateWith`, `values`,
     * `valuesIn`, `without`, `wrap`, `xor`, `xorBy`, `xorWith`, `zip`,
     * `zipObject`, `zipObjectDeep`, and `zipWith`
     *
     * The wrapper methods that are **not** chainable by default are:
     * `add`, `attempt`, `camelCase`, `capitalize`, `ceil`, `clamp`, `clone`,
     * `cloneDeep`, `cloneDeepWith`, `cloneWith`, `conformsTo`, `deburr`,
     * `defaultTo`, `divide`, `each`, `eachRight`, `endsWith`, `eq`, `escape`,
     * `escapeRegExp`, `every`, `find`, `findIndex`, `findKey`, `findLast`,
     * `findLastIndex`, `findLastKey`, `first`, `floor`, `forEach`, `forEachRight`,
     * `forIn`, `forInRight`, `forOwn`, `forOwnRight`, `get`, `gt`, `gte`, `has`,
     * `hasIn`, `head`, `identity`, `includes`, `indexOf`, `inRange`, `invoke`,
     * `isArguments`, `isArray`, `isArrayBuffer`, `isArrayLike`, `isArrayLikeObject`,
     * `isBoolean`, `isBuffer`, `isDate`, `isElement`, `isEmpty`, `isEqual`,
     * `isEqualWith`, `isError`, `isFinite`, `isFunction`, `isInteger`, `isLength`,
     * `isMap`, `isMatch`, `isMatchWith`, `isNaN`, `isNative`, `isNil`, `isNull`,
     * `isNumber`, `isObject`, `isObjectLike`, `isPlainObject`, `isRegExp`,
     * `isSafeInteger`, `isSet`, `isString`, `isUndefined`, `isTypedArray`,
     * `isWeakMap`, `isWeakSet`, `join`, `kebabCase`, `last`, `lastIndexOf`,
     * `lowerCase`, `lowerFirst`, `lt`, `lte`, `max`, `maxBy`, `mean`, `meanBy`,
     * `min`, `minBy`, `multiply`, `noConflict`, `noop`, `now`, `nth`, `pad`,
     * `padEnd`, `padStart`, `parseInt`, `pop`, `random`, `reduce`, `reduceRight`,
     * `repeat`, `result`, `round`, `runInContext`, `sample`, `shift`, `size`,
     * `snakeCase`, `some`, `sortedIndex`, `sortedIndexBy`, `sortedLastIndex`,
     * `sortedLastIndexBy`, `startCase`, `startsWith`, `stubArray`, `stubFalse`,
     * `stubObject`, `stubString`, `stubTrue`, `subtract`, `sum`, `sumBy`,
     * `template`, `times`, `toFinite`, `toInteger`, `toJSON`, `toLength`,
     * `toLower`, `toNumber`, `toSafeInteger`, `toString`, `toUpper`, `trim`,
     * `trimEnd`, `trimStart`, `truncate`, `unescape`, `uniqueId`, `upperCase`,
     * `upperFirst`, `value`, and `words`
     *
     * @name _
     * @constructor
     * @category Seq
     * @param {*} value The value to wrap in a `lodash` instance.
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * function square(n) {
     *   return n * n;
     * }
     *
     * var wrapped = _([1, 2, 3]);
     *
     * // Returns an unwrapped value.
     * wrapped.reduce(_.add);
     * // => 6
     *
     * // Returns a wrapped value.
     * var squares = wrapped.map(square);
     *
     * _.isArray(squares);
     * // => false
     *
     * _.isArray(squares.value());
     * // => true
     */function lodash(value){if(isObjectLike(value)&&!isArray(value)&&!(value instanceof LazyWrapper)){if(value instanceof LodashWrapper){return value;}if(hasOwnProperty.call(value,'__wrapped__')){return wrapperClone(value);}}return new LodashWrapper(value);}/**
     * The base implementation of `_.create` without support for assigning
     * properties to the created object.
     *
     * @private
     * @param {Object} proto The object to inherit from.
     * @returns {Object} Returns the new object.
     */var baseCreate=function(){function object(){}return function(proto){if(!isObject(proto)){return{};}if(objectCreate){return objectCreate(proto);}object.prototype=proto;var result=new object();object.prototype=undefined;return result;};}();/**
     * The function whose prototype chain sequence wrappers inherit from.
     *
     * @private
     */function baseLodash(){// No operation performed.
}/**
     * The base constructor for creating `lodash` wrapper objects.
     *
     * @private
     * @param {*} value The value to wrap.
     * @param {boolean} [chainAll] Enable explicit method chain sequences.
     */function LodashWrapper(value,chainAll){this.__wrapped__=value;this.__actions__=[];this.__chain__=!!chainAll;this.__index__=0;this.__values__=undefined;}/**
     * By default, the template delimiters used by lodash are like those in
     * embedded Ruby (ERB) as well as ES2015 template strings. Change the
     * following template settings to use alternative delimiters.
     *
     * @static
     * @memberOf _
     * @type {Object}
     */lodash.templateSettings={/**
       * Used to detect `data` property values to be HTML-escaped.
       *
       * @memberOf _.templateSettings
       * @type {RegExp}
       */'escape':reEscape,/**
       * Used to detect code to be evaluated.
       *
       * @memberOf _.templateSettings
       * @type {RegExp}
       */'evaluate':reEvaluate,/**
       * Used to detect `data` property values to inject.
       *
       * @memberOf _.templateSettings
       * @type {RegExp}
       */'interpolate':reInterpolate,/**
       * Used to reference the data object in the template text.
       *
       * @memberOf _.templateSettings
       * @type {string}
       */'variable':'',/**
       * Used to import variables into the compiled template.
       *
       * @memberOf _.templateSettings
       * @type {Object}
       */'imports':{/**
         * A reference to the `lodash` function.
         *
         * @memberOf _.templateSettings.imports
         * @type {Function}
         */'_':lodash}};// Ensure wrappers are instances of `baseLodash`.
lodash.prototype=baseLodash.prototype;lodash.prototype.constructor=lodash;LodashWrapper.prototype=baseCreate(baseLodash.prototype);LodashWrapper.prototype.constructor=LodashWrapper;/*------------------------------------------------------------------------*/ /**
     * Creates a lazy wrapper object which wraps `value` to enable lazy evaluation.
     *
     * @private
     * @constructor
     * @param {*} value The value to wrap.
     */function LazyWrapper(value){this.__wrapped__=value;this.__actions__=[];this.__dir__=1;this.__filtered__=false;this.__iteratees__=[];this.__takeCount__=MAX_ARRAY_LENGTH;this.__views__=[];}/**
     * Creates a clone of the lazy wrapper object.
     *
     * @private
     * @name clone
     * @memberOf LazyWrapper
     * @returns {Object} Returns the cloned `LazyWrapper` object.
     */function lazyClone(){var result=new LazyWrapper(this.__wrapped__);result.__actions__=copyArray(this.__actions__);result.__dir__=this.__dir__;result.__filtered__=this.__filtered__;result.__iteratees__=copyArray(this.__iteratees__);result.__takeCount__=this.__takeCount__;result.__views__=copyArray(this.__views__);return result;}/**
     * Reverses the direction of lazy iteration.
     *
     * @private
     * @name reverse
     * @memberOf LazyWrapper
     * @returns {Object} Returns the new reversed `LazyWrapper` object.
     */function lazyReverse(){if(this.__filtered__){var result=new LazyWrapper(this);result.__dir__=-1;result.__filtered__=true;}else{result=this.clone();result.__dir__*=-1;}return result;}/**
     * Extracts the unwrapped value from its lazy wrapper.
     *
     * @private
     * @name value
     * @memberOf LazyWrapper
     * @returns {*} Returns the unwrapped value.
     */function lazyValue(){var array=this.__wrapped__.value(),dir=this.__dir__,isArr=isArray(array),isRight=dir<0,arrLength=isArr?array.length:0,view=getView(0,arrLength,this.__views__),start=view.start,end=view.end,length=end-start,index=isRight?end:start-1,iteratees=this.__iteratees__,iterLength=iteratees.length,resIndex=0,takeCount=nativeMin(length,this.__takeCount__);if(!isArr||!isRight&&arrLength==length&&takeCount==length){return baseWrapperValue(array,this.__actions__);}var result=[];outer:while(length--&&resIndex<takeCount){index+=dir;var iterIndex=-1,value=array[index];while(++iterIndex<iterLength){var data=iteratees[iterIndex],iteratee=data.iteratee,type=data.type,computed=iteratee(value);if(type==LAZY_MAP_FLAG){value=computed;}else if(!computed){if(type==LAZY_FILTER_FLAG){continue outer;}else{break outer;}}}result[resIndex++]=value;}return result;}// Ensure `LazyWrapper` is an instance of `baseLodash`.
LazyWrapper.prototype=baseCreate(baseLodash.prototype);LazyWrapper.prototype.constructor=LazyWrapper;/*------------------------------------------------------------------------*/ /**
     * Creates a hash object.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */function Hash(entries){var index=-1,length=entries==null?0:entries.length;this.clear();while(++index<length){var entry=entries[index];this.set(entry[0],entry[1]);}}/**
     * Removes all key-value entries from the hash.
     *
     * @private
     * @name clear
     * @memberOf Hash
     */function hashClear(){this.__data__=nativeCreate?nativeCreate(null):{};this.size=0;}/**
     * Removes `key` and its value from the hash.
     *
     * @private
     * @name delete
     * @memberOf Hash
     * @param {Object} hash The hash to modify.
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */function hashDelete(key){var result=this.has(key)&&delete this.__data__[key];this.size-=result?1:0;return result;}/**
     * Gets the hash value for `key`.
     *
     * @private
     * @name get
     * @memberOf Hash
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */function hashGet(key){var data=this.__data__;if(nativeCreate){var result=data[key];return result===HASH_UNDEFINED?undefined:result;}return hasOwnProperty.call(data,key)?data[key]:undefined;}/**
     * Checks if a hash value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf Hash
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */function hashHas(key){var data=this.__data__;return nativeCreate?data[key]!==undefined:hasOwnProperty.call(data,key);}/**
     * Sets the hash `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf Hash
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the hash instance.
     */function hashSet(key,value){var data=this.__data__;this.size+=this.has(key)?0:1;data[key]=nativeCreate&&value===undefined?HASH_UNDEFINED:value;return this;}// Add methods to `Hash`.
Hash.prototype.clear=hashClear;Hash.prototype['delete']=hashDelete;Hash.prototype.get=hashGet;Hash.prototype.has=hashHas;Hash.prototype.set=hashSet;/*------------------------------------------------------------------------*/ /**
     * Creates an list cache object.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */function ListCache(entries){var index=-1,length=entries==null?0:entries.length;this.clear();while(++index<length){var entry=entries[index];this.set(entry[0],entry[1]);}}/**
     * Removes all key-value entries from the list cache.
     *
     * @private
     * @name clear
     * @memberOf ListCache
     */function listCacheClear(){this.__data__=[];this.size=0;}/**
     * Removes `key` and its value from the list cache.
     *
     * @private
     * @name delete
     * @memberOf ListCache
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */function listCacheDelete(key){var data=this.__data__,index=assocIndexOf(data,key);if(index<0){return false;}var lastIndex=data.length-1;if(index==lastIndex){data.pop();}else{splice.call(data,index,1);}--this.size;return true;}/**
     * Gets the list cache value for `key`.
     *
     * @private
     * @name get
     * @memberOf ListCache
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */function listCacheGet(key){var data=this.__data__,index=assocIndexOf(data,key);return index<0?undefined:data[index][1];}/**
     * Checks if a list cache value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf ListCache
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */function listCacheHas(key){return assocIndexOf(this.__data__,key)>-1;}/**
     * Sets the list cache `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf ListCache
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the list cache instance.
     */function listCacheSet(key,value){var data=this.__data__,index=assocIndexOf(data,key);if(index<0){++this.size;data.push([key,value]);}else{data[index][1]=value;}return this;}// Add methods to `ListCache`.
ListCache.prototype.clear=listCacheClear;ListCache.prototype['delete']=listCacheDelete;ListCache.prototype.get=listCacheGet;ListCache.prototype.has=listCacheHas;ListCache.prototype.set=listCacheSet;/*------------------------------------------------------------------------*/ /**
     * Creates a map cache object to store key-value pairs.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */function MapCache(entries){var index=-1,length=entries==null?0:entries.length;this.clear();while(++index<length){var entry=entries[index];this.set(entry[0],entry[1]);}}/**
     * Removes all key-value entries from the map.
     *
     * @private
     * @name clear
     * @memberOf MapCache
     */function mapCacheClear(){this.size=0;this.__data__={'hash':new Hash(),'map':new(Map||ListCache)(),'string':new Hash()};}/**
     * Removes `key` and its value from the map.
     *
     * @private
     * @name delete
     * @memberOf MapCache
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */function mapCacheDelete(key){var result=getMapData(this,key)['delete'](key);this.size-=result?1:0;return result;}/**
     * Gets the map value for `key`.
     *
     * @private
     * @name get
     * @memberOf MapCache
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */function mapCacheGet(key){return getMapData(this,key).get(key);}/**
     * Checks if a map value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf MapCache
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */function mapCacheHas(key){return getMapData(this,key).has(key);}/**
     * Sets the map `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf MapCache
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the map cache instance.
     */function mapCacheSet(key,value){var data=getMapData(this,key),size=data.size;data.set(key,value);this.size+=data.size==size?0:1;return this;}// Add methods to `MapCache`.
MapCache.prototype.clear=mapCacheClear;MapCache.prototype['delete']=mapCacheDelete;MapCache.prototype.get=mapCacheGet;MapCache.prototype.has=mapCacheHas;MapCache.prototype.set=mapCacheSet;/*------------------------------------------------------------------------*/ /**
     *
     * Creates an array cache object to store unique values.
     *
     * @private
     * @constructor
     * @param {Array} [values] The values to cache.
     */function SetCache(values){var index=-1,length=values==null?0:values.length;this.__data__=new MapCache();while(++index<length){this.add(values[index]);}}/**
     * Adds `value` to the array cache.
     *
     * @private
     * @name add
     * @memberOf SetCache
     * @alias push
     * @param {*} value The value to cache.
     * @returns {Object} Returns the cache instance.
     */function setCacheAdd(value){this.__data__.set(value,HASH_UNDEFINED);return this;}/**
     * Checks if `value` is in the array cache.
     *
     * @private
     * @name has
     * @memberOf SetCache
     * @param {*} value The value to search for.
     * @returns {number} Returns `true` if `value` is found, else `false`.
     */function setCacheHas(value){return this.__data__.has(value);}// Add methods to `SetCache`.
SetCache.prototype.add=SetCache.prototype.push=setCacheAdd;SetCache.prototype.has=setCacheHas;/*------------------------------------------------------------------------*/ /**
     * Creates a stack cache object to store key-value pairs.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */function Stack(entries){var data=this.__data__=new ListCache(entries);this.size=data.size;}/**
     * Removes all key-value entries from the stack.
     *
     * @private
     * @name clear
     * @memberOf Stack
     */function stackClear(){this.__data__=new ListCache();this.size=0;}/**
     * Removes `key` and its value from the stack.
     *
     * @private
     * @name delete
     * @memberOf Stack
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */function stackDelete(key){var data=this.__data__,result=data['delete'](key);this.size=data.size;return result;}/**
     * Gets the stack value for `key`.
     *
     * @private
     * @name get
     * @memberOf Stack
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */function stackGet(key){return this.__data__.get(key);}/**
     * Checks if a stack value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf Stack
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */function stackHas(key){return this.__data__.has(key);}/**
     * Sets the stack `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf Stack
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the stack cache instance.
     */function stackSet(key,value){var data=this.__data__;if(data instanceof ListCache){var pairs=data.__data__;if(!Map||pairs.length<LARGE_ARRAY_SIZE-1){pairs.push([key,value]);this.size=++data.size;return this;}data=this.__data__=new MapCache(pairs);}data.set(key,value);this.size=data.size;return this;}// Add methods to `Stack`.
Stack.prototype.clear=stackClear;Stack.prototype['delete']=stackDelete;Stack.prototype.get=stackGet;Stack.prototype.has=stackHas;Stack.prototype.set=stackSet;/*------------------------------------------------------------------------*/ /**
     * Creates an array of the enumerable property names of the array-like `value`.
     *
     * @private
     * @param {*} value The value to query.
     * @param {boolean} inherited Specify returning inherited property names.
     * @returns {Array} Returns the array of property names.
     */function arrayLikeKeys(value,inherited){var isArr=isArray(value),isArg=!isArr&&isArguments(value),isBuff=!isArr&&!isArg&&isBuffer(value),isType=!isArr&&!isArg&&!isBuff&&isTypedArray(value),skipIndexes=isArr||isArg||isBuff||isType,result=skipIndexes?baseTimes(value.length,String):[],length=result.length;for(var key in value){if((inherited||hasOwnProperty.call(value,key))&&!(skipIndexes&&(// Safari 9 has enumerable `arguments.length` in strict mode.
key=='length'||// Node.js 0.10 has enumerable non-index properties on buffers.
isBuff&&(key=='offset'||key=='parent')||// PhantomJS 2 has enumerable non-index properties on typed arrays.
isType&&(key=='buffer'||key=='byteLength'||key=='byteOffset')||// Skip index properties.
isIndex(key,length)))){result.push(key);}}return result;}/**
     * A specialized version of `_.sample` for arrays.
     *
     * @private
     * @param {Array} array The array to sample.
     * @returns {*} Returns the random element.
     */function arraySample(array){var length=array.length;return length?array[baseRandom(0,length-1)]:undefined;}/**
     * A specialized version of `_.sampleSize` for arrays.
     *
     * @private
     * @param {Array} array The array to sample.
     * @param {number} n The number of elements to sample.
     * @returns {Array} Returns the random elements.
     */function arraySampleSize(array,n){return shuffleSelf(copyArray(array),baseClamp(n,0,array.length));}/**
     * A specialized version of `_.shuffle` for arrays.
     *
     * @private
     * @param {Array} array The array to shuffle.
     * @returns {Array} Returns the new shuffled array.
     */function arrayShuffle(array){return shuffleSelf(copyArray(array));}/**
     * This function is like `assignValue` except that it doesn't assign
     * `undefined` values.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {string} key The key of the property to assign.
     * @param {*} value The value to assign.
     */function assignMergeValue(object,key,value){if(value!==undefined&&!eq(object[key],value)||value===undefined&&!(key in object)){baseAssignValue(object,key,value);}}/**
     * Assigns `value` to `key` of `object` if the existing value is not equivalent
     * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * for equality comparisons.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {string} key The key of the property to assign.
     * @param {*} value The value to assign.
     */function assignValue(object,key,value){var objValue=object[key];if(!(hasOwnProperty.call(object,key)&&eq(objValue,value))||value===undefined&&!(key in object)){baseAssignValue(object,key,value);}}/**
     * Gets the index at which the `key` is found in `array` of key-value pairs.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {*} key The key to search for.
     * @returns {number} Returns the index of the matched value, else `-1`.
     */function assocIndexOf(array,key){var length=array.length;while(length--){if(eq(array[length][0],key)){return length;}}return-1;}/**
     * Aggregates elements of `collection` on `accumulator` with keys transformed
     * by `iteratee` and values set by `setter`.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} setter The function to set `accumulator` values.
     * @param {Function} iteratee The iteratee to transform keys.
     * @param {Object} accumulator The initial aggregated object.
     * @returns {Function} Returns `accumulator`.
     */function baseAggregator(collection,setter,iteratee,accumulator){baseEach(collection,function(value,key,collection){setter(accumulator,value,iteratee(value),collection);});return accumulator;}/**
     * The base implementation of `_.assign` without support for multiple sources
     * or `customizer` functions.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @returns {Object} Returns `object`.
     */function baseAssign(object,source){return object&&copyObject(source,keys(source),object);}/**
     * The base implementation of `_.assignIn` without support for multiple sources
     * or `customizer` functions.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @returns {Object} Returns `object`.
     */function baseAssignIn(object,source){return object&&copyObject(source,keysIn(source),object);}/**
     * The base implementation of `assignValue` and `assignMergeValue` without
     * value checks.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {string} key The key of the property to assign.
     * @param {*} value The value to assign.
     */function baseAssignValue(object,key,value){if(key=='__proto__'&&defineProperty){defineProperty(object,key,{'configurable':true,'enumerable':true,'value':value,'writable':true});}else{object[key]=value;}}/**
     * The base implementation of `_.at` without support for individual paths.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {string[]} paths The property paths to pick.
     * @returns {Array} Returns the picked elements.
     */function baseAt(object,paths){var index=-1,length=paths.length,result=Array(length),skip=object==null;while(++index<length){result[index]=skip?undefined:get(object,paths[index]);}return result;}/**
     * The base implementation of `_.clamp` which doesn't coerce arguments.
     *
     * @private
     * @param {number} number The number to clamp.
     * @param {number} [lower] The lower bound.
     * @param {number} upper The upper bound.
     * @returns {number} Returns the clamped number.
     */function baseClamp(number,lower,upper){if(number===number){if(upper!==undefined){number=number<=upper?number:upper;}if(lower!==undefined){number=number>=lower?number:lower;}}return number;}/**
     * The base implementation of `_.clone` and `_.cloneDeep` which tracks
     * traversed objects.
     *
     * @private
     * @param {*} value The value to clone.
     * @param {boolean} bitmask The bitmask flags.
     *  1 - Deep clone
     *  2 - Flatten inherited properties
     *  4 - Clone symbols
     * @param {Function} [customizer] The function to customize cloning.
     * @param {string} [key] The key of `value`.
     * @param {Object} [object] The parent object of `value`.
     * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
     * @returns {*} Returns the cloned value.
     */function baseClone(value,bitmask,customizer,key,object,stack){var result,isDeep=bitmask&CLONE_DEEP_FLAG,isFlat=bitmask&CLONE_FLAT_FLAG,isFull=bitmask&CLONE_SYMBOLS_FLAG;if(customizer){result=object?customizer(value,key,object,stack):customizer(value);}if(result!==undefined){return result;}if(!isObject(value)){return value;}var isArr=isArray(value);if(isArr){result=initCloneArray(value);if(!isDeep){return copyArray(value,result);}}else{var tag=getTag(value),isFunc=tag==funcTag||tag==genTag;if(isBuffer(value)){return cloneBuffer(value,isDeep);}if(tag==objectTag||tag==argsTag||isFunc&&!object){result=isFlat||isFunc?{}:initCloneObject(value);if(!isDeep){return isFlat?copySymbolsIn(value,baseAssignIn(result,value)):copySymbols(value,baseAssign(result,value));}}else{if(!cloneableTags[tag]){return object?value:{};}result=initCloneByTag(value,tag,isDeep);}}// Check for circular references and return its corresponding clone.
stack||(stack=new Stack());var stacked=stack.get(value);if(stacked){return stacked;}stack.set(value,result);if(isSet(value)){value.forEach(function(subValue){result.add(baseClone(subValue,bitmask,customizer,subValue,value,stack));});}else if(isMap(value)){value.forEach(function(subValue,key){result.set(key,baseClone(subValue,bitmask,customizer,key,value,stack));});}var keysFunc=isFull?isFlat?getAllKeysIn:getAllKeys:isFlat?keysIn:keys;var props=isArr?undefined:keysFunc(value);arrayEach(props||value,function(subValue,key){if(props){key=subValue;subValue=value[key];}// Recursively populate clone (susceptible to call stack limits).
assignValue(result,key,baseClone(subValue,bitmask,customizer,key,value,stack));});return result;}/**
     * The base implementation of `_.conforms` which doesn't clone `source`.
     *
     * @private
     * @param {Object} source The object of property predicates to conform to.
     * @returns {Function} Returns the new spec function.
     */function baseConforms(source){var props=keys(source);return function(object){return baseConformsTo(object,source,props);};}/**
     * The base implementation of `_.conformsTo` which accepts `props` to check.
     *
     * @private
     * @param {Object} object The object to inspect.
     * @param {Object} source The object of property predicates to conform to.
     * @returns {boolean} Returns `true` if `object` conforms, else `false`.
     */function baseConformsTo(object,source,props){var length=props.length;if(object==null){return!length;}object=Object(object);while(length--){var key=props[length],predicate=source[key],value=object[key];if(value===undefined&&!(key in object)||!predicate(value)){return false;}}return true;}/**
     * The base implementation of `_.delay` and `_.defer` which accepts `args`
     * to provide to `func`.
     *
     * @private
     * @param {Function} func The function to delay.
     * @param {number} wait The number of milliseconds to delay invocation.
     * @param {Array} args The arguments to provide to `func`.
     * @returns {number|Object} Returns the timer id or timeout object.
     */function baseDelay(func,wait,args){if(typeof func!='function'){throw new TypeError(FUNC_ERROR_TEXT);}return setTimeout(function(){func.apply(undefined,args);},wait);}/**
     * The base implementation of methods like `_.difference` without support
     * for excluding multiple arrays or iteratee shorthands.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {Array} values The values to exclude.
     * @param {Function} [iteratee] The iteratee invoked per element.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new array of filtered values.
     */function baseDifference(array,values,iteratee,comparator){var index=-1,includes=arrayIncludes,isCommon=true,length=array.length,result=[],valuesLength=values.length;if(!length){return result;}if(iteratee){values=arrayMap(values,baseUnary(iteratee));}if(comparator){includes=arrayIncludesWith;isCommon=false;}else if(values.length>=LARGE_ARRAY_SIZE){includes=cacheHas;isCommon=false;values=new SetCache(values);}outer:while(++index<length){var value=array[index],computed=iteratee==null?value:iteratee(value);value=comparator||value!==0?value:0;if(isCommon&&computed===computed){var valuesIndex=valuesLength;while(valuesIndex--){if(values[valuesIndex]===computed){continue outer;}}result.push(value);}else if(!includes(values,computed,comparator)){result.push(value);}}return result;}/**
     * The base implementation of `_.forEach` without support for iteratee shorthands.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array|Object} Returns `collection`.
     */var baseEach=createBaseEach(baseForOwn);/**
     * The base implementation of `_.forEachRight` without support for iteratee shorthands.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array|Object} Returns `collection`.
     */var baseEachRight=createBaseEach(baseForOwnRight,true);/**
     * The base implementation of `_.every` without support for iteratee shorthands.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} predicate The function invoked per iteration.
     * @returns {boolean} Returns `true` if all elements pass the predicate check,
     *  else `false`
     */function baseEvery(collection,predicate){var result=true;baseEach(collection,function(value,index,collection){result=!!predicate(value,index,collection);return result;});return result;}/**
     * The base implementation of methods like `_.max` and `_.min` which accepts a
     * `comparator` to determine the extremum value.
     *
     * @private
     * @param {Array} array The array to iterate over.
     * @param {Function} iteratee The iteratee invoked per iteration.
     * @param {Function} comparator The comparator used to compare values.
     * @returns {*} Returns the extremum value.
     */function baseExtremum(array,iteratee,comparator){var index=-1,length=array.length;while(++index<length){var value=array[index],current=iteratee(value);if(current!=null&&(computed===undefined?current===current&&!isSymbol(current):comparator(current,computed))){var computed=current,result=value;}}return result;}/**
     * The base implementation of `_.fill` without an iteratee call guard.
     *
     * @private
     * @param {Array} array The array to fill.
     * @param {*} value The value to fill `array` with.
     * @param {number} [start=0] The start position.
     * @param {number} [end=array.length] The end position.
     * @returns {Array} Returns `array`.
     */function baseFill(array,value,start,end){var length=array.length;start=toInteger(start);if(start<0){start=-start>length?0:length+start;}end=end===undefined||end>length?length:toInteger(end);if(end<0){end+=length;}end=start>end?0:toLength(end);while(start<end){array[start++]=value;}return array;}/**
     * The base implementation of `_.filter` without support for iteratee shorthands.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} predicate The function invoked per iteration.
     * @returns {Array} Returns the new filtered array.
     */function baseFilter(collection,predicate){var result=[];baseEach(collection,function(value,index,collection){if(predicate(value,index,collection)){result.push(value);}});return result;}/**
     * The base implementation of `_.flatten` with support for restricting flattening.
     *
     * @private
     * @param {Array} array The array to flatten.
     * @param {number} depth The maximum recursion depth.
     * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
     * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
     * @param {Array} [result=[]] The initial result value.
     * @returns {Array} Returns the new flattened array.
     */function baseFlatten(array,depth,predicate,isStrict,result){var index=-1,length=array.length;predicate||(predicate=isFlattenable);result||(result=[]);while(++index<length){var value=array[index];if(depth>0&&predicate(value)){if(depth>1){// Recursively flatten arrays (susceptible to call stack limits).
baseFlatten(value,depth-1,predicate,isStrict,result);}else{arrayPush(result,value);}}else if(!isStrict){result[result.length]=value;}}return result;}/**
     * The base implementation of `baseForOwn` which iterates over `object`
     * properties returned by `keysFunc` and invokes `iteratee` for each property.
     * Iteratee functions may exit iteration early by explicitly returning `false`.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @param {Function} keysFunc The function to get the keys of `object`.
     * @returns {Object} Returns `object`.
     */var baseFor=createBaseFor();/**
     * This function is like `baseFor` except that it iterates over properties
     * in the opposite order.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @param {Function} keysFunc The function to get the keys of `object`.
     * @returns {Object} Returns `object`.
     */var baseForRight=createBaseFor(true);/**
     * The base implementation of `_.forOwn` without support for iteratee shorthands.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Object} Returns `object`.
     */function baseForOwn(object,iteratee){return object&&baseFor(object,iteratee,keys);}/**
     * The base implementation of `_.forOwnRight` without support for iteratee shorthands.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Object} Returns `object`.
     */function baseForOwnRight(object,iteratee){return object&&baseForRight(object,iteratee,keys);}/**
     * The base implementation of `_.functions` which creates an array of
     * `object` function property names filtered from `props`.
     *
     * @private
     * @param {Object} object The object to inspect.
     * @param {Array} props The property names to filter.
     * @returns {Array} Returns the function names.
     */function baseFunctions(object,props){return arrayFilter(props,function(key){return isFunction(object[key]);});}/**
     * The base implementation of `_.get` without support for default values.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array|string} path The path of the property to get.
     * @returns {*} Returns the resolved value.
     */function baseGet(object,path){path=castPath(path,object);var index=0,length=path.length;while(object!=null&&index<length){object=object[toKey(path[index++])];}return index&&index==length?object:undefined;}/**
     * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
     * `keysFunc` and `symbolsFunc` to get the enumerable property names and
     * symbols of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Function} keysFunc The function to get the keys of `object`.
     * @param {Function} symbolsFunc The function to get the symbols of `object`.
     * @returns {Array} Returns the array of property names and symbols.
     */function baseGetAllKeys(object,keysFunc,symbolsFunc){var result=keysFunc(object);return isArray(object)?result:arrayPush(result,symbolsFunc(object));}/**
     * The base implementation of `getTag` without fallbacks for buggy environments.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {string} Returns the `toStringTag`.
     */function baseGetTag(value){if(value==null){return value===undefined?undefinedTag:nullTag;}return symToStringTag&&symToStringTag in Object(value)?getRawTag(value):objectToString(value);}/**
     * The base implementation of `_.gt` which doesn't coerce arguments.
     *
     * @private
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if `value` is greater than `other`,
     *  else `false`.
     */function baseGt(value,other){return value>other;}/**
     * The base implementation of `_.has` without support for deep paths.
     *
     * @private
     * @param {Object} [object] The object to query.
     * @param {Array|string} key The key to check.
     * @returns {boolean} Returns `true` if `key` exists, else `false`.
     */function baseHas(object,key){return object!=null&&hasOwnProperty.call(object,key);}/**
     * The base implementation of `_.hasIn` without support for deep paths.
     *
     * @private
     * @param {Object} [object] The object to query.
     * @param {Array|string} key The key to check.
     * @returns {boolean} Returns `true` if `key` exists, else `false`.
     */function baseHasIn(object,key){return object!=null&&key in Object(object);}/**
     * The base implementation of `_.inRange` which doesn't coerce arguments.
     *
     * @private
     * @param {number} number The number to check.
     * @param {number} start The start of the range.
     * @param {number} end The end of the range.
     * @returns {boolean} Returns `true` if `number` is in the range, else `false`.
     */function baseInRange(number,start,end){return number>=nativeMin(start,end)&&number<nativeMax(start,end);}/**
     * The base implementation of methods like `_.intersection`, without support
     * for iteratee shorthands, that accepts an array of arrays to inspect.
     *
     * @private
     * @param {Array} arrays The arrays to inspect.
     * @param {Function} [iteratee] The iteratee invoked per element.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new array of shared values.
     */function baseIntersection(arrays,iteratee,comparator){var includes=comparator?arrayIncludesWith:arrayIncludes,length=arrays[0].length,othLength=arrays.length,othIndex=othLength,caches=Array(othLength),maxLength=Infinity,result=[];while(othIndex--){var array=arrays[othIndex];if(othIndex&&iteratee){array=arrayMap(array,baseUnary(iteratee));}maxLength=nativeMin(array.length,maxLength);caches[othIndex]=!comparator&&(iteratee||length>=120&&array.length>=120)?new SetCache(othIndex&&array):undefined;}array=arrays[0];var index=-1,seen=caches[0];outer:while(++index<length&&result.length<maxLength){var value=array[index],computed=iteratee?iteratee(value):value;value=comparator||value!==0?value:0;if(!(seen?cacheHas(seen,computed):includes(result,computed,comparator))){othIndex=othLength;while(--othIndex){var cache=caches[othIndex];if(!(cache?cacheHas(cache,computed):includes(arrays[othIndex],computed,comparator))){continue outer;}}if(seen){seen.push(computed);}result.push(value);}}return result;}/**
     * The base implementation of `_.invert` and `_.invertBy` which inverts
     * `object` with values transformed by `iteratee` and set by `setter`.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} setter The function to set `accumulator` values.
     * @param {Function} iteratee The iteratee to transform values.
     * @param {Object} accumulator The initial inverted object.
     * @returns {Function} Returns `accumulator`.
     */function baseInverter(object,setter,iteratee,accumulator){baseForOwn(object,function(value,key,object){setter(accumulator,iteratee(value),key,object);});return accumulator;}/**
     * The base implementation of `_.invoke` without support for individual
     * method arguments.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array|string} path The path of the method to invoke.
     * @param {Array} args The arguments to invoke the method with.
     * @returns {*} Returns the result of the invoked method.
     */function baseInvoke(object,path,args){path=castPath(path,object);object=parent(object,path);var func=object==null?object:object[toKey(last(path))];return func==null?undefined:apply(func,object,args);}/**
     * The base implementation of `_.isArguments`.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an `arguments` object,
     */function baseIsArguments(value){return isObjectLike(value)&&baseGetTag(value)==argsTag;}/**
     * The base implementation of `_.isArrayBuffer` without Node.js optimizations.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an array buffer, else `false`.
     */function baseIsArrayBuffer(value){return isObjectLike(value)&&baseGetTag(value)==arrayBufferTag;}/**
     * The base implementation of `_.isDate` without Node.js optimizations.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a date object, else `false`.
     */function baseIsDate(value){return isObjectLike(value)&&baseGetTag(value)==dateTag;}/**
     * The base implementation of `_.isEqual` which supports partial comparisons
     * and tracks traversed objects.
     *
     * @private
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @param {boolean} bitmask The bitmask flags.
     *  1 - Unordered comparison
     *  2 - Partial comparison
     * @param {Function} [customizer] The function to customize comparisons.
     * @param {Object} [stack] Tracks traversed `value` and `other` objects.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     */function baseIsEqual(value,other,bitmask,customizer,stack){if(value===other){return true;}if(value==null||other==null||!isObjectLike(value)&&!isObjectLike(other)){return value!==value&&other!==other;}return baseIsEqualDeep(value,other,bitmask,customizer,baseIsEqual,stack);}/**
     * A specialized version of `baseIsEqual` for arrays and objects which performs
     * deep comparisons and tracks traversed objects enabling objects with circular
     * references to be compared.
     *
     * @private
     * @param {Object} object The object to compare.
     * @param {Object} other The other object to compare.
     * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
     * @param {Function} customizer The function to customize comparisons.
     * @param {Function} equalFunc The function to determine equivalents of values.
     * @param {Object} [stack] Tracks traversed `object` and `other` objects.
     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
     */function baseIsEqualDeep(object,other,bitmask,customizer,equalFunc,stack){var objIsArr=isArray(object),othIsArr=isArray(other),objTag=objIsArr?arrayTag:getTag(object),othTag=othIsArr?arrayTag:getTag(other);objTag=objTag==argsTag?objectTag:objTag;othTag=othTag==argsTag?objectTag:othTag;var objIsObj=objTag==objectTag,othIsObj=othTag==objectTag,isSameTag=objTag==othTag;if(isSameTag&&isBuffer(object)){if(!isBuffer(other)){return false;}objIsArr=true;objIsObj=false;}if(isSameTag&&!objIsObj){stack||(stack=new Stack());return objIsArr||isTypedArray(object)?equalArrays(object,other,bitmask,customizer,equalFunc,stack):equalByTag(object,other,objTag,bitmask,customizer,equalFunc,stack);}if(!(bitmask&COMPARE_PARTIAL_FLAG)){var objIsWrapped=objIsObj&&hasOwnProperty.call(object,'__wrapped__'),othIsWrapped=othIsObj&&hasOwnProperty.call(other,'__wrapped__');if(objIsWrapped||othIsWrapped){var objUnwrapped=objIsWrapped?object.value():object,othUnwrapped=othIsWrapped?other.value():other;stack||(stack=new Stack());return equalFunc(objUnwrapped,othUnwrapped,bitmask,customizer,stack);}}if(!isSameTag){return false;}stack||(stack=new Stack());return equalObjects(object,other,bitmask,customizer,equalFunc,stack);}/**
     * The base implementation of `_.isMap` without Node.js optimizations.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a map, else `false`.
     */function baseIsMap(value){return isObjectLike(value)&&getTag(value)==mapTag;}/**
     * The base implementation of `_.isMatch` without support for iteratee shorthands.
     *
     * @private
     * @param {Object} object The object to inspect.
     * @param {Object} source The object of property values to match.
     * @param {Array} matchData The property names, values, and compare flags to match.
     * @param {Function} [customizer] The function to customize comparisons.
     * @returns {boolean} Returns `true` if `object` is a match, else `false`.
     */function baseIsMatch(object,source,matchData,customizer){var index=matchData.length,length=index,noCustomizer=!customizer;if(object==null){return!length;}object=Object(object);while(index--){var data=matchData[index];if(noCustomizer&&data[2]?data[1]!==object[data[0]]:!(data[0]in object)){return false;}}while(++index<length){data=matchData[index];var key=data[0],objValue=object[key],srcValue=data[1];if(noCustomizer&&data[2]){if(objValue===undefined&&!(key in object)){return false;}}else{var stack=new Stack();if(customizer){var result=customizer(objValue,srcValue,key,object,source,stack);}if(!(result===undefined?baseIsEqual(srcValue,objValue,COMPARE_PARTIAL_FLAG|COMPARE_UNORDERED_FLAG,customizer,stack):result)){return false;}}}return true;}/**
     * The base implementation of `_.isNative` without bad shim checks.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a native function,
     *  else `false`.
     */function baseIsNative(value){if(!isObject(value)||isMasked(value)){return false;}var pattern=isFunction(value)?reIsNative:reIsHostCtor;return pattern.test(toSource(value));}/**
     * The base implementation of `_.isRegExp` without Node.js optimizations.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a regexp, else `false`.
     */function baseIsRegExp(value){return isObjectLike(value)&&baseGetTag(value)==regexpTag;}/**
     * The base implementation of `_.isSet` without Node.js optimizations.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a set, else `false`.
     */function baseIsSet(value){return isObjectLike(value)&&getTag(value)==setTag;}/**
     * The base implementation of `_.isTypedArray` without Node.js optimizations.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
     */function baseIsTypedArray(value){return isObjectLike(value)&&isLength(value.length)&&!!typedArrayTags[baseGetTag(value)];}/**
     * The base implementation of `_.iteratee`.
     *
     * @private
     * @param {*} [value=_.identity] The value to convert to an iteratee.
     * @returns {Function} Returns the iteratee.
     */function baseIteratee(value){// Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
// See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
if(typeof value=='function'){return value;}if(value==null){return identity;}if(typeof value=='object'){return isArray(value)?baseMatchesProperty(value[0],value[1]):baseMatches(value);}return property(value);}/**
     * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     */function baseKeys(object){if(!isPrototype(object)){return nativeKeys(object);}var result=[];for(var key in Object(object)){if(hasOwnProperty.call(object,key)&&key!='constructor'){result.push(key);}}return result;}/**
     * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     */function baseKeysIn(object){if(!isObject(object)){return nativeKeysIn(object);}var isProto=isPrototype(object),result=[];for(var key in object){if(!(key=='constructor'&&(isProto||!hasOwnProperty.call(object,key)))){result.push(key);}}return result;}/**
     * The base implementation of `_.lt` which doesn't coerce arguments.
     *
     * @private
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if `value` is less than `other`,
     *  else `false`.
     */function baseLt(value,other){return value<other;}/**
     * The base implementation of `_.map` without support for iteratee shorthands.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array} Returns the new mapped array.
     */function baseMap(collection,iteratee){var index=-1,result=isArrayLike(collection)?Array(collection.length):[];baseEach(collection,function(value,key,collection){result[++index]=iteratee(value,key,collection);});return result;}/**
     * The base implementation of `_.matches` which doesn't clone `source`.
     *
     * @private
     * @param {Object} source The object of property values to match.
     * @returns {Function} Returns the new spec function.
     */function baseMatches(source){var matchData=getMatchData(source);if(matchData.length==1&&matchData[0][2]){return matchesStrictComparable(matchData[0][0],matchData[0][1]);}return function(object){return object===source||baseIsMatch(object,source,matchData);};}/**
     * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
     *
     * @private
     * @param {string} path The path of the property to get.
     * @param {*} srcValue The value to match.
     * @returns {Function} Returns the new spec function.
     */function baseMatchesProperty(path,srcValue){if(isKey(path)&&isStrictComparable(srcValue)){return matchesStrictComparable(toKey(path),srcValue);}return function(object){var objValue=get(object,path);return objValue===undefined&&objValue===srcValue?hasIn(object,path):baseIsEqual(srcValue,objValue,COMPARE_PARTIAL_FLAG|COMPARE_UNORDERED_FLAG);};}/**
     * The base implementation of `_.merge` without support for multiple sources.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @param {number} srcIndex The index of `source`.
     * @param {Function} [customizer] The function to customize merged values.
     * @param {Object} [stack] Tracks traversed source values and their merged
     *  counterparts.
     */function baseMerge(object,source,srcIndex,customizer,stack){if(object===source){return;}baseFor(source,function(srcValue,key){stack||(stack=new Stack());if(isObject(srcValue)){baseMergeDeep(object,source,key,srcIndex,baseMerge,customizer,stack);}else{var newValue=customizer?customizer(safeGet(object,key),srcValue,key+'',object,source,stack):undefined;if(newValue===undefined){newValue=srcValue;}assignMergeValue(object,key,newValue);}},keysIn);}/**
     * A specialized version of `baseMerge` for arrays and objects which performs
     * deep merges and tracks traversed objects enabling objects with circular
     * references to be merged.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @param {string} key The key of the value to merge.
     * @param {number} srcIndex The index of `source`.
     * @param {Function} mergeFunc The function to merge values.
     * @param {Function} [customizer] The function to customize assigned values.
     * @param {Object} [stack] Tracks traversed source values and their merged
     *  counterparts.
     */function baseMergeDeep(object,source,key,srcIndex,mergeFunc,customizer,stack){var objValue=safeGet(object,key),srcValue=safeGet(source,key),stacked=stack.get(srcValue);if(stacked){assignMergeValue(object,key,stacked);return;}var newValue=customizer?customizer(objValue,srcValue,key+'',object,source,stack):undefined;var isCommon=newValue===undefined;if(isCommon){var isArr=isArray(srcValue),isBuff=!isArr&&isBuffer(srcValue),isTyped=!isArr&&!isBuff&&isTypedArray(srcValue);newValue=srcValue;if(isArr||isBuff||isTyped){if(isArray(objValue)){newValue=objValue;}else if(isArrayLikeObject(objValue)){newValue=copyArray(objValue);}else if(isBuff){isCommon=false;newValue=cloneBuffer(srcValue,true);}else if(isTyped){isCommon=false;newValue=cloneTypedArray(srcValue,true);}else{newValue=[];}}else if(isPlainObject(srcValue)||isArguments(srcValue)){newValue=objValue;if(isArguments(objValue)){newValue=toPlainObject(objValue);}else if(!isObject(objValue)||isFunction(objValue)){newValue=initCloneObject(srcValue);}}else{isCommon=false;}}if(isCommon){// Recursively merge objects and arrays (susceptible to call stack limits).
stack.set(srcValue,newValue);mergeFunc(newValue,srcValue,srcIndex,customizer,stack);stack['delete'](srcValue);}assignMergeValue(object,key,newValue);}/**
     * The base implementation of `_.nth` which doesn't coerce arguments.
     *
     * @private
     * @param {Array} array The array to query.
     * @param {number} n The index of the element to return.
     * @returns {*} Returns the nth element of `array`.
     */function baseNth(array,n){var length=array.length;if(!length){return;}n+=n<0?length:0;return isIndex(n,length)?array[n]:undefined;}/**
     * The base implementation of `_.orderBy` without param guards.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function[]|Object[]|string[]} iteratees The iteratees to sort by.
     * @param {string[]} orders The sort orders of `iteratees`.
     * @returns {Array} Returns the new sorted array.
     */function baseOrderBy(collection,iteratees,orders){if(iteratees.length){iteratees=arrayMap(iteratees,function(iteratee){if(isArray(iteratee)){return function(value){return baseGet(value,iteratee.length===1?iteratee[0]:iteratee);};}return iteratee;});}else{iteratees=[identity];}var index=-1;iteratees=arrayMap(iteratees,baseUnary(getIteratee()));var result=baseMap(collection,function(value,key,collection){var criteria=arrayMap(iteratees,function(iteratee){return iteratee(value);});return{'criteria':criteria,'index':++index,'value':value};});return baseSortBy(result,function(object,other){return compareMultiple(object,other,orders);});}/**
     * The base implementation of `_.pick` without support for individual
     * property identifiers.
     *
     * @private
     * @param {Object} object The source object.
     * @param {string[]} paths The property paths to pick.
     * @returns {Object} Returns the new object.
     */function basePick(object,paths){return basePickBy(object,paths,function(value,path){return hasIn(object,path);});}/**
     * The base implementation of  `_.pickBy` without support for iteratee shorthands.
     *
     * @private
     * @param {Object} object The source object.
     * @param {string[]} paths The property paths to pick.
     * @param {Function} predicate The function invoked per property.
     * @returns {Object} Returns the new object.
     */function basePickBy(object,paths,predicate){var index=-1,length=paths.length,result={};while(++index<length){var path=paths[index],value=baseGet(object,path);if(predicate(value,path)){baseSet(result,castPath(path,object),value);}}return result;}/**
     * A specialized version of `baseProperty` which supports deep paths.
     *
     * @private
     * @param {Array|string} path The path of the property to get.
     * @returns {Function} Returns the new accessor function.
     */function basePropertyDeep(path){return function(object){return baseGet(object,path);};}/**
     * The base implementation of `_.pullAllBy` without support for iteratee
     * shorthands.
     *
     * @private
     * @param {Array} array The array to modify.
     * @param {Array} values The values to remove.
     * @param {Function} [iteratee] The iteratee invoked per element.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns `array`.
     */function basePullAll(array,values,iteratee,comparator){var indexOf=comparator?baseIndexOfWith:baseIndexOf,index=-1,length=values.length,seen=array;if(array===values){values=copyArray(values);}if(iteratee){seen=arrayMap(array,baseUnary(iteratee));}while(++index<length){var fromIndex=0,value=values[index],computed=iteratee?iteratee(value):value;while((fromIndex=indexOf(seen,computed,fromIndex,comparator))>-1){if(seen!==array){splice.call(seen,fromIndex,1);}splice.call(array,fromIndex,1);}}return array;}/**
     * The base implementation of `_.pullAt` without support for individual
     * indexes or capturing the removed elements.
     *
     * @private
     * @param {Array} array The array to modify.
     * @param {number[]} indexes The indexes of elements to remove.
     * @returns {Array} Returns `array`.
     */function basePullAt(array,indexes){var length=array?indexes.length:0,lastIndex=length-1;while(length--){var index=indexes[length];if(length==lastIndex||index!==previous){var previous=index;if(isIndex(index)){splice.call(array,index,1);}else{baseUnset(array,index);}}}return array;}/**
     * The base implementation of `_.random` without support for returning
     * floating-point numbers.
     *
     * @private
     * @param {number} lower The lower bound.
     * @param {number} upper The upper bound.
     * @returns {number} Returns the random number.
     */function baseRandom(lower,upper){return lower+nativeFloor(nativeRandom()*(upper-lower+1));}/**
     * The base implementation of `_.range` and `_.rangeRight` which doesn't
     * coerce arguments.
     *
     * @private
     * @param {number} start The start of the range.
     * @param {number} end The end of the range.
     * @param {number} step The value to increment or decrement by.
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Array} Returns the range of numbers.
     */function baseRange(start,end,step,fromRight){var index=-1,length=nativeMax(nativeCeil((end-start)/(step||1)),0),result=Array(length);while(length--){result[fromRight?length:++index]=start;start+=step;}return result;}/**
     * The base implementation of `_.repeat` which doesn't coerce arguments.
     *
     * @private
     * @param {string} string The string to repeat.
     * @param {number} n The number of times to repeat the string.
     * @returns {string} Returns the repeated string.
     */function baseRepeat(string,n){var result='';if(!string||n<1||n>MAX_SAFE_INTEGER){return result;}// Leverage the exponentiation by squaring algorithm for a faster repeat.
// See https://en.wikipedia.org/wiki/Exponentiation_by_squaring for more details.
do{if(n%2){result+=string;}n=nativeFloor(n/2);if(n){string+=string;}}while(n);return result;}/**
     * The base implementation of `_.rest` which doesn't validate or coerce arguments.
     *
     * @private
     * @param {Function} func The function to apply a rest parameter to.
     * @param {number} [start=func.length-1] The start position of the rest parameter.
     * @returns {Function} Returns the new function.
     */function baseRest(func,start){return setToString(overRest(func,start,identity),func+'');}/**
     * The base implementation of `_.sample`.
     *
     * @private
     * @param {Array|Object} collection The collection to sample.
     * @returns {*} Returns the random element.
     */function baseSample(collection){return arraySample(values(collection));}/**
     * The base implementation of `_.sampleSize` without param guards.
     *
     * @private
     * @param {Array|Object} collection The collection to sample.
     * @param {number} n The number of elements to sample.
     * @returns {Array} Returns the random elements.
     */function baseSampleSize(collection,n){var array=values(collection);return shuffleSelf(array,baseClamp(n,0,array.length));}/**
     * The base implementation of `_.set`.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {Array|string} path The path of the property to set.
     * @param {*} value The value to set.
     * @param {Function} [customizer] The function to customize path creation.
     * @returns {Object} Returns `object`.
     */function baseSet(object,path,value,customizer){if(!isObject(object)){return object;}path=castPath(path,object);var index=-1,length=path.length,lastIndex=length-1,nested=object;while(nested!=null&&++index<length){var key=toKey(path[index]),newValue=value;if(key==='__proto__'||key==='constructor'||key==='prototype'){return object;}if(index!=lastIndex){var objValue=nested[key];newValue=customizer?customizer(objValue,key,nested):undefined;if(newValue===undefined){newValue=isObject(objValue)?objValue:isIndex(path[index+1])?[]:{};}}assignValue(nested,key,newValue);nested=nested[key];}return object;}/**
     * The base implementation of `setData` without support for hot loop shorting.
     *
     * @private
     * @param {Function} func The function to associate metadata with.
     * @param {*} data The metadata.
     * @returns {Function} Returns `func`.
     */var baseSetData=!metaMap?identity:function(func,data){metaMap.set(func,data);return func;};/**
     * The base implementation of `setToString` without support for hot loop shorting.
     *
     * @private
     * @param {Function} func The function to modify.
     * @param {Function} string The `toString` result.
     * @returns {Function} Returns `func`.
     */var baseSetToString=!defineProperty?identity:function(func,string){return defineProperty(func,'toString',{'configurable':true,'enumerable':false,'value':constant(string),'writable':true});};/**
     * The base implementation of `_.shuffle`.
     *
     * @private
     * @param {Array|Object} collection The collection to shuffle.
     * @returns {Array} Returns the new shuffled array.
     */function baseShuffle(collection){return shuffleSelf(values(collection));}/**
     * The base implementation of `_.slice` without an iteratee call guard.
     *
     * @private
     * @param {Array} array The array to slice.
     * @param {number} [start=0] The start position.
     * @param {number} [end=array.length] The end position.
     * @returns {Array} Returns the slice of `array`.
     */function baseSlice(array,start,end){var index=-1,length=array.length;if(start<0){start=-start>length?0:length+start;}end=end>length?length:end;if(end<0){end+=length;}length=start>end?0:end-start>>>0;start>>>=0;var result=Array(length);while(++index<length){result[index]=array[index+start];}return result;}/**
     * The base implementation of `_.some` without support for iteratee shorthands.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} predicate The function invoked per iteration.
     * @returns {boolean} Returns `true` if any element passes the predicate check,
     *  else `false`.
     */function baseSome(collection,predicate){var result;baseEach(collection,function(value,index,collection){result=predicate(value,index,collection);return!result;});return!!result;}/**
     * The base implementation of `_.sortedIndex` and `_.sortedLastIndex` which
     * performs a binary search of `array` to determine the index at which `value`
     * should be inserted into `array` in order to maintain its sort order.
     *
     * @private
     * @param {Array} array The sorted array to inspect.
     * @param {*} value The value to evaluate.
     * @param {boolean} [retHighest] Specify returning the highest qualified index.
     * @returns {number} Returns the index at which `value` should be inserted
     *  into `array`.
     */function baseSortedIndex(array,value,retHighest){var low=0,high=array==null?low:array.length;if(typeof value=='number'&&value===value&&high<=HALF_MAX_ARRAY_LENGTH){while(low<high){var mid=low+high>>>1,computed=array[mid];if(computed!==null&&!isSymbol(computed)&&(retHighest?computed<=value:computed<value)){low=mid+1;}else{high=mid;}}return high;}return baseSortedIndexBy(array,value,identity,retHighest);}/**
     * The base implementation of `_.sortedIndexBy` and `_.sortedLastIndexBy`
     * which invokes `iteratee` for `value` and each element of `array` to compute
     * their sort ranking. The iteratee is invoked with one argument; (value).
     *
     * @private
     * @param {Array} array The sorted array to inspect.
     * @param {*} value The value to evaluate.
     * @param {Function} iteratee The iteratee invoked per element.
     * @param {boolean} [retHighest] Specify returning the highest qualified index.
     * @returns {number} Returns the index at which `value` should be inserted
     *  into `array`.
     */function baseSortedIndexBy(array,value,iteratee,retHighest){var low=0,high=array==null?0:array.length;if(high===0){return 0;}value=iteratee(value);var valIsNaN=value!==value,valIsNull=value===null,valIsSymbol=isSymbol(value),valIsUndefined=value===undefined;while(low<high){var mid=nativeFloor((low+high)/2),computed=iteratee(array[mid]),othIsDefined=computed!==undefined,othIsNull=computed===null,othIsReflexive=computed===computed,othIsSymbol=isSymbol(computed);if(valIsNaN){var setLow=retHighest||othIsReflexive;}else if(valIsUndefined){setLow=othIsReflexive&&(retHighest||othIsDefined);}else if(valIsNull){setLow=othIsReflexive&&othIsDefined&&(retHighest||!othIsNull);}else if(valIsSymbol){setLow=othIsReflexive&&othIsDefined&&!othIsNull&&(retHighest||!othIsSymbol);}else if(othIsNull||othIsSymbol){setLow=false;}else{setLow=retHighest?computed<=value:computed<value;}if(setLow){low=mid+1;}else{high=mid;}}return nativeMin(high,MAX_ARRAY_INDEX);}/**
     * The base implementation of `_.sortedUniq` and `_.sortedUniqBy` without
     * support for iteratee shorthands.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {Function} [iteratee] The iteratee invoked per element.
     * @returns {Array} Returns the new duplicate free array.
     */function baseSortedUniq(array,iteratee){var index=-1,length=array.length,resIndex=0,result=[];while(++index<length){var value=array[index],computed=iteratee?iteratee(value):value;if(!index||!eq(computed,seen)){var seen=computed;result[resIndex++]=value===0?0:value;}}return result;}/**
     * The base implementation of `_.toNumber` which doesn't ensure correct
     * conversions of binary, hexadecimal, or octal string values.
     *
     * @private
     * @param {*} value The value to process.
     * @returns {number} Returns the number.
     */function baseToNumber(value){if(typeof value=='number'){return value;}if(isSymbol(value)){return NAN;}return+value;}/**
     * The base implementation of `_.toString` which doesn't convert nullish
     * values to empty strings.
     *
     * @private
     * @param {*} value The value to process.
     * @returns {string} Returns the string.
     */function baseToString(value){// Exit early for strings to avoid a performance hit in some environments.
if(typeof value=='string'){return value;}if(isArray(value)){// Recursively convert values (susceptible to call stack limits).
return arrayMap(value,baseToString)+'';}if(isSymbol(value)){return symbolToString?symbolToString.call(value):'';}var result=value+'';return result=='0'&&1/value==-INFINITY?'-0':result;}/**
     * The base implementation of `_.uniqBy` without support for iteratee shorthands.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {Function} [iteratee] The iteratee invoked per element.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new duplicate free array.
     */function baseUniq(array,iteratee,comparator){var index=-1,includes=arrayIncludes,length=array.length,isCommon=true,result=[],seen=result;if(comparator){isCommon=false;includes=arrayIncludesWith;}else if(length>=LARGE_ARRAY_SIZE){var set=iteratee?null:createSet(array);if(set){return setToArray(set);}isCommon=false;includes=cacheHas;seen=new SetCache();}else{seen=iteratee?[]:result;}outer:while(++index<length){var value=array[index],computed=iteratee?iteratee(value):value;value=comparator||value!==0?value:0;if(isCommon&&computed===computed){var seenIndex=seen.length;while(seenIndex--){if(seen[seenIndex]===computed){continue outer;}}if(iteratee){seen.push(computed);}result.push(value);}else if(!includes(seen,computed,comparator)){if(seen!==result){seen.push(computed);}result.push(value);}}return result;}/**
     * The base implementation of `_.unset`.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {Array|string} path The property path to unset.
     * @returns {boolean} Returns `true` if the property is deleted, else `false`.
     */function baseUnset(object,path){path=castPath(path,object);object=parent(object,path);return object==null||delete object[toKey(last(path))];}/**
     * The base implementation of `_.update`.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {Array|string} path The path of the property to update.
     * @param {Function} updater The function to produce the updated value.
     * @param {Function} [customizer] The function to customize path creation.
     * @returns {Object} Returns `object`.
     */function baseUpdate(object,path,updater,customizer){return baseSet(object,path,updater(baseGet(object,path)),customizer);}/**
     * The base implementation of methods like `_.dropWhile` and `_.takeWhile`
     * without support for iteratee shorthands.
     *
     * @private
     * @param {Array} array The array to query.
     * @param {Function} predicate The function invoked per iteration.
     * @param {boolean} [isDrop] Specify dropping elements instead of taking them.
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Array} Returns the slice of `array`.
     */function baseWhile(array,predicate,isDrop,fromRight){var length=array.length,index=fromRight?length:-1;while((fromRight?index--:++index<length)&&predicate(array[index],index,array)){}return isDrop?baseSlice(array,fromRight?0:index,fromRight?index+1:length):baseSlice(array,fromRight?index+1:0,fromRight?length:index);}/**
     * The base implementation of `wrapperValue` which returns the result of
     * performing a sequence of actions on the unwrapped `value`, where each
     * successive action is supplied the return value of the previous.
     *
     * @private
     * @param {*} value The unwrapped value.
     * @param {Array} actions Actions to perform to resolve the unwrapped value.
     * @returns {*} Returns the resolved value.
     */function baseWrapperValue(value,actions){var result=value;if(result instanceof LazyWrapper){result=result.value();}return arrayReduce(actions,function(result,action){return action.func.apply(action.thisArg,arrayPush([result],action.args));},result);}/**
     * The base implementation of methods like `_.xor`, without support for
     * iteratee shorthands, that accepts an array of arrays to inspect.
     *
     * @private
     * @param {Array} arrays The arrays to inspect.
     * @param {Function} [iteratee] The iteratee invoked per element.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new array of values.
     */function baseXor(arrays,iteratee,comparator){var length=arrays.length;if(length<2){return length?baseUniq(arrays[0]):[];}var index=-1,result=Array(length);while(++index<length){var array=arrays[index],othIndex=-1;while(++othIndex<length){if(othIndex!=index){result[index]=baseDifference(result[index]||array,arrays[othIndex],iteratee,comparator);}}}return baseUniq(baseFlatten(result,1),iteratee,comparator);}/**
     * This base implementation of `_.zipObject` which assigns values using `assignFunc`.
     *
     * @private
     * @param {Array} props The property identifiers.
     * @param {Array} values The property values.
     * @param {Function} assignFunc The function to assign values.
     * @returns {Object} Returns the new object.
     */function baseZipObject(props,values,assignFunc){var index=-1,length=props.length,valsLength=values.length,result={};while(++index<length){var value=index<valsLength?values[index]:undefined;assignFunc(result,props[index],value);}return result;}/**
     * Casts `value` to an empty array if it's not an array like object.
     *
     * @private
     * @param {*} value The value to inspect.
     * @returns {Array|Object} Returns the cast array-like object.
     */function castArrayLikeObject(value){return isArrayLikeObject(value)?value:[];}/**
     * Casts `value` to `identity` if it's not a function.
     *
     * @private
     * @param {*} value The value to inspect.
     * @returns {Function} Returns cast function.
     */function castFunction(value){return typeof value=='function'?value:identity;}/**
     * Casts `value` to a path array if it's not one.
     *
     * @private
     * @param {*} value The value to inspect.
     * @param {Object} [object] The object to query keys on.
     * @returns {Array} Returns the cast property path array.
     */function castPath(value,object){if(isArray(value)){return value;}return isKey(value,object)?[value]:stringToPath(toString(value));}/**
     * A `baseRest` alias which can be replaced with `identity` by module
     * replacement plugins.
     *
     * @private
     * @type {Function}
     * @param {Function} func The function to apply a rest parameter to.
     * @returns {Function} Returns the new function.
     */var castRest=baseRest;/**
     * Casts `array` to a slice if it's needed.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {number} start The start position.
     * @param {number} [end=array.length] The end position.
     * @returns {Array} Returns the cast slice.
     */function castSlice(array,start,end){var length=array.length;end=end===undefined?length:end;return!start&&end>=length?array:baseSlice(array,start,end);}/**
     * A simple wrapper around the global [`clearTimeout`](https://mdn.io/clearTimeout).
     *
     * @private
     * @param {number|Object} id The timer id or timeout object of the timer to clear.
     */var clearTimeout=ctxClearTimeout||function(id){return root.clearTimeout(id);};/**
     * Creates a clone of  `buffer`.
     *
     * @private
     * @param {Buffer} buffer The buffer to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Buffer} Returns the cloned buffer.
     */function cloneBuffer(buffer,isDeep){if(isDeep){return buffer.slice();}var length=buffer.length,result=allocUnsafe?allocUnsafe(length):new buffer.constructor(length);buffer.copy(result);return result;}/**
     * Creates a clone of `arrayBuffer`.
     *
     * @private
     * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
     * @returns {ArrayBuffer} Returns the cloned array buffer.
     */function cloneArrayBuffer(arrayBuffer){var result=new arrayBuffer.constructor(arrayBuffer.byteLength);new Uint8Array(result).set(new Uint8Array(arrayBuffer));return result;}/**
     * Creates a clone of `dataView`.
     *
     * @private
     * @param {Object} dataView The data view to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Object} Returns the cloned data view.
     */function cloneDataView(dataView,isDeep){var buffer=isDeep?cloneArrayBuffer(dataView.buffer):dataView.buffer;return new dataView.constructor(buffer,dataView.byteOffset,dataView.byteLength);}/**
     * Creates a clone of `regexp`.
     *
     * @private
     * @param {Object} regexp The regexp to clone.
     * @returns {Object} Returns the cloned regexp.
     */function cloneRegExp(regexp){var result=new regexp.constructor(regexp.source,reFlags.exec(regexp));result.lastIndex=regexp.lastIndex;return result;}/**
     * Creates a clone of the `symbol` object.
     *
     * @private
     * @param {Object} symbol The symbol object to clone.
     * @returns {Object} Returns the cloned symbol object.
     */function cloneSymbol(symbol){return symbolValueOf?Object(symbolValueOf.call(symbol)):{};}/**
     * Creates a clone of `typedArray`.
     *
     * @private
     * @param {Object} typedArray The typed array to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Object} Returns the cloned typed array.
     */function cloneTypedArray(typedArray,isDeep){var buffer=isDeep?cloneArrayBuffer(typedArray.buffer):typedArray.buffer;return new typedArray.constructor(buffer,typedArray.byteOffset,typedArray.length);}/**
     * Compares values to sort them in ascending order.
     *
     * @private
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {number} Returns the sort order indicator for `value`.
     */function compareAscending(value,other){if(value!==other){var valIsDefined=value!==undefined,valIsNull=value===null,valIsReflexive=value===value,valIsSymbol=isSymbol(value);var othIsDefined=other!==undefined,othIsNull=other===null,othIsReflexive=other===other,othIsSymbol=isSymbol(other);if(!othIsNull&&!othIsSymbol&&!valIsSymbol&&value>other||valIsSymbol&&othIsDefined&&othIsReflexive&&!othIsNull&&!othIsSymbol||valIsNull&&othIsDefined&&othIsReflexive||!valIsDefined&&othIsReflexive||!valIsReflexive){return 1;}if(!valIsNull&&!valIsSymbol&&!othIsSymbol&&value<other||othIsSymbol&&valIsDefined&&valIsReflexive&&!valIsNull&&!valIsSymbol||othIsNull&&valIsDefined&&valIsReflexive||!othIsDefined&&valIsReflexive||!othIsReflexive){return-1;}}return 0;}/**
     * Used by `_.orderBy` to compare multiple properties of a value to another
     * and stable sort them.
     *
     * If `orders` is unspecified, all values are sorted in ascending order. Otherwise,
     * specify an order of "desc" for descending or "asc" for ascending sort order
     * of corresponding values.
     *
     * @private
     * @param {Object} object The object to compare.
     * @param {Object} other The other object to compare.
     * @param {boolean[]|string[]} orders The order to sort by for each property.
     * @returns {number} Returns the sort order indicator for `object`.
     */function compareMultiple(object,other,orders){var index=-1,objCriteria=object.criteria,othCriteria=other.criteria,length=objCriteria.length,ordersLength=orders.length;while(++index<length){var result=compareAscending(objCriteria[index],othCriteria[index]);if(result){if(index>=ordersLength){return result;}var order=orders[index];return result*(order=='desc'?-1:1);}}// Fixes an `Array#sort` bug in the JS engine embedded in Adobe applications
// that causes it, under certain circumstances, to provide the same value for
// `object` and `other`. See https://github.com/jashkenas/underscore/pull/1247
// for more details.
//
// This also ensures a stable sort in V8 and other engines.
// See https://bugs.chromium.org/p/v8/issues/detail?id=90 for more details.
return object.index-other.index;}/**
     * Creates an array that is the composition of partially applied arguments,
     * placeholders, and provided arguments into a single array of arguments.
     *
     * @private
     * @param {Array} args The provided arguments.
     * @param {Array} partials The arguments to prepend to those provided.
     * @param {Array} holders The `partials` placeholder indexes.
     * @params {boolean} [isCurried] Specify composing for a curried function.
     * @returns {Array} Returns the new array of composed arguments.
     */function composeArgs(args,partials,holders,isCurried){var argsIndex=-1,argsLength=args.length,holdersLength=holders.length,leftIndex=-1,leftLength=partials.length,rangeLength=nativeMax(argsLength-holdersLength,0),result=Array(leftLength+rangeLength),isUncurried=!isCurried;while(++leftIndex<leftLength){result[leftIndex]=partials[leftIndex];}while(++argsIndex<holdersLength){if(isUncurried||argsIndex<argsLength){result[holders[argsIndex]]=args[argsIndex];}}while(rangeLength--){result[leftIndex++]=args[argsIndex++];}return result;}/**
     * This function is like `composeArgs` except that the arguments composition
     * is tailored for `_.partialRight`.
     *
     * @private
     * @param {Array} args The provided arguments.
     * @param {Array} partials The arguments to append to those provided.
     * @param {Array} holders The `partials` placeholder indexes.
     * @params {boolean} [isCurried] Specify composing for a curried function.
     * @returns {Array} Returns the new array of composed arguments.
     */function composeArgsRight(args,partials,holders,isCurried){var argsIndex=-1,argsLength=args.length,holdersIndex=-1,holdersLength=holders.length,rightIndex=-1,rightLength=partials.length,rangeLength=nativeMax(argsLength-holdersLength,0),result=Array(rangeLength+rightLength),isUncurried=!isCurried;while(++argsIndex<rangeLength){result[argsIndex]=args[argsIndex];}var offset=argsIndex;while(++rightIndex<rightLength){result[offset+rightIndex]=partials[rightIndex];}while(++holdersIndex<holdersLength){if(isUncurried||argsIndex<argsLength){result[offset+holders[holdersIndex]]=args[argsIndex++];}}return result;}/**
     * Copies the values of `source` to `array`.
     *
     * @private
     * @param {Array} source The array to copy values from.
     * @param {Array} [array=[]] The array to copy values to.
     * @returns {Array} Returns `array`.
     */function copyArray(source,array){var index=-1,length=source.length;array||(array=Array(length));while(++index<length){array[index]=source[index];}return array;}/**
     * Copies properties of `source` to `object`.
     *
     * @private
     * @param {Object} source The object to copy properties from.
     * @param {Array} props The property identifiers to copy.
     * @param {Object} [object={}] The object to copy properties to.
     * @param {Function} [customizer] The function to customize copied values.
     * @returns {Object} Returns `object`.
     */function copyObject(source,props,object,customizer){var isNew=!object;object||(object={});var index=-1,length=props.length;while(++index<length){var key=props[index];var newValue=customizer?customizer(object[key],source[key],key,object,source):undefined;if(newValue===undefined){newValue=source[key];}if(isNew){baseAssignValue(object,key,newValue);}else{assignValue(object,key,newValue);}}return object;}/**
     * Copies own symbols of `source` to `object`.
     *
     * @private
     * @param {Object} source The object to copy symbols from.
     * @param {Object} [object={}] The object to copy symbols to.
     * @returns {Object} Returns `object`.
     */function copySymbols(source,object){return copyObject(source,getSymbols(source),object);}/**
     * Copies own and inherited symbols of `source` to `object`.
     *
     * @private
     * @param {Object} source The object to copy symbols from.
     * @param {Object} [object={}] The object to copy symbols to.
     * @returns {Object} Returns `object`.
     */function copySymbolsIn(source,object){return copyObject(source,getSymbolsIn(source),object);}/**
     * Creates a function like `_.groupBy`.
     *
     * @private
     * @param {Function} setter The function to set accumulator values.
     * @param {Function} [initializer] The accumulator object initializer.
     * @returns {Function} Returns the new aggregator function.
     */function createAggregator(setter,initializer){return function(collection,iteratee){var func=isArray(collection)?arrayAggregator:baseAggregator,accumulator=initializer?initializer():{};return func(collection,setter,getIteratee(iteratee,2),accumulator);};}/**
     * Creates a function like `_.assign`.
     *
     * @private
     * @param {Function} assigner The function to assign values.
     * @returns {Function} Returns the new assigner function.
     */function createAssigner(assigner){return baseRest(function(object,sources){var index=-1,length=sources.length,customizer=length>1?sources[length-1]:undefined,guard=length>2?sources[2]:undefined;customizer=assigner.length>3&&typeof customizer=='function'?(length--,customizer):undefined;if(guard&&isIterateeCall(sources[0],sources[1],guard)){customizer=length<3?undefined:customizer;length=1;}object=Object(object);while(++index<length){var source=sources[index];if(source){assigner(object,source,index,customizer);}}return object;});}/**
     * Creates a `baseEach` or `baseEachRight` function.
     *
     * @private
     * @param {Function} eachFunc The function to iterate over a collection.
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Function} Returns the new base function.
     */function createBaseEach(eachFunc,fromRight){return function(collection,iteratee){if(collection==null){return collection;}if(!isArrayLike(collection)){return eachFunc(collection,iteratee);}var length=collection.length,index=fromRight?length:-1,iterable=Object(collection);while(fromRight?index--:++index<length){if(iteratee(iterable[index],index,iterable)===false){break;}}return collection;};}/**
     * Creates a base function for methods like `_.forIn` and `_.forOwn`.
     *
     * @private
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Function} Returns the new base function.
     */function createBaseFor(fromRight){return function(object,iteratee,keysFunc){var index=-1,iterable=Object(object),props=keysFunc(object),length=props.length;while(length--){var key=props[fromRight?length:++index];if(iteratee(iterable[key],key,iterable)===false){break;}}return object;};}/**
     * Creates a function that wraps `func` to invoke it with the optional `this`
     * binding of `thisArg`.
     *
     * @private
     * @param {Function} func The function to wrap.
     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
     * @param {*} [thisArg] The `this` binding of `func`.
     * @returns {Function} Returns the new wrapped function.
     */function createBind(func,bitmask,thisArg){var isBind=bitmask&WRAP_BIND_FLAG,Ctor=createCtor(func);function wrapper(){var fn=this&&this!==root&&this instanceof wrapper?Ctor:func;return fn.apply(isBind?thisArg:this,arguments);}return wrapper;}/**
     * Creates a function like `_.lowerFirst`.
     *
     * @private
     * @param {string} methodName The name of the `String` case method to use.
     * @returns {Function} Returns the new case function.
     */function createCaseFirst(methodName){return function(string){string=toString(string);var strSymbols=hasUnicode(string)?stringToArray(string):undefined;var chr=strSymbols?strSymbols[0]:string.charAt(0);var trailing=strSymbols?castSlice(strSymbols,1).join(''):string.slice(1);return chr[methodName]()+trailing;};}/**
     * Creates a function like `_.camelCase`.
     *
     * @private
     * @param {Function} callback The function to combine each word.
     * @returns {Function} Returns the new compounder function.
     */function createCompounder(callback){return function(string){return arrayReduce(words(deburr(string).replace(reApos,'')),callback,'');};}/**
     * Creates a function that produces an instance of `Ctor` regardless of
     * whether it was invoked as part of a `new` expression or by `call` or `apply`.
     *
     * @private
     * @param {Function} Ctor The constructor to wrap.
     * @returns {Function} Returns the new wrapped function.
     */function createCtor(Ctor){return function(){// Use a `switch` statement to work with class constructors. See
// http://ecma-international.org/ecma-262/7.0/#sec-ecmascript-function-objects-call-thisargument-argumentslist
// for more details.
var args=arguments;switch(args.length){case 0:return new Ctor();case 1:return new Ctor(args[0]);case 2:return new Ctor(args[0],args[1]);case 3:return new Ctor(args[0],args[1],args[2]);case 4:return new Ctor(args[0],args[1],args[2],args[3]);case 5:return new Ctor(args[0],args[1],args[2],args[3],args[4]);case 6:return new Ctor(args[0],args[1],args[2],args[3],args[4],args[5]);case 7:return new Ctor(args[0],args[1],args[2],args[3],args[4],args[5],args[6]);}var thisBinding=baseCreate(Ctor.prototype),result=Ctor.apply(thisBinding,args);// Mimic the constructor's `return` behavior.
// See https://es5.github.io/#x13.2.2 for more details.
return isObject(result)?result:thisBinding;};}/**
     * Creates a function that wraps `func` to enable currying.
     *
     * @private
     * @param {Function} func The function to wrap.
     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
     * @param {number} arity The arity of `func`.
     * @returns {Function} Returns the new wrapped function.
     */function createCurry(func,bitmask,arity){var Ctor=createCtor(func);function wrapper(){var length=arguments.length,args=Array(length),index=length,placeholder=getHolder(wrapper);while(index--){args[index]=arguments[index];}var holders=length<3&&args[0]!==placeholder&&args[length-1]!==placeholder?[]:replaceHolders(args,placeholder);length-=holders.length;if(length<arity){return createRecurry(func,bitmask,createHybrid,wrapper.placeholder,undefined,args,holders,undefined,undefined,arity-length);}var fn=this&&this!==root&&this instanceof wrapper?Ctor:func;return apply(fn,this,args);}return wrapper;}/**
     * Creates a `_.find` or `_.findLast` function.
     *
     * @private
     * @param {Function} findIndexFunc The function to find the collection index.
     * @returns {Function} Returns the new find function.
     */function createFind(findIndexFunc){return function(collection,predicate,fromIndex){var iterable=Object(collection);if(!isArrayLike(collection)){var iteratee=getIteratee(predicate,3);collection=keys(collection);predicate=function(key){return iteratee(iterable[key],key,iterable);};}var index=findIndexFunc(collection,predicate,fromIndex);return index>-1?iterable[iteratee?collection[index]:index]:undefined;};}/**
     * Creates a `_.flow` or `_.flowRight` function.
     *
     * @private
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Function} Returns the new flow function.
     */function createFlow(fromRight){return flatRest(function(funcs){var length=funcs.length,index=length,prereq=LodashWrapper.prototype.thru;if(fromRight){funcs.reverse();}while(index--){var func=funcs[index];if(typeof func!='function'){throw new TypeError(FUNC_ERROR_TEXT);}if(prereq&&!wrapper&&getFuncName(func)=='wrapper'){var wrapper=new LodashWrapper([],true);}}index=wrapper?index:length;while(++index<length){func=funcs[index];var funcName=getFuncName(func),data=funcName=='wrapper'?getData(func):undefined;if(data&&isLaziable(data[0])&&data[1]==(WRAP_ARY_FLAG|WRAP_CURRY_FLAG|WRAP_PARTIAL_FLAG|WRAP_REARG_FLAG)&&!data[4].length&&data[9]==1){wrapper=wrapper[getFuncName(data[0])].apply(wrapper,data[3]);}else{wrapper=func.length==1&&isLaziable(func)?wrapper[funcName]():wrapper.thru(func);}}return function(){var args=arguments,value=args[0];if(wrapper&&args.length==1&&isArray(value)){return wrapper.plant(value).value();}var index=0,result=length?funcs[index].apply(this,args):value;while(++index<length){result=funcs[index].call(this,result);}return result;};});}/**
     * Creates a function that wraps `func` to invoke it with optional `this`
     * binding of `thisArg`, partial application, and currying.
     *
     * @private
     * @param {Function|string} func The function or method name to wrap.
     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
     * @param {*} [thisArg] The `this` binding of `func`.
     * @param {Array} [partials] The arguments to prepend to those provided to
     *  the new function.
     * @param {Array} [holders] The `partials` placeholder indexes.
     * @param {Array} [partialsRight] The arguments to append to those provided
     *  to the new function.
     * @param {Array} [holdersRight] The `partialsRight` placeholder indexes.
     * @param {Array} [argPos] The argument positions of the new function.
     * @param {number} [ary] The arity cap of `func`.
     * @param {number} [arity] The arity of `func`.
     * @returns {Function} Returns the new wrapped function.
     */function createHybrid(func,bitmask,thisArg,partials,holders,partialsRight,holdersRight,argPos,ary,arity){var isAry=bitmask&WRAP_ARY_FLAG,isBind=bitmask&WRAP_BIND_FLAG,isBindKey=bitmask&WRAP_BIND_KEY_FLAG,isCurried=bitmask&(WRAP_CURRY_FLAG|WRAP_CURRY_RIGHT_FLAG),isFlip=bitmask&WRAP_FLIP_FLAG,Ctor=isBindKey?undefined:createCtor(func);function wrapper(){var length=arguments.length,args=Array(length),index=length;while(index--){args[index]=arguments[index];}if(isCurried){var placeholder=getHolder(wrapper),holdersCount=countHolders(args,placeholder);}if(partials){args=composeArgs(args,partials,holders,isCurried);}if(partialsRight){args=composeArgsRight(args,partialsRight,holdersRight,isCurried);}length-=holdersCount;if(isCurried&&length<arity){var newHolders=replaceHolders(args,placeholder);return createRecurry(func,bitmask,createHybrid,wrapper.placeholder,thisArg,args,newHolders,argPos,ary,arity-length);}var thisBinding=isBind?thisArg:this,fn=isBindKey?thisBinding[func]:func;length=args.length;if(argPos){args=reorder(args,argPos);}else if(isFlip&&length>1){args.reverse();}if(isAry&&ary<length){args.length=ary;}if(this&&this!==root&&this instanceof wrapper){fn=Ctor||createCtor(fn);}return fn.apply(thisBinding,args);}return wrapper;}/**
     * Creates a function like `_.invertBy`.
     *
     * @private
     * @param {Function} setter The function to set accumulator values.
     * @param {Function} toIteratee The function to resolve iteratees.
     * @returns {Function} Returns the new inverter function.
     */function createInverter(setter,toIteratee){return function(object,iteratee){return baseInverter(object,setter,toIteratee(iteratee),{});};}/**
     * Creates a function that performs a mathematical operation on two values.
     *
     * @private
     * @param {Function} operator The function to perform the operation.
     * @param {number} [defaultValue] The value used for `undefined` arguments.
     * @returns {Function} Returns the new mathematical operation function.
     */function createMathOperation(operator,defaultValue){return function(value,other){var result;if(value===undefined&&other===undefined){return defaultValue;}if(value!==undefined){result=value;}if(other!==undefined){if(result===undefined){return other;}if(typeof value=='string'||typeof other=='string'){value=baseToString(value);other=baseToString(other);}else{value=baseToNumber(value);other=baseToNumber(other);}result=operator(value,other);}return result;};}/**
     * Creates a function like `_.over`.
     *
     * @private
     * @param {Function} arrayFunc The function to iterate over iteratees.
     * @returns {Function} Returns the new over function.
     */function createOver(arrayFunc){return flatRest(function(iteratees){iteratees=arrayMap(iteratees,baseUnary(getIteratee()));return baseRest(function(args){var thisArg=this;return arrayFunc(iteratees,function(iteratee){return apply(iteratee,thisArg,args);});});});}/**
     * Creates the padding for `string` based on `length`. The `chars` string
     * is truncated if the number of characters exceeds `length`.
     *
     * @private
     * @param {number} length The padding length.
     * @param {string} [chars=' '] The string used as padding.
     * @returns {string} Returns the padding for `string`.
     */function createPadding(length,chars){chars=chars===undefined?' ':baseToString(chars);var charsLength=chars.length;if(charsLength<2){return charsLength?baseRepeat(chars,length):chars;}var result=baseRepeat(chars,nativeCeil(length/stringSize(chars)));return hasUnicode(chars)?castSlice(stringToArray(result),0,length).join(''):result.slice(0,length);}/**
     * Creates a function that wraps `func` to invoke it with the `this` binding
     * of `thisArg` and `partials` prepended to the arguments it receives.
     *
     * @private
     * @param {Function} func The function to wrap.
     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
     * @param {*} thisArg The `this` binding of `func`.
     * @param {Array} partials The arguments to prepend to those provided to
     *  the new function.
     * @returns {Function} Returns the new wrapped function.
     */function createPartial(func,bitmask,thisArg,partials){var isBind=bitmask&WRAP_BIND_FLAG,Ctor=createCtor(func);function wrapper(){var argsIndex=-1,argsLength=arguments.length,leftIndex=-1,leftLength=partials.length,args=Array(leftLength+argsLength),fn=this&&this!==root&&this instanceof wrapper?Ctor:func;while(++leftIndex<leftLength){args[leftIndex]=partials[leftIndex];}while(argsLength--){args[leftIndex++]=arguments[++argsIndex];}return apply(fn,isBind?thisArg:this,args);}return wrapper;}/**
     * Creates a `_.range` or `_.rangeRight` function.
     *
     * @private
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Function} Returns the new range function.
     */function createRange(fromRight){return function(start,end,step){if(step&&typeof step!='number'&&isIterateeCall(start,end,step)){end=step=undefined;}// Ensure the sign of `-0` is preserved.
start=toFinite(start);if(end===undefined){end=start;start=0;}else{end=toFinite(end);}step=step===undefined?start<end?1:-1:toFinite(step);return baseRange(start,end,step,fromRight);};}/**
     * Creates a function that performs a relational operation on two values.
     *
     * @private
     * @param {Function} operator The function to perform the operation.
     * @returns {Function} Returns the new relational operation function.
     */function createRelationalOperation(operator){return function(value,other){if(!(typeof value=='string'&&typeof other=='string')){value=toNumber(value);other=toNumber(other);}return operator(value,other);};}/**
     * Creates a function that wraps `func` to continue currying.
     *
     * @private
     * @param {Function} func The function to wrap.
     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
     * @param {Function} wrapFunc The function to create the `func` wrapper.
     * @param {*} placeholder The placeholder value.
     * @param {*} [thisArg] The `this` binding of `func`.
     * @param {Array} [partials] The arguments to prepend to those provided to
     *  the new function.
     * @param {Array} [holders] The `partials` placeholder indexes.
     * @param {Array} [argPos] The argument positions of the new function.
     * @param {number} [ary] The arity cap of `func`.
     * @param {number} [arity] The arity of `func`.
     * @returns {Function} Returns the new wrapped function.
     */function createRecurry(func,bitmask,wrapFunc,placeholder,thisArg,partials,holders,argPos,ary,arity){var isCurry=bitmask&WRAP_CURRY_FLAG,newHolders=isCurry?holders:undefined,newHoldersRight=isCurry?undefined:holders,newPartials=isCurry?partials:undefined,newPartialsRight=isCurry?undefined:partials;bitmask|=isCurry?WRAP_PARTIAL_FLAG:WRAP_PARTIAL_RIGHT_FLAG;bitmask&=~(isCurry?WRAP_PARTIAL_RIGHT_FLAG:WRAP_PARTIAL_FLAG);if(!(bitmask&WRAP_CURRY_BOUND_FLAG)){bitmask&=~(WRAP_BIND_FLAG|WRAP_BIND_KEY_FLAG);}var newData=[func,bitmask,thisArg,newPartials,newHolders,newPartialsRight,newHoldersRight,argPos,ary,arity];var result=wrapFunc.apply(undefined,newData);if(isLaziable(func)){setData(result,newData);}result.placeholder=placeholder;return setWrapToString(result,func,bitmask);}/**
     * Creates a function like `_.round`.
     *
     * @private
     * @param {string} methodName The name of the `Math` method to use when rounding.
     * @returns {Function} Returns the new round function.
     */function createRound(methodName){var func=Math[methodName];return function(number,precision){number=toNumber(number);precision=precision==null?0:nativeMin(toInteger(precision),292);if(precision&&nativeIsFinite(number)){// Shift with exponential notation to avoid floating-point issues.
// See [MDN](https://mdn.io/round#Examples) for more details.
var pair=(toString(number)+'e').split('e'),value=func(pair[0]+'e'+(+pair[1]+precision));pair=(toString(value)+'e').split('e');return+(pair[0]+'e'+(+pair[1]-precision));}return func(number);};}/**
     * Creates a set object of `values`.
     *
     * @private
     * @param {Array} values The values to add to the set.
     * @returns {Object} Returns the new set.
     */var createSet=!(Set&&1/setToArray(new Set([,-0]))[1]==INFINITY)?noop:function(values){return new Set(values);};/**
     * Creates a `_.toPairs` or `_.toPairsIn` function.
     *
     * @private
     * @param {Function} keysFunc The function to get the keys of a given object.
     * @returns {Function} Returns the new pairs function.
     */function createToPairs(keysFunc){return function(object){var tag=getTag(object);if(tag==mapTag){return mapToArray(object);}if(tag==setTag){return setToPairs(object);}return baseToPairs(object,keysFunc(object));};}/**
     * Creates a function that either curries or invokes `func` with optional
     * `this` binding and partially applied arguments.
     *
     * @private
     * @param {Function|string} func The function or method name to wrap.
     * @param {number} bitmask The bitmask flags.
     *    1 - `_.bind`
     *    2 - `_.bindKey`
     *    4 - `_.curry` or `_.curryRight` of a bound function
     *    8 - `_.curry`
     *   16 - `_.curryRight`
     *   32 - `_.partial`
     *   64 - `_.partialRight`
     *  128 - `_.rearg`
     *  256 - `_.ary`
     *  512 - `_.flip`
     * @param {*} [thisArg] The `this` binding of `func`.
     * @param {Array} [partials] The arguments to be partially applied.
     * @param {Array} [holders] The `partials` placeholder indexes.
     * @param {Array} [argPos] The argument positions of the new function.
     * @param {number} [ary] The arity cap of `func`.
     * @param {number} [arity] The arity of `func`.
     * @returns {Function} Returns the new wrapped function.
     */function createWrap(func,bitmask,thisArg,partials,holders,argPos,ary,arity){var isBindKey=bitmask&WRAP_BIND_KEY_FLAG;if(!isBindKey&&typeof func!='function'){throw new TypeError(FUNC_ERROR_TEXT);}var length=partials?partials.length:0;if(!length){bitmask&=~(WRAP_PARTIAL_FLAG|WRAP_PARTIAL_RIGHT_FLAG);partials=holders=undefined;}ary=ary===undefined?ary:nativeMax(toInteger(ary),0);arity=arity===undefined?arity:toInteger(arity);length-=holders?holders.length:0;if(bitmask&WRAP_PARTIAL_RIGHT_FLAG){var partialsRight=partials,holdersRight=holders;partials=holders=undefined;}var data=isBindKey?undefined:getData(func);var newData=[func,bitmask,thisArg,partials,holders,partialsRight,holdersRight,argPos,ary,arity];if(data){mergeData(newData,data);}func=newData[0];bitmask=newData[1];thisArg=newData[2];partials=newData[3];holders=newData[4];arity=newData[9]=newData[9]===undefined?isBindKey?0:func.length:nativeMax(newData[9]-length,0);if(!arity&&bitmask&(WRAP_CURRY_FLAG|WRAP_CURRY_RIGHT_FLAG)){bitmask&=~(WRAP_CURRY_FLAG|WRAP_CURRY_RIGHT_FLAG);}if(!bitmask||bitmask==WRAP_BIND_FLAG){var result=createBind(func,bitmask,thisArg);}else if(bitmask==WRAP_CURRY_FLAG||bitmask==WRAP_CURRY_RIGHT_FLAG){result=createCurry(func,bitmask,arity);}else if((bitmask==WRAP_PARTIAL_FLAG||bitmask==(WRAP_BIND_FLAG|WRAP_PARTIAL_FLAG))&&!holders.length){result=createPartial(func,bitmask,thisArg,partials);}else{result=createHybrid.apply(undefined,newData);}var setter=data?baseSetData:setData;return setWrapToString(setter(result,newData),func,bitmask);}/**
     * Used by `_.defaults` to customize its `_.assignIn` use to assign properties
     * of source objects to the destination object for all destination properties
     * that resolve to `undefined`.
     *
     * @private
     * @param {*} objValue The destination value.
     * @param {*} srcValue The source value.
     * @param {string} key The key of the property to assign.
     * @param {Object} object The parent object of `objValue`.
     * @returns {*} Returns the value to assign.
     */function customDefaultsAssignIn(objValue,srcValue,key,object){if(objValue===undefined||eq(objValue,objectProto[key])&&!hasOwnProperty.call(object,key)){return srcValue;}return objValue;}/**
     * Used by `_.defaultsDeep` to customize its `_.merge` use to merge source
     * objects into destination objects that are passed thru.
     *
     * @private
     * @param {*} objValue The destination value.
     * @param {*} srcValue The source value.
     * @param {string} key The key of the property to merge.
     * @param {Object} object The parent object of `objValue`.
     * @param {Object} source The parent object of `srcValue`.
     * @param {Object} [stack] Tracks traversed source values and their merged
     *  counterparts.
     * @returns {*} Returns the value to assign.
     */function customDefaultsMerge(objValue,srcValue,key,object,source,stack){if(isObject(objValue)&&isObject(srcValue)){// Recursively merge objects and arrays (susceptible to call stack limits).
stack.set(srcValue,objValue);baseMerge(objValue,srcValue,undefined,customDefaultsMerge,stack);stack['delete'](srcValue);}return objValue;}/**
     * Used by `_.omit` to customize its `_.cloneDeep` use to only clone plain
     * objects.
     *
     * @private
     * @param {*} value The value to inspect.
     * @param {string} key The key of the property to inspect.
     * @returns {*} Returns the uncloned value or `undefined` to defer cloning to `_.cloneDeep`.
     */function customOmitClone(value){return isPlainObject(value)?undefined:value;}/**
     * A specialized version of `baseIsEqualDeep` for arrays with support for
     * partial deep comparisons.
     *
     * @private
     * @param {Array} array The array to compare.
     * @param {Array} other The other array to compare.
     * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
     * @param {Function} customizer The function to customize comparisons.
     * @param {Function} equalFunc The function to determine equivalents of values.
     * @param {Object} stack Tracks traversed `array` and `other` objects.
     * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
     */function equalArrays(array,other,bitmask,customizer,equalFunc,stack){var isPartial=bitmask&COMPARE_PARTIAL_FLAG,arrLength=array.length,othLength=other.length;if(arrLength!=othLength&&!(isPartial&&othLength>arrLength)){return false;}// Check that cyclic values are equal.
var arrStacked=stack.get(array);var othStacked=stack.get(other);if(arrStacked&&othStacked){return arrStacked==other&&othStacked==array;}var index=-1,result=true,seen=bitmask&COMPARE_UNORDERED_FLAG?new SetCache():undefined;stack.set(array,other);stack.set(other,array);// Ignore non-index properties.
while(++index<arrLength){var arrValue=array[index],othValue=other[index];if(customizer){var compared=isPartial?customizer(othValue,arrValue,index,other,array,stack):customizer(arrValue,othValue,index,array,other,stack);}if(compared!==undefined){if(compared){continue;}result=false;break;}// Recursively compare arrays (susceptible to call stack limits).
if(seen){if(!arraySome(other,function(othValue,othIndex){if(!cacheHas(seen,othIndex)&&(arrValue===othValue||equalFunc(arrValue,othValue,bitmask,customizer,stack))){return seen.push(othIndex);}})){result=false;break;}}else if(!(arrValue===othValue||equalFunc(arrValue,othValue,bitmask,customizer,stack))){result=false;break;}}stack['delete'](array);stack['delete'](other);return result;}/**
     * A specialized version of `baseIsEqualDeep` for comparing objects of
     * the same `toStringTag`.
     *
     * **Note:** This function only supports comparing values with tags of
     * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
     *
     * @private
     * @param {Object} object The object to compare.
     * @param {Object} other The other object to compare.
     * @param {string} tag The `toStringTag` of the objects to compare.
     * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
     * @param {Function} customizer The function to customize comparisons.
     * @param {Function} equalFunc The function to determine equivalents of values.
     * @param {Object} stack Tracks traversed `object` and `other` objects.
     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
     */function equalByTag(object,other,tag,bitmask,customizer,equalFunc,stack){switch(tag){case dataViewTag:if(object.byteLength!=other.byteLength||object.byteOffset!=other.byteOffset){return false;}object=object.buffer;other=other.buffer;case arrayBufferTag:if(object.byteLength!=other.byteLength||!equalFunc(new Uint8Array(object),new Uint8Array(other))){return false;}return true;case boolTag:case dateTag:case numberTag:// Coerce booleans to `1` or `0` and dates to milliseconds.
// Invalid dates are coerced to `NaN`.
return eq(+object,+other);case errorTag:return object.name==other.name&&object.message==other.message;case regexpTag:case stringTag:// Coerce regexes to strings and treat strings, primitives and objects,
// as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
// for more details.
return object==other+'';case mapTag:var convert=mapToArray;case setTag:var isPartial=bitmask&COMPARE_PARTIAL_FLAG;convert||(convert=setToArray);if(object.size!=other.size&&!isPartial){return false;}// Assume cyclic values are equal.
var stacked=stack.get(object);if(stacked){return stacked==other;}bitmask|=COMPARE_UNORDERED_FLAG;// Recursively compare objects (susceptible to call stack limits).
stack.set(object,other);var result=equalArrays(convert(object),convert(other),bitmask,customizer,equalFunc,stack);stack['delete'](object);return result;case symbolTag:if(symbolValueOf){return symbolValueOf.call(object)==symbolValueOf.call(other);}}return false;}/**
     * A specialized version of `baseIsEqualDeep` for objects with support for
     * partial deep comparisons.
     *
     * @private
     * @param {Object} object The object to compare.
     * @param {Object} other The other object to compare.
     * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
     * @param {Function} customizer The function to customize comparisons.
     * @param {Function} equalFunc The function to determine equivalents of values.
     * @param {Object} stack Tracks traversed `object` and `other` objects.
     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
     */function equalObjects(object,other,bitmask,customizer,equalFunc,stack){var isPartial=bitmask&COMPARE_PARTIAL_FLAG,objProps=getAllKeys(object),objLength=objProps.length,othProps=getAllKeys(other),othLength=othProps.length;if(objLength!=othLength&&!isPartial){return false;}var index=objLength;while(index--){var key=objProps[index];if(!(isPartial?key in other:hasOwnProperty.call(other,key))){return false;}}// Check that cyclic values are equal.
var objStacked=stack.get(object);var othStacked=stack.get(other);if(objStacked&&othStacked){return objStacked==other&&othStacked==object;}var result=true;stack.set(object,other);stack.set(other,object);var skipCtor=isPartial;while(++index<objLength){key=objProps[index];var objValue=object[key],othValue=other[key];if(customizer){var compared=isPartial?customizer(othValue,objValue,key,other,object,stack):customizer(objValue,othValue,key,object,other,stack);}// Recursively compare objects (susceptible to call stack limits).
if(!(compared===undefined?objValue===othValue||equalFunc(objValue,othValue,bitmask,customizer,stack):compared)){result=false;break;}skipCtor||(skipCtor=key=='constructor');}if(result&&!skipCtor){var objCtor=object.constructor,othCtor=other.constructor;// Non `Object` object instances with different constructors are not equal.
if(objCtor!=othCtor&&'constructor'in object&&'constructor'in other&&!(typeof objCtor=='function'&&objCtor instanceof objCtor&&typeof othCtor=='function'&&othCtor instanceof othCtor)){result=false;}}stack['delete'](object);stack['delete'](other);return result;}/**
     * A specialized version of `baseRest` which flattens the rest array.
     *
     * @private
     * @param {Function} func The function to apply a rest parameter to.
     * @returns {Function} Returns the new function.
     */function flatRest(func){return setToString(overRest(func,undefined,flatten),func+'');}/**
     * Creates an array of own enumerable property names and symbols of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names and symbols.
     */function getAllKeys(object){return baseGetAllKeys(object,keys,getSymbols);}/**
     * Creates an array of own and inherited enumerable property names and
     * symbols of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names and symbols.
     */function getAllKeysIn(object){return baseGetAllKeys(object,keysIn,getSymbolsIn);}/**
     * Gets metadata for `func`.
     *
     * @private
     * @param {Function} func The function to query.
     * @returns {*} Returns the metadata for `func`.
     */var getData=!metaMap?noop:function(func){return metaMap.get(func);};/**
     * Gets the name of `func`.
     *
     * @private
     * @param {Function} func The function to query.
     * @returns {string} Returns the function name.
     */function getFuncName(func){var result=func.name+'',array=realNames[result],length=hasOwnProperty.call(realNames,result)?array.length:0;while(length--){var data=array[length],otherFunc=data.func;if(otherFunc==null||otherFunc==func){return data.name;}}return result;}/**
     * Gets the argument placeholder value for `func`.
     *
     * @private
     * @param {Function} func The function to inspect.
     * @returns {*} Returns the placeholder value.
     */function getHolder(func){var object=hasOwnProperty.call(lodash,'placeholder')?lodash:func;return object.placeholder;}/**
     * Gets the appropriate "iteratee" function. If `_.iteratee` is customized,
     * this function returns the custom method, otherwise it returns `baseIteratee`.
     * If arguments are provided, the chosen function is invoked with them and
     * its result is returned.
     *
     * @private
     * @param {*} [value] The value to convert to an iteratee.
     * @param {number} [arity] The arity of the created iteratee.
     * @returns {Function} Returns the chosen function or its result.
     */function getIteratee(){var result=lodash.iteratee||iteratee;result=result===iteratee?baseIteratee:result;return arguments.length?result(arguments[0],arguments[1]):result;}/**
     * Gets the data for `map`.
     *
     * @private
     * @param {Object} map The map to query.
     * @param {string} key The reference key.
     * @returns {*} Returns the map data.
     */function getMapData(map,key){var data=map.__data__;return isKeyable(key)?data[typeof key=='string'?'string':'hash']:data.map;}/**
     * Gets the property names, values, and compare flags of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the match data of `object`.
     */function getMatchData(object){var result=keys(object),length=result.length;while(length--){var key=result[length],value=object[key];result[length]=[key,value,isStrictComparable(value)];}return result;}/**
     * Gets the native function at `key` of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {string} key The key of the method to get.
     * @returns {*} Returns the function if it's native, else `undefined`.
     */function getNative(object,key){var value=getValue(object,key);return baseIsNative(value)?value:undefined;}/**
     * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {string} Returns the raw `toStringTag`.
     */function getRawTag(value){var isOwn=hasOwnProperty.call(value,symToStringTag),tag=value[symToStringTag];try{value[symToStringTag]=undefined;var unmasked=true;}catch(e){}var result=nativeObjectToString.call(value);if(unmasked){if(isOwn){value[symToStringTag]=tag;}else{delete value[symToStringTag];}}return result;}/**
     * Creates an array of the own enumerable symbols of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of symbols.
     */var getSymbols=!nativeGetSymbols?stubArray:function(object){if(object==null){return[];}object=Object(object);return arrayFilter(nativeGetSymbols(object),function(symbol){return propertyIsEnumerable.call(object,symbol);});};/**
     * Creates an array of the own and inherited enumerable symbols of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of symbols.
     */var getSymbolsIn=!nativeGetSymbols?stubArray:function(object){var result=[];while(object){arrayPush(result,getSymbols(object));object=getPrototype(object);}return result;};/**
     * Gets the `toStringTag` of `value`.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {string} Returns the `toStringTag`.
     */var getTag=baseGetTag;// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if(DataView&&getTag(new DataView(new ArrayBuffer(1)))!=dataViewTag||Map&&getTag(new Map())!=mapTag||Promise&&getTag(Promise.resolve())!=promiseTag||Set&&getTag(new Set())!=setTag||WeakMap&&getTag(new WeakMap())!=weakMapTag){getTag=function(value){var result=baseGetTag(value),Ctor=result==objectTag?value.constructor:undefined,ctorString=Ctor?toSource(Ctor):'';if(ctorString){switch(ctorString){case dataViewCtorString:return dataViewTag;case mapCtorString:return mapTag;case promiseCtorString:return promiseTag;case setCtorString:return setTag;case weakMapCtorString:return weakMapTag;}}return result;};}/**
     * Gets the view, applying any `transforms` to the `start` and `end` positions.
     *
     * @private
     * @param {number} start The start of the view.
     * @param {number} end The end of the view.
     * @param {Array} transforms The transformations to apply to the view.
     * @returns {Object} Returns an object containing the `start` and `end`
     *  positions of the view.
     */function getView(start,end,transforms){var index=-1,length=transforms.length;while(++index<length){var data=transforms[index],size=data.size;switch(data.type){case'drop':start+=size;break;case'dropRight':end-=size;break;case'take':end=nativeMin(end,start+size);break;case'takeRight':start=nativeMax(start,end-size);break;}}return{'start':start,'end':end};}/**
     * Extracts wrapper details from the `source` body comment.
     *
     * @private
     * @param {string} source The source to inspect.
     * @returns {Array} Returns the wrapper details.
     */function getWrapDetails(source){var match=source.match(reWrapDetails);return match?match[1].split(reSplitDetails):[];}/**
     * Checks if `path` exists on `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array|string} path The path to check.
     * @param {Function} hasFunc The function to check properties.
     * @returns {boolean} Returns `true` if `path` exists, else `false`.
     */function hasPath(object,path,hasFunc){path=castPath(path,object);var index=-1,length=path.length,result=false;while(++index<length){var key=toKey(path[index]);if(!(result=object!=null&&hasFunc(object,key))){break;}object=object[key];}if(result||++index!=length){return result;}length=object==null?0:object.length;return!!length&&isLength(length)&&isIndex(key,length)&&(isArray(object)||isArguments(object));}/**
     * Initializes an array clone.
     *
     * @private
     * @param {Array} array The array to clone.
     * @returns {Array} Returns the initialized clone.
     */function initCloneArray(array){var length=array.length,result=new array.constructor(length);// Add properties assigned by `RegExp#exec`.
if(length&&typeof array[0]=='string'&&hasOwnProperty.call(array,'index')){result.index=array.index;result.input=array.input;}return result;}/**
     * Initializes an object clone.
     *
     * @private
     * @param {Object} object The object to clone.
     * @returns {Object} Returns the initialized clone.
     */function initCloneObject(object){return typeof object.constructor=='function'&&!isPrototype(object)?baseCreate(getPrototype(object)):{};}/**
     * Initializes an object clone based on its `toStringTag`.
     *
     * **Note:** This function only supports cloning values with tags of
     * `Boolean`, `Date`, `Error`, `Map`, `Number`, `RegExp`, `Set`, or `String`.
     *
     * @private
     * @param {Object} object The object to clone.
     * @param {string} tag The `toStringTag` of the object to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Object} Returns the initialized clone.
     */function initCloneByTag(object,tag,isDeep){var Ctor=object.constructor;switch(tag){case arrayBufferTag:return cloneArrayBuffer(object);case boolTag:case dateTag:return new Ctor(+object);case dataViewTag:return cloneDataView(object,isDeep);case float32Tag:case float64Tag:case int8Tag:case int16Tag:case int32Tag:case uint8Tag:case uint8ClampedTag:case uint16Tag:case uint32Tag:return cloneTypedArray(object,isDeep);case mapTag:return new Ctor();case numberTag:case stringTag:return new Ctor(object);case regexpTag:return cloneRegExp(object);case setTag:return new Ctor();case symbolTag:return cloneSymbol(object);}}/**
     * Inserts wrapper `details` in a comment at the top of the `source` body.
     *
     * @private
     * @param {string} source The source to modify.
     * @returns {Array} details The details to insert.
     * @returns {string} Returns the modified source.
     */function insertWrapDetails(source,details){var length=details.length;if(!length){return source;}var lastIndex=length-1;details[lastIndex]=(length>1?'& ':'')+details[lastIndex];details=details.join(length>2?', ':' ');return source.replace(reWrapComment,'{\n/* [wrapped with '+details+'] */\n');}/**
     * Checks if `value` is a flattenable `arguments` object or array.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
     */function isFlattenable(value){return isArray(value)||isArguments(value)||!!(spreadableSymbol&&value&&value[spreadableSymbol]);}/**
     * Checks if `value` is a valid array-like index.
     *
     * @private
     * @param {*} value The value to check.
     * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
     * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
     */function isIndex(value,length){var type=typeof value;length=length==null?MAX_SAFE_INTEGER:length;return!!length&&(type=='number'||type!='symbol'&&reIsUint.test(value))&&value>-1&&value%1==0&&value<length;}/**
     * Checks if the given arguments are from an iteratee call.
     *
     * @private
     * @param {*} value The potential iteratee value argument.
     * @param {*} index The potential iteratee index or key argument.
     * @param {*} object The potential iteratee object argument.
     * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
     *  else `false`.
     */function isIterateeCall(value,index,object){if(!isObject(object)){return false;}var type=typeof index;if(type=='number'?isArrayLike(object)&&isIndex(index,object.length):type=='string'&&index in object){return eq(object[index],value);}return false;}/**
     * Checks if `value` is a property name and not a property path.
     *
     * @private
     * @param {*} value The value to check.
     * @param {Object} [object] The object to query keys on.
     * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
     */function isKey(value,object){if(isArray(value)){return false;}var type=typeof value;if(type=='number'||type=='symbol'||type=='boolean'||value==null||isSymbol(value)){return true;}return reIsPlainProp.test(value)||!reIsDeepProp.test(value)||object!=null&&value in Object(object);}/**
     * Checks if `value` is suitable for use as unique object key.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
     */function isKeyable(value){var type=typeof value;return type=='string'||type=='number'||type=='symbol'||type=='boolean'?value!=='__proto__':value===null;}/**
     * Checks if `func` has a lazy counterpart.
     *
     * @private
     * @param {Function} func The function to check.
     * @returns {boolean} Returns `true` if `func` has a lazy counterpart,
     *  else `false`.
     */function isLaziable(func){var funcName=getFuncName(func),other=lodash[funcName];if(typeof other!='function'||!(funcName in LazyWrapper.prototype)){return false;}if(func===other){return true;}var data=getData(other);return!!data&&func===data[0];}/**
     * Checks if `func` has its source masked.
     *
     * @private
     * @param {Function} func The function to check.
     * @returns {boolean} Returns `true` if `func` is masked, else `false`.
     */function isMasked(func){return!!maskSrcKey&&maskSrcKey in func;}/**
     * Checks if `func` is capable of being masked.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `func` is maskable, else `false`.
     */var isMaskable=coreJsData?isFunction:stubFalse;/**
     * Checks if `value` is likely a prototype object.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
     */function isPrototype(value){var Ctor=value&&value.constructor,proto=typeof Ctor=='function'&&Ctor.prototype||objectProto;return value===proto;}/**
     * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` if suitable for strict
     *  equality comparisons, else `false`.
     */function isStrictComparable(value){return value===value&&!isObject(value);}/**
     * A specialized version of `matchesProperty` for source values suitable
     * for strict equality comparisons, i.e. `===`.
     *
     * @private
     * @param {string} key The key of the property to get.
     * @param {*} srcValue The value to match.
     * @returns {Function} Returns the new spec function.
     */function matchesStrictComparable(key,srcValue){return function(object){if(object==null){return false;}return object[key]===srcValue&&(srcValue!==undefined||key in Object(object));};}/**
     * A specialized version of `_.memoize` which clears the memoized function's
     * cache when it exceeds `MAX_MEMOIZE_SIZE`.
     *
     * @private
     * @param {Function} func The function to have its output memoized.
     * @returns {Function} Returns the new memoized function.
     */function memoizeCapped(func){var result=memoize(func,function(key){if(cache.size===MAX_MEMOIZE_SIZE){cache.clear();}return key;});var cache=result.cache;return result;}/**
     * Merges the function metadata of `source` into `data`.
     *
     * Merging metadata reduces the number of wrappers used to invoke a function.
     * This is possible because methods like `_.bind`, `_.curry`, and `_.partial`
     * may be applied regardless of execution order. Methods like `_.ary` and
     * `_.rearg` modify function arguments, making the order in which they are
     * executed important, preventing the merging of metadata. However, we make
     * an exception for a safe combined case where curried functions have `_.ary`
     * and or `_.rearg` applied.
     *
     * @private
     * @param {Array} data The destination metadata.
     * @param {Array} source The source metadata.
     * @returns {Array} Returns `data`.
     */function mergeData(data,source){var bitmask=data[1],srcBitmask=source[1],newBitmask=bitmask|srcBitmask,isCommon=newBitmask<(WRAP_BIND_FLAG|WRAP_BIND_KEY_FLAG|WRAP_ARY_FLAG);var isCombo=srcBitmask==WRAP_ARY_FLAG&&bitmask==WRAP_CURRY_FLAG||srcBitmask==WRAP_ARY_FLAG&&bitmask==WRAP_REARG_FLAG&&data[7].length<=source[8]||srcBitmask==(WRAP_ARY_FLAG|WRAP_REARG_FLAG)&&source[7].length<=source[8]&&bitmask==WRAP_CURRY_FLAG;// Exit early if metadata can't be merged.
if(!(isCommon||isCombo)){return data;}// Use source `thisArg` if available.
if(srcBitmask&WRAP_BIND_FLAG){data[2]=source[2];// Set when currying a bound function.
newBitmask|=bitmask&WRAP_BIND_FLAG?0:WRAP_CURRY_BOUND_FLAG;}// Compose partial arguments.
var value=source[3];if(value){var partials=data[3];data[3]=partials?composeArgs(partials,value,source[4]):value;data[4]=partials?replaceHolders(data[3],PLACEHOLDER):source[4];}// Compose partial right arguments.
value=source[5];if(value){partials=data[5];data[5]=partials?composeArgsRight(partials,value,source[6]):value;data[6]=partials?replaceHolders(data[5],PLACEHOLDER):source[6];}// Use source `argPos` if available.
value=source[7];if(value){data[7]=value;}// Use source `ary` if it's smaller.
if(srcBitmask&WRAP_ARY_FLAG){data[8]=data[8]==null?source[8]:nativeMin(data[8],source[8]);}// Use source `arity` if one is not provided.
if(data[9]==null){data[9]=source[9];}// Use source `func` and merge bitmasks.
data[0]=source[0];data[1]=newBitmask;return data;}/**
     * This function is like
     * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
     * except that it includes inherited enumerable properties.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     */function nativeKeysIn(object){var result=[];if(object!=null){for(var key in Object(object)){result.push(key);}}return result;}/**
     * Converts `value` to a string using `Object.prototype.toString`.
     *
     * @private
     * @param {*} value The value to convert.
     * @returns {string} Returns the converted string.
     */function objectToString(value){return nativeObjectToString.call(value);}/**
     * A specialized version of `baseRest` which transforms the rest array.
     *
     * @private
     * @param {Function} func The function to apply a rest parameter to.
     * @param {number} [start=func.length-1] The start position of the rest parameter.
     * @param {Function} transform The rest array transform.
     * @returns {Function} Returns the new function.
     */function overRest(func,start,transform){start=nativeMax(start===undefined?func.length-1:start,0);return function(){var args=arguments,index=-1,length=nativeMax(args.length-start,0),array=Array(length);while(++index<length){array[index]=args[start+index];}index=-1;var otherArgs=Array(start+1);while(++index<start){otherArgs[index]=args[index];}otherArgs[start]=transform(array);return apply(func,this,otherArgs);};}/**
     * Gets the parent value at `path` of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array} path The path to get the parent value of.
     * @returns {*} Returns the parent value.
     */function parent(object,path){return path.length<2?object:baseGet(object,baseSlice(path,0,-1));}/**
     * Reorder `array` according to the specified indexes where the element at
     * the first index is assigned as the first element, the element at
     * the second index is assigned as the second element, and so on.
     *
     * @private
     * @param {Array} array The array to reorder.
     * @param {Array} indexes The arranged array indexes.
     * @returns {Array} Returns `array`.
     */function reorder(array,indexes){var arrLength=array.length,length=nativeMin(indexes.length,arrLength),oldArray=copyArray(array);while(length--){var index=indexes[length];array[length]=isIndex(index,arrLength)?oldArray[index]:undefined;}return array;}/**
     * Gets the value at `key`, unless `key` is "__proto__" or "constructor".
     *
     * @private
     * @param {Object} object The object to query.
     * @param {string} key The key of the property to get.
     * @returns {*} Returns the property value.
     */function safeGet(object,key){if(key==='constructor'&&typeof object[key]==='function'){return;}if(key=='__proto__'){return;}return object[key];}/**
     * Sets metadata for `func`.
     *
     * **Note:** If this function becomes hot, i.e. is invoked a lot in a short
     * period of time, it will trip its breaker and transition to an identity
     * function to avoid garbage collection pauses in V8. See
     * [V8 issue 2070](https://bugs.chromium.org/p/v8/issues/detail?id=2070)
     * for more details.
     *
     * @private
     * @param {Function} func The function to associate metadata with.
     * @param {*} data The metadata.
     * @returns {Function} Returns `func`.
     */var setData=shortOut(baseSetData);/**
     * A simple wrapper around the global [`setTimeout`](https://mdn.io/setTimeout).
     *
     * @private
     * @param {Function} func The function to delay.
     * @param {number} wait The number of milliseconds to delay invocation.
     * @returns {number|Object} Returns the timer id or timeout object.
     */var setTimeout=ctxSetTimeout||function(func,wait){return root.setTimeout(func,wait);};/**
     * Sets the `toString` method of `func` to return `string`.
     *
     * @private
     * @param {Function} func The function to modify.
     * @param {Function} string The `toString` result.
     * @returns {Function} Returns `func`.
     */var setToString=shortOut(baseSetToString);/**
     * Sets the `toString` method of `wrapper` to mimic the source of `reference`
     * with wrapper details in a comment at the top of the source body.
     *
     * @private
     * @param {Function} wrapper The function to modify.
     * @param {Function} reference The reference function.
     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
     * @returns {Function} Returns `wrapper`.
     */function setWrapToString(wrapper,reference,bitmask){var source=reference+'';return setToString(wrapper,insertWrapDetails(source,updateWrapDetails(getWrapDetails(source),bitmask)));}/**
     * Creates a function that'll short out and invoke `identity` instead
     * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
     * milliseconds.
     *
     * @private
     * @param {Function} func The function to restrict.
     * @returns {Function} Returns the new shortable function.
     */function shortOut(func){var count=0,lastCalled=0;return function(){var stamp=nativeNow(),remaining=HOT_SPAN-(stamp-lastCalled);lastCalled=stamp;if(remaining>0){if(++count>=HOT_COUNT){return arguments[0];}}else{count=0;}return func.apply(undefined,arguments);};}/**
     * A specialized version of `_.shuffle` which mutates and sets the size of `array`.
     *
     * @private
     * @param {Array} array The array to shuffle.
     * @param {number} [size=array.length] The size of `array`.
     * @returns {Array} Returns `array`.
     */function shuffleSelf(array,size){var index=-1,length=array.length,lastIndex=length-1;size=size===undefined?length:size;while(++index<size){var rand=baseRandom(index,lastIndex),value=array[rand];array[rand]=array[index];array[index]=value;}array.length=size;return array;}/**
     * Converts `string` to a property path array.
     *
     * @private
     * @param {string} string The string to convert.
     * @returns {Array} Returns the property path array.
     */var stringToPath=memoizeCapped(function(string){var result=[];if(string.charCodeAt(0)===46/* . */){result.push('');}string.replace(rePropName,function(match,number,quote,subString){result.push(quote?subString.replace(reEscapeChar,'$1'):number||match);});return result;});/**
     * Converts `value` to a string key if it's not a string or symbol.
     *
     * @private
     * @param {*} value The value to inspect.
     * @returns {string|symbol} Returns the key.
     */function toKey(value){if(typeof value=='string'||isSymbol(value)){return value;}var result=value+'';return result=='0'&&1/value==-INFINITY?'-0':result;}/**
     * Converts `func` to its source code.
     *
     * @private
     * @param {Function} func The function to convert.
     * @returns {string} Returns the source code.
     */function toSource(func){if(func!=null){try{return funcToString.call(func);}catch(e){}try{return func+'';}catch(e){}}return'';}/**
     * Updates wrapper `details` based on `bitmask` flags.
     *
     * @private
     * @returns {Array} details The details to modify.
     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
     * @returns {Array} Returns `details`.
     */function updateWrapDetails(details,bitmask){arrayEach(wrapFlags,function(pair){var value='_.'+pair[0];if(bitmask&pair[1]&&!arrayIncludes(details,value)){details.push(value);}});return details.sort();}/**
     * Creates a clone of `wrapper`.
     *
     * @private
     * @param {Object} wrapper The wrapper to clone.
     * @returns {Object} Returns the cloned wrapper.
     */function wrapperClone(wrapper){if(wrapper instanceof LazyWrapper){return wrapper.clone();}var result=new LodashWrapper(wrapper.__wrapped__,wrapper.__chain__);result.__actions__=copyArray(wrapper.__actions__);result.__index__=wrapper.__index__;result.__values__=wrapper.__values__;return result;}/*------------------------------------------------------------------------*/ /**
     * Creates an array of elements split into groups the length of `size`.
     * If `array` can't be split evenly, the final chunk will be the remaining
     * elements.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The array to process.
     * @param {number} [size=1] The length of each chunk
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Array} Returns the new array of chunks.
     * @example
     *
     * _.chunk(['a', 'b', 'c', 'd'], 2);
     * // => [['a', 'b'], ['c', 'd']]
     *
     * _.chunk(['a', 'b', 'c', 'd'], 3);
     * // => [['a', 'b', 'c'], ['d']]
     */function chunk(array,size,guard){if(guard?isIterateeCall(array,size,guard):size===undefined){size=1;}else{size=nativeMax(toInteger(size),0);}var length=array==null?0:array.length;if(!length||size<1){return[];}var index=0,resIndex=0,result=Array(nativeCeil(length/size));while(index<length){result[resIndex++]=baseSlice(array,index,index+=size);}return result;}/**
     * Creates an array with all falsey values removed. The values `false`, `null`,
     * `0`, `""`, `undefined`, and `NaN` are falsey.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to compact.
     * @returns {Array} Returns the new array of filtered values.
     * @example
     *
     * _.compact([0, 1, false, 2, '', 3]);
     * // => [1, 2, 3]
     */function compact(array){var index=-1,length=array==null?0:array.length,resIndex=0,result=[];while(++index<length){var value=array[index];if(value){result[resIndex++]=value;}}return result;}/**
     * Creates a new array concatenating `array` with any additional arrays
     * and/or values.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to concatenate.
     * @param {...*} [values] The values to concatenate.
     * @returns {Array} Returns the new concatenated array.
     * @example
     *
     * var array = [1];
     * var other = _.concat(array, 2, [3], [[4]]);
     *
     * console.log(other);
     * // => [1, 2, 3, [4]]
     *
     * console.log(array);
     * // => [1]
     */function concat(){var length=arguments.length;if(!length){return[];}var args=Array(length-1),array=arguments[0],index=length;while(index--){args[index-1]=arguments[index];}return arrayPush(isArray(array)?copyArray(array):[array],baseFlatten(args,1));}/**
     * Creates an array of `array` values not included in the other given arrays
     * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * for equality comparisons. The order and references of result values are
     * determined by the first array.
     *
     * **Note:** Unlike `_.pullAll`, this method returns a new array.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {...Array} [values] The values to exclude.
     * @returns {Array} Returns the new array of filtered values.
     * @see _.without, _.xor
     * @example
     *
     * _.difference([2, 1], [2, 3]);
     * // => [1]
     */var difference=baseRest(function(array,values){return isArrayLikeObject(array)?baseDifference(array,baseFlatten(values,1,isArrayLikeObject,true)):[];});/**
     * This method is like `_.difference` except that it accepts `iteratee` which
     * is invoked for each element of `array` and `values` to generate the criterion
     * by which they're compared. The order and references of result values are
     * determined by the first array. The iteratee is invoked with one argument:
     * (value).
     *
     * **Note:** Unlike `_.pullAllBy`, this method returns a new array.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {...Array} [values] The values to exclude.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {Array} Returns the new array of filtered values.
     * @example
     *
     * _.differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor);
     * // => [1.2]
     *
     * // The `_.property` iteratee shorthand.
     * _.differenceBy([{ 'x': 2 }, { 'x': 1 }], [{ 'x': 1 }], 'x');
     * // => [{ 'x': 2 }]
     */var differenceBy=baseRest(function(array,values){var iteratee=last(values);if(isArrayLikeObject(iteratee)){iteratee=undefined;}return isArrayLikeObject(array)?baseDifference(array,baseFlatten(values,1,isArrayLikeObject,true),getIteratee(iteratee,2)):[];});/**
     * This method is like `_.difference` except that it accepts `comparator`
     * which is invoked to compare elements of `array` to `values`. The order and
     * references of result values are determined by the first array. The comparator
     * is invoked with two arguments: (arrVal, othVal).
     *
     * **Note:** Unlike `_.pullAllWith`, this method returns a new array.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {...Array} [values] The values to exclude.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new array of filtered values.
     * @example
     *
     * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
     *
     * _.differenceWith(objects, [{ 'x': 1, 'y': 2 }], _.isEqual);
     * // => [{ 'x': 2, 'y': 1 }]
     */var differenceWith=baseRest(function(array,values){var comparator=last(values);if(isArrayLikeObject(comparator)){comparator=undefined;}return isArrayLikeObject(array)?baseDifference(array,baseFlatten(values,1,isArrayLikeObject,true),undefined,comparator):[];});/**
     * Creates a slice of `array` with `n` elements dropped from the beginning.
     *
     * @static
     * @memberOf _
     * @since 0.5.0
     * @category Array
     * @param {Array} array The array to query.
     * @param {number} [n=1] The number of elements to drop.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.drop([1, 2, 3]);
     * // => [2, 3]
     *
     * _.drop([1, 2, 3], 2);
     * // => [3]
     *
     * _.drop([1, 2, 3], 5);
     * // => []
     *
     * _.drop([1, 2, 3], 0);
     * // => [1, 2, 3]
     */function drop(array,n,guard){var length=array==null?0:array.length;if(!length){return[];}n=guard||n===undefined?1:toInteger(n);return baseSlice(array,n<0?0:n,length);}/**
     * Creates a slice of `array` with `n` elements dropped from the end.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The array to query.
     * @param {number} [n=1] The number of elements to drop.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.dropRight([1, 2, 3]);
     * // => [1, 2]
     *
     * _.dropRight([1, 2, 3], 2);
     * // => [1]
     *
     * _.dropRight([1, 2, 3], 5);
     * // => []
     *
     * _.dropRight([1, 2, 3], 0);
     * // => [1, 2, 3]
     */function dropRight(array,n,guard){var length=array==null?0:array.length;if(!length){return[];}n=guard||n===undefined?1:toInteger(n);n=length-n;return baseSlice(array,0,n<0?0:n);}/**
     * Creates a slice of `array` excluding elements dropped from the end.
     * Elements are dropped until `predicate` returns falsey. The predicate is
     * invoked with three arguments: (value, index, array).
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The array to query.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'active': true },
     *   { 'user': 'fred',    'active': false },
     *   { 'user': 'pebbles', 'active': false }
     * ];
     *
     * _.dropRightWhile(users, function(o) { return !o.active; });
     * // => objects for ['barney']
     *
     * // The `_.matches` iteratee shorthand.
     * _.dropRightWhile(users, { 'user': 'pebbles', 'active': false });
     * // => objects for ['barney', 'fred']
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.dropRightWhile(users, ['active', false]);
     * // => objects for ['barney']
     *
     * // The `_.property` iteratee shorthand.
     * _.dropRightWhile(users, 'active');
     * // => objects for ['barney', 'fred', 'pebbles']
     */function dropRightWhile(array,predicate){return array&&array.length?baseWhile(array,getIteratee(predicate,3),true,true):[];}/**
     * Creates a slice of `array` excluding elements dropped from the beginning.
     * Elements are dropped until `predicate` returns falsey. The predicate is
     * invoked with three arguments: (value, index, array).
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The array to query.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'active': false },
     *   { 'user': 'fred',    'active': false },
     *   { 'user': 'pebbles', 'active': true }
     * ];
     *
     * _.dropWhile(users, function(o) { return !o.active; });
     * // => objects for ['pebbles']
     *
     * // The `_.matches` iteratee shorthand.
     * _.dropWhile(users, { 'user': 'barney', 'active': false });
     * // => objects for ['fred', 'pebbles']
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.dropWhile(users, ['active', false]);
     * // => objects for ['pebbles']
     *
     * // The `_.property` iteratee shorthand.
     * _.dropWhile(users, 'active');
     * // => objects for ['barney', 'fred', 'pebbles']
     */function dropWhile(array,predicate){return array&&array.length?baseWhile(array,getIteratee(predicate,3),true):[];}/**
     * Fills elements of `array` with `value` from `start` up to, but not
     * including, `end`.
     *
     * **Note:** This method mutates `array`.
     *
     * @static
     * @memberOf _
     * @since 3.2.0
     * @category Array
     * @param {Array} array The array to fill.
     * @param {*} value The value to fill `array` with.
     * @param {number} [start=0] The start position.
     * @param {number} [end=array.length] The end position.
     * @returns {Array} Returns `array`.
     * @example
     *
     * var array = [1, 2, 3];
     *
     * _.fill(array, 'a');
     * console.log(array);
     * // => ['a', 'a', 'a']
     *
     * _.fill(Array(3), 2);
     * // => [2, 2, 2]
     *
     * _.fill([4, 6, 8, 10], '*', 1, 3);
     * // => [4, '*', '*', 10]
     */function fill(array,value,start,end){var length=array==null?0:array.length;if(!length){return[];}if(start&&typeof start!='number'&&isIterateeCall(array,value,start)){start=0;end=length;}return baseFill(array,value,start,end);}/**
     * This method is like `_.find` except that it returns the index of the first
     * element `predicate` returns truthy for instead of the element itself.
     *
     * @static
     * @memberOf _
     * @since 1.1.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @param {number} [fromIndex=0] The index to search from.
     * @returns {number} Returns the index of the found element, else `-1`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'active': false },
     *   { 'user': 'fred',    'active': false },
     *   { 'user': 'pebbles', 'active': true }
     * ];
     *
     * _.findIndex(users, function(o) { return o.user == 'barney'; });
     * // => 0
     *
     * // The `_.matches` iteratee shorthand.
     * _.findIndex(users, { 'user': 'fred', 'active': false });
     * // => 1
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.findIndex(users, ['active', false]);
     * // => 0
     *
     * // The `_.property` iteratee shorthand.
     * _.findIndex(users, 'active');
     * // => 2
     */function findIndex(array,predicate,fromIndex){var length=array==null?0:array.length;if(!length){return-1;}var index=fromIndex==null?0:toInteger(fromIndex);if(index<0){index=nativeMax(length+index,0);}return baseFindIndex(array,getIteratee(predicate,3),index);}/**
     * This method is like `_.findIndex` except that it iterates over elements
     * of `collection` from right to left.
     *
     * @static
     * @memberOf _
     * @since 2.0.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @param {number} [fromIndex=array.length-1] The index to search from.
     * @returns {number} Returns the index of the found element, else `-1`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'active': true },
     *   { 'user': 'fred',    'active': false },
     *   { 'user': 'pebbles', 'active': false }
     * ];
     *
     * _.findLastIndex(users, function(o) { return o.user == 'pebbles'; });
     * // => 2
     *
     * // The `_.matches` iteratee shorthand.
     * _.findLastIndex(users, { 'user': 'barney', 'active': true });
     * // => 0
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.findLastIndex(users, ['active', false]);
     * // => 2
     *
     * // The `_.property` iteratee shorthand.
     * _.findLastIndex(users, 'active');
     * // => 0
     */function findLastIndex(array,predicate,fromIndex){var length=array==null?0:array.length;if(!length){return-1;}var index=length-1;if(fromIndex!==undefined){index=toInteger(fromIndex);index=fromIndex<0?nativeMax(length+index,0):nativeMin(index,length-1);}return baseFindIndex(array,getIteratee(predicate,3),index,true);}/**
     * Flattens `array` a single level deep.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to flatten.
     * @returns {Array} Returns the new flattened array.
     * @example
     *
     * _.flatten([1, [2, [3, [4]], 5]]);
     * // => [1, 2, [3, [4]], 5]
     */function flatten(array){var length=array==null?0:array.length;return length?baseFlatten(array,1):[];}/**
     * Recursively flattens `array`.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The array to flatten.
     * @returns {Array} Returns the new flattened array.
     * @example
     *
     * _.flattenDeep([1, [2, [3, [4]], 5]]);
     * // => [1, 2, 3, 4, 5]
     */function flattenDeep(array){var length=array==null?0:array.length;return length?baseFlatten(array,INFINITY):[];}/**
     * Recursively flatten `array` up to `depth` times.
     *
     * @static
     * @memberOf _
     * @since 4.4.0
     * @category Array
     * @param {Array} array The array to flatten.
     * @param {number} [depth=1] The maximum recursion depth.
     * @returns {Array} Returns the new flattened array.
     * @example
     *
     * var array = [1, [2, [3, [4]], 5]];
     *
     * _.flattenDepth(array, 1);
     * // => [1, 2, [3, [4]], 5]
     *
     * _.flattenDepth(array, 2);
     * // => [1, 2, 3, [4], 5]
     */function flattenDepth(array,depth){var length=array==null?0:array.length;if(!length){return[];}depth=depth===undefined?1:toInteger(depth);return baseFlatten(array,depth);}/**
     * The inverse of `_.toPairs`; this method returns an object composed
     * from key-value `pairs`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} pairs The key-value pairs.
     * @returns {Object} Returns the new object.
     * @example
     *
     * _.fromPairs([['a', 1], ['b', 2]]);
     * // => { 'a': 1, 'b': 2 }
     */function fromPairs(pairs){var index=-1,length=pairs==null?0:pairs.length,result={};while(++index<length){var pair=pairs[index];result[pair[0]]=pair[1];}return result;}/**
     * Gets the first element of `array`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @alias first
     * @category Array
     * @param {Array} array The array to query.
     * @returns {*} Returns the first element of `array`.
     * @example
     *
     * _.head([1, 2, 3]);
     * // => 1
     *
     * _.head([]);
     * // => undefined
     */function head(array){return array&&array.length?array[0]:undefined;}/**
     * Gets the index at which the first occurrence of `value` is found in `array`
     * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * for equality comparisons. If `fromIndex` is negative, it's used as the
     * offset from the end of `array`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {*} value The value to search for.
     * @param {number} [fromIndex=0] The index to search from.
     * @returns {number} Returns the index of the matched value, else `-1`.
     * @example
     *
     * _.indexOf([1, 2, 1, 2], 2);
     * // => 1
     *
     * // Search from the `fromIndex`.
     * _.indexOf([1, 2, 1, 2], 2, 2);
     * // => 3
     */function indexOf(array,value,fromIndex){var length=array==null?0:array.length;if(!length){return-1;}var index=fromIndex==null?0:toInteger(fromIndex);if(index<0){index=nativeMax(length+index,0);}return baseIndexOf(array,value,index);}/**
     * Gets all but the last element of `array`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to query.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.initial([1, 2, 3]);
     * // => [1, 2]
     */function initial(array){var length=array==null?0:array.length;return length?baseSlice(array,0,-1):[];}/**
     * Creates an array of unique values that are included in all given arrays
     * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * for equality comparisons. The order and references of result values are
     * determined by the first array.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @returns {Array} Returns the new array of intersecting values.
     * @example
     *
     * _.intersection([2, 1], [2, 3]);
     * // => [2]
     */var intersection=baseRest(function(arrays){var mapped=arrayMap(arrays,castArrayLikeObject);return mapped.length&&mapped[0]===arrays[0]?baseIntersection(mapped):[];});/**
     * This method is like `_.intersection` except that it accepts `iteratee`
     * which is invoked for each element of each `arrays` to generate the criterion
     * by which they're compared. The order and references of result values are
     * determined by the first array. The iteratee is invoked with one argument:
     * (value).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {Array} Returns the new array of intersecting values.
     * @example
     *
     * _.intersectionBy([2.1, 1.2], [2.3, 3.4], Math.floor);
     * // => [2.1]
     *
     * // The `_.property` iteratee shorthand.
     * _.intersectionBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
     * // => [{ 'x': 1 }]
     */var intersectionBy=baseRest(function(arrays){var iteratee=last(arrays),mapped=arrayMap(arrays,castArrayLikeObject);if(iteratee===last(mapped)){iteratee=undefined;}else{mapped.pop();}return mapped.length&&mapped[0]===arrays[0]?baseIntersection(mapped,getIteratee(iteratee,2)):[];});/**
     * This method is like `_.intersection` except that it accepts `comparator`
     * which is invoked to compare elements of `arrays`. The order and references
     * of result values are determined by the first array. The comparator is
     * invoked with two arguments: (arrVal, othVal).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new array of intersecting values.
     * @example
     *
     * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
     * var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
     *
     * _.intersectionWith(objects, others, _.isEqual);
     * // => [{ 'x': 1, 'y': 2 }]
     */var intersectionWith=baseRest(function(arrays){var comparator=last(arrays),mapped=arrayMap(arrays,castArrayLikeObject);comparator=typeof comparator=='function'?comparator:undefined;if(comparator){mapped.pop();}return mapped.length&&mapped[0]===arrays[0]?baseIntersection(mapped,undefined,comparator):[];});/**
     * Converts all elements in `array` into a string separated by `separator`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to convert.
     * @param {string} [separator=','] The element separator.
     * @returns {string} Returns the joined string.
     * @example
     *
     * _.join(['a', 'b', 'c'], '~');
     * // => 'a~b~c'
     */function join(array,separator){return array==null?'':nativeJoin.call(array,separator);}/**
     * Gets the last element of `array`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to query.
     * @returns {*} Returns the last element of `array`.
     * @example
     *
     * _.last([1, 2, 3]);
     * // => 3
     */function last(array){var length=array==null?0:array.length;return length?array[length-1]:undefined;}/**
     * This method is like `_.indexOf` except that it iterates over elements of
     * `array` from right to left.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {*} value The value to search for.
     * @param {number} [fromIndex=array.length-1] The index to search from.
     * @returns {number} Returns the index of the matched value, else `-1`.
     * @example
     *
     * _.lastIndexOf([1, 2, 1, 2], 2);
     * // => 3
     *
     * // Search from the `fromIndex`.
     * _.lastIndexOf([1, 2, 1, 2], 2, 2);
     * // => 1
     */function lastIndexOf(array,value,fromIndex){var length=array==null?0:array.length;if(!length){return-1;}var index=length;if(fromIndex!==undefined){index=toInteger(fromIndex);index=index<0?nativeMax(length+index,0):nativeMin(index,length-1);}return value===value?strictLastIndexOf(array,value,index):baseFindIndex(array,baseIsNaN,index,true);}/**
     * Gets the element at index `n` of `array`. If `n` is negative, the nth
     * element from the end is returned.
     *
     * @static
     * @memberOf _
     * @since 4.11.0
     * @category Array
     * @param {Array} array The array to query.
     * @param {number} [n=0] The index of the element to return.
     * @returns {*} Returns the nth element of `array`.
     * @example
     *
     * var array = ['a', 'b', 'c', 'd'];
     *
     * _.nth(array, 1);
     * // => 'b'
     *
     * _.nth(array, -2);
     * // => 'c';
     */function nth(array,n){return array&&array.length?baseNth(array,toInteger(n)):undefined;}/**
     * Removes all given values from `array` using
     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * for equality comparisons.
     *
     * **Note:** Unlike `_.without`, this method mutates `array`. Use `_.remove`
     * to remove elements from an array by predicate.
     *
     * @static
     * @memberOf _
     * @since 2.0.0
     * @category Array
     * @param {Array} array The array to modify.
     * @param {...*} [values] The values to remove.
     * @returns {Array} Returns `array`.
     * @example
     *
     * var array = ['a', 'b', 'c', 'a', 'b', 'c'];
     *
     * _.pull(array, 'a', 'c');
     * console.log(array);
     * // => ['b', 'b']
     */var pull=baseRest(pullAll);/**
     * This method is like `_.pull` except that it accepts an array of values to remove.
     *
     * **Note:** Unlike `_.difference`, this method mutates `array`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to modify.
     * @param {Array} values The values to remove.
     * @returns {Array} Returns `array`.
     * @example
     *
     * var array = ['a', 'b', 'c', 'a', 'b', 'c'];
     *
     * _.pullAll(array, ['a', 'c']);
     * console.log(array);
     * // => ['b', 'b']
     */function pullAll(array,values){return array&&array.length&&values&&values.length?basePullAll(array,values):array;}/**
     * This method is like `_.pullAll` except that it accepts `iteratee` which is
     * invoked for each element of `array` and `values` to generate the criterion
     * by which they're compared. The iteratee is invoked with one argument: (value).
     *
     * **Note:** Unlike `_.differenceBy`, this method mutates `array`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to modify.
     * @param {Array} values The values to remove.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {Array} Returns `array`.
     * @example
     *
     * var array = [{ 'x': 1 }, { 'x': 2 }, { 'x': 3 }, { 'x': 1 }];
     *
     * _.pullAllBy(array, [{ 'x': 1 }, { 'x': 3 }], 'x');
     * console.log(array);
     * // => [{ 'x': 2 }]
     */function pullAllBy(array,values,iteratee){return array&&array.length&&values&&values.length?basePullAll(array,values,getIteratee(iteratee,2)):array;}/**
     * This method is like `_.pullAll` except that it accepts `comparator` which
     * is invoked to compare elements of `array` to `values`. The comparator is
     * invoked with two arguments: (arrVal, othVal).
     *
     * **Note:** Unlike `_.differenceWith`, this method mutates `array`.
     *
     * @static
     * @memberOf _
     * @since 4.6.0
     * @category Array
     * @param {Array} array The array to modify.
     * @param {Array} values The values to remove.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns `array`.
     * @example
     *
     * var array = [{ 'x': 1, 'y': 2 }, { 'x': 3, 'y': 4 }, { 'x': 5, 'y': 6 }];
     *
     * _.pullAllWith(array, [{ 'x': 3, 'y': 4 }], _.isEqual);
     * console.log(array);
     * // => [{ 'x': 1, 'y': 2 }, { 'x': 5, 'y': 6 }]
     */function pullAllWith(array,values,comparator){return array&&array.length&&values&&values.length?basePullAll(array,values,undefined,comparator):array;}/**
     * Removes elements from `array` corresponding to `indexes` and returns an
     * array of removed elements.
     *
     * **Note:** Unlike `_.at`, this method mutates `array`.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The array to modify.
     * @param {...(number|number[])} [indexes] The indexes of elements to remove.
     * @returns {Array} Returns the new array of removed elements.
     * @example
     *
     * var array = ['a', 'b', 'c', 'd'];
     * var pulled = _.pullAt(array, [1, 3]);
     *
     * console.log(array);
     * // => ['a', 'c']
     *
     * console.log(pulled);
     * // => ['b', 'd']
     */var pullAt=flatRest(function(array,indexes){var length=array==null?0:array.length,result=baseAt(array,indexes);basePullAt(array,arrayMap(indexes,function(index){return isIndex(index,length)?+index:index;}).sort(compareAscending));return result;});/**
     * Removes all elements from `array` that `predicate` returns truthy for
     * and returns an array of the removed elements. The predicate is invoked
     * with three arguments: (value, index, array).
     *
     * **Note:** Unlike `_.filter`, this method mutates `array`. Use `_.pull`
     * to pull elements from an array by value.
     *
     * @static
     * @memberOf _
     * @since 2.0.0
     * @category Array
     * @param {Array} array The array to modify.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the new array of removed elements.
     * @example
     *
     * var array = [1, 2, 3, 4];
     * var evens = _.remove(array, function(n) {
     *   return n % 2 == 0;
     * });
     *
     * console.log(array);
     * // => [1, 3]
     *
     * console.log(evens);
     * // => [2, 4]
     */function remove(array,predicate){var result=[];if(!(array&&array.length)){return result;}var index=-1,indexes=[],length=array.length;predicate=getIteratee(predicate,3);while(++index<length){var value=array[index];if(predicate(value,index,array)){result.push(value);indexes.push(index);}}basePullAt(array,indexes);return result;}/**
     * Reverses `array` so that the first element becomes the last, the second
     * element becomes the second to last, and so on.
     *
     * **Note:** This method mutates `array` and is based on
     * [`Array#reverse`](https://mdn.io/Array/reverse).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to modify.
     * @returns {Array} Returns `array`.
     * @example
     *
     * var array = [1, 2, 3];
     *
     * _.reverse(array);
     * // => [3, 2, 1]
     *
     * console.log(array);
     * // => [3, 2, 1]
     */function reverse(array){return array==null?array:nativeReverse.call(array);}/**
     * Creates a slice of `array` from `start` up to, but not including, `end`.
     *
     * **Note:** This method is used instead of
     * [`Array#slice`](https://mdn.io/Array/slice) to ensure dense arrays are
     * returned.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The array to slice.
     * @param {number} [start=0] The start position.
     * @param {number} [end=array.length] The end position.
     * @returns {Array} Returns the slice of `array`.
     */function slice(array,start,end){var length=array==null?0:array.length;if(!length){return[];}if(end&&typeof end!='number'&&isIterateeCall(array,start,end)){start=0;end=length;}else{start=start==null?0:toInteger(start);end=end===undefined?length:toInteger(end);}return baseSlice(array,start,end);}/**
     * Uses a binary search to determine the lowest index at which `value`
     * should be inserted into `array` in order to maintain its sort order.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The sorted array to inspect.
     * @param {*} value The value to evaluate.
     * @returns {number} Returns the index at which `value` should be inserted
     *  into `array`.
     * @example
     *
     * _.sortedIndex([30, 50], 40);
     * // => 1
     */function sortedIndex(array,value){return baseSortedIndex(array,value);}/**
     * This method is like `_.sortedIndex` except that it accepts `iteratee`
     * which is invoked for `value` and each element of `array` to compute their
     * sort ranking. The iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The sorted array to inspect.
     * @param {*} value The value to evaluate.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {number} Returns the index at which `value` should be inserted
     *  into `array`.
     * @example
     *
     * var objects = [{ 'x': 4 }, { 'x': 5 }];
     *
     * _.sortedIndexBy(objects, { 'x': 4 }, function(o) { return o.x; });
     * // => 0
     *
     * // The `_.property` iteratee shorthand.
     * _.sortedIndexBy(objects, { 'x': 4 }, 'x');
     * // => 0
     */function sortedIndexBy(array,value,iteratee){return baseSortedIndexBy(array,value,getIteratee(iteratee,2));}/**
     * This method is like `_.indexOf` except that it performs a binary
     * search on a sorted `array`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {*} value The value to search for.
     * @returns {number} Returns the index of the matched value, else `-1`.
     * @example
     *
     * _.sortedIndexOf([4, 5, 5, 5, 6], 5);
     * // => 1
     */function sortedIndexOf(array,value){var length=array==null?0:array.length;if(length){var index=baseSortedIndex(array,value);if(index<length&&eq(array[index],value)){return index;}}return-1;}/**
     * This method is like `_.sortedIndex` except that it returns the highest
     * index at which `value` should be inserted into `array` in order to
     * maintain its sort order.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The sorted array to inspect.
     * @param {*} value The value to evaluate.
     * @returns {number} Returns the index at which `value` should be inserted
     *  into `array`.
     * @example
     *
     * _.sortedLastIndex([4, 5, 5, 5, 6], 5);
     * // => 4
     */function sortedLastIndex(array,value){return baseSortedIndex(array,value,true);}/**
     * This method is like `_.sortedLastIndex` except that it accepts `iteratee`
     * which is invoked for `value` and each element of `array` to compute their
     * sort ranking. The iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The sorted array to inspect.
     * @param {*} value The value to evaluate.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {number} Returns the index at which `value` should be inserted
     *  into `array`.
     * @example
     *
     * var objects = [{ 'x': 4 }, { 'x': 5 }];
     *
     * _.sortedLastIndexBy(objects, { 'x': 4 }, function(o) { return o.x; });
     * // => 1
     *
     * // The `_.property` iteratee shorthand.
     * _.sortedLastIndexBy(objects, { 'x': 4 }, 'x');
     * // => 1
     */function sortedLastIndexBy(array,value,iteratee){return baseSortedIndexBy(array,value,getIteratee(iteratee,2),true);}/**
     * This method is like `_.lastIndexOf` except that it performs a binary
     * search on a sorted `array`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {*} value The value to search for.
     * @returns {number} Returns the index of the matched value, else `-1`.
     * @example
     *
     * _.sortedLastIndexOf([4, 5, 5, 5, 6], 5);
     * // => 3
     */function sortedLastIndexOf(array,value){var length=array==null?0:array.length;if(length){var index=baseSortedIndex(array,value,true)-1;if(eq(array[index],value)){return index;}}return-1;}/**
     * This method is like `_.uniq` except that it's designed and optimized
     * for sorted arrays.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @returns {Array} Returns the new duplicate free array.
     * @example
     *
     * _.sortedUniq([1, 1, 2]);
     * // => [1, 2]
     */function sortedUniq(array){return array&&array.length?baseSortedUniq(array):[];}/**
     * This method is like `_.uniqBy` except that it's designed and optimized
     * for sorted arrays.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {Function} [iteratee] The iteratee invoked per element.
     * @returns {Array} Returns the new duplicate free array.
     * @example
     *
     * _.sortedUniqBy([1.1, 1.2, 2.3, 2.4], Math.floor);
     * // => [1.1, 2.3]
     */function sortedUniqBy(array,iteratee){return array&&array.length?baseSortedUniq(array,getIteratee(iteratee,2)):[];}/**
     * Gets all but the first element of `array`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to query.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.tail([1, 2, 3]);
     * // => [2, 3]
     */function tail(array){var length=array==null?0:array.length;return length?baseSlice(array,1,length):[];}/**
     * Creates a slice of `array` with `n` elements taken from the beginning.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to query.
     * @param {number} [n=1] The number of elements to take.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.take([1, 2, 3]);
     * // => [1]
     *
     * _.take([1, 2, 3], 2);
     * // => [1, 2]
     *
     * _.take([1, 2, 3], 5);
     * // => [1, 2, 3]
     *
     * _.take([1, 2, 3], 0);
     * // => []
     */function take(array,n,guard){if(!(array&&array.length)){return[];}n=guard||n===undefined?1:toInteger(n);return baseSlice(array,0,n<0?0:n);}/**
     * Creates a slice of `array` with `n` elements taken from the end.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The array to query.
     * @param {number} [n=1] The number of elements to take.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.takeRight([1, 2, 3]);
     * // => [3]
     *
     * _.takeRight([1, 2, 3], 2);
     * // => [2, 3]
     *
     * _.takeRight([1, 2, 3], 5);
     * // => [1, 2, 3]
     *
     * _.takeRight([1, 2, 3], 0);
     * // => []
     */function takeRight(array,n,guard){var length=array==null?0:array.length;if(!length){return[];}n=guard||n===undefined?1:toInteger(n);n=length-n;return baseSlice(array,n<0?0:n,length);}/**
     * Creates a slice of `array` with elements taken from the end. Elements are
     * taken until `predicate` returns falsey. The predicate is invoked with
     * three arguments: (value, index, array).
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The array to query.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'active': true },
     *   { 'user': 'fred',    'active': false },
     *   { 'user': 'pebbles', 'active': false }
     * ];
     *
     * _.takeRightWhile(users, function(o) { return !o.active; });
     * // => objects for ['fred', 'pebbles']
     *
     * // The `_.matches` iteratee shorthand.
     * _.takeRightWhile(users, { 'user': 'pebbles', 'active': false });
     * // => objects for ['pebbles']
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.takeRightWhile(users, ['active', false]);
     * // => objects for ['fred', 'pebbles']
     *
     * // The `_.property` iteratee shorthand.
     * _.takeRightWhile(users, 'active');
     * // => []
     */function takeRightWhile(array,predicate){return array&&array.length?baseWhile(array,getIteratee(predicate,3),false,true):[];}/**
     * Creates a slice of `array` with elements taken from the beginning. Elements
     * are taken until `predicate` returns falsey. The predicate is invoked with
     * three arguments: (value, index, array).
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The array to query.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'active': false },
     *   { 'user': 'fred',    'active': false },
     *   { 'user': 'pebbles', 'active': true }
     * ];
     *
     * _.takeWhile(users, function(o) { return !o.active; });
     * // => objects for ['barney', 'fred']
     *
     * // The `_.matches` iteratee shorthand.
     * _.takeWhile(users, { 'user': 'barney', 'active': false });
     * // => objects for ['barney']
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.takeWhile(users, ['active', false]);
     * // => objects for ['barney', 'fred']
     *
     * // The `_.property` iteratee shorthand.
     * _.takeWhile(users, 'active');
     * // => []
     */function takeWhile(array,predicate){return array&&array.length?baseWhile(array,getIteratee(predicate,3)):[];}/**
     * Creates an array of unique values, in order, from all given arrays using
     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * for equality comparisons.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @returns {Array} Returns the new array of combined values.
     * @example
     *
     * _.union([2], [1, 2]);
     * // => [2, 1]
     */var union=baseRest(function(arrays){return baseUniq(baseFlatten(arrays,1,isArrayLikeObject,true));});/**
     * This method is like `_.union` except that it accepts `iteratee` which is
     * invoked for each element of each `arrays` to generate the criterion by
     * which uniqueness is computed. Result values are chosen from the first
     * array in which the value occurs. The iteratee is invoked with one argument:
     * (value).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {Array} Returns the new array of combined values.
     * @example
     *
     * _.unionBy([2.1], [1.2, 2.3], Math.floor);
     * // => [2.1, 1.2]
     *
     * // The `_.property` iteratee shorthand.
     * _.unionBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
     * // => [{ 'x': 1 }, { 'x': 2 }]
     */var unionBy=baseRest(function(arrays){var iteratee=last(arrays);if(isArrayLikeObject(iteratee)){iteratee=undefined;}return baseUniq(baseFlatten(arrays,1,isArrayLikeObject,true),getIteratee(iteratee,2));});/**
     * This method is like `_.union` except that it accepts `comparator` which
     * is invoked to compare elements of `arrays`. Result values are chosen from
     * the first array in which the value occurs. The comparator is invoked
     * with two arguments: (arrVal, othVal).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new array of combined values.
     * @example
     *
     * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
     * var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
     *
     * _.unionWith(objects, others, _.isEqual);
     * // => [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }, { 'x': 1, 'y': 1 }]
     */var unionWith=baseRest(function(arrays){var comparator=last(arrays);comparator=typeof comparator=='function'?comparator:undefined;return baseUniq(baseFlatten(arrays,1,isArrayLikeObject,true),undefined,comparator);});/**
     * Creates a duplicate-free version of an array, using
     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * for equality comparisons, in which only the first occurrence of each element
     * is kept. The order of result values is determined by the order they occur
     * in the array.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @returns {Array} Returns the new duplicate free array.
     * @example
     *
     * _.uniq([2, 1, 2]);
     * // => [2, 1]
     */function uniq(array){return array&&array.length?baseUniq(array):[];}/**
     * This method is like `_.uniq` except that it accepts `iteratee` which is
     * invoked for each element in `array` to generate the criterion by which
     * uniqueness is computed. The order of result values is determined by the
     * order they occur in the array. The iteratee is invoked with one argument:
     * (value).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {Array} Returns the new duplicate free array.
     * @example
     *
     * _.uniqBy([2.1, 1.2, 2.3], Math.floor);
     * // => [2.1, 1.2]
     *
     * // The `_.property` iteratee shorthand.
     * _.uniqBy([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
     * // => [{ 'x': 1 }, { 'x': 2 }]
     */function uniqBy(array,iteratee){return array&&array.length?baseUniq(array,getIteratee(iteratee,2)):[];}/**
     * This method is like `_.uniq` except that it accepts `comparator` which
     * is invoked to compare elements of `array`. The order of result values is
     * determined by the order they occur in the array.The comparator is invoked
     * with two arguments: (arrVal, othVal).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new duplicate free array.
     * @example
     *
     * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }, { 'x': 1, 'y': 2 }];
     *
     * _.uniqWith(objects, _.isEqual);
     * // => [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }]
     */function uniqWith(array,comparator){comparator=typeof comparator=='function'?comparator:undefined;return array&&array.length?baseUniq(array,undefined,comparator):[];}/**
     * This method is like `_.zip` except that it accepts an array of grouped
     * elements and creates an array regrouping the elements to their pre-zip
     * configuration.
     *
     * @static
     * @memberOf _
     * @since 1.2.0
     * @category Array
     * @param {Array} array The array of grouped elements to process.
     * @returns {Array} Returns the new array of regrouped elements.
     * @example
     *
     * var zipped = _.zip(['a', 'b'], [1, 2], [true, false]);
     * // => [['a', 1, true], ['b', 2, false]]
     *
     * _.unzip(zipped);
     * // => [['a', 'b'], [1, 2], [true, false]]
     */function unzip(array){if(!(array&&array.length)){return[];}var length=0;array=arrayFilter(array,function(group){if(isArrayLikeObject(group)){length=nativeMax(group.length,length);return true;}});return baseTimes(length,function(index){return arrayMap(array,baseProperty(index));});}/**
     * This method is like `_.unzip` except that it accepts `iteratee` to specify
     * how regrouped values should be combined. The iteratee is invoked with the
     * elements of each group: (...group).
     *
     * @static
     * @memberOf _
     * @since 3.8.0
     * @category Array
     * @param {Array} array The array of grouped elements to process.
     * @param {Function} [iteratee=_.identity] The function to combine
     *  regrouped values.
     * @returns {Array} Returns the new array of regrouped elements.
     * @example
     *
     * var zipped = _.zip([1, 2], [10, 20], [100, 200]);
     * // => [[1, 10, 100], [2, 20, 200]]
     *
     * _.unzipWith(zipped, _.add);
     * // => [3, 30, 300]
     */function unzipWith(array,iteratee){if(!(array&&array.length)){return[];}var result=unzip(array);if(iteratee==null){return result;}return arrayMap(result,function(group){return apply(iteratee,undefined,group);});}/**
     * Creates an array excluding all given values using
     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * for equality comparisons.
     *
     * **Note:** Unlike `_.pull`, this method returns a new array.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {...*} [values] The values to exclude.
     * @returns {Array} Returns the new array of filtered values.
     * @see _.difference, _.xor
     * @example
     *
     * _.without([2, 1, 2, 3], 1, 2);
     * // => [3]
     */var without=baseRest(function(array,values){return isArrayLikeObject(array)?baseDifference(array,values):[];});/**
     * Creates an array of unique values that is the
     * [symmetric difference](https://en.wikipedia.org/wiki/Symmetric_difference)
     * of the given arrays. The order of result values is determined by the order
     * they occur in the arrays.
     *
     * @static
     * @memberOf _
     * @since 2.4.0
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @returns {Array} Returns the new array of filtered values.
     * @see _.difference, _.without
     * @example
     *
     * _.xor([2, 1], [2, 3]);
     * // => [1, 3]
     */var xor=baseRest(function(arrays){return baseXor(arrayFilter(arrays,isArrayLikeObject));});/**
     * This method is like `_.xor` except that it accepts `iteratee` which is
     * invoked for each element of each `arrays` to generate the criterion by
     * which by which they're compared. The order of result values is determined
     * by the order they occur in the arrays. The iteratee is invoked with one
     * argument: (value).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {Array} Returns the new array of filtered values.
     * @example
     *
     * _.xorBy([2.1, 1.2], [2.3, 3.4], Math.floor);
     * // => [1.2, 3.4]
     *
     * // The `_.property` iteratee shorthand.
     * _.xorBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
     * // => [{ 'x': 2 }]
     */var xorBy=baseRest(function(arrays){var iteratee=last(arrays);if(isArrayLikeObject(iteratee)){iteratee=undefined;}return baseXor(arrayFilter(arrays,isArrayLikeObject),getIteratee(iteratee,2));});/**
     * This method is like `_.xor` except that it accepts `comparator` which is
     * invoked to compare elements of `arrays`. The order of result values is
     * determined by the order they occur in the arrays. The comparator is invoked
     * with two arguments: (arrVal, othVal).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new array of filtered values.
     * @example
     *
     * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
     * var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
     *
     * _.xorWith(objects, others, _.isEqual);
     * // => [{ 'x': 2, 'y': 1 }, { 'x': 1, 'y': 1 }]
     */var xorWith=baseRest(function(arrays){var comparator=last(arrays);comparator=typeof comparator=='function'?comparator:undefined;return baseXor(arrayFilter(arrays,isArrayLikeObject),undefined,comparator);});/**
     * Creates an array of grouped elements, the first of which contains the
     * first elements of the given arrays, the second of which contains the
     * second elements of the given arrays, and so on.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {...Array} [arrays] The arrays to process.
     * @returns {Array} Returns the new array of grouped elements.
     * @example
     *
     * _.zip(['a', 'b'], [1, 2], [true, false]);
     * // => [['a', 1, true], ['b', 2, false]]
     */var zip=baseRest(unzip);/**
     * This method is like `_.fromPairs` except that it accepts two arrays,
     * one of property identifiers and one of corresponding values.
     *
     * @static
     * @memberOf _
     * @since 0.4.0
     * @category Array
     * @param {Array} [props=[]] The property identifiers.
     * @param {Array} [values=[]] The property values.
     * @returns {Object} Returns the new object.
     * @example
     *
     * _.zipObject(['a', 'b'], [1, 2]);
     * // => { 'a': 1, 'b': 2 }
     */function zipObject(props,values){return baseZipObject(props||[],values||[],assignValue);}/**
     * This method is like `_.zipObject` except that it supports property paths.
     *
     * @static
     * @memberOf _
     * @since 4.1.0
     * @category Array
     * @param {Array} [props=[]] The property identifiers.
     * @param {Array} [values=[]] The property values.
     * @returns {Object} Returns the new object.
     * @example
     *
     * _.zipObjectDeep(['a.b[0].c', 'a.b[1].d'], [1, 2]);
     * // => { 'a': { 'b': [{ 'c': 1 }, { 'd': 2 }] } }
     */function zipObjectDeep(props,values){return baseZipObject(props||[],values||[],baseSet);}/**
     * This method is like `_.zip` except that it accepts `iteratee` to specify
     * how grouped values should be combined. The iteratee is invoked with the
     * elements of each group: (...group).
     *
     * @static
     * @memberOf _
     * @since 3.8.0
     * @category Array
     * @param {...Array} [arrays] The arrays to process.
     * @param {Function} [iteratee=_.identity] The function to combine
     *  grouped values.
     * @returns {Array} Returns the new array of grouped elements.
     * @example
     *
     * _.zipWith([1, 2], [10, 20], [100, 200], function(a, b, c) {
     *   return a + b + c;
     * });
     * // => [111, 222]
     */var zipWith=baseRest(function(arrays){var length=arrays.length,iteratee=length>1?arrays[length-1]:undefined;iteratee=typeof iteratee=='function'?(arrays.pop(),iteratee):undefined;return unzipWith(arrays,iteratee);});/*------------------------------------------------------------------------*/ /**
     * Creates a `lodash` wrapper instance that wraps `value` with explicit method
     * chain sequences enabled. The result of such sequences must be unwrapped
     * with `_#value`.
     *
     * @static
     * @memberOf _
     * @since 1.3.0
     * @category Seq
     * @param {*} value The value to wrap.
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'age': 36 },
     *   { 'user': 'fred',    'age': 40 },
     *   { 'user': 'pebbles', 'age': 1 }
     * ];
     *
     * var youngest = _
     *   .chain(users)
     *   .sortBy('age')
     *   .map(function(o) {
     *     return o.user + ' is ' + o.age;
     *   })
     *   .head()
     *   .value();
     * // => 'pebbles is 1'
     */function chain(value){var result=lodash(value);result.__chain__=true;return result;}/**
     * This method invokes `interceptor` and returns `value`. The interceptor
     * is invoked with one argument; (value). The purpose of this method is to
     * "tap into" a method chain sequence in order to modify intermediate results.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Seq
     * @param {*} value The value to provide to `interceptor`.
     * @param {Function} interceptor The function to invoke.
     * @returns {*} Returns `value`.
     * @example
     *
     * _([1, 2, 3])
     *  .tap(function(array) {
     *    // Mutate input array.
     *    array.pop();
     *  })
     *  .reverse()
     *  .value();
     * // => [2, 1]
     */function tap(value,interceptor){interceptor(value);return value;}/**
     * This method is like `_.tap` except that it returns the result of `interceptor`.
     * The purpose of this method is to "pass thru" values replacing intermediate
     * results in a method chain sequence.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Seq
     * @param {*} value The value to provide to `interceptor`.
     * @param {Function} interceptor The function to invoke.
     * @returns {*} Returns the result of `interceptor`.
     * @example
     *
     * _('  abc  ')
     *  .chain()
     *  .trim()
     *  .thru(function(value) {
     *    return [value];
     *  })
     *  .value();
     * // => ['abc']
     */function thru(value,interceptor){return interceptor(value);}/**
     * This method is the wrapper version of `_.at`.
     *
     * @name at
     * @memberOf _
     * @since 1.0.0
     * @category Seq
     * @param {...(string|string[])} [paths] The property paths to pick.
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': 3 } }, 4] };
     *
     * _(object).at(['a[0].b.c', 'a[1]']).value();
     * // => [3, 4]
     */var wrapperAt=flatRest(function(paths){var length=paths.length,start=length?paths[0]:0,value=this.__wrapped__,interceptor=function(object){return baseAt(object,paths);};if(length>1||this.__actions__.length||!(value instanceof LazyWrapper)||!isIndex(start)){return this.thru(interceptor);}value=value.slice(start,+start+(length?1:0));value.__actions__.push({'func':thru,'args':[interceptor],'thisArg':undefined});return new LodashWrapper(value,this.__chain__).thru(function(array){if(length&&!array.length){array.push(undefined);}return array;});});/**
     * Creates a `lodash` wrapper instance with explicit method chain sequences enabled.
     *
     * @name chain
     * @memberOf _
     * @since 0.1.0
     * @category Seq
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36 },
     *   { 'user': 'fred',   'age': 40 }
     * ];
     *
     * // A sequence without explicit chaining.
     * _(users).head();
     * // => { 'user': 'barney', 'age': 36 }
     *
     * // A sequence with explicit chaining.
     * _(users)
     *   .chain()
     *   .head()
     *   .pick('user')
     *   .value();
     * // => { 'user': 'barney' }
     */function wrapperChain(){return chain(this);}/**
     * Executes the chain sequence and returns the wrapped result.
     *
     * @name commit
     * @memberOf _
     * @since 3.2.0
     * @category Seq
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * var array = [1, 2];
     * var wrapped = _(array).push(3);
     *
     * console.log(array);
     * // => [1, 2]
     *
     * wrapped = wrapped.commit();
     * console.log(array);
     * // => [1, 2, 3]
     *
     * wrapped.last();
     * // => 3
     *
     * console.log(array);
     * // => [1, 2, 3]
     */function wrapperCommit(){return new LodashWrapper(this.value(),this.__chain__);}/**
     * Gets the next value on a wrapped object following the
     * [iterator protocol](https://mdn.io/iteration_protocols#iterator).
     *
     * @name next
     * @memberOf _
     * @since 4.0.0
     * @category Seq
     * @returns {Object} Returns the next iterator value.
     * @example
     *
     * var wrapped = _([1, 2]);
     *
     * wrapped.next();
     * // => { 'done': false, 'value': 1 }
     *
     * wrapped.next();
     * // => { 'done': false, 'value': 2 }
     *
     * wrapped.next();
     * // => { 'done': true, 'value': undefined }
     */function wrapperNext(){if(this.__values__===undefined){this.__values__=toArray(this.value());}var done=this.__index__>=this.__values__.length,value=done?undefined:this.__values__[this.__index__++];return{'done':done,'value':value};}/**
     * Enables the wrapper to be iterable.
     *
     * @name Symbol.iterator
     * @memberOf _
     * @since 4.0.0
     * @category Seq
     * @returns {Object} Returns the wrapper object.
     * @example
     *
     * var wrapped = _([1, 2]);
     *
     * wrapped[Symbol.iterator]() === wrapped;
     * // => true
     *
     * Array.from(wrapped);
     * // => [1, 2]
     */function wrapperToIterator(){return this;}/**
     * Creates a clone of the chain sequence planting `value` as the wrapped value.
     *
     * @name plant
     * @memberOf _
     * @since 3.2.0
     * @category Seq
     * @param {*} value The value to plant.
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * function square(n) {
     *   return n * n;
     * }
     *
     * var wrapped = _([1, 2]).map(square);
     * var other = wrapped.plant([3, 4]);
     *
     * other.value();
     * // => [9, 16]
     *
     * wrapped.value();
     * // => [1, 4]
     */function wrapperPlant(value){var result,parent=this;while(parent instanceof baseLodash){var clone=wrapperClone(parent);clone.__index__=0;clone.__values__=undefined;if(result){previous.__wrapped__=clone;}else{result=clone;}var previous=clone;parent=parent.__wrapped__;}previous.__wrapped__=value;return result;}/**
     * This method is the wrapper version of `_.reverse`.
     *
     * **Note:** This method mutates the wrapped array.
     *
     * @name reverse
     * @memberOf _
     * @since 0.1.0
     * @category Seq
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * var array = [1, 2, 3];
     *
     * _(array).reverse().value()
     * // => [3, 2, 1]
     *
     * console.log(array);
     * // => [3, 2, 1]
     */function wrapperReverse(){var value=this.__wrapped__;if(value instanceof LazyWrapper){var wrapped=value;if(this.__actions__.length){wrapped=new LazyWrapper(this);}wrapped=wrapped.reverse();wrapped.__actions__.push({'func':thru,'args':[reverse],'thisArg':undefined});return new LodashWrapper(wrapped,this.__chain__);}return this.thru(reverse);}/**
     * Executes the chain sequence to resolve the unwrapped value.
     *
     * @name value
     * @memberOf _
     * @since 0.1.0
     * @alias toJSON, valueOf
     * @category Seq
     * @returns {*} Returns the resolved unwrapped value.
     * @example
     *
     * _([1, 2, 3]).value();
     * // => [1, 2, 3]
     */function wrapperValue(){return baseWrapperValue(this.__wrapped__,this.__actions__);}/*------------------------------------------------------------------------*/ /**
     * Creates an object composed of keys generated from the results of running
     * each element of `collection` thru `iteratee`. The corresponding value of
     * each key is the number of times the key was returned by `iteratee`. The
     * iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 0.5.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The iteratee to transform keys.
     * @returns {Object} Returns the composed aggregate object.
     * @example
     *
     * _.countBy([6.1, 4.2, 6.3], Math.floor);
     * // => { '4': 1, '6': 2 }
     *
     * // The `_.property` iteratee shorthand.
     * _.countBy(['one', 'two', 'three'], 'length');
     * // => { '3': 2, '5': 1 }
     */var countBy=createAggregator(function(result,value,key){if(hasOwnProperty.call(result,key)){++result[key];}else{baseAssignValue(result,key,1);}});/**
     * Checks if `predicate` returns truthy for **all** elements of `collection`.
     * Iteration is stopped once `predicate` returns falsey. The predicate is
     * invoked with three arguments: (value, index|key, collection).
     *
     * **Note:** This method returns `true` for
     * [empty collections](https://en.wikipedia.org/wiki/Empty_set) because
     * [everything is true](https://en.wikipedia.org/wiki/Vacuous_truth) of
     * elements of empty collections.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {boolean} Returns `true` if all elements pass the predicate check,
     *  else `false`.
     * @example
     *
     * _.every([true, 1, null, 'yes'], Boolean);
     * // => false
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36, 'active': false },
     *   { 'user': 'fred',   'age': 40, 'active': false }
     * ];
     *
     * // The `_.matches` iteratee shorthand.
     * _.every(users, { 'user': 'barney', 'active': false });
     * // => false
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.every(users, ['active', false]);
     * // => true
     *
     * // The `_.property` iteratee shorthand.
     * _.every(users, 'active');
     * // => false
     */function every(collection,predicate,guard){var func=isArray(collection)?arrayEvery:baseEvery;if(guard&&isIterateeCall(collection,predicate,guard)){predicate=undefined;}return func(collection,getIteratee(predicate,3));}/**
     * Iterates over elements of `collection`, returning an array of all elements
     * `predicate` returns truthy for. The predicate is invoked with three
     * arguments: (value, index|key, collection).
     *
     * **Note:** Unlike `_.remove`, this method returns a new array.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the new filtered array.
     * @see _.reject
     * @example
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36, 'active': true },
     *   { 'user': 'fred',   'age': 40, 'active': false }
     * ];
     *
     * _.filter(users, function(o) { return !o.active; });
     * // => objects for ['fred']
     *
     * // The `_.matches` iteratee shorthand.
     * _.filter(users, { 'age': 36, 'active': true });
     * // => objects for ['barney']
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.filter(users, ['active', false]);
     * // => objects for ['fred']
     *
     * // The `_.property` iteratee shorthand.
     * _.filter(users, 'active');
     * // => objects for ['barney']
     *
     * // Combining several predicates using `_.overEvery` or `_.overSome`.
     * _.filter(users, _.overSome([{ 'age': 36 }, ['age', 40]]));
     * // => objects for ['fred', 'barney']
     */function filter(collection,predicate){var func=isArray(collection)?arrayFilter:baseFilter;return func(collection,getIteratee(predicate,3));}/**
     * Iterates over elements of `collection`, returning the first element
     * `predicate` returns truthy for. The predicate is invoked with three
     * arguments: (value, index|key, collection).
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to inspect.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @param {number} [fromIndex=0] The index to search from.
     * @returns {*} Returns the matched element, else `undefined`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'age': 36, 'active': true },
     *   { 'user': 'fred',    'age': 40, 'active': false },
     *   { 'user': 'pebbles', 'age': 1,  'active': true }
     * ];
     *
     * _.find(users, function(o) { return o.age < 40; });
     * // => object for 'barney'
     *
     * // The `_.matches` iteratee shorthand.
     * _.find(users, { 'age': 1, 'active': true });
     * // => object for 'pebbles'
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.find(users, ['active', false]);
     * // => object for 'fred'
     *
     * // The `_.property` iteratee shorthand.
     * _.find(users, 'active');
     * // => object for 'barney'
     */var find=createFind(findIndex);/**
     * This method is like `_.find` except that it iterates over elements of
     * `collection` from right to left.
     *
     * @static
     * @memberOf _
     * @since 2.0.0
     * @category Collection
     * @param {Array|Object} collection The collection to inspect.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @param {number} [fromIndex=collection.length-1] The index to search from.
     * @returns {*} Returns the matched element, else `undefined`.
     * @example
     *
     * _.findLast([1, 2, 3, 4], function(n) {
     *   return n % 2 == 1;
     * });
     * // => 3
     */var findLast=createFind(findLastIndex);/**
     * Creates a flattened array of values by running each element in `collection`
     * thru `iteratee` and flattening the mapped results. The iteratee is invoked
     * with three arguments: (value, index|key, collection).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the new flattened array.
     * @example
     *
     * function duplicate(n) {
     *   return [n, n];
     * }
     *
     * _.flatMap([1, 2], duplicate);
     * // => [1, 1, 2, 2]
     */function flatMap(collection,iteratee){return baseFlatten(map(collection,iteratee),1);}/**
     * This method is like `_.flatMap` except that it recursively flattens the
     * mapped results.
     *
     * @static
     * @memberOf _
     * @since 4.7.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the new flattened array.
     * @example
     *
     * function duplicate(n) {
     *   return [[[n, n]]];
     * }
     *
     * _.flatMapDeep([1, 2], duplicate);
     * // => [1, 1, 2, 2]
     */function flatMapDeep(collection,iteratee){return baseFlatten(map(collection,iteratee),INFINITY);}/**
     * This method is like `_.flatMap` except that it recursively flattens the
     * mapped results up to `depth` times.
     *
     * @static
     * @memberOf _
     * @since 4.7.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @param {number} [depth=1] The maximum recursion depth.
     * @returns {Array} Returns the new flattened array.
     * @example
     *
     * function duplicate(n) {
     *   return [[[n, n]]];
     * }
     *
     * _.flatMapDepth([1, 2], duplicate, 2);
     * // => [[1, 1], [2, 2]]
     */function flatMapDepth(collection,iteratee,depth){depth=depth===undefined?1:toInteger(depth);return baseFlatten(map(collection,iteratee),depth);}/**
     * Iterates over elements of `collection` and invokes `iteratee` for each element.
     * The iteratee is invoked with three arguments: (value, index|key, collection).
     * Iteratee functions may exit iteration early by explicitly returning `false`.
     *
     * **Note:** As with other "Collections" methods, objects with a "length"
     * property are iterated like arrays. To avoid this behavior use `_.forIn`
     * or `_.forOwn` for object iteration.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @alias each
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Array|Object} Returns `collection`.
     * @see _.forEachRight
     * @example
     *
     * _.forEach([1, 2], function(value) {
     *   console.log(value);
     * });
     * // => Logs `1` then `2`.
     *
     * _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
     *   console.log(key);
     * });
     * // => Logs 'a' then 'b' (iteration order is not guaranteed).
     */function forEach(collection,iteratee){var func=isArray(collection)?arrayEach:baseEach;return func(collection,getIteratee(iteratee,3));}/**
     * This method is like `_.forEach` except that it iterates over elements of
     * `collection` from right to left.
     *
     * @static
     * @memberOf _
     * @since 2.0.0
     * @alias eachRight
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Array|Object} Returns `collection`.
     * @see _.forEach
     * @example
     *
     * _.forEachRight([1, 2], function(value) {
     *   console.log(value);
     * });
     * // => Logs `2` then `1`.
     */function forEachRight(collection,iteratee){var func=isArray(collection)?arrayEachRight:baseEachRight;return func(collection,getIteratee(iteratee,3));}/**
     * Creates an object composed of keys generated from the results of running
     * each element of `collection` thru `iteratee`. The order of grouped values
     * is determined by the order they occur in `collection`. The corresponding
     * value of each key is an array of elements responsible for generating the
     * key. The iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The iteratee to transform keys.
     * @returns {Object} Returns the composed aggregate object.
     * @example
     *
     * _.groupBy([6.1, 4.2, 6.3], Math.floor);
     * // => { '4': [4.2], '6': [6.1, 6.3] }
     *
     * // The `_.property` iteratee shorthand.
     * _.groupBy(['one', 'two', 'three'], 'length');
     * // => { '3': ['one', 'two'], '5': ['three'] }
     */var groupBy=createAggregator(function(result,value,key){if(hasOwnProperty.call(result,key)){result[key].push(value);}else{baseAssignValue(result,key,[value]);}});/**
     * Checks if `value` is in `collection`. If `collection` is a string, it's
     * checked for a substring of `value`, otherwise
     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * is used for equality comparisons. If `fromIndex` is negative, it's used as
     * the offset from the end of `collection`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object|string} collection The collection to inspect.
     * @param {*} value The value to search for.
     * @param {number} [fromIndex=0] The index to search from.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.reduce`.
     * @returns {boolean} Returns `true` if `value` is found, else `false`.
     * @example
     *
     * _.includes([1, 2, 3], 1);
     * // => true
     *
     * _.includes([1, 2, 3], 1, 2);
     * // => false
     *
     * _.includes({ 'a': 1, 'b': 2 }, 1);
     * // => true
     *
     * _.includes('abcd', 'bc');
     * // => true
     */function includes(collection,value,fromIndex,guard){collection=isArrayLike(collection)?collection:values(collection);fromIndex=fromIndex&&!guard?toInteger(fromIndex):0;var length=collection.length;if(fromIndex<0){fromIndex=nativeMax(length+fromIndex,0);}return isString(collection)?fromIndex<=length&&collection.indexOf(value,fromIndex)>-1:!!length&&baseIndexOf(collection,value,fromIndex)>-1;}/**
     * Invokes the method at `path` of each element in `collection`, returning
     * an array of the results of each invoked method. Any additional arguments
     * are provided to each invoked method. If `path` is a function, it's invoked
     * for, and `this` bound to, each element in `collection`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Array|Function|string} path The path of the method to invoke or
     *  the function invoked per iteration.
     * @param {...*} [args] The arguments to invoke each method with.
     * @returns {Array} Returns the array of results.
     * @example
     *
     * _.invokeMap([[5, 1, 7], [3, 2, 1]], 'sort');
     * // => [[1, 5, 7], [1, 2, 3]]
     *
     * _.invokeMap([123, 456], String.prototype.split, '');
     * // => [['1', '2', '3'], ['4', '5', '6']]
     */var invokeMap=baseRest(function(collection,path,args){var index=-1,isFunc=typeof path=='function',result=isArrayLike(collection)?Array(collection.length):[];baseEach(collection,function(value){result[++index]=isFunc?apply(path,value,args):baseInvoke(value,path,args);});return result;});/**
     * Creates an object composed of keys generated from the results of running
     * each element of `collection` thru `iteratee`. The corresponding value of
     * each key is the last element responsible for generating the key. The
     * iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The iteratee to transform keys.
     * @returns {Object} Returns the composed aggregate object.
     * @example
     *
     * var array = [
     *   { 'dir': 'left', 'code': 97 },
     *   { 'dir': 'right', 'code': 100 }
     * ];
     *
     * _.keyBy(array, function(o) {
     *   return String.fromCharCode(o.code);
     * });
     * // => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
     *
     * _.keyBy(array, 'dir');
     * // => { 'left': { 'dir': 'left', 'code': 97 }, 'right': { 'dir': 'right', 'code': 100 } }
     */var keyBy=createAggregator(function(result,value,key){baseAssignValue(result,key,value);});/**
     * Creates an array of values by running each element in `collection` thru
     * `iteratee`. The iteratee is invoked with three arguments:
     * (value, index|key, collection).
     *
     * Many lodash methods are guarded to work as iteratees for methods like
     * `_.every`, `_.filter`, `_.map`, `_.mapValues`, `_.reject`, and `_.some`.
     *
     * The guarded methods are:
     * `ary`, `chunk`, `curry`, `curryRight`, `drop`, `dropRight`, `every`,
     * `fill`, `invert`, `parseInt`, `random`, `range`, `rangeRight`, `repeat`,
     * `sampleSize`, `slice`, `some`, `sortBy`, `split`, `take`, `takeRight`,
     * `template`, `trim`, `trimEnd`, `trimStart`, and `words`
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the new mapped array.
     * @example
     *
     * function square(n) {
     *   return n * n;
     * }
     *
     * _.map([4, 8], square);
     * // => [16, 64]
     *
     * _.map({ 'a': 4, 'b': 8 }, square);
     * // => [16, 64] (iteration order is not guaranteed)
     *
     * var users = [
     *   { 'user': 'barney' },
     *   { 'user': 'fred' }
     * ];
     *
     * // The `_.property` iteratee shorthand.
     * _.map(users, 'user');
     * // => ['barney', 'fred']
     */function map(collection,iteratee){var func=isArray(collection)?arrayMap:baseMap;return func(collection,getIteratee(iteratee,3));}/**
     * This method is like `_.sortBy` except that it allows specifying the sort
     * orders of the iteratees to sort by. If `orders` is unspecified, all values
     * are sorted in ascending order. Otherwise, specify an order of "desc" for
     * descending or "asc" for ascending sort order of corresponding values.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Array[]|Function[]|Object[]|string[]} [iteratees=[_.identity]]
     *  The iteratees to sort by.
     * @param {string[]} [orders] The sort orders of `iteratees`.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.reduce`.
     * @returns {Array} Returns the new sorted array.
     * @example
     *
     * var users = [
     *   { 'user': 'fred',   'age': 48 },
     *   { 'user': 'barney', 'age': 34 },
     *   { 'user': 'fred',   'age': 40 },
     *   { 'user': 'barney', 'age': 36 }
     * ];
     *
     * // Sort by `user` in ascending order and by `age` in descending order.
     * _.orderBy(users, ['user', 'age'], ['asc', 'desc']);
     * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
     */function orderBy(collection,iteratees,orders,guard){if(collection==null){return[];}if(!isArray(iteratees)){iteratees=iteratees==null?[]:[iteratees];}orders=guard?undefined:orders;if(!isArray(orders)){orders=orders==null?[]:[orders];}return baseOrderBy(collection,iteratees,orders);}/**
     * Creates an array of elements split into two groups, the first of which
     * contains elements `predicate` returns truthy for, the second of which
     * contains elements `predicate` returns falsey for. The predicate is
     * invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the array of grouped elements.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'age': 36, 'active': false },
     *   { 'user': 'fred',    'age': 40, 'active': true },
     *   { 'user': 'pebbles', 'age': 1,  'active': false }
     * ];
     *
     * _.partition(users, function(o) { return o.active; });
     * // => objects for [['fred'], ['barney', 'pebbles']]
     *
     * // The `_.matches` iteratee shorthand.
     * _.partition(users, { 'age': 1, 'active': false });
     * // => objects for [['pebbles'], ['barney', 'fred']]
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.partition(users, ['active', false]);
     * // => objects for [['barney', 'pebbles'], ['fred']]
     *
     * // The `_.property` iteratee shorthand.
     * _.partition(users, 'active');
     * // => objects for [['fred'], ['barney', 'pebbles']]
     */var partition=createAggregator(function(result,value,key){result[key?0:1].push(value);},function(){return[[],[]];});/**
     * Reduces `collection` to a value which is the accumulated result of running
     * each element in `collection` thru `iteratee`, where each successive
     * invocation is supplied the return value of the previous. If `accumulator`
     * is not given, the first element of `collection` is used as the initial
     * value. The iteratee is invoked with four arguments:
     * (accumulator, value, index|key, collection).
     *
     * Many lodash methods are guarded to work as iteratees for methods like
     * `_.reduce`, `_.reduceRight`, and `_.transform`.
     *
     * The guarded methods are:
     * `assign`, `defaults`, `defaultsDeep`, `includes`, `merge`, `orderBy`,
     * and `sortBy`
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @param {*} [accumulator] The initial value.
     * @returns {*} Returns the accumulated value.
     * @see _.reduceRight
     * @example
     *
     * _.reduce([1, 2], function(sum, n) {
     *   return sum + n;
     * }, 0);
     * // => 3
     *
     * _.reduce({ 'a': 1, 'b': 2, 'c': 1 }, function(result, value, key) {
     *   (result[value] || (result[value] = [])).push(key);
     *   return result;
     * }, {});
     * // => { '1': ['a', 'c'], '2': ['b'] } (iteration order is not guaranteed)
     */function reduce(collection,iteratee,accumulator){var func=isArray(collection)?arrayReduce:baseReduce,initAccum=arguments.length<3;return func(collection,getIteratee(iteratee,4),accumulator,initAccum,baseEach);}/**
     * This method is like `_.reduce` except that it iterates over elements of
     * `collection` from right to left.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @param {*} [accumulator] The initial value.
     * @returns {*} Returns the accumulated value.
     * @see _.reduce
     * @example
     *
     * var array = [[0, 1], [2, 3], [4, 5]];
     *
     * _.reduceRight(array, function(flattened, other) {
     *   return flattened.concat(other);
     * }, []);
     * // => [4, 5, 2, 3, 0, 1]
     */function reduceRight(collection,iteratee,accumulator){var func=isArray(collection)?arrayReduceRight:baseReduce,initAccum=arguments.length<3;return func(collection,getIteratee(iteratee,4),accumulator,initAccum,baseEachRight);}/**
     * The opposite of `_.filter`; this method returns the elements of `collection`
     * that `predicate` does **not** return truthy for.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the new filtered array.
     * @see _.filter
     * @example
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36, 'active': false },
     *   { 'user': 'fred',   'age': 40, 'active': true }
     * ];
     *
     * _.reject(users, function(o) { return !o.active; });
     * // => objects for ['fred']
     *
     * // The `_.matches` iteratee shorthand.
     * _.reject(users, { 'age': 40, 'active': true });
     * // => objects for ['barney']
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.reject(users, ['active', false]);
     * // => objects for ['fred']
     *
     * // The `_.property` iteratee shorthand.
     * _.reject(users, 'active');
     * // => objects for ['barney']
     */function reject(collection,predicate){var func=isArray(collection)?arrayFilter:baseFilter;return func(collection,negate(getIteratee(predicate,3)));}/**
     * Gets a random element from `collection`.
     *
     * @static
     * @memberOf _
     * @since 2.0.0
     * @category Collection
     * @param {Array|Object} collection The collection to sample.
     * @returns {*} Returns the random element.
     * @example
     *
     * _.sample([1, 2, 3, 4]);
     * // => 2
     */function sample(collection){var func=isArray(collection)?arraySample:baseSample;return func(collection);}/**
     * Gets `n` random elements at unique keys from `collection` up to the
     * size of `collection`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Collection
     * @param {Array|Object} collection The collection to sample.
     * @param {number} [n=1] The number of elements to sample.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Array} Returns the random elements.
     * @example
     *
     * _.sampleSize([1, 2, 3], 2);
     * // => [3, 1]
     *
     * _.sampleSize([1, 2, 3], 4);
     * // => [2, 3, 1]
     */function sampleSize(collection,n,guard){if(guard?isIterateeCall(collection,n,guard):n===undefined){n=1;}else{n=toInteger(n);}var func=isArray(collection)?arraySampleSize:baseSampleSize;return func(collection,n);}/**
     * Creates an array of shuffled values, using a version of the
     * [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher-Yates_shuffle).
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to shuffle.
     * @returns {Array} Returns the new shuffled array.
     * @example
     *
     * _.shuffle([1, 2, 3, 4]);
     * // => [4, 1, 3, 2]
     */function shuffle(collection){var func=isArray(collection)?arrayShuffle:baseShuffle;return func(collection);}/**
     * Gets the size of `collection` by returning its length for array-like
     * values or the number of own enumerable string keyed properties for objects.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object|string} collection The collection to inspect.
     * @returns {number} Returns the collection size.
     * @example
     *
     * _.size([1, 2, 3]);
     * // => 3
     *
     * _.size({ 'a': 1, 'b': 2 });
     * // => 2
     *
     * _.size('pebbles');
     * // => 7
     */function size(collection){if(collection==null){return 0;}if(isArrayLike(collection)){return isString(collection)?stringSize(collection):collection.length;}var tag=getTag(collection);if(tag==mapTag||tag==setTag){return collection.size;}return baseKeys(collection).length;}/**
     * Checks if `predicate` returns truthy for **any** element of `collection`.
     * Iteration is stopped once `predicate` returns truthy. The predicate is
     * invoked with three arguments: (value, index|key, collection).
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {boolean} Returns `true` if any element passes the predicate check,
     *  else `false`.
     * @example
     *
     * _.some([null, 0, 'yes', false], Boolean);
     * // => true
     *
     * var users = [
     *   { 'user': 'barney', 'active': true },
     *   { 'user': 'fred',   'active': false }
     * ];
     *
     * // The `_.matches` iteratee shorthand.
     * _.some(users, { 'user': 'barney', 'active': false });
     * // => false
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.some(users, ['active', false]);
     * // => true
     *
     * // The `_.property` iteratee shorthand.
     * _.some(users, 'active');
     * // => true
     */function some(collection,predicate,guard){var func=isArray(collection)?arraySome:baseSome;if(guard&&isIterateeCall(collection,predicate,guard)){predicate=undefined;}return func(collection,getIteratee(predicate,3));}/**
     * Creates an array of elements, sorted in ascending order by the results of
     * running each element in a collection thru each iteratee. This method
     * performs a stable sort, that is, it preserves the original sort order of
     * equal elements. The iteratees are invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {...(Function|Function[])} [iteratees=[_.identity]]
     *  The iteratees to sort by.
     * @returns {Array} Returns the new sorted array.
     * @example
     *
     * var users = [
     *   { 'user': 'fred',   'age': 48 },
     *   { 'user': 'barney', 'age': 36 },
     *   { 'user': 'fred',   'age': 30 },
     *   { 'user': 'barney', 'age': 34 }
     * ];
     *
     * _.sortBy(users, [function(o) { return o.user; }]);
     * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 30]]
     *
     * _.sortBy(users, ['user', 'age']);
     * // => objects for [['barney', 34], ['barney', 36], ['fred', 30], ['fred', 48]]
     */var sortBy=baseRest(function(collection,iteratees){if(collection==null){return[];}var length=iteratees.length;if(length>1&&isIterateeCall(collection,iteratees[0],iteratees[1])){iteratees=[];}else if(length>2&&isIterateeCall(iteratees[0],iteratees[1],iteratees[2])){iteratees=[iteratees[0]];}return baseOrderBy(collection,baseFlatten(iteratees,1),[]);});/*------------------------------------------------------------------------*/ /**
     * Gets the timestamp of the number of milliseconds that have elapsed since
     * the Unix epoch (1 January 1970 00:00:00 UTC).
     *
     * @static
     * @memberOf _
     * @since 2.4.0
     * @category Date
     * @returns {number} Returns the timestamp.
     * @example
     *
     * _.defer(function(stamp) {
     *   console.log(_.now() - stamp);
     * }, _.now());
     * // => Logs the number of milliseconds it took for the deferred invocation.
     */var now=ctxNow||function(){return root.Date.now();};/*------------------------------------------------------------------------*/ /**
     * The opposite of `_.before`; this method creates a function that invokes
     * `func` once it's called `n` or more times.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {number} n The number of calls before `func` is invoked.
     * @param {Function} func The function to restrict.
     * @returns {Function} Returns the new restricted function.
     * @example
     *
     * var saves = ['profile', 'settings'];
     *
     * var done = _.after(saves.length, function() {
     *   console.log('done saving!');
     * });
     *
     * _.forEach(saves, function(type) {
     *   asyncSave({ 'type': type, 'complete': done });
     * });
     * // => Logs 'done saving!' after the two async saves have completed.
     */function after(n,func){if(typeof func!='function'){throw new TypeError(FUNC_ERROR_TEXT);}n=toInteger(n);return function(){if(--n<1){return func.apply(this,arguments);}};}/**
     * Creates a function that invokes `func`, with up to `n` arguments,
     * ignoring any additional arguments.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Function
     * @param {Function} func The function to cap arguments for.
     * @param {number} [n=func.length] The arity cap.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Function} Returns the new capped function.
     * @example
     *
     * _.map(['6', '8', '10'], _.ary(parseInt, 1));
     * // => [6, 8, 10]
     */function ary(func,n,guard){n=guard?undefined:n;n=func&&n==null?func.length:n;return createWrap(func,WRAP_ARY_FLAG,undefined,undefined,undefined,undefined,n);}/**
     * Creates a function that invokes `func`, with the `this` binding and arguments
     * of the created function, while it's called less than `n` times. Subsequent
     * calls to the created function return the result of the last `func` invocation.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Function
     * @param {number} n The number of calls at which `func` is no longer invoked.
     * @param {Function} func The function to restrict.
     * @returns {Function} Returns the new restricted function.
     * @example
     *
     * jQuery(element).on('click', _.before(5, addContactToList));
     * // => Allows adding up to 4 contacts to the list.
     */function before(n,func){var result;if(typeof func!='function'){throw new TypeError(FUNC_ERROR_TEXT);}n=toInteger(n);return function(){if(--n>0){result=func.apply(this,arguments);}if(n<=1){func=undefined;}return result;};}/**
     * Creates a function that invokes `func` with the `this` binding of `thisArg`
     * and `partials` prepended to the arguments it receives.
     *
     * The `_.bind.placeholder` value, which defaults to `_` in monolithic builds,
     * may be used as a placeholder for partially applied arguments.
     *
     * **Note:** Unlike native `Function#bind`, this method doesn't set the "length"
     * property of bound functions.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {Function} func The function to bind.
     * @param {*} thisArg The `this` binding of `func`.
     * @param {...*} [partials] The arguments to be partially applied.
     * @returns {Function} Returns the new bound function.
     * @example
     *
     * function greet(greeting, punctuation) {
     *   return greeting + ' ' + this.user + punctuation;
     * }
     *
     * var object = { 'user': 'fred' };
     *
     * var bound = _.bind(greet, object, 'hi');
     * bound('!');
     * // => 'hi fred!'
     *
     * // Bound with placeholders.
     * var bound = _.bind(greet, object, _, '!');
     * bound('hi');
     * // => 'hi fred!'
     */var bind=baseRest(function(func,thisArg,partials){var bitmask=WRAP_BIND_FLAG;if(partials.length){var holders=replaceHolders(partials,getHolder(bind));bitmask|=WRAP_PARTIAL_FLAG;}return createWrap(func,bitmask,thisArg,partials,holders);});/**
     * Creates a function that invokes the method at `object[key]` with `partials`
     * prepended to the arguments it receives.
     *
     * This method differs from `_.bind` by allowing bound functions to reference
     * methods that may be redefined or don't yet exist. See
     * [Peter Michaux's article](http://peter.michaux.ca/articles/lazy-function-definition-pattern)
     * for more details.
     *
     * The `_.bindKey.placeholder` value, which defaults to `_` in monolithic
     * builds, may be used as a placeholder for partially applied arguments.
     *
     * @static
     * @memberOf _
     * @since 0.10.0
     * @category Function
     * @param {Object} object The object to invoke the method on.
     * @param {string} key The key of the method.
     * @param {...*} [partials] The arguments to be partially applied.
     * @returns {Function} Returns the new bound function.
     * @example
     *
     * var object = {
     *   'user': 'fred',
     *   'greet': function(greeting, punctuation) {
     *     return greeting + ' ' + this.user + punctuation;
     *   }
     * };
     *
     * var bound = _.bindKey(object, 'greet', 'hi');
     * bound('!');
     * // => 'hi fred!'
     *
     * object.greet = function(greeting, punctuation) {
     *   return greeting + 'ya ' + this.user + punctuation;
     * };
     *
     * bound('!');
     * // => 'hiya fred!'
     *
     * // Bound with placeholders.
     * var bound = _.bindKey(object, 'greet', _, '!');
     * bound('hi');
     * // => 'hiya fred!'
     */var bindKey=baseRest(function(object,key,partials){var bitmask=WRAP_BIND_FLAG|WRAP_BIND_KEY_FLAG;if(partials.length){var holders=replaceHolders(partials,getHolder(bindKey));bitmask|=WRAP_PARTIAL_FLAG;}return createWrap(key,bitmask,object,partials,holders);});/**
     * Creates a function that accepts arguments of `func` and either invokes
     * `func` returning its result, if at least `arity` number of arguments have
     * been provided, or returns a function that accepts the remaining `func`
     * arguments, and so on. The arity of `func` may be specified if `func.length`
     * is not sufficient.
     *
     * The `_.curry.placeholder` value, which defaults to `_` in monolithic builds,
     * may be used as a placeholder for provided arguments.
     *
     * **Note:** This method doesn't set the "length" property of curried functions.
     *
     * @static
     * @memberOf _
     * @since 2.0.0
     * @category Function
     * @param {Function} func The function to curry.
     * @param {number} [arity=func.length] The arity of `func`.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Function} Returns the new curried function.
     * @example
     *
     * var abc = function(a, b, c) {
     *   return [a, b, c];
     * };
     *
     * var curried = _.curry(abc);
     *
     * curried(1)(2)(3);
     * // => [1, 2, 3]
     *
     * curried(1, 2)(3);
     * // => [1, 2, 3]
     *
     * curried(1, 2, 3);
     * // => [1, 2, 3]
     *
     * // Curried with placeholders.
     * curried(1)(_, 3)(2);
     * // => [1, 2, 3]
     */function curry(func,arity,guard){arity=guard?undefined:arity;var result=createWrap(func,WRAP_CURRY_FLAG,undefined,undefined,undefined,undefined,undefined,arity);result.placeholder=curry.placeholder;return result;}/**
     * This method is like `_.curry` except that arguments are applied to `func`
     * in the manner of `_.partialRight` instead of `_.partial`.
     *
     * The `_.curryRight.placeholder` value, which defaults to `_` in monolithic
     * builds, may be used as a placeholder for provided arguments.
     *
     * **Note:** This method doesn't set the "length" property of curried functions.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Function
     * @param {Function} func The function to curry.
     * @param {number} [arity=func.length] The arity of `func`.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Function} Returns the new curried function.
     * @example
     *
     * var abc = function(a, b, c) {
     *   return [a, b, c];
     * };
     *
     * var curried = _.curryRight(abc);
     *
     * curried(3)(2)(1);
     * // => [1, 2, 3]
     *
     * curried(2, 3)(1);
     * // => [1, 2, 3]
     *
     * curried(1, 2, 3);
     * // => [1, 2, 3]
     *
     * // Curried with placeholders.
     * curried(3)(1, _)(2);
     * // => [1, 2, 3]
     */function curryRight(func,arity,guard){arity=guard?undefined:arity;var result=createWrap(func,WRAP_CURRY_RIGHT_FLAG,undefined,undefined,undefined,undefined,undefined,arity);result.placeholder=curryRight.placeholder;return result;}/**
     * Creates a debounced function that delays invoking `func` until after `wait`
     * milliseconds have elapsed since the last time the debounced function was
     * invoked. The debounced function comes with a `cancel` method to cancel
     * delayed `func` invocations and a `flush` method to immediately invoke them.
     * Provide `options` to indicate whether `func` should be invoked on the
     * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
     * with the last arguments provided to the debounced function. Subsequent
     * calls to the debounced function return the result of the last `func`
     * invocation.
     *
     * **Note:** If `leading` and `trailing` options are `true`, `func` is
     * invoked on the trailing edge of the timeout only if the debounced function
     * is invoked more than once during the `wait` timeout.
     *
     * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
     * until to the next tick, similar to `setTimeout` with a timeout of `0`.
     *
     * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
     * for details over the differences between `_.debounce` and `_.throttle`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {Function} func The function to debounce.
     * @param {number} [wait=0] The number of milliseconds to delay.
     * @param {Object} [options={}] The options object.
     * @param {boolean} [options.leading=false]
     *  Specify invoking on the leading edge of the timeout.
     * @param {number} [options.maxWait]
     *  The maximum time `func` is allowed to be delayed before it's invoked.
     * @param {boolean} [options.trailing=true]
     *  Specify invoking on the trailing edge of the timeout.
     * @returns {Function} Returns the new debounced function.
     * @example
     *
     * // Avoid costly calculations while the window size is in flux.
     * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
     *
     * // Invoke `sendMail` when clicked, debouncing subsequent calls.
     * jQuery(element).on('click', _.debounce(sendMail, 300, {
     *   'leading': true,
     *   'trailing': false
     * }));
     *
     * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
     * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
     * var source = new EventSource('/stream');
     * jQuery(source).on('message', debounced);
     *
     * // Cancel the trailing debounced invocation.
     * jQuery(window).on('popstate', debounced.cancel);
     */function debounce(func,wait,options){var lastArgs,lastThis,maxWait,result,timerId,lastCallTime,lastInvokeTime=0,leading=false,maxing=false,trailing=true;if(typeof func!='function'){throw new TypeError(FUNC_ERROR_TEXT);}wait=toNumber(wait)||0;if(isObject(options)){leading=!!options.leading;maxing='maxWait'in options;maxWait=maxing?nativeMax(toNumber(options.maxWait)||0,wait):maxWait;trailing='trailing'in options?!!options.trailing:trailing;}function invokeFunc(time){var args=lastArgs,thisArg=lastThis;lastArgs=lastThis=undefined;lastInvokeTime=time;result=func.apply(thisArg,args);return result;}function leadingEdge(time){// Reset any `maxWait` timer.
lastInvokeTime=time;// Start the timer for the trailing edge.
timerId=setTimeout(timerExpired,wait);// Invoke the leading edge.
return leading?invokeFunc(time):result;}function remainingWait(time){var timeSinceLastCall=time-lastCallTime,timeSinceLastInvoke=time-lastInvokeTime,timeWaiting=wait-timeSinceLastCall;return maxing?nativeMin(timeWaiting,maxWait-timeSinceLastInvoke):timeWaiting;}function shouldInvoke(time){var timeSinceLastCall=time-lastCallTime,timeSinceLastInvoke=time-lastInvokeTime;// Either this is the first call, activity has stopped and we're at the
// trailing edge, the system time has gone backwards and we're treating
// it as the trailing edge, or we've hit the `maxWait` limit.
return lastCallTime===undefined||timeSinceLastCall>=wait||timeSinceLastCall<0||maxing&&timeSinceLastInvoke>=maxWait;}function timerExpired(){var time=now();if(shouldInvoke(time)){return trailingEdge(time);}// Restart the timer.
timerId=setTimeout(timerExpired,remainingWait(time));}function trailingEdge(time){timerId=undefined;// Only invoke if we have `lastArgs` which means `func` has been
// debounced at least once.
if(trailing&&lastArgs){return invokeFunc(time);}lastArgs=lastThis=undefined;return result;}function cancel(){if(timerId!==undefined){clearTimeout(timerId);}lastInvokeTime=0;lastArgs=lastCallTime=lastThis=timerId=undefined;}function flush(){return timerId===undefined?result:trailingEdge(now());}function debounced(){var time=now(),isInvoking=shouldInvoke(time);lastArgs=arguments;lastThis=this;lastCallTime=time;if(isInvoking){if(timerId===undefined){return leadingEdge(lastCallTime);}if(maxing){// Handle invocations in a tight loop.
clearTimeout(timerId);timerId=setTimeout(timerExpired,wait);return invokeFunc(lastCallTime);}}if(timerId===undefined){timerId=setTimeout(timerExpired,wait);}return result;}debounced.cancel=cancel;debounced.flush=flush;return debounced;}/**
     * Defers invoking the `func` until the current call stack has cleared. Any
     * additional arguments are provided to `func` when it's invoked.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {Function} func The function to defer.
     * @param {...*} [args] The arguments to invoke `func` with.
     * @returns {number} Returns the timer id.
     * @example
     *
     * _.defer(function(text) {
     *   console.log(text);
     * }, 'deferred');
     * // => Logs 'deferred' after one millisecond.
     */var defer=baseRest(function(func,args){return baseDelay(func,1,args);});/**
     * Invokes `func` after `wait` milliseconds. Any additional arguments are
     * provided to `func` when it's invoked.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {Function} func The function to delay.
     * @param {number} wait The number of milliseconds to delay invocation.
     * @param {...*} [args] The arguments to invoke `func` with.
     * @returns {number} Returns the timer id.
     * @example
     *
     * _.delay(function(text) {
     *   console.log(text);
     * }, 1000, 'later');
     * // => Logs 'later' after one second.
     */var delay=baseRest(function(func,wait,args){return baseDelay(func,toNumber(wait)||0,args);});/**
     * Creates a function that invokes `func` with arguments reversed.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Function
     * @param {Function} func The function to flip arguments for.
     * @returns {Function} Returns the new flipped function.
     * @example
     *
     * var flipped = _.flip(function() {
     *   return _.toArray(arguments);
     * });
     *
     * flipped('a', 'b', 'c', 'd');
     * // => ['d', 'c', 'b', 'a']
     */function flip(func){return createWrap(func,WRAP_FLIP_FLAG);}/**
     * Creates a function that memoizes the result of `func`. If `resolver` is
     * provided, it determines the cache key for storing the result based on the
     * arguments provided to the memoized function. By default, the first argument
     * provided to the memoized function is used as the map cache key. The `func`
     * is invoked with the `this` binding of the memoized function.
     *
     * **Note:** The cache is exposed as the `cache` property on the memoized
     * function. Its creation may be customized by replacing the `_.memoize.Cache`
     * constructor with one whose instances implement the
     * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
     * method interface of `clear`, `delete`, `get`, `has`, and `set`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {Function} func The function to have its output memoized.
     * @param {Function} [resolver] The function to resolve the cache key.
     * @returns {Function} Returns the new memoized function.
     * @example
     *
     * var object = { 'a': 1, 'b': 2 };
     * var other = { 'c': 3, 'd': 4 };
     *
     * var values = _.memoize(_.values);
     * values(object);
     * // => [1, 2]
     *
     * values(other);
     * // => [3, 4]
     *
     * object.a = 2;
     * values(object);
     * // => [1, 2]
     *
     * // Modify the result cache.
     * values.cache.set(object, ['a', 'b']);
     * values(object);
     * // => ['a', 'b']
     *
     * // Replace `_.memoize.Cache`.
     * _.memoize.Cache = WeakMap;
     */function memoize(func,resolver){if(typeof func!='function'||resolver!=null&&typeof resolver!='function'){throw new TypeError(FUNC_ERROR_TEXT);}var memoized=function(){var args=arguments,key=resolver?resolver.apply(this,args):args[0],cache=memoized.cache;if(cache.has(key)){return cache.get(key);}var result=func.apply(this,args);memoized.cache=cache.set(key,result)||cache;return result;};memoized.cache=new(memoize.Cache||MapCache)();return memoized;}// Expose `MapCache`.
memoize.Cache=MapCache;/**
     * Creates a function that negates the result of the predicate `func`. The
     * `func` predicate is invoked with the `this` binding and arguments of the
     * created function.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Function
     * @param {Function} predicate The predicate to negate.
     * @returns {Function} Returns the new negated function.
     * @example
     *
     * function isEven(n) {
     *   return n % 2 == 0;
     * }
     *
     * _.filter([1, 2, 3, 4, 5, 6], _.negate(isEven));
     * // => [1, 3, 5]
     */function negate(predicate){if(typeof predicate!='function'){throw new TypeError(FUNC_ERROR_TEXT);}return function(){var args=arguments;switch(args.length){case 0:return!predicate.call(this);case 1:return!predicate.call(this,args[0]);case 2:return!predicate.call(this,args[0],args[1]);case 3:return!predicate.call(this,args[0],args[1],args[2]);}return!predicate.apply(this,args);};}/**
     * Creates a function that is restricted to invoking `func` once. Repeat calls
     * to the function return the value of the first invocation. The `func` is
     * invoked with the `this` binding and arguments of the created function.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {Function} func The function to restrict.
     * @returns {Function} Returns the new restricted function.
     * @example
     *
     * var initialize = _.once(createApplication);
     * initialize();
     * initialize();
     * // => `createApplication` is invoked once
     */function once(func){return before(2,func);}/**
     * Creates a function that invokes `func` with its arguments transformed.
     *
     * @static
     * @since 4.0.0
     * @memberOf _
     * @category Function
     * @param {Function} func The function to wrap.
     * @param {...(Function|Function[])} [transforms=[_.identity]]
     *  The argument transforms.
     * @returns {Function} Returns the new function.
     * @example
     *
     * function doubled(n) {
     *   return n * 2;
     * }
     *
     * function square(n) {
     *   return n * n;
     * }
     *
     * var func = _.overArgs(function(x, y) {
     *   return [x, y];
     * }, [square, doubled]);
     *
     * func(9, 3);
     * // => [81, 6]
     *
     * func(10, 5);
     * // => [100, 10]
     */var overArgs=castRest(function(func,transforms){transforms=transforms.length==1&&isArray(transforms[0])?arrayMap(transforms[0],baseUnary(getIteratee())):arrayMap(baseFlatten(transforms,1),baseUnary(getIteratee()));var funcsLength=transforms.length;return baseRest(function(args){var index=-1,length=nativeMin(args.length,funcsLength);while(++index<length){args[index]=transforms[index].call(this,args[index]);}return apply(func,this,args);});});/**
     * Creates a function that invokes `func` with `partials` prepended to the
     * arguments it receives. This method is like `_.bind` except it does **not**
     * alter the `this` binding.
     *
     * The `_.partial.placeholder` value, which defaults to `_` in monolithic
     * builds, may be used as a placeholder for partially applied arguments.
     *
     * **Note:** This method doesn't set the "length" property of partially
     * applied functions.
     *
     * @static
     * @memberOf _
     * @since 0.2.0
     * @category Function
     * @param {Function} func The function to partially apply arguments to.
     * @param {...*} [partials] The arguments to be partially applied.
     * @returns {Function} Returns the new partially applied function.
     * @example
     *
     * function greet(greeting, name) {
     *   return greeting + ' ' + name;
     * }
     *
     * var sayHelloTo = _.partial(greet, 'hello');
     * sayHelloTo('fred');
     * // => 'hello fred'
     *
     * // Partially applied with placeholders.
     * var greetFred = _.partial(greet, _, 'fred');
     * greetFred('hi');
     * // => 'hi fred'
     */var partial=baseRest(function(func,partials){var holders=replaceHolders(partials,getHolder(partial));return createWrap(func,WRAP_PARTIAL_FLAG,undefined,partials,holders);});/**
     * This method is like `_.partial` except that partially applied arguments
     * are appended to the arguments it receives.
     *
     * The `_.partialRight.placeholder` value, which defaults to `_` in monolithic
     * builds, may be used as a placeholder for partially applied arguments.
     *
     * **Note:** This method doesn't set the "length" property of partially
     * applied functions.
     *
     * @static
     * @memberOf _
     * @since 1.0.0
     * @category Function
     * @param {Function} func The function to partially apply arguments to.
     * @param {...*} [partials] The arguments to be partially applied.
     * @returns {Function} Returns the new partially applied function.
     * @example
     *
     * function greet(greeting, name) {
     *   return greeting + ' ' + name;
     * }
     *
     * var greetFred = _.partialRight(greet, 'fred');
     * greetFred('hi');
     * // => 'hi fred'
     *
     * // Partially applied with placeholders.
     * var sayHelloTo = _.partialRight(greet, 'hello', _);
     * sayHelloTo('fred');
     * // => 'hello fred'
     */var partialRight=baseRest(function(func,partials){var holders=replaceHolders(partials,getHolder(partialRight));return createWrap(func,WRAP_PARTIAL_RIGHT_FLAG,undefined,partials,holders);});/**
     * Creates a function that invokes `func` with arguments arranged according
     * to the specified `indexes` where the argument value at the first index is
     * provided as the first argument, the argument value at the second index is
     * provided as the second argument, and so on.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Function
     * @param {Function} func The function to rearrange arguments for.
     * @param {...(number|number[])} indexes The arranged argument indexes.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var rearged = _.rearg(function(a, b, c) {
     *   return [a, b, c];
     * }, [2, 0, 1]);
     *
     * rearged('b', 'c', 'a')
     * // => ['a', 'b', 'c']
     */var rearg=flatRest(function(func,indexes){return createWrap(func,WRAP_REARG_FLAG,undefined,undefined,undefined,indexes);});/**
     * Creates a function that invokes `func` with the `this` binding of the
     * created function and arguments from `start` and beyond provided as
     * an array.
     *
     * **Note:** This method is based on the
     * [rest parameter](https://mdn.io/rest_parameters).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Function
     * @param {Function} func The function to apply a rest parameter to.
     * @param {number} [start=func.length-1] The start position of the rest parameter.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var say = _.rest(function(what, names) {
     *   return what + ' ' + _.initial(names).join(', ') +
     *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
     * });
     *
     * say('hello', 'fred', 'barney', 'pebbles');
     * // => 'hello fred, barney, & pebbles'
     */function rest(func,start){if(typeof func!='function'){throw new TypeError(FUNC_ERROR_TEXT);}start=start===undefined?start:toInteger(start);return baseRest(func,start);}/**
     * Creates a function that invokes `func` with the `this` binding of the
     * create function and an array of arguments much like
     * [`Function#apply`](http://www.ecma-international.org/ecma-262/7.0/#sec-function.prototype.apply).
     *
     * **Note:** This method is based on the
     * [spread operator](https://mdn.io/spread_operator).
     *
     * @static
     * @memberOf _
     * @since 3.2.0
     * @category Function
     * @param {Function} func The function to spread arguments over.
     * @param {number} [start=0] The start position of the spread.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var say = _.spread(function(who, what) {
     *   return who + ' says ' + what;
     * });
     *
     * say(['fred', 'hello']);
     * // => 'fred says hello'
     *
     * var numbers = Promise.all([
     *   Promise.resolve(40),
     *   Promise.resolve(36)
     * ]);
     *
     * numbers.then(_.spread(function(x, y) {
     *   return x + y;
     * }));
     * // => a Promise of 76
     */function spread(func,start){if(typeof func!='function'){throw new TypeError(FUNC_ERROR_TEXT);}start=start==null?0:nativeMax(toInteger(start),0);return baseRest(function(args){var array=args[start],otherArgs=castSlice(args,0,start);if(array){arrayPush(otherArgs,array);}return apply(func,this,otherArgs);});}/**
     * Creates a throttled function that only invokes `func` at most once per
     * every `wait` milliseconds. The throttled function comes with a `cancel`
     * method to cancel delayed `func` invocations and a `flush` method to
     * immediately invoke them. Provide `options` to indicate whether `func`
     * should be invoked on the leading and/or trailing edge of the `wait`
     * timeout. The `func` is invoked with the last arguments provided to the
     * throttled function. Subsequent calls to the throttled function return the
     * result of the last `func` invocation.
     *
     * **Note:** If `leading` and `trailing` options are `true`, `func` is
     * invoked on the trailing edge of the timeout only if the throttled function
     * is invoked more than once during the `wait` timeout.
     *
     * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
     * until to the next tick, similar to `setTimeout` with a timeout of `0`.
     *
     * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
     * for details over the differences between `_.throttle` and `_.debounce`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {Function} func The function to throttle.
     * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
     * @param {Object} [options={}] The options object.
     * @param {boolean} [options.leading=true]
     *  Specify invoking on the leading edge of the timeout.
     * @param {boolean} [options.trailing=true]
     *  Specify invoking on the trailing edge of the timeout.
     * @returns {Function} Returns the new throttled function.
     * @example
     *
     * // Avoid excessively updating the position while scrolling.
     * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
     *
     * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
     * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
     * jQuery(element).on('click', throttled);
     *
     * // Cancel the trailing throttled invocation.
     * jQuery(window).on('popstate', throttled.cancel);
     */function throttle(func,wait,options){var leading=true,trailing=true;if(typeof func!='function'){throw new TypeError(FUNC_ERROR_TEXT);}if(isObject(options)){leading='leading'in options?!!options.leading:leading;trailing='trailing'in options?!!options.trailing:trailing;}return debounce(func,wait,{'leading':leading,'maxWait':wait,'trailing':trailing});}/**
     * Creates a function that accepts up to one argument, ignoring any
     * additional arguments.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Function
     * @param {Function} func The function to cap arguments for.
     * @returns {Function} Returns the new capped function.
     * @example
     *
     * _.map(['6', '8', '10'], _.unary(parseInt));
     * // => [6, 8, 10]
     */function unary(func){return ary(func,1);}/**
     * Creates a function that provides `value` to `wrapper` as its first
     * argument. Any additional arguments provided to the function are appended
     * to those provided to the `wrapper`. The wrapper is invoked with the `this`
     * binding of the created function.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {*} value The value to wrap.
     * @param {Function} [wrapper=identity] The wrapper function.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var p = _.wrap(_.escape, function(func, text) {
     *   return '<p>' + func(text) + '</p>';
     * });
     *
     * p('fred, barney, & pebbles');
     * // => '<p>fred, barney, &amp; pebbles</p>'
     */function wrap(value,wrapper){return partial(castFunction(wrapper),value);}/*------------------------------------------------------------------------*/ /**
     * Casts `value` as an array if it's not one.
     *
     * @static
     * @memberOf _
     * @since 4.4.0
     * @category Lang
     * @param {*} value The value to inspect.
     * @returns {Array} Returns the cast array.
     * @example
     *
     * _.castArray(1);
     * // => [1]
     *
     * _.castArray({ 'a': 1 });
     * // => [{ 'a': 1 }]
     *
     * _.castArray('abc');
     * // => ['abc']
     *
     * _.castArray(null);
     * // => [null]
     *
     * _.castArray(undefined);
     * // => [undefined]
     *
     * _.castArray();
     * // => []
     *
     * var array = [1, 2, 3];
     * console.log(_.castArray(array) === array);
     * // => true
     */function castArray(){if(!arguments.length){return[];}var value=arguments[0];return isArray(value)?value:[value];}/**
     * Creates a shallow clone of `value`.
     *
     * **Note:** This method is loosely based on the
     * [structured clone algorithm](https://mdn.io/Structured_clone_algorithm)
     * and supports cloning arrays, array buffers, booleans, date objects, maps,
     * numbers, `Object` objects, regexes, sets, strings, symbols, and typed
     * arrays. The own enumerable properties of `arguments` objects are cloned
     * as plain objects. An empty object is returned for uncloneable values such
     * as error objects, functions, DOM nodes, and WeakMaps.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to clone.
     * @returns {*} Returns the cloned value.
     * @see _.cloneDeep
     * @example
     *
     * var objects = [{ 'a': 1 }, { 'b': 2 }];
     *
     * var shallow = _.clone(objects);
     * console.log(shallow[0] === objects[0]);
     * // => true
     */function clone(value){return baseClone(value,CLONE_SYMBOLS_FLAG);}/**
     * This method is like `_.clone` except that it accepts `customizer` which
     * is invoked to produce the cloned value. If `customizer` returns `undefined`,
     * cloning is handled by the method instead. The `customizer` is invoked with
     * up to four arguments; (value [, index|key, object, stack]).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to clone.
     * @param {Function} [customizer] The function to customize cloning.
     * @returns {*} Returns the cloned value.
     * @see _.cloneDeepWith
     * @example
     *
     * function customizer(value) {
     *   if (_.isElement(value)) {
     *     return value.cloneNode(false);
     *   }
     * }
     *
     * var el = _.cloneWith(document.body, customizer);
     *
     * console.log(el === document.body);
     * // => false
     * console.log(el.nodeName);
     * // => 'BODY'
     * console.log(el.childNodes.length);
     * // => 0
     */function cloneWith(value,customizer){customizer=typeof customizer=='function'?customizer:undefined;return baseClone(value,CLONE_SYMBOLS_FLAG,customizer);}/**
     * This method is like `_.clone` except that it recursively clones `value`.
     *
     * @static
     * @memberOf _
     * @since 1.0.0
     * @category Lang
     * @param {*} value The value to recursively clone.
     * @returns {*} Returns the deep cloned value.
     * @see _.clone
     * @example
     *
     * var objects = [{ 'a': 1 }, { 'b': 2 }];
     *
     * var deep = _.cloneDeep(objects);
     * console.log(deep[0] === objects[0]);
     * // => false
     */function cloneDeep(value){return baseClone(value,CLONE_DEEP_FLAG|CLONE_SYMBOLS_FLAG);}/**
     * This method is like `_.cloneWith` except that it recursively clones `value`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to recursively clone.
     * @param {Function} [customizer] The function to customize cloning.
     * @returns {*} Returns the deep cloned value.
     * @see _.cloneWith
     * @example
     *
     * function customizer(value) {
     *   if (_.isElement(value)) {
     *     return value.cloneNode(true);
     *   }
     * }
     *
     * var el = _.cloneDeepWith(document.body, customizer);
     *
     * console.log(el === document.body);
     * // => false
     * console.log(el.nodeName);
     * // => 'BODY'
     * console.log(el.childNodes.length);
     * // => 20
     */function cloneDeepWith(value,customizer){customizer=typeof customizer=='function'?customizer:undefined;return baseClone(value,CLONE_DEEP_FLAG|CLONE_SYMBOLS_FLAG,customizer);}/**
     * Checks if `object` conforms to `source` by invoking the predicate
     * properties of `source` with the corresponding property values of `object`.
     *
     * **Note:** This method is equivalent to `_.conforms` when `source` is
     * partially applied.
     *
     * @static
     * @memberOf _
     * @since 4.14.0
     * @category Lang
     * @param {Object} object The object to inspect.
     * @param {Object} source The object of property predicates to conform to.
     * @returns {boolean} Returns `true` if `object` conforms, else `false`.
     * @example
     *
     * var object = { 'a': 1, 'b': 2 };
     *
     * _.conformsTo(object, { 'b': function(n) { return n > 1; } });
     * // => true
     *
     * _.conformsTo(object, { 'b': function(n) { return n > 2; } });
     * // => false
     */function conformsTo(object,source){return source==null||baseConformsTo(object,source,keys(source));}/**
     * Performs a
     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * comparison between two values to determine if they are equivalent.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     * @example
     *
     * var object = { 'a': 1 };
     * var other = { 'a': 1 };
     *
     * _.eq(object, object);
     * // => true
     *
     * _.eq(object, other);
     * // => false
     *
     * _.eq('a', 'a');
     * // => true
     *
     * _.eq('a', Object('a'));
     * // => false
     *
     * _.eq(NaN, NaN);
     * // => true
     */function eq(value,other){return value===other||value!==value&&other!==other;}/**
     * Checks if `value` is greater than `other`.
     *
     * @static
     * @memberOf _
     * @since 3.9.0
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if `value` is greater than `other`,
     *  else `false`.
     * @see _.lt
     * @example
     *
     * _.gt(3, 1);
     * // => true
     *
     * _.gt(3, 3);
     * // => false
     *
     * _.gt(1, 3);
     * // => false
     */var gt=createRelationalOperation(baseGt);/**
     * Checks if `value` is greater than or equal to `other`.
     *
     * @static
     * @memberOf _
     * @since 3.9.0
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if `value` is greater than or equal to
     *  `other`, else `false`.
     * @see _.lte
     * @example
     *
     * _.gte(3, 1);
     * // => true
     *
     * _.gte(3, 3);
     * // => true
     *
     * _.gte(1, 3);
     * // => false
     */var gte=createRelationalOperation(function(value,other){return value>=other;});/**
     * Checks if `value` is likely an `arguments` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an `arguments` object,
     *  else `false`.
     * @example
     *
     * _.isArguments(function() { return arguments; }());
     * // => true
     *
     * _.isArguments([1, 2, 3]);
     * // => false
     */var isArguments=baseIsArguments(function(){return arguments;}())?baseIsArguments:function(value){return isObjectLike(value)&&hasOwnProperty.call(value,'callee')&&!propertyIsEnumerable.call(value,'callee');};/**
     * Checks if `value` is classified as an `Array` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an array, else `false`.
     * @example
     *
     * _.isArray([1, 2, 3]);
     * // => true
     *
     * _.isArray(document.body.children);
     * // => false
     *
     * _.isArray('abc');
     * // => false
     *
     * _.isArray(_.noop);
     * // => false
     */var isArray=Array.isArray;/**
     * Checks if `value` is classified as an `ArrayBuffer` object.
     *
     * @static
     * @memberOf _
     * @since 4.3.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an array buffer, else `false`.
     * @example
     *
     * _.isArrayBuffer(new ArrayBuffer(2));
     * // => true
     *
     * _.isArrayBuffer(new Array(2));
     * // => false
     */var isArrayBuffer=nodeIsArrayBuffer?baseUnary(nodeIsArrayBuffer):baseIsArrayBuffer;/**
     * Checks if `value` is array-like. A value is considered array-like if it's
     * not a function and has a `value.length` that's an integer greater than or
     * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
     * @example
     *
     * _.isArrayLike([1, 2, 3]);
     * // => true
     *
     * _.isArrayLike(document.body.children);
     * // => true
     *
     * _.isArrayLike('abc');
     * // => true
     *
     * _.isArrayLike(_.noop);
     * // => false
     */function isArrayLike(value){return value!=null&&isLength(value.length)&&!isFunction(value);}/**
     * This method is like `_.isArrayLike` except that it also checks if `value`
     * is an object.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an array-like object,
     *  else `false`.
     * @example
     *
     * _.isArrayLikeObject([1, 2, 3]);
     * // => true
     *
     * _.isArrayLikeObject(document.body.children);
     * // => true
     *
     * _.isArrayLikeObject('abc');
     * // => false
     *
     * _.isArrayLikeObject(_.noop);
     * // => false
     */function isArrayLikeObject(value){return isObjectLike(value)&&isArrayLike(value);}/**
     * Checks if `value` is classified as a boolean primitive or object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a boolean, else `false`.
     * @example
     *
     * _.isBoolean(false);
     * // => true
     *
     * _.isBoolean(null);
     * // => false
     */function isBoolean(value){return value===true||value===false||isObjectLike(value)&&baseGetTag(value)==boolTag;}/**
     * Checks if `value` is a buffer.
     *
     * @static
     * @memberOf _
     * @since 4.3.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
     * @example
     *
     * _.isBuffer(new Buffer(2));
     * // => true
     *
     * _.isBuffer(new Uint8Array(2));
     * // => false
     */var isBuffer=nativeIsBuffer||stubFalse;/**
     * Checks if `value` is classified as a `Date` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a date object, else `false`.
     * @example
     *
     * _.isDate(new Date);
     * // => true
     *
     * _.isDate('Mon April 23 2012');
     * // => false
     */var isDate=nodeIsDate?baseUnary(nodeIsDate):baseIsDate;/**
     * Checks if `value` is likely a DOM element.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a DOM element, else `false`.
     * @example
     *
     * _.isElement(document.body);
     * // => true
     *
     * _.isElement('<body>');
     * // => false
     */function isElement(value){return isObjectLike(value)&&value.nodeType===1&&!isPlainObject(value);}/**
     * Checks if `value` is an empty object, collection, map, or set.
     *
     * Objects are considered empty if they have no own enumerable string keyed
     * properties.
     *
     * Array-like values such as `arguments` objects, arrays, buffers, strings, or
     * jQuery-like collections are considered empty if they have a `length` of `0`.
     * Similarly, maps and sets are considered empty if they have a `size` of `0`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is empty, else `false`.
     * @example
     *
     * _.isEmpty(null);
     * // => true
     *
     * _.isEmpty(true);
     * // => true
     *
     * _.isEmpty(1);
     * // => true
     *
     * _.isEmpty([1, 2, 3]);
     * // => false
     *
     * _.isEmpty({ 'a': 1 });
     * // => false
     */function isEmpty(value){if(value==null){return true;}if(isArrayLike(value)&&(isArray(value)||typeof value=='string'||typeof value.splice=='function'||isBuffer(value)||isTypedArray(value)||isArguments(value))){return!value.length;}var tag=getTag(value);if(tag==mapTag||tag==setTag){return!value.size;}if(isPrototype(value)){return!baseKeys(value).length;}for(var key in value){if(hasOwnProperty.call(value,key)){return false;}}return true;}/**
     * Performs a deep comparison between two values to determine if they are
     * equivalent.
     *
     * **Note:** This method supports comparing arrays, array buffers, booleans,
     * date objects, error objects, maps, numbers, `Object` objects, regexes,
     * sets, strings, symbols, and typed arrays. `Object` objects are compared
     * by their own, not inherited, enumerable properties. Functions and DOM
     * nodes are compared by strict equality, i.e. `===`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     * @example
     *
     * var object = { 'a': 1 };
     * var other = { 'a': 1 };
     *
     * _.isEqual(object, other);
     * // => true
     *
     * object === other;
     * // => false
     */function isEqual(value,other){return baseIsEqual(value,other);}/**
     * This method is like `_.isEqual` except that it accepts `customizer` which
     * is invoked to compare values. If `customizer` returns `undefined`, comparisons
     * are handled by the method instead. The `customizer` is invoked with up to
     * six arguments: (objValue, othValue [, index|key, object, other, stack]).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @param {Function} [customizer] The function to customize comparisons.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     * @example
     *
     * function isGreeting(value) {
     *   return /^h(?:i|ello)$/.test(value);
     * }
     *
     * function customizer(objValue, othValue) {
     *   if (isGreeting(objValue) && isGreeting(othValue)) {
     *     return true;
     *   }
     * }
     *
     * var array = ['hello', 'goodbye'];
     * var other = ['hi', 'goodbye'];
     *
     * _.isEqualWith(array, other, customizer);
     * // => true
     */function isEqualWith(value,other,customizer){customizer=typeof customizer=='function'?customizer:undefined;var result=customizer?customizer(value,other):undefined;return result===undefined?baseIsEqual(value,other,undefined,customizer):!!result;}/**
     * Checks if `value` is an `Error`, `EvalError`, `RangeError`, `ReferenceError`,
     * `SyntaxError`, `TypeError`, or `URIError` object.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an error object, else `false`.
     * @example
     *
     * _.isError(new Error);
     * // => true
     *
     * _.isError(Error);
     * // => false
     */function isError(value){if(!isObjectLike(value)){return false;}var tag=baseGetTag(value);return tag==errorTag||tag==domExcTag||typeof value.message=='string'&&typeof value.name=='string'&&!isPlainObject(value);}/**
     * Checks if `value` is a finite primitive number.
     *
     * **Note:** This method is based on
     * [`Number.isFinite`](https://mdn.io/Number/isFinite).
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a finite number, else `false`.
     * @example
     *
     * _.isFinite(3);
     * // => true
     *
     * _.isFinite(Number.MIN_VALUE);
     * // => true
     *
     * _.isFinite(Infinity);
     * // => false
     *
     * _.isFinite('3');
     * // => false
     */function isFinite(value){return typeof value=='number'&&nativeIsFinite(value);}/**
     * Checks if `value` is classified as a `Function` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a function, else `false`.
     * @example
     *
     * _.isFunction(_);
     * // => true
     *
     * _.isFunction(/abc/);
     * // => false
     */function isFunction(value){if(!isObject(value)){return false;}// The use of `Object#toString` avoids issues with the `typeof` operator
// in Safari 9 which returns 'object' for typed arrays and other constructors.
var tag=baseGetTag(value);return tag==funcTag||tag==genTag||tag==asyncTag||tag==proxyTag;}/**
     * Checks if `value` is an integer.
     *
     * **Note:** This method is based on
     * [`Number.isInteger`](https://mdn.io/Number/isInteger).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an integer, else `false`.
     * @example
     *
     * _.isInteger(3);
     * // => true
     *
     * _.isInteger(Number.MIN_VALUE);
     * // => false
     *
     * _.isInteger(Infinity);
     * // => false
     *
     * _.isInteger('3');
     * // => false
     */function isInteger(value){return typeof value=='number'&&value==toInteger(value);}/**
     * Checks if `value` is a valid array-like length.
     *
     * **Note:** This method is loosely based on
     * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
     * @example
     *
     * _.isLength(3);
     * // => true
     *
     * _.isLength(Number.MIN_VALUE);
     * // => false
     *
     * _.isLength(Infinity);
     * // => false
     *
     * _.isLength('3');
     * // => false
     */function isLength(value){return typeof value=='number'&&value>-1&&value%1==0&&value<=MAX_SAFE_INTEGER;}/**
     * Checks if `value` is the
     * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
     * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an object, else `false`.
     * @example
     *
     * _.isObject({});
     * // => true
     *
     * _.isObject([1, 2, 3]);
     * // => true
     *
     * _.isObject(_.noop);
     * // => true
     *
     * _.isObject(null);
     * // => false
     */function isObject(value){var type=typeof value;return value!=null&&(type=='object'||type=='function');}/**
     * Checks if `value` is object-like. A value is object-like if it's not `null`
     * and has a `typeof` result of "object".
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
     * @example
     *
     * _.isObjectLike({});
     * // => true
     *
     * _.isObjectLike([1, 2, 3]);
     * // => true
     *
     * _.isObjectLike(_.noop);
     * // => false
     *
     * _.isObjectLike(null);
     * // => false
     */function isObjectLike(value){return value!=null&&typeof value=='object';}/**
     * Checks if `value` is classified as a `Map` object.
     *
     * @static
     * @memberOf _
     * @since 4.3.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a map, else `false`.
     * @example
     *
     * _.isMap(new Map);
     * // => true
     *
     * _.isMap(new WeakMap);
     * // => false
     */var isMap=nodeIsMap?baseUnary(nodeIsMap):baseIsMap;/**
     * Performs a partial deep comparison between `object` and `source` to
     * determine if `object` contains equivalent property values.
     *
     * **Note:** This method is equivalent to `_.matches` when `source` is
     * partially applied.
     *
     * Partial comparisons will match empty array and empty object `source`
     * values against any array or object value, respectively. See `_.isEqual`
     * for a list of supported value comparisons.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Lang
     * @param {Object} object The object to inspect.
     * @param {Object} source The object of property values to match.
     * @returns {boolean} Returns `true` if `object` is a match, else `false`.
     * @example
     *
     * var object = { 'a': 1, 'b': 2 };
     *
     * _.isMatch(object, { 'b': 2 });
     * // => true
     *
     * _.isMatch(object, { 'b': 1 });
     * // => false
     */function isMatch(object,source){return object===source||baseIsMatch(object,source,getMatchData(source));}/**
     * This method is like `_.isMatch` except that it accepts `customizer` which
     * is invoked to compare values. If `customizer` returns `undefined`, comparisons
     * are handled by the method instead. The `customizer` is invoked with five
     * arguments: (objValue, srcValue, index|key, object, source).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {Object} object The object to inspect.
     * @param {Object} source The object of property values to match.
     * @param {Function} [customizer] The function to customize comparisons.
     * @returns {boolean} Returns `true` if `object` is a match, else `false`.
     * @example
     *
     * function isGreeting(value) {
     *   return /^h(?:i|ello)$/.test(value);
     * }
     *
     * function customizer(objValue, srcValue) {
     *   if (isGreeting(objValue) && isGreeting(srcValue)) {
     *     return true;
     *   }
     * }
     *
     * var object = { 'greeting': 'hello' };
     * var source = { 'greeting': 'hi' };
     *
     * _.isMatchWith(object, source, customizer);
     * // => true
     */function isMatchWith(object,source,customizer){customizer=typeof customizer=='function'?customizer:undefined;return baseIsMatch(object,source,getMatchData(source),customizer);}/**
     * Checks if `value` is `NaN`.
     *
     * **Note:** This method is based on
     * [`Number.isNaN`](https://mdn.io/Number/isNaN) and is not the same as
     * global [`isNaN`](https://mdn.io/isNaN) which returns `true` for
     * `undefined` and other non-number values.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
     * @example
     *
     * _.isNaN(NaN);
     * // => true
     *
     * _.isNaN(new Number(NaN));
     * // => true
     *
     * isNaN(undefined);
     * // => true
     *
     * _.isNaN(undefined);
     * // => false
     */function isNaN(value){// An `NaN` primitive is the only value that is not equal to itself.
// Perform the `toStringTag` check first to avoid errors with some
// ActiveX objects in IE.
return isNumber(value)&&value!=+value;}/**
     * Checks if `value` is a pristine native function.
     *
     * **Note:** This method can't reliably detect native functions in the presence
     * of the core-js package because core-js circumvents this kind of detection.
     * Despite multiple requests, the core-js maintainer has made it clear: any
     * attempt to fix the detection will be obstructed. As a result, we're left
     * with little choice but to throw an error. Unfortunately, this also affects
     * packages, like [babel-polyfill](https://www.npmjs.com/package/babel-polyfill),
     * which rely on core-js.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a native function,
     *  else `false`.
     * @example
     *
     * _.isNative(Array.prototype.push);
     * // => true
     *
     * _.isNative(_);
     * // => false
     */function isNative(value){if(isMaskable(value)){throw new Error(CORE_ERROR_TEXT);}return baseIsNative(value);}/**
     * Checks if `value` is `null`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is `null`, else `false`.
     * @example
     *
     * _.isNull(null);
     * // => true
     *
     * _.isNull(void 0);
     * // => false
     */function isNull(value){return value===null;}/**
     * Checks if `value` is `null` or `undefined`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is nullish, else `false`.
     * @example
     *
     * _.isNil(null);
     * // => true
     *
     * _.isNil(void 0);
     * // => true
     *
     * _.isNil(NaN);
     * // => false
     */function isNil(value){return value==null;}/**
     * Checks if `value` is classified as a `Number` primitive or object.
     *
     * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are
     * classified as numbers, use the `_.isFinite` method.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a number, else `false`.
     * @example
     *
     * _.isNumber(3);
     * // => true
     *
     * _.isNumber(Number.MIN_VALUE);
     * // => true
     *
     * _.isNumber(Infinity);
     * // => true
     *
     * _.isNumber('3');
     * // => false
     */function isNumber(value){return typeof value=='number'||isObjectLike(value)&&baseGetTag(value)==numberTag;}/**
     * Checks if `value` is a plain object, that is, an object created by the
     * `Object` constructor or one with a `[[Prototype]]` of `null`.
     *
     * @static
     * @memberOf _
     * @since 0.8.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     * }
     *
     * _.isPlainObject(new Foo);
     * // => false
     *
     * _.isPlainObject([1, 2, 3]);
     * // => false
     *
     * _.isPlainObject({ 'x': 0, 'y': 0 });
     * // => true
     *
     * _.isPlainObject(Object.create(null));
     * // => true
     */function isPlainObject(value){if(!isObjectLike(value)||baseGetTag(value)!=objectTag){return false;}var proto=getPrototype(value);if(proto===null){return true;}var Ctor=hasOwnProperty.call(proto,'constructor')&&proto.constructor;return typeof Ctor=='function'&&Ctor instanceof Ctor&&funcToString.call(Ctor)==objectCtorString;}/**
     * Checks if `value` is classified as a `RegExp` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a regexp, else `false`.
     * @example
     *
     * _.isRegExp(/abc/);
     * // => true
     *
     * _.isRegExp('/abc/');
     * // => false
     */var isRegExp=nodeIsRegExp?baseUnary(nodeIsRegExp):baseIsRegExp;/**
     * Checks if `value` is a safe integer. An integer is safe if it's an IEEE-754
     * double precision number which isn't the result of a rounded unsafe integer.
     *
     * **Note:** This method is based on
     * [`Number.isSafeInteger`](https://mdn.io/Number/isSafeInteger).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a safe integer, else `false`.
     * @example
     *
     * _.isSafeInteger(3);
     * // => true
     *
     * _.isSafeInteger(Number.MIN_VALUE);
     * // => false
     *
     * _.isSafeInteger(Infinity);
     * // => false
     *
     * _.isSafeInteger('3');
     * // => false
     */function isSafeInteger(value){return isInteger(value)&&value>=-MAX_SAFE_INTEGER&&value<=MAX_SAFE_INTEGER;}/**
     * Checks if `value` is classified as a `Set` object.
     *
     * @static
     * @memberOf _
     * @since 4.3.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a set, else `false`.
     * @example
     *
     * _.isSet(new Set);
     * // => true
     *
     * _.isSet(new WeakSet);
     * // => false
     */var isSet=nodeIsSet?baseUnary(nodeIsSet):baseIsSet;/**
     * Checks if `value` is classified as a `String` primitive or object.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a string, else `false`.
     * @example
     *
     * _.isString('abc');
     * // => true
     *
     * _.isString(1);
     * // => false
     */function isString(value){return typeof value=='string'||!isArray(value)&&isObjectLike(value)&&baseGetTag(value)==stringTag;}/**
     * Checks if `value` is classified as a `Symbol` primitive or object.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
     * @example
     *
     * _.isSymbol(Symbol.iterator);
     * // => true
     *
     * _.isSymbol('abc');
     * // => false
     */function isSymbol(value){return typeof value=='symbol'||isObjectLike(value)&&baseGetTag(value)==symbolTag;}/**
     * Checks if `value` is classified as a typed array.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
     * @example
     *
     * _.isTypedArray(new Uint8Array);
     * // => true
     *
     * _.isTypedArray([]);
     * // => false
     */var isTypedArray=nodeIsTypedArray?baseUnary(nodeIsTypedArray):baseIsTypedArray;/**
     * Checks if `value` is `undefined`.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
     * @example
     *
     * _.isUndefined(void 0);
     * // => true
     *
     * _.isUndefined(null);
     * // => false
     */function isUndefined(value){return value===undefined;}/**
     * Checks if `value` is classified as a `WeakMap` object.
     *
     * @static
     * @memberOf _
     * @since 4.3.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a weak map, else `false`.
     * @example
     *
     * _.isWeakMap(new WeakMap);
     * // => true
     *
     * _.isWeakMap(new Map);
     * // => false
     */function isWeakMap(value){return isObjectLike(value)&&getTag(value)==weakMapTag;}/**
     * Checks if `value` is classified as a `WeakSet` object.
     *
     * @static
     * @memberOf _
     * @since 4.3.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a weak set, else `false`.
     * @example
     *
     * _.isWeakSet(new WeakSet);
     * // => true
     *
     * _.isWeakSet(new Set);
     * // => false
     */function isWeakSet(value){return isObjectLike(value)&&baseGetTag(value)==weakSetTag;}/**
     * Checks if `value` is less than `other`.
     *
     * @static
     * @memberOf _
     * @since 3.9.0
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if `value` is less than `other`,
     *  else `false`.
     * @see _.gt
     * @example
     *
     * _.lt(1, 3);
     * // => true
     *
     * _.lt(3, 3);
     * // => false
     *
     * _.lt(3, 1);
     * // => false
     */var lt=createRelationalOperation(baseLt);/**
     * Checks if `value` is less than or equal to `other`.
     *
     * @static
     * @memberOf _
     * @since 3.9.0
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if `value` is less than or equal to
     *  `other`, else `false`.
     * @see _.gte
     * @example
     *
     * _.lte(1, 3);
     * // => true
     *
     * _.lte(3, 3);
     * // => true
     *
     * _.lte(3, 1);
     * // => false
     */var lte=createRelationalOperation(function(value,other){return value<=other;});/**
     * Converts `value` to an array.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {Array} Returns the converted array.
     * @example
     *
     * _.toArray({ 'a': 1, 'b': 2 });
     * // => [1, 2]
     *
     * _.toArray('abc');
     * // => ['a', 'b', 'c']
     *
     * _.toArray(1);
     * // => []
     *
     * _.toArray(null);
     * // => []
     */function toArray(value){if(!value){return[];}if(isArrayLike(value)){return isString(value)?stringToArray(value):copyArray(value);}if(symIterator&&value[symIterator]){return iteratorToArray(value[symIterator]());}var tag=getTag(value),func=tag==mapTag?mapToArray:tag==setTag?setToArray:values;return func(value);}/**
     * Converts `value` to a finite number.
     *
     * @static
     * @memberOf _
     * @since 4.12.0
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {number} Returns the converted number.
     * @example
     *
     * _.toFinite(3.2);
     * // => 3.2
     *
     * _.toFinite(Number.MIN_VALUE);
     * // => 5e-324
     *
     * _.toFinite(Infinity);
     * // => 1.7976931348623157e+308
     *
     * _.toFinite('3.2');
     * // => 3.2
     */function toFinite(value){if(!value){return value===0?value:0;}value=toNumber(value);if(value===INFINITY||value===-INFINITY){var sign=value<0?-1:1;return sign*MAX_INTEGER;}return value===value?value:0;}/**
     * Converts `value` to an integer.
     *
     * **Note:** This method is loosely based on
     * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {number} Returns the converted integer.
     * @example
     *
     * _.toInteger(3.2);
     * // => 3
     *
     * _.toInteger(Number.MIN_VALUE);
     * // => 0
     *
     * _.toInteger(Infinity);
     * // => 1.7976931348623157e+308
     *
     * _.toInteger('3.2');
     * // => 3
     */function toInteger(value){var result=toFinite(value),remainder=result%1;return result===result?remainder?result-remainder:result:0;}/**
     * Converts `value` to an integer suitable for use as the length of an
     * array-like object.
     *
     * **Note:** This method is based on
     * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {number} Returns the converted integer.
     * @example
     *
     * _.toLength(3.2);
     * // => 3
     *
     * _.toLength(Number.MIN_VALUE);
     * // => 0
     *
     * _.toLength(Infinity);
     * // => 4294967295
     *
     * _.toLength('3.2');
     * // => 3
     */function toLength(value){return value?baseClamp(toInteger(value),0,MAX_ARRAY_LENGTH):0;}/**
     * Converts `value` to a number.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to process.
     * @returns {number} Returns the number.
     * @example
     *
     * _.toNumber(3.2);
     * // => 3.2
     *
     * _.toNumber(Number.MIN_VALUE);
     * // => 5e-324
     *
     * _.toNumber(Infinity);
     * // => Infinity
     *
     * _.toNumber('3.2');
     * // => 3.2
     */function toNumber(value){if(typeof value=='number'){return value;}if(isSymbol(value)){return NAN;}if(isObject(value)){var other=typeof value.valueOf=='function'?value.valueOf():value;value=isObject(other)?other+'':other;}if(typeof value!='string'){return value===0?value:+value;}value=baseTrim(value);var isBinary=reIsBinary.test(value);return isBinary||reIsOctal.test(value)?freeParseInt(value.slice(2),isBinary?2:8):reIsBadHex.test(value)?NAN:+value;}/**
     * Converts `value` to a plain object flattening inherited enumerable string
     * keyed properties of `value` to own properties of the plain object.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {Object} Returns the converted plain object.
     * @example
     *
     * function Foo() {
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.assign({ 'a': 1 }, new Foo);
     * // => { 'a': 1, 'b': 2 }
     *
     * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
     * // => { 'a': 1, 'b': 2, 'c': 3 }
     */function toPlainObject(value){return copyObject(value,keysIn(value));}/**
     * Converts `value` to a safe integer. A safe integer can be compared and
     * represented correctly.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {number} Returns the converted integer.
     * @example
     *
     * _.toSafeInteger(3.2);
     * // => 3
     *
     * _.toSafeInteger(Number.MIN_VALUE);
     * // => 0
     *
     * _.toSafeInteger(Infinity);
     * // => 9007199254740991
     *
     * _.toSafeInteger('3.2');
     * // => 3
     */function toSafeInteger(value){return value?baseClamp(toInteger(value),-MAX_SAFE_INTEGER,MAX_SAFE_INTEGER):value===0?value:0;}/**
     * Converts `value` to a string. An empty string is returned for `null`
     * and `undefined` values. The sign of `-0` is preserved.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {string} Returns the converted string.
     * @example
     *
     * _.toString(null);
     * // => ''
     *
     * _.toString(-0);
     * // => '-0'
     *
     * _.toString([1, 2, 3]);
     * // => '1,2,3'
     */function toString(value){return value==null?'':baseToString(value);}/*------------------------------------------------------------------------*/ /**
     * Assigns own enumerable string keyed properties of source objects to the
     * destination object. Source objects are applied from left to right.
     * Subsequent sources overwrite property assignments of previous sources.
     *
     * **Note:** This method mutates `object` and is loosely based on
     * [`Object.assign`](https://mdn.io/Object/assign).
     *
     * @static
     * @memberOf _
     * @since 0.10.0
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} [sources] The source objects.
     * @returns {Object} Returns `object`.
     * @see _.assignIn
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     * }
     *
     * function Bar() {
     *   this.c = 3;
     * }
     *
     * Foo.prototype.b = 2;
     * Bar.prototype.d = 4;
     *
     * _.assign({ 'a': 0 }, new Foo, new Bar);
     * // => { 'a': 1, 'c': 3 }
     */var assign=createAssigner(function(object,source){if(isPrototype(source)||isArrayLike(source)){copyObject(source,keys(source),object);return;}for(var key in source){if(hasOwnProperty.call(source,key)){assignValue(object,key,source[key]);}}});/**
     * This method is like `_.assign` except that it iterates over own and
     * inherited source properties.
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @alias extend
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} [sources] The source objects.
     * @returns {Object} Returns `object`.
     * @see _.assign
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     * }
     *
     * function Bar() {
     *   this.c = 3;
     * }
     *
     * Foo.prototype.b = 2;
     * Bar.prototype.d = 4;
     *
     * _.assignIn({ 'a': 0 }, new Foo, new Bar);
     * // => { 'a': 1, 'b': 2, 'c': 3, 'd': 4 }
     */var assignIn=createAssigner(function(object,source){copyObject(source,keysIn(source),object);});/**
     * This method is like `_.assignIn` except that it accepts `customizer`
     * which is invoked to produce the assigned values. If `customizer` returns
     * `undefined`, assignment is handled by the method instead. The `customizer`
     * is invoked with five arguments: (objValue, srcValue, key, object, source).
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @alias extendWith
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} sources The source objects.
     * @param {Function} [customizer] The function to customize assigned values.
     * @returns {Object} Returns `object`.
     * @see _.assignWith
     * @example
     *
     * function customizer(objValue, srcValue) {
     *   return _.isUndefined(objValue) ? srcValue : objValue;
     * }
     *
     * var defaults = _.partialRight(_.assignInWith, customizer);
     *
     * defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
     * // => { 'a': 1, 'b': 2 }
     */var assignInWith=createAssigner(function(object,source,srcIndex,customizer){copyObject(source,keysIn(source),object,customizer);});/**
     * This method is like `_.assign` except that it accepts `customizer`
     * which is invoked to produce the assigned values. If `customizer` returns
     * `undefined`, assignment is handled by the method instead. The `customizer`
     * is invoked with five arguments: (objValue, srcValue, key, object, source).
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} sources The source objects.
     * @param {Function} [customizer] The function to customize assigned values.
     * @returns {Object} Returns `object`.
     * @see _.assignInWith
     * @example
     *
     * function customizer(objValue, srcValue) {
     *   return _.isUndefined(objValue) ? srcValue : objValue;
     * }
     *
     * var defaults = _.partialRight(_.assignWith, customizer);
     *
     * defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
     * // => { 'a': 1, 'b': 2 }
     */var assignWith=createAssigner(function(object,source,srcIndex,customizer){copyObject(source,keys(source),object,customizer);});/**
     * Creates an array of values corresponding to `paths` of `object`.
     *
     * @static
     * @memberOf _
     * @since 1.0.0
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {...(string|string[])} [paths] The property paths to pick.
     * @returns {Array} Returns the picked values.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': 3 } }, 4] };
     *
     * _.at(object, ['a[0].b.c', 'a[1]']);
     * // => [3, 4]
     */var at=flatRest(baseAt);/**
     * Creates an object that inherits from the `prototype` object. If a
     * `properties` object is given, its own enumerable string keyed properties
     * are assigned to the created object.
     *
     * @static
     * @memberOf _
     * @since 2.3.0
     * @category Object
     * @param {Object} prototype The object to inherit from.
     * @param {Object} [properties] The properties to assign to the object.
     * @returns {Object} Returns the new object.
     * @example
     *
     * function Shape() {
     *   this.x = 0;
     *   this.y = 0;
     * }
     *
     * function Circle() {
     *   Shape.call(this);
     * }
     *
     * Circle.prototype = _.create(Shape.prototype, {
     *   'constructor': Circle
     * });
     *
     * var circle = new Circle;
     * circle instanceof Circle;
     * // => true
     *
     * circle instanceof Shape;
     * // => true
     */function create(prototype,properties){var result=baseCreate(prototype);return properties==null?result:baseAssign(result,properties);}/**
     * Assigns own and inherited enumerable string keyed properties of source
     * objects to the destination object for all destination properties that
     * resolve to `undefined`. Source objects are applied from left to right.
     * Once a property is set, additional values of the same property are ignored.
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} [sources] The source objects.
     * @returns {Object} Returns `object`.
     * @see _.defaultsDeep
     * @example
     *
     * _.defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
     * // => { 'a': 1, 'b': 2 }
     */var defaults=baseRest(function(object,sources){object=Object(object);var index=-1;var length=sources.length;var guard=length>2?sources[2]:undefined;if(guard&&isIterateeCall(sources[0],sources[1],guard)){length=1;}while(++index<length){var source=sources[index];var props=keysIn(source);var propsIndex=-1;var propsLength=props.length;while(++propsIndex<propsLength){var key=props[propsIndex];var value=object[key];if(value===undefined||eq(value,objectProto[key])&&!hasOwnProperty.call(object,key)){object[key]=source[key];}}}return object;});/**
     * This method is like `_.defaults` except that it recursively assigns
     * default properties.
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 3.10.0
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} [sources] The source objects.
     * @returns {Object} Returns `object`.
     * @see _.defaults
     * @example
     *
     * _.defaultsDeep({ 'a': { 'b': 2 } }, { 'a': { 'b': 1, 'c': 3 } });
     * // => { 'a': { 'b': 2, 'c': 3 } }
     */var defaultsDeep=baseRest(function(args){args.push(undefined,customDefaultsMerge);return apply(mergeWith,undefined,args);});/**
     * This method is like `_.find` except that it returns the key of the first
     * element `predicate` returns truthy for instead of the element itself.
     *
     * @static
     * @memberOf _
     * @since 1.1.0
     * @category Object
     * @param {Object} object The object to inspect.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @returns {string|undefined} Returns the key of the matched element,
     *  else `undefined`.
     * @example
     *
     * var users = {
     *   'barney':  { 'age': 36, 'active': true },
     *   'fred':    { 'age': 40, 'active': false },
     *   'pebbles': { 'age': 1,  'active': true }
     * };
     *
     * _.findKey(users, function(o) { return o.age < 40; });
     * // => 'barney' (iteration order is not guaranteed)
     *
     * // The `_.matches` iteratee shorthand.
     * _.findKey(users, { 'age': 1, 'active': true });
     * // => 'pebbles'
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.findKey(users, ['active', false]);
     * // => 'fred'
     *
     * // The `_.property` iteratee shorthand.
     * _.findKey(users, 'active');
     * // => 'barney'
     */function findKey(object,predicate){return baseFindKey(object,getIteratee(predicate,3),baseForOwn);}/**
     * This method is like `_.findKey` except that it iterates over elements of
     * a collection in the opposite order.
     *
     * @static
     * @memberOf _
     * @since 2.0.0
     * @category Object
     * @param {Object} object The object to inspect.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @returns {string|undefined} Returns the key of the matched element,
     *  else `undefined`.
     * @example
     *
     * var users = {
     *   'barney':  { 'age': 36, 'active': true },
     *   'fred':    { 'age': 40, 'active': false },
     *   'pebbles': { 'age': 1,  'active': true }
     * };
     *
     * _.findLastKey(users, function(o) { return o.age < 40; });
     * // => returns 'pebbles' assuming `_.findKey` returns 'barney'
     *
     * // The `_.matches` iteratee shorthand.
     * _.findLastKey(users, { 'age': 36, 'active': true });
     * // => 'barney'
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.findLastKey(users, ['active', false]);
     * // => 'fred'
     *
     * // The `_.property` iteratee shorthand.
     * _.findLastKey(users, 'active');
     * // => 'pebbles'
     */function findLastKey(object,predicate){return baseFindKey(object,getIteratee(predicate,3),baseForOwnRight);}/**
     * Iterates over own and inherited enumerable string keyed properties of an
     * object and invokes `iteratee` for each property. The iteratee is invoked
     * with three arguments: (value, key, object). Iteratee functions may exit
     * iteration early by explicitly returning `false`.
     *
     * @static
     * @memberOf _
     * @since 0.3.0
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Object} Returns `object`.
     * @see _.forInRight
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.forIn(new Foo, function(value, key) {
     *   console.log(key);
     * });
     * // => Logs 'a', 'b', then 'c' (iteration order is not guaranteed).
     */function forIn(object,iteratee){return object==null?object:baseFor(object,getIteratee(iteratee,3),keysIn);}/**
     * This method is like `_.forIn` except that it iterates over properties of
     * `object` in the opposite order.
     *
     * @static
     * @memberOf _
     * @since 2.0.0
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Object} Returns `object`.
     * @see _.forIn
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.forInRight(new Foo, function(value, key) {
     *   console.log(key);
     * });
     * // => Logs 'c', 'b', then 'a' assuming `_.forIn` logs 'a', 'b', then 'c'.
     */function forInRight(object,iteratee){return object==null?object:baseForRight(object,getIteratee(iteratee,3),keysIn);}/**
     * Iterates over own enumerable string keyed properties of an object and
     * invokes `iteratee` for each property. The iteratee is invoked with three
     * arguments: (value, key, object). Iteratee functions may exit iteration
     * early by explicitly returning `false`.
     *
     * @static
     * @memberOf _
     * @since 0.3.0
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Object} Returns `object`.
     * @see _.forOwnRight
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.forOwn(new Foo, function(value, key) {
     *   console.log(key);
     * });
     * // => Logs 'a' then 'b' (iteration order is not guaranteed).
     */function forOwn(object,iteratee){return object&&baseForOwn(object,getIteratee(iteratee,3));}/**
     * This method is like `_.forOwn` except that it iterates over properties of
     * `object` in the opposite order.
     *
     * @static
     * @memberOf _
     * @since 2.0.0
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Object} Returns `object`.
     * @see _.forOwn
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.forOwnRight(new Foo, function(value, key) {
     *   console.log(key);
     * });
     * // => Logs 'b' then 'a' assuming `_.forOwn` logs 'a' then 'b'.
     */function forOwnRight(object,iteratee){return object&&baseForOwnRight(object,getIteratee(iteratee,3));}/**
     * Creates an array of function property names from own enumerable properties
     * of `object`.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The object to inspect.
     * @returns {Array} Returns the function names.
     * @see _.functionsIn
     * @example
     *
     * function Foo() {
     *   this.a = _.constant('a');
     *   this.b = _.constant('b');
     * }
     *
     * Foo.prototype.c = _.constant('c');
     *
     * _.functions(new Foo);
     * // => ['a', 'b']
     */function functions(object){return object==null?[]:baseFunctions(object,keys(object));}/**
     * Creates an array of function property names from own and inherited
     * enumerable properties of `object`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Object
     * @param {Object} object The object to inspect.
     * @returns {Array} Returns the function names.
     * @see _.functions
     * @example
     *
     * function Foo() {
     *   this.a = _.constant('a');
     *   this.b = _.constant('b');
     * }
     *
     * Foo.prototype.c = _.constant('c');
     *
     * _.functionsIn(new Foo);
     * // => ['a', 'b', 'c']
     */function functionsIn(object){return object==null?[]:baseFunctions(object,keysIn(object));}/**
     * Gets the value at `path` of `object`. If the resolved value is
     * `undefined`, the `defaultValue` is returned in its place.
     *
     * @static
     * @memberOf _
     * @since 3.7.0
     * @category Object
     * @param {Object} object The object to query.
     * @param {Array|string} path The path of the property to get.
     * @param {*} [defaultValue] The value returned for `undefined` resolved values.
     * @returns {*} Returns the resolved value.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': 3 } }] };
     *
     * _.get(object, 'a[0].b.c');
     * // => 3
     *
     * _.get(object, ['a', '0', 'b', 'c']);
     * // => 3
     *
     * _.get(object, 'a.b.c', 'default');
     * // => 'default'
     */function get(object,path,defaultValue){var result=object==null?undefined:baseGet(object,path);return result===undefined?defaultValue:result;}/**
     * Checks if `path` is a direct property of `object`.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @param {Array|string} path The path to check.
     * @returns {boolean} Returns `true` if `path` exists, else `false`.
     * @example
     *
     * var object = { 'a': { 'b': 2 } };
     * var other = _.create({ 'a': _.create({ 'b': 2 }) });
     *
     * _.has(object, 'a');
     * // => true
     *
     * _.has(object, 'a.b');
     * // => true
     *
     * _.has(object, ['a', 'b']);
     * // => true
     *
     * _.has(other, 'a');
     * // => false
     */function has(object,path){return object!=null&&hasPath(object,path,baseHas);}/**
     * Checks if `path` is a direct or inherited property of `object`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Object
     * @param {Object} object The object to query.
     * @param {Array|string} path The path to check.
     * @returns {boolean} Returns `true` if `path` exists, else `false`.
     * @example
     *
     * var object = _.create({ 'a': _.create({ 'b': 2 }) });
     *
     * _.hasIn(object, 'a');
     * // => true
     *
     * _.hasIn(object, 'a.b');
     * // => true
     *
     * _.hasIn(object, ['a', 'b']);
     * // => true
     *
     * _.hasIn(object, 'b');
     * // => false
     */function hasIn(object,path){return object!=null&&hasPath(object,path,baseHasIn);}/**
     * Creates an object composed of the inverted keys and values of `object`.
     * If `object` contains duplicate values, subsequent values overwrite
     * property assignments of previous values.
     *
     * @static
     * @memberOf _
     * @since 0.7.0
     * @category Object
     * @param {Object} object The object to invert.
     * @returns {Object} Returns the new inverted object.
     * @example
     *
     * var object = { 'a': 1, 'b': 2, 'c': 1 };
     *
     * _.invert(object);
     * // => { '1': 'c', '2': 'b' }
     */var invert=createInverter(function(result,value,key){if(value!=null&&typeof value.toString!='function'){value=nativeObjectToString.call(value);}result[value]=key;},constant(identity));/**
     * This method is like `_.invert` except that the inverted object is generated
     * from the results of running each element of `object` thru `iteratee`. The
     * corresponding inverted value of each inverted key is an array of keys
     * responsible for generating the inverted value. The iteratee is invoked
     * with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 4.1.0
     * @category Object
     * @param {Object} object The object to invert.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {Object} Returns the new inverted object.
     * @example
     *
     * var object = { 'a': 1, 'b': 2, 'c': 1 };
     *
     * _.invertBy(object);
     * // => { '1': ['a', 'c'], '2': ['b'] }
     *
     * _.invertBy(object, function(value) {
     *   return 'group' + value;
     * });
     * // => { 'group1': ['a', 'c'], 'group2': ['b'] }
     */var invertBy=createInverter(function(result,value,key){if(value!=null&&typeof value.toString!='function'){value=nativeObjectToString.call(value);}if(hasOwnProperty.call(result,value)){result[value].push(key);}else{result[value]=[key];}},getIteratee);/**
     * Invokes the method at `path` of `object`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Object
     * @param {Object} object The object to query.
     * @param {Array|string} path The path of the method to invoke.
     * @param {...*} [args] The arguments to invoke the method with.
     * @returns {*} Returns the result of the invoked method.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': [1, 2, 3, 4] } }] };
     *
     * _.invoke(object, 'a[0].b.c.slice', 1, 3);
     * // => [2, 3]
     */var invoke=baseRest(baseInvoke);/**
     * Creates an array of the own enumerable property names of `object`.
     *
     * **Note:** Non-object values are coerced to objects. See the
     * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
     * for more details.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.keys(new Foo);
     * // => ['a', 'b'] (iteration order is not guaranteed)
     *
     * _.keys('hi');
     * // => ['0', '1']
     */function keys(object){return isArrayLike(object)?arrayLikeKeys(object):baseKeys(object);}/**
     * Creates an array of the own and inherited enumerable property names of `object`.
     *
     * **Note:** Non-object values are coerced to objects.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.keysIn(new Foo);
     * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
     */function keysIn(object){return isArrayLike(object)?arrayLikeKeys(object,true):baseKeysIn(object);}/**
     * The opposite of `_.mapValues`; this method creates an object with the
     * same values as `object` and keys generated by running each own enumerable
     * string keyed property of `object` thru `iteratee`. The iteratee is invoked
     * with three arguments: (value, key, object).
     *
     * @static
     * @memberOf _
     * @since 3.8.0
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Object} Returns the new mapped object.
     * @see _.mapValues
     * @example
     *
     * _.mapKeys({ 'a': 1, 'b': 2 }, function(value, key) {
     *   return key + value;
     * });
     * // => { 'a1': 1, 'b2': 2 }
     */function mapKeys(object,iteratee){var result={};iteratee=getIteratee(iteratee,3);baseForOwn(object,function(value,key,object){baseAssignValue(result,iteratee(value,key,object),value);});return result;}/**
     * Creates an object with the same keys as `object` and values generated
     * by running each own enumerable string keyed property of `object` thru
     * `iteratee`. The iteratee is invoked with three arguments:
     * (value, key, object).
     *
     * @static
     * @memberOf _
     * @since 2.4.0
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Object} Returns the new mapped object.
     * @see _.mapKeys
     * @example
     *
     * var users = {
     *   'fred':    { 'user': 'fred',    'age': 40 },
     *   'pebbles': { 'user': 'pebbles', 'age': 1 }
     * };
     *
     * _.mapValues(users, function(o) { return o.age; });
     * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
     *
     * // The `_.property` iteratee shorthand.
     * _.mapValues(users, 'age');
     * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
     */function mapValues(object,iteratee){var result={};iteratee=getIteratee(iteratee,3);baseForOwn(object,function(value,key,object){baseAssignValue(result,key,iteratee(value,key,object));});return result;}/**
     * This method is like `_.assign` except that it recursively merges own and
     * inherited enumerable string keyed properties of source objects into the
     * destination object. Source properties that resolve to `undefined` are
     * skipped if a destination value exists. Array and plain object properties
     * are merged recursively. Other objects and value types are overridden by
     * assignment. Source objects are applied from left to right. Subsequent
     * sources overwrite property assignments of previous sources.
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 0.5.0
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} [sources] The source objects.
     * @returns {Object} Returns `object`.
     * @example
     *
     * var object = {
     *   'a': [{ 'b': 2 }, { 'd': 4 }]
     * };
     *
     * var other = {
     *   'a': [{ 'c': 3 }, { 'e': 5 }]
     * };
     *
     * _.merge(object, other);
     * // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
     */var merge=createAssigner(function(object,source,srcIndex){baseMerge(object,source,srcIndex);});/**
     * This method is like `_.merge` except that it accepts `customizer` which
     * is invoked to produce the merged values of the destination and source
     * properties. If `customizer` returns `undefined`, merging is handled by the
     * method instead. The `customizer` is invoked with six arguments:
     * (objValue, srcValue, key, object, source, stack).
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} sources The source objects.
     * @param {Function} customizer The function to customize assigned values.
     * @returns {Object} Returns `object`.
     * @example
     *
     * function customizer(objValue, srcValue) {
     *   if (_.isArray(objValue)) {
     *     return objValue.concat(srcValue);
     *   }
     * }
     *
     * var object = { 'a': [1], 'b': [2] };
     * var other = { 'a': [3], 'b': [4] };
     *
     * _.mergeWith(object, other, customizer);
     * // => { 'a': [1, 3], 'b': [2, 4] }
     */var mergeWith=createAssigner(function(object,source,srcIndex,customizer){baseMerge(object,source,srcIndex,customizer);});/**
     * The opposite of `_.pick`; this method creates an object composed of the
     * own and inherited enumerable property paths of `object` that are not omitted.
     *
     * **Note:** This method is considerably slower than `_.pick`.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The source object.
     * @param {...(string|string[])} [paths] The property paths to omit.
     * @returns {Object} Returns the new object.
     * @example
     *
     * var object = { 'a': 1, 'b': '2', 'c': 3 };
     *
     * _.omit(object, ['a', 'c']);
     * // => { 'b': '2' }
     */var omit=flatRest(function(object,paths){var result={};if(object==null){return result;}var isDeep=false;paths=arrayMap(paths,function(path){path=castPath(path,object);isDeep||(isDeep=path.length>1);return path;});copyObject(object,getAllKeysIn(object),result);if(isDeep){result=baseClone(result,CLONE_DEEP_FLAG|CLONE_FLAT_FLAG|CLONE_SYMBOLS_FLAG,customOmitClone);}var length=paths.length;while(length--){baseUnset(result,paths[length]);}return result;});/**
     * The opposite of `_.pickBy`; this method creates an object composed of
     * the own and inherited enumerable string keyed properties of `object` that
     * `predicate` doesn't return truthy for. The predicate is invoked with two
     * arguments: (value, key).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Object
     * @param {Object} object The source object.
     * @param {Function} [predicate=_.identity] The function invoked per property.
     * @returns {Object} Returns the new object.
     * @example
     *
     * var object = { 'a': 1, 'b': '2', 'c': 3 };
     *
     * _.omitBy(object, _.isNumber);
     * // => { 'b': '2' }
     */function omitBy(object,predicate){return pickBy(object,negate(getIteratee(predicate)));}/**
     * Creates an object composed of the picked `object` properties.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The source object.
     * @param {...(string|string[])} [paths] The property paths to pick.
     * @returns {Object} Returns the new object.
     * @example
     *
     * var object = { 'a': 1, 'b': '2', 'c': 3 };
     *
     * _.pick(object, ['a', 'c']);
     * // => { 'a': 1, 'c': 3 }
     */var pick=flatRest(function(object,paths){return object==null?{}:basePick(object,paths);});/**
     * Creates an object composed of the `object` properties `predicate` returns
     * truthy for. The predicate is invoked with two arguments: (value, key).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Object
     * @param {Object} object The source object.
     * @param {Function} [predicate=_.identity] The function invoked per property.
     * @returns {Object} Returns the new object.
     * @example
     *
     * var object = { 'a': 1, 'b': '2', 'c': 3 };
     *
     * _.pickBy(object, _.isNumber);
     * // => { 'a': 1, 'c': 3 }
     */function pickBy(object,predicate){if(object==null){return{};}var props=arrayMap(getAllKeysIn(object),function(prop){return[prop];});predicate=getIteratee(predicate);return basePickBy(object,props,function(value,path){return predicate(value,path[0]);});}/**
     * This method is like `_.get` except that if the resolved value is a
     * function it's invoked with the `this` binding of its parent object and
     * its result is returned.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @param {Array|string} path The path of the property to resolve.
     * @param {*} [defaultValue] The value returned for `undefined` resolved values.
     * @returns {*} Returns the resolved value.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c1': 3, 'c2': _.constant(4) } }] };
     *
     * _.result(object, 'a[0].b.c1');
     * // => 3
     *
     * _.result(object, 'a[0].b.c2');
     * // => 4
     *
     * _.result(object, 'a[0].b.c3', 'default');
     * // => 'default'
     *
     * _.result(object, 'a[0].b.c3', _.constant('default'));
     * // => 'default'
     */function result(object,path,defaultValue){path=castPath(path,object);var index=-1,length=path.length;// Ensure the loop is entered when path is empty.
if(!length){length=1;object=undefined;}while(++index<length){var value=object==null?undefined:object[toKey(path[index])];if(value===undefined){index=length;value=defaultValue;}object=isFunction(value)?value.call(object):value;}return object;}/**
     * Sets the value at `path` of `object`. If a portion of `path` doesn't exist,
     * it's created. Arrays are created for missing index properties while objects
     * are created for all other missing properties. Use `_.setWith` to customize
     * `path` creation.
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 3.7.0
     * @category Object
     * @param {Object} object The object to modify.
     * @param {Array|string} path The path of the property to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns `object`.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': 3 } }] };
     *
     * _.set(object, 'a[0].b.c', 4);
     * console.log(object.a[0].b.c);
     * // => 4
     *
     * _.set(object, ['x', '0', 'y', 'z'], 5);
     * console.log(object.x[0].y.z);
     * // => 5
     */function set(object,path,value){return object==null?object:baseSet(object,path,value);}/**
     * This method is like `_.set` except that it accepts `customizer` which is
     * invoked to produce the objects of `path`.  If `customizer` returns `undefined`
     * path creation is handled by the method instead. The `customizer` is invoked
     * with three arguments: (nsValue, key, nsObject).
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Object
     * @param {Object} object The object to modify.
     * @param {Array|string} path The path of the property to set.
     * @param {*} value The value to set.
     * @param {Function} [customizer] The function to customize assigned values.
     * @returns {Object} Returns `object`.
     * @example
     *
     * var object = {};
     *
     * _.setWith(object, '[0][1]', 'a', Object);
     * // => { '0': { '1': 'a' } }
     */function setWith(object,path,value,customizer){customizer=typeof customizer=='function'?customizer:undefined;return object==null?object:baseSet(object,path,value,customizer);}/**
     * Creates an array of own enumerable string keyed-value pairs for `object`
     * which can be consumed by `_.fromPairs`. If `object` is a map or set, its
     * entries are returned.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @alias entries
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the key-value pairs.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.toPairs(new Foo);
     * // => [['a', 1], ['b', 2]] (iteration order is not guaranteed)
     */var toPairs=createToPairs(keys);/**
     * Creates an array of own and inherited enumerable string keyed-value pairs
     * for `object` which can be consumed by `_.fromPairs`. If `object` is a map
     * or set, its entries are returned.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @alias entriesIn
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the key-value pairs.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.toPairsIn(new Foo);
     * // => [['a', 1], ['b', 2], ['c', 3]] (iteration order is not guaranteed)
     */var toPairsIn=createToPairs(keysIn);/**
     * An alternative to `_.reduce`; this method transforms `object` to a new
     * `accumulator` object which is the result of running each of its own
     * enumerable string keyed properties thru `iteratee`, with each invocation
     * potentially mutating the `accumulator` object. If `accumulator` is not
     * provided, a new object with the same `[[Prototype]]` will be used. The
     * iteratee is invoked with four arguments: (accumulator, value, key, object).
     * Iteratee functions may exit iteration early by explicitly returning `false`.
     *
     * @static
     * @memberOf _
     * @since 1.3.0
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @param {*} [accumulator] The custom accumulator value.
     * @returns {*} Returns the accumulated value.
     * @example
     *
     * _.transform([2, 3, 4], function(result, n) {
     *   result.push(n *= n);
     *   return n % 2 == 0;
     * }, []);
     * // => [4, 9]
     *
     * _.transform({ 'a': 1, 'b': 2, 'c': 1 }, function(result, value, key) {
     *   (result[value] || (result[value] = [])).push(key);
     * }, {});
     * // => { '1': ['a', 'c'], '2': ['b'] }
     */function transform(object,iteratee,accumulator){var isArr=isArray(object),isArrLike=isArr||isBuffer(object)||isTypedArray(object);iteratee=getIteratee(iteratee,4);if(accumulator==null){var Ctor=object&&object.constructor;if(isArrLike){accumulator=isArr?new Ctor():[];}else if(isObject(object)){accumulator=isFunction(Ctor)?baseCreate(getPrototype(object)):{};}else{accumulator={};}}(isArrLike?arrayEach:baseForOwn)(object,function(value,index,object){return iteratee(accumulator,value,index,object);});return accumulator;}/**
     * Removes the property at `path` of `object`.
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Object
     * @param {Object} object The object to modify.
     * @param {Array|string} path The path of the property to unset.
     * @returns {boolean} Returns `true` if the property is deleted, else `false`.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': 7 } }] };
     * _.unset(object, 'a[0].b.c');
     * // => true
     *
     * console.log(object);
     * // => { 'a': [{ 'b': {} }] };
     *
     * _.unset(object, ['a', '0', 'b', 'c']);
     * // => true
     *
     * console.log(object);
     * // => { 'a': [{ 'b': {} }] };
     */function unset(object,path){return object==null?true:baseUnset(object,path);}/**
     * This method is like `_.set` except that accepts `updater` to produce the
     * value to set. Use `_.updateWith` to customize `path` creation. The `updater`
     * is invoked with one argument: (value).
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 4.6.0
     * @category Object
     * @param {Object} object The object to modify.
     * @param {Array|string} path The path of the property to set.
     * @param {Function} updater The function to produce the updated value.
     * @returns {Object} Returns `object`.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': 3 } }] };
     *
     * _.update(object, 'a[0].b.c', function(n) { return n * n; });
     * console.log(object.a[0].b.c);
     * // => 9
     *
     * _.update(object, 'x[0].y.z', function(n) { return n ? n + 1 : 0; });
     * console.log(object.x[0].y.z);
     * // => 0
     */function update(object,path,updater){return object==null?object:baseUpdate(object,path,castFunction(updater));}/**
     * This method is like `_.update` except that it accepts `customizer` which is
     * invoked to produce the objects of `path`.  If `customizer` returns `undefined`
     * path creation is handled by the method instead. The `customizer` is invoked
     * with three arguments: (nsValue, key, nsObject).
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 4.6.0
     * @category Object
     * @param {Object} object The object to modify.
     * @param {Array|string} path The path of the property to set.
     * @param {Function} updater The function to produce the updated value.
     * @param {Function} [customizer] The function to customize assigned values.
     * @returns {Object} Returns `object`.
     * @example
     *
     * var object = {};
     *
     * _.updateWith(object, '[0][1]', _.constant('a'), Object);
     * // => { '0': { '1': 'a' } }
     */function updateWith(object,path,updater,customizer){customizer=typeof customizer=='function'?customizer:undefined;return object==null?object:baseUpdate(object,path,castFunction(updater),customizer);}/**
     * Creates an array of the own enumerable string keyed property values of `object`.
     *
     * **Note:** Non-object values are coerced to objects.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property values.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.values(new Foo);
     * // => [1, 2] (iteration order is not guaranteed)
     *
     * _.values('hi');
     * // => ['h', 'i']
     */function values(object){return object==null?[]:baseValues(object,keys(object));}/**
     * Creates an array of the own and inherited enumerable string keyed property
     * values of `object`.
     *
     * **Note:** Non-object values are coerced to objects.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property values.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.valuesIn(new Foo);
     * // => [1, 2, 3] (iteration order is not guaranteed)
     */function valuesIn(object){return object==null?[]:baseValues(object,keysIn(object));}/*------------------------------------------------------------------------*/ /**
     * Clamps `number` within the inclusive `lower` and `upper` bounds.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Number
     * @param {number} number The number to clamp.
     * @param {number} [lower] The lower bound.
     * @param {number} upper The upper bound.
     * @returns {number} Returns the clamped number.
     * @example
     *
     * _.clamp(-10, -5, 5);
     * // => -5
     *
     * _.clamp(10, -5, 5);
     * // => 5
     */function clamp(number,lower,upper){if(upper===undefined){upper=lower;lower=undefined;}if(upper!==undefined){upper=toNumber(upper);upper=upper===upper?upper:0;}if(lower!==undefined){lower=toNumber(lower);lower=lower===lower?lower:0;}return baseClamp(toNumber(number),lower,upper);}/**
     * Checks if `n` is between `start` and up to, but not including, `end`. If
     * `end` is not specified, it's set to `start` with `start` then set to `0`.
     * If `start` is greater than `end` the params are swapped to support
     * negative ranges.
     *
     * @static
     * @memberOf _
     * @since 3.3.0
     * @category Number
     * @param {number} number The number to check.
     * @param {number} [start=0] The start of the range.
     * @param {number} end The end of the range.
     * @returns {boolean} Returns `true` if `number` is in the range, else `false`.
     * @see _.range, _.rangeRight
     * @example
     *
     * _.inRange(3, 2, 4);
     * // => true
     *
     * _.inRange(4, 8);
     * // => true
     *
     * _.inRange(4, 2);
     * // => false
     *
     * _.inRange(2, 2);
     * // => false
     *
     * _.inRange(1.2, 2);
     * // => true
     *
     * _.inRange(5.2, 4);
     * // => false
     *
     * _.inRange(-3, -2, -6);
     * // => true
     */function inRange(number,start,end){start=toFinite(start);if(end===undefined){end=start;start=0;}else{end=toFinite(end);}number=toNumber(number);return baseInRange(number,start,end);}/**
     * Produces a random number between the inclusive `lower` and `upper` bounds.
     * If only one argument is provided a number between `0` and the given number
     * is returned. If `floating` is `true`, or either `lower` or `upper` are
     * floats, a floating-point number is returned instead of an integer.
     *
     * **Note:** JavaScript follows the IEEE-754 standard for resolving
     * floating-point values which can produce unexpected results.
     *
     * @static
     * @memberOf _
     * @since 0.7.0
     * @category Number
     * @param {number} [lower=0] The lower bound.
     * @param {number} [upper=1] The upper bound.
     * @param {boolean} [floating] Specify returning a floating-point number.
     * @returns {number} Returns the random number.
     * @example
     *
     * _.random(0, 5);
     * // => an integer between 0 and 5
     *
     * _.random(5);
     * // => also an integer between 0 and 5
     *
     * _.random(5, true);
     * // => a floating-point number between 0 and 5
     *
     * _.random(1.2, 5.2);
     * // => a floating-point number between 1.2 and 5.2
     */function random(lower,upper,floating){if(floating&&typeof floating!='boolean'&&isIterateeCall(lower,upper,floating)){upper=floating=undefined;}if(floating===undefined){if(typeof upper=='boolean'){floating=upper;upper=undefined;}else if(typeof lower=='boolean'){floating=lower;lower=undefined;}}if(lower===undefined&&upper===undefined){lower=0;upper=1;}else{lower=toFinite(lower);if(upper===undefined){upper=lower;lower=0;}else{upper=toFinite(upper);}}if(lower>upper){var temp=lower;lower=upper;upper=temp;}if(floating||lower%1||upper%1){var rand=nativeRandom();return nativeMin(lower+rand*(upper-lower+freeParseFloat('1e-'+((rand+'').length-1))),upper);}return baseRandom(lower,upper);}/*------------------------------------------------------------------------*/ /**
     * Converts `string` to [camel case](https://en.wikipedia.org/wiki/CamelCase).
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the camel cased string.
     * @example
     *
     * _.camelCase('Foo Bar');
     * // => 'fooBar'
     *
     * _.camelCase('--foo-bar--');
     * // => 'fooBar'
     *
     * _.camelCase('__FOO_BAR__');
     * // => 'fooBar'
     */var camelCase=createCompounder(function(result,word,index){word=word.toLowerCase();return result+(index?capitalize(word):word);});/**
     * Converts the first character of `string` to upper case and the remaining
     * to lower case.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to capitalize.
     * @returns {string} Returns the capitalized string.
     * @example
     *
     * _.capitalize('FRED');
     * // => 'Fred'
     */function capitalize(string){return upperFirst(toString(string).toLowerCase());}/**
     * Deburrs `string` by converting
     * [Latin-1 Supplement](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
     * and [Latin Extended-A](https://en.wikipedia.org/wiki/Latin_Extended-A)
     * letters to basic Latin letters and removing
     * [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to deburr.
     * @returns {string} Returns the deburred string.
     * @example
     *
     * _.deburr('déjà vu');
     * // => 'deja vu'
     */function deburr(string){string=toString(string);return string&&string.replace(reLatin,deburrLetter).replace(reComboMark,'');}/**
     * Checks if `string` ends with the given target string.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to inspect.
     * @param {string} [target] The string to search for.
     * @param {number} [position=string.length] The position to search up to.
     * @returns {boolean} Returns `true` if `string` ends with `target`,
     *  else `false`.
     * @example
     *
     * _.endsWith('abc', 'c');
     * // => true
     *
     * _.endsWith('abc', 'b');
     * // => false
     *
     * _.endsWith('abc', 'b', 2);
     * // => true
     */function endsWith(string,target,position){string=toString(string);target=baseToString(target);var length=string.length;position=position===undefined?length:baseClamp(toInteger(position),0,length);var end=position;position-=target.length;return position>=0&&string.slice(position,end)==target;}/**
     * Converts the characters "&", "<", ">", '"', and "'" in `string` to their
     * corresponding HTML entities.
     *
     * **Note:** No other characters are escaped. To escape additional
     * characters use a third-party library like [_he_](https://mths.be/he).
     *
     * Though the ">" character is escaped for symmetry, characters like
     * ">" and "/" don't need escaping in HTML and have no special meaning
     * unless they're part of a tag or unquoted attribute value. See
     * [Mathias Bynens's article](https://mathiasbynens.be/notes/ambiguous-ampersands)
     * (under "semi-related fun fact") for more details.
     *
     * When working with HTML you should always
     * [quote attribute values](http://wonko.com/post/html-escaping) to reduce
     * XSS vectors.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to escape.
     * @returns {string} Returns the escaped string.
     * @example
     *
     * _.escape('fred, barney, & pebbles');
     * // => 'fred, barney, &amp; pebbles'
     */function escape(string){string=toString(string);return string&&reHasUnescapedHtml.test(string)?string.replace(reUnescapedHtml,escapeHtmlChar):string;}/**
     * Escapes the `RegExp` special characters "^", "$", "\", ".", "*", "+",
     * "?", "(", ")", "[", "]", "{", "}", and "|" in `string`.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to escape.
     * @returns {string} Returns the escaped string.
     * @example
     *
     * _.escapeRegExp('[lodash](https://lodash.com/)');
     * // => '\[lodash\]\(https://lodash\.com/\)'
     */function escapeRegExp(string){string=toString(string);return string&&reHasRegExpChar.test(string)?string.replace(reRegExpChar,'\\$&'):string;}/**
     * Converts `string` to
     * [kebab case](https://en.wikipedia.org/wiki/Letter_case#Special_case_styles).
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the kebab cased string.
     * @example
     *
     * _.kebabCase('Foo Bar');
     * // => 'foo-bar'
     *
     * _.kebabCase('fooBar');
     * // => 'foo-bar'
     *
     * _.kebabCase('__FOO_BAR__');
     * // => 'foo-bar'
     */var kebabCase=createCompounder(function(result,word,index){return result+(index?'-':'')+word.toLowerCase();});/**
     * Converts `string`, as space separated words, to lower case.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the lower cased string.
     * @example
     *
     * _.lowerCase('--Foo-Bar--');
     * // => 'foo bar'
     *
     * _.lowerCase('fooBar');
     * // => 'foo bar'
     *
     * _.lowerCase('__FOO_BAR__');
     * // => 'foo bar'
     */var lowerCase=createCompounder(function(result,word,index){return result+(index?' ':'')+word.toLowerCase();});/**
     * Converts the first character of `string` to lower case.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the converted string.
     * @example
     *
     * _.lowerFirst('Fred');
     * // => 'fred'
     *
     * _.lowerFirst('FRED');
     * // => 'fRED'
     */var lowerFirst=createCaseFirst('toLowerCase');/**
     * Pads `string` on the left and right sides if it's shorter than `length`.
     * Padding characters are truncated if they can't be evenly divided by `length`.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to pad.
     * @param {number} [length=0] The padding length.
     * @param {string} [chars=' '] The string used as padding.
     * @returns {string} Returns the padded string.
     * @example
     *
     * _.pad('abc', 8);
     * // => '  abc   '
     *
     * _.pad('abc', 8, '_-');
     * // => '_-abc_-_'
     *
     * _.pad('abc', 3);
     * // => 'abc'
     */function pad(string,length,chars){string=toString(string);length=toInteger(length);var strLength=length?stringSize(string):0;if(!length||strLength>=length){return string;}var mid=(length-strLength)/2;return createPadding(nativeFloor(mid),chars)+string+createPadding(nativeCeil(mid),chars);}/**
     * Pads `string` on the right side if it's shorter than `length`. Padding
     * characters are truncated if they exceed `length`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to pad.
     * @param {number} [length=0] The padding length.
     * @param {string} [chars=' '] The string used as padding.
     * @returns {string} Returns the padded string.
     * @example
     *
     * _.padEnd('abc', 6);
     * // => 'abc   '
     *
     * _.padEnd('abc', 6, '_-');
     * // => 'abc_-_'
     *
     * _.padEnd('abc', 3);
     * // => 'abc'
     */function padEnd(string,length,chars){string=toString(string);length=toInteger(length);var strLength=length?stringSize(string):0;return length&&strLength<length?string+createPadding(length-strLength,chars):string;}/**
     * Pads `string` on the left side if it's shorter than `length`. Padding
     * characters are truncated if they exceed `length`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to pad.
     * @param {number} [length=0] The padding length.
     * @param {string} [chars=' '] The string used as padding.
     * @returns {string} Returns the padded string.
     * @example
     *
     * _.padStart('abc', 6);
     * // => '   abc'
     *
     * _.padStart('abc', 6, '_-');
     * // => '_-_abc'
     *
     * _.padStart('abc', 3);
     * // => 'abc'
     */function padStart(string,length,chars){string=toString(string);length=toInteger(length);var strLength=length?stringSize(string):0;return length&&strLength<length?createPadding(length-strLength,chars)+string:string;}/**
     * Converts `string` to an integer of the specified radix. If `radix` is
     * `undefined` or `0`, a `radix` of `10` is used unless `value` is a
     * hexadecimal, in which case a `radix` of `16` is used.
     *
     * **Note:** This method aligns with the
     * [ES5 implementation](https://es5.github.io/#x15.1.2.2) of `parseInt`.
     *
     * @static
     * @memberOf _
     * @since 1.1.0
     * @category String
     * @param {string} string The string to convert.
     * @param {number} [radix=10] The radix to interpret `value` by.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {number} Returns the converted integer.
     * @example
     *
     * _.parseInt('08');
     * // => 8
     *
     * _.map(['6', '08', '10'], _.parseInt);
     * // => [6, 8, 10]
     */function parseInt(string,radix,guard){if(guard||radix==null){radix=0;}else if(radix){radix=+radix;}return nativeParseInt(toString(string).replace(reTrimStart,''),radix||0);}/**
     * Repeats the given string `n` times.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to repeat.
     * @param {number} [n=1] The number of times to repeat the string.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {string} Returns the repeated string.
     * @example
     *
     * _.repeat('*', 3);
     * // => '***'
     *
     * _.repeat('abc', 2);
     * // => 'abcabc'
     *
     * _.repeat('abc', 0);
     * // => ''
     */function repeat(string,n,guard){if(guard?isIterateeCall(string,n,guard):n===undefined){n=1;}else{n=toInteger(n);}return baseRepeat(toString(string),n);}/**
     * Replaces matches for `pattern` in `string` with `replacement`.
     *
     * **Note:** This method is based on
     * [`String#replace`](https://mdn.io/String/replace).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to modify.
     * @param {RegExp|string} pattern The pattern to replace.
     * @param {Function|string} replacement The match replacement.
     * @returns {string} Returns the modified string.
     * @example
     *
     * _.replace('Hi Fred', 'Fred', 'Barney');
     * // => 'Hi Barney'
     */function replace(){var args=arguments,string=toString(args[0]);return args.length<3?string:string.replace(args[1],args[2]);}/**
     * Converts `string` to
     * [snake case](https://en.wikipedia.org/wiki/Snake_case).
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the snake cased string.
     * @example
     *
     * _.snakeCase('Foo Bar');
     * // => 'foo_bar'
     *
     * _.snakeCase('fooBar');
     * // => 'foo_bar'
     *
     * _.snakeCase('--FOO-BAR--');
     * // => 'foo_bar'
     */var snakeCase=createCompounder(function(result,word,index){return result+(index?'_':'')+word.toLowerCase();});/**
     * Splits `string` by `separator`.
     *
     * **Note:** This method is based on
     * [`String#split`](https://mdn.io/String/split).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to split.
     * @param {RegExp|string} separator The separator pattern to split by.
     * @param {number} [limit] The length to truncate results to.
     * @returns {Array} Returns the string segments.
     * @example
     *
     * _.split('a-b-c', '-', 2);
     * // => ['a', 'b']
     */function split(string,separator,limit){if(limit&&typeof limit!='number'&&isIterateeCall(string,separator,limit)){separator=limit=undefined;}limit=limit===undefined?MAX_ARRAY_LENGTH:limit>>>0;if(!limit){return[];}string=toString(string);if(string&&(typeof separator=='string'||separator!=null&&!isRegExp(separator))){separator=baseToString(separator);if(!separator&&hasUnicode(string)){return castSlice(stringToArray(string),0,limit);}}return string.split(separator,limit);}/**
     * Converts `string` to
     * [start case](https://en.wikipedia.org/wiki/Letter_case#Stylistic_or_specialised_usage).
     *
     * @static
     * @memberOf _
     * @since 3.1.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the start cased string.
     * @example
     *
     * _.startCase('--foo-bar--');
     * // => 'Foo Bar'
     *
     * _.startCase('fooBar');
     * // => 'Foo Bar'
     *
     * _.startCase('__FOO_BAR__');
     * // => 'FOO BAR'
     */var startCase=createCompounder(function(result,word,index){return result+(index?' ':'')+upperFirst(word);});/**
     * Checks if `string` starts with the given target string.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to inspect.
     * @param {string} [target] The string to search for.
     * @param {number} [position=0] The position to search from.
     * @returns {boolean} Returns `true` if `string` starts with `target`,
     *  else `false`.
     * @example
     *
     * _.startsWith('abc', 'a');
     * // => true
     *
     * _.startsWith('abc', 'b');
     * // => false
     *
     * _.startsWith('abc', 'b', 1);
     * // => true
     */function startsWith(string,target,position){string=toString(string);position=position==null?0:baseClamp(toInteger(position),0,string.length);target=baseToString(target);return string.slice(position,position+target.length)==target;}/**
     * Creates a compiled template function that can interpolate data properties
     * in "interpolate" delimiters, HTML-escape interpolated data properties in
     * "escape" delimiters, and execute JavaScript in "evaluate" delimiters. Data
     * properties may be accessed as free variables in the template. If a setting
     * object is given, it takes precedence over `_.templateSettings` values.
     *
     * **Note:** In the development build `_.template` utilizes
     * [sourceURLs](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl)
     * for easier debugging.
     *
     * For more information on precompiling templates see
     * [lodash's custom builds documentation](https://lodash.com/custom-builds).
     *
     * For more information on Chrome extension sandboxes see
     * [Chrome's extensions documentation](https://developer.chrome.com/extensions/sandboxingEval).
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category String
     * @param {string} [string=''] The template string.
     * @param {Object} [options={}] The options object.
     * @param {RegExp} [options.escape=_.templateSettings.escape]
     *  The HTML "escape" delimiter.
     * @param {RegExp} [options.evaluate=_.templateSettings.evaluate]
     *  The "evaluate" delimiter.
     * @param {Object} [options.imports=_.templateSettings.imports]
     *  An object to import into the template as free variables.
     * @param {RegExp} [options.interpolate=_.templateSettings.interpolate]
     *  The "interpolate" delimiter.
     * @param {string} [options.sourceURL='lodash.templateSources[n]']
     *  The sourceURL of the compiled template.
     * @param {string} [options.variable='obj']
     *  The data object variable name.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Function} Returns the compiled template function.
     * @example
     *
     * // Use the "interpolate" delimiter to create a compiled template.
     * var compiled = _.template('hello <%= user %>!');
     * compiled({ 'user': 'fred' });
     * // => 'hello fred!'
     *
     * // Use the HTML "escape" delimiter to escape data property values.
     * var compiled = _.template('<b><%- value %></b>');
     * compiled({ 'value': '<script>' });
     * // => '<b>&lt;script&gt;</b>'
     *
     * // Use the "evaluate" delimiter to execute JavaScript and generate HTML.
     * var compiled = _.template('<% _.forEach(users, function(user) { %><li><%- user %></li><% }); %>');
     * compiled({ 'users': ['fred', 'barney'] });
     * // => '<li>fred</li><li>barney</li>'
     *
     * // Use the internal `print` function in "evaluate" delimiters.
     * var compiled = _.template('<% print("hello " + user); %>!');
     * compiled({ 'user': 'barney' });
     * // => 'hello barney!'
     *
     * // Use the ES template literal delimiter as an "interpolate" delimiter.
     * // Disable support by replacing the "interpolate" delimiter.
     * var compiled = _.template('hello ${ user }!');
     * compiled({ 'user': 'pebbles' });
     * // => 'hello pebbles!'
     *
     * // Use backslashes to treat delimiters as plain text.
     * var compiled = _.template('<%= "\\<%- value %\\>" %>');
     * compiled({ 'value': 'ignored' });
     * // => '<%- value %>'
     *
     * // Use the `imports` option to import `jQuery` as `jq`.
     * var text = '<% jq.each(users, function(user) { %><li><%- user %></li><% }); %>';
     * var compiled = _.template(text, { 'imports': { 'jq': jQuery } });
     * compiled({ 'users': ['fred', 'barney'] });
     * // => '<li>fred</li><li>barney</li>'
     *
     * // Use the `sourceURL` option to specify a custom sourceURL for the template.
     * var compiled = _.template('hello <%= user %>!', { 'sourceURL': '/basic/greeting.jst' });
     * compiled(data);
     * // => Find the source of "greeting.jst" under the Sources tab or Resources panel of the web inspector.
     *
     * // Use the `variable` option to ensure a with-statement isn't used in the compiled template.
     * var compiled = _.template('hi <%= data.user %>!', { 'variable': 'data' });
     * compiled.source;
     * // => function(data) {
     * //   var __t, __p = '';
     * //   __p += 'hi ' + ((__t = ( data.user )) == null ? '' : __t) + '!';
     * //   return __p;
     * // }
     *
     * // Use custom template delimiters.
     * _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
     * var compiled = _.template('hello {{ user }}!');
     * compiled({ 'user': 'mustache' });
     * // => 'hello mustache!'
     *
     * // Use the `source` property to inline compiled templates for meaningful
     * // line numbers in error messages and stack traces.
     * fs.writeFileSync(path.join(process.cwd(), 'jst.js'), '\
     *   var JST = {\
     *     "main": ' + _.template(mainText).source + '\
     *   };\
     * ');
     */function template(string,options,guard){// Based on John Resig's `tmpl` implementation
// (http://ejohn.org/blog/javascript-micro-templating/)
// and Laura Doktorova's doT.js (https://github.com/olado/doT).
var settings=lodash.templateSettings;if(guard&&isIterateeCall(string,options,guard)){options=undefined;}string=toString(string);options=assignInWith({},options,settings,customDefaultsAssignIn);var imports=assignInWith({},options.imports,settings.imports,customDefaultsAssignIn),importsKeys=keys(imports),importsValues=baseValues(imports,importsKeys);var isEscaping,isEvaluating,index=0,interpolate=options.interpolate||reNoMatch,source="__p += '";// Compile the regexp to match each delimiter.
var reDelimiters=RegExp((options.escape||reNoMatch).source+'|'+interpolate.source+'|'+(interpolate===reInterpolate?reEsTemplate:reNoMatch).source+'|'+(options.evaluate||reNoMatch).source+'|$','g');// Use a sourceURL for easier debugging.
// The sourceURL gets injected into the source that's eval-ed, so be careful
// to normalize all kinds of whitespace, so e.g. newlines (and unicode versions of it) can't sneak in
// and escape the comment, thus injecting code that gets evaled.
var sourceURL='//# sourceURL='+(hasOwnProperty.call(options,'sourceURL')?(options.sourceURL+'').replace(/\s/g,' '):'lodash.templateSources['+ ++templateCounter+']')+'\n';string.replace(reDelimiters,function(match,escapeValue,interpolateValue,esTemplateValue,evaluateValue,offset){interpolateValue||(interpolateValue=esTemplateValue);// Escape characters that can't be included in string literals.
source+=string.slice(index,offset).replace(reUnescapedString,escapeStringChar);// Replace delimiters with snippets.
if(escapeValue){isEscaping=true;source+="' +\n__e("+escapeValue+") +\n'";}if(evaluateValue){isEvaluating=true;source+="';\n"+evaluateValue+";\n__p += '";}if(interpolateValue){source+="' +\n((__t = ("+interpolateValue+")) == null ? '' : __t) +\n'";}index=offset+match.length;// The JS engine embedded in Adobe products needs `match` returned in
// order to produce the correct `offset` value.
return match;});source+="';\n";// If `variable` is not specified wrap a with-statement around the generated
// code to add the data object to the top of the scope chain.
var variable=hasOwnProperty.call(options,'variable')&&options.variable;if(!variable){source='with (obj) {\n'+source+'\n}\n';}// Throw an error if a forbidden character was found in `variable`, to prevent
// potential command injection attacks.
else if(reForbiddenIdentifierChars.test(variable)){throw new Error(INVALID_TEMPL_VAR_ERROR_TEXT);}// Cleanup code by stripping empty strings.
source=(isEvaluating?source.replace(reEmptyStringLeading,''):source).replace(reEmptyStringMiddle,'$1').replace(reEmptyStringTrailing,'$1;');// Frame code as the function body.
source='function('+(variable||'obj')+') {\n'+(variable?'':'obj || (obj = {});\n')+"var __t, __p = ''"+(isEscaping?', __e = _.escape':'')+(isEvaluating?', __j = Array.prototype.join;\n'+"function print() { __p += __j.call(arguments, '') }\n":';\n')+source+'return __p\n}';var result=attempt(function(){return Function(importsKeys,sourceURL+'return '+source).apply(undefined,importsValues);});// Provide the compiled function's source by its `toString` method or
// the `source` property as a convenience for inlining compiled templates.
result.source=source;if(isError(result)){throw result;}return result;}/**
     * Converts `string`, as a whole, to lower case just like
     * [String#toLowerCase](https://mdn.io/toLowerCase).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the lower cased string.
     * @example
     *
     * _.toLower('--Foo-Bar--');
     * // => '--foo-bar--'
     *
     * _.toLower('fooBar');
     * // => 'foobar'
     *
     * _.toLower('__FOO_BAR__');
     * // => '__foo_bar__'
     */function toLower(value){return toString(value).toLowerCase();}/**
     * Converts `string`, as a whole, to upper case just like
     * [String#toUpperCase](https://mdn.io/toUpperCase).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the upper cased string.
     * @example
     *
     * _.toUpper('--foo-bar--');
     * // => '--FOO-BAR--'
     *
     * _.toUpper('fooBar');
     * // => 'FOOBAR'
     *
     * _.toUpper('__foo_bar__');
     * // => '__FOO_BAR__'
     */function toUpper(value){return toString(value).toUpperCase();}/**
     * Removes leading and trailing whitespace or specified characters from `string`.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to trim.
     * @param {string} [chars=whitespace] The characters to trim.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {string} Returns the trimmed string.
     * @example
     *
     * _.trim('  abc  ');
     * // => 'abc'
     *
     * _.trim('-_-abc-_-', '_-');
     * // => 'abc'
     *
     * _.map(['  foo  ', '  bar  '], _.trim);
     * // => ['foo', 'bar']
     */function trim(string,chars,guard){string=toString(string);if(string&&(guard||chars===undefined)){return baseTrim(string);}if(!string||!(chars=baseToString(chars))){return string;}var strSymbols=stringToArray(string),chrSymbols=stringToArray(chars),start=charsStartIndex(strSymbols,chrSymbols),end=charsEndIndex(strSymbols,chrSymbols)+1;return castSlice(strSymbols,start,end).join('');}/**
     * Removes trailing whitespace or specified characters from `string`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to trim.
     * @param {string} [chars=whitespace] The characters to trim.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {string} Returns the trimmed string.
     * @example
     *
     * _.trimEnd('  abc  ');
     * // => '  abc'
     *
     * _.trimEnd('-_-abc-_-', '_-');
     * // => '-_-abc'
     */function trimEnd(string,chars,guard){string=toString(string);if(string&&(guard||chars===undefined)){return string.slice(0,trimmedEndIndex(string)+1);}if(!string||!(chars=baseToString(chars))){return string;}var strSymbols=stringToArray(string),end=charsEndIndex(strSymbols,stringToArray(chars))+1;return castSlice(strSymbols,0,end).join('');}/**
     * Removes leading whitespace or specified characters from `string`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to trim.
     * @param {string} [chars=whitespace] The characters to trim.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {string} Returns the trimmed string.
     * @example
     *
     * _.trimStart('  abc  ');
     * // => 'abc  '
     *
     * _.trimStart('-_-abc-_-', '_-');
     * // => 'abc-_-'
     */function trimStart(string,chars,guard){string=toString(string);if(string&&(guard||chars===undefined)){return string.replace(reTrimStart,'');}if(!string||!(chars=baseToString(chars))){return string;}var strSymbols=stringToArray(string),start=charsStartIndex(strSymbols,stringToArray(chars));return castSlice(strSymbols,start).join('');}/**
     * Truncates `string` if it's longer than the given maximum string length.
     * The last characters of the truncated string are replaced with the omission
     * string which defaults to "...".
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to truncate.
     * @param {Object} [options={}] The options object.
     * @param {number} [options.length=30] The maximum string length.
     * @param {string} [options.omission='...'] The string to indicate text is omitted.
     * @param {RegExp|string} [options.separator] The separator pattern to truncate to.
     * @returns {string} Returns the truncated string.
     * @example
     *
     * _.truncate('hi-diddly-ho there, neighborino');
     * // => 'hi-diddly-ho there, neighbo...'
     *
     * _.truncate('hi-diddly-ho there, neighborino', {
     *   'length': 24,
     *   'separator': ' '
     * });
     * // => 'hi-diddly-ho there,...'
     *
     * _.truncate('hi-diddly-ho there, neighborino', {
     *   'length': 24,
     *   'separator': /,? +/
     * });
     * // => 'hi-diddly-ho there...'
     *
     * _.truncate('hi-diddly-ho there, neighborino', {
     *   'omission': ' [...]'
     * });
     * // => 'hi-diddly-ho there, neig [...]'
     */function truncate(string,options){var length=DEFAULT_TRUNC_LENGTH,omission=DEFAULT_TRUNC_OMISSION;if(isObject(options)){var separator='separator'in options?options.separator:separator;length='length'in options?toInteger(options.length):length;omission='omission'in options?baseToString(options.omission):omission;}string=toString(string);var strLength=string.length;if(hasUnicode(string)){var strSymbols=stringToArray(string);strLength=strSymbols.length;}if(length>=strLength){return string;}var end=length-stringSize(omission);if(end<1){return omission;}var result=strSymbols?castSlice(strSymbols,0,end).join(''):string.slice(0,end);if(separator===undefined){return result+omission;}if(strSymbols){end+=result.length-end;}if(isRegExp(separator)){if(string.slice(end).search(separator)){var match,substring=result;if(!separator.global){separator=RegExp(separator.source,toString(reFlags.exec(separator))+'g');}separator.lastIndex=0;while(match=separator.exec(substring)){var newEnd=match.index;}result=result.slice(0,newEnd===undefined?end:newEnd);}}else if(string.indexOf(baseToString(separator),end)!=end){var index=result.lastIndexOf(separator);if(index>-1){result=result.slice(0,index);}}return result+omission;}/**
     * The inverse of `_.escape`; this method converts the HTML entities
     * `&amp;`, `&lt;`, `&gt;`, `&quot;`, and `&#39;` in `string` to
     * their corresponding characters.
     *
     * **Note:** No other HTML entities are unescaped. To unescape additional
     * HTML entities use a third-party library like [_he_](https://mths.be/he).
     *
     * @static
     * @memberOf _
     * @since 0.6.0
     * @category String
     * @param {string} [string=''] The string to unescape.
     * @returns {string} Returns the unescaped string.
     * @example
     *
     * _.unescape('fred, barney, &amp; pebbles');
     * // => 'fred, barney, & pebbles'
     */function unescape(string){string=toString(string);return string&&reHasEscapedHtml.test(string)?string.replace(reEscapedHtml,unescapeHtmlChar):string;}/**
     * Converts `string`, as space separated words, to upper case.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the upper cased string.
     * @example
     *
     * _.upperCase('--foo-bar');
     * // => 'FOO BAR'
     *
     * _.upperCase('fooBar');
     * // => 'FOO BAR'
     *
     * _.upperCase('__foo_bar__');
     * // => 'FOO BAR'
     */var upperCase=createCompounder(function(result,word,index){return result+(index?' ':'')+word.toUpperCase();});/**
     * Converts the first character of `string` to upper case.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the converted string.
     * @example
     *
     * _.upperFirst('fred');
     * // => 'Fred'
     *
     * _.upperFirst('FRED');
     * // => 'FRED'
     */var upperFirst=createCaseFirst('toUpperCase');/**
     * Splits `string` into an array of its words.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to inspect.
     * @param {RegExp|string} [pattern] The pattern to match words.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Array} Returns the words of `string`.
     * @example
     *
     * _.words('fred, barney, & pebbles');
     * // => ['fred', 'barney', 'pebbles']
     *
     * _.words('fred, barney, & pebbles', /[^, ]+/g);
     * // => ['fred', 'barney', '&', 'pebbles']
     */function words(string,pattern,guard){string=toString(string);pattern=guard?undefined:pattern;if(pattern===undefined){return hasUnicodeWord(string)?unicodeWords(string):asciiWords(string);}return string.match(pattern)||[];}/*------------------------------------------------------------------------*/ /**
     * Attempts to invoke `func`, returning either the result or the caught error
     * object. Any additional arguments are provided to `func` when it's invoked.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Util
     * @param {Function} func The function to attempt.
     * @param {...*} [args] The arguments to invoke `func` with.
     * @returns {*} Returns the `func` result or error object.
     * @example
     *
     * // Avoid throwing errors for invalid selectors.
     * var elements = _.attempt(function(selector) {
     *   return document.querySelectorAll(selector);
     * }, '>_>');
     *
     * if (_.isError(elements)) {
     *   elements = [];
     * }
     */var attempt=baseRest(function(func,args){try{return apply(func,undefined,args);}catch(e){return isError(e)?e:new Error(e);}});/**
     * Binds methods of an object to the object itself, overwriting the existing
     * method.
     *
     * **Note:** This method doesn't set the "length" property of bound functions.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Util
     * @param {Object} object The object to bind and assign the bound methods to.
     * @param {...(string|string[])} methodNames The object method names to bind.
     * @returns {Object} Returns `object`.
     * @example
     *
     * var view = {
     *   'label': 'docs',
     *   'click': function() {
     *     console.log('clicked ' + this.label);
     *   }
     * };
     *
     * _.bindAll(view, ['click']);
     * jQuery(element).on('click', view.click);
     * // => Logs 'clicked docs' when clicked.
     */var bindAll=flatRest(function(object,methodNames){arrayEach(methodNames,function(key){key=toKey(key);baseAssignValue(object,key,bind(object[key],object));});return object;});/**
     * Creates a function that iterates over `pairs` and invokes the corresponding
     * function of the first predicate to return truthy. The predicate-function
     * pairs are invoked with the `this` binding and arguments of the created
     * function.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Util
     * @param {Array} pairs The predicate-function pairs.
     * @returns {Function} Returns the new composite function.
     * @example
     *
     * var func = _.cond([
     *   [_.matches({ 'a': 1 }),           _.constant('matches A')],
     *   [_.conforms({ 'b': _.isNumber }), _.constant('matches B')],
     *   [_.stubTrue,                      _.constant('no match')]
     * ]);
     *
     * func({ 'a': 1, 'b': 2 });
     * // => 'matches A'
     *
     * func({ 'a': 0, 'b': 1 });
     * // => 'matches B'
     *
     * func({ 'a': '1', 'b': '2' });
     * // => 'no match'
     */function cond(pairs){var length=pairs==null?0:pairs.length,toIteratee=getIteratee();pairs=!length?[]:arrayMap(pairs,function(pair){if(typeof pair[1]!='function'){throw new TypeError(FUNC_ERROR_TEXT);}return[toIteratee(pair[0]),pair[1]];});return baseRest(function(args){var index=-1;while(++index<length){var pair=pairs[index];if(apply(pair[0],this,args)){return apply(pair[1],this,args);}}});}/**
     * Creates a function that invokes the predicate properties of `source` with
     * the corresponding property values of a given object, returning `true` if
     * all predicates return truthy, else `false`.
     *
     * **Note:** The created function is equivalent to `_.conformsTo` with
     * `source` partially applied.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Util
     * @param {Object} source The object of property predicates to conform to.
     * @returns {Function} Returns the new spec function.
     * @example
     *
     * var objects = [
     *   { 'a': 2, 'b': 1 },
     *   { 'a': 1, 'b': 2 }
     * ];
     *
     * _.filter(objects, _.conforms({ 'b': function(n) { return n > 1; } }));
     * // => [{ 'a': 1, 'b': 2 }]
     */function conforms(source){return baseConforms(baseClone(source,CLONE_DEEP_FLAG));}/**
     * Creates a function that returns `value`.
     *
     * @static
     * @memberOf _
     * @since 2.4.0
     * @category Util
     * @param {*} value The value to return from the new function.
     * @returns {Function} Returns the new constant function.
     * @example
     *
     * var objects = _.times(2, _.constant({ 'a': 1 }));
     *
     * console.log(objects);
     * // => [{ 'a': 1 }, { 'a': 1 }]
     *
     * console.log(objects[0] === objects[1]);
     * // => true
     */function constant(value){return function(){return value;};}/**
     * Checks `value` to determine whether a default value should be returned in
     * its place. The `defaultValue` is returned if `value` is `NaN`, `null`,
     * or `undefined`.
     *
     * @static
     * @memberOf _
     * @since 4.14.0
     * @category Util
     * @param {*} value The value to check.
     * @param {*} defaultValue The default value.
     * @returns {*} Returns the resolved value.
     * @example
     *
     * _.defaultTo(1, 10);
     * // => 1
     *
     * _.defaultTo(undefined, 10);
     * // => 10
     */function defaultTo(value,defaultValue){return value==null||value!==value?defaultValue:value;}/**
     * Creates a function that returns the result of invoking the given functions
     * with the `this` binding of the created function, where each successive
     * invocation is supplied the return value of the previous.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Util
     * @param {...(Function|Function[])} [funcs] The functions to invoke.
     * @returns {Function} Returns the new composite function.
     * @see _.flowRight
     * @example
     *
     * function square(n) {
     *   return n * n;
     * }
     *
     * var addSquare = _.flow([_.add, square]);
     * addSquare(1, 2);
     * // => 9
     */var flow=createFlow();/**
     * This method is like `_.flow` except that it creates a function that
     * invokes the given functions from right to left.
     *
     * @static
     * @since 3.0.0
     * @memberOf _
     * @category Util
     * @param {...(Function|Function[])} [funcs] The functions to invoke.
     * @returns {Function} Returns the new composite function.
     * @see _.flow
     * @example
     *
     * function square(n) {
     *   return n * n;
     * }
     *
     * var addSquare = _.flowRight([square, _.add]);
     * addSquare(1, 2);
     * // => 9
     */var flowRight=createFlow(true);/**
     * This method returns the first argument it receives.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Util
     * @param {*} value Any value.
     * @returns {*} Returns `value`.
     * @example
     *
     * var object = { 'a': 1 };
     *
     * console.log(_.identity(object) === object);
     * // => true
     */function identity(value){return value;}/**
     * Creates a function that invokes `func` with the arguments of the created
     * function. If `func` is a property name, the created function returns the
     * property value for a given element. If `func` is an array or object, the
     * created function returns `true` for elements that contain the equivalent
     * source properties, otherwise it returns `false`.
     *
     * @static
     * @since 4.0.0
     * @memberOf _
     * @category Util
     * @param {*} [func=_.identity] The value to convert to a callback.
     * @returns {Function} Returns the callback.
     * @example
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36, 'active': true },
     *   { 'user': 'fred',   'age': 40, 'active': false }
     * ];
     *
     * // The `_.matches` iteratee shorthand.
     * _.filter(users, _.iteratee({ 'user': 'barney', 'active': true }));
     * // => [{ 'user': 'barney', 'age': 36, 'active': true }]
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.filter(users, _.iteratee(['user', 'fred']));
     * // => [{ 'user': 'fred', 'age': 40 }]
     *
     * // The `_.property` iteratee shorthand.
     * _.map(users, _.iteratee('user'));
     * // => ['barney', 'fred']
     *
     * // Create custom iteratee shorthands.
     * _.iteratee = _.wrap(_.iteratee, function(iteratee, func) {
     *   return !_.isRegExp(func) ? iteratee(func) : function(string) {
     *     return func.test(string);
     *   };
     * });
     *
     * _.filter(['abc', 'def'], /ef/);
     * // => ['def']
     */function iteratee(func){return baseIteratee(typeof func=='function'?func:baseClone(func,CLONE_DEEP_FLAG));}/**
     * Creates a function that performs a partial deep comparison between a given
     * object and `source`, returning `true` if the given object has equivalent
     * property values, else `false`.
     *
     * **Note:** The created function is equivalent to `_.isMatch` with `source`
     * partially applied.
     *
     * Partial comparisons will match empty array and empty object `source`
     * values against any array or object value, respectively. See `_.isEqual`
     * for a list of supported value comparisons.
     *
     * **Note:** Multiple values can be checked by combining several matchers
     * using `_.overSome`
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Util
     * @param {Object} source The object of property values to match.
     * @returns {Function} Returns the new spec function.
     * @example
     *
     * var objects = [
     *   { 'a': 1, 'b': 2, 'c': 3 },
     *   { 'a': 4, 'b': 5, 'c': 6 }
     * ];
     *
     * _.filter(objects, _.matches({ 'a': 4, 'c': 6 }));
     * // => [{ 'a': 4, 'b': 5, 'c': 6 }]
     *
     * // Checking for several possible values
     * _.filter(objects, _.overSome([_.matches({ 'a': 1 }), _.matches({ 'a': 4 })]));
     * // => [{ 'a': 1, 'b': 2, 'c': 3 }, { 'a': 4, 'b': 5, 'c': 6 }]
     */function matches(source){return baseMatches(baseClone(source,CLONE_DEEP_FLAG));}/**
     * Creates a function that performs a partial deep comparison between the
     * value at `path` of a given object to `srcValue`, returning `true` if the
     * object value is equivalent, else `false`.
     *
     * **Note:** Partial comparisons will match empty array and empty object
     * `srcValue` values against any array or object value, respectively. See
     * `_.isEqual` for a list of supported value comparisons.
     *
     * **Note:** Multiple values can be checked by combining several matchers
     * using `_.overSome`
     *
     * @static
     * @memberOf _
     * @since 3.2.0
     * @category Util
     * @param {Array|string} path The path of the property to get.
     * @param {*} srcValue The value to match.
     * @returns {Function} Returns the new spec function.
     * @example
     *
     * var objects = [
     *   { 'a': 1, 'b': 2, 'c': 3 },
     *   { 'a': 4, 'b': 5, 'c': 6 }
     * ];
     *
     * _.find(objects, _.matchesProperty('a', 4));
     * // => { 'a': 4, 'b': 5, 'c': 6 }
     *
     * // Checking for several possible values
     * _.filter(objects, _.overSome([_.matchesProperty('a', 1), _.matchesProperty('a', 4)]));
     * // => [{ 'a': 1, 'b': 2, 'c': 3 }, { 'a': 4, 'b': 5, 'c': 6 }]
     */function matchesProperty(path,srcValue){return baseMatchesProperty(path,baseClone(srcValue,CLONE_DEEP_FLAG));}/**
     * Creates a function that invokes the method at `path` of a given object.
     * Any additional arguments are provided to the invoked method.
     *
     * @static
     * @memberOf _
     * @since 3.7.0
     * @category Util
     * @param {Array|string} path The path of the method to invoke.
     * @param {...*} [args] The arguments to invoke the method with.
     * @returns {Function} Returns the new invoker function.
     * @example
     *
     * var objects = [
     *   { 'a': { 'b': _.constant(2) } },
     *   { 'a': { 'b': _.constant(1) } }
     * ];
     *
     * _.map(objects, _.method('a.b'));
     * // => [2, 1]
     *
     * _.map(objects, _.method(['a', 'b']));
     * // => [2, 1]
     */var method=baseRest(function(path,args){return function(object){return baseInvoke(object,path,args);};});/**
     * The opposite of `_.method`; this method creates a function that invokes
     * the method at a given path of `object`. Any additional arguments are
     * provided to the invoked method.
     *
     * @static
     * @memberOf _
     * @since 3.7.0
     * @category Util
     * @param {Object} object The object to query.
     * @param {...*} [args] The arguments to invoke the method with.
     * @returns {Function} Returns the new invoker function.
     * @example
     *
     * var array = _.times(3, _.constant),
     *     object = { 'a': array, 'b': array, 'c': array };
     *
     * _.map(['a[2]', 'c[0]'], _.methodOf(object));
     * // => [2, 0]
     *
     * _.map([['a', '2'], ['c', '0']], _.methodOf(object));
     * // => [2, 0]
     */var methodOf=baseRest(function(object,args){return function(path){return baseInvoke(object,path,args);};});/**
     * Adds all own enumerable string keyed function properties of a source
     * object to the destination object. If `object` is a function, then methods
     * are added to its prototype as well.
     *
     * **Note:** Use `_.runInContext` to create a pristine `lodash` function to
     * avoid conflicts caused by modifying the original.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Util
     * @param {Function|Object} [object=lodash] The destination object.
     * @param {Object} source The object of functions to add.
     * @param {Object} [options={}] The options object.
     * @param {boolean} [options.chain=true] Specify whether mixins are chainable.
     * @returns {Function|Object} Returns `object`.
     * @example
     *
     * function vowels(string) {
     *   return _.filter(string, function(v) {
     *     return /[aeiou]/i.test(v);
     *   });
     * }
     *
     * _.mixin({ 'vowels': vowels });
     * _.vowels('fred');
     * // => ['e']
     *
     * _('fred').vowels().value();
     * // => ['e']
     *
     * _.mixin({ 'vowels': vowels }, { 'chain': false });
     * _('fred').vowels();
     * // => ['e']
     */function mixin(object,source,options){var props=keys(source),methodNames=baseFunctions(source,props);if(options==null&&!(isObject(source)&&(methodNames.length||!props.length))){options=source;source=object;object=this;methodNames=baseFunctions(source,keys(source));}var chain=!(isObject(options)&&'chain'in options)||!!options.chain,isFunc=isFunction(object);arrayEach(methodNames,function(methodName){var func=source[methodName];object[methodName]=func;if(isFunc){object.prototype[methodName]=function(){var chainAll=this.__chain__;if(chain||chainAll){var result=object(this.__wrapped__),actions=result.__actions__=copyArray(this.__actions__);actions.push({'func':func,'args':arguments,'thisArg':object});result.__chain__=chainAll;return result;}return func.apply(object,arrayPush([this.value()],arguments));};}});return object;}/**
     * Reverts the `_` variable to its previous value and returns a reference to
     * the `lodash` function.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Util
     * @returns {Function} Returns the `lodash` function.
     * @example
     *
     * var lodash = _.noConflict();
     */function noConflict(){if(root._===this){root._=oldDash;}return this;}/**
     * This method returns `undefined`.
     *
     * @static
     * @memberOf _
     * @since 2.3.0
     * @category Util
     * @example
     *
     * _.times(2, _.noop);
     * // => [undefined, undefined]
     */function noop(){// No operation performed.
}/**
     * Creates a function that gets the argument at index `n`. If `n` is negative,
     * the nth argument from the end is returned.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Util
     * @param {number} [n=0] The index of the argument to return.
     * @returns {Function} Returns the new pass-thru function.
     * @example
     *
     * var func = _.nthArg(1);
     * func('a', 'b', 'c', 'd');
     * // => 'b'
     *
     * var func = _.nthArg(-2);
     * func('a', 'b', 'c', 'd');
     * // => 'c'
     */function nthArg(n){n=toInteger(n);return baseRest(function(args){return baseNth(args,n);});}/**
     * Creates a function that invokes `iteratees` with the arguments it receives
     * and returns their results.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Util
     * @param {...(Function|Function[])} [iteratees=[_.identity]]
     *  The iteratees to invoke.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var func = _.over([Math.max, Math.min]);
     *
     * func(1, 2, 3, 4);
     * // => [4, 1]
     */var over=createOver(arrayMap);/**
     * Creates a function that checks if **all** of the `predicates` return
     * truthy when invoked with the arguments it receives.
     *
     * Following shorthands are possible for providing predicates.
     * Pass an `Object` and it will be used as an parameter for `_.matches` to create the predicate.
     * Pass an `Array` of parameters for `_.matchesProperty` and the predicate will be created using them.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Util
     * @param {...(Function|Function[])} [predicates=[_.identity]]
     *  The predicates to check.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var func = _.overEvery([Boolean, isFinite]);
     *
     * func('1');
     * // => true
     *
     * func(null);
     * // => false
     *
     * func(NaN);
     * // => false
     */var overEvery=createOver(arrayEvery);/**
     * Creates a function that checks if **any** of the `predicates` return
     * truthy when invoked with the arguments it receives.
     *
     * Following shorthands are possible for providing predicates.
     * Pass an `Object` and it will be used as an parameter for `_.matches` to create the predicate.
     * Pass an `Array` of parameters for `_.matchesProperty` and the predicate will be created using them.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Util
     * @param {...(Function|Function[])} [predicates=[_.identity]]
     *  The predicates to check.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var func = _.overSome([Boolean, isFinite]);
     *
     * func('1');
     * // => true
     *
     * func(null);
     * // => true
     *
     * func(NaN);
     * // => false
     *
     * var matchesFunc = _.overSome([{ 'a': 1 }, { 'a': 2 }])
     * var matchesPropertyFunc = _.overSome([['a', 1], ['a', 2]])
     */var overSome=createOver(arraySome);/**
     * Creates a function that returns the value at `path` of a given object.
     *
     * @static
     * @memberOf _
     * @since 2.4.0
     * @category Util
     * @param {Array|string} path The path of the property to get.
     * @returns {Function} Returns the new accessor function.
     * @example
     *
     * var objects = [
     *   { 'a': { 'b': 2 } },
     *   { 'a': { 'b': 1 } }
     * ];
     *
     * _.map(objects, _.property('a.b'));
     * // => [2, 1]
     *
     * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
     * // => [1, 2]
     */function property(path){return isKey(path)?baseProperty(toKey(path)):basePropertyDeep(path);}/**
     * The opposite of `_.property`; this method creates a function that returns
     * the value at a given path of `object`.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Util
     * @param {Object} object The object to query.
     * @returns {Function} Returns the new accessor function.
     * @example
     *
     * var array = [0, 1, 2],
     *     object = { 'a': array, 'b': array, 'c': array };
     *
     * _.map(['a[2]', 'c[0]'], _.propertyOf(object));
     * // => [2, 0]
     *
     * _.map([['a', '2'], ['c', '0']], _.propertyOf(object));
     * // => [2, 0]
     */function propertyOf(object){return function(path){return object==null?undefined:baseGet(object,path);};}/**
     * Creates an array of numbers (positive and/or negative) progressing from
     * `start` up to, but not including, `end`. A step of `-1` is used if a negative
     * `start` is specified without an `end` or `step`. If `end` is not specified,
     * it's set to `start` with `start` then set to `0`.
     *
     * **Note:** JavaScript follows the IEEE-754 standard for resolving
     * floating-point values which can produce unexpected results.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Util
     * @param {number} [start=0] The start of the range.
     * @param {number} end The end of the range.
     * @param {number} [step=1] The value to increment or decrement by.
     * @returns {Array} Returns the range of numbers.
     * @see _.inRange, _.rangeRight
     * @example
     *
     * _.range(4);
     * // => [0, 1, 2, 3]
     *
     * _.range(-4);
     * // => [0, -1, -2, -3]
     *
     * _.range(1, 5);
     * // => [1, 2, 3, 4]
     *
     * _.range(0, 20, 5);
     * // => [0, 5, 10, 15]
     *
     * _.range(0, -4, -1);
     * // => [0, -1, -2, -3]
     *
     * _.range(1, 4, 0);
     * // => [1, 1, 1]
     *
     * _.range(0);
     * // => []
     */var range=createRange();/**
     * This method is like `_.range` except that it populates values in
     * descending order.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Util
     * @param {number} [start=0] The start of the range.
     * @param {number} end The end of the range.
     * @param {number} [step=1] The value to increment or decrement by.
     * @returns {Array} Returns the range of numbers.
     * @see _.inRange, _.range
     * @example
     *
     * _.rangeRight(4);
     * // => [3, 2, 1, 0]
     *
     * _.rangeRight(-4);
     * // => [-3, -2, -1, 0]
     *
     * _.rangeRight(1, 5);
     * // => [4, 3, 2, 1]
     *
     * _.rangeRight(0, 20, 5);
     * // => [15, 10, 5, 0]
     *
     * _.rangeRight(0, -4, -1);
     * // => [-3, -2, -1, 0]
     *
     * _.rangeRight(1, 4, 0);
     * // => [1, 1, 1]
     *
     * _.rangeRight(0);
     * // => []
     */var rangeRight=createRange(true);/**
     * This method returns a new empty array.
     *
     * @static
     * @memberOf _
     * @since 4.13.0
     * @category Util
     * @returns {Array} Returns the new empty array.
     * @example
     *
     * var arrays = _.times(2, _.stubArray);
     *
     * console.log(arrays);
     * // => [[], []]
     *
     * console.log(arrays[0] === arrays[1]);
     * // => false
     */function stubArray(){return[];}/**
     * This method returns `false`.
     *
     * @static
     * @memberOf _
     * @since 4.13.0
     * @category Util
     * @returns {boolean} Returns `false`.
     * @example
     *
     * _.times(2, _.stubFalse);
     * // => [false, false]
     */function stubFalse(){return false;}/**
     * This method returns a new empty object.
     *
     * @static
     * @memberOf _
     * @since 4.13.0
     * @category Util
     * @returns {Object} Returns the new empty object.
     * @example
     *
     * var objects = _.times(2, _.stubObject);
     *
     * console.log(objects);
     * // => [{}, {}]
     *
     * console.log(objects[0] === objects[1]);
     * // => false
     */function stubObject(){return{};}/**
     * This method returns an empty string.
     *
     * @static
     * @memberOf _
     * @since 4.13.0
     * @category Util
     * @returns {string} Returns the empty string.
     * @example
     *
     * _.times(2, _.stubString);
     * // => ['', '']
     */function stubString(){return'';}/**
     * This method returns `true`.
     *
     * @static
     * @memberOf _
     * @since 4.13.0
     * @category Util
     * @returns {boolean} Returns `true`.
     * @example
     *
     * _.times(2, _.stubTrue);
     * // => [true, true]
     */function stubTrue(){return true;}/**
     * Invokes the iteratee `n` times, returning an array of the results of
     * each invocation. The iteratee is invoked with one argument; (index).
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Util
     * @param {number} n The number of times to invoke `iteratee`.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the array of results.
     * @example
     *
     * _.times(3, String);
     * // => ['0', '1', '2']
     *
     *  _.times(4, _.constant(0));
     * // => [0, 0, 0, 0]
     */function times(n,iteratee){n=toInteger(n);if(n<1||n>MAX_SAFE_INTEGER){return[];}var index=MAX_ARRAY_LENGTH,length=nativeMin(n,MAX_ARRAY_LENGTH);iteratee=getIteratee(iteratee);n-=MAX_ARRAY_LENGTH;var result=baseTimes(length,iteratee);while(++index<n){iteratee(index);}return result;}/**
     * Converts `value` to a property path array.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Util
     * @param {*} value The value to convert.
     * @returns {Array} Returns the new property path array.
     * @example
     *
     * _.toPath('a.b.c');
     * // => ['a', 'b', 'c']
     *
     * _.toPath('a[0].b.c');
     * // => ['a', '0', 'b', 'c']
     */function toPath(value){if(isArray(value)){return arrayMap(value,toKey);}return isSymbol(value)?[value]:copyArray(stringToPath(toString(value)));}/**
     * Generates a unique ID. If `prefix` is given, the ID is appended to it.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Util
     * @param {string} [prefix=''] The value to prefix the ID with.
     * @returns {string} Returns the unique ID.
     * @example
     *
     * _.uniqueId('contact_');
     * // => 'contact_104'
     *
     * _.uniqueId();
     * // => '105'
     */function uniqueId(prefix){var id=++idCounter;return toString(prefix)+id;}/*------------------------------------------------------------------------*/ /**
     * Adds two numbers.
     *
     * @static
     * @memberOf _
     * @since 3.4.0
     * @category Math
     * @param {number} augend The first number in an addition.
     * @param {number} addend The second number in an addition.
     * @returns {number} Returns the total.
     * @example
     *
     * _.add(6, 4);
     * // => 10
     */var add=createMathOperation(function(augend,addend){return augend+addend;},0);/**
     * Computes `number` rounded up to `precision`.
     *
     * @static
     * @memberOf _
     * @since 3.10.0
     * @category Math
     * @param {number} number The number to round up.
     * @param {number} [precision=0] The precision to round up to.
     * @returns {number} Returns the rounded up number.
     * @example
     *
     * _.ceil(4.006);
     * // => 5
     *
     * _.ceil(6.004, 2);
     * // => 6.01
     *
     * _.ceil(6040, -2);
     * // => 6100
     */var ceil=createRound('ceil');/**
     * Divide two numbers.
     *
     * @static
     * @memberOf _
     * @since 4.7.0
     * @category Math
     * @param {number} dividend The first number in a division.
     * @param {number} divisor The second number in a division.
     * @returns {number} Returns the quotient.
     * @example
     *
     * _.divide(6, 4);
     * // => 1.5
     */var divide=createMathOperation(function(dividend,divisor){return dividend/divisor;},1);/**
     * Computes `number` rounded down to `precision`.
     *
     * @static
     * @memberOf _
     * @since 3.10.0
     * @category Math
     * @param {number} number The number to round down.
     * @param {number} [precision=0] The precision to round down to.
     * @returns {number} Returns the rounded down number.
     * @example
     *
     * _.floor(4.006);
     * // => 4
     *
     * _.floor(0.046, 2);
     * // => 0.04
     *
     * _.floor(4060, -2);
     * // => 4000
     */var floor=createRound('floor');/**
     * Computes the maximum value of `array`. If `array` is empty or falsey,
     * `undefined` is returned.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Math
     * @param {Array} array The array to iterate over.
     * @returns {*} Returns the maximum value.
     * @example
     *
     * _.max([4, 2, 8, 6]);
     * // => 8
     *
     * _.max([]);
     * // => undefined
     */function max(array){return array&&array.length?baseExtremum(array,identity,baseGt):undefined;}/**
     * This method is like `_.max` except that it accepts `iteratee` which is
     * invoked for each element in `array` to generate the criterion by which
     * the value is ranked. The iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Math
     * @param {Array} array The array to iterate over.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {*} Returns the maximum value.
     * @example
     *
     * var objects = [{ 'n': 1 }, { 'n': 2 }];
     *
     * _.maxBy(objects, function(o) { return o.n; });
     * // => { 'n': 2 }
     *
     * // The `_.property` iteratee shorthand.
     * _.maxBy(objects, 'n');
     * // => { 'n': 2 }
     */function maxBy(array,iteratee){return array&&array.length?baseExtremum(array,getIteratee(iteratee,2),baseGt):undefined;}/**
     * Computes the mean of the values in `array`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Math
     * @param {Array} array The array to iterate over.
     * @returns {number} Returns the mean.
     * @example
     *
     * _.mean([4, 2, 8, 6]);
     * // => 5
     */function mean(array){return baseMean(array,identity);}/**
     * This method is like `_.mean` except that it accepts `iteratee` which is
     * invoked for each element in `array` to generate the value to be averaged.
     * The iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 4.7.0
     * @category Math
     * @param {Array} array The array to iterate over.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {number} Returns the mean.
     * @example
     *
     * var objects = [{ 'n': 4 }, { 'n': 2 }, { 'n': 8 }, { 'n': 6 }];
     *
     * _.meanBy(objects, function(o) { return o.n; });
     * // => 5
     *
     * // The `_.property` iteratee shorthand.
     * _.meanBy(objects, 'n');
     * // => 5
     */function meanBy(array,iteratee){return baseMean(array,getIteratee(iteratee,2));}/**
     * Computes the minimum value of `array`. If `array` is empty or falsey,
     * `undefined` is returned.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Math
     * @param {Array} array The array to iterate over.
     * @returns {*} Returns the minimum value.
     * @example
     *
     * _.min([4, 2, 8, 6]);
     * // => 2
     *
     * _.min([]);
     * // => undefined
     */function min(array){return array&&array.length?baseExtremum(array,identity,baseLt):undefined;}/**
     * This method is like `_.min` except that it accepts `iteratee` which is
     * invoked for each element in `array` to generate the criterion by which
     * the value is ranked. The iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Math
     * @param {Array} array The array to iterate over.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {*} Returns the minimum value.
     * @example
     *
     * var objects = [{ 'n': 1 }, { 'n': 2 }];
     *
     * _.minBy(objects, function(o) { return o.n; });
     * // => { 'n': 1 }
     *
     * // The `_.property` iteratee shorthand.
     * _.minBy(objects, 'n');
     * // => { 'n': 1 }
     */function minBy(array,iteratee){return array&&array.length?baseExtremum(array,getIteratee(iteratee,2),baseLt):undefined;}/**
     * Multiply two numbers.
     *
     * @static
     * @memberOf _
     * @since 4.7.0
     * @category Math
     * @param {number} multiplier The first number in a multiplication.
     * @param {number} multiplicand The second number in a multiplication.
     * @returns {number} Returns the product.
     * @example
     *
     * _.multiply(6, 4);
     * // => 24
     */var multiply=createMathOperation(function(multiplier,multiplicand){return multiplier*multiplicand;},1);/**
     * Computes `number` rounded to `precision`.
     *
     * @static
     * @memberOf _
     * @since 3.10.0
     * @category Math
     * @param {number} number The number to round.
     * @param {number} [precision=0] The precision to round to.
     * @returns {number} Returns the rounded number.
     * @example
     *
     * _.round(4.006);
     * // => 4
     *
     * _.round(4.006, 2);
     * // => 4.01
     *
     * _.round(4060, -2);
     * // => 4100
     */var round=createRound('round');/**
     * Subtract two numbers.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Math
     * @param {number} minuend The first number in a subtraction.
     * @param {number} subtrahend The second number in a subtraction.
     * @returns {number} Returns the difference.
     * @example
     *
     * _.subtract(6, 4);
     * // => 2
     */var subtract=createMathOperation(function(minuend,subtrahend){return minuend-subtrahend;},0);/**
     * Computes the sum of the values in `array`.
     *
     * @static
     * @memberOf _
     * @since 3.4.0
     * @category Math
     * @param {Array} array The array to iterate over.
     * @returns {number} Returns the sum.
     * @example
     *
     * _.sum([4, 2, 8, 6]);
     * // => 20
     */function sum(array){return array&&array.length?baseSum(array,identity):0;}/**
     * This method is like `_.sum` except that it accepts `iteratee` which is
     * invoked for each element in `array` to generate the value to be summed.
     * The iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Math
     * @param {Array} array The array to iterate over.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {number} Returns the sum.
     * @example
     *
     * var objects = [{ 'n': 4 }, { 'n': 2 }, { 'n': 8 }, { 'n': 6 }];
     *
     * _.sumBy(objects, function(o) { return o.n; });
     * // => 20
     *
     * // The `_.property` iteratee shorthand.
     * _.sumBy(objects, 'n');
     * // => 20
     */function sumBy(array,iteratee){return array&&array.length?baseSum(array,getIteratee(iteratee,2)):0;}/*------------------------------------------------------------------------*/ // Add methods that return wrapped values in chain sequences.
lodash.after=after;lodash.ary=ary;lodash.assign=assign;lodash.assignIn=assignIn;lodash.assignInWith=assignInWith;lodash.assignWith=assignWith;lodash.at=at;lodash.before=before;lodash.bind=bind;lodash.bindAll=bindAll;lodash.bindKey=bindKey;lodash.castArray=castArray;lodash.chain=chain;lodash.chunk=chunk;lodash.compact=compact;lodash.concat=concat;lodash.cond=cond;lodash.conforms=conforms;lodash.constant=constant;lodash.countBy=countBy;lodash.create=create;lodash.curry=curry;lodash.curryRight=curryRight;lodash.debounce=debounce;lodash.defaults=defaults;lodash.defaultsDeep=defaultsDeep;lodash.defer=defer;lodash.delay=delay;lodash.difference=difference;lodash.differenceBy=differenceBy;lodash.differenceWith=differenceWith;lodash.drop=drop;lodash.dropRight=dropRight;lodash.dropRightWhile=dropRightWhile;lodash.dropWhile=dropWhile;lodash.fill=fill;lodash.filter=filter;lodash.flatMap=flatMap;lodash.flatMapDeep=flatMapDeep;lodash.flatMapDepth=flatMapDepth;lodash.flatten=flatten;lodash.flattenDeep=flattenDeep;lodash.flattenDepth=flattenDepth;lodash.flip=flip;lodash.flow=flow;lodash.flowRight=flowRight;lodash.fromPairs=fromPairs;lodash.functions=functions;lodash.functionsIn=functionsIn;lodash.groupBy=groupBy;lodash.initial=initial;lodash.intersection=intersection;lodash.intersectionBy=intersectionBy;lodash.intersectionWith=intersectionWith;lodash.invert=invert;lodash.invertBy=invertBy;lodash.invokeMap=invokeMap;lodash.iteratee=iteratee;lodash.keyBy=keyBy;lodash.keys=keys;lodash.keysIn=keysIn;lodash.map=map;lodash.mapKeys=mapKeys;lodash.mapValues=mapValues;lodash.matches=matches;lodash.matchesProperty=matchesProperty;lodash.memoize=memoize;lodash.merge=merge;lodash.mergeWith=mergeWith;lodash.method=method;lodash.methodOf=methodOf;lodash.mixin=mixin;lodash.negate=negate;lodash.nthArg=nthArg;lodash.omit=omit;lodash.omitBy=omitBy;lodash.once=once;lodash.orderBy=orderBy;lodash.over=over;lodash.overArgs=overArgs;lodash.overEvery=overEvery;lodash.overSome=overSome;lodash.partial=partial;lodash.partialRight=partialRight;lodash.partition=partition;lodash.pick=pick;lodash.pickBy=pickBy;lodash.property=property;lodash.propertyOf=propertyOf;lodash.pull=pull;lodash.pullAll=pullAll;lodash.pullAllBy=pullAllBy;lodash.pullAllWith=pullAllWith;lodash.pullAt=pullAt;lodash.range=range;lodash.rangeRight=rangeRight;lodash.rearg=rearg;lodash.reject=reject;lodash.remove=remove;lodash.rest=rest;lodash.reverse=reverse;lodash.sampleSize=sampleSize;lodash.set=set;lodash.setWith=setWith;lodash.shuffle=shuffle;lodash.slice=slice;lodash.sortBy=sortBy;lodash.sortedUniq=sortedUniq;lodash.sortedUniqBy=sortedUniqBy;lodash.split=split;lodash.spread=spread;lodash.tail=tail;lodash.take=take;lodash.takeRight=takeRight;lodash.takeRightWhile=takeRightWhile;lodash.takeWhile=takeWhile;lodash.tap=tap;lodash.throttle=throttle;lodash.thru=thru;lodash.toArray=toArray;lodash.toPairs=toPairs;lodash.toPairsIn=toPairsIn;lodash.toPath=toPath;lodash.toPlainObject=toPlainObject;lodash.transform=transform;lodash.unary=unary;lodash.union=union;lodash.unionBy=unionBy;lodash.unionWith=unionWith;lodash.uniq=uniq;lodash.uniqBy=uniqBy;lodash.uniqWith=uniqWith;lodash.unset=unset;lodash.unzip=unzip;lodash.unzipWith=unzipWith;lodash.update=update;lodash.updateWith=updateWith;lodash.values=values;lodash.valuesIn=valuesIn;lodash.without=without;lodash.words=words;lodash.wrap=wrap;lodash.xor=xor;lodash.xorBy=xorBy;lodash.xorWith=xorWith;lodash.zip=zip;lodash.zipObject=zipObject;lodash.zipObjectDeep=zipObjectDeep;lodash.zipWith=zipWith;// Add aliases.
lodash.entries=toPairs;lodash.entriesIn=toPairsIn;lodash.extend=assignIn;lodash.extendWith=assignInWith;// Add methods to `lodash.prototype`.
mixin(lodash,lodash);/*------------------------------------------------------------------------*/ // Add methods that return unwrapped values in chain sequences.
lodash.add=add;lodash.attempt=attempt;lodash.camelCase=camelCase;lodash.capitalize=capitalize;lodash.ceil=ceil;lodash.clamp=clamp;lodash.clone=clone;lodash.cloneDeep=cloneDeep;lodash.cloneDeepWith=cloneDeepWith;lodash.cloneWith=cloneWith;lodash.conformsTo=conformsTo;lodash.deburr=deburr;lodash.defaultTo=defaultTo;lodash.divide=divide;lodash.endsWith=endsWith;lodash.eq=eq;lodash.escape=escape;lodash.escapeRegExp=escapeRegExp;lodash.every=every;lodash.find=find;lodash.findIndex=findIndex;lodash.findKey=findKey;lodash.findLast=findLast;lodash.findLastIndex=findLastIndex;lodash.findLastKey=findLastKey;lodash.floor=floor;lodash.forEach=forEach;lodash.forEachRight=forEachRight;lodash.forIn=forIn;lodash.forInRight=forInRight;lodash.forOwn=forOwn;lodash.forOwnRight=forOwnRight;lodash.get=get;lodash.gt=gt;lodash.gte=gte;lodash.has=has;lodash.hasIn=hasIn;lodash.head=head;lodash.identity=identity;lodash.includes=includes;lodash.indexOf=indexOf;lodash.inRange=inRange;lodash.invoke=invoke;lodash.isArguments=isArguments;lodash.isArray=isArray;lodash.isArrayBuffer=isArrayBuffer;lodash.isArrayLike=isArrayLike;lodash.isArrayLikeObject=isArrayLikeObject;lodash.isBoolean=isBoolean;lodash.isBuffer=isBuffer;lodash.isDate=isDate;lodash.isElement=isElement;lodash.isEmpty=isEmpty;lodash.isEqual=isEqual;lodash.isEqualWith=isEqualWith;lodash.isError=isError;lodash.isFinite=isFinite;lodash.isFunction=isFunction;lodash.isInteger=isInteger;lodash.isLength=isLength;lodash.isMap=isMap;lodash.isMatch=isMatch;lodash.isMatchWith=isMatchWith;lodash.isNaN=isNaN;lodash.isNative=isNative;lodash.isNil=isNil;lodash.isNull=isNull;lodash.isNumber=isNumber;lodash.isObject=isObject;lodash.isObjectLike=isObjectLike;lodash.isPlainObject=isPlainObject;lodash.isRegExp=isRegExp;lodash.isSafeInteger=isSafeInteger;lodash.isSet=isSet;lodash.isString=isString;lodash.isSymbol=isSymbol;lodash.isTypedArray=isTypedArray;lodash.isUndefined=isUndefined;lodash.isWeakMap=isWeakMap;lodash.isWeakSet=isWeakSet;lodash.join=join;lodash.kebabCase=kebabCase;lodash.last=last;lodash.lastIndexOf=lastIndexOf;lodash.lowerCase=lowerCase;lodash.lowerFirst=lowerFirst;lodash.lt=lt;lodash.lte=lte;lodash.max=max;lodash.maxBy=maxBy;lodash.mean=mean;lodash.meanBy=meanBy;lodash.min=min;lodash.minBy=minBy;lodash.stubArray=stubArray;lodash.stubFalse=stubFalse;lodash.stubObject=stubObject;lodash.stubString=stubString;lodash.stubTrue=stubTrue;lodash.multiply=multiply;lodash.nth=nth;lodash.noConflict=noConflict;lodash.noop=noop;lodash.now=now;lodash.pad=pad;lodash.padEnd=padEnd;lodash.padStart=padStart;lodash.parseInt=parseInt;lodash.random=random;lodash.reduce=reduce;lodash.reduceRight=reduceRight;lodash.repeat=repeat;lodash.replace=replace;lodash.result=result;lodash.round=round;lodash.runInContext=runInContext;lodash.sample=sample;lodash.size=size;lodash.snakeCase=snakeCase;lodash.some=some;lodash.sortedIndex=sortedIndex;lodash.sortedIndexBy=sortedIndexBy;lodash.sortedIndexOf=sortedIndexOf;lodash.sortedLastIndex=sortedLastIndex;lodash.sortedLastIndexBy=sortedLastIndexBy;lodash.sortedLastIndexOf=sortedLastIndexOf;lodash.startCase=startCase;lodash.startsWith=startsWith;lodash.subtract=subtract;lodash.sum=sum;lodash.sumBy=sumBy;lodash.template=template;lodash.times=times;lodash.toFinite=toFinite;lodash.toInteger=toInteger;lodash.toLength=toLength;lodash.toLower=toLower;lodash.toNumber=toNumber;lodash.toSafeInteger=toSafeInteger;lodash.toString=toString;lodash.toUpper=toUpper;lodash.trim=trim;lodash.trimEnd=trimEnd;lodash.trimStart=trimStart;lodash.truncate=truncate;lodash.unescape=unescape;lodash.uniqueId=uniqueId;lodash.upperCase=upperCase;lodash.upperFirst=upperFirst;// Add aliases.
lodash.each=forEach;lodash.eachRight=forEachRight;lodash.first=head;mixin(lodash,function(){var source={};baseForOwn(lodash,function(func,methodName){if(!hasOwnProperty.call(lodash.prototype,methodName)){source[methodName]=func;}});return source;}(),{'chain':false});/*------------------------------------------------------------------------*/ /**
     * The semantic version number.
     *
     * @static
     * @memberOf _
     * @type {string}
     */lodash.VERSION=VERSION;// Assign default placeholders.
arrayEach(['bind','bindKey','curry','curryRight','partial','partialRight'],function(methodName){lodash[methodName].placeholder=lodash;});// Add `LazyWrapper` methods for `_.drop` and `_.take` variants.
arrayEach(['drop','take'],function(methodName,index){LazyWrapper.prototype[methodName]=function(n){n=n===undefined?1:nativeMax(toInteger(n),0);var result=this.__filtered__&&!index?new LazyWrapper(this):this.clone();if(result.__filtered__){result.__takeCount__=nativeMin(n,result.__takeCount__);}else{result.__views__.push({'size':nativeMin(n,MAX_ARRAY_LENGTH),'type':methodName+(result.__dir__<0?'Right':'')});}return result;};LazyWrapper.prototype[methodName+'Right']=function(n){return this.reverse()[methodName](n).reverse();};});// Add `LazyWrapper` methods that accept an `iteratee` value.
arrayEach(['filter','map','takeWhile'],function(methodName,index){var type=index+1,isFilter=type==LAZY_FILTER_FLAG||type==LAZY_WHILE_FLAG;LazyWrapper.prototype[methodName]=function(iteratee){var result=this.clone();result.__iteratees__.push({'iteratee':getIteratee(iteratee,3),'type':type});result.__filtered__=result.__filtered__||isFilter;return result;};});// Add `LazyWrapper` methods for `_.head` and `_.last`.
arrayEach(['head','last'],function(methodName,index){var takeName='take'+(index?'Right':'');LazyWrapper.prototype[methodName]=function(){return this[takeName](1).value()[0];};});// Add `LazyWrapper` methods for `_.initial` and `_.tail`.
arrayEach(['initial','tail'],function(methodName,index){var dropName='drop'+(index?'':'Right');LazyWrapper.prototype[methodName]=function(){return this.__filtered__?new LazyWrapper(this):this[dropName](1);};});LazyWrapper.prototype.compact=function(){return this.filter(identity);};LazyWrapper.prototype.find=function(predicate){return this.filter(predicate).head();};LazyWrapper.prototype.findLast=function(predicate){return this.reverse().find(predicate);};LazyWrapper.prototype.invokeMap=baseRest(function(path,args){if(typeof path=='function'){return new LazyWrapper(this);}return this.map(function(value){return baseInvoke(value,path,args);});});LazyWrapper.prototype.reject=function(predicate){return this.filter(negate(getIteratee(predicate)));};LazyWrapper.prototype.slice=function(start,end){start=toInteger(start);var result=this;if(result.__filtered__&&(start>0||end<0)){return new LazyWrapper(result);}if(start<0){result=result.takeRight(-start);}else if(start){result=result.drop(start);}if(end!==undefined){end=toInteger(end);result=end<0?result.dropRight(-end):result.take(end-start);}return result;};LazyWrapper.prototype.takeRightWhile=function(predicate){return this.reverse().takeWhile(predicate).reverse();};LazyWrapper.prototype.toArray=function(){return this.take(MAX_ARRAY_LENGTH);};// Add `LazyWrapper` methods to `lodash.prototype`.
baseForOwn(LazyWrapper.prototype,function(func,methodName){var checkIteratee=/^(?:filter|find|map|reject)|While$/.test(methodName),isTaker=/^(?:head|last)$/.test(methodName),lodashFunc=lodash[isTaker?'take'+(methodName=='last'?'Right':''):methodName],retUnwrapped=isTaker||/^find/.test(methodName);if(!lodashFunc){return;}lodash.prototype[methodName]=function(){var value=this.__wrapped__,args=isTaker?[1]:arguments,isLazy=value instanceof LazyWrapper,iteratee=args[0],useLazy=isLazy||isArray(value);var interceptor=function(value){var result=lodashFunc.apply(lodash,arrayPush([value],args));return isTaker&&chainAll?result[0]:result;};if(useLazy&&checkIteratee&&typeof iteratee=='function'&&iteratee.length!=1){// Avoid lazy use if the iteratee has a "length" value other than `1`.
isLazy=useLazy=false;}var chainAll=this.__chain__,isHybrid=!!this.__actions__.length,isUnwrapped=retUnwrapped&&!chainAll,onlyLazy=isLazy&&!isHybrid;if(!retUnwrapped&&useLazy){value=onlyLazy?value:new LazyWrapper(this);var result=func.apply(value,args);result.__actions__.push({'func':thru,'args':[interceptor],'thisArg':undefined});return new LodashWrapper(result,chainAll);}if(isUnwrapped&&onlyLazy){return func.apply(this,args);}result=this.thru(interceptor);return isUnwrapped?isTaker?result.value()[0]:result.value():result;};});// Add `Array` methods to `lodash.prototype`.
arrayEach(['pop','push','shift','sort','splice','unshift'],function(methodName){var func=arrayProto[methodName],chainName=/^(?:push|sort|unshift)$/.test(methodName)?'tap':'thru',retUnwrapped=/^(?:pop|shift)$/.test(methodName);lodash.prototype[methodName]=function(){var args=arguments;if(retUnwrapped&&!this.__chain__){var value=this.value();return func.apply(isArray(value)?value:[],args);}return this[chainName](function(value){return func.apply(isArray(value)?value:[],args);});};});// Map minified method names to their real names.
baseForOwn(LazyWrapper.prototype,function(func,methodName){var lodashFunc=lodash[methodName];if(lodashFunc){var key=lodashFunc.name+'';if(!hasOwnProperty.call(realNames,key)){realNames[key]=[];}realNames[key].push({'name':methodName,'func':lodashFunc});}});realNames[createHybrid(undefined,WRAP_BIND_KEY_FLAG).name]=[{'name':'wrapper','func':undefined}];// Add methods to `LazyWrapper`.
LazyWrapper.prototype.clone=lazyClone;LazyWrapper.prototype.reverse=lazyReverse;LazyWrapper.prototype.value=lazyValue;// Add chain sequence methods to the `lodash` wrapper.
lodash.prototype.at=wrapperAt;lodash.prototype.chain=wrapperChain;lodash.prototype.commit=wrapperCommit;lodash.prototype.next=wrapperNext;lodash.prototype.plant=wrapperPlant;lodash.prototype.reverse=wrapperReverse;lodash.prototype.toJSON=lodash.prototype.valueOf=lodash.prototype.value=wrapperValue;// Add lazy aliases.
lodash.prototype.first=lodash.prototype.head;if(symIterator){lodash.prototype[symIterator]=wrapperToIterator;}return lodash;};/*--------------------------------------------------------------------------*/ // Export lodash.
var _=runInContext();// Some AMD build optimizers, like r.js, check for condition patterns like:
if(true){// Expose Lodash on the global object to prevent errors when Lodash is
// loaded by a script tag in the presence of an AMD loader.
// See http://requirejs.org/docs/errors.html#mismatch for more details.
// Use `_.noConflict` to remove Lodash from the global object.
root._=_;// Define as an anonymous module so, through path mapping, it can be
// referenced as the "underscore" module.
!(__WEBPACK_AMD_DEFINE_RESULT__ = (function(){return _;}).call(exports, __webpack_require__, exports, module),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));}// Check for `exports` after `define` in case a build optimizer adds it.
else {}}).call(this);

/***/ }),

/***/ 1769:
/***/ (function(__unused_webpack_module, exports) {

"use strict";
var __webpack_unused_export__;


__webpack_unused_export__ = ({
  value: true
});
// runtime helper for setting properties on components
// in a tree-shakable way
exports.Z = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	!function() {
/******/ 		__webpack_require__.nmd = function(module) {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "components": function() { return /* binding */ components; }
});

;// CONCATENATED MODULE: ./src/lowcode/anchor/meta.ts
/* harmony default export */ var meta = ({
  group: 'Antd',
  componentName: 'AAnchor',
  title: '锚点',
  category: '基础组件',
  npm: {
    destructuring: true,
    componentName: 'AAnchor'
  },
  snippets: [{
    title: '锚点',
    screenshot: 'https://alifd.alicdn.com/fusion-cool/icons/icon-antd/anchor-1.png',
    schema: {
      componentName: 'AAnchor',
      props: {},
      children: [{
        componentName: 'AAnchorLink',
        props: {
          title: 'Document'
        }
      }, {
        componentName: 'AAnchorLink',
        props: {
          title: 'API'
        }
      }, {
        componentName: 'AAnchorLink',
        props: {
          title: 'Demo'
        }
      }]
    }
  }]
});
;// CONCATENATED MODULE: ./src/lowcode/anchor-link/meta.ts
/* harmony default export */ var anchor_link_meta = ({
  group: 'Antd',
  componentName: 'AAnchorLink',
  title: '锚点链接',
  category: '其他',
  npm: {
    destructuring: true,
    componentName: 'AAnchorLink'
  },
  props: [{
    name: 'href',
    title: {
      label: '锚点链接',
      tip: '锚点链接'
    },
    propType: 'string'
  }, {
    name: 'target',
    title: {
      label: 'target',
      tip: '该属性指定在何处显示链接的资源'
    },
    propType: 'string'
  }, {
    name: 'title',
    title: {
      label: '内容',
      tip: '内容'
    },
    propType: 'string'
  }],
  configure: {
    supports: {
      style: true
    }
  },
  snippets: []
});
;// CONCATENATED MODULE: ./src/lowcode/affix/meta.ts
/* harmony default export */ var affix_meta = ({
  group: 'Antd',
  componentName: 'AAffix',
  title: '固钉',
  category: '基础组件',
  npm: {
    destructuring: true,
    componentName: 'AAffix'
  },
  props: [{
    name: 'offsetBottom',
    title: {
      label: '底部触发距离',
      tip: '距离窗口底部达到指定偏移量后触发'
    },
    propType: 'number'
  }, {
    name: 'offsetTop',
    title: {
      label: '顶部触发距离',
      tip: '距离窗口顶部达到指定偏移量后触发'
    },
    propType: 'number'
  }, {
    name: 'target',
    title: {
      label: '获取触发元素',
      tip: '设置 `Affix` 需要监听其滚动事件的元素，值为一个返回对应 DOM 元素的函数'
    },
    propType: 'func'
  }, {
    name: 'onChange ',
    title: {
      label: '监听状态改变',
      tip: '固定状态改变时触发的回调函数'
    },
    propType: 'func'
  }],
  configure: {
    supports: {
      style: true,
      events: [{
        name: 'onChange ',
        template: "onChange (affixed,${extParams}){\n// 固定状态变更回调函数\nconsole.log('onChange ', affixed);}"
      }]
    }
  },
  snippets: [{
    title: "固钉",
    screenshot: "https://alifd.alicdn.com/fusion-cool/icons/icon-antd/affix-1.jpg",
    schema: {
      componentName: "AAffix",
      props: {
        offsetTop: 100
      },
      children: [{
        componentName: "AButton",
        props: {
          children: "Affix Top"
        }
      }]
    }
  }]
});
;// CONCATENATED MODULE: ./src/lowcode/auto-complete/meta.ts
/* eslint-disable */
// @ts-ignore
/* harmony default export */ var auto_complete_meta = ({
  group: 'Antd',
  componentName: 'AAutoComplete',
  title: '自动补全输入框',
  category: '表单',
  npm: {
    destructuring: true,
    componentName: 'AAutoComplete'
  },
  props: [{
    name: 'defaultValue',
    title: {
      label: '默认值',
      tip: '默认选中值'
    },
    propType: 'string'
  }, {
    name: 'value',
    title: {
      label: '当前值',
      tip: '当前选中值'
    },
    propType: 'string'
  }, {
    name: 'allowClear',
    title: {
      label: '支持清除',
      tip: '是否允许清除'
    },
    propType: 'bool',
    defaultValue: false
  }, {
    name: 'autoFocus',
    title: {
      label: '自动聚焦',
      tip: '自动获取焦点'
    },
    propType: 'bool',
    defaultValue: false
  }, {
    name: 'options',
    title: {
      label: '选项内容',
      tip: '选项列表'
    },
    setter: {
      componentName: 'ArraySetter',
      props: {
        itemSetter: {
          componentName: 'ObjectSetter',
          props: {
            config: {
              items: [{
                name: 'label',
                title: '选项名',
                setter: 'StringSetter'
              }, {
                name: 'value',
                title: '选项值',
                setter: 'StringSetter'
              }]
            }
          },
          initialValue: () => {
            return {
              label: '选项名',
              value: '请选择'
            };
          }
        }
      }
    }
  }, {
    name: 'backfill',
    title: {
      label: '键盘选中回填',
      tip: '使用键盘选择选项的时候把选中项回填到输入框中'
    },
    propType: 'bool',
    defaultValue: false
  }, {
    name: 'defaultActiveFirstOption',
    title: {
      label: '默认高亮首个选项',
      tip: '是否默认高亮第一个选项'
    },
    propType: 'bool',
    defaultValue: true
  }, {
    name: 'disabled',
    title: {
      label: '是否禁用',
      tip: '是否为禁用状态'
    },
    propType: 'bool',
    defaultValue: false
  }, {
    name: 'filterOption',
    title: {
      label: '可选项筛选',
      tip: '是否根据输入项进行筛选'
    },
    propType: 'bool'
  }, {
    name: 'placeholder',
    title: {
      label: '输入框提示',
      tip: '输入框提示'
    },
    propType: 'string'
  }, {
    name: 'onBlur',
    title: {
      label: '失焦回调',
      tip: '失去焦点时的回调'
    },
    propType: 'func'
  }, {
    name: 'onChange',
    title: {
      label: '选中回调',
      tip: '选中 option，或 input 的 value 变化回调'
    },
    propType: 'func'
  }, {
    name: 'defaultOpen',
    title: {
      label: '默认展开菜单',
      tip: '是否默认展开下拉菜单'
    },
    propType: 'bool'
  }, {
    name: 'onDropdownVisibleChange',
    title: '下拉菜单回调',
    propType: 'func'
  }, {
    name: 'onFocus',
    title: '聚焦回调',
    propType: 'func'
  }, {
    name: 'onSearch',
    title: '搜索补全回调',
    propType: 'func'
  }, {
    name: 'onSelect',
    title: '被选中时调用',
    propType: 'func'
  }, {
    name: 'notFoundContent',
    title: {
      label: '无数据展示',
      tip: '当下拉列表为空时显示的内容'
    },
    propType: 'string'
  }],
  configure: {
    props: [{
      name: 'defaultValue',
      title: {
        label: {
          type: 'i18n',
          zh_CN: '默认值',
          en_US: 'Default Value'
        },
        tip: {
          type: 'i18n',
          zh_CN: '属性: defaultValue | 说明: 默认值',
          en_US: 'prop: defaultValue | description: defaultValue'
        }
      },
      setter: 'StringSetter',
      supportVariable: true
    }, {
      name: 'value',
      title: {
        label: {
          type: 'i18n',
          zh_CN: '当前值',
          en_US: 'Value'
        },
        tip: {
          type: 'i18n',
          zh_CN: '属性: Value | 说明: 当前值',
          en_US: 'prop: Value | description: Value'
        }
      },
      setter: 'StringSetter',
      supportVariable: true
    }, {
      name: 'allowClear',
      title: {
        label: {
          type: 'i18n',
          zh_CN: '支持清除',
          en_US: 'Allow Clear'
        },
        tip: {
          type: 'i18n',
          zh_CN: '属性: allowClear | 说明：是否允许清除',
          en_US: 'prop: allowClear | description: Allow Clear'
        }
      },
      setter: 'BoolSetter',
      supportVariable: true
    }, {
      name: 'options',
      title: {
        label: {
          type: 'i18n',
          zh_CN: '选项内容',
          en_US: 'Options'
        },
        tip: {
          type: 'i18n',
          zh_CN: '属性: options | 说明：选项列表',
          en_US: 'prop: options | description: Options'
        }
      },
      setter: {
        componentName: 'ArraySetter',
        props: {
          itemSetter: {
            componentName: 'ObjectSetter',
            props: {
              config: {
                items: [{
                  name: 'label',
                  title: '选项名',
                  setter: 'StringSetter',
                  isRequired: true
                }, {
                  name: 'value',
                  title: '选项值',
                  setter: 'StringSetter',
                  isRequired: true
                }]
              }
            },
            initialValue: () => {
              return {
                label: '选项名',
                value: '请选择'
              };
            }
          }
        }
      }
    }, {
      name: 'autoFocus',
      title: {
        label: {
          type: 'i18n',
          zh_CN: '自动聚焦',
          en_US: 'Auto Focus'
        },
        tip: {
          type: 'i18n',
          zh_CN: '属性: autoFocus | 说明：自动获取焦点',
          en_US: 'prop: autoFocus | description: Auto Focus'
        }
      },
      setter: 'BoolSetter',
      supportVariable: true
    }, {
      name: 'backfill',
      title: {
        label: {
          type: 'i18n',
          zh_CN: '键盘选中回填',
          en_US: 'Backfill'
        },
        tip: {
          type: 'i18n',
          zh_CN: '属性: backfill | 说明：使用键盘选择选项的时候把选中项回填到输入框中',
          en_US: 'prop: backfill | description: When using the keyboard to onSelect options, backfill the onSelected items into the input box'
        }
      },
      setter: 'BoolSetter',
      supportVariable: true
    }, {
      name: 'defaultActiveFirstOption',
      title: {
        label: {
          type: 'i18n',
          zh_CN: '默认高亮首个选项',
          en_US: 'Default Active First Option'
        },
        tip: {
          type: 'i18n',
          zh_CN: '属性: defaultActiveFirstOption | 说明：是否默认高亮第一个选项',
          en_US: 'prop: defaultActiveFirstOption | description: Whether to highlight the first option by default'
        }
      },
      setter: 'BoolSetter',
      defaultValue: true,
      supportVariable: true
    }, {
      name: 'disabled',
      title: {
        label: {
          type: 'i18n',
          zh_CN: '是否禁用',
          en_US: 'Disabled'
        },
        tip: {
          type: 'i18n',
          zh_CN: '属性: disabled | 说明：是否为禁用状态',
          en_US: 'prop: disabled | description: Disable'
        }
      },
      setter: 'BoolSetter',
      supportVariable: true
    }, {
      name: 'filterOption',
      title: {
        label: {
          type: 'i18n',
          zh_CN: '可选项筛选',
          en_US: 'Filter Option'
        },
        tip: {
          type: 'i18n',
          zh_CN: '属性: filterOption | 说明：是否根据输入项进行筛选',
          en_US: 'prop: filterOption | description: Filter based on input'
        }
      },
      setter: 'BoolSetter',
      supportVariable: true
    }, {
      name: 'placeholder',
      title: {
        label: {
          type: 'i18n',
          zh_CN: '输入框提示',
          en_US: 'Placeholder'
        },
        tip: {
          type: 'i18n',
          zh_CN: '属性: placeholder | 说明: 输入框提示',
          en_US: 'prop: placeholder | description: Placeholder'
        }
      },
      setter: 'StringSetter',
      supportVariable: true
    }, {
      name: 'defaultOpen',
      propType: 'bool',
      title: {
        label: {
          type: 'i18n',
          zh_CN: '默认展开菜单',
          en_US: 'Default Open'
        },
        tip: {
          type: 'i18n',
          zh_CN: '属性: defaultOpen | 说明：是否默认展开下拉菜单',
          en_US: 'prop: defaultOpen | description: Expand drop-down menu by default'
        }
      },
      setter: 'BoolSetter',
      supportVariable: true
    }, {
      name: 'notFoundContent',
      title: {
        label: {
          type: 'i18n',
          zh_CN: '无数据展示',
          en_US: 'Not Found Content'
        },
        tip: {
          type: 'i18n',
          zh_CN: '属性: notFoundContent | 说明: 当下拉列表为空时显示的内容',
          en_US: 'prop: notFoundContent | description: Content displayed when the drop-down list is empty'
        }
      },
      setter: 'StringSetter',
      supportVariable: true
    }],
    supports: {
      style: true,
      loop: false,
      events: [{
        name: 'onBlur',
        template: "onBlur(${extParams}){\n// 失去焦点时的回调\nconsole.log('onBlur');}"
      }, {
        name: 'onChange',
        template: "onChange(value){\n//选中 option，或 input 的 value 变化时，调用此函数\nconsole.log('onChange',value);}"
      }, {
        name: 'onDropdownVisibleChange',
        template: "onDropdownVisibleChange(open){\nconsole.log('onDropdownVisibleChange',open);}"
      }, {
        name: 'onFocus',
        template: "onFocus(${extParams}){\n// 获得焦点时的回调\nconsole.log('onFocus');}"
      }, {
        name: 'onSearch',
        template: "onSearch(value){\n// 搜索补全项的时候调用\nconsole.log('onSearch',value);}"
      }, {
        name: 'onSelect',
        template: "onSelect(value,option){\n//被选中时调用，参数为选中项的 value 值\nconsole.log('onSelect',value,option);}"
      }]
    }
  },
  snippets: [{
    title: '自动补全输入框',
    screenshot: 'https://alifd.alicdn.com/fusion-cool/icons/icon-antd/auto-complete-1.png',
    schema: {
      componentName: 'AAutoComplete',
      props: {
        placeholder: '请输入',
        options: [{
          label: '测试1',
          value: 'aaa'
        }, {
          label: '测试2',
          value: 'bbb'
        }],
        filterOption: true,
        style: {
          width: '200px'
        }
      }
    }
  }]
});
;// CONCATENATED MODULE: ./src/lowcode/alert/meta.ts
/* harmony default export */ var alert_meta = ({
  group: 'Antd',
  componentName: "AAlert",
  title: '警告提示',
  category: '反馈',
  npm: {
    destructuring: true,
    componentName: 'AAlert'
  },
  props: [{
    name: 'afterClose',
    title: {
      label: '关闭动画结束后触发的回调函数',
      tip: '关闭动画结束后触发的回调函数'
    },
    propType: 'func'
  }, {
    name: 'banner',
    title: {
      label: '顶部公告',
      tip: '是否用作顶部公告'
    },
    propType: 'bool',
    defaultValue: false
  }, {
    name: 'closable',
    title: {
      label: '可关闭',
      tip: '默认不显示关闭按钮'
    },
    propType: 'bool'
  }, {
    name: 'closeText',
    title: {
      label: '自定义关闭按钮',
      tip: '自定义关闭按钮'
    },
    propType: {
      type: 'oneOfType',
      value: ['string', 'node']
    }
  }, {
    name: 'description',
    title: {
      label: '描述信息',
      tip: '警告提示的辅助性文字介绍'
    },
    propType: {
      type: 'oneOfType',
      value: ['string', 'node']
    }
  }, {
    name: 'icon',
    title: {
      label: '图标',
      tip: '自定义图标，`showIcon` 为 true 时有效'
    },
    propType: 'node'
  }, {
    name: 'message',
    title: {
      label: '警告提示内容',
      tip: '警告提示内容'
    },
    propType: {
      type: 'oneOfType',
      value: ['string', 'node']
    }
  }, {
    name: 'showIcon',
    title: {
      label: '显示图标',
      tip: '是否显示辅助图标'
    },
    propType: 'bool'
  }, {
    name: 'type',
    title: {
      label: '类型',
      tip: '类型'
    },
    propType: {
      type: 'oneOf',
      value: ['success', 'info', 'warning', 'error']
    }
  }, {
    name: 'onClose',
    title: {
      label: '关闭时触发的回调函数',
      tip: '关闭时触发的回调函数'
    },
    propType: 'func'
  }],
  configure: {
    supports: {
      style: true,
      events: [{
        name: 'close',
        template: "close(event,${extParams}){\n// 关闭时触发的回调函数\nconsole.log('close',event);}"
      }]
    }
  },
  snippets: [{
    title: '成功提示',
    screenshot: 'https://alifd.alicdn.com/fusion-cool/icons/icon-antd/alert-1.png',
    schema: {
      componentName: 'AAlert',
      props: {
        message: 'Success Tips',
        description: 'Detailed description and advice about successful copywriting.',
        type: 'success',
        showIcon: true
      }
    }
  }, {
    title: '信息提示',
    screenshot: 'https://alifd.alicdn.com/fusion-cool/icons/icon-antd/alert-2.png',
    schema: {
      componentName: 'AAlert',
      props: {
        message: 'Informational Notes',
        description: 'Additional description and information about copywriting.',
        type: 'info',
        showIcon: true
      }
    }
  }, {
    title: '警告提示',
    screenshot: 'https://alifd.alicdn.com/fusion-cool/icons/icon-antd/alert-3.png',
    schema: {
      componentName: 'AAlert',
      props: {
        message: 'Warning',
        description: 'This is a warning notice about copywriting.',
        type: 'warning',
        showIcon: true
      }
    }
  }, {
    title: '错误提示',
    screenshot: 'https://alifd.alicdn.com/fusion-cool/icons/icon-antd/alert-4.png',
    schema: {
      componentName: 'AAlert',
      props: {
        message: 'Error',
        description: 'This is an error message about copywriting.',
        type: 'error',
        showIcon: true
      }
    }
  }]
});
;// CONCATENATED MODULE: ./src/lowcode/badge/meta.ts
/* harmony default export */ var badge_meta = ([{
  group: 'Antd',
  componentName: "ABadge",
  title: "徽章",
  category: "数据展示",
  npm: {
    destructuring: true,
    componentName: "ABadge"
  },
  props: [{
    name: 'color',
    title: {
      label: '圆点颜色',
      tip: '自定义小圆点的颜色'
    },
    propType: 'string',
    setter: 'StringSetter'
  }, {
    name: 'count',
    title: {
      label: '展示数字',
      tip: '展示的数字，大于 overflowCount 时显示为 `${overflowCount}+`，为 0 时隐藏'
    },
    propType: {
      type: 'oneOfType',
      value: ['node', 'number', 'string']
    }
  }, {
    name: 'dot',
    title: {
      label: '展示圆点',
      tip: '不展示数字，只有一个小红点'
    },
    propType: 'bool',
    defaultValue: false
  }, {
    name: 'offset',
    title: {
      label: '圆点偏移',
      tip: '设置状态点的位置偏移 [number, number]'
    },
    propType: {
      type: 'arrayOf',
      value: 'number'
    }
  }, {
    name: 'overflowCount',
    title: {
      label: '封顶值',
      tip: '展示封顶的数字值'
    },
    propType: 'number'
  }, {
    name: 'showZero',
    title: {
      label: '展示零值',
      tip: '当数值为 0 时，是否展示 Badge'
    },
    propType: 'bool',
    defaultValue: false
  }, {
    name: 'status',
    title: {
      label: '状态',
      tip: '设置 Badge 为状态点'
    },
    propType: {
      type: 'oneOf',
      value: ['success', 'processing', 'default', 'error', 'warning']
    }
  }, {
    name: 'text',
    title: {
      label: '状态文本',
      tip: '在设置了 `status` 的前提下有效，设置状态点的文本'
    },
    condition(target) {
      return !!target.getProps().getPropValue('status');
    },
    propType: 'string'
  }, {
    name: 'title',
    title: {
      label: '悬浮提示',
      tip: '设置鼠标放在状态点上时显示的文字'
    },
    propType: 'string'
  }],
  configure: {
    supports: {
      style: true
    }
  },
  snippets: [{
    title: "徽章",
    screenshot: "https://alifd.alicdn.com/fusion-cool/icons/icon-antd/badge-1.png",
    schema: {
      componentName: "ABadge",
      props: {
        count: 25
      }
    }
  }]
}]);
;// CONCATENATED MODULE: ./src/lowcode/avatar/meta.ts
/* eslint-disable */
const meta_meta = {
  group: 'Antd',
  componentName: 'AAvatar',
  title: '头像',
  category: '数据展示',
  props: [{
    name: 'icon',
    title: {
      label: '图标头像',
      tip: '设置头像的图标类型'
    },
    propType: 'node'
  }, {
    name: 'shape',
    title: {
      label: '形状',
      tip: '指定头像的形状'
    },
    propType: {
      type: 'oneOf',
      value: ['circle', 'square']
    },
    setter: {
      componentName: 'RadioGroupSetter',
      props: {
        options: [{
          title: 'circle',
          value: 'circle'
        }, {
          title: 'square',
          value: 'square'
        }]
      }
    },
    defaultValue: 'circle'
  }, {
    name: 'size',
    title: {
      label: '尺寸',
      tip: '设置头像的大小'
    },
    setter: {
      componentName: 'MixedSetter',
      props: {
        setters: [{
          componentName: 'RadioGroupSetter',
          props: {
            options: [{
              label: 'default',
              value: 'default'
            }, {
              label: 'large',
              value: 'large'
            }, {
              label: 'small',
              value: 'small'
            }]
          }
        }, 'NumberSetter']
      }
    },
    defaultValue: 'default'
  }, {
    name: 'src',
    title: {
      label: '图片地址',
      tip: '图片类头像的资源地址'
    },
    propType: 'string',
    setter: 'StringSetter'
  }, {
    name: 'alt',
    title: {
      label: '替代文本',
      tip: '图像无法显示时的替代文本'
    },
    propType: 'string',
    setter: 'StringSetter'
  }, {
    name: 'loadError',
    title: {
      label: '图片加载失败的事件',
      tip: '图片加载失败的事件，返回 false 会关闭组件默认的 fallback 行为'
    },
    propType: 'func'
  }, {
    name: 'crossOrigin',
    title: {
      label: 'cors 属性设置',
      tip: 'cors 属性设置'
    },
    propType: {
      type: 'oneOf',
      value: ['anonymous', 'use-credentials', '']
    },
    setter: {
      componentName: 'RadioGroupSetter',
      props: {
        options: [{
          label: 'anonymous',
          value: 'anonymous'
        }, {
          label: 'use-credentials',
          value: 'use-credentials'
        }, {
          label: 'default',
          value: ''
        }]
      }
    }
  }, {
    name: 'src',
    title: {
      label: '允许拖动',
      tip: '图片是否允许拖动'
    },
    setter: 'BoolSetter'
  }, {
    name: 'srcset',
    title: {
      label: '图片资源地址',
      tip: '设置图片类头像响应式资源地址'
    },
    propType: 'string',
    setter: 'StringSetter'
  }, {
    name: 'gap',
    title: {
      label: '文字边距',
      tip: '字符类型距离左右两侧边界单位像素'
    },
    propType: 'number',
    setter: 'NumberSetter',
    defaultValue: 4
  }, {
    name: 'draggable',
    title: {
      label: '拖动',
      tip: '图片是否允许拖动'
    },
    propType: 'bool',
    setter: 'BoolSetter'
  }],
  configure: {
    supports: {
      style: true,
      events: [{
        name: 'loadError',
        template: "loadError(${extParams}){\n// 图片加载失败的事件\nconsole.log('loadError');}"
      }]
    }
  },
  snippets: [{
    title: '头像',
    screenshot: "https://alifd.alicdn.com/fusion-cool/icons/icon-antd/avatar-1.jpg",
    schema: {
      componentName: 'AAvatar',
      props: {
        src: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        size: 'default'
      }
    }
  }]
};
/* harmony default export */ var avatar_meta = (meta_meta);
;// CONCATENATED MODULE: ./src/lowcode/button/meta.ts
/* eslint-disable */
// @ts-ignore
/* harmony default export */ var button_meta = ({
  group: 'Antd',
  componentName: 'AButton',
  title: '按钮',
  category: '基础组件',
  npm: {
    destructuring: true,
    componentName: 'AButton'
  },
  props: [{
    title: '功能',
    display: 'block',
    type: 'group',
    items: [{
      name: 'children',
      title: {
        label: '内容',
        tip: 'children | 内容'
      },
      propType: {
        type: 'oneOfType',
        value: ['node', 'string']
      },
      setter: ['SlotSetter', 'StringSetter', 'VariableSetter']
    }, {
      name: 'htmlType',
      title: {
        label: '原生类型',
        tip: 'htmlType | 设置 `button` 原生的 `type` 值'
      },
      propType: {
        type: 'oneOf',
        value: ['submit', 'reset', 'button']
      },
      setter: [{
        componentName: 'RadioGroupSetter',
        props: {
          options: [{
            title: 'Submit',
            value: 'submit'
          }, {
            title: 'Reset',
            value: 'reset'
          }, {
            title: 'Button',
            value: 'button'
          }]
        }
      }, 'VariableSetter'],
      defaultValue: 'button'
    }, {
      name: 'href',
      title: {
        label: '跳转地址',
        tip: 'href | 点击跳转的地址，指定此属性 button 的行为和 a 链接一致'
      },
      propType: 'string',
      setter: ['StringSetter', 'VariableSetter']
    }, {
      name: 'target',
      title: {
        label: 'Target',
        tip: 'target | 相当于 a 链接的 target 属性，href 存在时生效'
      },
      propType: {
        type: 'oneOf',
        value: ['_self', '_blank', '_parent', '_top']
      },
      setter: [{
        componentName: 'SelectSetter',
        props: {
          options: [{
            title: '本窗口跳转',
            value: '_self'
          }, {
            title: '打开新标签页',
            value: '_blank'
          }, {
            title: '父窗口跳转',
            value: '_parent'
          }, {
            title: '顶层窗口跳转',
            value: '_top'
          }]
        }
      }, 'StringSetter', 'VariableSetter'],
      condition: {
        type: 'JSFunction',
        value: 'target => !!target.getProps().getPropValue("href")?.trim()'
      }
    }]
  }, {
    title: '外观',
    display: 'block',
    type: 'group',
    items: [{
      name: 'type',
      title: {
        label: '类型',
        tip: 'type | 设置按钮类型'
      },
      propType: {
        type: 'oneOf',
        value: ['primary', 'ghost', 'dashed', 'danger', 'link', 'text']
      },
      setter: [{
        componentName: 'SelectSetter',
        props: {
          options: [{
            title: '主按钮',
            value: 'primary'
          }, {
            title: '虚线框按钮',
            value: 'dashed'
          }, {
            title: '危险按钮',
            value: 'danger'
          }, {
            title: '链接按钮',
            value: 'link'
          }, {
            title: '类文本按钮',
            value: 'text'
          }]
        }
      }, 'VariableSetter']
    }, {
      name: 'size',
      title: {
        label: '尺寸',
        tip: 'size | 设置按钮大小'
      },
      propType: {
        type: 'oneOf',
        value: ['large', 'middle', 'small']
      },
      setter: [{
        componentName: 'RadioGroupSetter',
        props: {
          options: [{
            title: '大',
            value: 'large'
          }, {
            title: '中',
            value: 'middle'
          }, {
            title: '小',
            value: 'small'
          }]
        }
      }, 'VariableSetter'],
      defaultValue: 'middle'
    }, {
      name: 'shape',
      title: {
        label: '形状',
        tip: 'shape | 设置按钮形状，可选值为 `circle`、 `round` 或者不设'
      },
      propType: {
        type: 'oneOf',
        value: ['default', 'circle', 'round']
      },
      defaultValue: 'default',
      setter: [{
        componentName: 'RadioGroupSetter',
        props: {
          options: [{
            title: '默认',
            value: 'default'
          }, {
            title: '圆形',
            value: 'circle'
          }, {
            title: '圆角',
            value: 'round'
          }]
        }
      }, 'VariableSetter']
    }, {
      name: 'icon',
      title: {
        label: '图标',
        tip: 'icon | 设置按钮的图标组件'
      },
      propType: 'node',
      setter: {
        componentName: 'SlotSetter',
        initialValue: {
          type: 'JSSlot',
          value: [{
            componentName: 'AIcon',
            props: {
              type: 'SmileOutlined',
              size: 20,
              rotate: 0,
              spin: false
            }
          }]
        }
      }
    }, {
      name: 'block',
      title: {
        label: '自适应',
        tip: 'block | 将按钮宽度调整为其父宽度的选项'
      },
      propType: 'bool',
      setter: 'BoolSetter',
      defaultValue: false
    }, {
      name: 'danger',
      title: {
        label: '危险按钮',
        tip: 'danger | 设置危险按钮'
      },
      propType: 'bool',
      setter: 'BoolSetter',
      defaultValue: false
    }, {
      name: 'ghost',
      title: {
        label: '幽灵属性',
        tip: 'ghost | 幽灵属性，使按钮背景透明'
      },
      propType: 'bool',
      setter: 'BoolSetter',
      defaultValue: false
    }]
  }, {
    title: '状态',
    display: 'block',
    type: 'group',
    items: [{
      name: 'loading',
      title: {
        label: '载入状态',
        tip: 'loading | 设置按钮载入状态'
      },
      propType: 'bool',
      setter: ['BoolSetter', 'VariableSetter']
    }, {
      name: 'disabled',
      title: {
        label: '是否禁用',
        tip: 'disabled | 是否为禁用状态'
      },
      propType: 'bool',
      setter: ['BoolSetter', 'VariableSetter'],
      defaultValue: false
    }]
  }, {
    name: 'onClick',
    title: {
      label: '点击回调',
      tip: '点击按钮时的回调'
    },
    propType: 'func'
  }],
  configure: {
    supports: {
      events: [{
        name: 'onClick',
        template: "onClick(event,${extParams}){\n// 点击按钮时的回调\nconsole.log('onClick', event);}"
      }],
      style: true
    }
  },
  snippets: [{
    title: "主按钮",
    screenshot: "https://alifd.alicdn.com/fusion-cool/icons/icon-antd/button-1.png",
    schema: {
      componentName: 'AButton',
      props: {
        type: "primary",
        children: "主按钮"
      }
    }
  }, {
    title: "次按钮",
    screenshot: "https://alifd.alicdn.com/fusion-cool/icons/icon-antd/button-2.png",
    schema: {
      componentName: "AButton",
      props: {
        type: "default",
        children: "次按钮"
      }
    }
  }, {
    title: "危险按钮",
    screenshot: "https://alifd.alicdn.com/fusion-cool/icons/icon-antd/button-3.png",
    schema: {
      componentName: "AButton",
      props: {
        type: "danger",
        children: "危险按钮"
      }
    }
  }, {
    title: "文字按钮",
    screenshot: "https://alifd.alicdn.com/fusion-cool/icons/icon-antd/button-4.png",
    schema: {
      componentName: "AButton",
      props: {
        type: "text",
        children: "文字按钮"
      }
    }
  }, {
    title: "虚框按钮",
    screenshot: "https://alifd.alicdn.com/fusion-cool/icons/icon-antd/button-5.png",
    schema: {
      componentName: "AButton",
      props: {
        type: "dashed",
        children: "虚框按钮"
      }
    }
  }, {
    title: "链接按钮",
    screenshot: "https://alifd.alicdn.com/fusion-cool/icons/icon-antd/button-6.png",
    schema: {
      componentName: "AButton",
      props: {
        type: "link",
        children: "链接按钮"
      }
    }
  }]
});
;// CONCATENATED MODULE: ./src/lowcode/back-top/meta.ts
/* harmony default export */ var back_top_meta = ({
  group: 'Antd',
  componentName: 'ABackTop',
  title: '回到顶部',
  category: '导航',
  npm: {
    destructuring: true,
    componentName: 'ABackTop'
  },
  props: [{
    name: 'target',
    title: {
      label: '监听元素',
      tip: '设置需要监听其滚动事件的元素，值为一个返回对应 DOM 元素的函数'
    },
    propType: 'func'
  }, {
    name: 'visibilityHeight',
    title: {
      label: '可见高度',
      tip: '滚动高度达到此参数值才出现 BackTop'
    },
    propType: 'number'
  }, {
    name: 'click',
    title: {
      label: '点击按钮的回调函数',
      tip: '点击按钮的回调函数'
    },
    propType: 'func'
  }, {
    name: 'duration',
    title: {
      label: '滚动时间',
      tip: '回到顶部所需时间（ms）'
    },
    propType: 'number'
  }],
  configure: {
    supports: {
      style: true,
      events: [{
        name: 'click',
        template: "click(${extParams}){\n// 点击按钮的回调函数\nconsole.log('click');}"
      }]
    }
  },
  snippets: [{
    title: "回到顶部",
    screenshot: "https://alifd.alicdn.com/fusion-cool/icons/icon-antd/back-top-1.jpg",
    schema: {
      componentName: "ABackTop",
      props: {}
    }
  }]
});
;// CONCATENATED MODULE: ./src/lowcode/breadcrumb/meta.ts
/* harmony default export */ var breadcrumb_meta = ({
  group: 'Antd',
  componentName: 'ABreadcrumb',
  title: '面包屑',
  category: '基础组件',
  npm: {
    destructuring: true,
    componentName: 'ABreadcrumb'
  },
  props: [{
    title: '基础',
    display: 'block',
    type: 'group',
    items: [{
      name: 'routes',
      title: {
        label: '路由栈信息',
        tip: 'router 的路由栈信息'
      },
      propType: {
        type: 'arrayOf',
        value: {
          type: 'shape',
          value: [{
            name: 'path',
            propType: 'string'
          }, {
            name: 'breadcrumbName',
            propType: 'string'
          }]
        }
      },
      setter: {
        componentName: 'ArraySetter',
        props: {
          itemSetter: {
            componentName: 'ObjectSetter',
            props: {
              config: {
                items: [{
                  name: 'path',
                  title: {
                    label: '路由路径',
                    tip: 'path | 路由路径'
                  },
                  propType: 'string',
                  setter: 'StringSetter',
                  isRequired: true
                }, {
                  name: 'breadcrumbName',
                  title: {
                    label: '路由名称',
                    tip: 'breadcrumbName | 路由名称'
                  },
                  propType: 'string',
                  setter: 'StringSetter',
                  isRequired: true
                }]
              }
            },
            initialValue: {
              path: 'path',
              breadcrumbName: 'breadcrumbName'
            }
          }
        }
      }
    }, {
      name: 'params',
      title: {
        label: '路由的参数',
        tip: '路由的参数'
      },
      propType: 'object',
      setter: 'JsonSetter'
    }, {
      name: 'separator',
      title: {
        label: '分隔符自定义',
        tip: '分隔符自定义'
      },
      propType: {
        type: 'oneOfType',
        value: ['string', 'node']
      },
      setter: ['StringSetter', {
        componentName: 'SlotSetter',
        initialValue: {
          type: 'JSSlot',
          value: []
        }
      }, 'VariableSetter']
    }]
  }, {
    title: '扩展',
    display: 'block',
    type: 'group',
    items: [{
      name: 'itemRender',
      title: {
        label: '自定义渲染',
        tip: 'itemRender | 自定义渲染'
      },
      propType: {
        type: 'oneOfType',
        value: ['func', 'node']
      },
      setter: [{
        componentName: 'SlotSetter',
        title: '自定义渲染插槽',
        initialValue: {
          type: 'JSSlot',
          params: ['route', 'params', 'routes', 'paths'],
          value: []
        }
      }, {
        componentName: 'FunctionSetter',
        props: {
          template: 'itemRender(route, params, routes, paths,${extParams}){\n// 自定义渲染\nreturn `${route.breadcrumbName}`}'
        }
      }, 'VariableSetter']
    }]
  }],
  configure: {
    supports: {
      style: true
    }
  },
  snippets: [{
    title: "面包屑",
    screenshot: "https://alifd.alicdn.com/fusion-cool/icons/icon-antd/breadcrumb-1.jpg",
    schema: {
      componentName: "ABreadcrumb",
      props: {
        routes: [{
          path: "home",
          breadcrumbName: "Home"
        }, {
          path: "order",
          breadcrumbName: "Order"
        }, {
          path: "app",
          breadcrumbName: "An application"
        }],
        itemRender: {
          type: 'JSSlot',
          params: ['route', 'params', 'routes', 'paths'],
          value: [{
            componentName: 'ATypographyLink',
            props: {
              href: {
                type: 'JSExpression',
                value: 'this.route.path'
              },
              children: {
                type: 'JSExpression',
                value: 'this.route.breadcrumbName'
              }
            }
          }]
        }
      }
    }
  }]
});
;// CONCATENATED MODULE: ./src/lowcode/calendar/meta.ts
/* harmony default export */ var calendar_meta = ({
  group: 'Antd',
  componentName: 'ACalendar',
  title: '日历',
  category: '数据展示',
  npm: {
    destructuring: true,
    componentName: 'ACalendar'
  },
  props: [{
    name: 'defaultValue',
    title: {
      label: '默认值',
      tip: '默认展示的日期'
    },
    propType: 'date',
    setter: 'DateSetter'
  }, {
    name: 'disabledDate',
    title: {
      label: '不可选日期',
      tip: '不可选择的日期'
    },
    propType: 'func'
  }, {
    name: 'dateCellRender',
    title: {
      label: '自定义日期追加渲染',
      tip: '自定义渲染日期单元格，返回内容会被追加到单元格'
    },
    propType: 'func'
  }, {
    name: 'dateFullCellRender',
    title: {
      label: '自定义渲染日期单元格，返回内容覆盖单元格',
      tip: '自定义渲染日期单元格，返回内容覆盖单元格'
    },
    propType: 'func'
  }, {
    name: 'fullscreen',
    title: {
      label: '全屏显示',
      tip: '是否全屏显示'
    },
    propType: 'bool',
    defaultValue: true
  }, {
    name: 'mode',
    title: {
      label: '初始模式',
      tip: '初始模式'
    },
    propType: {
      type: 'oneOf',
      value: ['month', 'year']
    },
    defaultValue: 'month'
  }, {
    name: 'valueFormat',
    title: {
      label: '格式',
      tip: "绑定值的格式"
    },
    propType: 'string',
    defaultValue: 'YYYY-MM-DD',
    setter: 'StringSetter'
  }],
  configure: {
    supports: {
      style: true,
      events: [{
        name: 'onPanelChange',
        template: "onPanelChange(date,mode,${extParams}){\n// 日期面板变化回调\nconsole.log('onPanelChange', date, mode);}"
      }, {
        name: 'onSelect',
        template: "onSelect(date,${extParams}){\n// 点击选择日期回调\nconsole.log('onSelect', date);}"
      }, {
        name: 'onChange',
        template: "onChange (date,${extParams}){\n// 日期变化回调\nconsole.log('onChange', date);}"
      }]
    }
  },
  snippets: [{
    title: '日历',
    screenshot: "https://alifd.alicdn.com/fusion-cool/icons/icon-antd/calendar-1.jpg",
    schema: {
      componentName: "ACalendar",
      props: {}
    }
  }]
});
;// CONCATENATED MODULE: ./src/lowcode/card/meta.ts
/* harmony default export */ var card_meta = ({
  componentName: 'ACard',
  title: '卡片',
  category: '数据展示',
  npm: {
    destructuring: true,
    componentName: 'ACard'
  },
  props: [{
    name: 'activeTabKey',
    title: {
      label: '激活key',
      tip: '当前激活页签的 key'
    },
    propType: 'string',
    setter: 'StringSetter',
    supportVariable: true
  }, {
    name: 'defaultActiveTabKey',
    title: {
      label: '初始化激活key',
      tip: '初始化选中页签的 key，如果没有设置 activeTabKey'
    },
    propType: 'string',
    setter: 'StringSetter',
    supportVariable: true
  }, {
    name: 'title',
    title: {
      label: '卡片标题',
      tip: '卡片标题'
    },
    propType: {
      type: 'oneOfType',
      value: ['string', 'node']
    }
  }, {
    name: 'bordered',
    title: {
      label: '显示边框',
      tip: '是否有边框'
    },
    propType: 'bool',
    defaultValue: true
  }, {
    name: 'bodyStyle',
    title: {
      label: '内容样式',
      tip: '内容区域自定义样式'
    },
    propType: 'object'
  }, {
    name: 'headStyle',
    title: {
      label: '标题样式',
      tip: '自定义标题区域样式'
    },
    propType: 'object'
  }, {
    name: 'extra',
    title: {
      label: '额外元素',
      tip: '卡片右上角的操作区域'
    },
    propType: {
      type: 'oneOfType',
      value: ['string', 'node']
    }
  }, {
    name: 'hoverable',
    title: {
      label: '可浮起',
      tip: '鼠标移过时可浮起'
    },
    propType: 'bool',
    defaultValue: false
  }, {
    name: 'loading',
    title: {
      label: 'loading',
      tip: '当卡片内容还在加载中时，可以用 loading 展示一个占位'
    },
    propType: 'bool',
    defaultValue: false
  }, {
    name: 'size',
    title: {
      label: '尺寸',
      tip: 'card 的尺寸'
    },
    propType: {
      type: 'oneOf',
      value: ['default', 'small']
    },
    defaultValue: 'default'
  }, {
    name: 'type',
    title: {
      label: '卡片类型',
      tip: '卡片类型'
    },
    propType: {
      type: 'oneOf',
      value: ['default', 'inner']
    },
    defaultValue: 'default'
  }],
  configure: {
    component: {
      isContainer: true
    },
    supports: {
      style: true
    },
    events: [{
      name: 'onTabChange',
      template: "onTabChange(key,${extParams}){\n// 页签切换的回调\nconsole.log('onTabChange', key);}"
    }]
  },
  snippets: [{
    title: "卡片",
    screenshot: "https://alifd.alicdn.com/fusion-cool/icons/icon-antd/card-1.png",
    schema: {
      componentName: "ACard",
      props: {
        title: "Default card for lyl",
        style: {
          width: "300px"
        }
      }
    }
  }]
});
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.push.js
var es_array_push = __webpack_require__(7658);
// EXTERNAL MODULE: ./node_modules/lodash/lodash.js
var lodash = __webpack_require__(313);
;// CONCATENATED MODULE: ./src/utils/index.ts
// @ts-ignore

// simple uuid
function uuid() {
  return (Math.random() * 1e6 >> 0).toString(36);
}
;// CONCATENATED MODULE: ./src/lowcode/carousel/meta.ts


/* harmony default export */ var carousel_meta = ({
  group: 'Antd',
  componentName: 'ACarousel',
  title: '走马灯',
  category: '数据展示',
  npm: {
    destructuring: true,
    componentName: 'ACarousel'
  },
  props: [{
    name: 'autoplay',
    title: {
      label: '自动切换',
      tip: '是否自动切换'
    },
    propType: 'bool',
    setter: 'BoolSetter',
    defaultValue: false
  }, {
    name: 'dotPosition',
    title: {
      label: '指示点位置',
      tip: '面板指示点位置'
    },
    propType: {
      type: 'oneOf',
      value: ['top', 'bottom', 'left', 'right']
    },
    setter: {
      componentName: 'SelectSetter',
      props: {
        options: [{
          title: 'top',
          value: 'top'
        }, {
          title: 'bottom',
          value: 'bottom'
        }, {
          title: 'left',
          value: 'left'
        }, {
          title: 'right',
          value: 'right'
        }]
      }
    },
    defaultValue: 'bottom'
  }, {
    name: 'dot',
    title: {
      label: '展示指示点',
      tip: '是否显示面板指示点'
    },
    propType: 'bool',
    setter: 'BoolSetter',
    defaultValue: true
  }, {
    name: 'dotsClass',
    title: {
      label: '指示点类名',
      tip: '面板指示点类名'
    },
    propType: 'string',
    setter: 'StringSetter',
    defaultValue: 'slick-dots'
  }, {
    name: 'easing',
    title: {
      label: '动画效果',
      tip: '动画效果'
    },
    propType: 'string',
    defaultValue: 'linear'
  }, {
    name: 'effect',
    title: {
      label: '动画效果函数',
      tip: '动画效果函数'
    },
    propType: {
      type: 'oneOf',
      value: ['scrollx', 'fade']
    }
  }, {
    name: 'items',
    title: '折叠项',
    setter: {
      componentName: 'ArraySetter',
      props: {
        itemSetter: {
          componentName: 'ObjectSetter',
          initialValue: () => {
            return {
              key: uuid()
            };
          }
        }
      }
    },
    extraProps: {
      getValue(target) {
        console.log('getValue', target.node.children.length);
        const map = target.node.children.map(child => {
          const key = child.getPropValue('key') ? String(child.getPropValue('key')) : child.id;
          return {
            key
          };
        });
        return map;
      },
      setValue(target, value) {
        const {
          node
        } = target;
        const map = {};
        if (!Array.isArray(value)) {
          value = [];
        }
        value.forEach(item => {
          const tabItem = Object.assign({}, item);
          // @ts-ignore
          map[item.key] = tabItem;
        });
        node.children.mergeChildren(child => {
          const key = String(child.getPropValue('key'));
          if (Object.hasOwnProperty.call(map, key)) {
            // @ts-ignore
            delete map[key];
            return false;
          }
          return true;
        }, () => {
          const items = [];
          for (const key in map) {
            if (Object.hasOwnProperty.call(map, key)) {
              items.push({
                componentName: 'Card',
                // @ts-ignore
                props: map[key]
              });
            }
          }
          return items;
        }, (child1, child2) => {
          const a = value.findIndex(item => String(item.key) === String(child1.getPropValue('key')));
          const b = value.findIndex(item => String(item.key) === String(child2.getPropValue('key')));
          return a - b;
        });
      }
    }
  }, {
    name: 'afterChange',
    title: {
      label: '切换面板的回调',
      tip: 'afterChange|切换面板的回调'
    },
    propType: 'func'
  }, {
    name: 'beforeChange',
    title: {
      label: '切换面板的回调',
      tip: 'beforeChange|切换面板的回调'
    },
    propType: 'func'
  }],
  configure: {
    component: {
      isContainer: true
    },
    supports: {
      style: true
    },
    events: [{
      name: 'onChange ',
      template: "onChange (time,timeString,${extParams}){\n// 时间发生变化的回调\nconsole.log('onChange ',time,timeString);}"
    }, {
      name: 'onOpenChange',
      template: "onOpenChange(open,${extParams}){\n// 面板打开/关闭时的回调\nconsole.log('onOpenChange',open);}"
    }]
  },
  snippets: [{
    title: "走马灯",
    screenshot: "https://alifd.alicdn.com/fusion-cool/icons/icon-antd/carousel-1.jpg",
    schema: {
      componentName: "ACarousel",
      children: [{
        componentName: "ACard",
        props: {
          key: "panel 1"
        }
      }, {
        componentName: "ACard",
        props: {
          key: "panel 2"
        }
      }, {
        componentName: "ACard",
        props: {
          key: "panel 3"
        }
      }]
    }
  }]
});
;// CONCATENATED MODULE: ./src/lowcode/checkbox/meta.ts
/* eslint-disable */
// @ts-ignore
/* harmony default export */ var checkbox_meta = ({
  group: 'Antd',
  componentName: 'ACheckbox',
  title: '多选框',
  category: '表单',
  npm: {
    destructuring: true,
    componentName: 'ACheckbox'
  },
  props: [{
    name: 'children',
    title: {
      label: '内容',
      tip: '内容'
    },
    propType: 'string',
    setter: 'StringSetter',
    supportVariable: true
  }, {
    name: 'autoFocus',
    title: {
      label: '自动聚焦',
      tip: '自动获取焦点'
    },
    propType: 'bool',
    defaultValue: false,
    setter: 'BoolSetter',
    supportVariable: true
  }, {
    name: 'checked',
    title: {
      label: '当前值',
      tip: '指定当前是否选中'
    },
    propType: 'bool',
    defaultValue: false,
    setter: 'BoolSetter',
    supportVariable: true
  }, {
    name: 'defaultChecked',
    title: {
      label: '默认值',
      tip: '初始是否选中'
    },
    propType: 'bool',
    defaultValue: false,
    setter: 'BoolSetter',
    supportVariable: true
  }, {
    name: 'disabled',
    title: {
      label: '是否禁用',
      tip: '是否为禁用状态'
    },
    propType: 'bool',
    defaultValue: false,
    setter: 'BoolSetter',
    supportVariable: true
  }, {
    name: 'indeterminate',
    title: {
      label: '不确定状态',
      tip: 'indeterminate状态'
    },
    propType: 'bool',
    defaultValue: false,
    setter: 'BoolSetter',
    supportVariable: true
  }, {
    name: 'onChange',
    title: {
      label: '变化时回调函数',
      tip: '变化时回调函数'
    },
    propType: 'func'
  }],
  configure: {
    component: {
      isContainer: true
    },
    supports: {
      style: true,
      events: [{
        name: 'onChange',
        template: "onChange(event,${extParams}){\n// 变化时回调函数\nconsole.log('onChange', event);}"
      }]
    }
  },
  snippets: [{
    title: '多选框',
    screenshot: 'https://alifd.alicdn.com/fusion-cool/icons/icon-antd/checkbox-1.png',
    schema: {
      componentName: 'ACheckbox',
      props: {
        children: 'checkbox'
      }
    }
  }]
});
;// CONCATENATED MODULE: ./src/lowcode/cascader/meta.ts
/* eslint-disable */
// @ts-ignore
/* harmony default export */ var cascader_meta = ({
  group: 'Antd',
  componentName: 'ACascader',
  title: '级联选择',
  category: '表单',
  npm: {
    destructuring: true,
    componentName: 'ACascader'
  },
  props: [{
    name: 'defaultValue',
    title: {
      label: '默认的选中项',
      tip: '默认的选中项'
    },
    propType: {
      type: 'arrayOf',
      value: {
        type: 'oneOfType',
        value: ['string', 'number']
      }
    }
  }, {
    name: 'value',
    title: {
      label: '当前选中项',
      tip: '当前选中项'
    },
    propType: {
      type: 'arrayOf',
      value: {
        type: 'oneOfType',
        value: ['string', 'number']
      }
    }
  }, {
    name: 'options',
    title: {
      label: '选项数据',
      tip: '可选项数据源'
    },
    setter: 'JsonSetter'
  }, {
    name: 'allowClear',
    title: {
      label: '支持清除',
      tip: '是否允许清除'
    },
    propType: 'bool',
    defaultValue: true,
    setter: 'BoolSetter'
  }, {
    name: 'autoFocus',
    title: {
      label: '自动聚焦',
      tip: '自动获取焦点'
    },
    propType: 'bool',
    defaultValue: false,
    setter: 'BoolSetter'
  }, {
    name: 'bordered',
    title: {
      label: '显示边框',
      tip: '是否有边框'
    },
    propType: 'bool',
    defaultValue: true,
    setter: 'BoolSetter'
  }, {
    name: 'changeOnSelect',
    title: {
      label: '点选触发',
      tip: '点选每级菜单选项值都会触发onChange'
    },
    propType: 'bool',
    defaultValue: false,
    setter: 'BoolSetter'
  }, {
    name: 'disabled',
    title: {
      label: '是否禁用',
      tip: '是否为禁用状态'
    },
    propType: 'bool',
    defaultValue: false,
    setter: 'BoolSetter'
  }, {
    name: 'expandTrigger',
    title: {
      label: '菜单触发方式',
      tip: '触发次级菜单的展开的方式'
    },
    propType: {
      type: 'oneOf',
      value: ['click', 'hover']
    }
  }, {
    name: 'notFoundContent',
    title: {
      label: '无数据展示',
      tip: '无数据'
    },
    propType: 'string',
    setter: 'StringSetter'
  }, {
    name: 'placeholder',
    title: {
      label: '输入框占位文本',
      tip: '输入框占位文本'
    },
    propType: 'string',
    setter: 'StringSetter'
  }, {
    name: 'placement',
    title: {
      label: '浮层预设位置',
      tip: '浮层预设位置'
    },
    propType: {
      type: 'oneOf',
      value: ['bottomLeft', 'bottomRight', 'topLeft', 'topRight']
    },
    defaultValue: 'bottomLeft'
  }, {
    name: 'searchValue',
    title: '设置搜索的值，需要与 showSearch 配合使用',
    propType: 'string',
    setter: 'StringSetter'
  }, {
    name: 'showSearch',
    title: {
      label: '支持搜索',
      tip: '在选择框中显示搜索框'
    },
    propType: 'bool',
    defaultValue: false,
    setter: 'BoolSetter'
  }, {
    name: 'size',
    title: {
      label: '尺寸',
      tip: '输入框大小'
    },
    propType: {
      type: 'oneOf',
      value: ['large', 'middle', 'small']
    },
    setter: {
      componentName: 'SelectSetter',
      props: {
        options: [{
          title: '大',
          value: 'large'
        }, {
          title: '中',
          value: 'middle'
        }, {
          title: '小',
          value: 'small'
        }]
      }
    },
    defaultValue: 'middle'
  }, {
    name: 'multiple',
    title: {
      label: '多选',
      tip: '支持多选节点'
    },
    propType: 'bool',
    setter: 'BoolSetter',
    defaultValue: false
  }, {
    name: 'tagRender',
    title: '自定义 tag 内容，多选时生效',
    condition: target => {
      return target.getProps().getPropValue('multiple') === true;
    },
    setter: [{
      componentName: 'SlotSetter',
      title: '展开行插槽',
      initialValue: {
        type: 'JSSlot',
        params: ['value', 'label'],
        value: []
      }
    }]
  }, {
    name: 'popupVisible',
    title: '控制浮层显隐',
    propType: 'bool',
    setter: 'BoolSetter',
    supportVariable: true
  }, {
    name: 'onChange',
    title: '选择完成回调',
    propType: 'func'
  }, {
    name: 'onPopupVisibleChange',
    title: {
      label: '显隐回调',
      tip: 'onPopupVisibleChange|显隐浮层的回调'
    },
    propType: 'func'
  }, {
    name: 'onSearch',
    title: {
      label: 'onSearch',
      tip: 'onSearch|监听搜索，返回输入的值'
    },
    propType: 'func'
  }],
  configure: {
    supports: {
      style: true,
      events: [{
        name: 'onChange',
        template: "onChange(value,selectedOptions,${extParams}){\n//选择完成后回调\nconsole.log('onChange',value,selectedOptions);}"
      }, {
        name: 'onPopupVisibleChange',
        template: "onPopupVisibleChange(value){\n//显示/隐藏浮层的回调\nconsole.log('onPopupVisibleChange',value);}"
      }, {
        name: 'onSearch',
        template: "onSearch(value){\n//监听搜索，返回输入的值\nconsole.log('onSearch',value);}"
      }]
    }
  },
  snippets: {
    title: '级联选择',
    screenshot: 'https://alifd.alicdn.com/fusion-cool/icons/icon-antd/cascader-1.png',
    schema: {
      componentName: 'ACascader',
      props: {
        options: [{
          value: 'zhejiang',
          label: 'Zhejiang',
          children: [{
            value: 'hangzhou',
            label: 'Hangzhou',
            children: [{
              value: 'xihu',
              label: 'West Lake'
            }]
          }]
        }, {
          value: 'jiangsu',
          label: 'Jiangsu',
          children: [{
            value: 'nanjing',
            label: 'Nanjing',
            children: [{
              value: 'zhonghuamen',
              label: 'Zhong Hua Men'
            }]
          }]
        }],
        placeholder: '请选择'
      }
    }
  }
});
;// CONCATENATED MODULE: ./src/lowcode/checkbox-group/meta.ts
/* eslint-disable */
// @ts-ignore
/* harmony default export */ var checkbox_group_meta = ({
  group: 'Antd',
  componentName: 'ACheckboxGroup',
  title: '多选框组',
  category: '表单',
  npm: {
    destructuring: true,
    componentName: 'ACheckboxGroup'
  },
  props: [{
    name: 'value',
    title: {
      label: '当前值',
      tip: '当前选中的选项'
    },
    propType: {
      type: 'arrayOf',
      value: 'string'
    },
    setter: {
      componentName: 'ArraySetter',
      props: {
        itemSetter: {
          componentName: 'StringSetter'
        }
      }
    },
    supportVariable: true
  }, {
    name: 'options',
    title: {
      label: '指定可选项',
      tip: '指定可选项'
    },
    propType: {
      type: 'arrayOf',
      value: {
        type: 'shape',
        value: [{
          name: 'label',
          description: '选项名',
          propType: 'string',
          defaultValue: '选项名'
        }, {
          name: 'value',
          description: '选项值',
          propType: 'string',
          defaultValue: '选项值'
        }, {
          name: 'disabled',
          description: '是否禁用',
          propType: 'bool',
          defaultValue: false
        }]
      }
    },
    setter: {
      componentName: 'ArraySetter',
      props: {
        itemSetter: {
          componentName: 'ObjectSetter',
          props: {
            config: {
              items: [{
                name: 'label',
                title: '选项名',
                setter: 'StringSetter',
                isRequired: true
              }, {
                name: 'value',
                title: '选项值',
                setter: 'StringSetter',
                isRequired: true
              }, {
                name: 'disabled',
                title: '是否禁用',
                setter: 'BoolSetter'
              }]
            }
          },
          initialValue: () => {
            return {
              label: '选项名',
              value: '多选框',
              disabled: false
            };
          }
        }
      }
    },
    supportVariable: true
  }, {
    name: 'disabled',
    title: {
      label: '是否禁用',
      tip: '是否为禁用状态'
    },
    propType: 'bool',
    defaultValue: false,
    setter: 'BoolSetter',
    supportVariable: true
  }, {
    name: 'name',
    title: {
      label: 'name属性',
      tip: 'name属性'
    },
    propType: 'string',
    setter: 'StringSetter',
    supportVariable: true
  }, {
    name: 'onChange',
    title: {
      label: '变化时回调函数',
      tip: '变化时回调函数'
    },
    propType: 'func'
  }],
  configure: {
    component: {
      isContainer: true
    },
    supports: {
      style: true,
      events: [{
        name: 'onChange',
        template: "onChange(checkedValue,${extParams}){\n// 变化时回调函数\nconsole.log('onChange', checkedValue);}"
      }]
    }
  },
  snippets: [{
    title: '多选框组',
    screenshot: 'https://alifd.alicdn.com/fusion-cool/icons/icon-antd/checkbox-group-1.png',
    schema: {
      componentName: 'ACheckboxGroup',
      props: {
        options: [{
          label: '选项一',
          value: '1'
        }, {
          label: '选项二',
          value: '2'
        }, {
          label: '选修三',
          value: '3'
        }]
      }
    }
  }]
});
;// CONCATENATED MODULE: ./src/lowcode/collapse/meta.ts


/* harmony default export */ var collapse_meta = ({
  group: 'Antd',
  componentName: 'ACollapse',
  title: '折叠面板',
  category: '数据展示',
  npm: {
    destructuring: true,
    componentName: 'ACollapse'
  },
  props: [{
    name: 'bordered',
    title: {
      label: '显示边框',
      tip: '带边框风格的折叠面板'
    },
    propType: 'bool',
    defaultValue: true,
    setter: 'BoolSetter',
    supportVariable: true
  }, {
    name: 'accordion',
    title: {
      label: '手风琴模式',
      tip: '手风琴模式'
    },
    propType: 'bool',
    defaultValue: false,
    setter: 'BoolSetter',
    supportVariable: true
  }, {
    name: 'collapsible',
    title: '可折叠触发区域',
    propType: {
      type: 'oneOf',
      value: ['-', 'header', 'disabled']
    }
  }, {
    name: 'expandIconPosition',
    title: {
      label: '图标位置',
      tip: '设置图标位置'
    },
    propType: {
      type: 'oneOf',
      value: ['left', 'right']
    }
  }, {
    name: 'destroyInactivePanel',
    title: {
      label: '隐藏时销毁',
      tip: '销毁折叠隐藏的面板'
    },
    propType: 'bool',
    defaultValue: false,
    setter: 'BoolSetter',
    supportVariable: true
  }, {
    name: 'ghost',
    title: {
      label: '透明无边框',
      tip: '使折叠面板透明且无边框'
    },
    propType: 'bool',
    defaultValue: false,
    setter: 'BoolSetter',
    supportVariable: true
  }, {
    name: 'collapses',
    title: '折叠项',
    setter: {
      componentName: 'ArraySetter',
      props: {
        itemSetter: {
          componentName: 'ObjectSetter',
          props: {
            config: {
              items: [{
                name: 'key',
                title: 'key',
                setter: 'StringSetter',
                initialValue: val => val || uuid()
              }, {
                name: 'header',
                title: '面板头内容',
                setter: 'StringSetter',
                initialValue: '折叠项'
              }]
            }
          },
          initialValue: () => {
            return {
              key: uuid(),
              header: '折叠项',
              showArrow: true,
              collapsible: undefined,
              forceRender: false
            };
          }
        }
      }
    },
    extraProps: {
      getValue(target) {
        console.log('getValue', target.node.children.length);
        const map = target.node.children.map(child => {
          const key = child.getPropValue('key') ? String(child.getPropValue('key')) : child.id;
          return {
            key,
            header: child.getPropValue('header'),
            showArrow: child.getPropValue('showArrow'),
            collapsible: child.getPropValue('collapsible'),
            forceRender: child.getPropValue('forceRender')
          };
        });
        return map;
      },
      setValue(target, value) {
        const {
          node
        } = target;
        const map = {};
        // console.log('setValue',value);
        if (!Array.isArray(value)) {
          value = [];
        }
        value.forEach(item => {
          const tabItem = Object.assign({}, item);
          // @ts-ignore
          map[item.key] = tabItem;
        });
        node.children.mergeChildren(child => {
          const key = String(child.getPropValue('key'));
          if (Object.hasOwnProperty.call(map, key)) {
            // @ts-ignore
            child.setPropValue('header', map[key].header);
            // @ts-ignore
            child.setPropValue('showArrow', map[key].showArrow);
            // @ts-ignore
            child.setPropValue('collapsible', map[key].collapsible);
            // @ts-ignore
            child.setPropValue('forceRender', map[key].forceRender);
            // @ts-ignore
            delete map[key];
            return false;
          }
          return true;
        }, () => {
          const items = [];
          for (const key in map) {
            if (Object.hasOwnProperty.call(map, key)) {
              items.push({
                componentName: 'ACollapsePanel',
                // @ts-ignore
                props: map[key]
              });
            }
          }
          return items;
        }, (child1, child2) => {
          const a = value.findIndex(item => String(item.key) === String(child1.getPropValue('key')));
          const b = value.findIndex(item => String(item.key) === String(child2.getPropValue('key')));
          return a - b;
        });
      }
    }
  }, {
    name: 'defaultActiveKey',
    title: {
      label: '初始化选中面板的 key',
      tip: '初始化选中面板的 key'
    },
    propType: {
      type: 'oneOfType',
      value: ['string', {
        type: 'arrayOf',
        value: 'string'
      }, 'number', {
        type: 'arrayOf',
        value: 'number'
      }]
    }
  }, {
    name: 'activeKey',
    title: {
      label: '当前激活 tab 面板的 key',
      tip: '当前激活 tab 面板的 key'
    },
    propType: {
      type: 'oneOfType',
      value: ['string', {
        type: 'arrayOf',
        value: 'string'
      }, 'number', {
        type: 'arrayOf',
        value: 'number'
      }]
    }
  }],
  configure: {
    component: {
      isContainer: true
    },
    supports: {
      style: true
    },
    events: [{
      name: 'onChange ',
      template: "onChange (key,${extParams}){\n// 切换面板的回调\nconsole.log('onChange ',key);}"
    }]
  },
  snippets: [{
    title: "折叠面板",
    screenshot: "https://alifd.alicdn.com/fusion-cool/icons/icon-antd/collapse-1.png",
    schema: {
      componentName: "ACollapse",
      props: {
        defaultActiveKey: ['collapse-item-1']
      },
      children: [{
        componentName: 'ACollapsePanel',
        props: {
          header: '折叠项1',
          key: 'collapse-item-1'
        }
      }, {
        componentName: 'ACollapsePanel',
        props: {
          header: '折叠项2',
          key: 'collapse-item-2'
        }
      }]
    }
  }]
});
;// CONCATENATED MODULE: ./src/lowcode/collapse-pane/meta.ts
/* harmony default export */ var collapse_pane_meta = ({
  group: 'Antd',
  componentName: 'ACollapsePanel',
  title: '折叠项',
  category: '数据展示',
  npm: {
    destructuring: true,
    componentName: 'ACollapsePanel'
  },
  props: [{
    name: 'key',
    title: {
      label: 'key',
      tip: 'key'
    },
    propType: 'string',
    setter: 'StringSetter',
    supportVariable: true
  }, {
    name: 'header',
    title: {
      label: '标题',
      tip: '标题'
    },
    propType: {
      type: 'oneOfType',
      value: ['string', 'node']
    }
  }, {
    name: 'extra',
    title: {
      label: '右上角内容',
      tip: '自定义渲染每个面板右上角的内容'
    },
    propType: {
      type: 'oneOfType',
      value: ['string', 'node']
    }
  }, {
    name: 'collapsible',
    title: '可折叠触发区域',
    propType: {
      type: 'oneOf',
      value: ['-', 'header', 'disabled']
    }
  }, {
    name: 'showArrow',
    title: {
      label: '显示折叠图标',
      tip: '是否展示当前面板上的箭头'
    },
    propType: 'bool',
    defaultValue: true,
    setter: 'BoolSetter',
    supportVariable: true
  }, {
    name: 'forceRender',
    title: {
      label: '隐藏时渲染',
      tip: '被隐藏时是否渲染 DOM 结构'
    },
    propType: 'bool',
    setter: 'BoolSetter',
    supportVariable: true
  }],
  configure: {
    component: {
      isContainer: true,
      nestingRule: {
        parentWhitelist: ['Collapse']
      }
    }
  }
});
;// CONCATENATED MODULE: ./src/lowcode/comment/meta.ts
/* harmony default export */ var comment_meta = ({
  group: 'Antd',
  componentName: 'AComment',
  title: '评论',
  category: '数据展示',
  npm: {
    destructuring: true,
    componentName: 'AComment'
  },
  props: [{
    name: 'actions',
    title: {
      label: '操作列表',
      tip: '在评论内容下面呈现的操作项列表'
    },
    propType: {
      type: 'arrayOf',
      value: 'node'
    }
  }, {
    name: 'author',
    title: {
      label: '要显示为注释作者的元素',
      tip: '要显示为注释作者的元素'
    },
    propType: {
      type: 'oneOfType',
      value: ['string', 'node']
    }
  }, {
    name: 'avatar',
    title: {
      label: '头像元素',
      tip: '要显示为评论头像的元素 - 通常是 antd Avatar 或者 src'
    },
    propType: {
      type: 'oneOfType',
      value: ['string', 'node']
    }
  }, {
    name: 'children',
    title: {
      label: '子节点',
      tip: '嵌套注释应作为注释的子项提供'
    },
    propType: 'node'
  }, {
    name: 'content',
    title: {
      label: '评论的主要内容',
      tip: '评论的主要内容'
    },
    propType: {
      type: 'oneOfType',
      value: ['string', 'node']
    }
  }, {
    name: 'datetime',
    title: {
      label: '展示时间描述',
      tip: '展示时间描述'
    },
    propType: {
      type: 'oneOfType',
      value: ['string', 'node']
    }
  }],
  configure: {
    supports: {
      style: true
    }
  },
  snippets: [{
    title: "评论",
    screenshot: "https://alifd.alicdn.com/fusion-cool/icons/icon-antd/comment-1.png",
    schema: {
      componentName: "AComment",
      props: {}
    }
  }]
});
;// CONCATENATED MODULE: ./src/lowcode/date-picker/meta.ts
/* eslint-disable */
// @ts-ignore
/* harmony default export */ var date_picker_meta = ({
  group: 'Antd',
  componentName: 'ADatePicker',
  title: '日期选择框',
  category: '表单',
  npm: {
    destructuring: true,
    componentName: 'ADatePicker'
  },
  props: [{
    title: '值设置',
    display: 'block',
    type: 'group',
    items: [{
      name: 'defaultValue',
      title: {
        label: '默认值',
        tip: 'defaultValue | 默认值'
      },
      propType: 'date',
      setter: 'DateSetter'
    }, {
      name: 'value',
      title: {
        label: '当前值',
        tip: 'value | 当前值'
      },
      propType: 'date',
      setter: 'DateSetter'
    }]
  }, {
    title: '功能选项',
    display: 'block',
    type: 'group',
    items: [{
      name: 'size',
      title: {
        label: '尺寸',
        tip: 'size | 输入框大小'
      },
      propType: {
        type: 'oneOf',
        value: ['large', 'middle', 'small']
      },
      setter: {
        componentName: 'RadioGroupSetter',
        props: {
          options: [{
            title: '大',
            value: 'large'
          }, {
            title: '中',
            value: 'middle'
          }, {
            title: '小',
            value: 'small'
          }]
        }
      },
      defaultValue: 'middle'
    }, {
      name: 'picker',
      title: {
        label: '日期类型',
        tip: 'picker | 选择器日期类型'
      },
      setter: {
        componentName: 'SelectSetter',
        props: {
          options: [{
            title: '日期',
            value: 'date'
          }, {
            title: '周',
            value: 'week'
          }, {
            title: '月份',
            value: 'month'
          }, {
            title: '季度',
            value: 'quarter'
          }, {
            title: '年份',
            value: 'year'
          }]
        }
      },
      propType: {
        type: 'oneOf',
        value: ['date', 'week', 'month', 'quarter', 'year']
      }
    }, {
      name: 'format',
      title: {
        label: '日期格式',
        tip: 'format | 设置日期格式'
      },
      propType: 'string',
      defaultValue: 'YYYY-MM-DD',
      setter: 'StringSetter'
    }, {
      name: 'placeholder',
      title: {
        label: '提示文字',
        tip: 'placeholder | 输入框提示文字'
      },
      propType: 'string',
      setter: 'StringSetter'
    }, {
      name: 'allowClear',
      title: {
        label: '支持清除',
        tip: 'allowClear | 是否允许清除'
      },
      propType: 'bool',
      defaultValue: true,
      setter: 'BoolSetter'
    }, {
      name: 'bordered',
      title: {
        label: '显示边框',
        tip: 'bordered | 是否有边框'
      },
      propType: 'bool',
      defaultValue: true,
      setter: 'BoolSetter'
    }, {
      name: 'showToday',
      title: {
        label: '展示今天按钮',
        tip: 'showToday | 是否展示今天按钮'
      },
      propType: 'bool',
      defaultValue: true,
      setter: 'BoolSetter'
    }, {
      name: 'autoFocus',
      title: {
        label: '自动聚焦',
        tip: 'autoFocus | 自动获取焦点'
      },
      propType: 'bool',
      defaultValue: false,
      setter: 'BoolSetter'
    }, {
      name: 'disabled',
      title: {
        label: '是否禁用',
        tip: 'disabled | 是否为禁用状态'
      },
      propType: 'bool',
      defaultValue: false,
      setter: 'BoolSetter'
    }, {
      name: 'inputReadOnly',
      title: {
        label: '是否只读',
        tip: 'inputReadOnly | 避免在移动设备上打开虚拟键盘'
      },
      propType: 'bool',
      defaultValue: false,
      setter: 'BoolSetter'
    }, {
      name: 'showTime',
      title: {
        label: '时间选择',
        tip: 'showTime | 是否能选择时间'
      },
      propType: 'bool',
      defaultValue: false,
      setter: 'BoolSetter'
    }]
  }, {
    title: '高级',
    display: 'block',
    type: 'group',
    items: [{
      name: 'disabledDate',
      title: {
        label: '不可选日期',
        tip: 'disabledDate | 不可选择的日期'
      },
      propType: 'func',
      setter: [{
        componentName: 'FunctionSetter',
        props: {
          template: 'disabledDate(currentDate,${extParams}){\n// 设置不可选择的日期\nreturn true\n}'
        }
      }, 'VariableSetter']
    }]
  }],
  configure: {
    supports: {
      style: true,
      events: [{
        name: 'openChange',
        template: "openChange(status,${extParams}){\n//弹出日历和关闭日历的回调\nconsole.log('openChange',status);}"
      }, {
        name: 'panelChange',
        template: "panelChange(value,mode){\n//日期面板变化时的回调\nconsole.log('panelChange',value,mode);}"
      }]
    }
  },
  snippets: [{
    title: '选择日期',
    screenshot: 'https://alifd.alicdn.com/fusion-cool/icons/icon-antd/date-picker-1.png',
    schema: {
      componentName: "ADatePicker",
      props: {}
    }
  }, {
    title: '选择周',
    screenshot: 'https://alifd.alicdn.com/fusion-cool/icons/icon-antd/date-picker-2.png',
    schema: {
      componentName: 'ADatePicker',
      props: {
        picker: 'week'
      }
    }
  }, {
    title: '选择月份',
    screenshot: 'https://alifd.alicdn.com/fusion-cool/icons/icon-antd/date-picker-3.png',
    schema: {
      componentName: 'ADatePicker',
      props: {
        picker: 'month'
      }
    }
  }, {
    title: '选择季度',
    screenshot: 'https://alifd.alicdn.com/fusion-cool/icons/icon-antd/date-picker-4.png',
    schema: {
      componentName: 'ADatePicker',
      props: {
        picker: 'quarter'
      }
    }
  }, {
    title: '选择年份',
    screenshot: 'https://alifd.alicdn.com/fusion-cool/icons/icon-antd/date-picker-5.png',
    schema: {
      componentName: 'ADatePicker',
      props: {
        picker: 'year'
      }
    }
  }]
});
;// CONCATENATED MODULE: ./src/lowcode/descriptions/meta.ts


/* harmony default export */ var descriptions_meta = ({
  group: 'Antd',
  componentName: 'ADescriptions',
  title: '描述列表',
  category: '数据展示',
  npm: {
    destructuring: true,
    componentName: 'ADescriptions'
  },
  props: [{
    name: 'title',
    title: {
      label: '标题',
      tip: '描述列表的标题，显示在最顶部'
    },
    propType: {
      type: 'oneOfType',
      value: ['string', 'node']
    }
  }, {
    name: 'items',
    title: {
      label: '列表项',
      tip: '列表项'
    },
    setter: {
      componentName: 'ArraySetter',
      props: {
        itemSetter: {
          componentName: 'ObjectSetter',
          props: {
            config: {
              items: [{
                name: 'key',
                title: 'key',
                setter: 'StringSetter',
                initialValue: val => val || uuid(),
                condition: () => false
              }, {
                name: 'label',
                title: '标题',
                setter: 'StringSetter',
                initialValue: '列表项'
              }, {
                name: 'span',
                title: '所占列数',
                setter: 'NumberSetter',
                initialValue: 1
              }, {
                name: 'children',
                title: '内容',
                setter: {
                  componentName: 'SlotSetter',
                  initialValue: {
                    type: 'JSSlot',
                    value: []
                  }
                }
              }]
            }
          },
          initialValue: () => {
            return {
              key: uuid(),
              label: '标签项',
              span: 1,
              children: {
                type: 'JSSlot',
                value: []
              }
            };
          }
        }
      }
    },
    extraProps: {
      getValue(target) {
        const map = target.node.children.map(child => {
          const key = child.getPropValue('key') ? String(child.getPropValue('key')) : child.id;
          return {
            key,
            label: child.getPropValue('label'),
            span: child.getPropValue('span'),
            children: child.getPropValue('children')
          };
        });
        return map;
      },
      setValue(target, value) {
        const {
          node
        } = target;
        const map = {};
        if (!Array.isArray(value)) {
          value = [];
        }
        value.forEach(item => {
          const tabItem = Object.assign({}, item);
          // @ts-ignore
          map[item.key] = tabItem;
        });
        node.children.mergeChildren(child => {
          const key = String(child.getPropValue('key'));
          if (Object.hasOwnProperty.call(map, key)) {
            // @ts-ignore
            child.setPropValue('label', map[key].label);
            // @ts-ignore
            child.setPropValue('span', map[key].span);
            // @ts-ignore
            child.setPropValue('children', map[key].children);
            // @ts-ignore
            delete map[key];
            return false;
          }
          return true;
        }, () => {
          const items = [];
          for (const key in map) {
            if (Object.hasOwnProperty.call(map, key)) {
              items.push({
                componentName: 'Descriptions.Item',
                // @ts-ignore
                props: map[key]
              });
            }
          }
          return items;
        }, (child1, child2) => {
          const a = value.findIndex(item => String(item.key) === String(child1.getPropValue('key')));
          const b = value.findIndex(item => String(item.key) === String(child2.getPropValue('key')));
          return a - b;
        });
      }
    }
  }, {
    name: 'bordered',
    title: {
      label: '显示边框',
      tip: '是否展示边框'
    },
    propType: 'bool',
    defaultValue: false
  }, {
    name: 'column',
    title: {
      label: '列数',
      tip: '一行的列表项数量'
    },
    propType: 'number',
    defaultValue: 3
  }, {
    name: 'size',
    title: {
      label: '尺寸',
      tip: '设置列表的大小。可以设置为 `middle` 、`small`, 或不填（只有设置 `bordered={true}` 生效）'
    },
    propType: {
      type: 'oneOf',
      value: ['default', 'middle', 'small']
    },
    defaultValue: 'middle'
  }, {
    name: 'layout',
    title: {
      label: '布局方向',
      tip: '描述布局'
    },
    propType: {
      type: 'oneOf',
      value: ['horizontal', 'vertical']
    },
    defaultValue: 'horizontal'
  }, {
    name: 'colon',
    title: {
      label: '展示冒号',
      tip: '配置 `Descriptions.Item` 的 `colon` 的默认值'
    },
    propType: 'bool',
    defaultValue: true
  }],
  configure: {
    supports: {
      style: true
    }
  },
  snippets: [{
    title: "描述列表",
    screenshot: "https://alifd.alicdn.com/fusion-cool/icons/icon-antd/descriptions-1.jpg",
    schema: {
      componentName: "ADescriptions",
      props: {
        title: "用户信息",
        items: [{
          label: "用户名",
          children: "li yi li"
        }]
      }
    }
  }]
});
;// CONCATENATED MODULE: ./src/lowcode/descriptions-item/meta.ts
/* harmony default export */ var descriptions_item_meta = ({
  group: 'Antd',
  componentName: 'ADescriptionsItem',
  title: '提及',
  category: '数据展示',
  npm: {
    destructuring: true,
    componentName: 'ADescriptionsItem'
  },
  props: [{
    name: 'key',
    title: {
      label: 'key',
      tip: 'key'
    },
    propType: 'string'
  }, {
    name: 'tab',
    title: {
      label: '标题',
      tip: '标题'
    },
    propType: 'string'
  }],
  configure: {
    component: {
      isContainer: true
    },
    supports: {
      style: true
    }
  }
});
;// CONCATENATED MODULE: ./src/lowcode/divider/meta.ts
/* eslint-disable */
// @ts-ignore
const divider_meta_meta = {
  group: 'Antd',
  componentName: 'ADivider',
  title: '分割线',
  category: '数据展示',
  configure: {
    supports: {
      style: true,
      events: []
    },
    props: [{
      name: 'children',
      title: {
        label: '文案',
        tip: '自定义分割线文本内容'
      },
      setter: 'StringSetter',
      supportVariable: true
    }, {
      name: 'dashed',
      title: {
        label: '是否虚线',
        tip: '是否虚线'
      },
      setter: 'BoolSetter'
    }, {
      name: 'content-position',
      title: {
        label: '分割线内容的位置',
        tip: '分割线内容的位置'
      },
      setter: {
        componentName: 'RadioGroupSetter',
        props: {
          options: [{
            title: 'left',
            value: 'left'
          }, {
            title: 'right',
            value: 'right'
          }, {
            title: 'center',
            value: 'center'
          }]
        }
      },
      defaultValue: 'center'
    }, {
      name: 'border-style',
      title: {
        label: '设置分隔符样式',
        tip: '设置分隔符样式'
      },
      setter: {
        componentName: 'RadioGroupSetter',
        props: {
          options: [{
            title: 'none',
            value: 'none'
          }, {
            title: 'solid',
            value: 'solid'
          }, {
            title: 'hidden',
            value: 'hidden'
          }, {
            title: 'dashed',
            value: 'dashed'
          }]
        }
      },
      defaultValue: 'solid'
    }, {
      name: 'direction',
      title: {
        label: '方向',
        tip: '水平还是垂直方向'
      },
      setter: {
        componentName: 'RadioGroupSetter',
        props: {
          options: [{
            title: '水平',
            value: 'horizontal'
          }, {
            title: '垂直',
            value: 'vertical'
          }]
        }
      },
      defaultValue: 'horizontal'
    }]
  },
  snippets: [{
    title: '分割线',
    schema: {
      componentName: 'ADivider',
      props: {
        plain: false,
        direction: 'horizontal'
      }
    }
  }, {
    title: '带文字分割线',
    screenshot: 'https://alifd.alicdn.com/fusion-cool/icons/icon-antd/divider-2.png',
    schema: {
      componentName: 'ADivider',
      props: {
        children: [{
          componentName: 'ATypographyText',
          props: {
            children: '分割文字'
          }
        }]
      }
    }
  }]
};
/* harmony default export */ var divider_meta = (divider_meta_meta);
;// CONCATENATED MODULE: ./src/lowcode/drawer/meta.ts
/* harmony default export */ var drawer_meta = ({
  group: 'Antd',
  componentName: 'ADrawer',
  title: '抽屉',
  category: '基础组件',
  npm: {
    destructuring: true,
    componentName: 'ADrawer'
  },
  props: [{
    title: '基础',
    display: 'block',
    type: 'group',
    items: [{
      name: 'visible',
      title: {
        label: '是否可见',
        tip: 'visible | Drawer 是否可见'
      },
      propType: 'bool',
      setter: 'BoolSetter'
    }, {
      name: 'title',
      title: {
        label: '标题',
        tip: 'title | 标题'
      },
      propType: {
        type: 'oneOfType',
        value: ['string', 'node']
      },
      setter: ['StringSetter', {
        componentName: 'SlotSetter',
        title: '标题插槽',
        initialValue: {
          type: 'JSSlot',
          value: []
        }
      }, 'VariableSetter']
    }]
  }, {
    title: '外观',
    display: 'block',
    type: 'group',
    items: [{
      name: 'placement',
      title: {
        label: '位置',
        tip: 'placement | 抽屉的显示位置'
      },
      propType: {
        type: 'oneOf',
        value: ['top', 'right', 'bottom', 'left']
      },
      defaultValue: 'right',
      setter: {
        componentName: 'SelectSetter',
        props: {
          options: [{
            title: '上方',
            value: 'top'
          }, {
            title: '右侧',
            value: 'right'
          }, {
            title: '下方',
            value: 'bottom'
          }, {
            title: '左侧',
            value: 'left'
          }]
        }
      }
    }, {
      name: 'size',
      title: {
        label: '大小',
        tip: 'size | 抽屉的大小'
      },
      propType: {
        type: 'oneOf',
        value: ['default', 'large']
      },
      defaultValue: 'default',
      setter: {
        componentName: 'RadioGroupSetter',
        props: {
          options: [{
            title: '默认',
            value: 'default'
          }, {
            title: '超大',
            value: 'large'
          }]
        }
      }
    }, {
      name: 'width',
      title: {
        label: '宽度',
        tip: 'width | 宽度'
      },
      propType: {
        type: 'oneOfType',
        value: ['string', 'number']
      },
      setter: ['StringSetter', 'NumberSetter', 'VariableSetter']
    }, {
      name: 'height',
      title: {
        label: '高度',
        tip: 'height | 高度, 在 placement 为 top 或 bottom 时使用'
      },
      propType: {
        type: 'oneOfType',
        value: ['string', 'number']
      },
      setter: ['StringSetter', 'NumberSetter', 'VariableSetter']
    }, {
      name: 'zIndex',
      title: {
        label: 'z-index',
        tip: '设置 Drawer 的 `z-index`'
      },
      propType: 'number',
      setter: 'NumberSetter'
    }]
  }, {
    title: '功能',
    display: 'block',
    type: 'group',
    items: [{
      name: 'mask',
      title: {
        label: '显示遮罩',
        tip: 'mask | 是否显示遮罩'
      },
      propType: 'bool',
      defaultValue: true,
      setter: 'BoolSetter'
    }, {
      name: 'maskClosable',
      title: {
        label: '点击遮罩关闭',
        tip: 'maskClosable | 点击遮罩是否关闭抽屉'
      },
      propType: 'bool',
      defaultValue: true,
      setter: 'BoolSetter'
    }, {
      name: 'autoFocus',
      title: {
        label: '自动获得焦点',
        tip: 'autoFocus | 抽屉展开后是否将焦点切换至其 Dom 节点'
      },
      propType: 'bool',
      defaultValue: true,
      setter: 'BoolSetter'
    }, {
      name: 'keyboard',
      title: {
        label: '键盘Esc关闭',
        tip: 'keyboard | 是否支持键盘按 Esc 关闭'
      },
      propType: 'bool',
      defaultValue: true,
      setter: 'BoolSetter'
    }, {
      name: 'destroyOnClose',
      title: {
        label: '关闭时销毁',
        tip: 'destroyOnClose | 关闭时销毁 Drawer 里的子元素'
      },
      propType: 'bool',
      defaultValue: false,
      setter: 'BoolSetter'
    }, {
      name: 'closable',
      title: {
        label: '关闭按钮',
        tip: 'closable | 是否显示左上角的关闭按钮'
      },
      propType: 'bool',
      defaultValue: true,
      setter: 'BoolSetter'
    }, {
      name: 'forceRender',
      title: {
        label: '预渲染',
        tip: 'forceRender | 预渲染 Drawer 内元素'
      },
      propType: 'bool',
      defaultValue: false,
      setter: 'BoolSetter'
    }]
  }, {
    title: '插槽扩展',
    display: 'block',
    type: 'group',
    items: [{
      name: 'closeIcon',
      title: {
        label: '关闭图标',
        tip: 'closeIcon | 自定义关闭图标'
      },
      propType: 'node',
      setter: {
        componentName: 'SlotSetter',
        title: '关闭图标插槽',
        initialValue: {
          type: 'JSSlot',
          value: [{
            componentName: 'Icon',
            props: {
              type: 'CloseOutlined',
              size: 16
            }
          }]
        }
      }
    }, {
      name: 'extra',
      title: {
        label: '操作区域',
        tip: 'extra | 抽屉右上角的操作区域'
      },
      propType: 'node',
      setter: {
        componentName: 'SlotSetter',
        title: '操作区域插槽',
        initialValue: {
          type: 'JSSlot',
          value: []
        }
      }
    }, {
      name: 'footer',
      title: {
        label: '抽屉的页脚',
        tip: 'footer | 抽屉的页脚'
      },
      propType: 'node',
      setter: {
        componentName: 'SlotSetter',
        title: '抽屉页脚插槽',
        initialValue: {
          type: 'JSSlot',
          value: []
        }
      }
    }]
  }, {
    title: '其它',
    display: 'block',
    type: 'group',
    items: [{
      name: 'class',
      title: {
        label: '容器类名',
        tip: 'class | 对话框外层容器的类名'
      },
      propType: 'string',
      setter: 'StringSetter'
    }, {
      name: 'drawerStyle',
      title: '弹出层样式',
      type: 'group',
      extraProps: {
        display: 'entry'
      },
      items: [{
        name: 'drawerStyle',
        title: {
          label: '样式设置',
          tip: 'drawerStyle | 用于设置 Drawer 弹出层的样式'
        },
        setter: 'StyleSetter',
        extraProps: {
          display: 'block'
        }
      }]
    }, {
      name: 'contentWrapperStyle',
      title: '包裹层样式',
      type: 'group',
      extraProps: {
        display: 'entry'
      },
      items: [{
        name: 'contentWrapperStyle',
        title: {
          label: '样式设置',
          tip: 'contentWrapperStyle | 可用于设置 Drawer 包裹内容部分的样式'
        },
        setter: 'StyleSetter',
        extraProps: {
          display: 'block'
        }
      }]
    }, {
      name: 'headerStyle',
      title: '头部样式',
      type: 'group',
      extraProps: {
        display: 'entry'
      },
      items: [{
        name: 'headerStyle',
        title: {
          label: '样式设置',
          tip: 'headerStyle | 用于设置 Drawer 头部的样式'
        },
        setter: 'StyleSetter',
        extraProps: {
          display: 'block'
        }
      }]
    }, {
      name: 'bodyStyle',
      title: '内容样式',
      type: 'group',
      extraProps: {
        display: 'entry'
      },
      items: [{
        name: 'bodyStyle',
        title: {
          label: '样式设置',
          tip: 'bodyStyle | 可用于设置 Drawer 内容部分的样式'
        },
        setter: 'StyleSetter',
        extraProps: {
          display: 'block'
        }
      }]
    }, {
      name: 'footerStyle',
      title: '页脚样式',
      type: 'group',
      extraProps: {
        display: 'entry'
      },
      items: [{
        name: 'footerStyle',
        title: {
          label: '样式设置',
          tip: 'footerStyle | 抽屉页脚部件的样式'
        },
        setter: 'StyleSetter',
        extraProps: {
          display: 'block'
        }
      }]
    }, {
      name: 'maskStyle',
      title: '遮罩样式',
      type: 'group',
      extraProps: {
        display: 'entry'
      },
      items: [{
        name: 'maskStyle',
        title: {
          label: '样式设置',
          tip: 'maskStyle | 遮罩样式'
        },
        setter: 'StyleSetter',
        extraProps: {
          display: 'block'
        }
      }]
    }]
  }],
  configure: {
    component: {
      isContainer: true,
      isModal: true,
      nestingRule: {
        parentWhitelist: ['Page', 'Component']
      }
    },
    supports: {
      style: true,
      events: [{
        name: 'close',
        template: "close(event,${extParams}){\n// 点击遮罩层或右上角叉或取消按钮的回调\nconsole.log('close',event);}"
      }, {
        name: 'afterVisibleChange',
        template: "afterVisibleChange(open,${extParams}){\n// 切换抽屉时动画结束后的回调\nconsole.log('afterVisibleChange',open);}"
      }]
    }
  },
  snippets: [{
    title: '侧边抽屉',
    screenshot: 'https://alifd.alicdn.com/fusion-cool/icons/icon-antd/drawer-1.png',
    schema: {
      componentName: 'ADrawer',
      props: {
        title: '基础侧边抽屉',
        open: true,
        placement: 'right',
        destroyOnClose: true
      },
      children: [{
        componentName: 'ATypographyParagraph',
        children: 'Some contents...'
      }]
    }
  }, {
    title: '底部抽屉',
    screenshot: 'https://alifd.alicdn.com/fusion-cool/icons/icon-antd/drawer-2.png',
    schema: {
      componentName: 'ADrawer',
      props: {
        title: '底部抽屉',
        open: true,
        placement: 'bottom',
        destroyOnClose: true
      },
      children: [{
        componentName: 'ATypographyParagraph',
        children: 'Some contents...'
      }]
    }
  }]
});
;// CONCATENATED MODULE: ./src/lowcode/dropdown/meta.ts
/* harmony default export */ var dropdown_meta = ({
  group: 'Antd',
  componentName: 'ADropdown',
  title: '下拉菜单',
  category: '基础组件',
  npm: {
    destructuring: true,
    componentName: 'ADropdown'
  },
  props: [{
    name: 'visible',
    title: {
      label: '菜单是否显示',
      tip: '菜单是否显示'
    },
    propType: {
      type: 'oneOf',
      value: [true, false, '-']
    },
    defaultValue: '-',
    setter: {
      componentName: 'RadioGroupSetter',
      props: {
        options: [{
          title: '默认非受控',
          value: '-'
        }, {
          title: '显示',
          value: true
        }, {
          title: '不显示',
          value: false
        }]
      }
    },
    extraProps: {
      getValue(target) {
        const {
          node
        } = target;
        let value = node.getPropValue('visible');
        if (value === undefined) {
          value = '-';
        }
        return value;
      },
      setValue(target, value) {
        const {
          node
        } = target;
        if (value === '-') {
          setTimeout(() => {
            node.clearPropValue('visible');
          });
        }
      }
    }
  }, {
    name: 'arrow',
    title: {
      label: '显示下拉箭头',
      tip: '是否显示下拉箭头'
    },
    propType: 'bool',
    defaultValue: false
  }, {
    name: 'disabled',
    title: {
      label: '是否禁用',
      tip: '是否为禁用状态'
    },
    propType: 'bool'
  }, {
    name: 'overlay',
    title: {
      label: '菜单',
      tip: '菜单'
    },
    propType: {
      type: 'oneOfType',
      value: ['node', 'func']
    }
  }, {
    name: 'size',
    title: {
      label: '尺寸',
      tip: '按钮大小'
    },
    propType: {
      type: 'oneOf',
      value: ['default', 'small', 'large']
    },
    setter: {
      componentName: "RadioGroupSetter",
      props: {
        options: [{
          label: 'default',
          value: 'default'
        }, {
          label: 'large',
          value: 'large'
        }, {
          label: 'small',
          value: 'small'
        }]
      }
    },
    defaultValue: 'default'
  }, {
    name: 'placement',
    title: {
      label: '弹出位置',
      tip: '菜单弹出位置：`bottomLeft` `bottomCenter` `bottomRight` `topLeft` `topCenter` `topRight`'
    },
    propType: {
      type: 'oneOf',
      value: ['bottomLeft', 'bottomCenter', 'bottomRight', 'topLeft', 'topCenter', 'topRight']
    }
  }, {
    name: 'trigger',
    title: {
      label: '触发下拉的行为',
      tip: '触发下拉的行为, 移动端不支持 hover'
    },
    propType: {
      type: 'arrayOf',
      value: {
        type: 'oneOf',
        value: ['click', 'hover', 'contextMenu']
      }
    }
  }, {
    name: 'visibleChange',
    title: {
      label: '显示状态回调',
      tip: '菜单显示状态改变时调用，参数为 `visible`'
    },
    propType: 'func'
  }],
  configure: {
    component: {
      isContainer: true
    },
    supports: {
      style: true,
      events: [{
        name: 'visibleChange',
        template: "visibleChange(open,${extParams}){\n// 菜单显示状态改变时调用\nconsole.log('visibleChange',open);}"
      }]
    }
  },
  snippets: [{
    title: "下拉菜单",
    screenshot: "https://alifd.alicdn.com/fusion-cool/icons/icon-antd/dropdown-1.png",
    schema: {
      componentName: "ADropdown",
      props: {
        overlay: {
          type: 'JSSlot',
          value: [{
            componentName: 'AMenu',
            props: {
              items: [{
                key: 'timeLinei5wd',
                category: 'Item',
                title: '菜单名'
              }]
            },
            children: [{
              componentName: 'AMenuItem',
              id: 'node_ocky01yzdq3',
              props: {
                key: 'timeLinei5wd',
                category: 'Item',
                title: '菜单名',
                children: '菜单名'
              }
            }]
          }]
        }
      },
      children: [{
        componentName: 'AButton',
        props: {
          type: 'link',
          children: {
            type: 'JSSlot',
            value: [{
              componentName: 'ATypographyText',
              props: {
                children: 'Hover me',
                style: {
                  color: 'inherit'
                }
              }
            }]
          }
        }
      }]
    }
  }]
});
;// CONCATENATED MODULE: ./src/lowcode/empty/meta.ts
/* harmony default export */ var empty_meta = ({
  group: 'Antd',
  componentName: 'AEmpty',
  title: '空状态',
  category: '数据展示',
  npm: {
    destructuring: true,
    componentName: 'AEmpty'
  },
  props: [{
    name: 'description',
    title: {
      label: '内容描述',
      tip: '自定义描述内容'
    },
    propType: {
      type: 'oneOfType',
      value: ['string', 'node']
    }
  }, {
    name: 'image',
    title: {
      label: '图片地址',
      tip: '设置显示图片，为string时表示自定义图片地址。'
    },
    propType: {
      type: 'oneOfType',
      value: ['string', 'node']
    }
  }],
  configure: {
    supports: {
      style: true
    }
  },
  snippets: [{
    title: "空状态",
    screenshot: "https://alifd.alicdn.com/fusion-cool/icons/icon-antd/empty-1.png",
    schema: {
      componentName: "AEmpty",
      props: {}
    }
  }]
});
;// CONCATENATED MODULE: ./src/lowcode/form/meta.ts
/* eslint-disable */

// @ts-ignore
/* harmony default export */ var form_meta = ({
  group: 'Antd',
  componentName: 'AForm',
  title: '表单',
  category: '表单',
  npm: {
    destructuring: true,
    componentName: 'AForm'
  },
  props: [{
    name: 'ref',
    title: {
      label: 'ref',
      tip: 'ref | 通过 this.$(\'xxx\') 获取到组件实例'
    },
    defaultValue: () => {
      return `form_${uuid()}`;
    },
    setter: 'StringSetter',
    supportVariable: true
  }, {
    name: 'values',
    title: {
      label: '表单数据源',
      tip: '表单数据源'
    },
    propType: 'object',
    setter: 'JsonSetter',
    supportVariable: true
  }, {
    name: 'colon',
    title: {
      label: '展示冒号',
      tip: ''
    },
    propType: 'bool',
    defaultValue: true,
    setter: 'BoolSetter',
    supportVariable: true
  }, {
    name: 'hideRequiredMark',
    title: {
      label: '隐藏必填标记',
      tip: '隐藏必填标记'
    },
    propType: 'bool',
    defaultValue: false,
    setter: 'BoolSetter',
    supportVariable: true
  }, {
    type: 'group',
    title: '布局',
    display: 'accordion',
    items: [{
      name: 'labelCol',
      title: '标签栅格布局设置',
      display: 'inline',
      setter: {
        componentName: 'ObjectSetter',
        props: {
          config: {
            items: [{
              name: 'span',
              title: '宽度',
              setter: {
                componentName: 'NumberSetter',
                props: {
                  min: 0,
                  max: 24
                }
              }
            }, {
              name: 'offset',
              title: '偏移',
              setter: {
                componentName: 'NumberSetter',
                props: {
                  min: 0,
                  max: 24
                }
              }
            }]
          }
        }
      },
      description: 'label 标签布局，同 `<Col>` 组件，设置 span offset 值，如 {span: 8, offset: 16}，该项仅在垂直表单有效'
    }, {
      name: 'wrapperCol',
      title: '内容栅格布局设置',
      display: 'inline',
      setter: {
        componentName: 'ObjectSetter',
        props: {
          config: {
            items: [{
              name: 'span',
              title: '宽度',
              setter: {
                componentName: 'NumberSetter',
                props: {
                  min: 0,
                  max: 24
                }
              }
            }, {
              name: 'offset',
              title: '偏移',
              setter: {
                componentName: 'NumberSetter',
                props: {
                  min: 0,
                  max: 24
                }
              }
            }]
          }
        }
      },
      description: '需要为输入控件设置布局样式时，使用该属性，用法同 labelCol'
    }]
  }, {
    name: 'labelAlign',
    title: {
      label: '标签对齐',
      tip: 'label 标签的文本对齐方式'
    },
    setter: {
      componentName: 'RadioGroupSetter',
      props: {
        options: [{
          title: '左',
          value: 'left'
        }, {
          title: '右',
          value: 'right'
        }]
      }
    },
    propType: {
      type: 'oneOf',
      value: ['left', 'right']
    },
    defaultValue: 'right'
  }, {
    name: 'layout',
    title: {
      label: '表单布局',
      tip: '表单布局'
    },
    setter: {
      componentName: 'RadioGroupSetter',
      props: {
        options: [{
          title: '水平',
          value: 'horizontal'
        }, {
          title: '垂直',
          value: 'vertical'
        }, {
          title: '行内',
          value: 'inline'
        }]
      }
    },
    propType: {
      type: 'oneOf',
      value: ['horizontal', 'vertical', 'inline']
    },
    defaultValue: 'horizontal'
  }, {
    name: 'name',
    title: {
      label: '表单名称',
      tip: '表单名称，会作为表单字段 `id` 前缀使用'
    },
    propType: 'string',
    setter: 'StringSetter',
    supportVariable: true
  }, {
    name: 'preserve',
    title: {
      label: '删除时保留值',
      tip: '当字段被删除时保留字段值'
    },
    propType: 'bool',
    defaultValue: true,
    setter: 'BoolSetter',
    supportVariable: true
  }, {
    name: 'scrollToFirstError',
    title: {
      label: '滚至错误',
      tip: '提交失败自动滚动到第一个错误字段'
    },
    propType: 'bool',
    defaultValue: true,
    setter: 'BoolSetter',
    supportVariable: true
  }, {
    name: 'size',
    title: {
      label: '字段组件尺寸',
      tip: '设置字段组件的尺寸（仅限 antd 组件）'
    },
    propType: {
      type: 'oneOf',
      value: ['small', 'middle', 'large']
    },
    setter: {
      componentName: 'RadioGroupSetter',
      props: {
        options: [{
          title: '大',
          value: 'large'
        }, {
          title: '中',
          value: 'middle'
        }, {
          title: '小',
          value: 'small'
        }]
      }
    },
    defaultValue: 'middle'
  }, {
    type: 'group',
    title: '事件',
    display: 'accordion',
    items: [{
      name: 'validateMessages',
      title: {
        label: '验证提示模板',
        tip: '验证提示模板'
      },
      setter: 'JsonSetter',
      defaultValue: {
        required: "'${name}' 不能为空"
      }
    }, {
      name: 'validateTrigger',
      title: {
        label: '校验时机',
        tip: '所有字段校验触发时机'
      },
      propType: {
        type: 'oneOf',
        value: ['onChange', 'onBlur']
      },
      setter: {
        componentName: 'RadioGroupSetter',
        props: {
          options: [{
            title: '当前值变化时',
            value: 'onChange'
          }, {
            title: '失去焦点时',
            value: 'onBlur'
          }]
        }
      }
    }, {
      name: 'onFinish',
      title: {
        label: '提交表单且数据验证成功后回调事件',
        tip: '提交表单且数据验证成功后回调事件'
      },
      propType: 'func'
    }, {
      name: 'onFinishFailed',
      title: {
        label: '提交表单且数据验证失败后回调事件',
        tip: '提交表单且数据验证失败后回调事件'
      },
      propType: 'func'
    }, {
      name: 'onFieldsChange',
      title: {
        label: '字段更新时触发回调事件',
        tip: '字段更新时触发回调事件'
      },
      propType: 'func'
    }, {
      name: 'onValuesChange',
      title: {
        label: '字段值更新时触发回调事件',
        tip: '字段值更新时触发回调事件'
      },
      propType: 'func'
    }]
  }],
  configure: {
    component: {
      isContainer: true
    },
    supports: {
      style: true,
      events: [{
        name: 'onFinish',
        template: "onFinish(values,${extParams}){\n// 提交表单且数据验证成功后回调事件\nconsole.log('onFinish',values);}"
      }, {
        name: 'onFinishFailed',
        template: "onFinishFailed({values,errorFields,outOfDate},${extParams}){\n// 提交表单且数据验证失败后回调事件\nconsole.log('onFinishFailed',values, errorFields, outOfDate);}"
      }, {
        name: 'onFieldsChange',
        template: "onFieldsChange(changedFields,allFields,${extParams}){\n// 字段更新时触发回调事件\nconsole.log('onFieldsChange',changedFields,allFields);}"
      }, {
        name: 'onValuesChange',
        template: "onValuesChange(changedValues,allValues,${extParams}){\n// 字段值更新时触发回调事件\nconsole.log('onValuesChange',changedValues,allValues);}"
      }]
    },
    advanced: {
      callbacks: {
        onNodeAdd: (dragment, currentNode) => {
          const comps = ['AInput', 'ASelect', 'ARadio', 'ACheckbox', 'ASwitch', 'AUpload', 'ADatePicker', 'ARate', 'ATransfer'];
          if (!dragment || !dragment.componentMeta || !dragment.componentMeta.npm || !dragment.componentMeta.npm.package || dragment.componentMeta.npm.package.indexOf('lowcode-material-ant-vue') === -1 || comps.every(comp => dragment.componentName.indexOf(comp) === -1)) {
            return;
          }
          // 为目标元素包裹一层P
          const layoutPNode = currentNode.document.createNode({
            componentName: 'AFormItem',
            props: {
              label: '表单项: '
            },
            children: [dragment.exportSchema()]
          });
          // 当前dragment还未添加入node子节点,需要setTimeout处理
          setTimeout(() => {
            currentNode.replaceChild(dragment, layoutPNode.exportSchema(),
            // 避免生成新的 nodeId
            {
              reserveSchemaNodeId: true
            });
          }, 1);
        }
      }
    }
  },
  snippets: [{
    title: '表单',
    screenshot: "https://alifd.alicdn.com/fusion-cool/icons/icon-antd/form-1.png",
    schema: {
      componentName: 'AForm',
      props: {
        labelCol: {
          span: 6,
          labelAlign: 'left'
        },
        onValuesChange: {
          type: "JSFunction",
          value: "function onValuesChange(changedValues, allValues) {\n  console.log('onValuesChange', changedValues, allValues);\n}"
        },
        onFinish: {
          type: "JSFunction",
          value: "function onFinish(values) {\n  console.log('onFinish', values);\n}"
        },
        onFinishFailed: {
          type: "JSFunction",
          value: "function onFinishFailed({ values, errorFields, outOfDate }) {\n  console.log('onFinishFailed', values, errorFields, outOfDate);\n}"
        },
        "name": "basic"
      },
      children: [{
        componentName: 'AFormItem',
        props: {
          label: '表单项:',
          labelAlign: 'right',
          colon: true,
          required: true,
          valuePropName: "value",
          name: 'a',
          requiredobj: {
            required: true,
            message: "必填"
          },
          typeobj: {
            type: null,
            message: null
          },
          lenobj: {
            max: null,
            min: null,
            message: null
          },
          patternobj: {
            pattern: null,
            message: null
          }
        },
        children: [{
          componentName: 'AInput',
          props: {
            name: 'userName',
            size: 'default',
            placeholder: '用户名'
          }
        }]
      }, {
        componentName: 'AFormItem',
        props: {
          label: '密码:',
          labelAlign: "right",
          colon: true,
          required: true,
          noStyle: false,
          valuePropName: "password",
          name: 'b',
          requiredobj: {
            required: true,
            message: "必填"
          },
          typeobj: {
            type: null,
            message: null
          },
          lenobj: {
            max: null,
            min: null,
            message: null
          },
          patternobj: {
            pattern: null,
            message: null
          }
        },
        children: [{
          componentName: 'AInputPassword',
          props: {
            name: 'password',
            placeholder: '请输入密码',
            size: 'medium',
            disabled: false
          }
        }]
      }, {
        componentName: 'AFormItem',
        props: {
          label: '表单项',
          name: 'c',
          labelAlign: 'right',
          colon: true,
          required: false,
          valuePropName: "shareUnit",
          requiredobj: {
            required: null,
            message: null
          },
          typeobj: {
            type: null,
            message: null
          },
          lenobj: {
            max: null,
            min: null,
            message: null
          },
          patternobj: {
            pattern: null,
            message: null
          },
          children: [{
            componentName: 'ASelect',
            props: {
              style: {
                width: '200px'
              },
              options: [{
                label: 'A',
                value: 'A'
              }, {
                label: 'B',
                value: 'B'
              }, {
                label: 'C',
                value: 'C'
              }],
              allowClear: true,
              autoFocus: false,
              filterOption: true,
              optionFilterProp: "value",
              labelInValue: false,
              loading: false,
              tokenSeparators: []
            }
          }]
        }
      }, {
        componentName: 'AFormItem',
        props: {
          wrapperCol: {
            offset: 7
          }
        },
        children: [{
          componentName: "ACheckboxGroup",
          props: {
            options: [{
              label: "A",
              value: "A"
            }, {
              label: "B",
              value: "B"
            }, {
              label: "C",
              value: "C"
            }]
          }
        }]
      }, {
        componentName: 'AFormItem',
        props: {
          wrapperCol: {
            offset: 7
          }
        },
        children: [{
          componentName: 'AButton',
          props: {
            type: 'primary',
            children: "提交",
            htmlType: "submit"
          }
        }, {
          componentName: 'AButton',
          props: {
            style: {
              marginLeft: '10px'
            },
            children: '重置',
            htmlType: "reset"
          }
        }]
      }]
    }
  }]
});
;// CONCATENATED MODULE: ./src/lowcode/form-item/meta.ts
/* eslint-disable */
// @ts-ignore
/* harmony default export */ var form_item_meta = ({
  group: 'Antd',
  componentName: 'AFormItem',
  title: '表单项',
  category: '表单',
  npm: {
    destructuring: true,
    componentName: 'AFormItem'
  },
  props: [{
    name: 'name',
    title: '字段名',
    isRequired: true,
    propType: 'string',
    setter: 'StringSetter',
    supportVariable: true
  }, {
    name: 'label',
    title: '标签名',
    propType: {
      type: 'oneOfType',
      value: ['string', 'node']
    }
  }, {
    name: 'labelAlign',
    title: '标签文本对齐方式',
    propType: {
      type: 'oneOf',
      value: ['left', 'right']
    },
    setter: {
      componentName: 'RadioGroupSetter',
      props: {
        options: [{
          title: 'left',
          value: 'left'
        }, {
          title: 'right',
          value: 'right'
        }]
      }
    },
    defaultValue: 'right'
  }, {
    name: 'autoLink',
    title: '是否自动关联表单域',
    propType: 'bool',
    defaultValue: true,
    setter: 'BoolSetter'
  }, {
    name: 'colon',
    title: '是否显示 label 后面的冒号',
    propType: 'bool',
    defaultValue: true,
    setter: 'BoolSetter',
    supportVariable: true
  }, {
    name: 'extra',
    title: '额外的提示信息',
    propType: {
      type: 'oneOfType',
      value: ['string', 'node']
    }
  }, {
    name: 'required',
    title: '是否必填',
    propType: 'bool',
    setter: 'BoolSetter',
    defaultValue: false
  }, {
    name: 'initialValue',
    title: {
      label: '默认值',
      tip: '设置子元素默认值，如果与 Form 的 initialValues 冲突则以 Form 为准'
    },
    propType: 'string',
    setter: 'StringSetter',
    supportVariable: true
  }, {
    name: 'noStyle',
    title: {
      label: '隐藏标签',
      tip: '为 true 时不带样式，作为纯字段控件使用'
    },
    propType: 'bool',
    defaultValue: false,
    setter: 'BoolSetter',
    supportVariable: true
  }, {
    name: 'valuePropName',
    title: {
      label: '子组件值字段',
      tip: `子节点的值的字段，如 Switch 的是 'checked'`
    },
    propType: 'string',
    defaultValue: 'value',
    setter: 'StringSetter',
    supportVariable: true
  }, {
    name: 'getValueFromEvent',
    title: {
      label: 'event转换器',
      tip: `设置如何将 event 的值转换成字段值，如将上传组件的fileList作为value值传出`
    },
    propType: 'func'
  }, {
    name: 'hasFeedback',
    title: {
      label: 'hasFeedback',
      tip: '配合 validateStatus 属性使用，展示校验状态图标，建议只配合 Input 组件使用'
    },
    prop: 'bool',
    setter: 'BoolSetter',
    defaultValue: false
  }, {
    name: 'help',
    title: {
      label: '提示信息',
      tip: '不设置，则会根据校验规则自动生成'
    },
    propType: {
      type: 'oneOfType',
      value: ['string', 'node']
    }
  }, {
    name: 'htmlFor',
    title: {
      label: 'htmlFor',
      tip: '设置子元素 label htmlFor 属性'
    },
    propType: 'string',
    setter: 'StringSetter',
    supportVariable: true
  }, {
    type: 'group',
    title: '布局',
    display: 'accordion',
    items: [{
      name: 'labelCol',
      title: '标签栅格布局设置',
      display: 'inline',
      setter: {
        componentName: 'ObjectSetter',
        props: {
          config: {
            items: [{
              name: 'span',
              title: '宽度',
              setter: {
                componentName: 'NumberSetter',
                props: {
                  min: 0,
                  max: 24
                }
              }
            }, {
              name: 'offset',
              title: '偏移',
              setter: {
                componentName: 'NumberSetter',
                props: {
                  min: 0,
                  max: 24
                }
              }
            }]
          }
        }
      },
      description: 'label 标签布局，同 `<Col>` 组件，设置 span offset 值，如 {span: 8, offset: 16}，该项仅在垂直表单有效'
    }, {
      name: 'wrapperCol',
      title: '内容栅格布局设置',
      display: 'inline',
      setter: {
        componentName: 'ObjectSetter',
        props: {
          config: {
            items: [{
              name: 'span',
              title: '宽度',
              setter: {
                componentName: 'NumberSetter',
                props: {
                  min: 0,
                  max: 24
                }
              }
            }, {
              name: 'offset',
              title: '偏移',
              setter: {
                componentName: 'NumberSetter',
                props: {
                  min: 0,
                  max: 24
                }
              }
            }]
          }
        }
      },
      description: '需要为输入控件设置布局样式时，使用该属性，用法同 labelCol'
    }]
  }, {
    name: 'rules',
    title: '表单验证规则',
    propType: {
      type: 'oneOfType',
      value: ['object', 'array']
    }
  }, {
    name: 'requiredobj',
    title: {
      label: '必填设置',
      tip: '必填设置'
    },
    propType: {
      type: 'shape',
      value: [{
        name: 'required',
        title: '是否必填',
        propType: 'bool',
        setter: 'BoolSetter',
        supportVariable: true,
        extraProps: {
          setValue(target, value) {
            // 同步 必填标记
            target.parent.parent.setPropValue('required', value);
          }
        }
      }, {
        name: 'message',
        title: '错误信息提示',
        propType: 'string',
        setter: 'StringSetter',
        supportVariable: true
      }]
    }
  }, {
    name: 'typeobj',
    title: {
      label: '输入类型设置',
      tip: '输入类型设置'
    },
    propType: {
      type: 'shape',
      value: [{
        name: 'type',
        title: '输入类型',
        setter: {
          componentName: 'SelectSetter',
          props: {
            options: [{
              title: '字符串',
              value: 'string'
            },
            // {
            //   title: '纯数字',
            //   value: 'number',
            // },
            {
              title: '邮箱',
              value: 'email'
            }, {
              title: '网址',
              value: 'url'
            }]
          }
        },
        propType: {
          type: 'oneOf',
          value: ['string', 'number', 'email', 'url']
        }
      }, {
        name: 'message',
        title: '错误信息提示',
        propType: 'string'
      }]
    }
  }, {
    name: 'lenobj',
    title: {
      label: '长度校验设置',
      tip: '长度校验设置'
    },
    propType: {
      type: 'shape',
      value: [
      // { name: 'len', title: '固定长度', propType: 'string' },
      {
        name: 'max',
        title: '最大长度',
        propType: 'number'
      }, {
        name: 'min',
        title: '最小长度',
        propType: 'number'
      }, {
        name: 'message',
        title: '错误信息提示',
        propType: 'string'
      }]
    }
  }, {
    name: 'patternobj',
    title: {
      label: '正则设置',
      tip: '正则设置'
    },
    propType: {
      type: 'shape',
      value: [{
        name: 'pattern',
        title: '正则',
        propType: 'string'
      }, {
        name: 'message',
        title: '错误信息提示',
        propType: 'string'
      }]
    }
  }, {
    name: 'validator',
    title: {
      label: '自定义校验函数',
      tip: '自定义校验，接收 Promise 作为返回值'
    },
    propType: 'func'
  }, {
    name: 'validateFirst',
    title: {
      label: 'validateFirst',
      tip: '当某一规则校验不通过时，是否停止剩下的规则的校验'
    },
    prop: 'bool',
    setter: 'BoolSetter',
    defaultValue: false
  }, {
    name: 'validateStatus',
    title: {
      label: 'validateStatus',
      tip: '校验状态，如不设置，则会根据校验规则自动生成'
    },
    prop: {
      type: 'oneOf',
      value: ['success', 'warning', 'error', 'validating']
    },
    defaultValue: 'error'
  }, {
    name: 'validateTrigger',
    title: {
      label: 'validateTrigger',
      tip: '设置字段校验的时机'
    },
    propType: {
      type: 'oneOfType',
      value: ['string', 'array']
    },
    defaultValue: 'change'
  }],
  configure: {
    component: {
      isContainer: true,
      nestingRule: {
        childWhitelist: [],
        parentWhitelist: []
      }
    },
    supports: {
      style: true
    },
    advanced: {
      callbacks: {
        onNodeRemove: (removedNode, currentNode) => {
          if (!removedNode || !currentNode) {
            return;
          }
          const {
            children
          } = currentNode;
          // 若无children,则说明当前P组件内已为空,需要删除P组件本身
          if (children && children.length === 0) {
            currentNode.remove();
          }
        }
      }
    }
  },
  snippets: [{
    title: '表单项',
    screenshot: 'https://alifd.alicdn.com/fusion-cool/icons/icon-antd/form-item-1.jpg',
    schema: {
      componentName: 'AFormItem',
      props: {
        label: '表单项'
      }
    }
  }]
});
;// CONCATENATED MODULE: ./src/lowcode/form-list/meta.ts
/* harmony default export */ var form_list_meta = ({
  group: 'Antd',
  componentName: 'AFormList',
  title: '表单列表',
  category: '表单',
  npm: {
    destructuring: true,
    componentName: 'AFormList'
  },
  props: [{
    name: 'name',
    title: {
      label: '字段名',
      tip: '字段名'
    },
    isRequired: true,
    propType: 'string'
  }, {
    name: 'initialValue',
    title: {
      label: '默认值',
      tip: '设置子元素默认值，如果与 Form 的 initialValues 冲突则以 Form 为准'
    },
    propType: 'object',
    setter: 'JsonSetter'
  }],
  configure: {
    component: {
      isContainer: true
    },
    supports: {
      className: true,
      style: true
    }
  },
  snippets: [{
    title: '表单列表',
    screenshot: 'https://user-images.githubusercontent.com/5419886/221425341-e982c944-8af4-4bad-9c17-1b2fd3fda835.png',
    schema: {
      componentName: 'AFormList',
      props: {}
    }
  }]
});
;// CONCATENATED MODULE: ./src/lowcode/grid-col/meta.ts
// @ts-ignore
function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}
/* harmony default export */ var grid_col_meta = ({
  componentName: 'ACol',
  title: '栅格-列',
  props: [{
    name: 'span',
    title: {
      label: '占位格数',
      tip: '栅格占位格数'
    },
    propType: 'number',
    setter: {
      componentName: 'NumberSetter',
      props: {
        min: 0,
        max: 24
      }
    }
  }, {
    name: 'order',
    title: {
      label: '栅格顺序',
      tip: '栅格顺序'
    },
    propType: 'number'
  }, {
    name: 'pull',
    title: {
      label: '右侧偏移',
      tip: '栅格往右移动格数'
    },
    propType: 'number',
    setter: {
      componentName: 'NumberSetter',
      props: {
        min: 0,
        max: 24
      }
    }
  }, {
    name: 'push',
    title: {
      label: '左侧偏移',
      tip: '栅格往左移动格数'
    },
    propType: 'number',
    setter: {
      componentName: 'NumberSetter',
      props: {
        min: 0,
        max: 24
      }
    }
  }],
  configure: {
    component: {
      isContainer: true,
      nestingRule: {
        parentWhitelist: ['ARow']
      }
    },
    supports: {
      style: true
    },
    advanced: {
      getResizingHandlers: () => {
        return ['e'];
      },
      callbacks: {
        resizeStart: (e, currentNode) => {
          const parent = currentNode.parent;
          if (parent) {
            const parentNode = parent.getDOMNode();
            if (parentNode) {
              currentNode.parentRect = parentNode.getBoundingClientRect();
            }
          }
          currentNode.beforeSpan = currentNode.getPropValue('span') || 24;
          currentNode.startRect = currentNode.getRect();
        },
        resize: (e, currentNode) => {
          const {
            deltaX
          } = e;
          const startWidth = currentNode.startRect ? currentNode.startRect.width : currentNode.beforeSpan * (currentNode.parentRect.width / 24);
          let width = startWidth + deltaX;
          if (!currentNode.startRect) {
            currentNode.startRect = {
              width
            };
          }
          width = clamp(width, 0, currentNode.parentRect.width);
          const allowMoveX = Math.round(width - startWidth); // 实际被允许的x轴移动
          currentNode.moveAColumn = Math.round(allowMoveX / (currentNode.parentRect.width / 24)); // 计算移动距离所占的列
          if (allowMoveX > 0) {
            currentNode.moveAColumn++;
          } else {
            currentNode.moveAColumn--;
          }
          currentNode.targetAColumn = clamp(currentNode.beforeSpan + currentNode.moveAColumn, 1, 24);
          // currentNode.setPropValue('span', currentNode.targetAColumn);
          const dom = currentNode.getDOMNode();
          dom.style.width = `${Math.round(width)}px`;
          dom.style.flex = 'none';
          dom.style.maxWidth = '100%';
        },
        resizeEnd: (e, currentNode) => {
          currentNode.getDOMNode().style.cssText = '';
          currentNode.targetAColumn = clamp(currentNode.targetAColumn, 1, 24);
          currentNode.setPropValue('span', currentNode.targetAColumn);
        }
      }
    }
  },
  snippets: []
});
;// CONCATENATED MODULE: ./src/lowcode/grid-row/meta.ts
/* harmony default export */ var grid_row_meta = ({
  componentName: 'ARow',
  title: '栅格-行',
  props: [{
    name: 'align',
    title: {
      label: '垂直对齐方式',
      tip: '垂直对齐方式'
    },
    propType: {
      type: 'oneOf',
      value: ['top', 'middle', 'bottom']
    }
  }, {
    name: 'gutter',
    title: {
      label: '间隔',
      tip: '栅格间隔，单位为像素(px)'
    },
    propType: {
      type: 'oneOfType',
      value: ['object', {
        type: 'arrayOf',
        value: 'number'
      }, 'number']
    },
    defaultValue: {
      xs: 8,
      sm: 16,
      md: 24
    },
    extraProps: {
      getValue(target) {
        const {
          node
        } = target;
        const gutter = node.getPropValue('gutter');
        if (typeof gutter === 'number') {
          return gutter;
        } else if (Array.isArray(gutter)) {
          return gutter[0];
        }
        return 0;
      },
      setValue(target, value) {
        const {
          node
        } = target;
        const gutter = node.getPropValue('gutter');
        if (Array.isArray(gutter)) {
          gutter[0] = value;
          node.setPropValue('gutter', gutter);
        } else {
          node.setPropValue('gutter', [value, 0]);
        }
      }
    }
  }, {
    name: 'justify',
    title: {
      label: '水平排列方式',
      tip: '水平排列方式'
    },
    propType: {
      type: 'oneOf',
      value: ['start', 'end', 'center', 'space-around', 'space-between']
    }
  }, {
    name: 'wrap',
    title: {
      label: '自动换行',
      tip: '是否自动换行'
    },
    propType: 'bool',
    defaultValue: true
  }],
  configure: {
    component: {
      isContainer: true,
      nestingRule: {
        childWhitelist: ['ACol']
      }
    },
    supports: {
      style: true
    }
  },
  snippets: [{
    title: '两栏',
    screenshot: 'https://alifd.alicdn.com/fusion-cool/icons/icon-antd/1-1.png',
    schema: {
      componentName: 'ARow',
      props: {},
      children: [{
        componentName: 'ACol',
        props: {
          span: 12
        }
      }, {
        componentName: 'ACol',
        props: {
          span: 12
        }
      }]
    }
  }, {
    title: '三栏',
    screenshot: 'https://alifd.alicdn.com/fusion-cool/icons/icon-antd/1-1-1.png',
    schema: {
      componentName: 'ARow',
      props: {},
      children: [{
        componentName: 'ACol',
        props: {
          span: 8
        }
      }, {
        componentName: 'ACol',
        props: {
          span: 8
        }
      }, {
        componentName: 'ACol',
        props: {
          span: 8
        }
      }]
    }
  }, {
    title: '四栏',
    screenshot: 'https://alifd.alicdn.com/fusion-cool/icons/icon-antd/1-1-1-1.png',
    schema: {
      componentName: 'ARow',
      props: {},
      children: [{
        componentName: 'ACol',
        props: {
          span: 6
        }
      }, {
        componentName: 'ACol',
        props: {
          span: 6
        }
      }, {
        componentName: 'ACol',
        props: {
          span: 6
        }
      }, {
        componentName: 'ACol',
        props: {
          span: 6
        }
      }]
    }
  }, {
    title: '1:3',
    screenshot: 'https://alifd.alicdn.com/fusion-cool/icons/icon-antd/1-3.png',
    schema: {
      componentName: 'ARow',
      props: {},
      children: [{
        componentName: 'ACol',
        props: {
          span: 6
        }
      }, {
        componentName: 'ACol',
        props: {
          span: 18
        }
      }]
    }
  }]
});
;// CONCATENATED MODULE: external "Vue"
var external_Vue_namespaceObject = Vue;
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js??clonedRuleSet-131.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/lowcode/icon/antd-icon-setter-vue/Icon.vue?vue&type=script&setup=true&lang=ts


const _hoisted_1 = {
  role: "img",
  class: "anticon"
};
const _hoisted_2 = ["dangerouslySetInnerHTML"];

/* harmony default export */ var Iconvue_type_script_setup_true_lang_ts = (/*#__PURE__*/(0,external_Vue_namespaceObject.defineComponent)({
  __name: 'Icon',
  props: {
    type: {
      type: String,
      default: 'SmileOutlined'
    },
    icons: {},
    symbol: {
      type: Object,
      default() {
        return {
          innerHTML: ''
        };
      }
    }
  },
  setup(__props) {
    const props = __props;
    /* eslint-disable */
    let innerHTML = (0,external_Vue_namespaceObject.reactive)({});
    (0,external_Vue_namespaceObject.onMounted)(() => {
      innerHTML = {
        __html: props.symbol.innerHTML
      };
    });
    return (_ctx, _cache) => {
      return (0,external_Vue_namespaceObject.openBlock)(), (0,external_Vue_namespaceObject.createElementBlock)("span", _hoisted_1, [((0,external_Vue_namespaceObject.openBlock)(), (0,external_Vue_namespaceObject.createElementBlock)("svg", {
        viewBox: "64 64 896 896",
        width: "1em",
        height: "1em",
        fill: "currentColor",
        dangerouslySetInnerHTML: (0,external_Vue_namespaceObject.unref)(innerHTML)
      }, null, 8, _hoisted_2))]);
    };
  }
}));
;// CONCATENATED MODULE: ./src/lowcode/icon/antd-icon-setter-vue/Icon.vue?vue&type=script&setup=true&lang=ts
 
;// CONCATENATED MODULE: ./src/lowcode/icon/antd-icon-setter-vue/Icon.vue



const __exports__ = Iconvue_type_script_setup_true_lang_ts;

/* harmony default export */ var Icon = (__exports__);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js??clonedRuleSet-131.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/lowcode/icon/antd-icon-setter-vue/index.vue?vue&type=script&setup=true&lang=ts



const _withScopeId = n => (_pushScopeId("data-v-041720a6"), n = n(), _popScopeId(), n);
const antd_icon_setter_vuevue_type_script_setup_true_lang_ts_hoisted_1 = {
  class: "lc-antd-icon-setter"
};
const antd_icon_setter_vuevue_type_script_setup_true_lang_ts_hoisted_2 = {
  class: "lc-antd-icon-setter-header"
};
const _hoisted_3 = {
  class: "lc-antd-icon-setter-content"
};
const _hoisted_4 = {
  class: "lc-antd-icon-setter-list"
};
const _hoisted_5 = ["onClick"];
const _hoisted_6 = {
  class: "lc-antd-icon-setter-list-item-name"
};



/* harmony default export */ var antd_icon_setter_vuevue_type_script_setup_true_lang_ts = (/*#__PURE__*/(0,external_Vue_namespaceObject.defineComponent)({
  __name: 'index',
  props: {
    value: String,
    type: String,
    defaultValue: String,
    placeholder: String,
    hasClear: Boolean,
    change: () => undefined,
    icons: Array
  },
  setup(__props) {
    const props = __props;
    /* eslint-disable */
    const IconGroupNameMap = {
      outlined: '线框风格',
      filled: '实底风格',
      'two-tone': '双色风格',
      iconfont: 'Iconfont'
    };
    const search = (0,external_Vue_namespaceObject.ref)('');
    let icons = (0,external_Vue_namespaceObject.ref)({});
    let groups = (0,external_Vue_namespaceObject.ref)([]);
    let selectedGroup = (0,external_Vue_namespaceObject.ref)('outlined');
    let firstLoad = (0,external_Vue_namespaceObject.ref)(true);
    let list = (0,external_Vue_namespaceObject.ref)([]);
    let {
      value,
      defaultValue,
      type,
      change = val => {},
      placeholder
    } = props;
    if (firstLoad && defaultValue && typeof value === 'undefined') {
      change(defaultValue);
      firstLoad.value = false;
    }
    const handleChange = icon => {
      if (type === 'string') {
        change(icon);
      } else if (type === 'node') {
        change({
          componentName: "AIcon",
          props: {
            type: Icon
          }
        });
      }
    };
    const onSearch = searchValue => {
      search.value = searchValue;
      console.log('onSearch value', searchValue);
    };
    const getIconfontIconList = () => {
      const iframe = document.querySelector('iframe.lc-simulator-content-frame');
      const antdIcons = (0,lodash.get)(iframe, 'contentWindow.icons', {});
      // iconfont的js会在页面中添加svg元素
      const symbols = Array.prototype.slice.call(iframe.contentDocument.querySelectorAll('svg[style="position: absolute; width: 0px; height: 0px; overflow: hidden;"][aria-hidden="true"] > symbol'));
      const Icon = antdIcons.createFromIconfontCN();
      let list = [];
      symbols.map(symbol => {
        const {
          id
        } = symbol;
        list.push({
          name: id,
          group: 'iconfont',
          innerHTML: symbol.innerHTML
        });
      });
      return {
        list,
        Icon
      };
    };
    const getAntdIconList = () => {
      const iframe = document.querySelector('iframe.lc-simulator-content-frame');
      const antdIcons = (0,lodash.get)(iframe, 'contentWindow.icons', {});
      return Object.keys(antdIcons).map(key => {
        var _item$render;
        const item = antdIcons[key];
        if (typeof item !== 'object') {
          return null;
        }
        const name = (item === null || item === void 0 ? void 0 : item.displayName) || (item === null || item === void 0 ? void 0 : (_item$render = item.render) === null || _item$render === void 0 ? void 0 : _item$render.displayName) || key;
        let group = 'outlined';
        const lowercaseName = name.toLowerCase();
        if (/outlined$/.test(lowercaseName)) {
          group = 'outlined';
        } else if (/filled$/.test(lowercaseName)) {
          group = 'filled';
        } else if (/twotone$/.test(lowercaseName)) {
          group = 'two-tone';
        } else {
          return null;
        }
        return {
          name,
          group,
          icon: item
        };
      }).filter(Boolean);
    };
    const getIconList = () => {
      const iconfontIconList = getIconfontIconList();
      const antdIconList = getAntdIconList();
      return [...antdIconList, ...iconfontIconList.list];
    };
    const handleList = () => {
      const currentGroup = groups.value.find(item => item.group === selectedGroup);
      list.value = ((currentGroup === null || currentGroup === void 0 ? void 0 : currentGroup.list) || []).filter(item => {
        return search.value ? item.name.toLowerCase().indexOf(search.value.toLowerCase()) : true;
      });
    };
    (0,external_Vue_namespaceObject.onMounted)(() => {
      const iconList = getIconList();
      console.log('iconList------>', iconList);
      let currentIcons = {};
      let currentGroups = [];
      iconList.forEach(item => {
        var _currentGroups$;
        const {
          group
        } = item;
        if (group.every(item => item.group !== group)) {
          currentGroups.push({
            group: group,
            list: []
          });
        }
        const target = currentGroups.find(item => item.group === group);
        target.list.push(item);
        icons[item.name] = item === null || item === void 0 ? void 0 : item.icon;
        icons.value = currentIcons;
        groups.value = currentGroups;
        selectedGroup.value = (_currentGroups$ = currentGroups[0]) === null || _currentGroups$ === void 0 ? void 0 : _currentGroups$.group;
      });
    });
    (0,external_Vue_namespaceObject.watch)([() => selectedGroup, () => search, () => groups], handleList, {
      immediate: true
    });
    return (_ctx, _cache) => {
      const _component_a_radio = (0,external_Vue_namespaceObject.resolveComponent)("a-radio");
      const _component_a_radio_group = (0,external_Vue_namespaceObject.resolveComponent)("a-radio-group");
      const _component_a_input_search = (0,external_Vue_namespaceObject.resolveComponent)("a-input-search");
      const _component_a_button = (0,external_Vue_namespaceObject.resolveComponent)("a-button");
      const _component_a_popover = (0,external_Vue_namespaceObject.resolveComponent)("a-popover");
      return (0,external_Vue_namespaceObject.openBlock)(), (0,external_Vue_namespaceObject.createElementBlock)("div", antd_icon_setter_vuevue_type_script_setup_true_lang_ts_hoisted_1, [(0,external_Vue_namespaceObject.createVNode)(_component_a_popover, {
        class: "lc-antd-icon-setter-balloon",
        visible: "",
        title: "",
        trigger: "click"
      }, {
        content: (0,external_Vue_namespaceObject.withCtx)(() => [(0,external_Vue_namespaceObject.createElementVNode)("div", antd_icon_setter_vuevue_type_script_setup_true_lang_ts_hoisted_2, [(0,external_Vue_namespaceObject.createVNode)(_component_a_radio_group, {
          value: (0,external_Vue_namespaceObject.unref)(selectedGroup),
          "onUpdate:value": _cache[0] || (_cache[0] = $event => (0,external_Vue_namespaceObject.isRef)(selectedGroup) ? selectedGroup.value = $event : selectedGroup = $event),
          onChange: _ctx.changeGroup
        }, {
          default: (0,external_Vue_namespaceObject.withCtx)(() => [((0,external_Vue_namespaceObject.openBlock)(true), (0,external_Vue_namespaceObject.createElementBlock)(external_Vue_namespaceObject.Fragment, null, (0,external_Vue_namespaceObject.renderList)((0,external_Vue_namespaceObject.unref)(groups), item => {
            return (0,external_Vue_namespaceObject.openBlock)(), (0,external_Vue_namespaceObject.createBlock)(_component_a_radio, {
              key: item.group,
              value: item.group
            }, {
              default: (0,external_Vue_namespaceObject.withCtx)(() => [(0,external_Vue_namespaceObject.createTextVNode)((0,external_Vue_namespaceObject.toDisplayString)(IconGroupNameMap[item.group]), 1)]),
              _: 2
            }, 1032, ["value"]);
          }), 128))]),
          _: 1
        }, 8, ["value", "onChange"]), (0,external_Vue_namespaceObject.createVNode)(_component_a_input_search, {
          class: "lc-antd-icon-setter-header-search",
          value: search.value,
          "onUpdate:value": _cache[1] || (_cache[1] = $event => search.value = $event),
          placeholder: "请输入",
          onChange: onSearch
        }, null, 8, ["value"])]), (0,external_Vue_namespaceObject.createElementVNode)("div", _hoisted_3, [(0,external_Vue_namespaceObject.createElementVNode)("ul", _hoisted_4, [((0,external_Vue_namespaceObject.openBlock)(true), (0,external_Vue_namespaceObject.createElementBlock)(external_Vue_namespaceObject.Fragment, null, (0,external_Vue_namespaceObject.renderList)((0,external_Vue_namespaceObject.unref)(list), item => {
          return (0,external_Vue_namespaceObject.openBlock)(), (0,external_Vue_namespaceObject.createElementBlock)("li", {
            class: "lc-antd-icon-setter-list-item",
            key: item.name,
            onClick: $event => handleChange(item.name)
          }, [(0,external_Vue_namespaceObject.createVNode)(Icon, {
            type: item.name,
            icons: (0,external_Vue_namespaceObject.unref)(icons),
            style: {
              "font-size": "16px"
            }
          }, null, 8, ["type", "icons"]), (0,external_Vue_namespaceObject.createElementVNode)("div", _hoisted_6, (0,external_Vue_namespaceObject.toDisplayString)(item.name), 1)], 8, _hoisted_5);
        }), 128))])])]),
        default: (0,external_Vue_namespaceObject.withCtx)(() => [(0,external_Vue_namespaceObject.createVNode)(_component_a_button, {
          type: "primary"
        }, {
          default: (0,external_Vue_namespaceObject.withCtx)(() => [(0,external_Vue_namespaceObject.createTextVNode)("Hover me")]),
          _: 1
        })]),
        _: 1
      })]);
    };
  }
}));
;// CONCATENATED MODULE: ./src/lowcode/icon/antd-icon-setter-vue/index.vue?vue&type=script&setup=true&lang=ts
 
;// CONCATENATED MODULE: ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-122.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-122.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-122.use[2]!./node_modules/less-loader/dist/cjs.js??clonedRuleSet-122.use[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/lowcode/icon/antd-icon-setter-vue/index.vue?vue&type=style&index=0&id=041720a6&scoped=true&lang=less
// extracted by mini-css-extract-plugin

;// CONCATENATED MODULE: ./src/lowcode/icon/antd-icon-setter-vue/index.vue?vue&type=style&index=0&id=041720a6&scoped=true&lang=less

// EXTERNAL MODULE: ./node_modules/vue-loader/dist/exportHelper.js
var exportHelper = __webpack_require__(1769);
;// CONCATENATED MODULE: ./src/lowcode/icon/antd-icon-setter-vue/index.vue



;


const antd_icon_setter_vue_exports_ = /*#__PURE__*/(0,exportHelper/* default */.Z)(antd_icon_setter_vuevue_type_script_setup_true_lang_ts, [['__scopeId',"data-v-041720a6"]])

/* harmony default export */ var antd_icon_setter_vue = (antd_icon_setter_vue_exports_);
;// CONCATENATED MODULE: ./src/lowcode/icon/meta.ts
/* eslint-disable */

// @ts-ignore
/* harmony default export */ var icon_meta = ({
  group: 'Antd',
  componentName: 'AIcon',
  title: '图标',
  category: '基础组件',
  npm: {
    destructuring: true,
    componentName: 'AIcon'
  },
  props: [{
    name: 'class',
    title: {
      label: '设置图标的样式名',
      tip: '设置图标的样式名'
    },
    propType: 'string'
  }, {
    name: 'style',
    title: {
      label: '设置图标的样式，例如 `fontSize` 和 `color`',
      tip: '设置图标的样式，例如 `fontSize` 和 `color`'
    },
    propType: 'object'
  }, {
    name: 'type',
    description: '图标',
    propType: 'string',
    setter: antd_icon_setter_vue
  }, {
    name: 'size',
    description: '大小',
    propType: 'number',
    defaultValue: 20
  }, {
    name: 'color',
    description: '颜色',
    propType: 'string',
    setter: 'ColorSetter'
  }, {
    name: 'rotate',
    title: {
      label: '旋转角度',
      tip: '图标旋转角度'
    },
    propType: 'number',
    defaultValue: 0
  }, {
    name: 'spin',
    title: {
      label: '旋转动画',
      tip: '是否有旋转动画'
    },
    propType: 'bool',
    defaultValue: false
  }],
  configure: {
    supports: {
      style: true
    }
  },
  snippets: [{
    title: '图标',
    screenshot: 'https://alifd.alicdn.com/fusion-cool/icons/icon-antd/icon-1.jpg',
    schema: {
      componentName: 'AIcon',
      props: {
        type: 'SmileOutlined',
        size: 20
      }
    }
  }]
});
;// CONCATENATED MODULE: ./src/lowcode/image/meta.ts
/* harmony default export */ var image_meta = ({
  group: 'Antd',
  componentName: 'AImage',
  title: '图片',
  category: '数据展示',
  npm: {
    destructuring: true,
    componentName: 'AImage'
  },
  props: [{
    name: 'src',
    title: {
      label: '图片地址',
      tip: '图片地址'
    },
    propType: {
      type: 'string',
      isRequired: true
    }
  }, {
    name: 'alt',
    title: {
      label: '替换文本',
      tip: '替换文本'
    },
    propType: 'string'
  }, {
    name: 'preview',
    title: {
      label: '支持预览',
      tip: '支持预览'
    },
    defaultValue: true,
    propType: 'bool'
  }, {
    name: 'fallback',
    title: {
      label: '失败地址',
      tip: '加载失败容错地址'
    },
    propType: 'string'
  }, {
    name: 'width',
    title: {
      label: '宽度',
      tip: '宽度'
    },
    propType: 'number'
  }, {
    name: 'height',
    title: {
      label: '高度',
      tip: '高度'
    },
    propType: 'number'
  }],
  configure: {
    supports: {
      style: true
    }
  },
  snippets: [{
    title: "图片",
    screenshot: "https://alifd.alicdn.com/fusion-cool/icons/icon-antd/image-1.png",
    schema: {
      componentName: "AImage",
      props: {
        src: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
        width: 120,
        height: 120
      }
    }
  }]
});
;// CONCATENATED MODULE: ./src/lowcode/input/meta.ts
/* eslint-disable */
// @ts-ignore
/* harmony default export */ var input_meta = ({
  group: 'Antd',
  componentName: 'AInput',
  title: '输入框',
  category: '表单',
  npm: {
    destructuring: true,
    componentName: 'AInput' // 导出组件名
  },

  // props 支持配置的属性
  props: [{
    name: 'defaultValue',
    title: {
      label: '默认值',
      tip: '默认内容'
    },
    propType: 'string',
    setter: 'StringSetter' // 设置器定义
  }, {
    name: 'value',
    title: {
      label: '当前值',
      tip: '当前值'
    },
    propType: 'string',
    setter: 'StringSetter'
  }, {
    name: 'label',
    propType: 'string',
    title: '标签文案',
    description: 'label'
  }, {
    name: 'allowClear',
    title: {
      label: '支持清除',
      tip: '是否允许清除'
    },
    propType: 'bool',
    setter: 'BoolSetter'
  }, {
    name: 'bordered',
    title: {
      label: '显示边框',
      tip: '是否有边框'
    },
    propType: 'bool',
    defaultValue: true,
    setter: 'BoolSetter'
  }, {
    name: 'disabled',
    title: {
      label: '是否禁用',
      tip: '是否为禁用状态'
    },
    propType: 'bool',
    defaultValue: false,
    setter: 'BoolSetter'
  }, {
    name: 'placeholder',
    title: {
      label: '占位提示',
      tip: '占位提示'
    },
    propType: 'string',
    defaultValue: '请输入',
    setter: 'StringSetter'
  }, {
    name: 'id',
    propType: 'string',
    description: 'ID'
  }, {
    name: 'name',
    propType: 'string'
  }, {
    name: 'type',
    propType: {
      type: 'oneOf',
      value: ['text', 'number', 'password', 'radio', 'range', 'reset', 'search', 'submit', 'tel', 'time', 'url', 'week', 'button', 'checkbox', 'color', 'date', 'textarea']
    }
  }, {
    name: 'maxLength',
    title: {
      label: '最大长度',
      tip: '最大长度'
    },
    propType: 'number',
    setter: 'NumberSetter'
  }, {
    name: 'size',
    title: {
      label: '控件大小',
      tip: '控件大小'
    },
    setter: {
      componentName: 'RadioGroupSetter',
      props: {
        options: [{
          title: '大',
          value: 'large'
        }, {
          title: '中',
          value: 'middle'
        }, {
          title: '小',
          value: 'small'
        }]
      }
    },
    propType: {
      type: 'oneOf',
      value: ['large', 'middle', 'small']
    },
    defaultValue: 'middle'
  }, {
    name: 'addonAfter',
    title: {
      label: '后置标签',
      tip: '后置标签'
    },
    propType: {
      type: 'oneOfType',
      value: ['string', 'node']
    }
  }, {
    name: 'addonBefore',
    title: {
      label: '前置标签',
      tip: '前置标签'
    },
    propType: {
      type: 'oneOfType',
      value: ['string', 'node']
    }
  }, {
    name: 'prefix',
    title: {
      label: '前缀',
      tip: '前缀'
    },
    propType: {
      type: 'oneOfType',
      value: ['string', 'node']
    }
  }, {
    name: 'suffix',
    title: {
      label: '后缀',
      tip: '后缀'
    },
    propType: {
      type: 'oneOfType',
      value: ['string', 'node']
    }
  }, {
    name: 'onChange',
    title: {
      label: '输入框内容变化时的回调',
      tip: '输入框内容变化时的回调'
    },
    propType: 'func'
  }, {
    name: 'onPressEnter',
    title: {
      label: '按下回车的回调',
      tip: '按下回车的回调'
    },
    propType: 'func'
  }, {
    name: 'onFocus',
    title: {
      label: '获取焦点回调',
      tip: '获取焦点回调'
    },
    propType: 'func'
  }, {
    name: 'onKeyDown',
    title: {
      label: '按键按下时的回调',
      tip: '按键按下时的回调'
    },
    propType: 'func'
  }, {
    name: 'onKeyPress',
    title: {
      label: '按键按下后的回调',
      tip: '按键按下之后释放之前的回调'
    },
    propType: 'func'
  }, {
    name: 'onKeyUp',
    title: {
      label: '按键释放回调',
      tip: '按键释放之后的回调'
    },
    propType: 'func'
  }, {
    name: 'onBlur',
    title: {
      label: '失去焦点回调',
      tip: '失去焦点回调'
    },
    propType: 'func'
  }],
  configure: {
    supports: {
      style: true,
      events: [{
        name: 'onChange',
        // 事件对应回调
        template: "onChange(event,${extParams}){\n// 输入框内容变化时的回调\nconsole.log('onChange',event);}"
      }, {
        name: 'onPressEnter',
        template: "onPressEnter(event,${extParams}){\n// 按下回车的回调\nconsole.log('onPressEnter',event);}"
      }, {
        name: 'onFocus',
        template: "onFocus(event,${extParams}){\n// 获取焦点回调\nconsole.log('onFocus',event);}"
      }, {
        name: 'onKeyDown',
        template: "onKeyDown(event,${extParams}){\n// 按键按下时的回调\nconsole.log('onKeyDown',event);}"
      }, {
        name: 'onKeyPress',
        template: "onKeyPress(event,${extParams}){\n// 按键按下后的回调\nconsole.log('onKeyPress',event);}"
      }, {
        name: 'onKeyUp',
        template: "onKeyUp(event,${extParams}){\n// 按键释放回调\nconsole.log('onKeyUp',event);}"
      }, {
        name: 'onBlur',
        template: "onBlur(event,${extParams}){\n// 按键释放回调\nconsole.log('onBlur',event);}"
      }]
    }
  },
  // snippets组件库展示字段
  snippets: [{
    title: '输入框',
    screenshot: 'https://alifd.alicdn.com/fusion-cool/icons/icon-antd/input-1.png',
    schema: {
      componentName: 'AInput',
      // props定义了默认属性
      props: {
        type: 'text',
        size: 'default',
        placeholder: '请输入',
        autocomplete: 'off'
      }
    }
  }]
});
;// CONCATENATED MODULE: ./src/lowcode/input-group/meta.ts
/* eslint-disable */
// @ts-ignore
/* harmony default export */ var input_group_meta = ({
  group: 'Antd',
  componentName: 'AInputGroup',
  title: '输入框组合',
  category: '表单',
  npm: {
    destructuring: true,
    componentName: 'AInputGroup'
  },
  props: [{
    name: 'compact',
    title: {
      label: '紧凑模式',
      tip: '是否用紧凑模式'
    },
    propType: 'bool',
    setter: 'BoolSetter'
  }, {
    name: 'size',
    title: {
      label: '尺寸',
      tip: '尺寸大小'
    },
    propType: {
      type: 'oneOf',
      value: ['large', 'default', 'small']
    },
    setter: {
      componentName: 'RadioGroupSetter',
      props: {
        options: [{
          title: '大',
          value: 'large'
        }, {
          title: '中',
          value: 'middle'
        }, {
          title: '小',
          value: 'small'
        }]
      }
    },
    defaultValue: 'default'
  }],
  configure: {
    component: {
      isContainer: true
    },
    supports: {
      style: true
    }
  },
  snippets: [{
    title: '输入框组合',
    screenshot: 'https://alifd.alicdn.com/fusion-cool/icons/icon-antd/input-group-1.jpg',
    schema: {
      componentName: 'AInputGroup',
      props: {},
      children: [{
        componentName: 'AInput',
        props: {
          placeholder: '请输入'
        }
      }, {
        componentName: 'AInput',
        props: {
          placeholder: '请输入'
        }
      }]
    }
  }]
});
;// CONCATENATED MODULE: ./src/lowcode/input-number/meta.ts
/* eslint-disable */
// @ts-ignore
/* harmony default export */ var input_number_meta = ({
  group: 'Antd',
  componentName: 'AInputNumber',
  title: '数字输入框',
  category: '基础组件',
  npm: {
    destructuring: true,
    componentName: 'AInputNumber'
  },
  configure: {
    props: [{
      name: 'defaultValue',
      title: {
        label: '默认值',
        tip: '默认值'
      },
      propType: 'number',
      setter: 'NumberSetter'
    }, {
      name: 'value',
      title: {
        label: '当前值',
        tip: '当前值'
      },
      propType: 'number',
      setter: 'NumberSetter'
    }, {
      name: 'autoFocus',
      title: {
        label: '自动聚焦',
        tip: '自动获取焦点'
      },
      propType: 'bool',
      defaultValue: false,
      setter: 'BoolSetter'
    }, {
      name: 'disabled',
      title: {
        label: '是否禁用',
        tip: '是否为禁用状态'
      },
      propType: 'bool',
      defaultValue: false,
      setter: 'BoolSetter'
    }, {
      name: 'placeholder',
      title: {
        label: '占位提示',
        tip: '占位提示'
      },
      propType: 'string',
      defaultValue: '请输入',
      setter: 'StringSetter'
    }, {
      name: 'controls',
      title: {
        label: '是否显示增减按钮',
        tip: '是否显示增减按钮'
      },
      propType: 'bool',
      defaultValue: true,
      setter: 'BoolSetter'
    }, {
      name: 'bordered',
      title: {
        label: '显示边框',
        tip: '是否有边框'
      },
      propType: 'bool',
      defaultValue: true,
      setter: 'BoolSetter'
    }, {
      name: 'addonAfter',
      title: {
        label: '后置标签',
        tip: '后置标签'
      },
      propType: {
        type: 'oneOfType',
        value: ['string', 'node']
      }
    }, {
      name: 'addonBefore',
      title: {
        label: '前置标签',
        tip: '前置标签'
      },
      propType: {
        type: 'oneOfType',
        value: ['string', 'node']
      }
    },
    // {
    //   name: 'formatter',
    //   title: {
    //     label: '指定输入框展示值的格式',
    //     tip: '指定输入框展示值的格式',
    //   },
    //   propType: 'func',
    // },
    {
      name: 'max',
      title: {
        label: '最大值',
        tip: '最大值'
      },
      propType: 'number',
      setter: 'NumberSetter'
    }, {
      name: 'min',
      title: {
        label: '最小值',
        tip: '最小值'
      },
      propType: 'number',
      setter: 'NumberSetter'
    }, {
      name: 'precision',
      title: {
        label: '数值精度',
        tip: '数值精度'
      },
      propType: 'number',
      setter: 'NumberSetter'
    },
    // {
    //   name: 'decimalSeparator',
    //   title: { label: '小数点', tip: '小数点' },
    //   propType: 'string',
    // },
    {
      name: 'size',
      title: {
        label: '尺寸',
        tip: '输入框大小'
      },
      propType: {
        type: 'oneOf',
        value: ['large', 'middle', 'small']
      },
      setter: {
        componentName: 'RadioGroupSetter',
        props: {
          options: [{
            title: '大',
            value: 'large'
          }, {
            title: '中',
            value: 'middle'
          }, {
            title: '小',
            value: 'small'
          }]
        }
      },
      defaultValue: 'middle'
    }, {
      name: 'step',
      title: {
        label: '单步长',
        tip: '每次改变步数'
      },
      propType: 'number',
      setter: 'NumberSetter'
    }, {
      name: 'onChange',
      title: {
        label: '变化回调',
        tip: '变化回调'
      },
      propType: 'func'
    }, {
      name: 'onPressEnter',
      title: {
        label: '按下回车的回调',
        tip: '按下回车的回调'
      },
      propType: 'func'
    }, {
      name: 'onFocus',
      title: {
        label: '获取焦点回调',
        tip: '获取焦点回调'
      },
      propType: 'func'
    }, {
      name: 'onKeyDown',
      title: {
        label: '按键按下时的回调',
        tip: '按键按下时的回调'
      },
      propType: 'func'
    }, {
      name: 'onKeyPress',
      title: {
        label: '按键按下后的回调',
        tip: '按键按下之后释放之前的回调'
      },
      propType: 'func'
    }, {
      name: 'onKeyUp',
      title: {
        label: '按键释放回调',
        tip: '按键释放之后的回调'
      },
      propType: 'func'
    }, {
      name: 'onBlur',
      title: {
        label: '失去焦点回调',
        tip: '失去焦点回调'
      },
      propType: 'func'
    }],
    supports: {
      style: true,
      loop: true,
      events: [{
        name: 'onChange',
        template: "onChange(value,${extParams}){\n// 变化回调\nconsole.log('onChange',value);}"
      }, {
        name: 'onPressEnter',
        template: "onPressEnter(event,${extParams}){\n// 按下回车的回调\nconsole.log('onPressEnter',event);}"
      }, {
        name: 'onFocus',
        template: "onFocus(event,${extParams}){\n// 获取焦点回调\nconsole.log('onFocus',event);}"
      }, {
        name: 'onKeyDown',
        template: "onKeyDown(event,${extParams}){\n// 按键按下时的回调\nconsole.log('onKeyDown',event);}"
      }, {
        name: 'onKeyPress',
        template: "onKeyPress(event,${extParams}){\n// 按键按下后的回调\nconsole.log('onKeyPress',event);}"
      }, {
        name: 'onKeyUp',
        template: "onKeyUp(event,${extParams}){\n// 按键释放回调\nconsole.log('onKeyUp',event);}"
      }, {
        name: 'onBlur',
        template: "onBlur(event,${extParams}){\n// 按键释放回调\nconsole.log('onBlur',event);}"
      }]
    }
  },
  snippets: [{
    title: '数字输入框',
    schema: {
      componentName: 'AInputNumber',
      props: {
        value: 10,
        placeholder: "请输入"
      }
    }
  }]
});
;// CONCATENATED MODULE: ./src/lowcode/input-password/meta.ts
/* eslint-disable */
// @ts-ignore
/* harmony default export */ var input_password_meta = ({
  group: 'Antd',
  componentName: 'AInputPassword',
  title: '密码框',
  category: '表单',
  npm: {
    destructuring: true,
    componentName: 'AInputPassword'
  },
  props: [{
    name: 'defaultValue',
    title: {
      label: '默认值',
      tip: '默认内容'
    },
    propType: 'string',
    setter: 'StringSetter'
  }, {
    name: 'value',
    title: '当前值',
    propType: 'string',
    setter: 'StringSetter'
  }, {
    name: 'allowClear',
    title: {
      label: '支持清除',
      tip: '是否允许清除'
    },
    propType: 'bool',
    setter: 'BoolSetter'
  }, {
    name: 'bordered',
    title: {
      label: '显示边框',
      tip: '是否有边框'
    },
    propType: 'bool',
    defaultValue: true,
    setter: 'BoolSetter'
  }, {
    name: 'disabled',
    title: {
      label: '是否禁用',
      tip: '是否为禁用状态'
    },
    propType: 'bool',
    defaultValue: false,
    setter: 'BoolSetter'
  }, {
    name: 'visibilityToggle',
    title: {
      label: '切换按钮',
      tip: '是否显示切换按钮'
    },
    propType: 'bool',
    defaultValue: true,
    setter: 'BoolSetter'
  }, {
    name: 'placeholder',
    title: {
      label: '占位提示',
      tip: '占位提示'
    },
    propType: 'string',
    defaultValue: '请输入',
    setter: 'StringSetter'
  }, {
    name: 'maxLength',
    title: {
      label: '最大长度',
      tip: '最大长度'
    },
    propType: 'number',
    setter: 'NumberSetter'
  }, {
    name: 'size',
    title: {
      label: '尺寸',
      tip: '密码框大小'
    },
    propType: {
      type: 'oneOf',
      value: ['large', 'default', 'small']
    },
    setter: {
      componentName: 'RadioGroupSetter',
      props: {
        options: [{
          title: '大',
          value: 'large'
        }, {
          title: '中',
          value: 'middle'
        }, {
          title: '小',
          value: 'small'
        }]
      }
    },
    defaultValue: 'default'
  }, {
    name: 'addonAfter',
    title: {
      label: '后置标签',
      tip: '后置标签'
    },
    propType: {
      type: 'oneOfType',
      value: ['string', 'node']
    }
  }, {
    name: 'addonBefore',
    title: {
      label: '前置标签',
      tip: '前置标签'
    },
    propType: {
      type: 'oneOfType',
      value: ['string', 'node']
    }
  }, {
    name: 'onChange',
    title: {
      label: '输入框内容变化时的回调',
      tip: '输入框内容变化时的回调'
    },
    propType: 'func'
  }, {
    name: 'onPressEnter',
    title: {
      label: '按下回车的回调',
      tip: '按下回车的回调'
    },
    propType: 'func'
  }],
  configure: {
    component: {
      isContainer: true
    },
    supports: {
      style: true,
      events: [{
        name: 'onChange',
        template: "onChange(event,${extParams}){\n// 输入框内容变化时的回调\nconsole.log('onChange',event);}"
      }, {
        name: 'onPressEnter',
        template: "onPressEnter(event,${extParams}){\n// 按下回车的回调\nconsole.log('onPressEnter',event);}"
      }]
    }
  },
  snippets: [{
    title: '密码框',
    screenshot: 'https://alifd.alicdn.com/fusion-cool/icons/icon-antd/input-password-1.png',
    schema: {
      componentName: 'AInputPassword',
      props: {}
    }
  }]
});
;// CONCATENATED MODULE: ./src/lowcode/input-search/meta.ts
/* eslint-disable */
// @ts-ignore
/* harmony default export */ var input_search_meta = ({
  group: 'Antd',
  componentName: 'AInputSearch',
  title: '搜索框',
  category: '表单',
  npm: {
    destructuring: true,
    componentName: 'AInputSearch'
  },
  props: [{
    name: 'defaultValue',
    title: {
      label: '默认值',
      tip: '默认值'
    },
    propType: 'string',
    setter: 'StringSetter'
  }, {
    name: 'value',
    title: {
      label: '当前值',
      tip: '当前值'
    },
    propType: 'string',
    setter: 'StringSetter'
  }, {
    name: 'bordered',
    title: {
      label: '显示边框',
      tip: '是否有边框'
    },
    propType: 'bool',
    defaultValue: true,
    setter: 'BoolSetter'
  }, {
    name: 'loading',
    title: {
      label: '加载状态',
      tip: 'loading'
    },
    propType: 'bool',
    setter: 'BoolSetter'
  }, {
    name: 'disabled',
    title: {
      label: '是否禁用',
      tip: '是否为禁用状态'
    },
    propType: 'bool',
    defaultValue: false,
    setter: 'BoolSetter'
  }, {
    name: 'placeholder',
    title: {
      label: '占位提示',
      tip: '占位提示'
    },
    propType: 'string',
    defaultValue: '请输入',
    setter: 'StringSetter'
  }, {
    name: 'size',
    title: {
      label: '控件大小',
      tip: '控件大小'
    },
    propType: {
      type: 'oneOf',
      value: ['large', 'middle', 'small']
    },
    setter: {
      componentName: 'RadioGroupSetter',
      props: {
        options: [{
          title: '大',
          value: 'large'
        }, {
          title: '中',
          value: 'middle'
        }, {
          title: '小',
          value: 'small'
        }]
      }
    },
    defaultValue: 'middle'
  }, {
    name: 'enterButton',
    title: {
      label: '确认按钮',
      tip: '是否有确认按钮，可设为按钮文字。该属性会与 addonAfter 冲突。'
    },
    propType: {
      type: 'oneOfType',
      value: ['bool', 'node']
    },
    defaultValue: false
  }, {
    name: 'addonAfter',
    title: {
      label: '后置标签',
      tip: '后置标签'
    },
    propType: {
      type: 'oneOfType',
      value: ['string', 'node']
    }
  }, {
    name: 'addonBefore',
    title: {
      label: '前置标签',
      tip: '前置标签'
    },
    propType: {
      type: 'oneOfType',
      value: ['string', 'node']
    }
  }, {
    name: 'prefix',
    title: {
      label: '前缀',
      tip: '前缀'
    },
    propType: {
      type: 'oneOfType',
      value: ['string', 'node']
    }
  }, {
    name: 'suffix',
    title: {
      label: '后缀',
      tip: '后缀'
    },
    propType: {
      type: 'oneOfType',
      value: ['string', 'node']
    }
  }, {
    name: 'onChange',
    title: {
      label: '输入框内容变化时的回调',
      tip: '输入框内容变化时的回调'
    },
    propType: 'func'
  }, {
    name: 'onPressEnter',
    title: {
      label: '按下回车的回调',
      tip: '按下回车的回调'
    },
    propType: 'func'
  }, {
    name: 'onSearch',
    title: {
      label: '点击搜索或按下回车键时的回调',
      tip: '点击搜索或按下回车键时的回调'
    },
    propType: 'func'
  }],
  configure: {
    component: {
      isContainer: true
    },
    supports: {
      style: true,
      events: [{
        name: 'onChange',
        template: "onChange(event,${extParams}){\n// 输入框内容变化时的回调\nconsole.log('onChange',event);}"
      }, {
        name: 'onPressEnter',
        template: "onPressEnter(event,${extParams}){\n// 按下回车的回调\nconsole.log('onPressEnter',event);}"
      }, {
        name: 'onSearch',
        template: "onSearch(value,event,${extParams}){\n// 点击搜索图标、清除图标，或按下回车键时的回调\nconsole.log('onSearch',value,event);}"
      }]
    }
  },
  snippets: [{
    title: '搜索框',
    screenshot: 'https://alifd.alicdn.com/fusion-cool/icons/icon-antd/input-search-1.png',
    schema: {
      componentName: 'AInputSearch',
      props: {
        placeholder: '搜索...'
      }
    }
  }]
});
;// CONCATENATED MODULE: ./src/lowcode/input-textarea/meta.ts
/* eslint-disable */
// @ts-ignore
/* harmony default export */ var input_textarea_meta = ({
  group: 'Antd',
  componentName: 'AInputTextArea',
  title: '长文本(文本框)',
  category: '表单',
  npm: {
    destructuring: true,
    componentName: 'AInputTextArea'
  },
  props: [{
    name: 'defaultValue',
    title: {
      label: '默认值',
      tip: '默认内容'
    },
    propType: 'string',
    setter: 'TextAreaSetter'
  }, {
    name: 'value',
    title: {
      label: '当前值',
      tip: '当前值'
    },
    propType: 'string',
    setter: 'TextAreaSetter'
  }, {
    name: 'bordered',
    title: {
      label: '显示边框',
      tip: '是否有边框'
    },
    propType: 'bool',
    defaultValue: true,
    setter: 'BoolSetter'
  }, {
    name: 'disabled',
    title: {
      label: '是否禁用',
      tip: '是否为禁用状态'
    },
    propType: 'bool',
    defaultValue: false,
    setter: 'BoolSetter'
  }, {
    name: 'placeholder',
    title: {
      label: '占位提示',
      tip: '占位提示'
    },
    propType: 'string',
    defaultValue: '请输入',
    setter: 'StringSetter'
  }, {
    name: 'showCount',
    title: {
      label: '展示字数',
      tip: '是否展示字数'
    },
    propType: 'bool',
    defaultValue: false,
    setter: 'BoolSetter'
  }, {
    name: 'id',
    title: {
      label: '输入框ID',
      tip: '输入框的ID'
    },
    propType: 'string',
    setter: 'StringSetter'
  }, {
    name: 'maxLength',
    title: {
      label: '最大长度',
      tip: '最大长度'
    },
    propType: 'number',
    setter: 'NumberSetter'
  }, {
    name: 'size',
    title: {
      label: '控件大小',
      tip: '控件大小'
    },
    propType: {
      type: 'oneOf',
      value: ['large', 'middle', 'small']
    },
    setter: {
      componentName: 'RadioGroupSetter',
      props: {
        options: [{
          title: '大',
          value: 'large'
        }, {
          title: '中',
          value: 'middle'
        }, {
          title: '小',
          value: 'small'
        }]
      }
    },
    defaultValue: 'middle'
  }, {
    name: 'autoSize',
    title: {
      label: '高度自适应设置',
      tip: '高度自适应设置'
    },
    propType: {
      type: 'oneOfType',
      value: ['bool', {
        type: 'shape',
        value: [{
          name: 'minRows',
          title: '最小行数',
          setter: 'NumberSetter',
          defaultValue: 3
        }, {
          name: 'maxRows',
          title: '最大行数',
          setter: 'NumberSetter',
          defaultValue: 3
        }]
      }]
    },
    defaultValue: false
  }, {
    name: 'onChange',
    title: {
      label: '输入框内容变化时的回调',
      tip: '输入框内容变化时的回调'
    },
    propType: 'func'
  }, {
    name: 'onPressEnter',
    title: {
      label: '按下回车的回调',
      tip: '按下回车的回调'
    },
    propType: 'func'
  }, {
    name: 'onResize',
    title: {
      label: 'resize 回调',
      tip: 'resize 回调'
    },
    propType: 'func'
  }, {
    name: 'onFocus',
    title: {
      label: '获取焦点回调',
      tip: '获取焦点回调'
    },
    propType: 'func'
  }, {
    name: 'onKeyDown',
    title: {
      label: '按键按下时的回调',
      tip: '按键按下时的回调'
    },
    propType: 'func'
  }, {
    name: 'onKeyPress',
    title: {
      label: '按键按下后的回调',
      tip: '按键按下之后释放之前的回调'
    },
    propType: 'func'
  }, {
    name: 'onKeyUp',
    title: {
      label: '按键释放回调',
      tip: '按键释放之后的回调'
    },
    propType: 'func'
  }, {
    name: 'onBlur',
    title: {
      label: '失去焦点回调',
      tip: '失去焦点回调'
    },
    propType: 'func'
  }],
  configure: {
    supports: {
      style: true,
      events: [{
        name: 'onChange',
        template: "onChange(event,${extParams}){\n// 输入框内容变化时的回调\nconsole.log('onChange',event);}"
      }, {
        name: 'onPressEnter',
        template: "onPressEnter(event,${extParams}){\n// 按下回车的回调\nconsole.log('onPressEnter',event);}"
      }, {
        name: 'onResize',
        template: "onResize({width,height},${extParams}){\n// resize 回调\nconsole.log('onResize',width,height);}"
      }, {
        name: 'onFocus',
        template: "onFocus(event,${extParams}){\n// 获取焦点回调\nconsole.log('onFocus',event);}"
      }, {
        name: 'onKeyDown',
        template: "onKeyDown(event,${extParams}){\n// 按键按下时的回调\nconsole.log('onKeyDown',event);}"
      }, {
        name: 'onKeyPress',
        template: "onKeyPress(event,${extParams}){\n// 按键按下后的回调\nconsole.log('onKeyPress',event);}"
      }, {
        name: 'onKeyUp',
        template: "onKeyUp(event,${extParams}){\n// 按键释放回调\nconsole.log('onKeyUp',event);}"
      }, {
        name: 'onBlur',
        template: "onBlur(event,${extParams}){\n// 按键释放回调\nconsole.log('onBlur',event);}"
      }]
    }
  },
  snippets: [{
    title: '长文本(文本框)',
    screenshot: 'https://alifd.alicdn.com/fusion-cool/icons/icon-antd/input-text-area-1.png',
    schema: {
      componentName: 'AInputTextArea',
      props: {
        autoSize: {
          minRows: 3,
          maxRows: 3
        },
        placeholder: '请输入'
      }
    }
  }]
});
;// CONCATENATED MODULE: ./src/lowcode/list/meta.ts
/* harmony default export */ var list_meta = ({
  group: 'Antd',
  componentName: 'AList',
  title: '列表',
  category: '数据展示',
  npm: {
    destructuring: true,
    componentName: 'AList'
  },
  props: [{
    title: '数据源',
    display: 'block',
    type: 'group',
    items: [{
      name: 'dataSource',
      title: {
        label: '列表数据源',
        tip: '列表数据源'
      },
      propType: {
        type: 'arrayOf',
        value: 'any'
      },
      setter: ['JsonSetter', 'VariableSetter']
    }, {
      name: 'loading',
      title: {
        label: '是否加载中',
        tip: 'loading | 当卡片内容还在加载中时，可以用 loading 展示一个占位'
      },
      propType: 'bool',
      defaultValue: false,
      setter: ['BoolSetter', 'VariableSetter']
    }, {
      name: 'rowKey',
      title: {
        label: '行Key',
        tip: 'rowKey | 当 renderItem 自定义渲染列表项有效时，自定义每一行的 key 的获取方式'
      },
      propType: {
        type: 'oneOfType',
        value: ['string', 'function']
      },
      defaultValue: 'id',
      setter: ['StringSetter', {
        componentName: 'FunctionSetter',
        props: {
          template: 'rowKey(item,${extParams}){\n// 自定义每一行的 key\nreturn `key-${item.id}`;\n}'
        }
      }, 'VariableSetter']
    }]
  }, {
    title: '外观',
    display: 'block',
    type: 'group',
    items: [{
      name: 'itemLayout',
      title: {
        label: '尺寸',
        tip: 'itemLayout  | 设置 List.Item 布局, 设置成 vertical 则竖直样式显示, 默认横排'
      },
      propType: {
        type: 'oneOf',
        value: ['horizontal', 'vertical']
      },
      defaultValue: 'horizontal',
      setter: [{
        componentName: 'RadioGroupSetter',
        props: {
          options: [{
            title: '水平',
            value: 'horizontal'
          }, {
            title: '垂直',
            value: 'vertical'
          }]
        }
      }, 'VariableSetter']
    }, {
      name: 'size',
      title: {
        label: '尺寸',
        tip: 'size  | 列表的尺寸'
      },
      propType: {
        type: 'oneOf',
        value: ['default', 'large', 'small']
      },
      defaultValue: 'default',
      setter: [{
        componentName: 'RadioGroupSetter',
        props: {
          options: [{
            title: '默认',
            value: 'default'
          }, {
            title: '大',
            value: 'large'
          }, {
            title: '小',
            value: 'small'
          }]
        }
      }, 'VariableSetter']
    }, {
      name: 'bordered',
      title: {
        label: '显示边框',
        tip: 'bordered | 是否展示边框'
      },
      propType: 'bool',
      defaultValue: true,
      setter: 'BoolSetter'
    }, {
      name: 'split',
      title: {
        label: '展示分割线',
        tip: 'split | 是否展示分割线'
      },
      propType: 'bool',
      defaultValue: true,
      setter: 'BoolSetter'
    }]
  }, {
    title: '栅格',
    display: 'block',
    type: 'group',
    items: [{
      name: 'gridEnable',
      title: {
        label: '启用栅格',
        tip: 'grid | 是否启用栅格'
      },
      propType: 'bool',
      setter: 'BoolSetter',
      extraProps: {
        setValue(target, value) {
          if (!value) {
            const {
              node
            } = target;
            node.setPropValue('grid', false);
          }
        }
      }
    }, {
      name: 'grid.column',
      title: {
        label: '列数',
        tip: 'grid.column | 栅格的列数'
      },
      propType: 'number',
      setter: 'NumberSetter',
      defaultValue: 4,
      condition: {
        type: 'JSFunction',
        value: 'target => !!target.getProps().getPropValue("gridEnable")'
      }
    }, {
      name: 'grid.gutter',
      title: {
        label: '间隔',
        tip: 'grid.gutter | 栅格的间隔'
      },
      propType: 'number',
      setter: 'NumberSetter',
      defaultValue: 0,
      condition: {
        type: 'JSFunction',
        value: 'target => !!target.getProps().getPropValue("gridEnable")'
      }
    }]
  }, {
    title: '分页',
    display: 'block',
    type: 'group',
    items: [{
      name: 'pagination',
      title: {
        label: '显示分页',
        tip: 'pagination | 显示分页'
      },
      propType: 'object',
      setter: 'BoolSetter',
      extraProps: {
        setValue: (target, value) => {
          if (value) {
            target.parent.setPropValue('pagination', {
              pageSize: 5
            });
          }
        }
      }
    }, {
      name: 'pagination.pageSize',
      title: {
        label: '每页条数',
        tip: 'pagination.pageSize | 每页条数'
      },
      setter: 'NumberSetter',
      condition: {
        type: 'JSFunction',
        value: 'target => !!target.getProps().getPropValue("pagination")'
      }
    }, {
      name: 'pagination.total',
      title: {
        label: '数据总数',
        tip: 'pagination.total | 数据总数'
      },
      setter: 'NumberSetter',
      condition: {
        type: 'JSFunction',
        value: 'target => !!target.getProps().getPropValue("pagination")'
      }
    },
    // {
    //   name: 'pagination.defaultCurrent',
    //   title: {
    //     label: '默认当前页',
    //     tip: 'pagination.defaultCurrent | 默认的当前页数',
    //   },
    //   setter: [
    //     {
    //       componentName: 'NumberSetter',
    //       props: {
    //         initialValue: 1,
    //       },
    //     },
    //     'VariableSetter',
    //   ],
    //   condition: {
    //     type: 'JSFunction',
    //     value: 'target => !!target.getProps().getPropValue("pagination")',
    //   },
    // },
    {
      name: 'pagination.current',
      title: {
        label: '当前页数',
        tip: 'pagination.current | 当前页数'
      },
      setter: 'NumberSetter',
      condition: {
        type: 'JSFunction',
        value: 'target => !!target.getProps().getPropValue("pagination")'
      }
    }, {
      name: 'pagination.showTotal',
      title: {
        label: '显示总数',
        tip: 'pagination.showTotal | 用于显示数据总量和当前数据顺序'
      },
      propType: 'func',
      setter: [{
        componentName: 'FunctionSetter',
        props: {
          template: 'showTotal(total,range,${extParams}){\n// 用于格式化显示表格数据总量\nreturn `共 ${total} 条`;\n}'
        }
      }, 'VariableSetter'],
      condition: {
        type: 'JSFunction',
        value: 'target => !!target.getProps().getPropValue("pagination")'
      }
    }, {
      name: 'pagination.showSizeChanger',
      title: {
        label: '页数切换',
        tip: 'pagination.showSizeChanger | 是否展示 pageSize 切换器'
      },
      propType: 'bool',
      setter: 'BoolSetter',
      defaultValue: false,
      condition: {
        type: 'JSFunction',
        value: 'target => !!target.getProps().getPropValue("pagination")'
      }
    }, {
      name: 'pagination.showQuickJumper',
      title: {
        label: '快速跳转',
        tip: 'pagination.showQuickJumper | 是否可以快速跳转至某页'
      },
      propType: 'bool',
      setter: 'BoolSetter',
      defaultValue: false,
      condition: {
        type: 'JSFunction',
        value: 'target => !!target.getProps().getPropValue("pagination")'
      }
    }, {
      name: 'pagination.simple',
      title: {
        label: '简单分页',
        tip: 'pagination.simple | 简单分页'
      },
      propType: 'bool',
      setter: 'BoolSetter',
      defaultValue: false,
      condition: {
        type: 'JSFunction',
        value: 'target => !!target.getProps().getPropValue("pagination")'
      }
    }, {
      name: 'pagination.size',
      title: {
        label: '分页尺寸',
        tip: 'pagination.size | 分页尺寸'
      },
      propType: {
        type: 'oneOf',
        value: ['default', 'small']
      },
      setter: [{
        componentName: 'RadioGroupSetter',
        props: {
          options: [{
            title: '默认',
            value: 'default'
          }, {
            title: '小',
            value: 'small'
          }]
        }
      }, 'VariableSetter'],
      defaultValue: 'default',
      condition: {
        type: 'JSFunction',
        value: 'target => !!target.getProps().getPropValue("pagination")'
      }
    }, {
      name: 'pagination.position',
      title: {
        label: '分页位置',
        tip: 'pagination.position | 分页位置'
      },
      setter: {
        componentName: 'SelectSetter',
        props: {
          options: [{
            title: '上',
            value: 'top'
          }, {
            title: '下',
            value: 'bottom'
          }, {
            title: '上下',
            value: 'both'
          }]
        },
        initialValue: 'bottomRight'
      },
      condition: {
        type: 'JSFunction',
        value: 'target => !!target.getProps().getPropValue("pagination")'
      }
    }]
  }, {
    title: '扩展',
    display: 'block',
    type: 'group',
    items: [{
      name: 'renderItem',
      title: {
        label: '渲染函数',
        tip: 'renderItem | 当使用 dataSource 时，可以用 `renderItem` 自定义渲染列表项'
      },
      propType: 'func',
      setter: [{
        componentName: 'SlotSetter',
        title: '渲染函数插槽',
        initialValue: {
          type: 'JSSlot',
          params: ['item'],
          value: [{
            componentName: 'AListItem',
            props: {},
            children: {
              componentName: 'ATypographyText',
              props: {
                children: {
                  type: 'JSExpression',
                  value: 'this.item.text'
                }
              }
            }
          }]
        }
      }, {
        componentName: 'FunctionSetter',
        props: {
          template: 'renderItem(item,${extParams}){\n// 自定义渲染列表项\nreturn `item`;\n}'
        }
      }, 'VariableSetter']
    }, {
      name: 'header',
      title: {
        label: '列表头部',
        tip: 'header | 列表头部'
      },
      propType: 'node',
      setter: {
        componentName: 'SlotSetter',
        initialValue: {
          type: 'JSSlot',
          value: [{
            componentName: 'ATypographyText',
            props: {
              children: '列表头部'
            }
          }]
        }
      }
    }, {
      name: 'footer',
      title: {
        label: '列表底部',
        tip: 'footer | 列表底部'
      },
      propType: 'node',
      setter: {
        componentName: 'SlotSetter',
        initialValue: {
          type: 'JSSlot',
          value: [{
            componentName: 'ATypographyText',
            props: {
              children: '列表底部'
            }
          }]
        }
      }
    }, {
      name: 'loadMore',
      title: {
        label: '加载更多',
        tip: 'loadMore | 加载更多'
      },
      propType: 'node',
      setter: {
        componentName: 'SlotSetter',
        initialValue: {
          type: 'JSSlot',
          value: [{
            componentName: 'Button',
            props: {
              children: 'loading more'
            }
          }]
        }
      }
    }]
  }],
  configure: {
    supports: {
      style: true,
      events: [{
        name: 'pagination.onChange',
        template: 'onChange(page,pageSize,${extParams}){\n// 页码或 pageSize 改变的回调\n}'
      }]
    }
  },
  snippets: [{
    title: '简单列表',
    screenshot: 'https://alifd.alicdn.com/fusion-cool/icons/icon-antd/list-1.png',
    schema: {
      componentName: 'AList',
      props: {
        dataSource: [{
          id: 1,
          text: 'Racing car sprays burning fuel into crowd.'
        }, {
          id: 2,
          text: 'Japanese princess to wed commoner.'
        }, {
          id: 3,
          text: 'Australian walks 100km after outback crash.'
        }, {
          id: 4,
          text: 'Man charged over missing wedding girl.'
        }, {
          id: 5,
          text: 'Los Angeles battles huge wildfires.'
        }],
        renderItem: {
          type: 'JSSlot',
          params: ['item'],
          value: [{
            componentName: 'AListItem',
            props: {},
            children: {
              componentName: 'ATypographyText',
              props: {
                children: {
                  type: 'JSExpression',
                  value: 'this.item.text'
                }
              }
            }
          }]
        },
        header: {
          type: 'JSSlot',
          value: [{
            componentName: 'ATypographyText',
            props: {
              children: '列表头部'
            }
          }]
        },
        footer: {
          type: 'JSSlot',
          value: [{
            componentName: 'ATypographyText',
            props: {
              children: '列表底部'
            }
          }]
        },
        itemLayout: 'horizontal',
        size: 'default',
        bordered: true,
        split: true,
        pagination: {
          pageSize: 5,
          total: 10,
          current: 1
        }
      }
    }
  }, {
    title: '基础列表',
    screenshot: 'https://alifd.alicdn.com/fusion-cool/icons/icon-antd/list-1.png',
    schema: {
      componentName: 'AList',
      props: {
        dataSource: [{
          id: 1,
          title: 'Ant Design Title 1',
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png',
          description: 'Ant Design, a design language for background applications, is refined by Ant UED Team'
        }, {
          id: 2,
          title: 'Ant Design Title 2',
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png',
          description: 'Ant Design, a design language for background applications, is refined by Ant UED Team'
        }, {
          id: 3,
          title: 'Ant Design Title 3',
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png',
          description: 'Ant Design, a design language for background applications, is refined by Ant UED Team'
        }, {
          id: 4,
          title: 'Ant Design Title 4',
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png',
          description: 'Ant Design, a design language for background applications, is refined by Ant UED Team'
        }, {
          id: 5,
          title: 'Ant Design Title 5',
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png',
          description: 'Ant Design, a design language for background applications, is refined by Ant UED Team'
        }],
        renderItem: {
          type: 'JSSlot',
          params: ['item'],
          value: [{
            componentName: 'AListItem',
            props: {},
            children: {
              componentName: 'AListItemMeta',
              props: {
                avatar: {
                  type: 'JSSlot',
                  value: [{
                    componentName: 'AAvatar',
                    props: {
                      // icon: {
                      //   componentName: 'AIcon',
                      //   props: {
                      //     type: 'UserOutlined',
                      //   },
                      // },
                      src: {
                        type: 'JSExpression',
                        value: 'this.item.avatar'
                      }
                    }
                  }]
                },
                title: {
                  type: 'JSSlot',
                  value: [{
                    componentName: 'ATypographyLink',
                    props: {
                      children: {
                        type: 'JSExpression',
                        value: 'this.item.title'
                      }
                    }
                  }]
                },
                description: {
                  type: 'JSSlot',
                  value: [{
                    componentName: 'ATypographyText',
                    props: {
                      children: {
                        type: 'JSExpression',
                        value: 'this.item.description'
                      }
                    }
                  }]
                }
              }
            }
          }]
        },
        itemLayout: 'horizontal',
        size: 'default',
        bordered: true,
        split: true,
        pagination: {
          pageSize: 10,
          total: 15,
          current: 1
        }
      }
    }
  }]
});
;// CONCATENATED MODULE: ./src/lowcode/list-item/meta.ts
/* harmony default export */ var list_item_meta = ({
  group: 'Antd',
  componentName: 'AListItem',
  title: '列表项',
  category: '数据展示',
  npm: {
    destructuring: true,
    componentName: 'AListItem'
  },
  props: [{
    name: 'actions',
    title: {
      label: '列表操作组',
      tip: '列表操作组'
    },
    propType: {
      type: 'arrayOf',
      value: 'node'
    },
    setter: {
      componentName: 'ArraySetter',
      props: {
        itemSetter: {
          componentName: 'SlotSetter',
          title: '操作组插槽',
          initialValue: {
            type: 'JSSlot',
            value: []
          }
        }
      }
    }
  }, {
    name: 'extra',
    title: {
      label: '额外内容',
      tip: '额外内容'
    },
    propType: 'node',
    setter: 'SlotSetter'
  }],
  configure: {
    component: {
      isContainer: true,
      nestingRule: {
        parentWhitelist: ['AList']
      }
    },
    supports: {
      style: true
    }
  }
});
;// CONCATENATED MODULE: ./src/lowcode/list-item-meta/meta.ts
/* harmony default export */ var list_item_meta_meta = ({
  group: 'Antd',
  componentName: 'AListItemMeta',
  title: '列表项内容',
  category: '数据展示',
  npm: {
    destructuring: true,
    componentName: 'AListItemMeta'
  },
  props: [{
    name: 'avatar',
    title: {
      label: '列表元素图标',
      tip: '列表元素的图标'
    },
    propType: {
      type: 'oneOfType',
      value: ['string', 'node']
    }
  }, {
    name: 'title',
    title: {
      label: '列表元素标题',
      tip: '列表元素的标题'
    },
    propType: {
      type: 'oneOfType',
      value: ['string', 'node']
    }
  }, {
    name: 'avatar',
    title: {
      label: '列表元素描述内容',
      tip: '列表元素的描述内容'
    },
    propType: {
      type: 'oneOfType',
      value: ['string', 'node']
    }
  }],
  configure: {
    component: {
      isContainer: true,
      nestingRule: {
        parentWhitelist: ['AList']
      }
    },
    supports: {
      style: true
    }
  }
});
;// CONCATENATED MODULE: ./src/lowcode/mentions/meta.ts
/* harmony default export */ var mentions_meta = ({
  group: 'Antd',
  componentName: 'AMentions',
  title: '提及',
  category: '数据展示',
  npm: {
    destructuring: true,
    componentName: 'AMentions'
  },
  props: [{
    name: 'defaultValue',
    title: {
      label: '默认值',
      tip: '默认值'
    },
    propType: 'string',
    setter: 'StringSetter'
  }, {
    name: 'autoFocus',
    title: {
      label: '自动聚焦',
      tip: '自动获得焦点'
    },
    propType: 'bool',
    defaultValue: false,
    setter: 'BoolSetter'
  }, {
    name: 'filterOption',
    title: {
      label: '自定义过滤逻辑',
      tip: '自定义过滤逻辑'
    },
    propType: {
      type: 'oneOfType',
      value: ['bool', 'func']
    }
  }, {
    name: 'notFoundContent',
    title: {
      label: '空值展示',
      tip: '当下拉列表为空时显示的内容'
    },
    propType: 'node'
  }, {
    name: 'placement',
    title: {
      label: '弹出层展示位置',
      tip: '弹出层展示位置'
    },
    propType: {
      type: 'oneOf',
      value: ['top', 'bottom']
    },
    setter: {
      componentName: 'RadioGroupSetter',
      props: {
        options: [{
          title: '上',
          value: 'top'
        }, {
          title: '下',
          value: 'bottom'
        }]
      }
    }
  }, {
    name: 'prefix',
    title: {
      label: '设置触发关键字',
      tip: '设置触发关键字'
    },
    propType: {
      type: 'oneOfType',
      value: ['string', {
        type: 'arrayOf',
        value: 'string'
      }]
    }
  }, {
    name: 'split',
    title: {
      label: '设置选中项前后分隔符',
      tip: '设置选中项前后分隔符'
    },
    propType: 'string'
  }, {
    name: 'validateSearch',
    title: {
      label: '自定义触发验证逻辑',
      tip: '自定义触发验证逻辑'
    },
    propType: 'func'
  }, {
    name: 'value',
    title: {
      label: '设置值',
      tip: '设置值'
    },
    propType: 'string'
  }, {
    name: 'onChange ',
    title: {
      label: '值改变时触发',
      tip: '值改变时触发'
    },
    propType: 'func'
  }, {
    name: 'onSelect',
    title: {
      label: '选择选项时触发',
      tip: '选择选项时触发'
    },
    propType: 'func'
  }, {
    name: 'onSearch',
    title: {
      label: '搜索时触发',
      tip: '搜索时触发'
    },
    propType: 'func'
  }, {
    name: 'onFocus',
    title: {
      label: '获得焦点时触发',
      tip: '获得焦点时触发'
    },
    propType: 'func'
  }, {
    name: 'onBlur',
    title: {
      label: '失去焦点时触发',
      tip: '失去焦点时触发'
    },
    propType: 'func'
  }, {
    name: 'getPopupContainer',
    title: {
      label: '指定建议框挂载的 HTML 节点',
      tip: '指定建议框挂载的 HTML 节点'
    },
    propType: 'func'
  }],
  configure: {
    supports: {
      style: true
    },
    events: [{
      name: 'onChange ',
      template: "onChange (text,${extParams}){\n// 值改变时触发\nconsole.log('onChange ',text);}"
    }, {
      name: 'onSelect',
      template: "onSelect(option,prefix,${extParams}){\n// 选择选项时触发\nconsole.log('onSelect',option,prefix);}"
    }, {
      name: 'onSearch',
      template: "onSearch(text,prefix,${extParams}){\n// 搜索时触发\nconsole.log('onSearch',text,prefix);}"
    }, {
      name: 'onFocus',
      template: "onFocus(${extParams}){\n// 获得焦点时触发\nconsole.log('onFocus');}"
    }, {
      name: 'onBlur',
      template: "onBlur(${extParams}){\n// 失去焦点时触发\nconsole.log('onBlur');}"
    }]
  },
  snippets: [{
    title: "提及",
    screenshot: "https://alifd.alicdn.com/fusion-cool/icons/icon-antd/mentions-1.png",
    schema: {
      componentName: "AMentions",
      props: {}
    }
  }]
});
;// CONCATENATED MODULE: ./src/lowcode/menu/util.ts


const itemsExtraProps = {
  getValue(target, fieldValue) {
    const map = target.node.children.map(child => {
      const key = child.getPropValue('key') ? String(child.getPropValue('key')) : child.id;
      const result = {
        key,
        category: child.componentName
      };
      ['children', 'items', 'title'].forEach(propKey => {
        if (child.getPropValue(propKey)) {
          // @ts-ignore
          result[propKey] = child.getPropValue(propKey);
        }
      });
      return result;
    });
    return map.length === 0 ? fieldValue : map;
  },
  setValue(target, value) {
    const {
      node
    } = target;
    const map = {};
    if (!Array.isArray(value)) {
      value = [];
    }
    value.forEach(item => {
      const tabItem = Object.assign({}, item);
      // @ts-ignore
      map[item.key] = tabItem;
    });
    node.children.mergeChildren(child => {
      const key = String(child.getPropValue('key'));
      if (Object.hasOwnProperty.call(map, key) &&
      // @ts-ignore
      child.componentName.includes(map[key].category)) {
        // @ts-ignore
        if (map[key].category === 'Menu.Item') {
          // @ts-ignore
          child.setPropValue('children', map[key].children);
        } else {
          // @ts-ignore
          child.setPropValue('title', map[key].title || map[key].children);
        }
        // @ts-ignore
        delete map[key];
        return false;
      }
      return true;
    }, () => {
      const items = [];
      for (const key in map) {
        // @ts-ignore
        const itemProps = map[key];
        if (Object.hasOwnProperty.call(map, key)) {
          if (itemProps.category === 'Menu.Item') {
            items.push({
              componentName: 'Menu.Item',
              props: {
                key: itemProps.key,
                children: itemProps.children
              }
            });
          } else {
            items.push({
              componentName: 'Menu.SubMenu',
              props: {
                key: itemProps.key,
                title: itemProps.title || itemProps.children,
                items: itemProps.items && itemProps.items.length === 0 ? itemProps.items : [{
                  key: `item-${uuid()}`,
                  category: 'Menu.Item',
                  children: '子菜单名'
                }]
              }
            });
          }
        }
      }
      return items;
    }, (child1, child2) => {
      const a = value.findIndex(item => String(item.key) === String(child1.getPropValue('key')));
      const b = value.findIndex(item => String(item.key) === String(child2.getPropValue('key')));
      return a - b;
    });
  }
};
;// CONCATENATED MODULE: ./src/lowcode/menu/meta.ts


/* harmony default export */ var menu_meta = ({
  group: 'Antd',
  componentName: 'AMenu',
  title: '菜单',
  category: '基础组件',
  npm: {
    destructuring: true,
    componentName: 'AMenu'
  },
  props: [{
    name: 'items',
    title: '菜单项',
    setter: {
      componentName: 'ArraySetter',
      props: {
        itemSetter: {
          componentName: 'ObjectSetter',
          props: {
            config: {
              items: [{
                name: 'key',
                title: 'key',
                setter: 'StringSetter',
                initialValue: val => val || uuid()
              }, {
                name: 'children',
                title: '菜单名称',
                setter: 'StringSetter'
              }, {
                name: 'category',
                title: {
                  label: '类型',
                  tip: '菜单项类型'
                },
                propType: {
                  type: 'oneOf',
                  value: ['Menu.Item', 'Menu.SubMenu', 'Menu.ItemGroup']
                },
                setter: [{
                  componentName: 'RadioGroupSetter',
                  props: {
                    options: [{
                      title: 'Item',
                      value: 'Menu.Item'
                    }, {
                      title: 'SubMenu',
                      value: 'Menu.SubMenu'
                    }, {
                      title: 'ItemGroup',
                      value: 'Menu.ItemGroup'
                    }]
                  }
                }, 'VariableSetter']
              }]
            }
          },
          initialValue: () => {
            return {
              key: 'item-' + uuid(),
              category: 'Menu.Item',
              children: '菜单名'
            };
          }
        }
      }
    },
    extraProps: itemsExtraProps
  }, {
    name: 'defaultOpenKeys',
    title: {
      label: '初始展开菜单项',
      tip: '初始展开的 SubMenu 菜单项 key 数组'
    },
    propType: {
      type: 'arrayOf',
      value: 'string'
    }
  }, {
    name: 'defaultSelectedKeys',
    title: {
      label: '初始选中的菜单项',
      tip: '初始选中的菜单项 key 数组'
    },
    propType: {
      type: 'arrayOf',
      value: 'string'
    }
  }, {
    name: 'forceSubMenuRender',
    title: {
      label: '子菜单预渲染',
      tip: '在子菜单展示之前就渲染进 DOM'
    },
    propType: 'bool',
    defaultValue: false
  }, {
    name: 'inlineCollapsed',
    title: {
      label: '是否收起',
      tip: 'inline 时菜单是否收起状态'
    },
    propType: 'bool'
  }, {
    name: 'inlineIndent',
    title: {
      label: '缩进宽度',
      tip: 'inline 模式的菜单缩进宽度'
    },
    propType: 'number'
  }, {
    name: 'mode',
    title: {
      label: '菜单类型',
      tip: '菜单类型，现在支持垂直、水平、和内嵌模式三种'
    },
    propType: {
      type: 'oneOf',
      value: ['vertical', 'horizontal', 'inline']
    }
  }, {
    name: 'multiple',
    title: {
      label: '是否允许多选',
      tip: '是否允许多选'
    },
    propType: 'bool',
    defaultValue: false
  }, {
    name: 'openKeys',
    title: {
      label: '当前展开的菜单项',
      tip: '当前展开的 SubMenu 菜单项 key 数组'
    },
    propType: {
      type: 'arrayOf',
      value: 'string'
    }
  }, {
    name: 'selectable',
    title: {
      label: '是否允许选中',
      tip: '是否允许选中'
    },
    propType: 'bool',
    defaultValue: true
  }, {
    name: 'selectedKeys',
    title: {
      label: '当前选中项',
      tip: '当前选中的菜单项 key 数组'
    },
    propType: {
      type: 'arrayOf',
      value: 'string'
    }
  }, {
    name: 'style',
    title: {
      label: '根节点样式',
      tip: '根节点样式'
    },
    propType: 'object'
  }, {
    name: 'subMenuCloseDelay',
    title: {
      label: '关闭延时',
      tip: '用户鼠标离开子菜单后关闭延时，单位：秒'
    },
    propType: 'number'
  }, {
    name: 'subMenuOpenDelay',
    title: {
      label: '开启延时',
      tip: '用户鼠标进入子菜单后开启延时，单位：秒'
    },
    propType: 'number'
  }, {
    name: 'theme',
    title: {
      label: '主题颜色',
      tip: '主题颜色'
    },
    propType: {
      type: 'oneOf',
      value: ['light', 'dark']
    }
  }, {
    name: 'click',
    title: {
      label: '点击 MenuItem 调用函数',
      tip: '点击 MenuItem 调用函数'
    },
    propType: 'func'
  }, {
    name: 'deselect',
    title: {
      label: '取消选中时调用函数',
      tip: '取消选中时调用，仅在 multiple 生效'
    },
    propType: 'func'
  }, {
    name: 'triggerSubMenuAction',
    title: {
      label: '触发方式',
      tip: '展开/关闭的触发行为'
    },
    propType: {
      type: 'oneOf',
      value: ['hover', 'click']
    }
  }, {
    name: 'openChange',
    title: {
      label: 'SubMenu 展开/关闭的回调',
      tip: '展开/关闭的回调'
    },
    propType: 'func'
  }, {
    name: 'select',
    title: {
      label: '被选中时调用函数',
      tip: '被选中时调用函数'
    },
    propType: 'func'
  }, {
    name: 'overflowedIndicator',
    title: {
      label: '折叠图标',
      tip: '自定义 Menu 折叠时的图标'
    },
    propType: 'node'
  }],
  configure: {
    supports: {
      style: true,
      events: [{
        name: 'click',
        template: "click({item,key,keyPath,domEvent},${extParams}){\n// 点击 MenuItem 调用此函数\nconsole.log('click',item,key,keyPath,domEvent);}"
      }, {
        name: 'deselect',
        template: "deselect({item,key,keyPath,selectedKeys,domEvent},${extParams}){\n// 取消选中时调用，仅在 multiple 生效\nconsole.log('deselect',item,key,keyPath,selectedKeys,domEvent);}"
      }, {
        name: 'openChange',
        template: "openChange(openKeys,${extParams}){\n// SubMenu 展开/关闭的回调\nconsole.log('openChange',openKeys);}"
      }, {
        name: 'select',
        template: "select({item,key,keyPath,selectedKeys,domEvent},${extParams}){\n// 被选中时调用\nconsole.log('select',item,key,keyPath,selectedKeys,domEvent);}"
      }]
    }
  },
  snippets: [{
    title: "菜单",
    screenshot: "https://alifd.alicdn.com/fusion-cool/icons/icon-antd/menu-1.jpg",
    schema: {
      componentName: "AMenu",
      props: {
        mode: "inline",
        defaultSelectedKeys: ["1"],
        defaultOpenKeys: ["sub1"],
        theme: "dark",
        items: [{
          key: "item-i5wd",
          category: "AMenuItem",
          children: "菜单名"
        }]
      }
    }
  }]
});
;// CONCATENATED MODULE: ./src/lowcode/menu-item/meta.ts
/* harmony default export */ var menu_item_meta = ({
  group: 'Antd',
  componentName: 'AMenuItem',
  title: '菜单项',
  category: '基础组件',
  npm: {
    destructuring: true,
    componentName: 'AMenuItem'
  },
  props: [{
    name: 'children',
    title: {
      label: '内容',
      tip: '内容'
    },
    propType: {
      type: 'oneOfType',
      value: ['string', 'node']
    }
  }, {
    name: 'danger',
    title: {
      label: '错误状态',
      tip: '展示错误状态样式'
    },
    propType: 'bool',
    defaultValue: false
  }, {
    name: 'disabled',
    title: {
      label: '是否禁用',
      tip: '是否为禁用状态'
    },
    propType: 'bool',
    defaultValue: false
  }, {
    name: 'icon',
    title: {
      label: '菜单图标',
      tip: '菜单图标'
    },
    propType: {
      type: 'oneOfType',
      value: ['string', 'node']
    },
    defaultValue: false
  }, {
    name: 'key',
    title: {
      label: '唯一标志',
      tip: 'item 的唯一标志'
    },
    propType: 'string'
  }, {
    name: 'title',
    title: {
      label: '悬浮标题',
      tip: '设置收缩时展示的悬浮标题'
    },
    propType: 'string'
  }],
  configure: {
    component: {
      isContainer: true,
      nestingRule: {
        parentWhitelist: ['AMenu']
      }
    },
    supports: {
      style: true
    }
  },
  snippets: []
});
;// CONCATENATED MODULE: ./src/lowcode/menu-item-group/meta.ts


/* harmony default export */ var menu_item_group_meta = ({
  group: 'Antd',
  componentName: 'AMenuItemGroup',
  title: '菜单组',
  category: '基础组件',
  npm: {
    destructuring: true,
    componentName: 'AMenuItemGroup'
  },
  props: [{
    name: 'items',
    title: '菜单组项',
    setter: {
      componentName: 'ArraySetter',
      props: {
        itemSetter: {
          componentName: 'ObjectSetter',
          props: {
            config: {
              items: [{
                name: 'key',
                title: 'key',
                setter: 'StringSetter',
                initialValue: val => val || uuid()
              }, {
                name: 'children',
                tite: '菜单名',
                setter: 'StringSetter'
              }, {
                name: 'category',
                title: {
                  label: '类型',
                  tip: '菜单项类型'
                },
                propType: {
                  type: 'oneOf',
                  value: ['Menu.Item', 'Menu.SubMenu', 'Menu.ItemGroup']
                },
                setter: [{
                  componentName: 'RadioGroupSetter',
                  props: {
                    options: [{
                      title: 'Item',
                      value: 'Menu.Item'
                    }, {
                      title: 'SubMenu',
                      value: 'Menu.SubMenu'
                    }, {
                      title: 'ItemGroup',
                      value: 'Menu.ItemGroup'
                    }]
                  }
                }, 'VariableSetter']
              }]
            }
          },
          initialValue: () => {
            return {
              key: `item-${uuid()}`,
              category: 'Menu.Item',
              children: '子菜单名'
            };
          }
        }
      }
    },
    extraProps: itemsExtraProps
  }, {
    name: 'children',
    title: {
      label: '分组的菜单项',
      tip: '分组的菜单项'
    },
    propType: {
      type: 'oneOfType',
      value: ['string', 'node']
    }
  }, {
    name: 'title',
    title: {
      label: '分组标题',
      tip: '分组标题'
    },
    propType: {
      type: 'oneOfType',
      value: ['string', 'node']
    }
  }],
  configure: {
    component: {
      isContainer: true,
      nestingRule: {
        parentWhitelist: ['AMenu', 'ASubMenu']
      }
    },
    supports: {
      style: true
    }
  },
  snippets: []
});
;// CONCATENATED MODULE: ./src/lowcode/menu-subMenu/meta.ts


/* harmony default export */ var menu_subMenu_meta = ({
  group: 'Antd',
  componentName: 'ASubMenu',
  title: '子菜单',
  category: '基础组件',
  npm: {
    destructuring: true,
    componentName: 'ASubMenu'
  },
  props: [{
    name: 'items',
    title: '子菜单项',
    setter: {
      componentName: 'ArraySetter',
      props: {
        itemSetter: {
          componentName: 'ObjectSetter',
          props: {
            config: {
              items: [{
                name: 'key',
                title: 'key',
                setter: 'StringSetter',
                initialValue: val => val || uuid()
              }, {
                name: 'children',
                title: '子菜单名',
                setter: 'StringSetter'
              }, {
                name: 'category',
                title: {
                  label: '类型',
                  tip: '菜单项类型'
                },
                propType: {
                  type: 'oneOf',
                  value: ['Menu.Item', 'Menu.SubMenu', 'Menu.ItemGroup']
                },
                setter: [{
                  componentName: 'RadioGroupSetter',
                  props: {
                    options: [{
                      title: 'Item',
                      value: 'Menu.Item'
                    }, {
                      title: 'SubMenu',
                      value: 'Menu.SubMenu'
                    }, {
                      title: 'ItemGroup',
                      value: 'Menu.ItemGroup'
                    }]
                  }
                }, 'VariableSetter']
              }]
            }
          },
          initialValue: () => {
            return {
              key: `item-${uuid()}`,
              category: 'Menu.Item',
              children: '子菜单名'
            };
          }
        }
      }
    },
    extraProps: itemsExtraProps
  }, {
    name: 'danger',
    title: {
      label: '错误状态',
      tip: '展示错误状态样式'
    },
    propType: 'bool',
    defaultValue: true
  }, {
    name: 'disabled',
    title: {
      label: '是否禁用',
      tip: '是否为禁用状态'
    },
    propType: 'bool',
    defaultValue: false
  }, {
    name: 'icon',
    title: {
      label: '菜单图标',
      tip: '菜单图标'
    },
    propType: {
      type: 'oneOfType',
      value: ['string', 'node']
    },
    defaultValue: false
  }, {
    name: 'key',
    title: {
      label: '唯一标志',
      tip: 'item 的唯一标志'
    },
    propType: 'string'
  }, {
    name: 'title',
    title: {
      label: '悬浮标题',
      tip: '设置收缩时展示的悬浮标题'
    },
    propType: 'string'
  }],
  configure: {
    component: {
      isContainer: true,
      nestingRule: {
        parentWhitelist: ['AMenu']
      }
    },
    supports: {
      style: true
    }
  },
  snippets: []
});
;// CONCATENATED MODULE: ./src/lowcode/modal/meta.ts
/* harmony default export */ var modal_meta = ({
  group: 'Antd',
  componentName: 'AModal',
  title: '对话框',
  category: '反馈',
  npm: {
    destructuring: true,
    componentName: 'AModal'
  },
  props: [{
    name: 'title',
    title: {
      label: '标题',
      tip: '标题'
    },
    propType: {
      type: 'oneOfType',
      value: ['string', 'node']
    }
  }, {
    name: 'cancelText',
    title: {
      label: '取消按钮文字',
      tip: '取消按钮文字'
    },
    propType: {
      type: 'oneOfType',
      value: ['string', 'node']
    }
  }, {
    name: 'okText',
    title: {
      label: '确认按钮文字',
      tip: '确认按钮文字'
    },
    propType: {
      type: 'oneOfType',
      value: ['string', 'node']
    }
  }, {
    name: 'visible',
    title: {
      label: '是否可见',
      tip: '对话框是否可见'
    },
    propType: 'bool',
    setter: 'BoolSetter',
    supportVariable: true
  }, {
    name: 'centered',
    title: {
      label: '垂直居中',
      tip: '垂直居中展示 Modal'
    },
    propType: 'bool',
    defaultValue: false,
    setter: 'BoolSetter',
    supportVariable: true
  }, {
    name: 'closable',
    title: {
      label: '显示关闭按钮',
      tip: '是否显示右上角的关闭按钮'
    },
    propType: 'bool',
    defaultValue: true,
    setter: 'BoolSetter',
    supportVariable: true
  }, {
    name: 'closeIcon',
    title: {
      label: '关闭图标',
      tip: '自定义关闭图标'
    },
    propType: 'node'
  }, {
    name: 'confirmLoading',
    title: {
      label: '确定按钮loading',
      tip: '确定按钮loading'
    },
    propType: 'bool',
    defaultValue: false,
    setter: 'BoolSetter',
    supportVariable: true
  }, {
    name: 'destroyOnClose',
    title: {
      label: '销毁子元素',
      tip: '关闭时销毁 Modal 里的子元素'
    },
    propType: 'bool',
    defaultValue: false,
    setter: 'BoolSetter',
    supportVariable: true
  }, {
    name: 'forceRender',
    title: {
      label: '强制渲染Modal',
      tip: '强制渲染Modal'
    },
    propType: 'bool',
    defaultValue: false,
    setter: 'BoolSetter',
    supportVariable: true
  }, {
    name: 'keyboard',
    title: {
      label: 'esc关闭',
      tip: '是否支持键盘 esc 关闭'
    },
    propType: 'bool',
    defaultValue: true,
    setter: 'BoolSetter',
    supportVariable: true
  }, {
    name: 'mask',
    title: {
      label: '是否展示遮罩',
      tip: '是否展示遮罩'
    },
    propType: 'bool',
    defaultValue: true,
    setter: 'BoolSetter',
    supportVariable: true
  }, {
    name: 'maskClosable',
    title: {
      label: '点击蒙层关闭',
      tip: '点击蒙层是否允许关闭'
    },
    propType: 'bool',
    defaultValue: true,
    setter: 'BoolSetter',
    supportVariable: true
  }, {
    name: 'zIndex',
    title: {
      label: 'z-index',
      tip: '设置 Modal 的 `z-index`'
    },
    propType: 'number',
    setter: 'NumberSetter',
    supportVariable: true
  }, {
    name: 'width',
    title: {
      label: '宽度',
      tip: '宽度'
    },
    propType: {
      type: 'oneOfType',
      value: ['string', 'number']
    }
  }, {
    name: 'footer',
    title: {
      label: '底部内容',
      tip: '底部内容，当不需要默认底部按钮时，可以设为 `footer={null}`'
    },
    propType: {
      type: 'oneOfType',
      value: ['string', 'node']
    }
  }, {
    name: 'okType',
    title: {
      label: '确认按钮类型',
      tip: '确认按钮类型'
    },
    propType: {
      type: 'oneOf',
      value: ['default', 'small']
    },
    setter: {
      componentName: 'RadioGroupSetter',
      props: {
        options: [{
          title: 'primary',
          value: 'primary'
        }, {
          title: 'ghost',
          value: 'ghost'
        }, {
          title: 'dashed',
          value: 'dashed'
        }, {
          title: 'link',
          value: 'link'
        }, {
          title: 'text',
          value: 'text'
        }, {
          title: 'default',
          value: 'default'
        }]
      }
    }
  }, {
    name: 'okButtonProps',
    title: {
      label: '确认按钮props',
      tip: '确认按钮props'
    },
    propType: 'object',
    setter: {
      componentName: 'ObjectSetter',
      props: {
        config: {
          items: [{
            name: 'disabled',
            title: {
              label: '是否可点击',
              tip: 'disabled'
            },
            propType: 'bool',
            setter: [{
              componentName: 'BoolSetter',
              initialValue: false
            }, 'VariableSetter'],
            isRequired: true
          }]
        }
      }
    }
  }, {
    name: 'bodyStyle',
    title: {
      label: 'body样式',
      tip: 'Modal body 样式'
    },
    propType: 'object'
  }, {
    name: 'maskStyle',
    title: {
      label: '遮罩样式',
      tip: '遮罩样式'
    },
    propType: 'object'
  }, {
    name: 'style',
    title: {
      label: '浮层样式',
      tip: '可用于设置浮层的样式，调整浮层位置等'
    },
    propType: 'object'
  }, {
    name: 'wrapClassName',
    title: {
      label: '外层容器类名',
      tip: '对话框外层容器的类名'
    },
    propType: 'string',
    setter: 'StringSetter',
    supportVariable: true
  }, {
    name: 'getContainer',
    title: {
      label: '指定挂载节点',
      tip: '指定 Modal 挂载的 HTML 节点, false 为挂载在当前 dom'
    },
    propType: {
      type: 'oneOfType',
      value: ['node', 'func']
    }
  }, {
    name: 'onCancel',
    title: {
      label: '取消按钮回调',
      tip: '点击遮罩层或右上角叉或取消按钮的回调'
    },
    propType: 'func'
  }, {
    name: 'onOk',
    title: {
      label: '点击确定回调',
      tip: '点击确定回调'
    },
    propType: 'func'
  }],
  configure: {
    component: {
      isContainer: true,
      isModal: true,
      rootSelector: '.ant-modal-content',
      nestingRule: {
        parentWhitelist: ['Page', 'Component']
      }
    },
    supports: {
      style: true
    },
    events: [{
      name: 'afterClose',
      templete: "afterClose(${extParams}){\n// 完全关闭后的回调\nconsole.log('afterClose');}"
    }, {
      name: 'cancel',
      template: "cancel(${extParams}){\n// 点击遮罩层或右上角叉或取消按钮的回调\nconsole.log('cancel');}"
    }, {
      name: 'ok',
      template: "ok(${extParams}){\n// 点击确定回调\nconsole.log('ok');}"
    }]
  },
  snippets: [{
    title: '普通型',
    screenshot: 'https://alifd.alicdn.com/fusion-cool/icons/icon-antd/modal-1.png',
    schema: {
      componentName: 'AModal',
      props: {
        title: 'Basic Modal',
        okText: '确认',
        cancelText: '取消',
        open: true,
        destroyOnClose: true
      },
      children: []
    }
  }, {
    title: '隐藏底部',
    screenshot: 'https://alifd.alicdn.com/fusion-cool/icons/icon-antd/modal-2.png',
    schema: {
      componentName: 'AModal',
      props: {
        title: 'Basic Modal',
        okText: '确认',
        cancelText: '取消',
        open: true,
        footer: null,
        destroyOnClose: true
      },
      children: []
    }
  }]
});
;// CONCATENATED MODULE: ./src/lowcode/page-header/meta.ts
/* harmony default export */ var page_header_meta = ({
  group: 'Antd',
  componentName: 'APageHeader',
  title: '页头',
  category: '基础组件',
  npm: {
    destructuring: true,
    componentName: 'APageHeader'
  },
  props: [{
    name: 'title',
    title: {
      label: '标题',
      tip: '自定义标题文字'
    },
    propType: {
      type: 'oneOfType',
      value: ['string', 'node']
    }
  }, {
    name: 'subTitle',
    title: {
      label: '二级标题',
      tip: '自定义的二级标题文字'
    },
    propType: {
      type: 'oneOfType',
      value: ['string', 'node']
    }
  }, {
    name: 'ghost',
    title: {
      label: 'ghost风格',
      tip: 'ghost风格'
    },
    propType: 'bool',
    defaultValue: true
  }, {
    name: 'tags',
    title: {
      label: 'tag 列表',
      tip: 'title 旁的 tag 列表'
    },
    propType: 'node'
  }, {
    name: 'extra',
    title: {
      label: '操作区',
      tip: '操作区，位于 title 行的行尾'
    },
    propType: 'node'
  }, {
    name: 'footer',
    title: {
      label: '页脚',
      tip: 'PageHeader 的页脚，一般用于渲染 TabBar'
    },
    propType: 'node'
  }, {
    name: 'avatar',
    title: {
      label: '头像',
      tip: '标题栏旁的头像'
    },
    propType: 'object',
    supportVariable: false,
    setter: [{
      componentName: 'ObjectSetter',
      props: {
        config: {
          items: [{
            name: 'src',
            title: {
              label: '地址',
              tip: '头像地址'
            },
            setter: {
              componentName: 'StringSetter'
            }
          }]
        }
      }
    }, 'JsonSetter']
  }, {
    name: 'breadcrumb',
    title: {
      label: '面包屑的配置',
      tip: '面包屑的配置'
    },
    propType: 'object',
    supportVariable: false,
    setter: [{
      componentName: 'ObjectSetter',
      props: {
        config: {
          items: [{
            name: 'routes',
            title: {
              label: '路由栈信息',
              tip: '路由栈信息'
            },
            setter: {
              componentName: 'ArraySetter',
              props: {
                itemSetter: {
                  componentName: 'ObjectSetter',
                  initialValue: {
                    path: 'path',
                    breadcrumbName: 'pathName'
                  },
                  isRequired: true,
                  props: {
                    config: {
                      items: [{
                        name: 'path',
                        defaultValue: 'path',
                        title: {
                          label: '路径',
                          tip: 'path | 路径'
                        },
                        setter: 'StringSetter'
                      }, {
                        name: 'breadcrumbName',
                        defaultValue: 'pathName',
                        title: {
                          label: '名称',
                          tip: 'breadcrumbName | 名称'
                        },
                        setter: 'StringSetter'
                      }]
                    }
                  }
                }
              }
            }
          }]
        }
      }
    }, 'JsonSetter']
  }, {
    name: 'back',
    title: {
      label: '返回按钮的点击事件',
      tip: '返回按钮的点击事件'
    },
    propType: 'func'
  }],
  configure: {
    supports: {
      style: true,
      events: [{
        name: 'back',
        template: "back(${extParams}){\n// 返回按钮的点击事件\nconsole.log('back');}"
      }]
    }
  },
  snippets: [{
    title: "页头",
    screenshot: "https://alifd.alicdn.com/fusion-cool/icons/icon-antd/page-header-1.jpg",
    schema: {
      componentName: "APageHeader",
      props: {
        title: "Title",
        subTitle: "lyl test for page-header"
      }
    }
  }]
});
;// CONCATENATED MODULE: ./src/lowcode/pagination/meta.ts
/* eslint-disable */
// @ts-ignore
/* harmony default export */ var pagination_meta = ({
  group: 'Antd',
  componentName: 'APagination',
  title: '分页',
  category: '基础组件',
  npm: {
    destructuring: true,
    componentName: 'APagination'
  },
  props: [{
    title: '数据',
    display: 'block',
    type: 'group',
    items: [{
      name: 'defaultPageSize',
      title: {
        label: '默认每页条数',
        tip: 'defaultPageSize | 默认每页条数'
      },
      propType: 'number',
      setter: 'NumberSetter',
      defaultValue: 10
    }, {
      name: 'pageSize',
      title: {
        label: '每页条数',
        tip: 'pageSize | 每页条数'
      },
      propType: 'number',
      setter: 'NumberSetter',
      defaultValue: 10
    }, {
      name: 'total',
      title: {
        label: '数据总数',
        tip: 'total | 数据总数'
      },
      propType: 'number',
      setter: 'NumberSetter',
      defaultValue: 15
    }, {
      name: 'defaultCurrent',
      title: {
        label: '默认当前页',
        tip: 'defaultCurrent | 默认的当前页数'
      },
      propType: 'number',
      setter: 'NumberSetter',
      defaultValue: 1
    }, {
      name: 'current',
      title: {
        label: '当前页数',
        tip: 'current | 当前页数'
      },
      propType: 'number',
      setter: 'NumberSetter',
      defaultValue: 1
    }]
  }, {
    title: '功能',
    display: 'block',
    type: 'group',
    items: [{
      name: 'disabled',
      title: {
        label: '是否禁用',
        tip: 'disabled | 是否禁用'
      },
      propType: 'bool',
      setter: 'BoolSetter',
      defaultValue: false
    }, {
      name: 'onShowSizeChanger',
      title: {
        label: '页数切换',
        tip: 'onShowSizeChanger | 是否展示 pageSize 切换器'
      },
      propType: 'bool',
      setter: 'BoolSetter',
      defaultValue: false
    }, {
      name: 'showQuickJumper',
      title: {
        label: '快速跳转',
        tip: 'showQuickJumper | 是否可以快速跳转至某页'
      },
      propType: 'bool',
      setter: 'BoolSetter',
      defaultValue: false
    }, {
      name: 'hideOnSinglePage',
      title: {
        label: '单页隐藏',
        tip: 'hideOnSinglePage | 只有一页时是否隐藏分页器'
      },
      propType: 'bool',
      setter: 'BoolSetter',
      defaultValue: false
    }, {
      name: 'showLessItems',
      title: {
        label: '显示较少页面',
        tip: 'showLessItems | 是否显示较少页面内容'
      },
      propType: 'bool',
      setter: 'BoolSetter',
      defaultValue: false
    }, {
      name: 'pageSizeOptions',
      title: {
        label: '可选分页数',
        tip: 'pageSizeOptions | 指定 pageSize切换器 可选择的每页条数'
      },
      propType: 'object',
      setter: 'JsonSetter'
    }]
  }, {
    title: '外观',
    display: 'block',
    type: 'group',
    items: [{
      name: 'simple',
      title: {
        label: '简单分页',
        tip: 'simple | 简单分页'
      },
      propType: 'bool',
      setter: 'BoolSetter',
      defaultValue: false
    }, {
      name: 'size',
      title: {
        label: '分页尺寸',
        tip: 'size | 分页尺寸'
      },
      propType: {
        type: 'oneOf',
        value: ['default', 'small']
      },
      setter: [{
        componentName: 'RadioGroupSetter',
        props: {
          options: [{
            title: '默认',
            value: 'default'
          }, {
            title: '小',
            value: 'small'
          }]
        }
      }, 'VariableSetter'],
      defaultValue: 'default'
    }, {
      name: 'showTotal',
      title: {
        label: '显示总数',
        tip: 'showTotal | 用于显示数据总量和当前数据顺序'
      },
      propType: 'func',
      setter: [{
        componentName: 'FunctionSetter',
        props: {
          template: 'showTotal(total,range,${extParams}){\n// 用于格式化显示表格数据总量\nreturn `共 ${total} 条`;\n}'
        }
      }, 'VariableSetter']
    }, {
      name: 'showTitle',
      title: {
        label: '页码提示',
        tip: 'showTitle | 是否显示原生 tooltip 页码提示'
      },
      propType: 'bool',
      setter: 'BoolSetter',
      defaultValue: false
    }, {
      name: 'responsive',
      title: {
        label: '宽度自适应',
        tip: 'responsive | 当 size 未指定时，根据屏幕宽度自动调整尺寸'
      },
      propType: 'bool',
      setter: 'BoolSetter',
      defaultValue: false
    }]
  }],
  configure: {
    supports: {
      style: true,
      events: [{
        name: 'onChange',
        template: 'onChange (page,pageSize){\n//页码或 pageSize 改变的回调\nconsole.log("onChange ",page,pageSize);}'
      }, {
        name: 'onShowSizeChange',
        template: 'onShowSizeChange(current,size){\n//pageSize 变化的回调\nconsole.log("onShowSizeChange",current,size);}'
      }]
    }
  },
  snippets: [{
    title: '分页',
    screenshot: 'https://alifd.alicdn.com/fusion-cool/icons/icon-antd/pagination-1.jpg',
    schema: {
      componentName: 'APagination',
      props: {
        pageSize: 10,
        total: 50,
        current: 1
      }
    }
  }]
});
;// CONCATENATED MODULE: ./src/lowcode/popconfirm/meta.ts
/* harmony default export */ var popconfirm_meta = ({
  group: 'Antd',
  componentName: 'APopconfirm',
  title: '气泡确认框',
  category: '基础组件',
  npm: {
    destructuring: true,
    componentName: 'APopconfirm'
  },
  props: [{
    name: 'title',
    title: {
      label: '确认框内容',
      tip: '确认框内容'
    },
    propType: {
      type: 'oneOfType',
      value: ['string', 'node', 'func']
    }
  }, {
    name: 'visible',
    title: {
      label: '是否可见',
      tip: '确认框是否可见'
    },
    propType: 'bool',
    setter: 'BoolSetter',
    supportVariable: true
  }, {
    name: 'okText',
    title: {
      label: '确认按钮文字',
      tip: '确认按钮文字'
    },
    propType: 'string',
    setter: 'StringSetter',
    supportVariable: true
  }, {
    name: 'showCancel',
    title: {
      label: '是否展示取消',
      tip: '是否显示取消按钮'
    },
    propType: 'bool',
    setter: 'BoolSetter',
    supportVariable: true
  }, {
    name: 'cancelText',
    title: {
      label: '取消按钮文字',
      tip: '取消按钮文字'
    },
    propType: 'string',
    setter: 'StringSetter',
    supportVariable: true
  }, {
    name: 'onConfirm',
    title: {
      label: '点击确认回调',
      tip: '点击确认回调'
    },
    propType: 'func'
  }, {
    name: 'okType',
    title: {
      label: '确认按钮类型',
      tip: '确认按钮类型'
    },
    propType: {
      type: 'oneOf',
      value: ['primary', 'ghost', 'dashed', 'danger', 'link', 'text']
    },
    setter: {
      componentName: 'SelectSetter',
      props: {
        options: [{
          title: '主按钮',
          value: 'primary'
        }, {
          title: '虚线框按钮',
          value: 'dashed'
        }, {
          title: '危险按钮',
          value: 'danger'
        }, {
          title: '链接按钮',
          value: 'link'
        }, {
          title: '类文本按钮',
          value: 'text'
        }]
      }
    }
  }, {
    name: 'okButtonProps',
    title: {
      label: 'ok按钮props',
      tip: 'ok按钮props'
    },
    propType: 'object'
  }, {
    name: 'cancelButtonProps',
    title: {
      label: 'cancel按钮props',
      tip: 'cancel按钮props'
    },
    propType: 'object'
  }, {
    name: 'icon',
    title: {
      label: '自定义Icon图标',
      tip: '自定义弹出气泡Icon图标'
    },
    propType: 'node'
  }, {
    name: 'disabled',
    title: {
      label: '是否禁用',
      tip: '是否为禁用状态'
    },
    propType: 'bool',
    defaultValue: false
  }],
  configure: {
    component: {
      isContainer: true
    },
    supports: {
      style: true,
      events: [{
        name: 'onConfirm',
        template: "onConfirm(${extParams}){\n// 点击确认的回调\nconsole.log('onConfirm');}"
      }]
    }
  },
  snippets: [{
    title: "气泡确认框",
    screenshot: "https://alifd.alicdn.com/fusion-cool/icons/icon-antd/popconfirm-1.jpg",
    schema: {
      componentName: "APopconfirm",
      props: {
        title: "确认删除？",
        okType: "primary",
        okText: "确定",
        cancelText: "取消"
      },
      children: {
        componentName: "AButton",
        props: {
          children: "删除"
        }
      }
    }
  }]
});
;// CONCATENATED MODULE: ./src/lowcode/popover/meta.ts
/* harmony default export */ var popover_meta = ({
  group: 'Antd',
  componentName: "APopover",
  title: '通知提醒框',
  category: '反馈',
  npm: {
    destructuring: true,
    componentName: 'APopover'
  },
  props: [{
    title: '内容',
    display: 'block',
    type: 'group',
    items: [{
      name: 'title',
      title: {
        label: '卡片标题',
        tip: 'title | 卡片标题'
      },
      propType: {
        type: 'oneOfType',
        value: ['string', 'node', 'func']
      },
      setter: ['StringSetter', 'SlotSetter', 'FunctionSetter', 'VariableSetter']
    }, {
      name: 'content',
      title: {
        label: '卡片内容',
        tip: 'content | 卡片内容'
      },
      propType: {
        type: 'oneOfType',
        value: ['string', 'node', 'func']
      },
      setter: ['StringSetter', 'SlotSetter', 'FunctionSetter', 'VariableSetter']
    }]
  }, {
    title: '控制',
    display: 'block',
    type: 'group',
    items: [{
      name: 'defaultVisible',
      title: {
        label: '默认显隐',
        tip: 'defaultVisible | 默认是否显隐'
      },
      propType: 'bool',
      setter: 'BoolSetter',
      defaultValue: false,
      supportVariable: true
    }, {
      name: 'visible',
      title: {
        label: '手动显隐',
        tip: 'visible | 手动控制浮层显隐'
      },
      propType: 'bool',
      setter: 'BoolSetter',
      supportVariable: true
    }]
  }, {
    title: '外观',
    display: 'block',
    type: 'group',
    items: [{
      name: 'placement',
      title: {
        label: '气泡位置',
        tip: 'placement | 气泡位置'
      },
      propType: {
        type: 'oneOf',
        value: ['top', 'left', 'right', 'bottom', 'topLeft', 'topRight', 'bottomLeft', 'bottomRight', 'leftTop', 'leftBottom', 'rightTop', 'rightBottom']
      },
      defaultValue: 'top',
      setter: {
        componentName: 'SelectSetter',
        props: {
          options: [{
            title: '上',
            value: 'top'
          }, {
            title: '左',
            value: 'left'
          }, {
            title: '右',
            value: 'right'
          }, {
            title: '下',
            value: 'bottom'
          }, {
            title: '上左',
            value: 'topLeft'
          }, {
            title: '上右',
            value: 'topRight'
          }, {
            title: '下左',
            value: 'bottomLeft'
          }, {
            title: '下右',
            value: 'bottomRight'
          }, {
            title: '左上',
            value: 'leftTop'
          }, {
            title: '左下',
            value: 'leftBottom'
          }, {
            title: '右上',
            value: 'rightTop'
          }, {
            title: '右下',
            value: 'rightBottom'
          }]
        }
      }
    }, {
      name: 'autoAdjustOverflow',
      title: {
        label: '自动调整',
        tip: 'autoAdjustOverflow | 气泡被遮挡时自动调整位置'
      },
      propType: 'bool',
      setter: 'BoolSetter',
      defaultValue: true
    }, {
      name: 'arrowPointAtCenter',
      title: {
        label: '指向中心',
        tip: 'arrowPointAtCenter | 箭头是否指向目标元素中心'
      },
      propType: 'bool',
      setter: 'BoolSetter',
      defaultValue: false
    }, {
      name: 'color',
      title: {
        label: '背景颜色',
        tip: 'color | 背景颜色'
      },
      propType: 'string',
      setter: 'ColorSetter'
    }, {
      name: 'zIndex',
      title: {
        label: 'zIndex',
        tip: 'zIndex | 设置 Tooltip 的 z-index值'
      },
      propType: 'number',
      setter: 'NumberSetter'
    }]
  }, {
    name: 'overlayStyle',
    title: '卡片样式',
    type: 'group',
    extraProps: {
      display: 'entry'
    },
    items: [{
      name: 'overlayStyle',
      title: {
        label: '样式设置',
        tip: 'overlayStyle | 卡片样式'
      },
      setter: 'StyleSetter',
      extraProps: {
        display: 'block'
      }
    }]
  }, {
    name: 'overlayInnerStyle',
    title: '卡片内容样式',
    type: 'group',
    extraProps: {
      display: 'entry'
    },
    items: [{
      name: 'overlayInnerStyle',
      title: {
        label: '样式设置',
        tip: 'overlayStyle | 卡片内容区域的样式'
      },
      setter: 'StyleSetter',
      extraProps: {
        display: 'block'
      }
    }]
  }, {
    title: '行为',
    display: 'block',
    type: 'group',
    items: [{
      name: 'trigger',
      title: {
        label: '触发行为',
        tip: 'trigger | 触发行为'
      },
      propType: {
        type: 'oneOf',
        value: ['hover', 'focus', 'click', 'contextMenu']
      },
      defaultValue: 'hover',
      setter: {
        componentName: 'SelectSetter',
        props: {
          options: [{
            title: '鼠标悬停',
            value: 'hover'
          }, {
            title: '获得焦点',
            value: 'onFocus'
          }, {
            title: '鼠标点击',
            value: 'click'
          }, {
            title: '右键菜单',
            value: 'contextMenu'
          }]
        }
      }
    }, {
      name: 'mouseEnterDelay',
      title: {
        label: '展示延时',
        tip: 'mouseEnterDelay | 鼠标移入后延时多少才显示 Tooltip，单位：秒'
      },
      propType: 'number',
      defaultValue: 0.1,
      setter: {
        componentName: 'NumberSetter',
        props: {
          step: 0.1
        }
      }
    }, {
      name: 'mouseLeaveDelay',
      title: {
        label: '隐藏延时',
        tip: 'mouseLeaveDelay | 鼠标移出后延时多少才隐藏 Tooltip，单位：秒'
      },
      propType: 'number',
      defaultValue: 0.1,
      setter: {
        componentName: 'NumberSetter',
        props: {
          step: 0.1
        }
      }
    }]
  }],
  configure: {
    component: {
      isContainer: true
    },
    supports: {
      style: true,
      events: [{
        name: 'onVisibleChange',
        template: "onVisibleChange(open,${extParams}){\n// 显示隐藏的回调\nconsole.log('onVisibleChange',open);}"
      }]
    }
  },
  snippets: [{
    title: '气泡卡片',
    screenshot: 'https://alifd.alicdn.com/fusion-cool/icons/icon-antd/popover-1.jpg',
    schema: {
      componentName: 'APopover',
      props: {}
    }
  }]
});
;// CONCATENATED MODULE: ./src/lowcode/progress/meta.ts
/* harmony default export */ var progress_meta = ({
  group: 'Antd',
  componentName: 'AProgress',
  title: '进度条',
  category: '反馈',
  npm: {
    destructuring: true,
    componentName: 'AProgress'
  },
  props: [{
    name: 'type',
    title: {
      label: '类型',
      tip: '类型'
    },
    propType: {
      type: 'oneOf',
      value: ['line', 'circle', 'dashboard']
    },
    setter: {
      componentName: 'RadioGroupSetter',
      props: {
        options: [{
          title: '线型',
          value: 'line'
        }, {
          title: '圆型',
          value: 'circle'
        }, {
          title: '仪表盘',
          value: 'dashboard'
        }]
      }
    },
    defaultValue: 'line'
  }, {
    name: 'format',
    title: {
      label: '内容格式',
      tip: '内容格式'
    },
    propType: 'func'
  }, {
    name: 'percent',
    title: {
      label: '百分比',
      tip: '百分比'
    },
    propType: 'number'
  }, {
    name: 'showInfo',
    title: {
      label: '显示数值或图标',
      tip: '显示数值或图标'
    },
    propType: 'bool',
    defaultValue: true
  }, {
    name: 'status',
    title: {
      label: '状态',
      tip: '状态'
    },
    propType: {
      type: 'oneOf',
      value: ['success', 'exception', 'normal', 'active']
    }
  }, {
    name: 'steps',
    title: {
      label: '总步数',
      tip: '进度条总共步数'
    },
    condition(target) {
      // 仅线型有效
      return target.getProps().getPropValue('type') === 'line';
    },
    propType: 'number'
  }, {
    name: 'strokeLinecap',
    title: {
      label: '进度条的样式',
      tip: '进度条的样式'
    },
    propType: {
      type: 'oneOf',
      value: ['round', 'square']
    },
    setter: {
      componentName: 'RadioGroupSetter',
      props: {
        options: [{
          title: '圆角',
          value: 'round'
        }, {
          title: '方角',
          value: 'square'
        }]
      }
    },
    defaultValue: 'round'
  }, {
    name: 'strokeWidth',
    title: {
      label: '线宽度',
      tip: '线宽度'
    },
    propType: 'number'
  }, {
    name: 'strokeColor',
    title: {
      label: '进度条的颜色',
      tip: '进度条的颜色'
    },
    propType: 'string',
    condition(target) {
      // 仪表盘样式无效
      return target.getProps().getPropValue('type') !== 'dashboard';
    },
    setter: 'ColorSetter'
  }, {
    name: 'trailColor',
    title: {
      label: '未完成的分段的颜色',
      tip: '未完成的分段的颜色'
    },
    propType: 'string',
    setter: 'ColorSetter'
  }, {
    name: 'gapDegree',
    title: {
      label: '缺口角度',
      tip: '仪表盘进度条缺口角度，可取值 0 ~ 295'
    },
    condition(target) {
      // 仅仪表盘样式有效
      return target.getProps().getPropValue('type') === 'dashboard';
    },
    propType: 'number',
    defaultValue: 75
  }, {
    name: 'gapPosition',
    title: {
      label: '缺口位置',
      tip: '仪表盘进度条缺口位置'
    },
    condition(target) {
      // 仅仪表盘样式有效
      return target.getProps().getPropValue('type') === 'dashboard';
    },
    propType: {
      type: 'oneOf',
      value: ['top', 'bottom', 'left', 'right']
    },
    defaultValue: 'bottom'
  }],
  configure: {
    supports: {
      style: true
    }
  },
  snippets: [{
    title: "进度条",
    screenshot: "https://alifd.alicdn.com/fusion-cool/icons/icon-antd/progress-1.png",
    schema: {
      componentName: "AProgress",
      props: {
        percent: 20,
        status: "active"
      }
    }
  }, {
    title: "进度圈",
    screenshot: "https://alifd.alicdn.com/fusion-cool/icons/icon-antd/progress-2.png",
    schema: {
      componentName: "AProgress",
      props: {
        percent: 20,
        status: "circle"
      }
    }
  }]
});
;// CONCATENATED MODULE: ./src/lowcode/radio/meta.ts
/* eslint-disable */
// @ts-ignore
/* harmony default export */ var radio_meta = ({
  group: 'Antd',
  componentName: 'ARadio',
  title: '单选框',
  category: '表单',
  npm: {
    destructuring: true,
    componentName: 'ARadio'
  },
  props: [{
    name: 'children',
    title: {
      label: '内容',
      tip: '内容'
    },
    propType: 'string',
    setter: 'StringSetter',
    supportVariable: true
  }, {
    name: 'autoFocus',
    title: {
      label: '自动聚焦',
      tip: '自动获取焦点'
    },
    propType: 'bool',
    defaultValue: false,
    setter: 'BoolSetter',
    supportVariable: true
  }, {
    name: 'defaultChecked',
    title: {
      label: '默认选中',
      tip: '初始是否选中'
    },
    propType: 'bool',
    defaultValue: false,
    setter: 'BoolSetter',
    supportVariable: true
  }, {
    name: 'checked',
    title: {
      label: '是否选中',
      tip: '指定当前是否选中'
    },
    propType: 'bool',
    defaultValue: false,
    setter: 'BoolSetter',
    supportVariable: true
  }, {
    name: 'disabled',
    title: {
      label: '是否禁用',
      tip: '是否为禁用状态'
    },
    propType: 'bool',
    defaultValue: false,
    setter: 'BoolSetter',
    supportVariable: true
  }],
  configure: {
    supports: {
      style: true
    }
  },
  snippets: [{
    title: '单选框',
    screenshot: 'https://alifd.alicdn.com/fusion-cool/icons/icon-antd/radio-1.png',
    schema: {
      componentName: 'ARadio',
      props: {
        children: 'Radio'
      }
    }
  }]
});
;// CONCATENATED MODULE: ./src/lowcode/radio-group/meta.ts
/* eslint-disable */
// @ts-ignore
/* harmony default export */ var radio_group_meta = ({
  group: 'Antd',
  componentName: 'ARadioGroup',
  title: '单选框组',
  category: '表单',
  npm: {
    destructuring: true,
    componentName: 'ARadioGroup'
  },
  props: [{
    name: 'value',
    title: {
      label: '当前值',
      tip: '指定选中的选项'
    },
    propType: 'string',
    setter: 'StringSetter',
    supportVariable: true
  }, {
    name: 'options',
    propType: {
      type: 'arrayOf',
      value: {
        type: 'shape',
        value: [{
          name: 'label',
          propType: 'string',
          description: '选项名',
          defaultValue: '选项名'
        }, {
          name: 'value',
          propType: 'string',
          description: '选项值',
          defaultValue: '选项值'
        }, {
          name: 'disabled',
          propType: 'bool',
          description: '是否禁用',
          defaultValue: false
        }]
      }
    },
    setter: {
      componentName: 'ArraySetter',
      props: {
        itemSetter: {
          componentName: 'ObjectSetter',
          props: {
            config: {
              items: [{
                name: 'label',
                title: '选项名',
                setter: 'StringSetter',
                isRequired: true
              }, {
                name: 'value',
                title: '选项值',
                setter: 'StringSetter',
                isRequired: true
              }, {
                name: 'disabled',
                title: '是否禁用',
                setter: 'BoolSetter'
              }]
            }
          },
          initialValue: () => {
            return {
              label: '选项名',
              value: '随机',
              disabled: false
            };
          }
        }
      }
    }
  }, {
    name: 'buttonStyle',
    title: {
      label: 'buttonStyle',
      tip: 'RadioButton 的风格样式'
    },
    propType: {
      type: 'oneOf',
      value: ['outline', 'solid']
    },
    defaultValue: 'outline',
    condition(target) {
      return target.getProps().getPropValue('optionType') === 'button';
    },
    setter: {
      componentName: 'RadioGroupSetter',
      props: {
        options: [{
          label: 'outline',
          value: 'outline'
        }, {
          label: 'solid',
          value: 'solid'
        }]
      }
    }
  }, {
    name: 'disabled',
    title: {
      label: '是否禁用',
      tip: '禁选所有子单选器'
    },
    propType: 'bool',
    defaultValue: false,
    setter: 'BoolSetter',
    supportVariable: true
  }, {
    name: 'optionType',
    title: {
      label: '类型',
      tip: '类型'
    },
    propType: {
      type: 'oneOf',
      value: ['default', 'button']
    },
    setter: {
      componentName: 'RadioGroupSetter',
      props: {
        options: [{
          title: '默认类型',
          value: 'default'
        }, {
          title: '按钮类型',
          value: 'button'
        }]
      }
    },
    defaultValue: 'default'
  }, {
    name: 'size',
    title: {
      label: '尺寸',
      tip: '大小，只对按钮样式生效'
    },
    condition(target) {
      return target.getProps().getPropValue('optionType') === 'button';
    },
    propType: {
      type: 'oneOf',
      value: ['large', 'middle', 'small']
    },
    setter: {
      componentName: 'RadioGroupSetter',
      props: {
        options: [{
          title: '大',
          value: 'large'
        }, {
          title: '中',
          value: 'middle'
        }, {
          title: '小',
          value: 'small'
        }]
      }
    },
    defaultValue: 'middle'
  }, {
    name: 'onChange ',
    title: {
      label: '变化时回调函数',
      tip: '变化时回调函数'
    },
    propType: 'func'
  }],
  configure: {
    supports: {
      style: true,
      events: [{
        name: 'onChange',
        template: "onChange(event,${extParams}){\n//选项变化回调函数\nconsole.log('onChange',event);}"
      }]
    }
  },
  snippets: [{
    title: '单选框组',
    screenshot: 'https://alifd.alicdn.com/fusion-cool/icons/icon-antd/radio-group-1.png',
    props: {
      options: [{
        label: 'A',
        value: 'A'
      }, {
        label: 'B',
        value: 'B'
      }, {
        label: 'C',
        value: 'C'
      }]
    }
  }]
});
;// CONCATENATED MODULE: ./src/lowcode/range-picker/meta.ts
/* eslint-disable */
// @ts-ignore
/* harmony default export */ var range_picker_meta = ({
  group: 'Antd',
  componentName: 'ARangePicker',
  title: '日期区间选择',
  category: '表单',
  npm: {
    destructuring: true,
    componentName: 'ARangePicker'
  },
  props: [{
    title: '值设置',
    display: 'block',
    type: 'group',
    items: [{
      name: 'defaultValue',
      title: {
        label: '默认值',
        tip: 'defaultValue | 默认值'
      },
      propType: 'object',
      setter: 'JsonSetter'
    }, {
      name: 'value',
      title: {
        label: '当前值',
        tip: 'value | 当前值'
      },
      propType: 'object',
      setter: 'JsonSetter'
    }, {
      name: 'defaultPickerValue',
      title: {
        label: '默认面板日期',
        tip: 'defaultPickerValue | 默认面板日期'
      },
      propType: 'object',
      setter: 'JsonSetter'
    }]
  }, {
    title: '功能选项',
    display: 'block',
    type: 'group',
    items: [{
      name: 'size',
      title: {
        label: '尺寸',
        tip: 'size | 输入框大小'
      },
      propType: {
        type: 'oneOf',
        value: ['large', 'middle', 'small']
      },
      setter: {
        componentName: 'RadioGroupSetter',
        props: {
          options: [{
            title: '大',
            value: 'large'
          }, {
            title: '中',
            value: 'middle'
          }, {
            title: '小',
            value: 'small'
          }]
        }
      },
      defaultValue: 'middle'
    }, {
      name: 'picker',
      title: {
        label: '日期类型',
        tip: 'picker | 选择器日期类型'
      },
      setter: {
        componentName: 'SelectSetter',
        props: {
          options: [{
            title: '日期',
            value: 'date'
          }, {
            title: '周',
            value: 'week'
          }, {
            title: '月份',
            value: 'month'
          }, {
            title: '季度',
            value: 'quarter'
          }, {
            title: '年份',
            value: 'year'
          }]
        }
      },
      propType: {
        type: 'oneOf',
        value: ['date', 'week', 'month', 'quarter', 'year']
      }
    }, {
      name: 'mode',
      title: {
        label: '面板模式',
        tip: 'mode | 日期面板的状态'
      },
      propType: {
        type: 'oneOf',
        value: ['time', 'date', 'month', 'year', 'decade']
      },
      setter: {
        componentName: 'SelectSetter',
        props: {
          options: [{
            title: '日期',
            value: 'date'
          }, {
            title: '周',
            value: 'week'
          }, {
            title: '月份',
            value: 'month'
          }, {
            title: '年份',
            value: 'year'
          }, {
            title: '十年间隔',
            value: 'decade'
          }]
        }
      }
    }, {
      name: 'format',
      title: {
        label: '日期格式',
        tip: 'format | 展示的日期格式，配置参考 moment.js'
      },
      propType: 'string',
      setter: 'StringSetter'
    }, {
      name: 'placeholder',
      title: {
        label: '提示文字',
        tip: 'placeholder | 输入框提示文字'
      },
      propType: 'string',
      setter: 'StringSetter'
    }, {
      name: 'allowClear',
      title: {
        label: '支持清除',
        tip: 'allowClear | 是否允许清除'
      },
      propType: 'bool',
      defaultValue: true,
      setter: 'BoolSetter'
    }, {
      name: 'bordered',
      title: {
        label: '显示边框',
        tip: 'bordered | 是否有边框'
      },
      propType: 'bool',
      defaultValue: true,
      setter: 'BoolSetter'
    }, {
      name: 'showToday',
      title: {
        label: '展示今天按钮',
        tip: 'showToday | 是否展示今天按钮'
      },
      propType: 'bool',
      defaultValue: true,
      setter: 'BoolSetter'
    }, {
      name: 'autoFocus',
      title: {
        label: '自动聚焦',
        tip: 'autoFocus | 自动获取焦点'
      },
      propType: 'bool',
      defaultValue: false,
      setter: 'BoolSetter'
    }, {
      name: 'disabled',
      title: {
        label: '是否禁用',
        tip: 'disabled | 是否为禁用状态'
      },
      propType: 'bool',
      defaultValue: false,
      setter: 'BoolSetter'
    }, {
      name: 'inputReadOnly',
      title: {
        label: '是否只读',
        tip: 'inputReadOnly | 避免在移动设备上打开虚拟键盘'
      },
      propType: 'bool',
      defaultValue: false,
      setter: 'BoolSetter'
    }, {
      name: 'showTime',
      title: {
        label: '时间选择',
        tip: 'showTime | 是否能选择时间'
      },
      propType: 'bool',
      defaultValue: false,
      setter: 'BoolSetter'
    }]
  }, {
    title: '高级',
    display: 'block',
    type: 'group',
    items: [{
      name: 'ranges',
      title: {
        label: '预设范围',
        tip: 'ranges | 预设时间范围快捷选择'
      },
      propType: 'object',
      setter: 'JsonSetter'
    }, {
      name: 'disabledDate',
      title: {
        label: '不可选日期',
        tip: 'disabledDate | 不可选择的日期'
      },
      propType: 'func',
      setter: [{
        componentName: 'FunctionSetter',
        props: {
          template: 'disabledDate(currentDate,${extParams}){\n// 设置不可选择的日期\nreturn true\n}'
        }
      }, 'VariableSetter']
    }]
  }],
  configure: {
    supports: {
      style: true,
      events: [{
        name: 'onChange',
        template: "onChange(dates,dateStrings){\n//日期范围发生变化的回调\nconsole.log('onChange ',JSON.stringify(dates));}"
      }, {
        name: 'onCalendarChange',
        template: "onCalendarChange(dates,dateStrings){\n//待选日期发生变化的回调\nconst [start,end] = dates;\nconsole.log('onCalendarChange',start,end);}"
      }, {
        name: 'onOk',
        template: "onOk(dates){\n//点击确定按钮的回调\nconst [start,end] = dates;\nconsole.log('onOk',start,end);}"
      }]
    }
  },
  snippets: [{
    title: '日期区间',
    screenshot: 'https://alifd.alicdn.com/fusion-cool/icons/icon-antd/date-picker-range-picker-1.png',
    schema: {
      componentName: 'ARangePicker',
      props: {}
    }
  }, {
    title: '周区间',
    screenshot: 'https://alifd.alicdn.com/fusion-cool/icons/icon-antd/date-picker-range-picker-2.png',
    schema: {
      componentName: 'ARangePicker',
      props: {
        picker: 'week'
      }
    }
  }, {
    title: '月区间',
    screenshot: 'https://alifd.alicdn.com/fusion-cool/icons/icon-antd/date-picker-range-picker-3.png',
    schema: {
      componentName: 'ARangePicker',
      props: {
        picker: 'month'
      }
    }
  }, {
    title: '年区间',
    screenshot: 'https://alifd.alicdn.com/fusion-cool/icons/icon-antd/date-picker-range-picker-4.png',
    schema: {
      componentName: 'ARangePicker',
      props: {
        picker: 'year'
      }
    }
  }]
});
;// CONCATENATED MODULE: ./src/lowcode/result/meta.ts
/* harmony default export */ var result_meta = ({
  group: 'Antd',
  componentName: 'AResult',
  title: '结果',
  category: '反馈',
  npm: {
    destructuring: true,
    componentName: 'AResult'
  },
  props: [{
    name: 'title',
    title: {
      label: '标题',
      tip: 'title 文字'
    },
    propType: 'node'
  }, {
    name: 'subTitle',
    title: {
      label: '副标题',
      tip: 'subTitle 文字'
    },
    propType: 'node'
  }, {
    name: 'status',
    title: {
      label: '状态',
      tip: '结果的状态，决定图标和颜色'
    },
    propType: {
      type: 'oneOf',
      value: ['success', 'error', 'info', 'warning', '404', '403', '500']
    }
  }, {
    name: 'icon',
    title: {
      label: '自定义 icon',
      tip: '自定义 icon'
    },
    propType: 'node'
  }, {
    name: 'extra',
    title: {
      label: '操作区',
      tip: '操作区'
    },
    propType: 'node'
  }],
  configure: {
    supports: {
      style: true
    }
  },
  snippets: [{
    title: "结果",
    screenshot: "https://alifd.alicdn.com/fusion-cool/icons/icon-antd/result-1.png",
    schema: {
      componentName: "AResult",
      props: {
        status: "success",
        title: "成功提示!",
        subTitle: "li yi li测试成功提示"
      }
    }
  }]
});
;// CONCATENATED MODULE: ./src/lowcode/rate/meta.ts
/* harmony default export */ var rate_meta = ({
  group: 'Antd',
  componentName: 'ARate',
  title: '评分',
  category: '数据展示',
  npm: {
    destructuring: true,
    componentName: 'ARate'
  },
  props: [{
    name: 'value',
    title: {
      label: '默认值',
      tip: '默认值'
    },
    propType: 'number',
    setter: 'NumberSetter',
    defaultValue: 1
  }, {
    name: 'allowClear',
    title: {
      label: '点击清除',
      tip: '是否允许再次点击后清除'
    },
    propType: 'bool',
    defaultValue: true,
    setter: 'BoolSetter'
  }, {
    name: 'allowHalf',
    title: {
      label: '允许半选',
      tip: '是否允许半选'
    },
    propType: 'bool',
    defaultValue: false,
    setter: 'BoolSetter'
  }, {
    name: 'autoFocus',
    title: {
      label: '自动聚焦',
      tip: '自动获得焦点'
    },
    propType: 'bool',
    defaultValue: false,
    setter: 'BoolSetter'
  }, {
    name: 'character',
    title: {
      label: '自定义字符',
      tip: '自定义字符'
    },
    propType: {
      type: 'oneOfType',
      value: ['string', 'node']
    }
  }, {
    name: 'count',
    title: {
      label: 'star总数',
      tip: 'star 总数'
    },
    propType: 'number',
    setter: 'NumberSetter',
    defaultValue: 5
  }, {
    name: 'disabled',
    title: {
      label: '禁用',
      tip: '是否禁用'
    },
    propType: 'bool',
    defaultValue: false,
    setter: 'BoolSetter'
  }, {
    name: 'tooltips',
    title: {
      label: '提示信息',
      tip: '自定义每项的提示信息'
    },
    propType: {
      type: 'arrayOf',
      value: 'string'
    }
  }],
  configure: {
    supports: {
      style: true,
      events: [{
        name: 'onChange ',
        template: "onChange (value,${extParams}){\n// 选择时的回调\nconsole.log('onChange ',value);}"
      }, {
        name: 'onHoverChange',
        template: "onHoverChange(value,${extParams}){\n// 鼠标经过时数值变化的回调\nconsole.log('onHoverChange',value);}"
      }, {
        name: 'onKeyDown',
        template: "onKeyDown(event,${extParams}){\n// 按键回调\nconsole.log('onKeyDown',event);}"
      }, {
        name: 'onFocus',
        template: "onFocus(${extParams}){\n// 获得焦点时触发\nconsole.log('onFocus');}"
      }, {
        name: 'onBlur',
        template: "onBlur(${extParams}){\n// 失去焦点时触发\nconsole.log('onBlur');}"
      }]
    }
  },
  snippets: [{
    title: '评分',
    screenshot: 'https://alifd.alicdn.com/fusion-cool/icons/icon-antd/rate-1.png',
    schema: {
      componentName: 'ARate',
      props: {
        value: 3
      }
    }
  }]
});
;// CONCATENATED MODULE: ./src/lowcode/select/meta.ts
/* eslint-disable */
// @ts-ignore
/* harmony default export */ var select_meta = ({
  group: 'Antd',
  componentName: 'ASelect',
  title: '选择器',
  category: '基础组件',
  npm: {
    destructuring: true,
    componentName: 'ASelect'
  },
  props: [{
    name: 'defaultValue',
    title: {
      label: '默认值',
      tip: '默认选中值'
    },
    propType: {
      type: 'oneOfType',
      value: ['string', {
        type: 'arrayOf',
        value: 'string'
      }, 'number', {
        type: 'arrayOf',
        value: 'number'
      }]
    }
  }, {
    name: 'value',
    title: {
      label: '当前值',
      tip: '当前值'
    },
    propType: {
      type: 'oneOfType',
      value: ['string', {
        type: 'arrayOf',
        value: 'string'
      }, 'number', {
        type: 'arrayOf',
        value: 'number'
      }]
    }
  }, {
    name: 'options',
    title: {
      label: '可选项',
      tip: '可选项'
    },
    propType: {
      type: 'arrayOf',
      value: {
        type: 'shape',
        value: [{
          name: 'label',
          propType: 'string',
          description: '选项名',
          defaultValue: '选项名'
        }, {
          name: 'value',
          propType: ['string', 'number'],
          description: '选项值',
          defaultValue: '选项值'
        }, {
          name: 'disabled',
          propType: 'bool',
          description: '是否禁用',
          defaultValue: false
        }]
      }
    },
    setter: {
      componentName: 'ArraySetter',
      props: {
        itemSetter: {
          componentName: 'ObjectSetter',
          props: {
            config: {
              items: [{
                name: 'label',
                title: '选项名',
                setter: ['StringSetter', 'VariableSetter'],
                isRequired: true
              }, {
                name: 'value',
                title: '选项值',
                setter: ['StringSetter', 'NumberSetter', 'VariableSetter'],
                isRequired: true
              }, {
                name: 'disabled',
                title: '是否禁用',
                setter: ['BoolSetter', 'VariableSetter']
              }]
            }
          },
          initialValue: () => {
            return {
              label: '选项名',
              value: 'test',
              disabled: false
            };
          }
        }
      }
    }
  }, {
    title: {
      label: '支持清除',
      tip: 'allowClear|支持清除'
    },
    name: 'allowClear',
    propType: 'bool',
    setter: 'BoolSetter',
    defaultValue: true,
    supportVariable: true
  }, {
    title: {
      label: '自动聚焦',
      tip: '默认获取焦点'
    },
    name: 'autoFocus',
    propType: 'bool',
    setter: 'BoolSetter',
    defaultValue: false
  }, {
    name: 'labelInValue',
    title: {
      label: '值包含label',
      tip: '把每个选项的 label 包装到 value 中'
    },
    propType: 'bool',
    defaultValue: false,
    setter: 'BoolSetter'
  }, {
    title: '占位提示',
    name: 'placeholder',
    propType: 'string',
    setter: 'StringSetter'
  }, {
    title: {
      label: '展示边框',
      tip: '是否有边框'
    },
    name: 'bordered',
    propType: 'bool',
    setter: 'BoolSetter',
    defaultValue: true
  }, {
    title: {
      label: '筛选可选项',
      tip: '是否根据输入进行筛选'
    },
    name: 'filterOption',
    propType: {
      type: 'oneOfType',
      value: ['bool', 'func']
    },
    defaultValue: false
  }, {
    title: {
      label: '用于筛选的字段',
      tip: '用于过滤的字段'
    },
    propType: {
      type: 'oneOf',
      value: ['value', 'label']
    },
    defaultValue: 'value'
  }, {
    title: {
      label: 'autoClearSearchValue',
      tip: '是否在选中项后清空搜索框，只在 mode 为 multiple 或 tags 时有效'
    },
    name: 'autoClearSearchValue',
    propType: 'bool',
    setter: 'BoolSetter',
    defaultValue: true
  }, {
    name: 'showArrow',
    title: {
      label: '是否显示下拉箭头',
      tip: '是否显示下拉小箭头'
    },
    propType: 'bool',
    setter: 'BoolSetter'
  }, {
    title: '是否可搜索',
    name: 'showSearch',
    propType: 'bool',
    setter: 'BoolSetter',
    defaultValue: false,
    supportVariable: true
  }, {
    title: "选择框大小",
    name: 'size',
    propType: {
      type: 'oneOf',
      value: ['default', 'large', 'small']
    },
    setter: {
      componentName: 'RadioGroupSetter',
      props: {
        options: [{
          label: 'default',
          value: 'default'
        }, {
          label: 'large',
          value: 'large'
        }, {
          label: 'small',
          value: 'small'
        }]
      }
    },
    defaultValue: 'default'
  }, {
    title: '是否展开菜单',
    name: 'open',
    propType: 'bool',
    setter: 'BoolSetter',
    defaultValue: false
  }, {
    title: '是否默认展开下拉菜单',
    name: 'defaultOpen',
    propType: 'bool',
    setter: 'BoolSetter',
    defaultValue: false
  }, {
    title: {
      label: '模式',
      tip: '模式为多选或标签'
    },
    name: 'mode',
    propType: {
      type: 'oneOf',
      value: ['multiple', 'tags', 'combobox']
    },
    setter: {
      componentName: 'RadioGroupSetter',
      props: {
        options: [{
          title: '多选',
          value: 'multiple'
        }, {
          title: '标签',
          value: 'tags'
        }, {
          title: 'combobox',
          value: 'combobox'
        }],
        defaultValue: 'tags'
      }
    },
    supportVariable: true
  }, {
    name: 'maxTagCount',
    title: '最多显示tag数',
    propType: 'number',
    condition(target) {
      return target.getProps().getPropValue('mode') === 'tags';
    }
  }, {
    name: 'maxTagTextLength',
    title: '最大tag文本长度',
    propType: 'number',
    condition(target) {
      return target.getProps().getPropValue('mode') === 'tags';
    }
  }, {
    name: 'searchValue',
    title: '搜索文本',
    propType: 'string',
    setter: 'StringSetter'
  }, {
    title: '搜索为空时提示文案',
    name: 'notFoundContent',
    propType: 'string',
    setter: 'StringSetter'
  }, {
    name: 'dropdownRender',
    title: {
      label: '自定义下拉框',
      tip: 'dropdownRender|自定义下拉框内容'
    },
    propType: 'node',
    setter: [{
      componentName: 'SlotSetter',
      title: '自定义下拉框',
      initialValue: {
        type: 'JSSlot',
        params: ['menuNode'],
        value: []
      }
    }]
  }, {
    name: 'tagRender',
    title: 'tagRender',
    propType: 'node',
    condition(target) {
      const mode = target.getProps().getPropValue('mode');
      return mode === 'tags' || mode === 'multiple';
    }
  }, {
    name: 'tokenSeparators',
    title: {
      label: '自动分词的分隔符',
      tip: '自动分词的分隔符'
    },
    propType: {
      type: 'arrayOf',
      value: 'string'
    }
  }, {
    name: 'onBlur',
    title: {
      label: '失焦回调',
      tip: '失去焦点的时回调'
    },
    propType: 'func'
  }, {
    name: 'onChange',
    title: {
      label: 'onChange回调',
      tip: '选中 option，或 input 的 value 变化（combobox 模式下）时，调用此函数'
    },
    propType: 'func'
  }, {
    name: 'onDeselect',
    title: {
      label: 'onDeselect回调',
      tip: '取消选中时调用'
    },
    condition(target) {
      const mode = target.getProps().getPropValue('mode');
      return mode === 'tags' || mode === 'multiple';
    },
    propType: 'func'
  }, {
    name: 'onFocus',
    title: {
      label: 'onFocus回调',
      tip: '获得焦点时回调'
    },
    propType: 'func'
  }, {
    name: 'onInputKeyDown',
    title: {
      label: 'onInputKeyDown回调',
      tip: '键盘按下时回调'
    },
    propType: 'func'
  }, {
    name: 'onMouseEnter',
    title: {
      label: 'onMouseEnter回调',
      tip: '鼠标移入时回调'
    },
    propType: 'func'
  }, {
    name: 'onMouseLeave',
    title: {
      label: 'onMouseLeave',
      tip: '鼠标移出时回调'
    },
    propType: 'func'
  }, {
    name: 'onPopupScroll',
    title: '下拉列表滚动时的回调',
    propType: 'func'
  }, {
    name: 'onSearch',
    title: {
      label: 'onSearch回调',
      tip: '文本框值变化时回调'
    },
    propType: 'func'
  }, {
    name: 'onSelect',
    title: {
      label: 'onSelect回调',
      tip: '被选中时调用，参数为选中项的 value (或 key) 值'
    },
    propType: 'func'
  }],
  configure: {
    supports: {
      style: true,
      events: [{
        name: 'onBlur',
        template: "onBlur(${extParams}){\n//失焦回调\n console.log('onBlur')}"
      }, {
        name: 'onChange',
        template: "onChange(value,option){\n console.log('onChange',value,option)}"
      }, {
        name: 'onDeselect',
        template: "onDeselect(value,option){\n console.log('onDeselect',value,option)}"
      }, {
        name: 'onFocus',
        template: "onFocus(${extParams}){\n//聚焦回调\n console.log('onFocus')}"
      }]
    }
  },
  snippets: [{
    title: '选择器',
    screenshot: 'https://alifd.alicdn.com/fusion-cool/icons/icon-antd/select-1.png',
    schema: {
      componentName: 'ASelect',
      props: {
        style: {
          width: "200px"
        },
        options: [{
          label: '选项一',
          value: '1'
        }, {
          label: '选项二',
          value: '2'
        }, {
          label: '选项三',
          value: '3'
        }],
        bordered: true
      }
    }
  }]
});
;// CONCATENATED MODULE: ./src/lowcode/select-opt-group/meta.ts
/* eslint-disable */
// @ts-ignore
/* harmony default export */ var select_opt_group_meta = ({
  group: 'Antd',
  componentName: 'ASelectOptGroup',
  title: '选择器-分组',
  category: '基础组件',
  npm: {
    destructuring: true,
    componentName: 'ASelectOptGroup'
  },
  props: [{
    title: 'key',
    name: 'key',
    propType: 'string',
    setter: 'StringSetter'
  }, {
    title: {
      label: 'title',
      tip: '组名'
    },
    name: 'title',
    propType: {
      type: 'oneOfType',
      value: ['string', 'node', 'func']
    }
  }]
});
;// CONCATENATED MODULE: ./src/lowcode/select-option/meta.ts
/* eslint-disable */
// @ts-ignore
/* harmony default export */ var select_option_meta = ({
  group: 'Antd',
  componentName: 'ASelectOption',
  title: '选择器-选择项',
  category: '基础组件',
  npm: {
    destructuring: true,
    componentName: 'ASelectOption'
  },
  props: [{
    title: '类名',
    name: 'class',
    propType: 'string',
    setter: 'StringSetter'
  }, {
    title: '是否禁用',
    name: "disabled",
    propType: 'bool',
    setter: 'BoolSetter'
  }, {
    title: 'key',
    name: 'key',
    propType: 'string',
    setter: 'StringSetter'
  }, {
    title: 'title',
    name: 'title',
    propType: 'string',
    setter: 'StringSetter'
  }, {
    title: 'value',
    name: 'value',
    propType: {
      type: 'oneOfType',
      value: ['string', 'number']
    },
    setter: ['StringSetter', 'NumberSetter']
  }],
  configure: {
    component: {
      nestingRule: {
        parentWhitelist: ['ASelect']
      }
    }
  }
});
;// CONCATENATED MODULE: ./src/lowcode/sketelon/meta.ts
/* eslint-disable */
// @ts-ignore
/* harmony default export */ var sketelon_meta = ({
  group: 'Antd',
  componentName: 'ASkeleton',
  title: '骨架屏',
  category: '反馈',
  npm: {
    destructuring: true,
    componentName: 'ASkeleton'
  },
  props: [{
    name: 'active',
    title: {
      label: '动画效果',
      tip: '是否展示动画效果'
    },
    propType: 'bool',
    defaultValue: false
  }, {
    name: 'avatar',
    title: {
      label: '头像占位图',
      tip: '是否显示头像占位图'
    },
    propType: {
      type: 'oneOfType',
      value: ['bool', 'object']
    }
  }, {
    name: 'loading',
    title: {
      label: '加载中',
      tip: '为 true 时，显示占位图。反之则直接展示子组件'
    },
    propType: 'bool'
  }, {
    name: 'paragraph',
    title: {
      label: '段落占位图',
      tip: '是否显示段落占位图'
    },
    propType: {
      type: 'oneOfType',
      value: ['bool', 'object']
    }
  }, {
    name: 'title',
    title: {
      label: '标题占位图',
      tip: '是否显示标题占位图'
    },
    propType: {
      type: 'oneOfType',
      value: ['bool', 'object']
    }
  }, {
    name: 'round',
    title: {
      label: '圆角',
      tip: '为 true 时，段落和标题显示圆角'
    },
    propType: 'bool',
    defaultValue: false
  }],
  configure: {
    component: {
      isContainer: true
    },
    supports: {
      style: true
    }
  },
  snippets: [{
    title: '骨架屏',
    screenshot: 'https://alifd.alicdn.com/fusion-cool/icons/icon-antd/skeleton-1.png',
    schema: {
      componentName: 'ASkeleton',
      props: {
        active: true,
        loading: true
      }
    }
  }]
});
;// CONCATENATED MODULE: ./src/lowcode/slider/meta.ts
/* eslint-disable */
// @ts-ignore
/* harmony default export */ var slider_meta = ({
  group: 'Antd',
  componentName: 'ASlider',
  title: '滑块',
  category: '基础组件',
  npm: {
    destructuring: true,
    componentName: 'ASlider'
  },
  props: [{
    name: 'defaultValue',
    title: {
      label: '默认值',
      tip: '设置初始取值。当 `range` 为 false 时，使用 number，否则用 \\[number, number]'
    },
    propType: {
      type: 'oneOfType',
      value: ['number', {
        type: 'arrayOf',
        value: 'number'
      }]
    }
  }, {
    name: 'range',
    title: {
      label: '双滑块模式',
      tip: '双滑块模式'
    },
    propType: 'bool',
    defaultValue: false,
    setter: 'BoolSetter',
    setValue(target, range) {
      let defaultValue = target.node.getPropValue('defaultValue');
      if (range) {
        defaultValue = Array.isArray(defaultValue) ? defaultValue : [0, defaultValue];
      } else {
        defaultValue = Array.isArray(defaultValue) ? defaultValue[1] || defaultValue[0] : defaultValue;
      }
      target.node.setPropValue('defaultValue', defaultValue);
    }
  }, {
    name: 'value',
    title: {
      label: '当前值',
      tip: '设置当前取值。当 `range` 为 false 时，使用 number，否则用 \\[number, number]'
    },
    propType: {
      type: 'oneOfType',
      value: ['number', {
        type: 'arrayOf',
        value: 'number'
      }]
    }
  }, {
    name: 'allowClear',
    title: {
      label: '支持清除',
      tip: '是否允许清除'
    },
    condition(target) {
      return target.getProps().getPropValue('range');
    },
    propType: 'bool',
    defaultValue: false,
    setter: 'BoolSetter'
  }, {
    name: 'disabled',
    title: {
      label: '是否禁用',
      tip: '是否为禁用状态'
    },
    propType: 'bool',
    defaultValue: false,
    setter: 'BoolSetter'
  }, {
    name: 'dots',
    title: {
      label: '对齐刻度',
      tip: '是否只能拖拽到刻度上'
    },
    propType: 'bool',
    defaultValue: false,
    setter: 'BoolSetter'
  }, {
    name: 'max',
    title: {
      label: '最大值',
      tip: '最大值'
    },
    propType: 'number',
    setter: 'NumberSetter'
  }, {
    name: 'min',
    title: {
      label: '最小值',
      tip: '最小值'
    },
    propType: 'number',
    setter: 'NumberSetter'
  }, {
    name: 'reverse',
    title: {
      label: '反向坐标轴',
      tip: '反向坐标轴'
    },
    propType: 'bool',
    defaultValue: false,
    setter: 'BoolSetter'
  }, {
    name: 'step',
    title: {
      label: '步长',
      tip: '步长，取值必须大于 0，并且可被 (max - min) 整除。当 `marks` 不为空对象时，可以设置 `step` 为 null，此时 Slider 的可选值仅有 marks 标出来的部分'
    },
    propType: 'number',
    setter: 'NumberSetter'
  }, {
    name: 'vertical',
    title: {
      label: '垂直方向',
      tip: '值为 true 时，Slider 为垂直方向'
    },
    propType: 'bool',
    defaultValue: false,
    setter: 'BoolSetter'
  }],
  configure: {
    component: {
      isContainer: true
    },
    supports: {
      style: true,
      events: [{
        name: 'onAfterChange',
        template: "onAfterChange(value,${extParams}){\n// 与 onmouseup 触发时机一致\nconsole.log('onAfterChange',value);}"
      }, {
        name: 'onChange',
        template: "onChange(value,${extParams}){\n// 当 Slider 的值发生改变时触发回调\nconsole.log('onChange',value);}"
      }]
    }
  },
  snippets: [{
    title: "滑块",
    screenshot: "https://alifd.alicdn.com/fusion-cool/icons/icon-antd/slider-1.png",
    schema: {
      componentName: "ASlider",
      props: {
        defaultValue: 30
      }
    }
  }]
});
;// CONCATENATED MODULE: ./src/lowcode/slot/meta.ts
/* eslint-disable */
// @ts-ignore
/* harmony default export */ var slot_meta = ({
  componentName: 'Slot',
  title: '插槽',
  category: '基础组件',
  npm: {
    destructuring: true,
    componentName: 'Slot'
  },
  props: [{
    name: "__title",
    title: 'title|插槽标题',
    setter: 'StringSetter',
    defaultValue: '插槽容器'
  }, {
    name: "__params",
    title: "params|插槽入参",
    setter: {
      componentName: 'ArraySetter',
      props: {
        itemSetter: {
          componentName: 'StringSetter',
          props: {
            placeholder: '参数名称'
          }
        }
      }
    }
  }],
  configure: {
    component: {
      isContainer: true,
      disableBehaviors: '*'
    },
    supports: false,
    advanced: {
      callbacks: {
        onHoverHook: () => false,
        onMouseDownHook: () => false,
        onClickHook: () => false
      }
    }
  },
  snippets: [{
    title: '插槽',
    screenshot: 'https://alifd.alicdn.com/fusion-cool/icons/icon-antd/icon-1.jpg',
    schema: {
      componentName: 'Slot',
      props: {
        type: 'SmileOutlined',
        size: 20
      }
    }
  }]
});
;// CONCATENATED MODULE: ./src/lowcode/space/meta.ts
/* harmony default export */ var space_meta = ({
  group: 'Antd',
  componentName: 'ASpace',
  title: '间距',
  category: '数据展示',
  npm: {
    destructuring: true,
    componentName: 'ASpace'
  },
  props: [{
    name: 'align',
    title: {
      label: '对齐方式',
      tip: '对齐方式'
    },
    propType: {
      type: 'oneOf',
      value: ['start', 'end', 'center', 'baseline']
    }
  }, {
    name: 'direction',
    title: {
      label: '间距方向',
      tip: '间距方向'
    },
    propType: {
      type: 'oneOf',
      value: ['vertical', 'horizontal']
    }
  }, {
    name: 'size',
    title: {
      label: '间距大小',
      tip: '间距大小'
    },
    propType: {
      type: 'oneOfType',
      value: [{
        type: 'oneOf',
        value: ['small', 'middle', 'large']
      }, 'number']
    },
    defaultValue: 'middle'
  }, {
    name: 'wrap',
    title: {
      label: '是否自动换行',
      tip: '是否自动换行'
    },
    propType: "bool",
    condition: {
      type: 'JSFunction',
      value: 'target => target.getProps().getPropValue("direction")==="horizontal"'
    }
  }, {
    name: 'split',
    title: {
      label: '间隔组件',
      tip: '间隔组件,可拖组件进来， 常用的有竖向分隔线'
    },
    propType: "node"
  }],
  configure: {
    component: {
      isContainer: true
    },
    supports: {
      style: true
    }
  },
  snippets: [{
    title: '间距',
    screenshot: 'https://alifd.alicdn.com/fusion-cool/icons/icon-antd/space-1.png',
    schema: {
      componentName: 'ASpace',
      props: {},
      children: [{
        componentName: 'AButton',
        props: {
          children: 'Button-lyl'
        }
      }, {
        componentName: 'AButton',
        props: {
          children: 'Button-lemon'
        }
      }]
    }
  }]
});
;// CONCATENATED MODULE: ./src/lowcode/spin/meta.ts
/* harmony default export */ var spin_meta = ({
  group: 'Antd',
  componentName: "ASpin",
  title: '加载中',
  category: '反馈',
  npm: {
    destructuring: true,
    componentName: 'ASpin'
  },
  props: [{
    name: 'delay',
    title: {
      label: '延迟显示',
      tip: '延迟显示加载效果的时间（防止闪烁）'
    },
    propType: 'number'
  }, {
    name: 'indicator',
    title: {
      label: '加载指示符',
      tip: '加载指示符'
    },
    propType: 'node'
  }, {
    name: 'size',
    title: {
      label: '尺寸',
      tip: '组件大小'
    },
    propType: {
      type: 'oneOf',
      value: ['small', 'default', 'large']
    },
    defaultValue: 'default'
  }, {
    name: 'spinning',
    title: {
      label: '加载状态',
      tip: '是否为加载中状态'
    },
    propType: 'bool',
    defaultValue: true
  }, {
    name: 'tip',
    title: {
      label: '描述文案',
      tip: '当作为包裹元素时，可以自定义描述文案'
    },
    propType: 'string'
  }, {
    name: 'wrapperClassName',
    title: {
      label: '包装器的类属性',
      tip: '包装器的类属性'
    },
    propType: 'string'
  }],
  configure: {
    component: {
      isContainer: true
    },
    supports: {
      style: true
    }
  },
  snippets: [{
    title: "加载中",
    screenshot: "https://alifd.alicdn.com/fusion-cool/icons/icon-antd/spin-1.png",
    schema: {
      componentName: 'ASpin',
      props: {
        size: "large",
        tip: "loading..."
      }
    }
  }]
});
;// CONCATENATED MODULE: ./src/lowcode/statistic/meta.ts
/* harmony default export */ var statistic_meta = ({
  group: 'Antd',
  componentName: 'AStatistic',
  title: '统计数值',
  category: '数据展示',
  npm: {
    destructuring: true,
    componentName: 'AStatistic'
  },
  props: [{
    name: 'decimalSeparator',
    title: {
      label: '设置小数点',
      tip: '设置小数点'
    },
    propType: 'string'
  }, {
    name: 'formatter',
    title: {
      label: '自定义数值展示',
      tip: '自定义数值展示'
    },
    propType: 'func'
  }, {
    name: 'groupSeparator',
    title: {
      label: '设置千分位标识符',
      tip: '设置千分位标识符'
    },
    propType: 'string'
  }, {
    name: 'precision',
    title: {
      label: '数值精度',
      tip: '数值精度'
    },
    propType: 'number'
  }, {
    name: 'prefix',
    title: {
      label: '设置数值的前缀',
      tip: '设置数值的前缀'
    },
    propType: {
      type: 'oneOfType',
      value: ['string', 'node']
    }
  }, {
    name: 'suffix',
    title: {
      label: '设置数值的后缀',
      tip: '设置数值的后缀'
    },
    propType: {
      type: 'oneOfType',
      value: ['string', 'node']
    }
  }, {
    name: 'title',
    title: {
      label: '数值的标题',
      tip: '数值的标题'
    },
    propType: {
      type: 'oneOfType',
      value: ['string', 'node']
    }
  }, {
    name: 'value',
    title: {
      label: '数值内容',
      tip: '数值内容'
    },
    propType: {
      type: 'oneOfType',
      value: ['string', 'number']
    }
  }, {
    name: 'valueStyle',
    title: {
      label: '设置数值的样式',
      tip: '设置数值的样式'
    },
    propType: 'object'
  }],
  configure: {
    supports: {
      style: true
    }
  },
  snippets: [{
    title: "统计数值",
    screenshot: "https://alifd.alicdn.com/fusion-cool/icons/icon-antd/statistic-1.png",
    schema: {
      componentName: "AStatistic",
      props: {
        title: 'Active Users',
        value: 16589
      }
    }
  }]
});
;// CONCATENATED MODULE: ./src/lowcode/steps/meta.ts


/* harmony default export */ var steps_meta = ({
  group: 'Antd',
  componentName: 'ASteps',
  title: '步骤条',
  category: '导航',
  npm: {
    destructuring: true,
    componentName: 'ASteps'
  },
  props: [{
    name: 'steps',
    title: '步骤配置',
    setter: {
      componentName: 'ArraySetter',
      props: {
        itemSetter: {
          componentName: 'ObjectSetter',
          props: {
            config: {
              items: [{
                name: 'key',
                title: 'key',
                setter: 'StringSetter',
                initialValue: val => val || uuid()
              }, {
                name: 'title',
                title: '标题',
                setter: 'StringSetter'
              }, {
                name: 'subTitle',
                title: '子标题',
                setter: 'StringSetter'
              }, {
                name: 'description',
                title: '详细描述',
                setter: 'StringSetter'
              }, {
                name: 'disabled',
                title: '禁用',
                setter: 'BoolSetter',
                initialValue: false
              }, {
                name: 'status',
                title: {
                  label: '状态',
                  tip: '选择框大小'
                },
                setter: {
                  componentName: 'RadioGroupSetter',
                  props: {
                    options: [{
                      title: 'wait',
                      value: 'wait'
                    }, {
                      title: 'process',
                      value: 'process'
                    }, {
                      title: 'finish',
                      value: 'finish'
                    }, {
                      title: 'error',
                      value: 'error'
                    }]
                  }
                },
                propType: {
                  type: 'oneOf',
                  value: ['wait', 'process', 'finish', 'error']
                },
                defaultValue: 'wait'
              }]
            }
          },
          initialValue: () => {
            return {
              key: `Steps${uuid()}`,
              title: '步骤',
              disabled: false
            };
          }
        }
      }
    },
    extraProps: {
      getValue(target) {
        const map = target.node.children.map(child => {
          const key = child.getPropValue('key') ? String(child.getPropValue('key')) : child.id;
          return {
            key,
            title: child.getPropValue('title'),
            subTitle: child.getPropValue('subTitle'),
            description: child.getPropValue('description'),
            disabled: child.getPropValue('disabled'),
            status: child.getPropValue('status')
          };
        });
        return map;
      },
      setValue(target, value) {
        const {
          node
        } = target;
        const map = {};
        if (!Array.isArray(value)) {
          value = [];
        }
        value.forEach(item => {
          const tabItem = Object.assign({}, item);
          // @ts-ignore
          map[item.key] = tabItem;
        });
        node.children.mergeChildren(child => {
          const key = String(child.getPropValue('key'));
          if (Object.hasOwnProperty.call(map, key)) {
            // @ts-ignore
            child.setPropValue('title', map[key].title);
            // @ts-ignore
            child.setPropValue('subTitle', map[key].subTitle);
            // @ts-ignore
            child.setPropValue('description', map[key].description);
            // @ts-ignore
            child.setPropValue('disabled', map[key].disabled);
            // @ts-ignore
            child.setPropValue('status', map[key].status);
            // @ts-ignore
            delete map[key];
            return false;
          }
          return true;
        }, () => {
          const items = [];
          for (const key in map) {
            if (Object.hasOwnProperty.call(map, key)) {
              items.push({
                componentName: 'AStepsStep',
                // @ts-ignore
                props: map[key]
              });
            }
          }
          return items;
        }, (child1, child2) => {
          const a = value.findIndex(item => String(item.key) === String(child1.getPropValue('key')));
          const b = value.findIndex(item => String(item.key) === String(child2.getPropValue('key')));
          return a - b;
        });
      }
    }
  }, {
    name: 'class',
    title: {
      label: '步骤条类名',
      tip: '步骤条类名'
    },
    propType: 'string'
  }, {
    name: 'type',
    title: {
      label: '类型',
      tip: '步骤条类型，有 `default` 和 `navigation` 两种'
    },
    propType: {
      type: 'oneOf',
      value: ['default', 'navigation']
    },
    defaultValue: 'default'
  }, {
    name: 'current',
    title: {
      label: '当前步骤',
      tip: '指定当前步骤，从 0 开始记数。在子 Step 元素中，可以通过 `status` 属性覆盖状态'
    },
    propType: 'number'
  }, {
    name: 'direction',
    title: {
      label: '步骤条方向',
      tip: '指定步骤条方向。目前支持水平（`horizontal`）和竖直（`vertical`）两种方向'
    },
    propType: {
      type: 'oneOf',
      value: ['horizontal', 'vertical']
    }
  }, {
    name: 'labelPlacement',
    title: {
      label: '标签放置位置',
      tip: '指定标签放置位置，默认水平放图标右侧，可选 `vertical` 放图标下方'
    },
    propType: {
      type: 'oneOf',
      value: ['horizontal', 'vertical']
    },
    defaultValue: 'horizontal'
  }, {
    name: 'progressDot',
    title: {
      label: '点状步骤条',
      tip: '点状步骤条，可以设置为一个 func'
    },
    propType: {
      type: 'oneOfType',
      value: ['bool', 'func']
    }
  }, {
    name: 'size',
    title: {
      label: '尺寸',
      tip: '指定大小'
    },
    propType: {
      type: 'oneOf',
      value: ['default', 'small']
    },
    defaultValue: 'default'
  }, {
    name: 'status',
    title: {
      label: '当前步骤状态',
      tip: '指定当前步骤的状态，可选 `wait` `process` `finish` `error`'
    },
    propType: {
      type: 'oneOf',
      value: ['wait', 'process', 'finish', 'error']
    },
    defaultValue: 'process'
  }, {
    name: 'initial',
    title: {
      label: '起始序号',
      tip: '起始序号，从 0 开始记数'
    },
    propType: 'number',
    defaultValue: 0
  }, {
    name: 'onChange ',
    title: {
      label: '点击切换步骤时触发',
      tip: '点击切换步骤时触发'
    },
    propType: 'func'
  }],
  configure: {
    component: {
      isContainer: true,
      nestingRule: {
        childWhitelist: ['AStepsStep']
      }
    },
    supports: {
      style: true,
      events: [{
        name: 'onChange',
        template: "onChange(current,${extParams}){\n// 点击切换步骤时触发\nconsole.log('onChange ',current);}"
      }]
    }
  },
  snippets: [{
    title: '步骤条',
    screenshot: 'https://alifd.alicdn.com/fusion-cool/icons/icon-antd/steps-1.png',
    schema: {
      componentName: 'ASteps',
      props: {
        current: 1
      },
      children: [{
        componentName: 'AStepsStep',
        props: {
          title: 'Finished',
          description: 'This is a description.'
        }
      }, {
        componentName: 'AStepsStep',
        props: {
          title: 'In Progress',
          subTitle: 'Left 00:00:08',
          description: 'This is a description.'
        }
      }, {
        componentName: 'AStepsStep',
        props: {
          title: 'Waiting',
          description: 'This is a description.'
        }
      }]
    }
  }]
});
;// CONCATENATED MODULE: ./src/lowcode/steps-step/meta.ts
/* harmony default export */ var steps_step_meta = ({
  group: 'Antd',
  componentName: 'AStepsStep',
  title: '步骤项',
  props: [{
    name: 'title',
    title: {
      label: '标题',
      tip: '标题'
    },
    propType: 'string'
  }, {
    name: 'subTitle',
    title: {
      label: '子标题',
      tip: '子标题'
    },
    propType: 'string'
  }, {
    name: 'description',
    title: {
      label: '步骤描述',
      tip: '步骤描述'
    },
    propType: 'string'
  }, {
    name: 'disabled',
    title: {
      label: '是否禁用',
      tip: '是否为禁用状态'
    },
    propType: 'bool'
  }, {
    name: 'icon',
    title: {
      label: '图标',
      tip: '图标'
    },
    propType: 'node'
  }, {
    name: 'status',
    title: {
      label: '状态',
      tip: '状态'
    },
    propType: 'string'
  }],
  configure: {
    component: {
      nestingRule: {
        parentWhitelist: ['ASteps']
      }
    },
    supports: {
      style: true
    }
  },
  snippets: []
});
;// CONCATENATED MODULE: ./src/lowcode/switch/meta.ts
/* eslint-disable */
// @ts-ignore
/* harmony default export */ var switch_meta = ({
  group: 'Antd',
  componentName: 'ASwitch',
  title: '开关',
  category: '基础组件',
  npm: {
    destructuring: true,
    componentName: 'ASwitch'
  },
  configure: {
    props: [{
      name: 'defaultChecked',
      title: {
        label: '默认选中',
        tip: '默认是否选中'
      },
      propType: 'bool',
      defaultValue: false,
      setter: 'BoolSetter'
    }, {
      name: 'checked',
      title: {
        label: '是否选中',
        tip: '当前是否选中'
      },
      propType: 'bool',
      defaultValue: false,
      setter: 'BoolSetter',
      supportVariable: true
    }, {
      name: 'autoFocus',
      title: {
        label: '自动聚焦',
        tip: '组件自动获取焦点'
      },
      propType: 'bool',
      defaultValue: false,
      setter: 'BoolSetter'
    }, {
      name: 'checkedChildren',
      title: {
        label: '选中时内容',
        tip: '选中时的内容'
      },
      propType: 'string',
      setter: 'StringSetter'
    }, {
      name: 'unCheckedChildren',
      title: {
        label: '非选中时内容',
        tip: '非选中时的内容'
      },
      propType: 'string',
      setter: 'StringSetter'
    }, {
      name: 'disabled',
      title: {
        label: '是否禁用',
        tip: '是否为禁用状态'
      },
      propType: 'bool',
      defaultValue: false,
      setter: 'BoolSetter'
    }, {
      name: 'loading',
      title: {
        label: '加载中',
        tip: '加载中'
      },
      propType: 'bool',
      defaultValue: false,
      setter: 'BoolSetter'
    }, {
      name: 'size',
      title: {
        label: '尺寸',
        tip: '开关大小'
      },
      propType: {
        type: 'oneOf',
        value: ['default', 'small']
      },
      setter: {
        componentName: 'RadioGroupSetter',
        props: {
          options: [{
            title: '默认',
            value: 'default'
          }, {
            title: '小',
            value: 'small'
          }]
        }
      },
      defaultValue: 'default'
    }],
    supports: {
      style: true,
      events: [{
        name: 'onChange',
        template: "onChange(checked,event,${extParams}){\n// 变化时回调函数\nconsole.log('onChange',checked,event);}"
      }, {
        name: 'onClick',
        template: "onClick(checked,event,${extParams}){\n// 点击时回调函数\nconsole.log('onClick',checked,event);}"
      }]
    }
  },
  snippets: [{
    title: '开关',
    screenshot: "https://alifd.alicdn.com/fusion-cool/icons/icon-antd/switch-1.png",
    schema: {
      componentName: "ASwitch",
      props: {
        defaultChecked: true
      }
    }
  }]
});
;// CONCATENATED MODULE: ./src/lowcode/tab-pane/meta.ts
/* eslint-disable */
// @ts-ignore
/* harmony default export */ var tab_pane_meta = ({
  group: 'Antd',
  componentName: 'ATabPane',
  title: '标签项',
  category: '数据展示',
  npm: {
    destructuring: true,
    componentName: 'ATabPane'
  },
  props: [{
    name: 'key',
    title: {
      label: 'key',
      tip: 'key'
    },
    propType: 'string',
    setter: 'StringSetter',
    supportVariable: true
  }, {
    name: 'tab',
    title: {
      label: '标题',
      tip: '标题'
    },
    propType: 'string',
    setter: 'StringSetter',
    supportVariable: true
  }, {
    name: 'forceRender',
    title: {
      label: '隐藏时保留',
      tip: '被隐藏时是否渲染 DOM 结构'
    },
    propType: 'bool',
    setter: 'BoolSetter',
    supportVariable: true
  }],
  configure: {
    component: {
      isContainer: true,
      nestingRule: {
        parentWhitelist: ['ATabs']
      }
    }
  },
  snippets: [{
    title: '标签项',
    screenshot: 'https://alifd.alicdn.com/fusion-cool/icons/icon-antd/tabs-1.jpg',
    schema: {
      componentName: 'ATabPane',
      props: {
        type: 'inline',
        activeKey: '1'
      }
    }
  }]
});
;// CONCATENATED MODULE: ./src/lowcode/table/meta.ts
/* eslint-disable */
// @ts-ignore
/* harmony default export */ var table_meta = ({
  group: 'Antd',
  componentName: 'ATable',
  title: '表格',
  category: '数据展示',
  npm: {
    destructuring: true,
    componentName: 'ATable'
  },
  props: [{
    title: '数据源',
    display: 'block',
    type: 'group',
    items: [{
      name: 'dataSource',
      title: {
        label: '表格数据',
        tip: 'datasource|表格数据'
      },
      propType: 'object',
      setter: 'JsonSetter',
      supportVariable: true
    }, {
      name: 'loading',
      title: {
        label: '加载中',
        tip: '页面是否在加载中'
      },
      propType: 'bool',
      setter: 'BoolSetter',
      defaultValue: false,
      supportVariable: true
    }, {
      name: 'rowKey',
      title: {
        label: '行Key',
        tip: 'rowKey | 表格行 key 的取值，可以是字符串或一个函数'
      },
      propType: {
        type: 'oneOfType',
        value: ['string', 'func']
      },
      setter: ['StringSetter', {
        componentName: 'FunctionSetter',
        props: {
          template: 'getRowKey(record,index,${extParams}){\n// 通过函数获取表格行 key\nreturn record.id;\n}'
        }
      }, 'VariableSetter'],
      defaultValue: 'id'
    }, {
      name: 'columns',
      title: {
        label: '表格列',
        tip: '表格列的配置描述，具体项见下表'
      },
      setter: {
        componentName: 'ArraySetter',
        props: {
          itemSetter: {
            componentName: 'ObjectSetter',
            props: {
              config: {
                items: [{
                  name: 'title',
                  title: {
                    label: '列标题',
                    tip: 'title | 列标题'
                  },
                  propType: {
                    type: 'oneOfType',
                    value: ['string', 'func']
                  },
                  setter: ['StringSetter', {
                    componentName: 'SlotSetter',
                    title: '列标题插槽',
                    initialValue: {
                      type: 'JSSlot',
                      params: ['options'],
                      value: []
                    }
                  }]
                }, {
                  name: 'dataIndex',
                  title: {
                    label: '数据字段',
                    tip: 'dataIndex | 数据字段'
                  },
                  propType: 'string',
                  setter: 'StringSetter',
                  isRequired: true
                }, {
                  name: 'key',
                  title: {
                    label: 'key',
                    tip: 'Vue 需要的 key'
                  },
                  propType: 'string',
                  setter: 'StringSetter'
                }, {
                  name: 'align',
                  title: {
                    label: '对齐方式',
                    tip: 'align | 对齐方式'
                  },
                  propType: {
                    type: 'oneOf',
                    value: ['left', 'right', 'center']
                  },
                  defaultValue: 'left',
                  setter: [{
                    componentName: 'RadioGroupSetter',
                    props: {
                      options: [{
                        title: 'left',
                        value: 'left'
                      }, {
                        title: 'right',
                        value: 'right'
                      }, {
                        title: 'center',
                        value: 'center'
                      }]
                    }
                  }, 'VariableSetter']
                }, {
                  name: 'fixed',
                  title: {
                    label: '列是否固定',
                    tip: 'fixed | 列是否固定'
                  },
                  description: '（IE 下无效）列是否固定，可选 true (等效于 left) left right',
                  defaultValue: '',
                  propType: {
                    type: 'oneOf',
                    value: ['', 'left', 'right', true, false]
                  },
                  setter: ['BoolSetter', {
                    componentName: 'RadioGroupSetter',
                    props: {
                      options: [{
                        title: '不固定',
                        value: ''
                      }, {
                        title: '固定在左侧',
                        value: 'left'
                      }, {
                        title: '固定在右侧',
                        value: 'right'
                      }]
                    }
                  }, 'VariableSetter']
                }, {
                  name: 'width',
                  title: {
                    label: '宽度',
                    tip: 'width | 列宽度'
                  },
                  propType: {
                    type: 'oneOfType',
                    value: ['number', 'string']
                  },
                  setter: ['NumberSetter', 'StringSetter', 'VariableSetter']
                }, {
                  name: 'sorter',
                  title: {
                    label: '排序规则',
                    tip: 'sorter | 排序函数，本地排序使用一个函数，需要服务端排序可设为 true'
                  },
                  propType: {
                    type: 'oneOfType',
                    value: ['bool', 'func']
                  },
                  setter: ['BoolSetter', 'FunctionSetter', 'VariableSetter']
                }, {
                  name: 'ellipsis',
                  title: {
                    label: '省略',
                    tip: 'ellipsis|超过宽度将自动省略'
                  },
                  propType: 'bool',
                  setter: 'BoolSetter',
                  defaultValue: false
                }, {
                  name: 'filters',
                  title: {
                    label: '筛选菜单项',
                    tip: 'filters | 表头的筛选菜单项'
                  },
                  propType: 'object',
                  setter: 'JsonSetter'
                }, {
                  name: 'filterSearch',
                  title: {
                    label: '筛选菜单项是否可搜索',
                    tip: 'filterSearch|筛选菜单项是否可搜索'
                  },
                  propType: 'bool',
                  setter: 'BoolSetter',
                  defaultValue: false
                }, {
                  name: 'filterMultiple',
                  title: '是否多选',
                  propType: 'bool',
                  setter: 'BoolSetter',
                  defaultValue: true
                }, {
                  name: 'filterMode',
                  title: {
                    label: 'filterMode',
                    tip: 'filterMode | 指定筛选菜单的用户界面'
                  },
                  propType: {
                    type: 'oneOf',
                    value: ['menu', 'tree']
                  },
                  setter: [{
                    componentName: 'RadioGroupSetter',
                    props: {
                      options: [{
                        title: 'menu',
                        value: 'menu'
                      }, {
                        title: 'tree',
                        value: 'tree'
                      }]
                    }
                  }],
                  defaultValue: 'menu'
                }, {
                  name: 'render',
                  title: {
                    label: '自定义渲染',
                    tip: 'render | 插槽内的物料表达式可通过this.record获取当前行数据，this.index获取索引(该项用于自定义操作列)'
                  },
                  propType: 'func',
                  setter: [{
                    componentName: 'SlotSetter',
                    title: '单元格插槽',
                    initialValue: {
                      type: 'JSSlot',
                      params: ['text', 'record', 'index'],
                      value: []
                    }
                  }, 'VariableSetter']
                }]
              }
            },
            initialValue: {
              title: '标题'
            }
          }
        }
      }
    }]
  }, {
    title: '外观',
    display: 'block',
    type: 'group',
    items: [{
      name: 'showHeader',
      title: {
        label: '显示表头',
        tip: 'showHeader | 是否显示表头'
      },
      propType: 'bool',
      setter: 'BoolSetter',
      defaultValue: true
    }, {
      name: 'bordered',
      title: {
        label: '显示边框',
        tip: 'bordered | 是否展示外边框和列边框'
      },
      propType: 'bool',
      setter: 'BoolSetter'
    }, {
      name: 'size',
      title: {
        label: '表格大小',
        tip: 'size | 表格大小'
      },
      propType: {
        type: 'oneOf',
        value: ['default', 'middle', 'small']
      },
      setter: [{
        componentName: 'RadioGroupSetter',
        props: {
          options: [{
            title: '默认',
            value: 'default'
          }, {
            title: '中',
            value: 'middle'
          }, {
            title: '小',
            value: 'small'
          }]
        }
      }, 'VariableSetter'],
      defaultValue: 'default'
    }, {
      name: 'tableLayout',
      title: {
        label: '表格布局',
        tip: 'tableLayout | 表格布局'
      },
      defaultValue: '',
      propType: {
        type: 'oneOf',
        value: ['', 'auto', 'fixed']
      },
      setter: [{
        componentName: 'RadioGroupSetter',
        props: {
          options: [{
            title: '默认',
            value: ''
          }, {
            title: '自动',
            value: 'auto'
          }, {
            title: '固定',
            value: 'fixed'
          }]
        }
      }, 'VariableSetter']
    }]
  }, {
    title: '分页',
    display: 'block',
    type: 'group',
    items: [{
      name: 'pagination',
      title: {
        label: '显示分页',
        tip: 'pagination | 显示分页'
      },
      propType: 'object',
      setter: 'BoolSetter',
      extraProps: {
        setValue: (target, value) => {
          if (value) {
            target.parent.setPropValue('pagination', {
              pageSize: 10
            });
          }
        }
      }
    }, {
      name: 'pagination.pageSize',
      title: {
        label: '每页条数',
        tip: 'pagination.pageSize | 每页条数'
      },
      propType: 'number',
      setter: 'NumberSetter',
      condition: {
        type: 'JSFunction',
        value: 'target => !!target.getProps().getPropValue("pagination")'
      }
    }, {
      name: 'pagination.total',
      title: {
        label: '数据总数',
        tip: 'pagination.total | 数据总数'
      },
      propType: 'number',
      setter: 'NumberSetter',
      condition: {
        type: 'JSFunction',
        value: 'target => !!target.getProps().getPropValue("pagination")'
      }
    }, {
      name: 'pagination.defaultCurrent',
      title: {
        label: '默认当前页',
        tip: 'pagination.defaultCurrent | 默认的当前页数'
      },
      propType: 'number',
      setter: 'NumberSetter',
      condition: {
        type: 'JSFunction',
        value: 'target => !!target.getProps().getPropValue("pagination")'
      }
    }, {
      name: 'pagination.current',
      title: {
        label: '当前页数',
        tip: 'pagination.current | 当前页数'
      },
      propType: 'number',
      setter: 'NumberSetter',
      condition: {
        type: 'JSFunction',
        value: 'target => !!target.getProps().getPropValue("pagination")'
      }
    }, {
      name: 'pagination.showTotal',
      title: {
        label: '显示总数',
        tip: 'pagination.showTotal | 用于显示数据总量和当前数据顺序'
      },
      propType: 'func',
      setter: [{
        componentName: 'FunctionSetter',
        props: {
          template: 'showTotal(total,range,${extParams}){\n// 用于格式化显示表格数据总量\nreturn `共 ${total} 条`;\n}'
        }
      }, 'VariableSetter'],
      condition: {
        type: 'JSFunction',
        value: 'target => !!target.getProps().getPropValue("pagination")'
      }
    }, {
      name: 'pagination.showSizeChanger',
      title: {
        label: '页数切换',
        tip: 'pagination.showSizeChanger | 是否展示 pageSize 切换器'
      },
      propType: 'bool',
      setter: 'BoolSetter',
      defaultValue: false,
      condition: {
        type: 'JSFunction',
        value: 'target => !!target.getProps().getPropValue("pagination")'
      }
    }, {
      name: 'pagination.showQuickJumper',
      title: {
        label: '快速跳转',
        tip: 'pagination.showQuickJumper | 是否可以快速跳转至某页'
      },
      propType: 'bool',
      setter: 'BoolSetter',
      defaultValue: false,
      condition: {
        type: 'JSFunction',
        value: 'target => !!target.getProps().getPropValue("pagination")'
      }
    }, {
      name: 'pagination.simple',
      title: {
        label: '简单分页',
        tip: 'pagination.simple | 简单分页'
      },
      propType: 'bool',
      setter: 'BoolSetter',
      defaultValue: false,
      condition: {
        type: 'JSFunction',
        value: 'target => !!target.getProps().getPropValue("pagination")'
      }
    }, {
      name: 'pagination.size',
      title: {
        label: '分页尺寸',
        tip: 'pagination.size | 分页尺寸'
      },
      propType: {
        type: 'oneOf',
        value: ['default', 'small']
      },
      setter: [{
        componentName: 'RadioGroupSetter',
        props: {
          options: [{
            title: '默认',
            value: 'default'
          }, {
            title: '小',
            value: 'small'
          }]
        }
      }, 'VariableSetter'],
      defaultValue: 'default',
      condition: {
        type: 'JSFunction',
        value: 'target => !!target.getProps().getPropValue("pagination")'
      }
    }, {
      name: 'pagination.position',
      title: {
        label: '分页位置',
        tip: 'pagination.position | 分页位置'
      },
      setter: {
        componentName: 'ArraySetter',
        props: {
          itemSetter: {
            componentName: 'SelectSetter',
            props: {
              options: [{
                title: '上左',
                value: 'topLeft'
              }, {
                title: '上中',
                value: 'topCenter'
              }, {
                title: '上右',
                value: 'topRight'
              }, {
                title: '下左',
                value: 'bottomLeft'
              }, {
                title: '下中',
                value: 'bottomCenter'
              }, {
                title: '下右',
                value: 'bottomRight'
              }]
            },
            initialValue: 'bottomRight'
          }
        }
      },
      condition: {
        type: 'JSFunction',
        value: 'target => !!target.getProps().getPropValue("pagination")'
      }
    }]
  }, {
    title: '滚动',
    display: 'block',
    type: 'group',
    items: [{
      name: 'scroll.scrollToFirstRowOnChange',
      title: {
        label: '自动滚动',
        tip: 'scroll.scrollToFirstRowOnChange | 是否自动滚动到表格顶部'
      },
      propType: 'bool',
      setter: 'BoolSetter',
      defaultValue: true
    }, {
      name: 'scroll.x',
      title: {
        label: '横向滚动',
        tip: 'scroll.x | 	设置横向滚动，也可用于指定滚动区域的宽，可以设置为像素值，百分比，true 和 max-content'
      },
      propType: {
        type: 'oneOfType',
        value: ['number', 'bool']
      },
      setter: ['NumberSetter', 'BoolSetter', 'VariableSetter']
    }, {
      name: 'scroll.y',
      title: {
        label: '纵向滚动',
        tip: 'scroll.y | 	设置纵向滚动，也可用于指定滚动区域的高，可以设置为像素值'
      },
      propType: 'number',
      setter: ['NumberSetter', 'VariableSetter']
    }]
  }, {
    title: '行选择器',
    display: 'block',
    type: 'group',
    items: [{
      name: 'rowSelection',
      title: {
        label: '行选择',
        tip: 'rowSelection | 行选择'
      },
      propType: {
        type: 'oneOfType',
        value: ['object', 'bool']
      },
      setter: ['JsonSetter', 'boolSetter'],
      extraProps: {
        setValue: (target, value) => {
          if (value) {
            target.parent.setPropValue('rowSelection', {
              type: 'radio'
            });
          }
        }
      }
    }, {
      name: 'rowSelection.type',
      title: {
        label: '行选择类型',
        tip: 'rowSelection.type | 多选/单选'
      },
      propType: {
        type: 'oneOf',
        value: ['checkbox', 'radio']
      },
      setter: [{
        componentName: 'RadioGroupSetter',
        props: {
          options: [{
            title: '多选',
            value: 'checkbox'
          }, {
            title: '单选',
            value: 'radio'
          }]
        }
      }, 'VariableSetter'],
      condition: {
        type: 'JSFunction',
        value: 'target => !!target.getProps().getPropValue("rowSelection")'
      }
    }, {
      name: 'rowSelection.fixed',
      title: {
        label: '固定左边',
        tip: 'rowSelection.fixed | 把选择框列固定在左边'
      },
      propType: 'bool',
      setter: 'BoolSetter',
      condition: {
        type: 'JSFunction',
        value: 'target => !!target.getProps().getPropValue("rowSelection")'
      }
    }, {
      name: 'rowSelection.selectedRowKeys',
      title: {
        label: '选中行Key',
        tip: 'rowSelection.selectedRowKeys | 指定选中项的 key 数组'
      },
      propType: 'object',
      setter: 'JsonSetter',
      condition: {
        type: 'JSFunction',
        value: 'target => !!target.getProps().getPropValue("rowSelection")'
      }
    }, {
      name: 'rowSelection.preserveSelectedRowKeys',
      title: {
        label: '保留选项',
        tip: 'rowSelection.preserveSelectedRowKeys | 当数据被删除时仍然保留选项'
      },
      propType: 'bool',
      setter: 'BoolSetter',
      condition: {
        type: 'JSFunction',
        value: 'target => !!target.getProps().getPropValue("rowSelection")'
      }
    }, {
      name: 'rowSelection.getCheckboxProps',
      title: {
        label: '默认属性',
        tip: 'rowSelection.getCheckboxProps | 选择框的默认属性配置'
      },
      propType: 'func',
      setter: [{
        componentName: 'FunctionSetter',
        props: {
          template: 'getCheckboxProps(record,${extParams}){\n// 选择框的默认属性配置\nreturn { disabled: false };\n}'
        }
      }, 'VariableSetter'],
      condition: {
        type: 'JSFunction',
        value: 'target => !!target.getProps().getPropValue("rowSelection")'
      }
    }]
  }, {
    title: '行展开',
    display: 'block',
    type: 'group',
    items: [{
      name: 'expandedRowRender',
      title: {
        label: '展开行渲染',
        tip: 'expandedRowRender | 额外的展开行'
      },
      propType: 'func',
      setter: [{
        componentName: 'SlotSetter',
        title: '展开行插槽',
        initialValue: {
          type: 'JSSlot',
          params: ['record', 'index', 'indent', 'expanded'],
          value: []
        }
      }, {
        componentName: 'FunctionSetter',
        props: {
          template: 'onExpandedRowRender(record,index,indent,expanded,${extParams}){\n// 展开行渲染\nreturn `${record.id}`}'
        }
      }, 'VariableSetter']
    }, {
      name: 'defaultExpandAllRows',
      title: {
        label: '初始是否展开所有行',
        tip: 'defaultExpandAllRows|初始时，是否展开所有行'
      },
      propType: 'bool',
      setter: ['BoolSetter', 'VariableSetter']
    }, {
      name: 'rowExpandable',
      title: {
        label: '是否可展开',
        tip: 'rowExpandable | 行是否可展开'
      },
      propType: 'func',
      setter: [{
        componentName: 'FunctionSetter',
        props: {
          template: 'rowExpandable(record,${extParams}){\n// 行是否可展开\nreturn true;\n}'
        }
      }, 'VariableSetter']
    }]
  }, {
    title: '扩展',
    display: 'block',
    type: 'group',
    items: [{
      name: 'title',
      title: {
        label: '表格标题',
        tip: 'title | 表格标题'
      },
      propType: 'func',
      setter: [{
        componentName: 'SlotSetter',
        title: '表格标题插槽',
        initialValue: {
          type: 'JSSlot',
          params: ['currentPageData'],
          value: []
        }
      }, {
        componentName: 'FunctionSetter',
        props: {
          template: 'renderTitle(currentPageData,${extParams}){\n// 自定义渲染表格顶部\nreturn "表格顶部";\n}'
        }
      }, 'VariableSetter']
    }, {
      name: 'footer',
      title: {
        label: '表格尾部',
        tip: 'footer | 表格尾部'
      },
      propType: 'func',
      setter: [{
        componentName: 'SlotSetter',
        title: '表格尾部插槽',
        initialValue: {
          type: 'JSSlot',
          params: ['currentPageData'],
          value: []
        }
      }, {
        componentName: 'FunctionSetter',
        props: {
          template: 'renderFooter(currentPageData,${extParams}){\n// 自定义渲染表格尾部\nreturn "表格尾部";\n}'
        }
      }, 'VariableSetter']
    }, {
      name: 'customHeaderRow',
      title: {
        label: '头部行属性',
        tip: 'customHeaderRow | 设置头部行属性'
      },
      propType: 'func',
      setter: [{
        componentName: 'FunctionSetter',
        props: {
          template: 'customHeaderRow(columns,index,${extParams}){\n// 设置头部行属性\nreturn {onClick:()=>{}};\n}'
        }
      }, 'VariableSetter']
    }, {
      name: 'customRow',
      title: {
        label: '行属性',
        tip: 'customRow | 设置行属性'
      },
      propType: 'func',
      setter: [{
        componentName: 'FunctionSetter',
        props: {
          template: 'customRow(record,index,${extParams}){\n// 设置行属性\nreturn {onClick: (event) => {},       // 点击行\n' + '      onDblclick: (event) => {},\n' + '      onContextmenu: (event) => {},\n' + '      onMouseEnter: (event) => {},  // 鼠标移入行\n' + '      onMouseLeave: (event) => {}};\n}'
        }
      }, 'VariableSetter']
    }, {
      name: 'rowClassName',
      title: {
        label: '行类名',
        tip: 'rowClassName | 表格行的类名'
      },
      propType: 'func',
      setter: [{
        componentName: 'FunctionSetter',
        props: {
          template: 'rowClassName(record,index,${extParams}){\n// 表格行的类名\nreturn `table-${record.type}`;\n}'
        }
      }, 'VariableSetter']
    }]
  }],
  configure: {
    supports: {
      style: true,
      events: [{
        name: 'onChange',
        template: "onChange(pagination,filters,sorter,extra,${extParams}){\n// 分页、排序、筛选变化时触发\nconsole.log('onChange', pagination);}"
      }, {
        name: 'onExpandedRowsChange',
        template: "onExpandedRowsChange(expanded, record,${extParams}){\n// 展开的行变化时触发\nconsole.log('onExpandedRowsChange', expanded, record);}"
      }, {
        name: 'onExpand',
        template: "onExpand(expanded,record){\n// 点击展开图标时触发\nconsole.log('onExpand', expanded, record);}"
      }]
    }
  },
  snippets: [{
    title: '表格',
    screenshot: 'https://alifd.alicdn.com/fusion-cool/icons/icon-antd/table-1.png',
    schema: {
      componentName: 'ATable',
      props: {
        dataSource: [{
          id: '1',
          name: '毛不易',
          age: 32,
          address: '西湖区湖底公园1号'
        }, {
          id: '2',
          name: '邓紫棋',
          age: 28,
          address: '滨江区网商路699号'
        }],
        columns: [{
          title: '姓名',
          dataIndex: 'name',
          key: 'name'
        }, {
          title: '年龄',
          dataIndex: 'age',
          key: 'age'
        }, {
          title: '地址',
          dataIndex: 'address',
          key: 'address'
        }, {
          title: '操作',
          align: 'left',
          fixed: 'right',
          render: {
            type: "JSSlot",
            params: ["text", "record", "index"]
          }
        }],
        rowKey: 'id',
        pagination: {
          pageSize: 10,
          total: 15,
          current: 1
        }
      }
    }
  }]
});
;// CONCATENATED MODULE: ./src/lowcode/tabs/meta.ts
/* eslint-disable */
// @ts-ignore
/* harmony default export */ var tabs_meta = ({
  group: 'Antd',
  componentName: 'ATabs',
  title: '标签',
  category: '数据展示',
  npm: {
    destructuring: true,
    componentName: 'ATabs'
  },
  props: [{
    name: 'activeKey',
    title: {
      label: '当前激活',
      tip: '当前激活 tab 面板的 key'
    },
    propType: 'string',
    setter: 'StringSetter',
    supportVariable: true
  }, {
    name: 'animated',
    title: {
      label: '切换动画',
      tip: '是否使用动画切换Tabs'
    },
    propType: 'bool',
    setter: 'BoolSetter',
    supportVariable: true
  }, {
    name: 'size',
    title: {
      label: '尺寸',
      tip: '大小，提供 `large` `default` 和 `small` 三种大小'
    },
    propType: {
      type: 'oneOf',
      value: ['large', 'default', 'small']
    },
    defaultValue: 'default'
  }, {
    name: 'centered',
    title: {
      label: '标签居中',
      tip: '标签居中展示'
    },
    propType: 'bool',
    defaultValue: false,
    setter: 'BoolSetter',
    supportVariable: true
  }, {
    name: 'tabBarGutter',
    title: {
      label: '标签间隙',
      tip: 'tabs之间的间隙'
    },
    propType: 'number',
    setter: 'NumberSetter',
    supportVariable: true
  }, {
    name: 'tabPosition',
    title: {
      label: '页签位置',
      tip: '页签位置'
    },
    propType: {
      type: 'oneOf',
      value: ['top', 'right', 'bottom', 'left']
    },
    defaultValue: 'top'
  }, {
    name: 'type',
    title: {
      label: '页签样式',
      tip: '页签的基本样式，可选`line`、`card`、`editable-card`类型'
    },
    propType: {
      type: 'oneOf',
      value: ['line', 'card', 'editable-card']
    },
    defaultValue: 'line'
  }, {
    name: 'onChange',
    title: '切换面板的回调',
    propType: 'func'
  }, {
    name: 'edit',
    title: '新增和删除页签的回调',
    propType: 'func'
  }, {
    name: 'tabClick',
    title: 'tab 被点击的回调',
    propType: 'func'
  }, {
    name: 'tabScroll',
    title: '滚动 TabBar触发',
    propType: 'func'
  }],
  configure: {
    component: {
      isContainer: true
    },
    supports: {
      style: true,
      events: ['onChange', 'onEdit', 'onTabClick', 'onTabScroll']
    }
  },
  snippets: [{
    title: '标签',
    screenshot: 'https://alifd.alicdn.com/fusion-cool/icons/icon-antd/tabs-1.jpg',
    schema: {
      componentName: 'ATabs',
      props: {
        type: 'inline',
        activeKey: '1'
      }
    }
  }]
});
;// CONCATENATED MODULE: ./src/lowcode/tag/meta.ts
/* harmony default export */ var tag_meta = ({
  group: 'Antd',
  componentName: 'ATag',
  title: '标签',
  category: '反馈',
  npm: {
    destructuring: true,
    componentName: 'ATag'
  },
  props: [{
    name: 'children',
    title: {
      label: '内容',
      tip: '内容'
    },
    propType: 'string'
  }, {
    name: 'closable',
    title: {
      label: '可关闭',
      tip: '标签是否可以关闭'
    },
    propType: 'bool',
    defaultValue: false
  }, {
    name: 'color',
    title: {
      label: '标签色',
      tip: '标签色'
    },
    propType: 'string'
  }, {
    name: 'closeIcon',
    title: {
      label: '自定义关闭按钮',
      tip: '自定义关闭按钮'
    },
    propType: 'node'
  }, {
    name: 'visible',
    title: {
      label: '是否显示标签',
      tip: '是否显示标签'
    },
    propType: 'bool',
    defaultValue: true
  }, {
    name: 'icon',
    title: {
      label: '设置图标',
      tip: '设置图标'
    },
    propType: 'node'
  }],
  configure: {
    supports: {
      style: true,
      events: [{
        name: 'onClose',
        template: "onClose(event,${extParams}){\n// 关闭时的回调\nconsole.log('onClose',event);}"
      }]
    }
  },
  snippets: [{
    title: "标签",
    screenshot: "https://alifd.alicdn.com/fusion-cool/icons/icon-antd/tag-1.png",
    schema: {
      componentName: "ATag",
      props: {
        color: "magenta",
        children: "标签"
      }
    }
  }]
});
;// CONCATENATED MODULE: ./src/lowcode/time-picker/meta.ts
/* harmony default export */ var time_picker_meta = ({
  group: 'Antd',
  componentName: 'ATimePicker',
  title: '时间选择框',
  category: '数据展示',
  npm: {
    destructuring: true,
    componentName: 'ATimePicker'
  },
  props: [{
    name: 'defaultValue',
    title: {
      label: '默认时间',
      tip: '默认时间'
    },
    propType: 'date',
    setter: 'DateSetter'
  }, {
    name: 'value',
    title: {
      label: '当前时间',
      tip: '当前时间'
    },
    propType: 'date',
    setter: 'DateSetter'
  }, {
    name: 'allowClear',
    title: {
      label: '支持清除',
      tip: '是否允许清除'
    },
    propType: 'bool',
    defaultValue: true,
    setter: 'BoolSetter'
  }, {
    name: 'autoFocus',
    title: {
      label: '自动聚焦',
      tip: '自动获取焦点'
    },
    propType: 'bool',
    defaultValue: false,
    setter: 'BoolSetter'
  }, {
    name: 'bordered',
    title: {
      label: '显示边框',
      tip: '是否有边框'
    },
    propType: 'bool',
    defaultValue: true,
    setter: 'BoolSetter'
  }, {
    name: 'clearText',
    title: {
      label: '清除按钮的提示文案',
      tip: '清除按钮的提示文案'
    },
    propType: 'string',
    setter: 'StringSetter'
  }, {
    name: 'disabled',
    title: {
      label: '是否禁用',
      tip: '是否为禁用状态'
    },
    propType: 'bool',
    defaultValue: false,
    setter: 'BoolSetter'
  }, {
    name: 'disabledHours',
    title: {
      label: '禁止选择部分小时选项',
      tip: '禁止选择部分小时选项'
    },
    propType: 'func'
  }, {
    name: 'disabledMinutes',
    title: {
      label: '禁止选择部分分钟选项',
      tip: '禁止选择部分分钟选项'
    },
    propType: 'func'
  }, {
    name: 'disabledSeconds',
    title: {
      label: '禁止选择部分秒选项',
      tip: '禁止选择部分秒选项'
    },
    propType: 'func'
  }, {
    name: 'format',
    title: {
      label: '展示的时间格式',
      tip: '展示的时间格式'
    },
    propType: 'string',
    setter: 'StringSetter'
  }, {
    name: 'getPopupContainer',
    title: {
      label: '定义浮层的容器',
      tip: '定义浮层的容器，默认为 body 上新建 div'
    },
    propType: 'func'
  }, {
    name: 'hideDisabledOptions',
    title: {
      label: '隐藏禁止选择的选项',
      tip: '隐藏禁止选择的选项'
    },
    propType: 'bool',
    defaultValue: false,
    setter: 'BoolSetter'
  }, {
    name: 'hourStep',
    title: {
      label: '小时选项间隔',
      tip: '小时选项间隔'
    },
    propType: 'number',
    setter: 'NumberSetter'
  }, {
    name: 'inputReadOnly',
    title: {
      label: '只读',
      tip: '设置输入框为只读（避免在移动设备上打开虚拟键盘）'
    },
    propType: 'bool',
    defaultValue: false,
    setter: 'BoolSetter'
  }, {
    name: 'minuteStep',
    title: {
      label: '分钟选项间隔',
      tip: '分钟选项间隔'
    },
    propType: 'number',
    setter: 'NumberSetter'
  }, {
    name: 'placeholder',
    title: {
      label: '空值提示',
      tip: '没有值的时候显示的内容'
    },
    propType: {
      type: 'oneOfType',
      value: ['string', {
        type: 'arrayOf',
        value: 'string'
      }]
    }
  }, {
    name: 'popupClassName',
    title: {
      label: '弹出层类名',
      tip: '弹出层类名'
    },
    propType: 'string',
    setter: 'StringSetter'
  }, {
    name: 'secondStep',
    title: {
      label: '秒选项间隔',
      tip: '秒选项间隔'
    },
    propType: 'number',
    setter: 'NumberSetter'
  }, {
    name: 'use12Hours',
    title: {
      label: '12小时制',
      tip: '使用 12 小时制，为 true 时 `format` 默认为 `h:mm:ss a`'
    },
    propType: 'bool',
    defaultValue: false,
    setter: 'BoolSetter'
  }, {
    name: 'showNow',
    title: {
      label: '展示此刻',
      tip: '面板是否显示“此刻”按钮'
    },
    propType: 'bool',
    setter: 'BoolSetter'
  }],
  configure: {
    supports: {
      style: true
    },
    events: [{
      name: 'onChange',
      template: "onChange (time,timeString,${extParams}){\n// 时间发生变化的回调\nconsole.log('onChange ',time,timeString);}"
    }, {
      name: 'onOpenChange',
      template: "onOpenChange(open,${extParams}){\n// 面板打开/关闭时的回调\nconsole.log('onOpenChange',open);}"
    }]
  },
  snippets: [{
    title: "时间选择框",
    screenshot: "https://alifd.alicdn.com/fusion-cool/icons/icon-antd/time-picker-1.png",
    schema: {
      componentName: "ATimePicker",
      props: {
        showNow: true
      }
    }
  }]
});
;// CONCATENATED MODULE: ./src/lowcode/timeline/meta.ts


/* harmony default export */ var timeline_meta = ({
  group: 'Antd',
  componentName: 'ATimeline',
  title: '时间轴',
  category: '数据展示',
  npm: {
    destructuring: true,
    componentName: 'ATimeline'
  },
  props: [{
    name: 'steps',
    title: '步骤配置',
    setter: {
      componentName: 'ArraySetter',
      props: {
        itemSetter: {
          componentName: 'ObjectSetter',
          props: {
            config: {
              items: [{
                name: 'key',
                title: 'key',
                setter: 'StringSetter',
                initialValue: val => val || uuid()
              }, {
                name: 'color',
                title: '圆圈颜色',
                setter: 'StringSetter'
              }, {
                name: 'dot',
                title: '自定义时间轴点',
                setter: 'node'
              }, {
                name: 'label',
                title: '设置标签',
                setter: 'StringSetter'
              }, {
                name: 'position',
                title: {
                  label: '自定义节点位置',
                  tip: '自定义节点位置'
                },
                propType: {
                  type: 'oneOf',
                  value: ['left', 'right']
                },
                setter: [{
                  componentName: 'RadioGroupSetter',
                  props: {
                    options: [{
                      title: 'left',
                      value: 'left'
                    }, {
                      title: 'right',
                      value: 'right'
                    }]
                  }
                }, 'VariableSetter']
              }]
            }
          },
          initialValue: () => {
            return {
              key: `timeLine${uuid()}`,
              label: '时间轴'
            };
          }
        }
      }
    },
    extraProps: {
      getValue(target, fieldValue) {
        const map = target.node.children.map(child => {
          const key = child.getPropValue('key') ? String(child.getPropValue('key')) : child.id;
          const result = {
            key
          };
          ['color', 'dot', 'label', 'position'].forEach(propKey => {
            // @ts-ignore
            result[propKey] = child.getPropValue(propKey);
          });
          return result;
        });
        return map.length === 0 ? fieldValue : map;
      },
      setValue(target, value) {
        const {
          node
        } = target;
        const map = {};
        if (!Array.isArray(value)) {
          value = [];
        }
        value.forEach(item => {
          const tabItem = Object.assign({}, item);
          // @ts-ignore
          map[item.key] = tabItem;
        });
        node.children.mergeChildren(child => {
          const key = String(child.getPropValue('key'));
          if (Object.hasOwnProperty.call(map, key)) {
            ['color', 'dot', 'label', 'position'].forEach(propKey => {
              // @ts-ignore
              child.setPropValue(propKey, map[key][propKey]);
            });
            // @ts-ignore
            delete map[key];
            return false;
          }
          return true;
        }, () => {
          const items = [];
          for (const key in map) {
            if (Object.hasOwnProperty.call(map, key)) {
              items.push({
                componentName: 'Timeline.Item',
                // @ts-ignore
                props: map[key]
              });
            }
          }
          return items;
        }, (child1, child2) => {
          const a = value.findIndex(item => String(item.key) === String(child1.getPropValue('key')));
          const b = value.findIndex(item => String(item.key) === String(child2.getPropValue('key')));
          return a - b;
        });
      }
    }
  }, {
    name: 'mode',
    title: {
      label: '模式',
      tip: '通过设置 `mode` 可以改变时间轴和内容的相对位置'
    },
    propType: {
      type: 'oneOf',
      value: ['left', 'alternate', 'right']
    }
  }, {
    name: 'pending',
    title: {
      label: '存在最后节点',
      tip: '指定最后一个幽灵节点是否存在'
    },
    propType: 'bool'
  }, {
    name: 'pendingDot',
    title: {
      label: '当最后一个幽灵节点存在時，指定其时间图点',
      tip: '当最后一个幽灵节点存在時，指定其时间图点'
    },
    propType: {
      type: 'oneOfType',
      value: ['string', 'node']
    }
  }, {
    name: 'reverse',
    title: {
      label: '节点排序',
      tip: '节点排序'
    },
    propType: 'bool',
    defaultValue: false
  }],
  configure: {
    supports: {
      style: true
    }
  },
  snippets: [{
    title: "时间轴",
    screenshot: "https://alifd.alicdn.com/fusion-cool/icons/icon-antd/timeline-1.jpg",
    schema: {
      componentName: "ATimeline",
      props: {
        steps: [{
          key: 'timeLinei5wd',
          label: '时间轴1'
        }, {
          key: 'timeLinei5wx',
          label: '时间轴2'
        }]
      }
    }
  }]
});
;// CONCATENATED MODULE: ./src/lowcode/tooltip/meta.ts
/* harmony default export */ var tooltip_meta = ({
  group: 'Antd',
  componentName: 'ATooltip',
  title: '文字提示',
  category: '数据展示',
  npm: {
    destructuring: true,
    componentName: 'ATooltip'
  },
  props: [{
    title: '内容',
    display: 'block',
    type: 'group',
    items: [{
      name: 'title',
      title: {
        label: '提示文字',
        tip: 'title | 提示文字'
      },
      propType: {
        type: 'oneOfType',
        value: ['string', 'node']
      },
      setter: ['StringSetter', 'SlotSetter', 'VariableSetter']
    }]
  }, {
    title: '控制',
    display: 'block',
    type: 'group',
    items: [{
      name: 'defaultVisible',
      title: {
        label: '默认显隐',
        tip: 'defaultVisible | 默认是否显隐'
      },
      propType: 'bool',
      setter: 'BoolSetter',
      defaultValue: false
    }, {
      name: 'visible',
      title: {
        label: '当前显隐',
        tip: 'visible | 当前是否显隐'
      },
      propType: 'bool',
      setter: 'BoolSetter'
    }]
  }, {
    title: '外观',
    display: 'block',
    type: 'group',
    items: [{
      name: 'placement',
      title: {
        label: '气泡位置',
        tip: 'placement | 气泡位置'
      },
      propType: {
        type: 'oneOf',
        value: ['top', 'left', 'right', 'bottom', 'topLeft', 'topRight', 'bottomLeft', 'bottomRight', 'leftTop', 'leftBottom', 'rightTop', 'rightBottom']
      },
      defaultValue: 'top',
      setter: {
        componentName: 'SelectSetter',
        props: {
          options: [{
            title: '上',
            value: 'top'
          }, {
            title: '左',
            value: 'left'
          }, {
            title: '右',
            value: 'right'
          }, {
            title: '下',
            value: 'bottom'
          }, {
            title: '上左',
            value: 'topLeft'
          }, {
            title: '上右',
            value: 'topRight'
          }, {
            title: '下左',
            value: 'bottomLeft'
          }, {
            title: '下右',
            value: 'bottomRight'
          }, {
            title: '左上',
            value: 'leftTop'
          }, {
            title: '左下',
            value: 'leftBottom'
          }, {
            title: '右上',
            value: 'rightTop'
          }, {
            title: '右下',
            value: 'rightBottom'
          }]
        }
      }
    }, {
      name: 'autoAdjustOverflow',
      title: {
        label: '自动调整',
        tip: 'autoAdjustOverflow | 气泡被遮挡时自动调整位置'
      },
      propType: 'bool',
      setter: 'BoolSetter',
      defaultValue: true
    }, {
      name: 'arrowPointAtCenter',
      title: {
        label: '指向中心',
        tip: 'arrowPointAtCenter | 箭头是否指向目标元素中心'
      },
      propType: 'bool',
      setter: 'BoolSetter',
      defaultValue: false
    }, {
      name: 'color',
      title: {
        label: '背景颜色',
        tip: 'color | 背景颜色'
      },
      propType: 'string',
      setter: 'ColorSetter'
    }, {
      name: 'zIndex',
      title: {
        label: 'zIndex',
        tip: 'zIndex | 设置 Tooltip 的 z-index值'
      },
      propType: 'number',
      setter: 'NumberSetter'
    }]
  }, {
    name: 'overlayStyle',
    title: '卡片样式',
    type: 'group',
    extraProps: {
      display: 'entry'
    },
    items: [{
      name: 'overlayStyle',
      title: {
        label: '样式设置',
        tip: 'overlayStyle | 卡片样式'
      },
      setter: 'StyleSetter',
      extraProps: {
        display: 'block'
      }
    }]
  }, {
    name: 'overlayInnerStyle',
    title: '卡片内容样式',
    type: 'group',
    extraProps: {
      display: 'entry'
    },
    items: [{
      name: 'overlayInnerStyle',
      title: {
        label: '样式设置',
        tip: 'overlayStyle | 卡片内容区域的样式'
      },
      setter: 'StyleSetter',
      extraProps: {
        display: 'block'
      }
    }]
  }, {
    title: '行为',
    display: 'block',
    type: 'group',
    items: [{
      name: 'trigger',
      title: {
        label: '触发行为',
        tip: 'trigger | 触发行为'
      },
      propType: {
        type: 'oneOf',
        value: ['hover', 'onFocus', 'click', 'contextMenu']
      },
      defaultValue: 'hover',
      setter: {
        componentName: 'SelectSetter',
        props: {
          options: [{
            title: '鼠标悬停',
            value: 'hover'
          }, {
            title: '获得焦点',
            value: 'onFocus'
          }, {
            title: '鼠标点击',
            value: 'click'
          }, {
            title: '右键菜单',
            value: 'contextMenu'
          }]
        }
      }
    }, {
      name: 'mouseEnterDelay',
      title: {
        label: '展示延时',
        tip: 'mouseEnterDelay | 鼠标移入后延时多少才显示 Tooltip，单位：秒'
      },
      propType: 'number',
      defaultValue: 0.1,
      setter: {
        componentName: 'NumberSetter',
        props: {
          step: 0.1
        }
      }
    }, {
      name: 'mouseLeaveDelay',
      title: {
        label: '隐藏延时',
        tip: 'mouseLeaveDelay | 鼠标移出后延时多少才隐藏 Tooltip，单位：秒'
      },
      propType: 'number',
      defaultValue: 0.1,
      setter: {
        componentName: 'NumberSetter',
        props: {
          step: 0.1
        }
      }
    }]
  }],
  configure: {
    component: {
      isContainer: true
    },
    supports: {
      style: true
    },
    events: [{
      name: 'onVisibleChange',
      template: "onVisibleChange(visible,${extParams}){\n// 显示隐藏的回调\nconsole.log('onVisibleChange',visible);}"
    }]
  },
  snippets: [{
    title: '文字提示',
    screenshot: 'https://alifd.alicdn.com/fusion-cool/icons/icon-antd/tooltip-1.jpg',
    schema: {
      componentName: 'ATooltip',
      props: {
        title: '提示内容'
      }
    }
  }]
});
;// CONCATENATED MODULE: ./src/lowcode/transfer/meta.ts

/* harmony default export */ var transfer_meta = ({
  group: 'Antd',
  componentName: 'ATransfer',
  title: '穿梭框',
  category: '数据展示',
  npm: {
    destructuring: true,
    componentName: 'ATransfer'
  },
  props: [{
    name: 'dataSource',
    title: {
      label: '数据源',
      tip: '数据源，其中的数据将会被渲染到左边一栏中，`targetKeys` 中指定的除外'
    },
    propType: {
      type: 'arrayOf',
      value: 'object'
    },
    setter: {
      componentName: 'ArraySetter',
      props: {
        itemSetter: {
          componentName: 'ObjectSetter',
          initialValue: () => {
            return {
              key: uuid()
            };
          },
          props: {
            config: {
              items: [{
                name: 'key',
                title: 'key',
                setter: 'StringSetter',
                initialValue: val => val || uuid()
              }, {
                name: 'title',
                title: 'title',
                setter: 'StringSetter',
                isRequired: true
              }, {
                name: 'description',
                title: '描述',
                setter: 'StringSetter'
              }, {
                name: 'disabled',
                title: '禁止穿梭',
                setter: ['BoolSetter', 'FunctionSetter']
              }]
            }
          }
        }
      }
    }
  }, {
    name: 'selectedKeys',
    title: {
      label: '选中项',
      tip: '设置哪些项应该被选中'
    },
    propType: {
      type: 'arrayOf',
      value: 'string'
    },
    setter: {
      componentName: 'ArraySetter',
      props: {
        itemSetter: 'StringSetter'
      }
    },
    supportVariable: true
  }, {
    name: 'targetKeys',
    title: {
      label: '右侧框数据',
      tip: '显示在右侧框数据的 key 集合'
    },
    propType: {
      type: 'arrayOf',
      value: 'string'
    },
    setter: {
      componentName: 'ArraySetter',
      props: {
        itemSetter: 'StringSetter'
      }
    },
    supportVariable: true
  }, {
    title: '常用设置',
    display: 'block',
    type: 'group',
    items: [{
      name: 'oneWay',
      title: {
        label: '展示为单向样式',
        tip: '展示为单向样式'
      },
      propType: 'bool',
      setter: 'BoolSetter',
      defaultValue: false
    }, {
      name: 'disabled',
      title: {
        label: '是否禁用',
        tip: '是否为禁用状态'
      },
      propType: 'bool',
      setter: 'BoolSetter',
      defaultValue: false
    }, {
      name: 'showSearch',
      title: {
        label: '是否显示搜索框',
        tip: '是否显示搜索框'
      },
      propType: 'bool',
      setter: 'BoolSetter',
      defaultValue: false
    }, {
      name: 'showSelectAll',
      title: {
        label: '是否展示全选勾选框',
        tip: '是否展示全选勾选框'
      },
      propType: 'bool',
      setter: 'BoolSetter',
      defaultValue: true
    }, {
      name: 'pagination',
      title: {
        label: '分页设置',
        tip: '使用分页样式，自定义渲染列表下无效'
      },
      setter: ['BoolSetter', {
        componentName: 'ObjectSetter',
        props: {
          config: {
            items: [{
              name: 'pageSize',
              title: '单页条数',
              setter: 'NumberSetter'
            }, {
              name: 'simple',
              title: '简单模式',
              setter: 'BoolSetter'
            }, {
              name: 'showSizeChanger',
              title: '展示条数切换器',
              setter: 'BoolSetter'
            }]
          }
        }
      }],
      propType: {
        type: 'oneOfType',
        value: ['bool', 'object']
      },
      defaultValue: false
    }, {
      name: 'render',
      title: {
        label: '每行数据渲染函数',
        tip: '每行数据渲染函数，该函数的入参为 dataSource 中的项，返回值为 element。或者返回一个普通对象，其中 label 字段为 element，value 字段为 title'
      },
      propType: 'func',
      setter: [{
        componentName: 'FunctionSetter',
        props: {
          template: 'renderItem(record,${extParams}){\n// 每行数据渲染函数\nreturn record.title;\n}'
        }
      }, 'VariableSetter']
    }, {
      name: 'filterOption',
      title: {
        label: '过滤选项',
        tip: '接收 `inputValue` `option` 两个参数，当 `option` 符合筛选条件时，应返回 true，反之则返回 false'
      },
      propType: 'func',
      setter: [{
        componentName: 'FunctionSetter',
        props: {
          template: 'filterOption(inputValue,option,${extParams}){\n// 接收 inputValue option 两个参数，当 option 符合筛选条件时，应返回 true，反之则返回 false\n\n}'
        }
      }, 'VariableSetter']
    }, {
      name: 'footer',
      title: {
        label: '底部',
        tip: 'footer | 底部'
      },
      propType: 'func',
      setter: [{
        componentName: 'FunctionSetter',
        props: {
          template: 'renderItem(item,${extParams}){\n// 自定义渲染列表项\nreturn `item`;\n}'
        }
      }, {
        componentName: 'SlotSetter',
        title: '渲染函数插槽',
        initialValue: {
          type: 'JSSlot',
          value: [],
          params: ['props', 'info']
        }
      }, 'VariableSetter']
    }, {
      name: 'operations',
      title: {
        label: '操作文案',
        tip: '操作文案集合，顺序从上至下'
      },
      propType: {
        type: 'arrayOf',
        value: 'string'
      }
    }, {
      name: 'titles',
      title: {
        label: '标题集合',
        tip: '标题集合，顺序从左至右'
      },
      propType: {
        type: 'arrayOf',
        value: 'node'
      }
    }, {
      name: 'selectAllLabels',
      title: {
        label: '多选框标题集合',
        tip: '自定义顶部多选框标题的集合'
      },
      propType: {
        type: 'arrayOf',
        value: {
          type: 'oneOfType',
          value: ['node', 'func']
        }
      }
    }]
  }],
  configure: {
    supports: {
      style: true
    },
    events: [{
      name: 'onChange',
      template: "onChange(targetKeys,direction,moveKeys,${extParams}){\n// 选项在两栏之间转移时的回调函数\nconsole.log('onChange',targetKeys,direction,moveKeys);}"
    }, {
      name: 'onScroll',
      template: "onScroll(direction,event,${extParams}){\n// 选项列表滚动时的回调函数\nconsole.log('onScroll',direction,event);}"
    }, {
      name: 'onSearch',
      template: "onSearch(direction,value,${extParams}){\n// 搜索框内容时改变时的回调函数\nconsole.log('onSearch',direction,value);}"
    }, {
      name: 'onSelectChange',
      template: "onSelectChange(sourceSelectedKeys,targetSelectedKeys,${extParams}){\n// 选中项发生改变时的回调函数\nconsole.log('onSelectChange',sourceSelectedKeys,targetSelectedKeys);}"
    }]
  },
  snippets: [{
    title: "穿梭框",
    screenshot: "https://alifd.alicdn.com/fusion-cool/icons/icon-antd/transfer-1.png",
    schema: {
      componentName: "ATransfer",
      props: {
        dataSource: [{
          key: uuid(),
          title: '测试数据1'
        }, {
          key: uuid(),
          title: 'lyllovelemon'
        }, {
          key: uuid(),
          title: 'lyltest'
        }, {
          key: uuid(),
          title: 'content 4'
        }, {
          key: uuid(),
          title: 'content 5'
        }],
        render: {
          type: "JSFunction",
          value: `function renderItem(record, extParams) {
              return record.title;
            }`
        }
      }
    }
  }]
});
;// CONCATENATED MODULE: ./src/lowcode/tree/meta.ts
/* eslint-disable */
// @ts-ignore
/* harmony default export */ var tree_meta = ({
  group: 'Antd',
  componentName: 'ATree',
  title: '树形控件',
  category: '数据展示',
  npm: {
    destructuring: true,
    componentName: 'ATree'
  },
  props: [{
    name: 'treeData',
    title: {
      label: '数据',
      tip: 'treeNodes 数据，如果设置则不需要手动构造 TreeNode 节点（key 在整个树范围内唯一）'
    },
    propType: {
      type: 'arrayOf',
      value: 'object'
    },
    setter: 'JsonSetter'
  }, {
    name: 'autoExpandParent',
    title: {
      label: '是否自动展开父节点',
      tip: '是否自动展开父节点'
    },
    propType: 'bool',
    defaultValue: true,
    setter: 'BoolSetter'
  }, {
    name: 'blockNode',
    title: {
      label: '是否节点占据一行',
      tip: '是否节点占据一行'
    },
    propType: 'bool',
    defaultValue: false,
    setter: 'BoolSetter'
  }, {
    name: 'checkable',
    title: {
      label: '节点前添加 Checkbox 复选框',
      tip: '节点前添加 Checkbox 复选框'
    },
    propType: 'bool',
    defaultValue: false,
    setter: 'BoolSetter'
  }, {
    name: 'checkedKeys',
    title: {
      label: '复选框节点',
      tip: '（受控）选中复选框的树节点（注意：父子节点有关联，如果传入父节点 key，则子节点自动选中；相应当子节点 key 都传入，父节点也自动选中。当设置`checkable`和`checkStrictly`，它是一个有`checked`和`halfChecked`属性的对象，并且父子节点的选中与否不再关联'
    },
    propType: {
      type: 'oneOfType',
      value: [{
        value: 'arrayOf',
        type: 'string'
      }, 'object']
    }
  }, {
    name: 'checkStrictly',
    title: {
      label: '完全受控',
      tip: 'checkable 状态下节点选择完全受控（父子节点选中状态不再关联）'
    },
    propType: 'bool',
    defaultValue: false,
    setter: 'BoolSetter'
  }, {
    name: 'defaultCheckedKeys',
    title: {
      label: '默认选中值',
      tip: '默认选中值'
    },
    propType: {
      type: 'arrayOf',
      value: 'string'
    },
    setter: {
      componentName: 'ArraySetter',
      props: {
        itemSetter: {
          componentName: 'StringSetter'
        }
      }
    }
  }, {
    name: 'defaultExpandAll',
    title: {
      label: '默认展开所有树节点',
      tip: '默认展开所有树节点'
    },
    propType: 'bool',
    defaultValue: false,
    setter: 'BoolSetter'
  }, {
    name: 'defaultExpandedKeys',
    title: {
      label: '默认展开指定的树节点',
      tip: '默认展开指定的树节点'
    },
    propType: {
      type: 'arrayOf',
      value: 'string'
    },
    setter: {
      componentName: 'ArraySetter',
      props: {
        itemSetter: {
          componentName: 'StringSetter'
        }
      }
    }
  }, {
    name: 'defaultExpandParent',
    title: {
      label: '默认展开父节点',
      tip: '默认展开父节点'
    },
    propType: 'bool',
    defaultValue: true,
    setter: 'BoolSetter'
  }, {
    name: 'defaultSelectedKeys',
    title: {
      label: '默认选中值',
      tip: '默认选中值'
    },
    propType: {
      type: 'arrayOf',
      value: 'string'
    },
    setter: {
      componentName: 'ArraySetter',
      props: {
        itemSetter: {
          componentName: 'StringSetter'
        }
      }
    }
  }, {
    name: 'disabled',
    title: {
      label: '是否禁用',
      tip: '是否为禁用状态'
    },
    propType: 'bool',
    defaultValue: false,
    setter: 'BoolSetter'
  }, {
    name: 'draggable',
    title: {
      label: '节点可拖拽',
      tip: '设置节点可拖拽（IE>8）'
    },
    propType: 'bool',
    defaultValue: false,
    setter: 'BoolSetter'
  }, {
    name: 'expandedKeys',
    title: {
      label: '展开指定节点',
      tip: '（受控）展开指定的树节点'
    },
    propType: {
      type: 'arrayOf',
      value: 'string'
    },
    setter: {
      componentName: 'ArraySetter',
      props: {
        itemSetter: {
          componentName: 'StringSetter'
        }
      }
    }
  }, {
    name: 'filterTreeNode',
    title: {
      label: '筛选树节点',
      tip: '按需筛选树节点（高亮），返回 true'
    },
    propType: 'func'
  }, {
    name: 'loadData',
    title: {
      label: '异步加载数据',
      tip: '异步加载数据'
    },
    propType: 'func'
  }, {
    name: 'loadedKeys',
    title: {
      label: '已经加载节点',
      tip: '（受控）已经加载的节点，需要配合 `loadData` 使用'
    },
    propType: {
      type: 'arrayOf',
      value: 'string'
    },
    setter: {
      componentName: 'ArraySetter',
      props: {
        itemSetter: {
          componentName: 'StringSetter'
        }
      }
    }
  }, {
    name: 'multiple',
    title: {
      label: '支持多选',
      tip: '支持点选多个节点（节点本身）'
    },
    propType: 'bool',
    defaultValue: false,
    setter: 'BoolSetter'
  }, {
    name: 'selectable',
    title: {
      label: '是否可选中',
      tip: '是否可选中'
    },
    propType: 'bool',
    defaultValue: true,
    setter: 'BoolSetter'
  }, {
    name: 'selectedKeys',
    title: {
      label: '选中的树节点',
      tip: '（受控）设置选中的树节点'
    },
    propType: {
      type: 'arrayOf',
      value: 'string'
    },
    setter: {
      componentName: 'ArraySetter',
      props: {
        itemSetter: {
          componentName: 'StringSetter'
        }
      }
    }
  }, {
    name: 'showIcon',
    title: {
      label: '展示图标',
      tip: '是否展示 TreeNode title 前的图标，没有默认样式，如设置为 true，需要自行定义图标相关样式'
    },
    propType: 'bool',
    defaultValue: false,
    setter: 'BoolSetter'
  },
  // {
  //   name: 'switcherIcon',
  //   title: {
  //     label: '自定义树节点的展开/折叠图标',
  //     tip: '自定义树节点的展开/折叠图标',
  //   },
  //   propType: 'node',
  // },
  {
    name: 'showLine',
    title: {
      label: '是否展示连接线',
      tip: '是否展示连接线'
    },
    propType: {
      type: 'oneOfType',
      value: ['bool', 'object']
    }
  }, {
    name: 'virtual',
    title: {
      label: '虚拟滚动',
      tip: '设置 false 时关闭虚拟滚动'
    },
    propType: 'bool',
    defaultValue: true,
    setter: 'BoolSetter'
  }, {
    name: 'onCheck',
    title: {
      label: '点击复选框触发',
      tip: '点击复选框触发'
    },
    propType: 'func'
  }, {
    name: 'onDragEnd',
    title: {
      label: 'dragend 触发时调用',
      tip: 'dragend 触发时调用'
    },
    propType: 'func'
  }, {
    name: 'onDragEnter',
    title: {
      label: 'dragenter 触发时调用',
      tip: 'dragenter 触发时调用'
    },
    propType: 'func'
  }, {
    name: 'onDragLeave',
    title: {
      label: 'dragleave 触发时调用',
      tip: 'dragleave 触发时调用'
    },
    propType: 'func'
  }, {
    name: 'onDragOver',
    title: {
      label: 'dragover 触发时调用',
      tip: 'dragover 触发时调用'
    },
    propType: 'func'
  }, {
    name: 'onDragStart',
    title: {
      label: '开始拖拽时调用',
      tip: '开始拖拽时调用'
    },
    propType: 'func'
  }, {
    name: 'onDrop',
    title: {
      label: 'drop 触发时调用',
      tip: 'drop 触发时调用'
    },
    propType: 'func'
  }, {
    name: 'onExpand',
    title: {
      label: '展开/收起节点时触发',
      tip: '展开/收起节点时触发'
    },
    propType: 'func'
  }, {
    name: 'onLoad',
    title: {
      label: '节点加载完毕时触发',
      tip: '节点加载完毕时触发'
    },
    propType: 'func'
  }, {
    name: 'onRightClick',
    title: {
      label: '响应右键点击',
      tip: '响应右键点击'
    },
    propType: 'func'
  }, {
    name: 'onSelect',
    title: {
      label: '点击树节点触发',
      tip: '点击树节点触发'
    },
    propType: 'func'
  }, {
    name: 'icon',
    title: {
      label: '自定义树节点图标',
      tip: '自定义树节点图标'
    },
    propType: {
      type: 'oneOfType',
      value: ['node', 'func']
    }
  }],
  configure: {
    supports: {
      style: true,
      events: [{
        name: 'onCheck',
        template: "onCheck(checkedKeys,event,${extParams}){\n// 点击复选框触发\nconsole.log('onCheck',checkedKeys,event);}"
      }, {
        name: 'onDragEnd',
        template: "onDragEnd({event,node},${extParams}){\n// dragend 触发时调用\nconsole.log('onDragEnd',event,node);}"
      }, {
        name: 'onDragEnter',
        template: "onDragEnter({event,node,expandedKeys},${extParams}){\n// dragenter 触发时调用\nconsole.log('onDragEnter',event,node,expandedKeys);}"
      }, {
        name: 'onDragLeave',
        template: "onDragLeave({event,node},${extParams}){\n// dragleave 触发时调用\nconsole.log('onDragLeave',event,node);}"
      }, {
        name: 'onDragOver',
        template: "onDragOver({event,node},${extParams}){\n// dragover 触发时调用\nconsole.log('onDragOver',event,node);}"
      }, {
        name: 'onDragStart',
        template: "onDragStart({event,node},${extParams}){\n// 开始拖拽时调用\nconsole.log('onDragStart',event,node);}"
      }, {
        name: 'onDrop',
        template: "onDrop({event,node,dragNode,dragNodesKeys},${extParams}){\n// drop 触发时调用\nconsole.log('onDrop',event,node,dragNode,dragNodesKeys);}"
      }, {
        name: 'onExpand',
        template: "onExpand(expandedKeys,{expanded,node},${extParams}){\n// 展开/收起节点时触发\nconsole.log('onExpand',expandedKeys,expanded,node);}"
      }, {
        name: 'onLoad',
        template: "onLoad(loadedKeys,{event,node},${extParams}){\n// 节点加载完毕时触发\nconsole.log('onLoad',loadedKeys,event,node);}"
      }, {
        name: 'onRightClick',
        template: "onRightClick({event,node},${extParams}){\n// 响应右键点击\nconsole.log('onRightClick',event,node);}"
      }, {
        name: 'onSelect',
        template: "onSelect(selectedKeys,event,${extParams}){\n// 点击树节点触发\nconsole.log('onSelect',selectedKeys,event);}"
      }]
    }
  },
  snippets: [{
    title: '树形控件',
    screenshot: 'https://alifd.alicdn.com/fusion-cool/icons/icon-antd/tree-1.jpg',
    schema: {
      componentName: 'ATree',
      props: {
        treeData: [{
          title: 'parent 0',
          key: '0-0',
          children: [{
            title: 'leaf 0-0',
            key: '0-0-0',
            isLeaf: true
          }, {
            title: 'leaf 0-1',
            key: '0-0-1',
            isLeaf: true
          }]
        }, {
          title: 'parent 1',
          key: '0-1',
          children: [{
            title: 'leaf 1-0',
            key: '0-1-0',
            isLeaf: true
          }, {
            title: 'leaf 1-1',
            key: '0-1-1',
            isLeaf: true
          }]
        }],
        defaultExpandAll: true
      }
    }
  }]
});
;// CONCATENATED MODULE: ./src/lowcode/tree-select/meta.ts
/* harmony default export */ var tree_select_meta = ({
  group: "Antd",
  componentName: "ATreeSelect",
  title: "树型选择控件",
  category: '数据展示',
  npm: {
    destructuring: true,
    componentName: 'ATreeSelect'
  },
  props: [{
    name: 'treeData',
    title: {
      label: '数据源',
      tip: '数据源'
    },
    setter: 'JsonSetter'
  }, {
    name: 'defaultValue',
    title: {
      label: '默认值',
      tip: '默认选中值'
    },
    propType: {
      type: 'oneOfType',
      value: ['string', {
        type: 'arrayOf',
        value: 'string'
      }]
    }
  }, {
    name: 'value',
    title: {
      label: '当前值',
      tip: '当前值'
    },
    propType: {
      type: 'oneOfType',
      value: ['string', {
        type: 'arrayOf',
        value: 'string'
      }]
    }
  }, {
    name: 'allowClear',
    title: {
      label: '支持清除',
      tip: '是否允许清除'
    },
    propType: 'bool',
    defaultValue: false,
    setter: 'BoolSetter'
  }, {
    name: 'autoClearSearchValue',
    title: {
      label: '自动清空搜索',
      tip: '当多选模式下值被选择，自动清空搜索框'
    },
    propType: 'bool',
    defaultValue: true,
    setter: 'BoolSetter'
  }, {
    name: 'bordered',
    title: {
      label: '显示边框',
      tip: '是否显示边框'
    },
    propType: 'bool',
    defaultValue: true,
    setter: 'BoolSetter'
  }, {
    name: 'disabled',
    title: {
      label: '是否禁用',
      tip: '是否为禁用状态'
    },
    propType: 'bool',
    defaultValue: false,
    setter: 'BoolSetter'
  }, {
    name: 'dropdownMatchSelectWidth',
    title: {
      label: '下拉列表同款',
      tip: '下拉菜单和选择器同宽'
    },
    propType: 'bool',
    setter: 'BoolSetter'
  }, {
    name: 'filterTreeNode',
    title: {
      label: '筛选节点',
      tip: '是否根据输入项进行筛选，默认用 treeNodeFilterProp 的值作为要筛选的 TreeNode 的属性值'
    },
    propType: {
      type: 'oneOfType',
      value: ['bool', 'func']
    }
  }, {
    name: 'labelInValue',
    title: {
      label: '值包含标签',
      tip: '是否把每个选项的 label 包装到 value 中，会把 value 类型从 `string` 变为 {value: string, label: ReactNode, halfChecked(treeCheckStrictly 时有效): string[] } 的格式'
    },
    propType: 'bool',
    defaultValue: true,
    setter: 'BoolSetter'
  }, {
    name: 'listHeight',
    title: {
      label: '设置弹窗滚动高度',
      tip: '设置弹窗滚动高度'
    },
    propType: 'number',
    setter: 'NumberSetter'
  }, {
    name: 'loadData',
    title: {
      label: '异步加载数据',
      tip: '异步加载数据'
    },
    propType: 'func'
  }, {
    name: 'maxTagCount',
    title: {
      label: '最多显示多少个 tag',
      tip: '最多显示多少个 tag'
    },
    propType: 'number',
    setter: 'NumberSetter'
  }, {
    name: 'maxTagPlaceholder',
    title: {
      label: '隐藏 tag 时显示的内容',
      tip: '隐藏 tag 时显示的内容'
    },
    propType: {
      type: 'oneOfType',
      value: ['node', 'func']
    }
  }, {
    name: 'multiple',
    title: {
      label: '支持多选',
      tip: '支持多选（当设置 treeCheckable 时自动变为 true）'
    },
    propType: 'bool',
    defaultValue: false,
    setter: 'BoolSetter'
  }, {
    name: 'placeholder',
    title: {
      label: '选择框默认文字',
      tip: '选择框默认文字'
    },
    propType: 'string',
    setter: 'StringSetter'
  }, {
    name: 'showCheckedStrategy',
    title: {
      label: '定义选中项回填的方式',
      tip: '定义选中项回填的方式。`SHOW_ALL`: 显示所有选中节点(包括父节点)。`SHOW_PARENT`: 只显示父节点(当父节点下所有子节点都选中时)。 默认只显示子节点'
    },
    propType: {
      type: 'oneOf',
      value: ['SHOW_ALL', 'SHOW_PARENT', 'SHOW_CHILD']
    }
  }, {
    name: 'showSearch',
    title: {
      label: '是否支持搜索框',
      tip: '是否支持搜索框'
    },
    propType: 'bool',
    setter: 'BoolSetter'
  }, {
    name: 'size',
    title: {
      label: '尺寸',
      tip: '选择框大小'
    },
    propType: {
      type: 'oneOf',
      value: ['large', 'middle', 'small']
    },
    setter: {
      componentName: 'SelectSetter',
      props: {
        options: [{
          title: '大',
          value: 'large'
        }, {
          title: '中',
          value: 'middle'
        }, {
          title: '小',
          value: 'small'
        }]
      }
    },
    defaultValue: 'middle'
  }, {
    name: 'showArrow',
    title: {
      label: '下拉图标',
      tip: '是否显示下拉图标，单选模式下默认 `true`'
    },
    propType: 'bool',
    setter: 'BoolSetter'
  }, {
    name: 'treeCheckable',
    title: {
      label: '显示勾选框',
      tip: '显示勾选框'
    },
    propType: 'bool',
    defaultValue: false,
    setter: 'BoolSetter'
  }, {
    name: 'treeDefaultExpandAll',
    title: {
      label: '默认展开所有树节点',
      tip: '默认展开所有树节点'
    },
    propType: 'bool',
    defaultValue: false,
    setter: 'BoolSetter'
  }, {
    name: 'treeDefaultExpandedKeys',
    title: {
      label: '默认展开的树节点',
      tip: '默认展开的树节点'
    },
    propType: {
      type: 'arrayOf',
      value: 'string'
    },
    setter: {
      componentName: 'ArraySetter',
      props: {
        itemSetter: {
          componentName: 'StringSetter'
        }
      }
    }
  }, {
    name: 'treeExpandedKeys',
    title: {
      label: '设置展开的树节点',
      tip: '设置展开的树节点'
    },
    propType: {
      type: 'arrayOf',
      value: 'string'
    },
    setter: {
      componentName: 'ArraySetter',
      props: {
        itemSetter: {
          componentName: 'StringSetter'
        }
      }
    }
  }, {
    name: 'virtual',
    title: {
      label: '设置 false 时关闭虚拟滚动',
      tip: '设置 false 时关闭虚拟滚动'
    },
    propType: 'bool',
    defaultValue: true,
    setter: 'BoolSetter'
  }],
  configure: {
    supports: {
      style: true
    },
    events: [{
      name: 'onChange',
      template: "onChange(value,label,extra,${extParams}){\n// 选中树节点时调用此函数\nconsole.log('onChange',value,label,extra);}"
    }, {
      name: 'onSearch',
      template: "onSearch(value,${extParams}){\n// 文本框值变化时回调\nconsole.log('onSearch',value);}"
    }, {
      name: 'onSelect',
      template: "onSelect(value,node,extra,${extParams}){\n// 被选中时调用\nconsole.log('onSelect',value,node,extra);}"
    }, {
      name: 'onTreeExpand',
      template: "onTreeExpand(expandedKeys,${extParams}){\n// 展示节点时调用\nconsole.log('onTreeExpand',expandedKeys);}"
    }]
  },
  snippets: [{
    title: "树型选择控件",
    screenshot: "https://alifd.alicdn.com/fusion-cool/icons/icon-antd/tree-select-1.png",
    schema: {
      componentName: "ATreeSelect",
      props: {
        treeData: [{
          title: 'parent 0',
          value: '0-0',
          children: [{
            title: 'leaf 0-0',
            value: '0-0-0',
            isLeaf: true
          }, {
            title: 'leaf 0-1',
            value: '0-0-1',
            isLeaf: true
          }]
        }, {
          title: 'parent 1',
          value: '0-1',
          children: [{
            title: 'leaf 1-0',
            value: '0-1-0',
            isLeaf: true
          }, {
            title: 'leaf 1-1',
            value: '0-1-1',
            isLeaf: true
          }]
        }],
        treeDefaultExpandAll: true,
        placeholder: '请选择',
        style: {
          width: '300px'
        }
      }
    }
  }]
});
;// CONCATENATED MODULE: ./src/lowcode/typography-link/meta.ts
/* harmony default export */ var typography_link_meta = ({
  group: 'Antd',
  componentName: 'ATypographyLink',
  title: '链接',
  category: '基础组件',
  npm: {
    destructuring: true,
    componentName: 'ATypographyLink'
  },
  props: [{
    name: 'children',
    title: {
      label: '内容',
      tip: '内容'
    },
    propType: 'string',
    defaultValue: '',
    supportVariable: true
  }, {
    name: 'href',
    title: {
      label: '跳转链接',
      tip: '跳转链接'
    },
    propType: 'string',
    defaultValue: ''
  }, {
    name: 'target',
    title: {
      label: '跳转位置',
      tip: '在何处显示链接的资源'
    },
    propType: {
      type: 'oneOf',
      value: ['_self', '_blank', '_parent', '_top']
    },
    defaultValue: '_self'
  }],
  configure: {
    supports: {
      style: true
    }
  },
  snippets: [{
    title: "链接",
    screenshot: "https://alifd.alicdn.com/fusion-cool/icons/icon-antd/typography-link-1.png",
    schema: {
      componentName: "ATypographyLink",
      props: {
        href: "https://www.antdv.com/components/typography-cn#API",
        target: "_blank",
        children: "链接"
      }
    }
  }]
});
;// CONCATENATED MODULE: ./src/lowcode/typography-paragraph/meta.ts
/* harmony default export */ var typography_paragraph_meta = ({
  group: 'Antd',
  componentName: 'ATypographyParagraph',
  title: '段落',
  category: '基础组件',
  npm: {
    destructuring: true,
    componentName: 'ATypographyParagraph'
  },
  props: [{
    name: 'children',
    title: {
      label: '内容',
      tip: '内容'
    },
    propType: 'string',
    defaultValue: '',
    supportVariable: true
  }, {
    name: 'code',
    title: {
      label: '添加代码样式',
      tip: '添加代码样式'
    },
    propType: 'bool',
    defaultValue: false
  }, {
    name: 'copyable',
    title: {
      label: '是否可拷贝',
      tip: '是否可拷贝，为对象时可进行各种自定义'
    },
    propType: 'bool',
    defaultValue: false
  }, {
    name: 'delete',
    title: {
      label: '添加删除线样式',
      tip: '添加删除线样式'
    },
    propType: 'bool',
    defaultValue: false
  }, {
    name: 'disabled',
    title: {
      label: '是否禁用',
      tip: '是否为禁用状态'
    },
    propType: 'bool',
    defaultValue: false
  }, {
    name: 'editable',
    title: {
      label: '是否可编辑',
      tip: '是否可编辑'
    },
    propType: 'bool',
    defaultValue: false
  }, {
    name: 'ellipsis',
    title: {
      label: '自动溢出省略',
      tip: '自动溢出省略'
    },
    propType: 'bool',
    defaultValue: false
  }, {
    name: 'mark',
    title: {
      label: '添加标记样式',
      tip: '添加标记样式'
    },
    propType: 'bool',
    defaultValue: false
  }, {
    name: 'underline',
    title: {
      label: '添加下划线样式',
      tip: '添加下划线样式'
    },
    propType: 'bool',
    defaultValue: false
  }, {
    name: 'onChange ',
    title: {
      label: '当用户提交编辑内容时触发',
      tip: '当用户提交编辑内容时触发'
    },
    propType: 'func'
  }, {
    name: 'strong',
    title: {
      label: '是否加粗',
      tip: '是否加粗'
    },
    propType: 'bool',
    defaultValue: false
  }, {
    name: 'type',
    title: {
      label: '文本类型',
      tip: '文本类型'
    },
    propType: {
      type: 'oneOf',
      value: ['default', 'secondary', 'success', 'warning', 'danger']
    },
    setter: {
      componentName: 'SelectSetter',
      props: {
        options: [{
          title: '默认',
          value: 'default'
        }, {
          title: '弱提示',
          value: 'secondary'
        }, {
          title: '成功',
          value: 'success'
        }, {
          title: '警告',
          value: 'warning'
        }, {
          title: '错误',
          value: 'danger'
        }]
      }
    }
  }],
  configure: {
    supports: {
      style: true
    }
  },
  snippets: [{
    title: '段落',
    screenshot: 'https://alifd.alicdn.com/fusion-cool/icons/icon-antd/typography-paragraph-1.png',
    schema: {
      componentName: 'ATypographyParagraph',
      props: {
        ellipsis: true,
        children: '华锐ATP的企业级产品是一个庞大且复杂的体系。这类产品不仅量级巨大且功能复杂，而且变动和并发频繁，常常需要设计与开发能够快速的做出响应。同时这类产品中有存在很多类似的页面以及组件，可以通过抽象得到一些稳定且高复用性的内容。'
      }
    }
  }]
});
;// CONCATENATED MODULE: ./src/lowcode/typography-text/meta.ts
/* harmony default export */ var typography_text_meta = ({
  group: 'Antd',
  componentName: 'ATypographyText',
  title: '文本',
  category: '基础组件',
  npm: {
    destructuring: true,
    componentName: 'ATypographyText'
  },
  props: [{
    name: 'children',
    title: {
      label: '内容',
      tip: '内容'
    },
    propType: 'string',
    defaultValue: '',
    supportVariable: true
  }, {
    name: 'code',
    title: {
      label: '添加代码样式',
      tip: '添加代码样式'
    },
    propType: 'bool',
    defaultValue: false
  }, {
    name: 'delete',
    title: {
      label: '添加删除线样式',
      tip: '添加删除线样式'
    },
    propType: 'bool',
    defaultValue: false
  }, {
    name: 'disabled',
    title: {
      label: '是否禁用',
      tip: '是否为禁用状态'
    },
    propType: 'bool',
    defaultValue: false
  }, {
    name: 'mark',
    title: {
      label: '添加标记样式',
      tip: '添加标记样式'
    },
    propType: 'bool',
    defaultValue: false
  }, {
    name: 'keyboard',
    title: {
      label: '添加键盘样式',
      tip: '添加键盘样式'
    },
    propType: 'bool',
    defaultValue: false
  }, {
    name: 'underline',
    title: {
      label: '添加下划线样式',
      tip: '添加下划线样式'
    },
    propType: 'bool',
    defaultValue: false
  }, {
    name: 'strong',
    title: {
      label: '是否加粗',
      tip: '是否加粗'
    },
    propType: 'bool',
    defaultValue: false
  }, {
    name: 'type',
    title: {
      label: '文本类型',
      tip: '文本类型'
    },
    propType: {
      type: 'oneOf',
      value: ['secondary', 'warning', 'danger']
    },
    setter: {
      componentName: 'SelectSetter',
      props: {
        options: [{
          title: '默认',
          value: 'default'
        }, {
          title: '弱提示',
          value: 'secondary'
        }, {
          title: '成功',
          value: 'success'
        }, {
          title: '警告',
          value: 'warning'
        }, {
          title: '错误',
          value: 'danger'
        }]
      }
    }
  }, {
    title: '高级',
    type: 'group',
    display: 'accordion',
    items: [{
      name: 'copyable',
      title: {
        label: '是否可拷贝',
        tip: '是否可拷贝'
      },
      propType: {
        type: 'oneOfType',
        value: ['bool', 'object']
      },
      setter: [{
        componentName: 'BoolSetter',
        isRequired: false,
        initialValue: false
      }, {
        componentName: 'JsonSetter',
        isRequired: false
      }]
    }, {
      name: 'editable',
      title: {
        label: '是否可编辑',
        tip: '是否可编辑'
      },
      propType: {
        type: 'oneOfType',
        value: ['bool', 'object']
      },
      setter: [{
        componentName: 'BoolSetter',
        isRequired: false,
        initialValue: false
      }, {
        componentName: 'JsonSetter',
        isRequired: false
      }]
    }, {
      name: 'ellipsis',
      title: {
        label: '自动溢出省略',
        tip: '设置自动溢出省略，需要设置元素宽度'
      },
      propType: {
        type: 'oneOfType',
        value: ['bool', 'object']
      },
      setter: [{
        componentName: 'BoolSetter',
        isRequired: false,
        initialValue: false
      }, {
        componentName: 'JsonSetter',
        isRequired: false
      }]
    }]
  }],
  configure: {
    supports: {
      style: true
    },
    events: [{
      name: 'copyable.onCopy',
      template: "onCopy(${extParams}){\n// 拷贝成功的回调函数\nconsole.log('onCopy');}"
    }, {
      name: 'editable.onStart',
      template: "onStart(${extParams}){\n// 进入编辑中状态时触发\nconsole.log('onStart');}"
    }, {
      name: 'editable.onChange',
      template: "onChange(event,${extParams}){\n// 文本域编辑时触发\nconsole.log('onChange', event);}"
    }, {
      name: 'editable.onEnd',
      template: "onEnd(${extParams}){\n// 按 ENTER 结束编辑状态时触发\nconsole.log('onEnd');}"
    }, {
      name: 'editable.onCancel',
      template: "onCancel(${extParams}){\n// 按 ESC 退出编辑状态时触发\nconsole.log('onCancel');}"
    }, {
      name: 'ellipsis.onEllipsis',
      template: "onEllipsis(ellipsis,${extParams}){\n// 触发省略时的回调\nconsole.log('onEllipsis', ellipsis);}"
    }, {
      name: 'ellipsis.onExpand',
      template: "onExpand(event,${extParams}){\n// 点击展开时的回调\nconsole.log('onExpand', event);}"
    }]
  },
  snippets: [{
    title: '文本',
    screenshot: 'https://alifd.alicdn.com/fusion-cool/icons/icon-antd/typography-text-1.png',
    schema: {
      componentName: 'ATypographyText',
      props: {
        children: 'text'
      }
    }
  }, {
    title: '可复制文本',
    screenshot: 'https://alifd.alicdn.com/fusion-cool/icons/icon-antd/typography-text-2.png',
    schema: {
      componentName: 'ATypographyText',
      props: {
        copyable: true,
        children: 'text'
      }
    }
  }, {
    title: '可编辑文本',
    screenshot: 'https://alifd.alicdn.com/fusion-cool/icons/icon-antd/typography-text-3.png',
    schema: {
      componentName: 'ATypographyText',
      props: {
        editable: true,
        children: 'text'
      }
    }
  }]
});
;// CONCATENATED MODULE: ./src/lowcode/typography-title/meta.ts
/* harmony default export */ var typography_title_meta = ({
  group: 'Antd',
  componentName: 'ATypographyLink',
  title: '链接',
  category: '基础组件',
  npm: {
    destructuring: true,
    componentName: 'ATypographyLink'
  },
  props: [{
    name: 'children',
    title: {
      label: '内容',
      tip: '内容'
    },
    propType: 'string',
    defaultValue: '',
    supportVariable: true
  }, {
    name: 'level',
    title: {
      label: '重要程度',
      tip: '重要程度(1-5)'
    },
    propType: 'number',
    defaultValue: 1
  }, {
    name: 'code',
    title: {
      label: '添加代码样式',
      tip: '添加代码样式'
    },
    propType: 'bool',
    defaultValue: false
  }, {
    name: 'copyable',
    title: {
      label: '是否可拷贝',
      tip: '是否可拷贝'
    },
    propType: 'bool',
    defaultValue: false
  }, {
    name: 'delete',
    title: {
      label: '添加删除线样式',
      tip: '添加删除线样式'
    },
    propType: 'bool',
    defaultValue: false
  }, {
    name: 'disabled',
    title: {
      label: '是否禁用',
      tip: '是否为禁用状态'
    },
    propType: 'bool',
    defaultValue: false
  }, {
    name: 'editable',
    title: {
      label: '是否可编辑',
      tip: '是否可编辑'
    },
    propType: 'bool',
    defaultValue: false
  }, {
    name: 'ellipsis',
    title: {
      label: '自动溢出省略',
      tip: '设置自动溢出省略，需要设置元素宽度'
    },
    propType: 'bool',
    defaultValue: false
  }, {
    name: 'mark',
    title: {
      label: '添加标记样式',
      tip: '添加标记样式'
    },
    propType: 'bool',
    defaultValue: false
  }, {
    name: 'keyboard',
    title: {
      label: '添加键盘样式',
      tip: '添加键盘样式'
    },
    propType: 'bool',
    defaultValue: false
  }, {
    name: 'underline',
    title: {
      label: '添加下划线样式',
      tip: '添加下划线样式'
    },
    propType: 'bool',
    defaultValue: false
  }, {
    name: 'strong',
    title: {
      label: '是否加粗',
      tip: '是否加粗'
    },
    propType: 'bool',
    defaultValue: false
  }, {
    name: 'type',
    title: {
      label: '文本类型',
      tip: '文本类型'
    },
    propType: {
      type: 'oneOf',
      value: ['secondary', 'warning', 'danger']
    },
    setter: {
      componentName: 'SelectSetter',
      props: {
        options: [{
          title: '默认',
          value: 'default'
        }, {
          title: '弱提示',
          value: 'secondary'
        }, {
          title: '成功',
          value: 'success'
        }, {
          title: '警告',
          value: 'warning'
        }, {
          title: '错误',
          value: 'danger'
        }]
      }
    }
  }],
  configure: {
    supports: {
      style: true
    }
  },
  snippets: [{
    title: '一级标题',
    screenshot: 'https://alifd.alicdn.com/fusion-cool/icons/icon-antd/typography-title-1.png',
    schema: {
      componentName: 'ATypographyTitle',
      props: {
        level: 1,
        children: '一级标题'
      }
    }
  }, {
    title: '二级标题',
    screenshot: 'https://alifd.alicdn.com/fusion-cool/icons/icon-antd/typography-title-2.png',
    schema: {
      componentName: 'ATypographyTitle',
      props: {
        level: 2,
        children: '二级标题'
      }
    }
  }, {
    title: '三级标题',
    screenshot: 'https://alifd.alicdn.com/fusion-cool/icons/icon-antd/typography-title-3.png',
    schema: {
      componentName: 'ATypographyTitle',
      props: {
        level: 3,
        children: '三级标题'
      }
    }
  }, {
    title: '四级标题',
    screenshot: 'https://alifd.alicdn.com/fusion-cool/icons/icon-antd/typography-title-4.png',
    schema: {
      componentName: 'ATypographyTitle',
      props: {
        level: 4,
        children: '四级标题'
      }
    }
  }]
});
;// CONCATENATED MODULE: ./src/lowcode/upload/meta.ts
/* harmony default export */ var upload_meta = ({
  group: 'Antd',
  componentName: 'AUpload',
  title: '上传',
  category: '表单',
  npm: {
    destructuring: true,
    componentName: 'AUpload'
  },
  props: [{
    title: '基本',
    display: 'block',
    type: 'group',
    items: [{
      name: 'defaultFileList',
      title: {
        label: '默认上传文件',
        tip: 'defaultFileList | 默认已经上传的文件列表'
      },
      propType: {
        type: 'arrayOf',
        value: 'object'
      },
      setter: {
        componentName: 'ArraySetter',
        props: {
          itemSetter: {
            componentName: 'ObjectSetter',
            props: {
              config: {
                items: [{
                  name: 'name',
                  title: '文件名',
                  setter: 'StringSetter'
                }, {
                  name: 'status',
                  title: '状态',
                  setter: {
                    componentName: 'SelectSetter',
                    props: {
                      options: ['error', 'success', 'done', 'uploading', 'removed'].map(v => ({
                        label: v,
                        value: v
                      }))
                    }
                  }
                }, {
                  name: 'url',
                  title: '下载地址',
                  setter: 'StringSetter'
                }, {
                  name: 'url',
                  title: '下载地址',
                  setter: 'StringSetter'
                }, {
                  name: 'response',
                  title: '错误信息',
                  setter: 'StringSetter'
                }]
              }
            }
          }
        }
      }
    }, {
      name: 'fileList',
      title: {
        label: '当前上传文件',
        tip: 'fileList | 当前上传的文件列表（受控）'
      },
      propType: {
        type: 'arrayOf',
        value: 'object'
      },
      setter: {
        componentName: 'ArraySetter',
        props: {
          itemSetter: {
            componentName: 'ObjectSetter',
            props: {
              config: {
                items: [{
                  name: 'name',
                  title: '文件名',
                  setter: 'StringSetter'
                }, {
                  name: 'status',
                  title: '状态',
                  setter: {
                    componentName: 'SelectSetter',
                    props: {
                      options: ['error', 'success', 'done', 'uploading', 'removed'].map(v => ({
                        label: v,
                        value: v
                      }))
                    }
                  }
                }, {
                  name: 'url',
                  title: '下载地址',
                  setter: 'StringSetter'
                }, {
                  name: 'url',
                  title: '下载地址',
                  setter: 'StringSetter'
                }, {
                  name: 'response',
                  title: '错误信息',
                  setter: 'StringSetter'
                }]
              }
            }
          }
        }
      }
    }, {
      name: 'multiple',
      title: {
        label: '支持多选文件',
        tip: 'multiple | 是否支持多选文件，`ie10+` 支持。开启后按住 ctrl 可选择多个文件'
      },
      propType: 'bool',
      defaultValue: false,
      setter: 'BoolSetter'
    }, {
      name: 'maxCount',
      title: {
        label: '上传数量限制',
        tip: 'maxCount | 限制上传数量。当为 1 时，始终用最新上传的文件代替当前文件'
      },
      propType: 'number',
      setter: 'NumberSetter'
    }, {
      name: 'accept',
      title: {
        label: '上传文件类型',
        tip: 'accept | 接受上传的文件类型, 例如 .doc,.docx,application/msword'
      },
      propType: 'string',
      setter: 'StringSetter'
    }, {
      name: 'directory',
      title: {
        label: '文件夹上传',
        tip: 'directory | 支持上传文件夹'
      },
      propType: 'bool',
      defaultValue: false,
      setter: 'BoolSetter'
    }, {
      name: 'disabled',
      title: {
        label: '是否禁用',
        tip: 'disabled | 是否为禁用状态'
      },
      propType: 'bool',
      defaultValue: false,
      setter: 'BoolSetter'
    }]
  }, {
    title: '高级',
    display: 'block',
    type: 'group',
    items: [{
      name: 'openFileDialogOnClick',
      title: {
        label: '打开文件对话框',
        tip: 'openFileDialogOnClick | 点击打开文件对话框'
      },
      propType: 'bool',
      defaultValue: true,
      setter: 'BoolSetter'
    }, {
      name: 'showUploadList',
      title: {
        label: '显示上传列表',
        tip: 'showUploadList | 是否显示上传的文件列表,'
      },
      propType: 'bool',
      defaultValue: true,
      setter: 'BoolSetter'
    }, {
      name: 'listType',
      title: {
        label: '上传列表样式',
        tip: 'listType | 上传列表的内建样式，支持三种基本样式 `text`, `picture` 和 `picture-card`'
      },
      propType: {
        type: 'oneOf',
        value: ['text', 'picture', 'picture-card']
      },
      defaultValue: 'text',
      setter: [{
        componentName: 'RadioGroupSetter',
        props: {
          options: [{
            title: '文本',
            value: 'text'
          }, {
            title: '图片',
            value: 'picture'
          }, {
            title: '图片卡片',
            value: 'picture-card'
          }]
        }
      }, 'VariableSetter']
    }, {
      name: 'iconRender',
      title: {
        label: '自定义图标',
        tip: 'iconRender | 自定义显示 icon'
      },
      propType: 'func',
      setter: {
        componentName: 'SlotSetter',
        title: '自定义图标插槽',
        initialValue: {
          type: 'JSSlot',
          params: ['file', 'listType'],
          value: []
        }
      }
    }, {
      name: 'itemRender',
      title: {
        label: '自定义列表项',
        tip: 'itemRender | 自定义上传列表项'
      },
      propType: 'func',
      setter: {
        componentName: 'SlotSetter',
        title: '自定义列表项插槽',
        initialValue: {
          type: 'JSSlot',
          params: ['originNode', 'file', 'fileList', 'actions'],
          value: []
        }
      }
    }, {
      name: 'progress',
      title: {
        label: '自定义进度条',
        tip: 'progress | 自定义进度条样式'
      },
      propType: 'object',
      setter: 'JsonSetter'
    }]
  }, {
    title: '上传参数',
    display: 'block',
    type: 'group',
    items: [{
      name: 'action',
      title: {
        label: '上传地址',
        tip: 'action | 上传的地址或方法'
      },
      propType: {
        type: 'oneOfType',
        value: ['string', 'func']
      },
      setter: ['StringSetter', 'FunctionSetter', 'VariableSetter']
    }, {
      name: 'name',
      title: {
        label: '文件参数名',
        tip: 'name | 发到后台的文件参数名'
      },
      propType: 'string',
      setter: 'StringSetter'
    }, {
      name: 'method',
      title: {
        label: '请求Method',
        tip: 'method | 上传请求的 http method'
      },
      propType: {
        type: 'oneOf',
        value: ['get', 'post', 'put', 'head', 'options', 'patch', 'delete']
      },
      defaultValue: 'post',
      setter: 'StringSetter'
    }, {
      name: 'headers',
      title: {
        label: '上传请求头',
        tip: 'headers | 设置上传的请求头部，IE10 以上有效'
      },
      propType: 'object',
      setter: 'JsonSetter'
    }, {
      name: 'withCredentials',
      title: {
        label: '携带Cookie',
        tip: 'withCredentials | 上传请求时是否携带 cookie'
      },
      propType: 'bool',
      defaultValue: false,
      setter: 'BoolSetter'
    }, {
      name: 'data',
      title: {
        label: '额外参数',
        tip: 'data | 上传所需额外参数或返回上传额外参数的方法'
      },
      propType: {
        type: 'oneOfType',
        value: ['object', 'func']
      },
      setter: ['JsonSetter', {
        componentName: 'FunctionSetter',
        props: {
          template: 'onData(file,${extParams}){\n// 上传所需额外参数\nreturn {};\n}'
        }
      }, 'VariableSetter']
    }]
  }, {
    title: '回调函数',
    display: 'block',
    type: 'group',
    items: [{
      name: 'beforeUpload',
      title: {
        label: '上传前回调',
        tip: 'beforeUpload | 上传文件之前的回调函数'
      },
      propType: 'func',
      setter: {
        componentName: 'FunctionSetter',
        props: {
          template: 'beforeUpload(file,fileList,${extParams}){\n// 上传文件之前的钩子\nreturn false;\n}'
        }
      }
    }, {
      name: 'customRequest',
      title: {
        label: '自定义上传',
        tip: 'customRequest | 通过覆盖默认的上传行为，可以自定义自己的上传实现'
      },
      propType: 'func',
      setter: 'FunctionSetter'
    }, {
      name: 'isImageUrl',
      title: {
        label: '是否为图片',
        tip: 'isImageUrl | 自定义缩略图是否使用 <img /> 标签进行显示'
      },
      propType: 'func',
      setter: {
        componentName: 'FunctionSetter',
        props: {
          template: 'isImageUrl(file,${extParams}){\n// 判断是否为图片\nreturn true;\n}'
        }
      }
    }, {
      name: 'previewFile',
      title: {
        label: '自定义文件预览',
        tip: 'previewFile | 自定义文件预览逻辑'
      },
      propType: 'func',
      setter: 'FunctionSetter'
    }]
  }],
  configure: {
    component: {
      isContainer: true
    },
    supports: {
      style: true
    },
    events: [{
      name: 'onChange',
      template: "onChange ({file,fileList,event},${extParams}){\n// 上传文件改变时的回调\nconsole.log('onChange ',file,fileList,event);}"
    }, {
      name: 'onPreview',
      template: "onPreview(file,${extParams}){\n// 点击文件链接或预览图标时的回调\nconsole.log('onPreview',file);}"
    }, {
      name: 'onRemove',
      template: "onRemove(file,${extParams}){\n// 点击移除文件时的回调\nconsole.log('onRemove',file);}"
    }, {
      name: 'onDownload',
      template: "onDownload(file,${extParams}){\n// 点击下载文件时的回调\nconsole.log('onDownload',file);}"
    }, {
      name: 'onDrop',
      template: "onDrop(event,${extParams}){\n// 当文件被拖入上传区域时执行的回调功能\nconsole.log('onDrop',event);}"
    }]
  },
  snippets: [{
    title: "上传",
    screenshot: "https://alifd.alicdn.com/fusion-cool/icons/icon-antd/upload-1.png",
    schema: {
      componentName: "AUpload",
      props: {},
      children: {
        componentName: "AButton",
        props: {
          children: "AUpload"
        }
      }
    }
  }]
});
;// CONCATENATED MODULE: ./node_modules/.lowcode-builder/meta-entry.js





















































































const npmInfo = {
  "package": "lowcode-material-ant-vue",
  "version": "0.0.9",
  "destructuring": true
};
const components = [meta, anchor_link_meta, affix_meta, auto_complete_meta, alert_meta, badge_meta, avatar_meta, button_meta, back_top_meta, breadcrumb_meta, calendar_meta, card_meta, carousel_meta, checkbox_meta, cascader_meta, checkbox_group_meta, collapse_meta, collapse_pane_meta, comment_meta, date_picker_meta, descriptions_meta, descriptions_item_meta, divider_meta, drawer_meta, dropdown_meta, empty_meta, form_meta, form_item_meta, form_list_meta, grid_col_meta, grid_row_meta, icon_meta, image_meta, input_meta, input_group_meta, input_number_meta, input_password_meta, input_search_meta, input_textarea_meta, list_meta, list_item_meta, list_item_meta_meta, mentions_meta, menu_meta, menu_item_meta, menu_item_group_meta, menu_subMenu_meta, modal_meta, page_header_meta, pagination_meta, popconfirm_meta, popover_meta, progress_meta, radio_meta, radio_group_meta, range_picker_meta, result_meta, rate_meta, select_meta, select_opt_group_meta, select_option_meta, sketelon_meta, slider_meta, slot_meta, space_meta, spin_meta, statistic_meta, steps_meta, steps_step_meta, switch_meta, tab_pane_meta, table_meta, tabs_meta, tag_meta, time_picker_meta, timeline_meta, tooltip_meta, transfer_meta, tree_meta, tree_select_meta, typography_link_meta, typography_paragraph_meta, typography_text_meta, typography_title_meta, upload_meta];
components.forEach(item => {
  if (!item.npm) {
    item.npm = {
      ...npmInfo,
      componentName: item.componentName
    };
  } else {
    item.npm = {
      ...npmInfo,
      ...item.npm
    };
  }
});

}();
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=meta.js.map