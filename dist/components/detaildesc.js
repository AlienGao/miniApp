'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _htmlParse = require('./htmlParse.js');

var _htmlParse2 = _interopRequireDefault(_htmlParse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DeatilDesc = function (_wepy$component) {
  _inherits(DeatilDesc, _wepy$component);

  function DeatilDesc() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, DeatilDesc);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DeatilDesc.__proto__ || Object.getPrototypeOf(DeatilDesc)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
      wxParseData: null
    }, _this.$repeat = {}, _this.$props = { "htmlparse": { "parserName": "article", "xmlns:v-bind": "", "v-bind:parserContent.sync": "wxParseData" } }, _this.$events = {}, _this.components = {
      htmlparse: _htmlParse2.default
    }, _this.events = {
      'goodId': function goodId(id) {
        var that = _this;
        _wepy2.default.request({
          url: 'https://api.it120.cc/' + that.$parent.$parent.globalData.subDomain + '/shop/goods/detail',
          data: {
            id: id
          },
          success: function success(res) {
            that.wxParseData = res.data.data.content;
            that.$apply();
            that.$invoke('htmlparse', 'htmlParserNotice', '');
          }
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return DeatilDesc;
}(_wepy2.default.component);

exports.default = DeatilDesc;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRldGFpbGRlc2MuanMiXSwibmFtZXMiOlsiRGVhdGlsRGVzYyIsImRhdGEiLCJ3eFBhcnNlRGF0YSIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsImh0bWxwYXJzZSIsImV2ZW50cyIsImlkIiwidGhhdCIsInJlcXVlc3QiLCJ1cmwiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsInN1YkRvbWFpbiIsInN1Y2Nlc3MiLCJyZXMiLCJjb250ZW50IiwiJGFwcGx5IiwiJGludm9rZSIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsVTs7Ozs7Ozs7Ozs7Ozs7OExBQ25CQyxJLEdBQU87QUFDTEMsbUJBQWE7QUFEUixLLFFBR1JDLE8sR0FBVSxFLFFBQ1hDLE0sR0FBUyxFQUFDLGFBQVksRUFBQyxjQUFhLFNBQWQsRUFBd0IsZ0JBQWUsRUFBdkMsRUFBMEMsNkJBQTRCLGFBQXRFLEVBQWIsRSxRQUNUQyxPLEdBQVUsRSxRQUNUQyxVLEdBQWE7QUFDVkM7QUFEVSxLLFFBR1pDLE0sR0FBUztBQUNQLGdCQUFVLGdCQUFDQyxFQUFELEVBQVE7QUFDaEIsWUFBTUMsWUFBTjtBQUNBLHVCQUFLQyxPQUFMLENBQWE7QUFDWEMsZUFBSywwQkFBeUJGLEtBQUtHLE9BQUwsQ0FBYUEsT0FBYixDQUFxQkMsVUFBckIsQ0FBZ0NDLFNBQXpELEdBQW9FLG9CQUQ5RDtBQUVYZCxnQkFBTTtBQUNKUSxnQkFBSUE7QUFEQSxXQUZLO0FBS1hPLG1CQUFTLGlCQUFVQyxHQUFWLEVBQWU7QUFDdEJQLGlCQUFLUixXQUFMLEdBQW1CZSxJQUFJaEIsSUFBSixDQUFTQSxJQUFULENBQWNpQixPQUFqQztBQUNBUixpQkFBS1MsTUFBTDtBQUNBVCxpQkFBS1UsT0FBTCxDQUFhLFdBQWIsRUFBMEIsa0JBQTFCLEVBQThDLEVBQTlDO0FBQ0Q7QUFUVSxTQUFiO0FBV0Q7QUFkTSxLOzs7O0VBVjZCLGVBQUtDLFM7O2tCQUF4QnJCLFUiLCJmaWxlIjoiZGV0YWlsZGVzYy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCBIdG1sUGFyc2UgZnJvbSAnQC9jb21wb25lbnRzL2h0bWxQYXJzZSdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGVhdGlsRGVzYyBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcbiAgZGF0YSA9IHtcbiAgICB3eFBhcnNlRGF0YTogbnVsbFxuICB9XG4gJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJodG1scGFyc2VcIjp7XCJwYXJzZXJOYW1lXCI6XCJhcnRpY2xlXCIsXCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOnBhcnNlckNvbnRlbnQuc3luY1wiOlwid3hQYXJzZURhdGFcIn19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xuICAgIGh0bWxwYXJzZTogSHRtbFBhcnNlXG4gIH1cbiAgZXZlbnRzID0ge1xuICAgICdnb29kSWQnOiAoaWQpID0+IHtcbiAgICAgIGNvbnN0IHRoYXQgPSB0aGlzXG4gICAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgICB1cmw6ICdodHRwczovL2FwaS5pdDEyMC5jYy8nKyB0aGF0LiRwYXJlbnQuJHBhcmVudC5nbG9iYWxEYXRhLnN1YkRvbWFpbiArJy9zaG9wL2dvb2RzL2RldGFpbCcsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBpZDogaWRcbiAgICAgICAgfSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgIHRoYXQud3hQYXJzZURhdGEgPSByZXMuZGF0YS5kYXRhLmNvbnRlbnRcbiAgICAgICAgICB0aGF0LiRhcHBseSgpXG4gICAgICAgICAgdGhhdC4kaW52b2tlKCdodG1scGFyc2UnLCAnaHRtbFBhcnNlck5vdGljZScsICcnKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfVxufVxuIl19