'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Goods = function (_wepy$component) {
  _inherits(Goods, _wepy$component);

  function Goods() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Goods);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Goods.__proto__ || Object.getPrototypeOf(Goods)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
      recommend: null
    }, _this.methods = {
      toDetail: function toDetail(e) {
        if (e.id !== 0) {
          wx.navigateTo({
            url: '/pages/gooddetail?id=' + e.id
          });
        }
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Goods, [{
    key: 'onLoad',
    value: function onLoad() {
      var that = this;
      // 获取类似产品
      _wepy2.default.request({
        url: 'https://api.it120.cc/' + that.$parent.$parent.globalData.subDomain + '/shop/goods/list',
        success: function success(res) {
          that.recommend = res.data.data;
          that.$apply();
        }
      });
    }
  }]);

  return Goods;
}(_wepy2.default.component);

exports.default = Goods;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdvb2RzLmpzIl0sIm5hbWVzIjpbIkdvb2RzIiwiZGF0YSIsInJlY29tbWVuZCIsIm1ldGhvZHMiLCJ0b0RldGFpbCIsImUiLCJpZCIsInd4IiwibmF2aWdhdGVUbyIsInVybCIsInRoYXQiLCJyZXF1ZXN0IiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJzdWJEb21haW4iLCJzdWNjZXNzIiwicmVzIiwiJGFwcGx5IiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxLOzs7Ozs7Ozs7Ozs7OztvTEFDbkJDLEksR0FBTztBQUNMQyxpQkFBVztBQUROLEssUUFjUEMsTyxHQUFVO0FBQ1JDLGNBRFEsb0JBQ0NDLENBREQsRUFDSTtBQUNWLFlBQUdBLEVBQUVDLEVBQUYsS0FBUyxDQUFaLEVBQWU7QUFDYkMsYUFBR0MsVUFBSCxDQUFjO0FBQ1pDLGlCQUFLLDBCQUEwQkosRUFBRUM7QUFEckIsV0FBZDtBQUdEO0FBQ0Y7QUFQTyxLOzs7Ozs2QkFYRDtBQUNQLFVBQU1JLE9BQU8sSUFBYjtBQUNBO0FBQ0EscUJBQUtDLE9BQUwsQ0FBYTtBQUNYRixhQUFLLDBCQUF5QkMsS0FBS0UsT0FBTCxDQUFhQSxPQUFiLENBQXFCQyxVQUFyQixDQUFnQ0MsU0FBekQsR0FBb0Usa0JBRDlEO0FBRVhDLGlCQUFTLGlCQUFTQyxHQUFULEVBQWM7QUFDckJOLGVBQUtSLFNBQUwsR0FBaUJjLElBQUlmLElBQUosQ0FBU0EsSUFBMUI7QUFDQVMsZUFBS08sTUFBTDtBQUNEO0FBTFUsT0FBYjtBQU9EOzs7O0VBZGdDLGVBQUtDLFM7O2tCQUFuQmxCLEsiLCJmaWxlIjoiZ29vZHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdvb2RzIGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xuICBkYXRhID0ge1xuICAgIHJlY29tbWVuZDogbnVsbFxuICB9XG4gIG9uTG9hZCgpIHtcbiAgICBjb25zdCB0aGF0ID0gdGhpc1xuICAgIC8vIOiOt+WPluexu+S8vOS6p+WTgVxuICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICB1cmw6ICdodHRwczovL2FwaS5pdDEyMC5jYy8nKyB0aGF0LiRwYXJlbnQuJHBhcmVudC5nbG9iYWxEYXRhLnN1YkRvbWFpbiArJy9zaG9wL2dvb2RzL2xpc3QnLFxuICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgIHRoYXQucmVjb21tZW5kID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICB0aGF0LiRhcHBseSgpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuICBtZXRob2RzID0ge1xuICAgIHRvRGV0YWlsKGUpIHtcbiAgICAgIGlmKGUuaWQgIT09IDApIHtcbiAgICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnL3BhZ2VzL2dvb2RkZXRhaWw/aWQ9JyArIGUuaWRcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==