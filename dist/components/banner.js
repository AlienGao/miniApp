'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _wepyComToast = require('./../npm/wepy-com-toast/toast.js');

var _wepyComToast2 = _interopRequireDefault(_wepyComToast);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Banners = function (_wepy$component) {
  _inherits(Banners, _wepy$component);

  function Banners() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Banners);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Banners.__proto__ || Object.getPrototypeOf(Banners)).call.apply(_ref, [this].concat(args))), _this), _this.components = {
      toast: _wepyComToast2.default
    }, _this.data = {
      duration: 1500,
      autoplay: true,
      interval: 3000,
      banners: [],
      swiperCurrent: 0
    }, _this.methods = {
      swiperChange: function swiperChange(e) {
        this.swiperCurrent = e.detail.current;
      },
      toGoodDetail: function toGoodDetail(e) {
        if (e.currentTarget.dataset.id !== 0) {
          wx.navigateTo({
            url: '/pages/gooddetail?id=' + e.currentTarget.dataset.id
          });
        }
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Banners, [{
    key: 'onLoad',
    value: function onLoad() {
      var that = this;
      _wepy2.default.request({
        url: 'https://api.it120.cc/' + that.$parent.$parent.globalData.subDomain + '/banner/list',
        data: {
          key: 'mallName'
        },
        success: function success(res) {
          if (res.data.code === 404) {
            that.$invoke('toast', 'show', {
              title: '暂无banner'
            });
          } else {
            that.banners = res.data.data.filter(function (item) {
              return item.type === 'banner';
            });
            that.$apply();
          }
        }
      });
    }
  }]);

  return Banners;
}(_wepy2.default.component);

exports.default = Banners;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJhbm5lci5qcyJdLCJuYW1lcyI6WyJCYW5uZXJzIiwiY29tcG9uZW50cyIsInRvYXN0IiwiZGF0YSIsImR1cmF0aW9uIiwiYXV0b3BsYXkiLCJpbnRlcnZhbCIsImJhbm5lcnMiLCJzd2lwZXJDdXJyZW50IiwibWV0aG9kcyIsInN3aXBlckNoYW5nZSIsImUiLCJkZXRhaWwiLCJjdXJyZW50IiwidG9Hb29kRGV0YWlsIiwiY3VycmVudFRhcmdldCIsImRhdGFzZXQiLCJpZCIsInd4IiwibmF2aWdhdGVUbyIsInVybCIsInRoYXQiLCJyZXF1ZXN0IiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJzdWJEb21haW4iLCJrZXkiLCJzdWNjZXNzIiwicmVzIiwiY29kZSIsIiRpbnZva2UiLCJ0aXRsZSIsImZpbHRlciIsIml0ZW0iLCJ0eXBlIiwiJGFwcGx5IiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLE87Ozs7Ozs7Ozs7Ozs7O3dMQUNuQkMsVSxHQUFhO0FBQ1hDO0FBRFcsSyxRQUliQyxJLEdBQU87QUFDTEMsZ0JBQVUsSUFETDtBQUVMQyxnQkFBVSxJQUZMO0FBR0xDLGdCQUFVLElBSEw7QUFJTEMsZUFBUyxFQUpKO0FBS0xDLHFCQUFlO0FBTFYsSyxRQTZCUEMsTyxHQUFVO0FBQ1JDLGtCQURRLHdCQUNNQyxDQUROLEVBQ1M7QUFDZixhQUFLSCxhQUFMLEdBQXFCRyxFQUFFQyxNQUFGLENBQVNDLE9BQTlCO0FBQ0QsT0FITztBQUlSQyxrQkFKUSx3QkFJS0gsQ0FKTCxFQUlRO0FBQ2QsWUFBR0EsRUFBRUksYUFBRixDQUFnQkMsT0FBaEIsQ0FBd0JDLEVBQXhCLEtBQStCLENBQWxDLEVBQXFDO0FBQ25DQyxhQUFHQyxVQUFILENBQWM7QUFDWkMsaUJBQUssMEJBQTBCVCxFQUFFSSxhQUFGLENBQWdCQyxPQUFoQixDQUF3QkM7QUFEM0MsV0FBZDtBQUdEO0FBQ0Y7QUFWTyxLOzs7Ozs2QkFyQkE7QUFDUixVQUFNSSxPQUFPLElBQWI7QUFDQSxxQkFBS0MsT0FBTCxDQUFhO0FBQ1hGLGFBQUssMEJBQTBCQyxLQUFLRSxPQUFMLENBQWFBLE9BQWIsQ0FBcUJDLFVBQXJCLENBQWdDQyxTQUExRCxHQUFzRSxjQURoRTtBQUVYdEIsY0FBTTtBQUNKdUIsZUFBSztBQURELFNBRks7QUFLWEMsaUJBQVMsaUJBQVVDLEdBQVYsRUFBZTtBQUN0QixjQUFHQSxJQUFJekIsSUFBSixDQUFTMEIsSUFBVCxLQUFrQixHQUFyQixFQUEwQjtBQUN4QlIsaUJBQUtTLE9BQUwsQ0FBYSxPQUFiLEVBQXNCLE1BQXRCLEVBQThCO0FBQzVCQyxxQkFBTztBQURxQixhQUE5QjtBQUdELFdBSkQsTUFJTztBQUNMVixpQkFBS2QsT0FBTCxHQUFlcUIsSUFBSXpCLElBQUosQ0FBU0EsSUFBVCxDQUFjNkIsTUFBZCxDQUFxQixVQUFDQyxJQUFELEVBQVU7QUFDNUMscUJBQU9BLEtBQUtDLElBQUwsS0FBYyxRQUFyQjtBQUNELGFBRmMsQ0FBZjtBQUdBYixpQkFBS2MsTUFBTDtBQUNEO0FBQ0Y7QUFoQlUsT0FBYjtBQWtCRDs7OztFQWpDa0MsZUFBS0MsUzs7a0JBQXJCcEMsTyIsImZpbGUiOiJiYW5uZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5pbXBvcnQgVG9hc3QgZnJvbSAnd2VweS1jb20tdG9hc3QnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhbm5lcnMgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XG4gIGNvbXBvbmVudHMgPSB7XG4gICAgdG9hc3Q6IFRvYXN0XG4gIH1cbiAgXG4gIGRhdGEgPSB7XG4gICAgZHVyYXRpb246IDE1MDAsXG4gICAgYXV0b3BsYXk6IHRydWUsXG4gICAgaW50ZXJ2YWw6IDMwMDAsXG4gICAgYmFubmVyczogW10sXG4gICAgc3dpcGVyQ3VycmVudDogMFxuICB9XG5cbiAgb25Mb2FkICgpIHtcbiAgICBjb25zdCB0aGF0ID0gdGhpc1xuICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICB1cmw6ICdodHRwczovL2FwaS5pdDEyMC5jYy8nICsgdGhhdC4kcGFyZW50LiRwYXJlbnQuZ2xvYmFsRGF0YS5zdWJEb21haW4gKyAnL2Jhbm5lci9saXN0JyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAga2V5OiAnbWFsbE5hbWUnXG4gICAgICB9LFxuICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICBpZihyZXMuZGF0YS5jb2RlID09PSA0MDQpIHtcbiAgICAgICAgICB0aGF0LiRpbnZva2UoJ3RvYXN0JywgJ3Nob3cnLCB7XG4gICAgICAgICAgICB0aXRsZTogJ+aaguaXoGJhbm5lcidcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoYXQuYmFubmVycyA9IHJlcy5kYXRhLmRhdGEuZmlsdGVyKChpdGVtKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbS50eXBlID09PSAnYmFubmVyJ1xuICAgICAgICAgIH0pXG4gICAgICAgICAgdGhhdC4kYXBwbHkoKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgfVxuICBtZXRob2RzID0ge1xuICAgIHN3aXBlckNoYW5nZSAoZSkge1xuICAgICAgdGhpcy5zd2lwZXJDdXJyZW50ID0gZS5kZXRhaWwuY3VycmVudFxuICAgIH0sXG4gICAgdG9Hb29kRGV0YWlsKGUpIHtcbiAgICAgIGlmKGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmlkICE9PSAwKSB7XG4gICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy9wYWdlcy9nb29kZGV0YWlsP2lkPScgKyBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pZFxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19