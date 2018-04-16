'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _wxParse = require('./../wxParse/wxParse.js');

var _wxParse2 = _interopRequireDefault(_wxParse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HtmlParse = function (_wepy$component) {
  _inherits(HtmlParse, _wepy$component);

  function HtmlParse() {
    var _ref;

    var _temp, _this, _ret;

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _classCallCheck(this, HtmlParse);

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = HtmlParse.__proto__ || Object.getPrototypeOf(HtmlParse)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
      parserName: {
        type: String,
        default: "htmlParserName"
      },
      parserContent: {
        type: String,
        default: "<p style='font-size: 32rpx; padding: 30rpx 0; text-align: center;'>没有任何内容</p>"
      },
      parserType: {
        type: String,
        default: "html"
      },
      parserPadding: {
        type: Number,
        default: 0
      }
    }, _this.data = {
      htmlParserTpl: {}
    }, _this.events = {
      'htmlParser-broadcast': function htmlParserBroadcast($event) {}
    }, _this.methods = {
      htmlParserNotice: function htmlParserNotice() {
        this.htmlParse();
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(HtmlParse, [{
    key: 'onLoad',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.htmlParse();

              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function onLoad() {
        return _ref2.apply(this, arguments);
      }

      return onLoad;
    }()
  }, {
    key: 'wxParseImgLoad',
    value: function wxParseImgLoad(image) {
      var imgInfo = image.detail;
    }
  }, {
    key: 'htmlParse',
    value: function htmlParse() {
      try {
        var content = _wxParse2.default.wxParse(this.parserName, this.parserType, this.parserContent || this.props.parserContent.default, this, this.parserPadding);
        this.htmlParserTpl = content[this.parserName];
        this.$apply();
      } catch (e) {
        console.warn("kinerHtmlParser:", "没有任何内容需要转换", e);
      }
    }
  }]);

  return HtmlParse;
}(_wepy2.default.component);

exports.default = HtmlParse;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0bWxQYXJzZS5qcyJdLCJuYW1lcyI6WyJIdG1sUGFyc2UiLCJwcm9wcyIsInBhcnNlck5hbWUiLCJ0eXBlIiwiU3RyaW5nIiwiZGVmYXVsdCIsInBhcnNlckNvbnRlbnQiLCJwYXJzZXJUeXBlIiwicGFyc2VyUGFkZGluZyIsIk51bWJlciIsImRhdGEiLCJodG1sUGFyc2VyVHBsIiwiZXZlbnRzIiwiJGV2ZW50IiwibWV0aG9kcyIsImh0bWxQYXJzZXJOb3RpY2UiLCJodG1sUGFyc2UiLCJpbWFnZSIsImltZ0luZm8iLCJkZXRhaWwiLCJjb250ZW50Iiwid3hQYXJzZSIsIiRhcHBseSIsImUiLCJjb25zb2xlIiwid2FybiIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFFcUJBLFM7Ozs7Ozs7Ozs7Ozs7OzRMQUNuQkMsSyxHQUFRO0FBQ05DLGtCQUFZO0FBQ1ZDLGNBQUtDLE1BREs7QUFFVkMsaUJBQVM7QUFGQyxPQUROO0FBS05DLHFCQUFjO0FBQ1pILGNBQU1DLE1BRE07QUFFWkMsaUJBQVM7QUFGRyxPQUxSO0FBU05FLGtCQUFXO0FBQ1RKLGNBQUtDLE1BREk7QUFFVEMsaUJBQVM7QUFGQSxPQVRMO0FBYU5HLHFCQUFjO0FBQ1pMLGNBQU1NLE1BRE07QUFFWkosaUJBQVM7QUFGRztBQWJSLEssUUFrQlJLLEksR0FBTztBQUNMQyxxQkFBZTtBQURWLEssUUFHUEMsTSxHQUFTO0FBQ1AsOEJBQXdCLDZCQUFDQyxNQUFELEVBQXFCLENBQzVDO0FBRk0sSyxRQUlUQyxPLEdBQVU7QUFDUkMsc0JBRFEsOEJBQ1U7QUFDaEIsYUFBS0MsU0FBTDtBQUNEO0FBSE8sSzs7Ozs7Ozs7Ozs7QUFNUixxQkFBS0EsU0FBTDs7Ozs7Ozs7Ozs7Ozs7Ozs7O21DQUVhQyxLLEVBQU07QUFDbkIsVUFBSUMsVUFBVUQsTUFBTUUsTUFBcEI7QUFDRDs7O2dDQUNVO0FBQ1QsVUFBRztBQUNELFlBQUlDLFVBQVUsa0JBQVFDLE9BQVIsQ0FBZ0IsS0FBS25CLFVBQXJCLEVBQWlDLEtBQUtLLFVBQXRDLEVBQWtELEtBQUtELGFBQUwsSUFBc0IsS0FBS0wsS0FBTCxDQUFXSyxhQUFYLENBQXlCRCxPQUFqRyxFQUEwRyxJQUExRyxFQUFnSCxLQUFLRyxhQUFySCxDQUFkO0FBQ0EsYUFBS0csYUFBTCxHQUFxQlMsUUFBUSxLQUFLbEIsVUFBYixDQUFyQjtBQUNBLGFBQUtvQixNQUFMO0FBQ0QsT0FKRCxDQUlDLE9BQU9DLENBQVAsRUFBUztBQUNSQyxnQkFBUUMsSUFBUixDQUFhLGtCQUFiLEVBQWdDLFlBQWhDLEVBQTZDRixDQUE3QztBQUNEO0FBQ0Y7Ozs7RUE3Q29DLGVBQUtHLFM7O2tCQUF2QjFCLFMiLCJmaWxlIjoiaHRtbFBhcnNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCBXeFBhcnNlIGZyb20gJy4uL3d4UGFyc2Uvd3hQYXJzZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEh0bWxQYXJzZSBleHRlbmRzIHdlcHkuY29tcG9uZW50e1xuICBwcm9wcyA9IHtcbiAgICBwYXJzZXJOYW1lOiB7XG4gICAgICB0eXBlOlN0cmluZyxcbiAgICAgIGRlZmF1bHQ6IFwiaHRtbFBhcnNlck5hbWVcIlxuICAgIH0sXG4gICAgcGFyc2VyQ29udGVudDp7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiBcIjxwIHN0eWxlPSdmb250LXNpemU6IDMycnB4OyBwYWRkaW5nOiAzMHJweCAwOyB0ZXh0LWFsaWduOiBjZW50ZXI7Jz7msqHmnInku7vkvZXlhoXlrrk8L3A+XCJcbiAgICB9LFxuICAgIHBhcnNlclR5cGU6e1xuICAgICAgdHlwZTpTdHJpbmcsXG4gICAgICBkZWZhdWx0OiBcImh0bWxcIlxuICAgIH0sXG4gICAgcGFyc2VyUGFkZGluZzp7XG4gICAgICB0eXBlOiBOdW1iZXIsXG4gICAgICBkZWZhdWx0OiAwXG4gICAgfVxuICB9O1xuICBkYXRhID0ge1xuICAgIGh0bWxQYXJzZXJUcGw6IHt9XG4gIH07XG4gIGV2ZW50cyA9IHtcbiAgICAnaHRtbFBhcnNlci1icm9hZGNhc3QnOiAoJGV2ZW50LCAuLi5hcmdzKSA9PiB7XG4gICAgfSxcbiAgfTtcbiAgbWV0aG9kcyA9IHtcbiAgICBodG1sUGFyc2VyTm90aWNlKCl7XG4gICAgICB0aGlzLmh0bWxQYXJzZSgpO1xuICAgIH1cbiAgfTtcbiAgYXN5bmMgb25Mb2FkKCl7XG4gICAgdGhpcy5odG1sUGFyc2UoKTtcbiAgfTtcbiAgd3hQYXJzZUltZ0xvYWQoaW1hZ2Upe1xuICAgIGxldCBpbWdJbmZvID0gaW1hZ2UuZGV0YWlsO1xuICB9O1xuICBodG1sUGFyc2UoKXtcbiAgICB0cnl7XG4gICAgICBsZXQgY29udGVudCA9IFd4UGFyc2Uud3hQYXJzZSh0aGlzLnBhcnNlck5hbWUsIHRoaXMucGFyc2VyVHlwZSwgdGhpcy5wYXJzZXJDb250ZW50IHx8IHRoaXMucHJvcHMucGFyc2VyQ29udGVudC5kZWZhdWx0LCB0aGlzLCB0aGlzLnBhcnNlclBhZGRpbmcpXG4gICAgICB0aGlzLmh0bWxQYXJzZXJUcGwgPSBjb250ZW50W3RoaXMucGFyc2VyTmFtZV07XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfWNhdGNoIChlKXtcbiAgICAgIGNvbnNvbGUud2FybihcImtpbmVySHRtbFBhcnNlcjpcIixcIuayoeacieS7u+S9leWGheWuuemcgOimgei9rOaNolwiLGUpO1xuICAgIH1cbiAgfVxufVxuIl19