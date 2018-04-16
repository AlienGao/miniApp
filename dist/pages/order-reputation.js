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

var OrderReputation = function (_wepy$page) {
  _inherits(OrderReputation, _wepy$page);

  function OrderReputation() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, OrderReputation);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = OrderReputation.__proto__ || Object.getPrototypeOf(OrderReputation)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '订单评价'
    }, _this.data = {
      goods: [],
      order: null
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(OrderReputation, [{
    key: 'onLoad',
    value: function onLoad(data) {
      var goods = JSON.parse(data.goods);
      var order = JSON.parse(data.order);
      this.goods = goods;
      this.order = order;
    }
  }, {
    key: 'submitReputation',
    value: function submitReputation(e) {
      wx.showLoading();
      var reputation = [];
      var that = this;
      this.goods.forEach(function (item) {
        reputation.push({
          id: item.id,
          reputation: e.detail.value['goodReputation'],
          remark: e.detail.value['goodReputationRemark']
        });
      });
      _wepy2.default.request({
        url: 'https://api.it120.cc/' + that.$parent.globalData.subDomain + '/order/reputation',
        data: {
          postJsonString: {
            token: that.$parent.globalData.token,
            orderId: that.order.id,
            reputations: reputation
          }
        },
        success: function success(res) {
          wx.hideLoading();
          if (res.data.code == 0) {
            wx.navigateTo({
              url: '/pages/order-list?index=' + 3
            });
            wx.hideLoading();
          }
        }
      });
    }
  }]);

  return OrderReputation;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(OrderReputation , 'pages/order-reputation'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVyLXJlcHV0YXRpb24uanMiXSwibmFtZXMiOlsiT3JkZXJSZXB1dGF0aW9uIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJnb29kcyIsIm9yZGVyIiwiSlNPTiIsInBhcnNlIiwiZSIsInd4Iiwic2hvd0xvYWRpbmciLCJyZXB1dGF0aW9uIiwidGhhdCIsImZvckVhY2giLCJpdGVtIiwicHVzaCIsImlkIiwiZGV0YWlsIiwidmFsdWUiLCJyZW1hcmsiLCJyZXF1ZXN0IiwidXJsIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJzdWJEb21haW4iLCJwb3N0SnNvblN0cmluZyIsInRva2VuIiwib3JkZXJJZCIsInJlcHV0YXRpb25zIiwic3VjY2VzcyIsInJlcyIsImhpZGVMb2FkaW5nIiwiY29kZSIsIm5hdmlnYXRlVG8iLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxlOzs7Ozs7Ozs7Ozs7Ozt3TUFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdUQyxJLEdBQU87QUFDTEMsYUFBTyxFQURGO0FBRUxDLGFBQU87QUFGRixLOzs7OzsyQkFJQUYsSSxFQUFNO0FBQ1gsVUFBTUMsUUFBUUUsS0FBS0MsS0FBTCxDQUFXSixLQUFLQyxLQUFoQixDQUFkO0FBQ0EsVUFBTUMsUUFBUUMsS0FBS0MsS0FBTCxDQUFXSixLQUFLRSxLQUFoQixDQUFkO0FBQ0EsV0FBS0QsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsV0FBS0MsS0FBTCxHQUFhQSxLQUFiO0FBQ0Q7OztxQ0FDaUJHLEMsRUFBRztBQUNuQkMsU0FBR0MsV0FBSDtBQUNBLFVBQU1DLGFBQWEsRUFBbkI7QUFDQSxVQUFNQyxPQUFPLElBQWI7QUFDQSxXQUFLUixLQUFMLENBQVdTLE9BQVgsQ0FBbUIsVUFBQ0MsSUFBRCxFQUFVO0FBQzNCSCxtQkFBV0ksSUFBWCxDQUFnQjtBQUNkQyxjQUFJRixLQUFLRSxFQURLO0FBRWRMLHNCQUFZSCxFQUFFUyxNQUFGLENBQVNDLEtBQVQsQ0FBZSxnQkFBZixDQUZFO0FBR2RDLGtCQUFRWCxFQUFFUyxNQUFGLENBQVNDLEtBQVQsQ0FBZSxzQkFBZjtBQUhNLFNBQWhCO0FBS0QsT0FORDtBQU9BLHFCQUFLRSxPQUFMLENBQWE7QUFDWEMsYUFBSywwQkFBMEJULEtBQUtVLE9BQUwsQ0FBYUMsVUFBYixDQUF3QkMsU0FBbEQsR0FBOEQsbUJBRHhEO0FBRVhyQixjQUFNO0FBQ0pzQiwwQkFBZ0I7QUFDZEMsbUJBQU9kLEtBQUtVLE9BQUwsQ0FBYUMsVUFBYixDQUF3QkcsS0FEakI7QUFFZEMscUJBQVNmLEtBQUtQLEtBQUwsQ0FBV1csRUFGTjtBQUdkWSx5QkFBYWpCO0FBSEM7QUFEWixTQUZLO0FBU1hrQixpQkFBUyxpQkFBQ0MsR0FBRCxFQUFTO0FBQ2hCckIsYUFBR3NCLFdBQUg7QUFDQSxjQUFJRCxJQUFJM0IsSUFBSixDQUFTNkIsSUFBVCxJQUFpQixDQUFyQixFQUF3QjtBQUN0QnZCLGVBQUd3QixVQUFILENBQWM7QUFDWlosbUJBQUssNkJBQTZCO0FBRHRCLGFBQWQ7QUFHQVosZUFBR3NCLFdBQUg7QUFDRDtBQUNGO0FBakJVLE9BQWI7QUFtQkQ7Ozs7RUE1QzBDLGVBQUtHLEk7O2tCQUE3QmxDLGUiLCJmaWxlIjoib3JkZXItcmVwdXRhdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9yZGVyUmVwdXRhdGlvbiBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn6K6i5Y2V6K+E5Lu3J1xuICB9XG4gIGRhdGEgPSB7XG4gICAgZ29vZHM6IFtdLFxuICAgIG9yZGVyOiBudWxsXG4gIH1cbiAgb25Mb2FkKGRhdGEpIHtcbiAgICBjb25zdCBnb29kcyA9IEpTT04ucGFyc2UoZGF0YS5nb29kcylcbiAgICBjb25zdCBvcmRlciA9IEpTT04ucGFyc2UoZGF0YS5vcmRlcilcbiAgICB0aGlzLmdvb2RzID0gZ29vZHNcbiAgICB0aGlzLm9yZGVyID0gb3JkZXJcbiAgfVxuICBzdWJtaXRSZXB1dGF0aW9uIChlKSB7XG4gICAgd3guc2hvd0xvYWRpbmcoKVxuICAgIGNvbnN0IHJlcHV0YXRpb24gPSBbXVxuICAgIGNvbnN0IHRoYXQgPSB0aGlzXG4gICAgdGhpcy5nb29kcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICByZXB1dGF0aW9uLnB1c2goe1xuICAgICAgICBpZDogaXRlbS5pZCxcbiAgICAgICAgcmVwdXRhdGlvbjogZS5kZXRhaWwudmFsdWVbJ2dvb2RSZXB1dGF0aW9uJ10sXG4gICAgICAgIHJlbWFyazogZS5kZXRhaWwudmFsdWVbJ2dvb2RSZXB1dGF0aW9uUmVtYXJrJ11cbiAgICAgIH0pXG4gICAgfSlcbiAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgdXJsOiAnaHR0cHM6Ly9hcGkuaXQxMjAuY2MvJyArIHRoYXQuJHBhcmVudC5nbG9iYWxEYXRhLnN1YkRvbWFpbiArICcvb3JkZXIvcmVwdXRhdGlvbicsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIHBvc3RKc29uU3RyaW5nOiB7XG4gICAgICAgICAgdG9rZW46IHRoYXQuJHBhcmVudC5nbG9iYWxEYXRhLnRva2VuLFxuICAgICAgICAgIG9yZGVySWQ6IHRoYXQub3JkZXIuaWQsXG4gICAgICAgICAgcmVwdXRhdGlvbnM6IHJlcHV0YXRpb25cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgaWYgKHJlcy5kYXRhLmNvZGUgPT0gMCkge1xuICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgdXJsOiAnL3BhZ2VzL29yZGVyLWxpc3Q/aW5kZXg9JyArIDNcbiAgICAgICAgICB9KVxuICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gIH1cbn1cbiJdfQ==