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
    key: 'onShow',
    value: function onShow() {
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm15LmpzIl0sIm5hbWVzIjpbIk15IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJ1c2VySW5mbyIsInVzZXJNb2JpbGUiLCJhcGlVc2VySW5mb01hcCIsInNjb3JlIiwiYmFsYW5jZSIsInRvcGF5IiwidG9yZWNlaXZlIiwidG9jb21tZW50IiwibWV0aG9kcyIsInRvT3JkZXJMaXN0IiwiaW5kZXgiLCJ3eCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJnZXRVc2VySW5mbyIsImdldFVzZXJBcGlJbmZvIiwiZ2V0VXNlckFtb3VudCIsInJlcXVlc3RBbGwiLCJjYiIsInRoYXQiLCJsb2dpbiIsInN1Y2Nlc3MiLCJyZXMiLCIkYXBwbHkiLCJyZXF1ZXN0IiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJzdWJEb21haW4iLCJ0b2tlbiIsImNvZGUiLCJiYXNlIiwibW9iaWxlIiwiZSIsImRldGFpbCIsImVyck1zZyIsInNob3dNb2RhbCIsInRpdGxlIiwiY29udGVudCIsInNob3dDYW5jZWwiLCJlbmNyeXB0ZWREYXRhIiwiaXYiLCJzaG93VG9hc3QiLCJpY29uIiwiZHVyYXRpb24iLCJvcmRlckxpc3QiLCJmb3JFYWNoIiwiaXRlbSIsInN0YXR1cyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLEU7Ozs7Ozs7Ozs7Ozs7OzhLQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1RDLEksR0FBTztBQUNMQyxnQkFBVSxJQURMO0FBRUxDLGtCQUFZLEVBRlA7QUFHTEMsc0JBQWdCLElBSFg7QUFJTEMsYUFBTyxDQUpGO0FBS0xDLGVBQVMsQ0FMSjtBQU1MQyxhQUFPLEtBTkY7QUFPTEMsaUJBQVcsS0FQTjtBQVFMQyxpQkFBVztBQVJOLEssUUFvQlBDLE8sR0FBVTtBQUNSQyxpQkFEUSx1QkFDSUMsS0FESixFQUNXO0FBQ2pCQyxXQUFHQyxVQUFILENBQWM7QUFDWkMsZUFBSyw2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QUFHd0IsU0FBSCxDQUFhO0FBQ1hDLHFCQUFPLElBREk7QUFFWEMsdUJBQVMsTUFGRTtBQUdYQywwQkFBWTtBQUhELGFBQWI7QUFLRDtBQUNGO0FBdEJRLE9BQVg7QUF3QkQ7OztpQ0FDYTtBQUNaLFVBQU1uQixPQUFPLElBQWI7QUFDQSxxQkFBS0ssT0FBTCxDQUFhO0FBQ1hYLGFBQUssMEJBQTBCTSxLQUFLTSxPQUFMLENBQWFDLFVBQWIsQ0FBd0JDLFNBQWxELEdBQThELGFBRHhEO0FBRVg1QixjQUFNO0FBQ0o2QixpQkFBT1QsS0FBS00sT0FBTCxDQUFhQyxVQUFiLENBQXdCRTtBQUQzQixTQUZLO0FBS1hQLGlCQUFTLGlCQUFVQyxHQUFWLEVBQWU7QUFDdEIsY0FBR0EsSUFBSXZCLElBQUosQ0FBUzhCLElBQVQsSUFBaUIsQ0FBcEIsRUFBdUI7QUFDckJQLGdCQUFJdkIsSUFBSixDQUFTQSxJQUFULENBQWM2QyxTQUFkLENBQXdCQyxPQUF4QixDQUFnQyxVQUFDQyxJQUFELEVBQVU7QUFDeEMsa0JBQUdBLEtBQUtDLE1BQUwsSUFBZSxDQUFsQixFQUFxQjtBQUNuQjVCLHFCQUFLZCxLQUFMLEdBQWEsSUFBYjtBQUNEO0FBQ0Qsa0JBQUd5QyxLQUFLQyxNQUFMLElBQWUsQ0FBbEIsRUFBcUI7QUFDbkI1QixxQkFBS2IsU0FBTCxHQUFpQixJQUFqQjtBQUNEO0FBQ0Qsa0JBQUd3QyxLQUFLQyxNQUFMLElBQWUsQ0FBbEIsRUFBcUI7QUFDbkI1QixxQkFBS1osU0FBTCxHQUFpQixJQUFqQjtBQUNEO0FBQ0YsYUFWRDtBQVdBWSxpQkFBS0ksTUFBTDtBQUNEO0FBQ0Y7QUFwQlUsT0FBYjtBQXNCRDs7OztFQXBJNkIsZUFBS3lCLEk7O2tCQUFoQnBELEUiLCJmaWxlIjoibXkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE15IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfkuKrkurrkuK3lv4MnXG4gIH1cbiAgZGF0YSA9IHtcbiAgICB1c2VySW5mbzogbnVsbCxcbiAgICB1c2VyTW9iaWxlOiAnJyxcbiAgICBhcGlVc2VySW5mb01hcDogbnVsbCxcbiAgICBzY29yZTogMCxcbiAgICBiYWxhbmNlOiAwLFxuICAgIHRvcGF5OiBmYWxzZSxcbiAgICB0b3JlY2VpdmU6IGZhbHNlLFxuICAgIHRvY29tbWVudDogZmFsc2VcbiAgfVxuICBvbkxvYWQoKSB7XG4gICAgdGhpcy5nZXRVc2VySW5mbygpXG4gICAgdGhpcy5nZXRVc2VyQXBpSW5mbygpXG4gICAgdGhpcy5nZXRVc2VyQW1vdW50KClcbiAgICB0aGlzLnJlcXVlc3RBbGwoKVxuICB9XG4gIG9uU2hvdygpIHtcbiAgICB0aGlzLmdldFVzZXJBbW91bnQoKVxuICAgIHRoaXMucmVxdWVzdEFsbCgpXG4gIH1cbiAgbWV0aG9kcyA9IHtcbiAgICB0b09yZGVyTGlzdChpbmRleCkge1xuICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgIHVybDogJy9wYWdlcy9vcmRlci1saXN0P2luZGV4PScgKyBpbmRleFxuICAgICAgfSlcbiAgICB9XG4gIH1cbiAgZ2V0VXNlckluZm8gKGNiKSB7XG4gICAgY29uc3QgdGhhdCA9IHRoaXNcbiAgICB3eC5sb2dpbih7XG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgd3guZ2V0VXNlckluZm8oe1xuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgdGhhdC51c2VySW5mbyA9IHJlcy51c2VySW5mb1xuICAgICAgICAgICAgdGhhdC4kYXBwbHkoKVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9KVxuICB9XG4gIGdldFVzZXJBcGlJbmZvICgpIHtcbiAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgd3gucmVxdWVzdCh7XG4gICAgICB1cmw6ICdodHRwczovL2FwaS5pdDEyMC5jYy8nICsgdGhhdC4kcGFyZW50Lmdsb2JhbERhdGEuc3ViRG9tYWluICsgJy91c2VyL2RldGFpbCcsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIHRva2VuOiB0aGF0LiRwYXJlbnQuZ2xvYmFsRGF0YS50b2tlblxuICAgICAgfSxcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgaWYgKHJlcy5kYXRhLmNvZGUgPT0gMCkge1xuICAgICAgICAgIHRoYXQuYXBpVXNlckluZm9NYXAgPSByZXMuZGF0YS5kYXRhLFxuICAgICAgICAgIHRoYXQudXNlck1vYmlsZSA9IHJlcy5kYXRhLmRhdGEuYmFzZS5tb2JpbGVcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gIH1cbiAgZ2V0VXNlckFtb3VudCAoKSB7XG4gICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgIHd4LnJlcXVlc3Qoe1xuICAgICAgdXJsOiAnaHR0cHM6Ly9hcGkuaXQxMjAuY2MvJyArIHRoYXQuJHBhcmVudC5nbG9iYWxEYXRhLnN1YkRvbWFpbiArICcvdXNlci9hbW91bnQnLFxuICAgICAgZGF0YToge1xuICAgICAgICB0b2tlbjogdGhhdC4kcGFyZW50Lmdsb2JhbERhdGEudG9rZW5cbiAgICAgIH0sXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgIGlmIChyZXMuZGF0YS5jb2RlID09IDApIHtcbiAgICAgICAgICB0aGF0LnNjb3JlID0gcmVzLmRhdGEuZGF0YS5zY29yZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgfVxuICBnZXRQaG9uZU51bWJlciAoZSkge1xuICAgIGlmICghZS5kZXRhaWwuZXJyTXNnIHx8IGUuZGV0YWlsLmVyck1zZyAhPSBcImdldFBob25lTnVtYmVyOm9rXCIpIHtcbiAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgY29udGVudDogJ+aXoOazleiOt+WPluaJi+acuuWPt+eggScsXG4gICAgICAgIHNob3dDYW5jZWw6IGZhbHNlXG4gICAgICB9KVxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgd3gucmVxdWVzdCh7XG4gICAgICB1cmw6ICdodHRwczovL2FwaS5pdDEyMC5jYy8nICsgdGhhdC4kcGFyZW50Lmdsb2JhbERhdGEuc3ViRG9tYWluICsgJy91c2VyL3d4YXBwL2JpbmRNb2JpbGUnLFxuICAgICAgZGF0YToge1xuICAgICAgICB0b2tlbjogdGhhdC4kcGFyZW50Lmdsb2JhbERhdGEudG9rZW4sXG4gICAgICAgIGVuY3J5cHRlZERhdGE6IGUuZGV0YWlsLmVuY3J5cHRlZERhdGEsXG4gICAgICAgIGl2OiBlLmRldGFpbC5pdlxuICAgICAgfSxcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgaWYgKHJlcy5kYXRhLmNvZGUgPT0gMCkge1xuICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICB0aXRsZTogJ+e7keWumuaIkOWKnycsXG4gICAgICAgICAgICBpY29uOiAnc3VjY2VzcycsXG4gICAgICAgICAgICBkdXJhdGlvbjogMjAwMFxuICAgICAgICAgIH0pXG4gICAgICAgICAgdGhhdC5nZXRVc2VyQXBpSW5mbygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgICBjb250ZW50OiAn57uR5a6a5aSx6LSlJyxcbiAgICAgICAgICAgIHNob3dDYW5jZWw6IGZhbHNlXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gIH1cbiAgcmVxdWVzdEFsbCAoKSB7XG4gICAgY29uc3QgdGhhdCA9IHRoaXNcbiAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgdXJsOiAnaHR0cHM6Ly9hcGkuaXQxMjAuY2MvJyArIHRoYXQuJHBhcmVudC5nbG9iYWxEYXRhLnN1YkRvbWFpbiArICcvb3JkZXIvbGlzdCcsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIHRva2VuOiB0aGF0LiRwYXJlbnQuZ2xvYmFsRGF0YS50b2tlbixcbiAgICAgIH0sXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgIGlmKHJlcy5kYXRhLmNvZGUgPT0gMCkge1xuICAgICAgICAgIHJlcy5kYXRhLmRhdGEub3JkZXJMaXN0LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIGlmKGl0ZW0uc3RhdHVzID09IDApIHtcbiAgICAgICAgICAgICAgdGhhdC50b3BheSA9IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKGl0ZW0uc3RhdHVzID09IDIpIHtcbiAgICAgICAgICAgICAgdGhhdC50b3JlY2VpdmUgPSB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihpdGVtLnN0YXR1cyA9PSAzKSB7XG4gICAgICAgICAgICAgIHRoYXQudG9jb21tZW50ID0gdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgICAgdGhhdC4kYXBwbHkoKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgfVxufVxuIl19