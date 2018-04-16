'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _wepyComToast = require('./../npm/wepy-com-toast/toast.js');

var _wepyComToast2 = _interopRequireDefault(_wepyComToast);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NewMember = function (_wepy$page) {
  _inherits(NewMember, _wepy$page);

  function NewMember() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, NewMember);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = NewMember.__proto__ || Object.getPrototypeOf(NewMember)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '领券中心',
      usingComponents: {
        'wxc-tab': '../../packages/@minui/wxc-tab/dist/index',
        'wxc-tab-panel': '../../packages/@minui/wxc-tab/dist/panel'
      }
    }, _this.components = {
      toast: _wepyComToast2.default
    }, _this.data = {
      receiveMoneny: [],
      scoretoMoneny: [],
      hasReceive: false,
      tabs: []
    }, _this.methods = {
      tapButton: function tapButton(req) {
        var that = this;
        if (this.$parent.globalData.token) {
          _wepy2.default.request({
            url: 'https://api.it120.cc/' + that.$parent.globalData.subDomain + '/discounts/fetch',
            data: {
              id: req,
              token: that.$parent.globalData.token
            },
            success: function success(res) {
              if (res.data.code == 20001 || res.data.code == 20002) {
                wx.showModal({
                  title: '错误',
                  content: '来晚了',
                  showCancel: false
                });
                return;
              }
              if (res.data.code == 20003) {
                wx.showModal({
                  title: '错误',
                  content: '你领过了，别贪心哦~',
                  showCancel: false
                });
                return;
              }
              if (res.data.code == 30001) {
                wx.showModal({
                  title: '错误',
                  content: '您的积分不足',
                  showCancel: false
                });
                return;
              }
              if (res.data.code == 20004) {
                wx.showModal({
                  title: '错误',
                  content: '已过期~',
                  showCancel: false
                });
                return;
              }
              if (res.data.code == 0) {
                that.$invoke('toast', 'show', {
                  title: '领取成功，赶紧去下单吧~'
                });
              } else {
                wx.showModal({
                  title: '错误',
                  content: res.data.msg,
                  showCancel: false
                });
              }
            }
          });
        }
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(NewMember, [{
    key: 'onLoad',
    value: function onLoad() {
      var that = this;
      that.tabs = [];
      that.receiveMoneny = [];
      that.scoretoMoneny = [];
      _wepy2.default.request({
        url: 'https://api.it120.cc/' + that.$parent.globalData.subDomain + '/discounts/coupons',
        success: function success(res) {
          res.data.data.map(function (item) {
            if (item.needScore == 0) {
              that.receiveMoneny.push(item);
            } else if (item.needScore > 0 && item.needSignedContinuous == 0) {
              that.scoretoMoneny.push(item);
            }
            return true;
          });
          that.tabs.push({
            title: '领取中心',
            content: that.receiveMoneny
          }, {
            title: '积分兑换',
            content: that.scoretoMoneny
          });
          that.$apply();
        }
      });
    }
  }]);

  return NewMember;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(NewMember , 'pages/newMember'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5ld01lbWJlci5qcyJdLCJuYW1lcyI6WyJOZXdNZW1iZXIiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwidXNpbmdDb21wb25lbnRzIiwiY29tcG9uZW50cyIsInRvYXN0IiwiZGF0YSIsInJlY2VpdmVNb25lbnkiLCJzY29yZXRvTW9uZW55IiwiaGFzUmVjZWl2ZSIsInRhYnMiLCJtZXRob2RzIiwidGFwQnV0dG9uIiwicmVxIiwidGhhdCIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwidG9rZW4iLCJyZXF1ZXN0IiwidXJsIiwic3ViRG9tYWluIiwiaWQiLCJzdWNjZXNzIiwicmVzIiwiY29kZSIsInd4Iiwic2hvd01vZGFsIiwidGl0bGUiLCJjb250ZW50Iiwic2hvd0NhbmNlbCIsIiRpbnZva2UiLCJtc2ciLCJtYXAiLCJpdGVtIiwibmVlZFNjb3JlIiwicHVzaCIsIm5lZWRTaWduZWRDb250aW51b3VzIiwiJGFwcGx5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxTOzs7Ozs7Ozs7Ozs7Ozs0TEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0IsTUFEakI7QUFFUEMsdUJBQWlCO0FBQ2YsbUJBQVcsMENBREk7QUFFZix5QkFBaUI7QUFGRjtBQUZWLEssUUFPVEMsVSxHQUFhO0FBQ1hDO0FBRFcsSyxRQUdiQyxJLEdBQU87QUFDTEMscUJBQWUsRUFEVjtBQUVMQyxxQkFBZSxFQUZWO0FBR0xDLGtCQUFZLEtBSFA7QUFJTEMsWUFBTTtBQUpELEssUUFpQ1BDLE8sR0FBVTtBQUNSQyxlQURRLHFCQUNFQyxHQURGLEVBQ087QUFDYixZQUFNQyxPQUFPLElBQWI7QUFDQSxZQUFHLEtBQUtDLE9BQUwsQ0FBYUMsVUFBYixDQUF3QkMsS0FBM0IsRUFBa0M7QUFDaEMseUJBQUtDLE9BQUwsQ0FBYTtBQUNYQyxpQkFBSywwQkFBMEJMLEtBQUtDLE9BQUwsQ0FBYUMsVUFBYixDQUF3Qkks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TWVtYmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0IFRvYXN0IGZyb20gJ3dlcHktY29tLXRvYXN0J1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOZXdNZW1iZXIgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+mihuWIuOS4reW/gycsXG4gICAgdXNpbmdDb21wb25lbnRzOiB7XG4gICAgICAnd3hjLXRhYic6ICcuLi8uLi9wYWNrYWdlcy9AbWludWkvd3hjLXRhYi9kaXN0L2luZGV4JyxcbiAgICAgICd3eGMtdGFiLXBhbmVsJzogJy4uLy4uL3BhY2thZ2VzL0BtaW51aS93eGMtdGFiL2Rpc3QvcGFuZWwnXG4gICAgfVxuICB9XG4gIGNvbXBvbmVudHMgPSB7XG4gICAgdG9hc3Q6IFRvYXN0XG4gIH1cbiAgZGF0YSA9IHtcbiAgICByZWNlaXZlTW9uZW55OiBbXSxcbiAgICBzY29yZXRvTW9uZW55OiBbXSxcbiAgICBoYXNSZWNlaXZlOiBmYWxzZSxcbiAgICB0YWJzOiBbXVxuICB9XG4gIG9uTG9hZCgpIHtcbiAgICBjb25zdCB0aGF0ID0gdGhpc1xuICAgIHRoYXQudGFicyA9IFtdXG4gICAgdGhhdC5yZWNlaXZlTW9uZW55ID0gW11cbiAgICB0aGF0LnNjb3JldG9Nb25lbnkgPSBbXVxuICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICB1cmw6ICdodHRwczovL2FwaS5pdDEyMC5jYy8nICsgdGhhdC4kcGFyZW50Lmdsb2JhbERhdGEuc3ViRG9tYWluICsgJy9kaXNjb3VudHMvY291cG9ucycsXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgIHJlcy5kYXRhLmRhdGEubWFwKChpdGVtKSA9PiB7XG4gICAgICAgICAgaWYoaXRlbS5uZWVkU2NvcmUgPT0gMCkge1xuICAgICAgICAgICAgdGhhdC5yZWNlaXZlTW9uZW55LnB1c2goaXRlbSlcbiAgICAgICAgICB9IGVsc2UgaWYoaXRlbS5uZWVkU2NvcmUgPiAwICYmIGl0ZW0ubmVlZFNpZ25lZENvbnRpbnVvdXMgPT0gMCkge1xuICAgICAgICAgICAgdGhhdC5zY29yZXRvTW9uZW55LnB1c2goaXRlbSlcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfSlcbiAgICAgICAgdGhhdC50YWJzLnB1c2goe1xuICAgICAgICAgIHRpdGxlOiAn6aKG5Y+W5Lit5b+DJyxcbiAgICAgICAgICBjb250ZW50OiB0aGF0LnJlY2VpdmVNb25lbnlcbiAgICAgICAgfSwge1xuICAgICAgICAgIHRpdGxlOiAn56ev5YiG5YWR5o2iJyxcbiAgICAgICAgICBjb250ZW50OiB0aGF0LnNjb3JldG9Nb25lbnlcbiAgICAgICAgfSlcbiAgICAgICAgdGhhdC4kYXBwbHkoKVxuICAgICAgfVxuICAgIH0pXG4gIH1cbiAgbWV0aG9kcyA9IHtcbiAgICB0YXBCdXR0b24ocmVxKSB7XG4gICAgICBjb25zdCB0aGF0ID0gdGhpc1xuICAgICAgaWYodGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudG9rZW4pIHtcbiAgICAgICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgICAgICB1cmw6ICdodHRwczovL2FwaS5pdDEyMC5jYy8nICsgdGhhdC4kcGFyZW50Lmdsb2JhbERhdGEuc3ViRG9tYWluICsgJy9kaXNjb3VudHMvZmV0Y2gnLFxuICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIGlkOiByZXEsXG4gICAgICAgICAgICB0b2tlbjogdGhhdC4kcGFyZW50Lmdsb2JhbERhdGEudG9rZW5cbiAgICAgICAgICB9LFxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgaWYgKHJlcy5kYXRhLmNvZGUgPT0gMjAwMDEgfHwgcmVzLmRhdGEuY29kZSA9PSAyMDAwMikge1xuICAgICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiAn6ZSZ6K+vJyxcbiAgICAgICAgICAgICAgICBjb250ZW50OiAn5p2l5pma5LqGJyxcbiAgICAgICAgICAgICAgICBzaG93Q2FuY2VsOiBmYWxzZVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocmVzLmRhdGEuY29kZSA9PSAyMDAwMykge1xuICAgICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiAn6ZSZ6K+vJyxcbiAgICAgICAgICAgICAgICBjb250ZW50OiAn5L2g6aKG6L+H5LqG77yM5Yir6LSq5b+D5ZOmficsXG4gICAgICAgICAgICAgICAgc2hvd0NhbmNlbDogZmFsc2VcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHJlcy5kYXRhLmNvZGUgPT0gMzAwMDEpIHtcbiAgICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+mUmeivrycsXG4gICAgICAgICAgICAgICAgY29udGVudDogJ+aCqOeahOenr+WIhuS4jei2sycsXG4gICAgICAgICAgICAgICAgc2hvd0NhbmNlbDogZmFsc2VcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHJlcy5kYXRhLmNvZGUgPT0gMjAwMDQpIHtcbiAgICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+mUmeivrycsXG4gICAgICAgICAgICAgICAgY29udGVudDogJ+W3sui/h+acn34nLFxuICAgICAgICAgICAgICAgIHNob3dDYW5jZWw6IGZhbHNlXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyZXMuZGF0YS5jb2RlID09IDApIHtcbiAgICAgICAgICAgICAgdGhhdC4kaW52b2tlKCd0b2FzdCcsICdzaG93Jywge1xuICAgICAgICAgICAgICAgIHRpdGxlOiAn6aKG5Y+W5oiQ5Yqf77yM6LW257Sn5Y675LiL5Y2V5ZCnfidcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICfplJnor68nLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHJlcy5kYXRhLm1zZyxcbiAgICAgICAgICAgICAgICBzaG93Q2FuY2VsOiBmYWxzZVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgXG59XG4iXX0=