'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

require('./npm/wepy-async-function/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _default = function (_wepy$app) {
  _inherits(_default, _wepy$app);

  function _default() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, _default);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = _default.__proto__ || Object.getPrototypeOf(_default)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      pages: ['pages/index', 'pages/gooddetail', 'pages/shop-cart', 'pages/my', 'pages/all-reputation', 'pages/newMember', 'pages/hot-goods', 'pages/special-price', 'pages/my-ticket', 'pages/select-address', 'pages/address-add', 'pages/my-fav', 'pages/pay', 'pages/order-list', 'pages/order-reputation'],
      window: {
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#fff',
        navigationBarTitleText: 'WeChat',
        navigationBarTextStyle: 'black'
      },
      tabBar: {
        color: "#6e6d6b",
        selectedColor: "#FF8869",
        borderStyle: "white",
        backgroundColor: "#fff",
        list: [{
          pagePath: "pages/index",
          iconPath: "images/icon_home.png",
          selectedIconPath: "images/icon_home_active.png",
          text: "首页"
        }, {
          pagePath: "pages/shop-cart",
          iconPath: "images/icon_shop_cart.png",
          selectedIconPath: "images/icon_shop_cart_active.png",
          text: "购物车"
        }, {
          pagePath: "pages/my",
          iconPath: "images/icon_info.png",
          selectedIconPath: "images/icon_info_active.png",
          text: "我的"
        }]
      }
    }, _this.globalData = {
      userInfo: null,
      subDomain: "gaojundream", // 如果你的域名是： https://api.it120.cc/abcd 那么这里只要填写 abcd
      version: "1.9.SNAPSHOT",
      shareProfile: '百款精品商品，总有一款适合您' // 首页转发的时候话术
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(_default, [{
    key: 'onLaunch',
    value: function onLaunch() {
      this.login();
      this.getAddress();
    }
  }, {
    key: 'login',
    value: function login() {
      var that = this;
      var token = that.globalData.token;
      if (token) {
        wx.request({
          url: 'https://api.it120.cc/' + that.globalData.subDomain + '/user/check-token',
          data: {
            token: token
          },
          success: function success(res) {
            if (res.data.code != 0) {
              that.globalData.token = null;
              that.login();
            }
          }
        });
        return;
      }
      wx.login({
        success: function success(res) {
          wx.request({
            url: 'https://api.it120.cc/' + that.globalData.subDomain + '/user/wxapp/login',
            data: {
              code: res.code
            },
            success: function success(res) {
              if (res.data.code == 10000) {
                // 去注册
                that.registerUser();
                return;
              }
              if (res.data.code != 0) {
                // 登录错误
                wx.hideLoading();
                wx.showModal({
                  title: '提示',
                  content: '无法登录，请重试',
                  showCancel: false
                });
                return;
              }
              //console.log(res.data.data)
              that.globalData.token = res.data.data.token;
              that.globalData.uid = res.data.data.uid;
              // console.log('token', res.data.data.token)
            }
          });
        }
      });
    }
  }, {
    key: 'registerUser',
    value: function registerUser() {
      var that = this;
      wx.login({
        success: function success(res) {
          var code = res.code; // 微信登录接口返回的 code 参数，下面注册接口需要用到
          wx.getUserInfo({
            success: function success(res) {
              var iv = res.iv;
              var encryptedData = res.encryptedData;
              // 下面开始调用注册接口
              wx.request({
                url: 'https://api.it120.cc/' + that.globalData.subDomain + '/user/wxapp/register/complex',
                data: {
                  code: code,
                  encryptedData: encryptedData,
                  iv: iv
                }, // 设置请求的 参数
                success: function success(res) {
                  wx.hideLoading();
                  that.login();
                }
              });
            }
          });
        }
      });
    }
  }, {
    key: 'getAddress',
    value: function getAddress() {
      var that = this;
      _wepy2.default.request({
        url: 'https://api.it120.cc/' + that.globalData.subDomain + '/json/list',
        success: function success(res) {
          if (res.data.code == 0) {
            var result = [];
            res.data.data.forEach(function (item) {
              item.jsonData.content.forEach(function (city) {
                result.push(city);
              });
            });
            that.globalData.commonCityData = result;
            // console.log(result)
          }
        }
      });
    }
  }]);

  return _default;
}(_wepy2.default.app);


App(require('./npm/wepy/lib/wepy.js').default.$createApp(_default, {"noPromiseAPI":["createSelectorQuery"]}));
require('./_wepylogs.js')

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJ0YWJCYXIiLCJjb2xvciIsInNlbGVjdGVkQ29sb3IiLCJib3JkZXJTdHlsZSIsImJhY2tncm91bmRDb2xvciIsImxpc3QiLCJwYWdlUGF0aCIsImljb25QYXRoIiwic2VsZWN0ZWRJY29uUGF0aCIsInRleHQiLCJnbG9iYWxEYXRhIiwidXNlckluZm8iLCJzdWJEb21haW4iLCJ2ZXJzaW9uIiwic2hhcmVQcm9maWxlIiwibG9naW4iLCJnZXRBZGRyZXNzIiwidGhhdCIsInRva2VuIiwid3giLCJyZXF1ZXN0IiwidXJsIiwiZGF0YSIsInN1Y2Nlc3MiLCJyZXMiLCJjb2RlIiwicmVnaXN0ZXJVc2VyIiwiaGlkZUxvYWRpbmciLCJzaG93TW9kYWwiLCJ0aXRsZSIsImNvbnRlbnQiLCJzaG93Q2FuY2VsIiwidWlkIiwiZ2V0VXNlckluZm8iLCJpdiIsImVuY3J5cHRlZERhdGEiLCJyZXN1bHQiLCJmb3JFYWNoIiwiaXRlbSIsImpzb25EYXRhIiwiY2l0eSIsInB1c2giLCJjb21tb25DaXR5RGF0YSIsImFwcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzBMQUdFQSxNLEdBQVM7QUFDUEMsYUFBTyxDQUNMLGFBREssRUFFTCxrQkFGSyxFQUdMLGlCQUhLLEVBSUwsVUFKSyxFQUtMLHNCQUxLLEVBTUwsaUJBTkssRUFPTCxpQkFQSyxFQVFMLHFCQVJLLEVBU0wsaUJBVEssRUFVTCxzQkFWSyxFQVdMLG1CQVhLLEVBWUwsY0FaSyxFQWFMLFdBYkssRUFjTCxrQkFkSyxFQWVMLHdCQWZLLENBREE7QUFrQlBDLGNBQVE7QUFDTkMsNkJBQXFC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QSxrQkFBSUMsZ0JBQWdCWCxJQUFJVyxhQUF4QjtBQUNBO0FBQ0FoQixpQkFBR0MsT0FBSCxDQUFXO0FBQ1RDLHFCQUFLLDBCQUEwQkosS0FBS1AsVUFBTCxDQUFnQkUsU0FBMUMsR0FBc0QsOEJBRGxEO0FBRVRVLHNCQUFNO0FBQ0pHLHdCQUFNQSxJQURGO0FBRUpVLGlDQUFlQSxhQUZYO0FBR0pELHNCQUFJQTtBQUhBLGlCQUZHLEVBTU47QUFDSFgseUJBQVMsaUJBQUNDLEdBQUQsRUFBUztBQUNoQkwscUJBQUdRLFdBQUg7QUFDQVYsdUJBQUtGLEtBQUw7QUFDRDtBQVZRLGVBQVg7QUFZRDtBQWpCWSxXQUFmO0FBbUJEO0FBdEJNLE9BQVQ7QUF3QkQ7OztpQ0FDYTtBQUNaLFVBQU1FLE9BQU8sSUFBYjtBQUNBLHFCQUFLRyxPQUFMLENBQWE7QUFDWEMsYUFBSywwQkFBMEJKLEtBQUtQLFVBQUwsQ0FBZ0JFLFNBQTFDLEdBQXNELFlBRGhEO0FBRVhXLGlCQUFTLGlCQUFTQyxHQUFULEVBQWM7QUFDckIsY0FBR0EsSUFBSUYsSUFBSixDQUFTRyxJQUFULElBQWlCLENBQXBCLEVBQXVCO0FBQ3JCLGdCQUFNVyxTQUFTLEVBQWY7QUFDQVosZ0JBQUlGLElBQUosQ0FBU0EsSUFBVCxDQUFjZSxPQUFkLENBQXNCLFVBQUNDLElBQUQsRUFBVTtBQUM5QkEsbUJBQUtDLFFBQUwsQ0FBY1QsT0FBZCxDQUFzQk8sT0FBdEIsQ0FBOEIsVUFBQ0csSUFBRCxFQUFVO0FBQ3RDSix1QkFBT0ssSUFBUCxDQUFZRCxJQUFaO0FBQ0QsZUFGRDtBQUdELGFBSkQ7QUFLQXZCLGlCQUFLUCxVQUFMLENBQWdCZ0MsY0FBaEIsR0FBaUNOLE1BQWpDO0FBQ0E7QUFDRDtBQUNGO0FBYlUsT0FBYjtBQWVEOzs7O0VBbkowQixlQUFLTyxHIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCAnd2VweS1hc3luYy1mdW5jdGlvbidcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyB3ZXB5LmFwcCB7XG4gIGNvbmZpZyA9IHtcbiAgICBwYWdlczogW1xuICAgICAgJ3BhZ2VzL2luZGV4JyxcbiAgICAgICdwYWdlcy9nb29kZGV0YWlsJyxcbiAgICAgICdwYWdlcy9zaG9wLWNhcnQnLFxuICAgICAgJ3BhZ2VzL215JyxcbiAgICAgICdwYWdlcy9hbGwtcmVwdXRhdGlvbicsXG4gICAgICAncGFnZXMvbmV3TWVtYmVyJyxcbiAgICAgICdwYWdlcy9ob3QtZ29vZHMnLFxuICAgICAgJ3BhZ2VzL3NwZWNpYWwtcHJpY2UnLFxuICAgICAgJ3BhZ2VzL215LXRpY2tldCcsXG4gICAgICAncGFnZXMvc2VsZWN0LWFkZHJlc3MnLFxuICAgICAgJ3BhZ2VzL2FkZHJlc3MtYWRkJyxcbiAgICAgICdwYWdlcy9teS1mYXYnLFxuICAgICAgJ3BhZ2VzL3BheScsXG4gICAgICAncGFnZXMvb3JkZXItbGlzdCcsXG4gICAgICAncGFnZXMvb3JkZXItcmVwdXRhdGlvbidcbiAgICBdLFxuICAgIHdpbmRvdzoge1xuICAgICAgYmFja2dyb3VuZFRleHRTdHlsZTogJ2xpZ2h0JyxcbiAgICAgIG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6ICcjZmZmJyxcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICdXZUNoYXQnLFxuICAgICAgbmF2aWdhdGlvbkJhclRleHRTdHlsZTogJ2JsYWNrJ1xuICAgIH0sXG4gICAgdGFiQmFyOiB7XG4gICAgICBjb2xvcjogXCIjNmU2ZDZiXCIsXG4gICAgICBzZWxlY3RlZENvbG9yOiBcIiNGRjg4NjlcIixcbiAgICAgIGJvcmRlclN0eWxlOiBcIndoaXRlXCIsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6IFwiI2ZmZlwiLFxuICAgICAgbGlzdDogW3tcbiAgICAgICAgcGFnZVBhdGg6IFwicGFnZXMvaW5kZXhcIixcbiAgICAgICAgaWNvblBhdGg6IFwiaW1hZ2VzL2ljb25faG9tZS5wbmdcIixcbiAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDogXCJpbWFnZXMvaWNvbl9ob21lX2FjdGl2ZS5wbmdcIixcbiAgICAgICAgdGV4dDogXCLpppbpobVcIlxuICAgICAgfSwge1xuICAgICAgICBwYWdlUGF0aDogXCJwYWdlcy9zaG9wLWNhcnRcIixcbiAgICAgICAgaWNvblBhdGg6IFwiaW1hZ2VzL2ljb25fc2hvcF9jYXJ0LnBuZ1wiLFxuICAgICAgICBzZWxlY3RlZEljb25QYXRoOiBcImltYWdlcy9pY29uX3Nob3BfY2FydF9hY3RpdmUucG5nXCIsXG4gICAgICAgIHRleHQ6IFwi6LSt54mp6L2mXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHBhZ2VQYXRoOiBcInBhZ2VzL215XCIsXG4gICAgICAgIGljb25QYXRoOiBcImltYWdlcy9pY29uX2luZm8ucG5nXCIsXG4gICAgICAgIHNlbGVjdGVkSWNvblBhdGg6IFwiaW1hZ2VzL2ljb25faW5mb19hY3RpdmUucG5nXCIsXG4gICAgICAgIHRleHQ6IFwi5oiR55qEXCJcbiAgICAgIH1dXG4gICAgfVxuICB9XG4gIG9uTGF1bmNoKCkge1xuICAgIHRoaXMubG9naW4oKVxuICAgIHRoaXMuZ2V0QWRkcmVzcygpXG4gIH1cbiAgbG9naW4gKCkge1xuICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICB2YXIgdG9rZW4gPSB0aGF0Lmdsb2JhbERhdGEudG9rZW47XG4gICAgaWYgKHRva2VuKSB7XG4gICAgICB3eC5yZXF1ZXN0KHtcbiAgICAgICAgdXJsOiAnaHR0cHM6Ly9hcGkuaXQxMjAuY2MvJyArIHRoYXQuZ2xvYmFsRGF0YS5zdWJEb21haW4gKyAnL3VzZXIvY2hlY2stdG9rZW4nLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgdG9rZW46IHRva2VuXG4gICAgICAgIH0sXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgIGlmIChyZXMuZGF0YS5jb2RlICE9IDApIHtcbiAgICAgICAgICAgIHRoYXQuZ2xvYmFsRGF0YS50b2tlbiA9IG51bGw7XG4gICAgICAgICAgICB0aGF0LmxvZ2luKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB3eC5sb2dpbih7XG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgd3gucmVxdWVzdCh7XG4gICAgICAgICAgdXJsOiAnaHR0cHM6Ly9hcGkuaXQxMjAuY2MvJyArIHRoYXQuZ2xvYmFsRGF0YS5zdWJEb21haW4gKyAnL3VzZXIvd3hhcHAvbG9naW4nLFxuICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIGNvZGU6IHJlcy5jb2RlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgIGlmIChyZXMuZGF0YS5jb2RlID09IDEwMDAwKSB7XG4gICAgICAgICAgICAgIC8vIOWOu+azqOWGjFxuICAgICAgICAgICAgICB0aGF0LnJlZ2lzdGVyVXNlcigpO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocmVzLmRhdGEuY29kZSAhPSAwKSB7XG4gICAgICAgICAgICAgIC8vIOeZu+W9lemUmeivr1xuICAgICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICAgICAgICBjb250ZW50OiAn5peg5rOV55m75b2V77yM6K+36YeN6K+VJyxcbiAgICAgICAgICAgICAgICBzaG93Q2FuY2VsOiBmYWxzZVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKHJlcy5kYXRhLmRhdGEpXG4gICAgICAgICAgICB0aGF0Lmdsb2JhbERhdGEudG9rZW4gPSByZXMuZGF0YS5kYXRhLnRva2VuO1xuICAgICAgICAgICAgdGhhdC5nbG9iYWxEYXRhLnVpZCA9IHJlcy5kYXRhLmRhdGEudWlkO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3Rva2VuJywgcmVzLmRhdGEuZGF0YS50b2tlbilcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSlcbiAgfVxuICByZWdpc3RlclVzZXIgKCkge1xuICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICB3eC5sb2dpbih7XG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgdmFyIGNvZGUgPSByZXMuY29kZTsgLy8g5b6u5L+h55m75b2V5o6l5Y+j6L+U5Zue55qEIGNvZGUg5Y+C5pWw77yM5LiL6Z2i5rOo5YaM5o6l5Y+j6ZyA6KaB55So5YiwXG4gICAgICAgIHd4LmdldFVzZXJJbmZvKHtcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgIHZhciBpdiA9IHJlcy5pdjtcbiAgICAgICAgICAgIHZhciBlbmNyeXB0ZWREYXRhID0gcmVzLmVuY3J5cHRlZERhdGE7XG4gICAgICAgICAgICAvLyDkuIvpnaLlvIDlp4vosIPnlKjms6jlhozmjqXlj6NcbiAgICAgICAgICAgIHd4LnJlcXVlc3Qoe1xuICAgICAgICAgICAgICB1cmw6ICdodHRwczovL2FwaS5pdDEyMC5jYy8nICsgdGhhdC5nbG9iYWxEYXRhLnN1YkRvbWFpbiArICcvdXNlci93eGFwcC9yZWdpc3Rlci9jb21wbGV4JyxcbiAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIGNvZGU6IGNvZGUsXG4gICAgICAgICAgICAgICAgZW5jcnlwdGVkRGF0YTogZW5jcnlwdGVkRGF0YSxcbiAgICAgICAgICAgICAgICBpdjogaXZcbiAgICAgICAgICAgICAgfSwgLy8g6K6+572u6K+35rGC55qEIOWPguaVsFxuICAgICAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgICAgICAgICB0aGF0LmxvZ2luKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0pXG4gIH1cbiAgZ2V0QWRkcmVzcyAoKSB7XG4gICAgY29uc3QgdGhhdCA9IHRoaXNcbiAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgdXJsOiAnaHR0cHM6Ly9hcGkuaXQxMjAuY2MvJyArIHRoYXQuZ2xvYmFsRGF0YS5zdWJEb21haW4gKyAnL2pzb24vbGlzdCcsXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgaWYocmVzLmRhdGEuY29kZSA9PSAwKSB7XG4gICAgICAgICAgY29uc3QgcmVzdWx0ID0gW11cbiAgICAgICAgICByZXMuZGF0YS5kYXRhLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIGl0ZW0uanNvbkRhdGEuY29udGVudC5mb3JFYWNoKChjaXR5KSA9PiB7XG4gICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGNpdHkpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0pXG4gICAgICAgICAgdGhhdC5nbG9iYWxEYXRhLmNvbW1vbkNpdHlEYXRhID0gcmVzdWx0XG4gICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzdWx0KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG5cdGdsb2JhbERhdGEgPSB7XG5cdFx0dXNlckluZm86IG51bGwsXG5cdFx0c3ViRG9tYWluOiBcImdhb2p1bmRyZWFtXCIsIC8vIOWmguaenOS9oOeahOWfn+WQjeaYr++8miBodHRwczovL2FwaS5pdDEyMC5jYy9hYmNkIOmCo+S5iOi/memHjOWPquimgeWhq+WGmSBhYmNkXG5cdFx0dmVyc2lvbjogXCIxLjkuU05BUFNIT1RcIixcblx0XHRzaGFyZVByb2ZpbGU6ICfnmb7mrL7nsr7lk4HllYblk4HvvIzmgLvmnInkuIDmrL7pgILlkIjmgqgnIC8vIOmmlumhtei9rOWPkeeahOaXtuWAmeivneacr1xuICB9XG59XG4iXX0=