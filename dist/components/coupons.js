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

var Coupons = function (_wepy$component) {
  _inherits(Coupons, _wepy$component);

  function Coupons() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Coupons);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Coupons.__proto__ || Object.getPrototypeOf(Coupons)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
      coupons: []
    }, _this.methods = {
      toCoupons: function toCoupons(index) {
        if (index == 0) {
          wx.navigateTo({
            url: '/pages/newMember'
          });
        } else if (index == 1) {
          wx.navigateTo({
            url: '/pages/hot-goods'
          });
        } else if (index == 2) {
          wx.navigateTo({
            url: '/pages/special-price'
          });
        }
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Coupons, [{
    key: 'onLoad',
    value: function onLoad() {
      var that = this;
      _wepy2.default.request({
        url: 'https://api.it120.cc/' + that.$parent.$parent.globalData.subDomain + '/banner/list',
        data: {
          key: 'mallName'
        },
        success: function success(res) {
          that.coupons = res.data.data.filter(function (item) {
            return item.type === 'coupons';
          });
          that.$apply();
        }
      });
    }
  }]);

  return Coupons;
}(_wepy2.default.component);

exports.default = Coupons;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvdXBvbnMuanMiXSwibmFtZXMiOlsiQ291cG9ucyIsImRhdGEiLCJjb3Vwb25zIiwibWV0aG9kcyIsInRvQ291cG9ucyIsImluZGV4Iiwid3giLCJuYXZpZ2F0ZVRvIiwidXJsIiwidGhhdCIsInJlcXVlc3QiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsInN1YkRvbWFpbiIsImtleSIsInN1Y2Nlc3MiLCJyZXMiLCJmaWx0ZXIiLCJpdGVtIiwidHlwZSIsIiRhcHBseSIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsTzs7Ozs7Ozs7Ozs7Ozs7d0xBQ25CQyxJLEdBQU87QUFDTEMsZUFBUztBQURKLEssUUFrQlBDLE8sR0FBVTtBQUNSQyxlQURRLHFCQUNFQyxLQURGLEVBQ1M7QUFDZixZQUFJQSxTQUFTLENBQWIsRUFBZ0I7QUFDZEMsYUFBR0MsVUFBSCxDQUFjO0FBQ1pDLGlCQUFLO0FBRE8sV0FBZDtBQUdELFNBSkQsTUFJTyxJQUFJSCxTQUFTLENBQWIsRUFBZ0I7QUFDckJDLGFBQUdDLFVBQUgsQ0FBYztBQUNaQyxpQkFBSztBQURPLFdBQWQ7QUFHRCxTQUpNLE1BSUEsSUFBSUgsU0FBUyxDQUFiLEVBQWdCO0FBQ3JCQyxhQUFHQyxVQUFILENBQWM7QUFDWkMsaUJBQUs7QUFETyxXQUFkO0FBR0Q7QUFDRjtBQWZPLEs7Ozs7OzZCQWZEO0FBQ1AsVUFBTUMsT0FBTyxJQUFiO0FBQ0EscUJBQUtDLE9BQUwsQ0FBYTtBQUNYRixhQUFLLDBCQUEwQkMsS0FBS0UsT0FBTCxDQUFhQSxPQUFiLENBQXFCQyxVQUFyQixDQUFnQ0MsU0FBMUQsR0FBc0UsY0FEaEU7QUFFWFosY0FBTTtBQUNKYSxlQUFLO0FBREQsU0FGSztBQUtYQyxpQkFBUyxpQkFBVUMsR0FBVixFQUFlO0FBQ3RCUCxlQUFLUCxPQUFMLEdBQWVjLElBQUlmLElBQUosQ0FBU0EsSUFBVCxDQUFjZ0IsTUFBZCxDQUFxQixVQUFDQyxJQUFELEVBQVU7QUFDNUMsbUJBQU9BLEtBQUtDLElBQUwsS0FBYyxTQUFyQjtBQUNELFdBRmMsQ0FBZjtBQUdBVixlQUFLVyxNQUFMO0FBQ0Q7QUFWVSxPQUFiO0FBWUQ7Ozs7RUFsQmtDLGVBQUtDLFM7O2tCQUFyQnJCLE8iLCJmaWxlIjoiY291cG9ucy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvdXBvbnMgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XG4gIGRhdGEgPSB7XG4gICAgY291cG9uczogW11cbiAgfVxuICBvbkxvYWQoKSB7XG4gICAgY29uc3QgdGhhdCA9IHRoaXNcbiAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgdXJsOiAnaHR0cHM6Ly9hcGkuaXQxMjAuY2MvJyArIHRoYXQuJHBhcmVudC4kcGFyZW50Lmdsb2JhbERhdGEuc3ViRG9tYWluICsgJy9iYW5uZXIvbGlzdCcsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIGtleTogJ21hbGxOYW1lJ1xuICAgICAgfSxcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgdGhhdC5jb3Vwb25zID0gcmVzLmRhdGEuZGF0YS5maWx0ZXIoKGl0ZW0pID0+IHtcbiAgICAgICAgICByZXR1cm4gaXRlbS50eXBlID09PSAnY291cG9ucydcbiAgICAgICAgfSlcbiAgICAgICAgdGhhdC4kYXBwbHkoKVxuICAgICAgfVxuICAgIH0pXG4gIH1cbiAgbWV0aG9kcyA9IHtcbiAgICB0b0NvdXBvbnMoaW5kZXgpIHtcbiAgICAgIGlmIChpbmRleCA9PSAwKSB7XG4gICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy9wYWdlcy9uZXdNZW1iZXInXG4gICAgICAgIH0pXG4gICAgICB9IGVsc2UgaWYgKGluZGV4ID09IDEpIHtcbiAgICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnL3BhZ2VzL2hvdC1nb29kcydcbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSBpZiAoaW5kZXggPT0gMikge1xuICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcvcGFnZXMvc3BlY2lhbC1wcmljZSdcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==