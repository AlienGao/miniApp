'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _goods = require('./../components/goods.js');

var _goods2 = _interopRequireDefault(_goods);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SpecialPrice = function (_wepy$page) {
  _inherits(SpecialPrice, _wepy$page);

  function SpecialPrice() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, SpecialPrice);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SpecialPrice.__proto__ || Object.getPrototypeOf(SpecialPrice)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '特卖专区',
      usingComponents: {
        'wxc-elip': '../../packages/@minui/wxc-elip/dist/index'
      }
    }, _this.components = {
      goods: _goods2.default
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return SpecialPrice;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(SpecialPrice , 'pages/special-price'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNwZWNpYWwtcHJpY2UuanMiXSwibmFtZXMiOlsiU3BlY2lhbFByaWNlIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsInVzaW5nQ29tcG9uZW50cyIsImNvbXBvbmVudHMiLCJnb29kcyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLFk7Ozs7Ozs7Ozs7Ozs7O2tNQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QixNQURqQjtBQUVQQyx1QkFBaUI7QUFDZixvQkFBWTtBQURHO0FBRlYsSyxRQU1UQyxVLEdBQWE7QUFDWEM7QUFEVyxLOzs7O0VBUDJCLGVBQUtDLEk7O2tCQUExQk4sWSIsImZpbGUiOiJzcGVjaWFsLXByaWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0IEdvb2RzIGZyb20gJ0AvY29tcG9uZW50cy9nb29kcydcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3BlY2lhbFByaWNlIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfnibnljZbkuJPljLonLFxuICAgIHVzaW5nQ29tcG9uZW50czoge1xuICAgICAgJ3d4Yy1lbGlwJzogJy4uLy4uL3BhY2thZ2VzL0BtaW51aS93eGMtZWxpcC9kaXN0L2luZGV4J1xuICAgIH1cbiAgfVxuICBjb21wb25lbnRzID0ge1xuICAgIGdvb2RzOiBHb29kc1xuICB9XG59XG4iXX0=