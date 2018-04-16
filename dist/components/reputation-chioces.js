'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReputationChioces = function (_wepy$component) {
  _inherits(ReputationChioces, _wepy$component);

  function ReputationChioces() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ReputationChioces);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ReputationChioces.__proto__ || Object.getPrototypeOf(ReputationChioces)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
      reputationIndex: 'all',
      reputation: []
    }, _this.props = {
      showAll: {
        type: String,
        default: 'false'
      }
    }, _this.methods = {
      chooseIndex: function chooseIndex(index) {
        this.reputationIndex = index;
        this.$invoke('../reputation-content', 'getContent', index, this.showAll);
      },
      getlength: function getlength(data) {
        this.reputation = data;
        var length = data[0] > 0 ? data[0] : 0;
        this.$emit('getReputation', length);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return ReputationChioces;
}(_wepy2.default.component);

exports.default = ReputationChioces;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlcHV0YXRpb24tY2hpb2Nlcy5qcyJdLCJuYW1lcyI6WyJSZXB1dGF0aW9uQ2hpb2NlcyIsImRhdGEiLCJyZXB1dGF0aW9uSW5kZXgiLCJyZXB1dGF0aW9uIiwicHJvcHMiLCJzaG93QWxsIiwidHlwZSIsIlN0cmluZyIsImRlZmF1bHQiLCJtZXRob2RzIiwiY2hvb3NlSW5kZXgiLCJpbmRleCIsIiRpbnZva2UiLCJnZXRsZW5ndGgiLCJsZW5ndGgiLCIkZW1pdCIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFDcUJBLGlCOzs7Ozs7Ozs7Ozs7Ozs0TUFDbkJDLEksR0FBTztBQUNMQyx1QkFBaUIsS0FEWjtBQUVMQyxrQkFBWTtBQUZQLEssUUFJUEMsSyxHQUFRO0FBQ05DLGVBQVM7QUFDUEMsY0FBTUMsTUFEQztBQUVQQyxpQkFBUztBQUZGO0FBREgsSyxRQU1SQyxPLEdBQVU7QUFDUkMsaUJBRFEsdUJBQ0lDLEtBREosRUFDVztBQUNqQixhQUFLVCxlQUFMLEdBQXVCUyxLQUF2QjtBQUNBLGFBQUtDLE9BQUwsQ0FBYSx1QkFBYixFQUFzQyxZQUF0QyxFQUFvREQsS0FBcEQsRUFBMkQsS0FBS04sT0FBaEU7QUFDRCxPQUpPO0FBS1JRLGVBTFEscUJBS0VaLElBTEYsRUFLUTtBQUNkLGFBQUtFLFVBQUwsR0FBa0JGLElBQWxCO0FBQ0EsWUFBTWEsU0FBU2IsS0FBSyxDQUFMLElBQVUsQ0FBVixHQUFjQSxLQUFLLENBQUwsQ0FBZCxHQUF3QixDQUF2QztBQUNBLGFBQUtjLEtBQUwsQ0FBVyxlQUFYLEVBQTRCRCxNQUE1QjtBQUNEO0FBVE8sSzs7OztFQVhtQyxlQUFLRSxTOztrQkFBL0JoQixpQiIsImZpbGUiOiJyZXB1dGF0aW9uLWNoaW9jZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZXB1dGF0aW9uQ2hpb2NlcyBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcbiAgZGF0YSA9IHtcbiAgICByZXB1dGF0aW9uSW5kZXg6ICdhbGwnLFxuICAgIHJlcHV0YXRpb246IFtdXG4gIH1cbiAgcHJvcHMgPSB7XG4gICAgc2hvd0FsbDoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ2ZhbHNlJ1xuICAgIH1cbiAgfVxuICBtZXRob2RzID0ge1xuICAgIGNob29zZUluZGV4KGluZGV4KSB7XG4gICAgICB0aGlzLnJlcHV0YXRpb25JbmRleCA9IGluZGV4XG4gICAgICB0aGlzLiRpbnZva2UoJy4uL3JlcHV0YXRpb24tY29udGVudCcsICdnZXRDb250ZW50JywgaW5kZXgsIHRoaXMuc2hvd0FsbClcbiAgICB9LFxuICAgIGdldGxlbmd0aChkYXRhKSB7XG4gICAgICB0aGlzLnJlcHV0YXRpb24gPSBkYXRhXG4gICAgICBjb25zdCBsZW5ndGggPSBkYXRhWzBdID4gMCA/IGRhdGFbMF0gOiAwXG4gICAgICB0aGlzLiRlbWl0KCdnZXRSZXB1dGF0aW9uJywgbGVuZ3RoKVxuICAgIH1cbiAgfVxufVxuIl19