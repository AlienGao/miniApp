'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var My = function (_wepy$page) {
  _inherits(My, _wepy$page);

  function My() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, My);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = My.__proto__ || Object.getPrototypeOf(My)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '个人中心'
    }, _this.data = {
      userInfo: null,
      userMobile: '',
      apiUserInfoMap: null,
      score: 0,
      balance: 0,
      topay: false,
      toreceive: false,
      tocomment: false
    }, _this.methods = {
      toOrderList: function toOrderList(index) {
        wx.navigateTo({
          url: '/pages/order-list?index=' + index
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(My, [{
    key: 'onLoad',
    value: function onLoad() {
      this.getUserInfo();
      this.getUserApiInfo();
      this.getUserAmount();
      this.requestAll();
    }
  }, {
    key: 'getUserInfo',
    value: function getUserInfo(cb) {
      var that = this;
      wx.login({
        success: function success() {
          wx.getUserInfo({
            success: function success(res) {
              that.userInfo = res.userInfo;
              that.$apply();
            }
          });
        }
      });
    }
  }, {
    key: 'getUserApiInfo',
    value: function getUserApiInfo() {
      var that = this;
      wx.request({
        url: 'https://api.it120.cc/' + that.$parent.globalData.subDomain + '/user/detail',
        data: {
          token: that.$parent.globalData.token
        },
        success: function success(res) {
          if (res.data.code == 0) {
            that.apiUserInfoMap = res.data.data, that.userMobile = res.data.data.base.mobile;
          }
        }
      });
    }
  }, {
    key: 'getUserAmount',
    value: function getUserAmount() {
      var that = this;
      wx.request({
        url: 'https://api.it120.cc/' + that.$parent.globalData.subDomain + '/user/amount',
        data: {
          token: that.$parent.globalData.token
        },
        success: function success(res) {
          if (res.data.code == 0) {
            that.score = res.data.data.score;
          }
        }
      });
    }
  }, {
    key: 'getPhoneNumber',
    value: function getPhoneNumber(e) {
      if (!e.detail.errMsg || e.detail.errMsg != "getPhoneNumber:ok") {
        wx.showModal({
          title: '提示',
          content: '无法获取手机号码',
          showCancel: false
        });
        return;
      }
      var that = this;
      wx.request({
        url: 'https://api.it120.cc/' + that.$parent.globalData.subDomain + '/user/wxapp/bindMobile',
        data: {
          token: that.$parent.globalData.token,
          encryptedData: e.detail.encryptedData,
          iv: e.detail.iv
        },
        success: function success(res) {
          if (res.data.code == 0) {
            wx.showToast({
              title: '绑定成功',
              icon: 'success',
              duration: 2000
            });
            that.getUserApiInfo();
          } else {
            wx.showModal({
              title: '提示',
              content: '绑定失败',
              showCancel: false
            });
          }
        }
      });
    }
  }, {
    key: 'requestAll',
    value: function requestAll() {
      var that = this;
      _wepy2.default.request({
        url: 'https://api.it120.cc/' + that.$parent.globalData.subDomain + '/order/list',
        data: {
          token: that.$parent.globalData.token
        },
        success: function success(res) {
          if (res.data.code == 0) {
            res.data.data.orderList.forEach(function (item) {
              if (item.status == 0) {
                that.topay = true;
              }
              if (item.status == 2) {
                that.toreceive = true;
              }
              if (item.status == 3) {
                that.tocomment = true;
              }
            });
            that.$apply();
          }
        }
      });
    }
  }]);

  return My;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(My , 'pages/my'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm15LmpzIl0sIm5hbWVzIjpbIk15IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJ1c2VySW5mbyIsInVzZXJNb2JpbGUiLCJhcGlVc2VySW5mb01hcCIsInNjb3JlIiwiYmFsYW5jZSIsInRvcGF5IiwidG9yZWNlaXZlIiwidG9jb21tZW50IiwibWV0aG9kcyIsInRvT3JkZXJMaXN0IiwiaW5kZXgiLCJ3eCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJnZXRVc2VySW5mbyIsImdldFVzZXJBcGlJbmZvIiwiZ2V0VXNlckFtb3VudCIsInJlcXVlc3RBbGwiLCJjYiIsInRoYXQiLCJsb2dpbiIsInN1Y2Nlc3MiLCJyZXMiLCIkYXBwbHkiLCJyZXF1ZXN0IiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJzdWJEb21haW4iLCJ0b2tlbiIsImNvZGUiLCJiYXNlIiwibW9iaWxlIiwiZSIsImRldGFpbCIsImVyck1zZyIsInNob3dNb2RhbCIsInRpdGxlIiwiY29udGVudCIsInNob3dDYW5jZWwiLCJlbmNyeXB0ZWREYXRhIiwiaXYiLCJzaG93VG9hc3QiLCJpY29uIiwiZHVyYXRpb24iLCJvcmRlckxpc3QiLCJmb3JFYWNoIiwiaXRlbSIsInN0YXR1cyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLEU7Ozs7Ozs7Ozs7Ozs7OzhLQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1RDLEksR0FBTztBQUNMQyxnQkFBVSxJQURMO0FBRUxDLGtCQUFZLEVBRlA7QUFHTEMsc0JBQWdCLElBSFg7QUFJTEMsYUFBTyxDQUpGO0FBS0xDLGVBQVMsQ0FMSjtBQU1MQyxhQUFPLEtBTkY7QUFPTEMsaUJBQVcsS0FQTjtBQVFMQyxpQkFBVztBQVJOLEssUUFnQlBDLE8sR0FBVTtBQUNSQyxpQkFEUSx1QkFDSUMsS0FESixFQUNXO0FBQ2pCQyxXQUFHQyxVQUFILENBQWM7QUFDWkMsZUFBSyw2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TUFGRTtBQUdYQywwQkFBWTtBQUhELGFBQWI7QUFLRDtBQUNGO0FBdEJRLE9BQVg7QUF3QkQ7OztpQ0FDYTtBQUNaLFVBQU1uQixPQUFPLElBQWI7QUFDQSxxQkFBS0ssT0FBTCxDQUFhO0FBQ1hYLGFBQUssMEJBQTBCTSxLQUFLTSxPQUFMLENBQWFDLFVBQWIsQ0FBd0JDLFNBQWxELEdBQThELGFBRHhEO0FBRVg1QixjQUFNO0FBQ0o2QixpQkFBT1QsS0FBS00sT0FBTCxDQUFhQyxVQUFiLENBQXdCRTtBQUQzQixTQUZLO0FBS1hQLGlCQUFTLGlCQUFVQyxHQUFWLEVBQWU7QUFDdEIsY0FBR0EsSUFBSXZCLElBQUosQ0FBUzhCLElBQVQsSUFBaUIsQ0FBcEIsRUFBdUI7QUFDckJQLGdCQUFJdkIsSUFBSixDQUFTQSxJQUFULENBQWM2QyxTQUFkLENBQXdCQyxPQUF4QixDQUFnQyxVQUFDQyxJQUFELEVBQVU7QUFDeEMsa0JBQUdBLEtBQUtDLE1BQUwsSUFBZSxDQUFsQixFQUFxQjtBQUNuQjVCLHFCQUFLZCxLQUFMLEdBQWEsSUFBYjtBQUNEO0FBQ0Qsa0JBQUd5QyxLQUFLQyxNQUFMLElBQWUsQ0FBbEIsRUFBcUI7QUFDbkI1QixxQkFBS2IsU0FBTCxHQUFpQixJQUFqQjtBQUNEO0FBQ0Qsa0JBQUd3QyxLQUFLQyxNQUFMLElBQWUsQ0FBbEIsRUFBcUI7QUFDbkI1QixxQkFBS1osU0FBTCxHQUFpQixJQUFqQjtBQUNEO0FBQ0YsYUFWRDtBQVdBWSxpQkFBS0ksTUFBTDtBQUNEO0FBQ0Y7QUFwQlUsT0FBYjtBQXNCRDs7OztFQWhJNkIsZUFBS3lCLEk7O2tCQUFoQnBELEUiLCJmaWxlIjoibXkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE15IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfkuKrkurrkuK3lv4MnXG4gIH1cbiAgZGF0YSA9IHtcbiAgICB1c2VySW5mbzogbnVsbCxcbiAgICB1c2VyTW9iaWxlOiAnJyxcbiAgICBhcGlVc2VySW5mb01hcDogbnVsbCxcbiAgICBzY29yZTogMCxcbiAgICBiYWxhbmNlOiAwLFxuICAgIHRvcGF5OiBmYWxzZSxcbiAgICB0b3JlY2VpdmU6IGZhbHNlLFxuICAgIHRvY29tbWVudDogZmFsc2VcbiAgfVxuICBvbkxvYWQoKSB7XG4gICAgdGhpcy5nZXRVc2VySW5mbygpXG4gICAgdGhpcy5nZXRVc2VyQXBpSW5mbygpXG4gICAgdGhpcy5nZXRVc2VyQW1vdW50KClcbiAgICB0aGlzLnJlcXVlc3RBbGwoKVxuICB9XG4gIG1ldGhvZHMgPSB7XG4gICAgdG9PcmRlckxpc3QoaW5kZXgpIHtcbiAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICB1cmw6ICcvcGFnZXMvb3JkZXItbGlzdD9pbmRleD0nICsgaW5kZXhcbiAgICAgIH0pXG4gICAgfVxuICB9XG4gIGdldFVzZXJJbmZvIChjYikge1xuICAgIGNvbnN0IHRoYXQgPSB0aGlzXG4gICAgd3gubG9naW4oe1xuICAgICAgc3VjY2VzczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHd4LmdldFVzZXJJbmZvKHtcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgIHRoYXQudXNlckluZm8gPSByZXMudXNlckluZm9cbiAgICAgICAgICAgIHRoYXQuJGFwcGx5KClcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSlcbiAgfVxuICBnZXRVc2VyQXBpSW5mbyAoKSB7XG4gICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgIHd4LnJlcXVlc3Qoe1xuICAgICAgdXJsOiAnaHR0cHM6Ly9hcGkuaXQxMjAuY2MvJyArIHRoYXQuJHBhcmVudC5nbG9iYWxEYXRhLnN1YkRvbWFpbiArICcvdXNlci9kZXRhaWwnLFxuICAgICAgZGF0YToge1xuICAgICAgICB0b2tlbjogdGhhdC4kcGFyZW50Lmdsb2JhbERhdGEudG9rZW5cbiAgICAgIH0sXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgIGlmIChyZXMuZGF0YS5jb2RlID09IDApIHtcbiAgICAgICAgICB0aGF0LmFwaVVzZXJJbmZvTWFwID0gcmVzLmRhdGEuZGF0YSxcbiAgICAgICAgICB0aGF0LnVzZXJNb2JpbGUgPSByZXMuZGF0YS5kYXRhLmJhc2UubW9iaWxlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICB9XG4gIGdldFVzZXJBbW91bnQgKCkge1xuICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICB3eC5yZXF1ZXN0KHtcbiAgICAgIHVybDogJ2h0dHBzOi8vYXBpLml0MTIwLmNjLycgKyB0aGF0LiRwYXJlbnQuZ2xvYmFsRGF0YS5zdWJEb21haW4gKyAnL3VzZXIvYW1vdW50JyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgdG9rZW46IHRoYXQuJHBhcmVudC5nbG9iYWxEYXRhLnRva2VuXG4gICAgICB9LFxuICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICBpZiAocmVzLmRhdGEuY29kZSA9PSAwKSB7XG4gICAgICAgICAgdGhhdC5zY29yZSA9IHJlcy5kYXRhLmRhdGEuc2NvcmVcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gIH1cbiAgZ2V0UGhvbmVOdW1iZXIgKGUpIHtcbiAgICBpZiAoIWUuZGV0YWlsLmVyck1zZyB8fCBlLmRldGFpbC5lcnJNc2cgIT0gXCJnZXRQaG9uZU51bWJlcjpva1wiKSB7XG4gICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgIGNvbnRlbnQ6ICfml6Dms5Xojrflj5bmiYvmnLrlj7fnoIEnLFxuICAgICAgICBzaG93Q2FuY2VsOiBmYWxzZVxuICAgICAgfSlcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgIHd4LnJlcXVlc3Qoe1xuICAgICAgdXJsOiAnaHR0cHM6Ly9hcGkuaXQxMjAuY2MvJyArIHRoYXQuJHBhcmVudC5nbG9iYWxEYXRhLnN1YkRvbWFpbiArICcvdXNlci93eGFwcC9iaW5kTW9iaWxlJyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgdG9rZW46IHRoYXQuJHBhcmVudC5nbG9iYWxEYXRhLnRva2VuLFxuICAgICAgICBlbmNyeXB0ZWREYXRhOiBlLmRldGFpbC5lbmNyeXB0ZWREYXRhLFxuICAgICAgICBpdjogZS5kZXRhaWwuaXZcbiAgICAgIH0sXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgIGlmIChyZXMuZGF0YS5jb2RlID09IDApIHtcbiAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgdGl0bGU6ICfnu5HlrprmiJDlip8nLFxuICAgICAgICAgICAgaWNvbjogJ3N1Y2Nlc3MnLFxuICAgICAgICAgICAgZHVyYXRpb246IDIwMDBcbiAgICAgICAgICB9KVxuICAgICAgICAgIHRoYXQuZ2V0VXNlckFwaUluZm8oKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgICAgICAgY29udGVudDogJ+e7keWumuWksei0pScsXG4gICAgICAgICAgICBzaG93Q2FuY2VsOiBmYWxzZVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICB9XG4gIHJlcXVlc3RBbGwgKCkge1xuICAgIGNvbnN0IHRoYXQgPSB0aGlzXG4gICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgIHVybDogJ2h0dHBzOi8vYXBpLml0MTIwLmNjLycgKyB0aGF0LiRwYXJlbnQuZ2xvYmFsRGF0YS5zdWJEb21haW4gKyAnL29yZGVyL2xpc3QnLFxuICAgICAgZGF0YToge1xuICAgICAgICB0b2tlbjogdGhhdC4kcGFyZW50Lmdsb2JhbERhdGEudG9rZW4sXG4gICAgICB9LFxuICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICBpZihyZXMuZGF0YS5jb2RlID09IDApIHtcbiAgICAgICAgICByZXMuZGF0YS5kYXRhLm9yZGVyTGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBpZihpdGVtLnN0YXR1cyA9PSAwKSB7XG4gICAgICAgICAgICAgIHRoYXQudG9wYXkgPSB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihpdGVtLnN0YXR1cyA9PSAyKSB7XG4gICAgICAgICAgICAgIHRoYXQudG9yZWNlaXZlID0gdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoaXRlbS5zdGF0dXMgPT0gMykge1xuICAgICAgICAgICAgICB0aGF0LnRvY29tbWVudCA9IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICAgIHRoYXQuJGFwcGx5KClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gIH1cbn1cbiJdfQ==