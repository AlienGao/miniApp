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

var MyTicket = function (_wepy$page) {
  _inherits(MyTicket, _wepy$page);

  function MyTicket() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, MyTicket);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = MyTicket.__proto__ || Object.getPrototypeOf(MyTicket)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '我的优惠券'
    }, _this.data = {
      tickets: []
    }, _this.methods = {
      chooseTicket: function chooseTicket(item) {
        wx.setStorage({
          key: 'couponsId',
          data: item.id
        });
        wx.setStorage({
          key: 'couponsMoney',
          data: item.money
        });
        wx.navigateBack({});
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(MyTicket, [{
    key: 'onLoad',
    value: function onLoad(e) {
      var that = this;
      _wepy2.default.request({
        url: 'https://api.it120.cc/' + that.$parent.globalData.subDomain + '/discounts/my',
        data: {
          token: that.$parent.globalData.token,
          status: 0
        },
        success: function success(res) {
          that.tickets = res.data.data;
          that.$apply();
        }
      });
      if (e && e == 'pay') {
        that.from = 'pay';
      } else {
        that.from = '';
      }
    }
  }]);

  return MyTicket;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(MyTicket , 'pages/my-ticket'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm15LXRpY2tldC5qcyJdLCJuYW1lcyI6WyJNeVRpY2tldCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwidGlja2V0cyIsIm1ldGhvZHMiLCJjaG9vc2VUaWNrZXQiLCJpdGVtIiwid3giLCJzZXRTdG9yYWdlIiwia2V5IiwiaWQiLCJtb25leSIsIm5hdmlnYXRlQmFjayIsImUiLCJ0aGF0IiwicmVxdWVzdCIsInVybCIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwic3ViRG9tYWluIiwidG9rZW4iLCJzdGF0dXMiLCJzdWNjZXNzIiwicmVzIiwiJGFwcGx5IiwiZnJvbSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLFE7Ozs7Ozs7Ozs7Ozs7OzBMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1RDLEksR0FBTztBQUNMQyxlQUFTO0FBREosSyxRQXNCUEMsTyxHQUFVO0FBQ1JDLGtCQURRLHdCQUNLQyxJQURMLEVBQ1c7QUFDakJDLFdBQUdDLFVBQUgsQ0FBYztBQUNaQyxlQUFLLFdBRE87QUFFWlAsZ0JBQU1JLEtBQUtJO0FBRkMsU0FBZDtBQUlBSCxXQUFHQyxVQUFILENBQWM7QUFDWkMsZUFBSyxjQURPO0FBRVpQLGdCQUFNSSxLQUFLSztBQUZDLFNBQWQ7QUFJQUosV0FBR0ssWUFBSCxDQUFnQixFQUFoQjtBQUNEO0FBWE8sSzs7Ozs7MkJBbkJIQyxDLEVBQUc7QUFDUixVQUFNQyxPQUFPLElBQWI7QUFDQSxxQkFBS0MsT0FBTCxDQUFhO0FBQ1hDLGFBQUssMEJBQTBCRixLQUFLRyxPQUFMLENBQWFDLFVBQWIsQ0FBd0JDLFNBQWxELEdBQThELGVBRHhEO0FBRVhqQixjQUFNO0FBQ0prQixpQkFBT04sS0FBS0csT0FBTCxDQUFhQyxVQUFiLENBQXdCRSxLQUQzQjtBQUVKQyxrQkFBUTtBQUZKLFNBRks7QUFNWEMsaUJBQVMsaUJBQVVDLEdBQVYsRUFBZTtBQUN0QlQsZUFBS1gsT0FBTCxHQUFlb0IsSUFBSXJCLElBQUosQ0FBU0EsSUFBeEI7QUFDQVksZUFBS1UsTUFBTDtBQUNEO0FBVFUsT0FBYjtBQVdBLFVBQUdYLEtBQUtBLEtBQUssS0FBYixFQUFvQjtBQUNsQkMsYUFBS1csSUFBTCxHQUFZLEtBQVo7QUFDRCxPQUZELE1BRU87QUFDTFgsYUFBS1csSUFBTCxHQUFZLEVBQVo7QUFDRDtBQUNGOzs7O0VBekJtQyxlQUFLQyxJOztrQkFBdEIzQixRIiwiZmlsZSI6Im15LXRpY2tldC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTXlUaWNrZXQgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+aIkeeahOS8mOaDoOWIuCdcbiAgfVxuICBkYXRhID0ge1xuICAgIHRpY2tldHM6IFtdXG4gIH1cbiAgb25Mb2FkKGUpIHtcbiAgICBjb25zdCB0aGF0ID0gdGhpc1xuICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICB1cmw6ICdodHRwczovL2FwaS5pdDEyMC5jYy8nICsgdGhhdC4kcGFyZW50Lmdsb2JhbERhdGEuc3ViRG9tYWluICsgJy9kaXNjb3VudHMvbXknLFxuICAgICAgZGF0YToge1xuICAgICAgICB0b2tlbjogdGhhdC4kcGFyZW50Lmdsb2JhbERhdGEudG9rZW4sXG4gICAgICAgIHN0YXR1czogMFxuICAgICAgfSxcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgdGhhdC50aWNrZXRzID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICB0aGF0LiRhcHBseSgpXG4gICAgICB9XG4gICAgfSlcbiAgICBpZihlICYmIGUgPT0gJ3BheScpIHtcbiAgICAgIHRoYXQuZnJvbSA9ICdwYXknXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoYXQuZnJvbSA9ICcnXG4gICAgfVxuICB9XG4gIG1ldGhvZHMgPSB7XG4gICAgY2hvb3NlVGlja2V0KGl0ZW0pIHtcbiAgICAgIHd4LnNldFN0b3JhZ2Uoe1xuICAgICAgICBrZXk6ICdjb3Vwb25zSWQnLFxuICAgICAgICBkYXRhOiBpdGVtLmlkXG4gICAgICB9KVxuICAgICAgd3guc2V0U3RvcmFnZSh7XG4gICAgICAgIGtleTogJ2NvdXBvbnNNb25leScsXG4gICAgICAgIGRhdGE6IGl0ZW0ubW9uZXlcbiAgICAgIH0pXG4gICAgICB3eC5uYXZpZ2F0ZUJhY2soe30pXG4gICAgfVxuICB9XG59XG4iXX0=