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

var NumberType = function (_BaseType) {
    _inherits(NumberType, _BaseType);

    function NumberType(key, config) {
        _classCallCheck(this, NumberType);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(NumberType).call(this, key, config));

        _this.type = 'number';
        return _this;
    }

    _createClass(NumberType, [{
        key: 'convert',
        value: function convert(val) {
            if (!isNaN(val)) {
                if (val === null) {
                    return val;
                }
                if (val === '') {
                    return null;
                }
                if (typeof val === 'string' || typeof val === 'boolean') {
                    val = Number(val);
                }
                if (val instanceof Number) {
                    return val;
                }
                if (typeof val === 'number') {
                    return val;
                }
                if (val.toString && !Array.isArray(val) && val.toString() == Number(val)) {
                    return new Number(val);
                }
            }

            throw new Error('convert fail expected:' + this.type + ' actual value:' + val);
        }
    }]);

    return NumberType;
}(_base2.default);

exports.default = NumberType;