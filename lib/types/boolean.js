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

var BooleanType = function (_BaseType) {
    _inherits(BooleanType, _BaseType);

    function BooleanType(key, config) {
        _classCallCheck(this, BooleanType);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(BooleanType).call(this, key, config));

        _this.type = 'boolean';
        return _this;
    }

    _createClass(BooleanType, [{
        key: 'convert',
        value: function convert(value) {
            if (value === null) {
                return value;
            }
            if (value === '0') {
                return false;
            }
            if (value === 'true') {
                return true;
            }
            if (value === 'false') {
                return false;
            }
            return !!value;
        }
    }]);

    return BooleanType;
}(_base2.default);

exports.default = BooleanType;