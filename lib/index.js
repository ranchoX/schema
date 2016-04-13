'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _base = require('./types/base');

var _base2 = _interopRequireDefault(_base);

var _string = require('./types/string');

var _string2 = _interopRequireDefault(_string);

var _number = require('./types/number');

var _number2 = _interopRequireDefault(_number);

var _array = require('./types/array');

var _array2 = _interopRequireDefault(_array);

var _object = require('./types/object');

var _object2 = _interopRequireDefault(_object);

var _boolean = require('./types/boolean');

var _boolean2 = _interopRequireDefault(_boolean);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ToString = Object.prototype.toString;
var CLASSTYPEREG = /^function\s(.*)\(\)/;
var TYPELINK = {
    "String": _string2.default,
    "Number": _number2.default,
    "Object": _object2.default,
    "Boolean": _boolean2.default,
    "Array": _array2.default
};

var ObjectSchemaType = function () {
    function ObjectSchemaType(key, config) {
        _classCallCheck(this, ObjectSchemaType);

        if (!config) {
            config = key;
            key = '_schema';
        }
        var innerObj = {};
        for (var k in config) {
            innerObj[k] = getType(k, config[k]);
        }
        this.innerObj = innerObj;
    }

    _createClass(ObjectSchemaType, [{
        key: 'cast',
        value: function cast(inputObj) {
            var resultObj = {};
            var err;
            for (var k in this.innerObj) {

                var val = this.innerObj[k].cast(inputObj[k]);
                if (val instanceof Error) {
                    err = val;
                    return err;
                }
                resultObj[k] = val;
            }
            return err || resultObj;
        }
    }]);

    return ObjectSchemaType;
}();

function getType(k, type) {
    var option = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    if (ToString.call(type) === "[object Object]") {
        if (type.type !== undefined) {
            option = type;
            type = option.type;
            delete option.type;
        } else {
            return new ObjectSchemaType(k, type);
        }
    }
    switch (ToString.call(type)) {
        case "[object Function]":
            var matchs = CLASSTYPEREG.exec(type.toString());
            if (matchs && matchs[1] && TYPELINK[matchs[1]]) {
                return new TYPELINK[matchs[1]](k, option);
            } else {
                throw new Error('Current Type:' + type + ' Evil');
            }
            break;
        case "[object String]":
            if (type) {
                option.defaultValue = type;
            }
            return new _string2.default(k, option);
            break;
        case "[object Array]":
            if (type.length) {
                option.inner = getType(k + '_array_item', type[0]);
            }
            return new _array2.default(k, option);
            break;
        case "[object RegExp]":
            option.reg = type;
            return new _string2.default(k, option);
            break;
        case "[object Object]":
            return new _object2.default(k, option);
            break;
        default:
            throw new Error('Current Type:' + type + ' Evil');
    }
}

function Schema(config) {
    var x = new ObjectSchemaType(config);
    return function (inputObj) {
        return x.cast(inputObj);
    };
}
exports.default = Schema;