'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StringType = function (_BaseType) {
    _inherits(StringType, _BaseType);

    function StringType(key, config) {
        _classCallCheck(this, StringType);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(StringType).call(this, key, config));

        _this.type = 'string';
        return _this;
    }

    _createClass(StringType, [{
        key: 'convert',
        value: function convert(value) {
            if (value === null) {
                return value;
            }

            if (typeof value !== 'undefined') {

                // Re: gh-647 and gh-3030, we're ok with casting using `toString()`
                // **unless** its the default Object.toString, because "[object Object]"
                // doesn't really qualify as useful data
                if (value.toString && value.toString !== Object.prototype.toString) {
                    return value.toString();
                }
            }
            throw new Error('convert fail expected:' + this.type + ' actual value:' + value);
        }
    }, {
        key: 'reg',
        value: function reg(val) {
            var reg = new RegExp(val);
            return function (actual) {
                if (!reg.test(actual)) {
                    throw new Error('not match reg:' + val + ' actual value:' + actual);
                }
            };
        }
    }]);

    return StringType;
}(_base2.default);

exports.default = StringType;