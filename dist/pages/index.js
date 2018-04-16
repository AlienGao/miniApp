'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _banner = require('./../components/banner.js');

var _banner2 = _interopRequireDefault(_banner);

var _coupons = require('./../components/coupons.js');

var _coupons2 = _interopRequireDefault(_coupons);

var _wepyComToast = require('./../npm/wepy-com-toast/toast.js');

var _wepyComToast2 = _interopRequireDefault(_wepyComToast);

var _goods = require('./../components/goods.js');

var _goods2 = _interopRequireDefault(_goods);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Index = function (_wepy$page) {
  _inherits(Index, _wepy$page);

  function Index() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Index);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '花田靴下袜子专卖店',
      usingComponents: {
        'wxc-elip': '../../packages/@minui/wxc-elip/dist/index'
      }
    }, _this.components = {
      toast: _wepyComToast2.default,
      banner: _banner2.default,
      coupons: _coupons2.default,
      goods: _goods2.default
    }, _this.data = {
      sign: '签到',
      active: false
    }, _this.methods = {
      sign: function sign() {
        var that = this;
        _wepy2.default.request({
          url: 'https://api.it120.cc/' + that.$parent.globalData.subDomain + '/score/sign',
          data: {
            token: that.$parent.globalData.token
          },
          success: function success(res) {
            if (res.data.code == 0) {
              that.sign = '已经连续' + res.data.data.continuous + '天签到';
              that.active = true;
              that.$apply();
            } else if (res.data.code == 10000) {
              wx.showToast({
                title: '不能重复签到哦',
                image: '../images/fail.png',
                duration: 1000
              });
            }
          }
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'onLoad',
    value: function onLoad() {
      var that = this;
      that.active = false;
      setTimeout(function () {
        _wepy2.default.request({
          url: 'https://api.it120.cc/' + that.$parent.globalData.subDomain + '/score/today-signed',
          data: {
            token: that.$parent.globalData.token
          },
          success: function success(res) {
            if (res.data.code == 0) {
              that.active = true;
              that.sign = '已经连续' + res.data.data.continuous + '天签到';
              that.$apply();
            }
          }
        });
      }, 500);
    }
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsInVzaW5nQ29tcG9uZW50cyIsImNvbXBvbmVudHMiLCJ0b2FzdCIsImJhbm5lciIsImNvdXBvbnMiLCJnb29kcyIsImRhdGEiLCJzaWduIiwiYWN0aXZlIiwibWV0aG9kcyIsInRoYXQiLCJyZXF1ZXN0IiwidXJsIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJzdWJEb21haW4iLCJ0b2tlbiIsInN1Y2Nlc3MiLCJyZXMiLCJjb2RlIiwiY29udGludW91cyIsIiRhcHBseSIsInd4Iiwic2hvd1RvYXN0IiwidGl0bGUiLCJpbWFnZSIsImR1cmF0aW9uIiwic2V0VGltZW91dCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCLFdBRGpCO0FBRVBDLHVCQUFpQjtBQUNmLG9CQUFZO0FBREc7QUFGVixLLFFBTVRDLFUsR0FBYTtBQUNYQyxtQ0FEVztBQUVYQyw4QkFGVztBQUdYQyxnQ0FIVztBQUlYQztBQUpXLEssUUFNYkMsSSxHQUFPO0FBQ0xDLFlBQU0sSUFERDtBQUVMQyxjQUFRO0FBRkgsSyxRQXVCUEMsTyxHQUFVO0FBQ1JGLFVBRFEsa0JBQ0Q7QUFDTCxZQUFNRyxPQUFPLElBQWI7QUFDQSx1QkFBS0MsT0FBTCxDQUFhO0FBQ1hDLGVBQUssMEJBQTBCRixLQUFLRyxPQUFMLENBQWFDLFVBQWIsQ0FBd0JDLFNBQWxELEdBQThELGFBRHhEO0FBRVhULGdCQUFNO0FBQ0pVLG1CQUFPTixLQUFLRyxPQUFMLENBQWFDLFVBQWIsQ0FBd0JFO0FBRDNCLFdBRks7QUFLWEMsbUJBQVMsaUJBQVVDLEdBQVYsRUFBZTtBQUN0QixnQkFBR0EsSUFBSVosSUFBSixDQUFTYSxJQUFULElBQWlCLENBQXBCLEVBQXVCO0FBQ3JCVCxtQkFBS0gsSUFBTCxHQUFZLFNBQU9XLElBQUlaLElBQUosQ0FBU0EsSUFBVCxDQUFjYyxVQUFyQixHQUFnQyxLQUE1QztBQUNBVixtQkFBS0YsTUFBTCxHQUFjLElBQWQ7QUFDQUUsbUJBQUtXLE1BQUw7QUFDRCxhQUpELE1BSU8sSUFBSUgsSUFBSVosSUFBSixDQUFTYSxJQUFULElBQWlCLEtBQXJCLEVBQTRCO0FBQ2pDRyxpQkFBR0MsU0FBSCxDQUFhO0FBQ1hDLHVCQUFPLFNBREk7QUFFWEMsdUJBQU8sb0JBRkk7QUFHWEMsMEJBQVU7QUFIQyxlQUFiO0FBS0Q7QUFDRjtBQWpCVSxTQUFiO0FBbUJEO0FBdEJPLEs7Ozs7OzZCQW5CRDtBQUNQLFVBQU1oQixPQUFPLElBQWI7QUFDQUEsV0FBS0YsTUFBTCxHQUFjLEtBQWQ7QUFDQW1CLGlCQUFXLFlBQU07QUFDZix1QkFBS2hCLE9BQUwsQ0FBYTtBQUNYQyxlQUFLLDBCQUEwQkYsS0FBS0csT0FBTCxDQUFhQyxVQUFiLENBQXdCQyxTQUFsRCxHQUE4RCxxQkFEeEQ7QUFFWFQsZ0JBQU07QUFDSlUsbUJBQU9OLEtBQUtHLE9BQUwsQ0FBYUMsVUFBYixDQUF3QkU7QUFEM0IsV0FGSztBQUtYQyxtQkFBUyxpQkFBU0MsR0FBVCxFQUFjO0FBQ3JCLGdCQUFHQSxJQUFJWixJQUFKLENBQVNhLElBQVQsSUFBaUIsQ0FBcEIsRUFBdUI7QUFDckJULG1CQUFLRixNQUFMLEdBQWMsSUFBZDtBQUNBRSxtQkFBS0gsSUFBTCxHQUFZLFNBQU9XLElBQUlaLElBQUosQ0FBU0EsSUFBVCxDQUFjYyxVQUFyQixHQUFnQyxLQUE1QztBQUNBVixtQkFBS1csTUFBTDtBQUNEO0FBQ0Y7QUFYVSxTQUFiO0FBYUQsT0FkRCxFQWNFLEdBZEY7QUFlRDs7OztFQW5DZ0MsZUFBS08sSTs7a0JBQW5CL0IsSyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgQmFubmVycyBmcm9tICdAL2NvbXBvbmVudHMvYmFubmVyJ1xuICBpbXBvcnQgQ291cG9ucyBmcm9tICdAL2NvbXBvbmVudHMvY291cG9ucydcbiAgaW1wb3J0IFRvYXN0IGZyb20gJ3dlcHktY29tLXRvYXN0J1xuICBpbXBvcnQgR29vZHMgZnJvbSAnQC9jb21wb25lbnRzL2dvb2RzJ1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn6Iqx55Sw6Z205LiL6KKc5a2Q5LiT5Y2W5bqXJyxcbiAgICAgIHVzaW5nQ29tcG9uZW50czoge1xuICAgICAgICAnd3hjLWVsaXAnOiAnLi4vLi4vcGFja2FnZXMvQG1pbnVpL3d4Yy1lbGlwL2Rpc3QvaW5kZXgnLFxuICAgICAgfVxuICAgIH1cbiAgICBjb21wb25lbnRzID0ge1xuICAgICAgdG9hc3Q6IFRvYXN0LFxuICAgICAgYmFubmVyOiBCYW5uZXJzLFxuICAgICAgY291cG9uczogQ291cG9ucyxcbiAgICAgIGdvb2RzOiBHb29kc1xuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgc2lnbjogJ+etvuWIsCcsXG4gICAgICBhY3RpdmU6IGZhbHNlXG4gICAgfVxuICAgIG9uTG9hZCgpIHtcbiAgICAgIGNvbnN0IHRoYXQgPSB0aGlzXG4gICAgICB0aGF0LmFjdGl2ZSA9IGZhbHNlXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgICAgICB1cmw6ICdodHRwczovL2FwaS5pdDEyMC5jYy8nICsgdGhhdC4kcGFyZW50Lmdsb2JhbERhdGEuc3ViRG9tYWluICsgJy9zY29yZS90b2RheS1zaWduZWQnLFxuICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIHRva2VuOiB0aGF0LiRwYXJlbnQuZ2xvYmFsRGF0YS50b2tlblxuICAgICAgICAgIH0sXG4gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICBpZihyZXMuZGF0YS5jb2RlID09IDApIHtcbiAgICAgICAgICAgICAgdGhhdC5hY3RpdmUgPSB0cnVlXG4gICAgICAgICAgICAgIHRoYXQuc2lnbiA9ICflt7Lnu4/ov57nu60nK3Jlcy5kYXRhLmRhdGEuY29udGludW91cysn5aSp562+5YiwJ1xuICAgICAgICAgICAgICB0aGF0LiRhcHBseSgpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSw1MDApXG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBzaWduKCkge1xuICAgICAgICBjb25zdCB0aGF0ID0gdGhpc1xuICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgICAgIHVybDogJ2h0dHBzOi8vYXBpLml0MTIwLmNjLycgKyB0aGF0LiRwYXJlbnQuZ2xvYmFsRGF0YS5zdWJEb21haW4gKyAnL3Njb3JlL3NpZ24nLFxuICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIHRva2VuOiB0aGF0LiRwYXJlbnQuZ2xvYmFsRGF0YS50b2tlblxuICAgICAgICAgIH0sXG4gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgaWYocmVzLmRhdGEuY29kZSA9PSAwKSB7XG4gICAgICAgICAgICAgIHRoYXQuc2lnbiA9ICflt7Lnu4/ov57nu60nK3Jlcy5kYXRhLmRhdGEuY29udGludW91cysn5aSp562+5YiwJ1xuICAgICAgICAgICAgICB0aGF0LmFjdGl2ZSA9IHRydWVcbiAgICAgICAgICAgICAgdGhhdC4kYXBwbHkoKVxuICAgICAgICAgICAgfSBlbHNlIGlmIChyZXMuZGF0YS5jb2RlID09IDEwMDAwKSB7XG4gICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICfkuI3og73ph43lpI3nrb7liLDlk6YnLFxuICAgICAgICAgICAgICAgIGltYWdlOiAnLi4vaW1hZ2VzL2ZhaWwucG5nJyxcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogMTAwMFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gIH1cbiJdfQ==