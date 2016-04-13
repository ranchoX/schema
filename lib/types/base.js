'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var INVALIDVALIDATORS = ['require', 'defaultValue', 'type', 'inner'];

var BaseType = function () {
    function BaseType(key, config) {
        _classCallCheck(this, BaseType);

        this.isRequired = !!config.require;
        this.defaultValue = config.defaultValue;
        this.inner = config.inner;
        this.validators = [];
        for (var k in config) {
            if (INVALIDVALIDATORS.indexOf(k) == -1) {
                if (!this[k]) {
                    console.warn('validator ' + k + ' not found');
                    return;
                }
                this.validators.push(this[k](config[k]));
            }
        }
        this.key = key;
    }

    _createClass(BaseType, [{
        key: 'cast',
        value: function cast(actual) {
            try {
                this.required(actual);
                //defaultValue
                if (actual === undefined) {
                    return this.defaultValue;
                }
                var val = this.convert(actual);
                this.validators.forEach(function (item) {
                    item(val);
                });
                return val;
            } catch (e) {
                return e;
            }
        }
    }, {
        key: 'required',
        value: function required(actual) {
            if (this.isRequired && actual === undefined) {
                throw new Error(this.key + ' is required');
            }
        }
    }, {
        key: 'convert',
        value: function convert(val) {
            throw new Error('Not Implement Convert');
        }
    }]);

    return BaseType;
}();

exports.default = BaseType;