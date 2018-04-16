'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _hotgood = require('./../components/hotgood.js');

var _hotgood2 = _interopRequireDefault(_hotgood);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HotGoods = function (_wepy$page) {
  _inherits(HotGoods, _wepy$page);

  function HotGoods() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, HotGoods);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = HotGoods.__proto__ || Object.getPrototypeOf(HotGoods)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '热卖专区',
      usingComponents: {
        'wxc-elip': '../../packages/@minui/wxc-elip/dist/index'
      }
    }, _this.components = {
      'hot-good': _hotgood2.default
    }, _this.data = {
      goods: []
    }, _this.methods = {
      toDetail: function toDetail(item) {
        wx.navigateTo({
          url: '/pages/gooddetail?id=' + item.id
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(HotGoods, [{
    key: 'onLoad',
    value: function onLoad() {
      var that = this;
      _wepy2.default.request({
        url: 'https://api.it120.cc/' + this.$parent.globalData.subDomain + '/shop/goods/list',
        success: function success(res) {
          res.data.data.map(function (item) {
            if (item.recommendStatus === 1) {
              that.goods.push(item);
            }
          });
          that.$apply();
        }
      });
    }
  }]);

  return HotGoods;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(HotGoods , 'pages/hot-goods'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvdC1nb29kcy5qcyJdLCJuYW1lcyI6WyJIb3RHb29kcyIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJ1c2luZ0NvbXBvbmVudHMiLCJjb21wb25lbnRzIiwiZGF0YSIsImdvb2RzIiwibWV0aG9kcyIsInRvRGV0YWlsIiwiaXRlbSIsInd4IiwibmF2aWdhdGVUbyIsInVybCIsImlkIiwidGhhdCIsInJlcXVlc3QiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsInN1YkRvbWFpbiIsInN1Y2Nlc3MiLCJyZXMiLCJtYXAiLCJyZWNvbW1lbmRTdGF0dXMiLCJwdXNoIiwiJGFwcGx5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxROzs7Ozs7Ozs7Ozs7OzswTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0IsTUFEakI7QUFFUEMsdUJBQWlCO0FBQ2Ysb0JBQVk7QUFERztBQUZWLEssUUFNVEMsVSxHQUFhO0FBQ1g7QUFEVyxLLFFBR2JDLEksR0FBTztBQUNMQyxhQUFPO0FBREYsSyxRQWlCUEMsTyxHQUFVO0FBQ1JDLGNBRFEsb0JBQ0NDLElBREQsRUFDTztBQUNiQyxXQUFHQyxVQUFILENBQWM7QUFDWkMsZUFBSywwQkFBMEJILEtBQUtJO0FBRHhCLFNBQWQ7QUFHRDtBQUxPLEs7Ozs7OzZCQWREO0FBQ1AsVUFBTUMsT0FBTyxJQUFiO0FBQ0EscUJBQUtDLE9BQUwsQ0FBYTtBQUNYSCxhQUFLLDBCQUF5QixLQUFLSSxPQUFMLENBQWFDLFVBQWIsQ0FBd0JDLFNBQWpELEdBQTRELGtCQUR0RDtBQUVYQyxpQkFBUyxpQkFBVUMsR0FBVixFQUFlO0FBQ3RCQSxjQUFJZixJQUFKLENBQVNBLElBQVQsQ0FBY2dCLEdBQWQsQ0FBa0IsVUFBQ1osSUFBRCxFQUFVO0FBQzFCLGdCQUFHQSxLQUFLYSxlQUFMLEtBQXlCLENBQTVCLEVBQStCO0FBQzdCUixtQkFBS1IsS0FBTCxDQUFXaUIsSUFBWCxDQUFnQmQsSUFBaEI7QUFDRDtBQUNGLFdBSkQ7QUFLQUssZUFBS1UsTUFBTDtBQUNEO0FBVFUsT0FBYjtBQVdEOzs7O0VBMUJtQyxlQUFLQyxJOztrQkFBdEJ6QixRIiwiZmlsZSI6ImhvdC1nb29kcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCBIb3RHb29kIGZyb20gJ0AvY29tcG9uZW50cy9ob3Rnb29kJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIb3RHb29kcyBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn54Ot5Y2W5LiT5Yy6JyxcbiAgICB1c2luZ0NvbXBvbmVudHM6IHtcbiAgICAgICd3eGMtZWxpcCc6ICcuLi8uLi9wYWNrYWdlcy9AbWludWkvd3hjLWVsaXAvZGlzdC9pbmRleCdcbiAgICB9XG4gIH1cbiAgY29tcG9uZW50cyA9IHtcbiAgICAnaG90LWdvb2QnOiBIb3RHb29kXG4gIH1cbiAgZGF0YSA9IHtcbiAgICBnb29kczogW11cbiAgfVxuICBvbkxvYWQoKSB7XG4gICAgY29uc3QgdGhhdCA9IHRoaXNcbiAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgdXJsOiAnaHR0cHM6Ly9hcGkuaXQxMjAuY2MvJysgdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuc3ViRG9tYWluICsnL3Nob3AvZ29vZHMvbGlzdCcsXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgIHJlcy5kYXRhLmRhdGEubWFwKChpdGVtKSA9PiB7XG4gICAgICAgICAgaWYoaXRlbS5yZWNvbW1lbmRTdGF0dXMgPT09IDEpIHtcbiAgICAgICAgICAgIHRoYXQuZ29vZHMucHVzaChpdGVtKVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgdGhhdC4kYXBwbHkoKVxuICAgICAgfVxuICAgIH0pXG4gIH1cbiAgbWV0aG9kcyA9IHtcbiAgICB0b0RldGFpbChpdGVtKSB7XG4gICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgdXJsOiAnL3BhZ2VzL2dvb2RkZXRhaWw/aWQ9JyArIGl0ZW0uaWRcbiAgICAgIH0pXG4gICAgfVxuICB9XG59XG4iXX0=