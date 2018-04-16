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

var MyFav = function (_wepy$page) {
  _inherits(MyFav, _wepy$page);

  function MyFav() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, MyFav);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = MyFav.__proto__ || Object.getPrototypeOf(MyFav)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '我的收藏'
    }, _this.data = {
      favs: []
    }, _this.methods = {
      lookDetail: function lookDetail(id) {
        wx.navigateTo({
          url: '/pages/gooddetail?id=' + id
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(MyFav, [{
    key: 'onLoad',
    value: function onLoad() {
      var that = this;
      _wepy2.default.request({
        url: 'https://api.it120.cc/' + that.$parent.globalData.subDomain + '/shop/goods/fav/list',
        data: {
          token: that.$parent.globalData.token
        },
        success: function success(res) {
          if (res.data.code !== 0) {
            that.favs = [];
            that.$apply();
          } else if (res.data.code == 0) {
            that.favs = res.data.data;
            that.$apply();
          }
        }
      });
    }
  }]);

  return MyFav;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(MyFav , 'pages/my-fav'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm15LWZhdi5qcyJdLCJuYW1lcyI6WyJNeUZhdiIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwiZmF2cyIsIm1ldGhvZHMiLCJsb29rRGV0YWlsIiwiaWQiLCJ3eCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJ0aGF0IiwicmVxdWVzdCIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwic3ViRG9tYWluIiwidG9rZW4iLCJzdWNjZXNzIiwicmVzIiwiY29kZSIsIiRhcHBseSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLEs7Ozs7Ozs7Ozs7Ozs7O29MQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1RDLEksR0FBTztBQUNMQyxZQUFNO0FBREQsSyxRQXFCUEMsTyxHQUFVO0FBQ1JDLGdCQURRLHNCQUNHQyxFQURILEVBQ087QUFDYkMsV0FBR0MsVUFBSCxDQUFjO0FBQ1pDLGVBQUssMEJBQTBCSDtBQURuQixTQUFkO0FBR0Q7QUFMTyxLOzs7Ozs2QkFsQkQ7QUFDUCxVQUFNSSxPQUFPLElBQWI7QUFDQSxxQkFBS0MsT0FBTCxDQUFhO0FBQ1hGLGFBQUssMEJBQTBCQyxLQUFLRSxPQUFMLENBQWFDLFVBQWIsQ0FBd0JDLFNBQWxELEdBQThELHNCQUR4RDtBQUVYWixjQUFNO0FBQ0phLGlCQUFPTCxLQUFLRSxPQUFMLENBQWFDLFVBQWIsQ0FBd0JFO0FBRDNCLFNBRks7QUFLWEMsaUJBQVMsaUJBQVNDLEdBQVQsRUFBYztBQUNyQixjQUFHQSxJQUFJZixJQUFKLENBQVNnQixJQUFULEtBQWtCLENBQXJCLEVBQXdCO0FBQ3RCUixpQkFBS1AsSUFBTCxHQUFZLEVBQVo7QUFDQU8saUJBQUtTLE1BQUw7QUFDRCxXQUhELE1BR08sSUFBR0YsSUFBSWYsSUFBSixDQUFTZ0IsSUFBVCxJQUFpQixDQUFwQixFQUF1QjtBQUM1QlIsaUJBQUtQLElBQUwsR0FBWWMsSUFBSWYsSUFBSixDQUFTQSxJQUFyQjtBQUNBUSxpQkFBS1MsTUFBTDtBQUNEO0FBQ0Y7QUFiVSxPQUFiO0FBZUQ7Ozs7RUF4QmdDLGVBQUtDLEk7O2tCQUFuQnJCLEsiLCJmaWxlIjoibXktZmF2LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNeUZhdiBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5oiR55qE5pS26JePJ1xuICB9XG4gIGRhdGEgPSB7XG4gICAgZmF2czogW11cbiAgfVxuICBvbkxvYWQoKSB7XG4gICAgY29uc3QgdGhhdCA9IHRoaXNcbiAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgdXJsOiAnaHR0cHM6Ly9hcGkuaXQxMjAuY2MvJyArIHRoYXQuJHBhcmVudC5nbG9iYWxEYXRhLnN1YkRvbWFpbiArICcvc2hvcC9nb29kcy9mYXYvbGlzdCcsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIHRva2VuOiB0aGF0LiRwYXJlbnQuZ2xvYmFsRGF0YS50b2tlblxuICAgICAgfSxcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICBpZihyZXMuZGF0YS5jb2RlICE9PSAwKSB7XG4gICAgICAgICAgdGhhdC5mYXZzID0gW11cbiAgICAgICAgICB0aGF0LiRhcHBseSgpXG4gICAgICAgIH0gZWxzZSBpZihyZXMuZGF0YS5jb2RlID09IDApIHtcbiAgICAgICAgICB0aGF0LmZhdnMgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgdGhhdC4kYXBwbHkoKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgfVxuICBtZXRob2RzID0ge1xuICAgIGxvb2tEZXRhaWwoaWQpIHtcbiAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICB1cmw6ICcvcGFnZXMvZ29vZGRldGFpbD9pZD0nICsgaWRcbiAgICAgIH0pXG4gICAgfVxuICB9XG59XG4iXX0=