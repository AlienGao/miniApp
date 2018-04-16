'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _reputationChioces = require('./../components/reputation-chioces.js');

var _reputationChioces2 = _interopRequireDefault(_reputationChioces);

var _reputationContent = require('./../components/reputation-content.js');

var _reputationContent2 = _interopRequireDefault(_reputationContent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AllReputation = function (_wepy$page) {
  _inherits(AllReputation, _wepy$page);

  function AllReputation() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, AllReputation);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = AllReputation.__proto__ || Object.getPrototypeOf(AllReputation)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '所有评价'
    }, _this.data = {
      goodId: '',
      reputation: ['全部', '好评', '中评', '差评'],
      number: [],
      reputationIndex: 0
    }, _this.$repeat = {}, _this.$props = { "reputation-content": { "xmlns:v-bind": "", "v-bind:goodId.sync": "goodId" } }, _this.$events = {}, _this.components = {
      'reputation-chioces': _reputationChioces2.default,
      'reputation-content': _reputationContent2.default
    }, _this.methods = {
      chooseIndex: function chooseIndex(index) {
        this.reputationIndex = index;
        var num = '';
        if (index == 0) {
          num = 'all';
        } else {
          num = 3 - index;
        }
        this.$invoke('reputation-content', 'getContent', num, 'true');
      }
    }, _this.events = {
      'getlength': function getlength(data) {
        _this.number = data;
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(AllReputation, [{
    key: 'onLoad',
    value: function onLoad(e) {
      var that = this;
      this.goodId = e.id;
      that.reputationIndex = 0;
      that.$invoke('reputation-content', 'getReputation', e.id);
      setTimeout(function () {
        that.$invoke('reputation-content', 'getContent', 'all', 'true');
      }, 100);
    }
  }]);

  return AllReputation;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(AllReputation , 'pages/all-reputation'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFsbC1yZXB1dGF0aW9uLmpzIl0sIm5hbWVzIjpbIkFsbFJlcHV0YXRpb24iLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsImdvb2RJZCIsInJlcHV0YXRpb24iLCJudW1iZXIiLCJyZXB1dGF0aW9uSW5kZXgiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJtZXRob2RzIiwiY2hvb3NlSW5kZXgiLCJpbmRleCIsIm51bSIsIiRpbnZva2UiLCJldmVudHMiLCJlIiwidGhhdCIsImlkIiwic2V0VGltZW91dCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxhOzs7Ozs7Ozs7Ozs7OztvTUFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdUQyxJLEdBQU87QUFDTEMsY0FBUSxFQURIO0FBRUxDLGtCQUFZLENBQUMsSUFBRCxFQUFPLElBQVAsRUFBYSxJQUFiLEVBQW1CLElBQW5CLENBRlA7QUFHTEMsY0FBUSxFQUhIO0FBSUxDLHVCQUFpQjtBQUpaLEssUUFNUkMsTyxHQUFVLEUsUUFDWEMsTSxHQUFTLEVBQUMsc0JBQXFCLEVBQUMsZ0JBQWUsRUFBaEIsRUFBbUIsc0JBQXFCLFFBQXhDLEVBQXRCLEUsUUFDVEMsTyxHQUFVLEUsUUFDVEMsVSxHQUFhO0FBQ1YsdURBRFU7QUFFVjtBQUZVLEssUUFhWkMsTyxHQUFVO0FBQ1JDLGlCQURRLHVCQUNJQyxLQURKLEVBQ1c7QUFDakIsYUFBS1AsZUFBTCxHQUF1Qk8sS0FBdkI7QUFDQSxZQUFJQyxNQUFNLEVBQVY7QUFDQSxZQUFHRCxTQUFTLENBQVosRUFBZTtBQUNiQyxnQkFBTSxLQUFOO0FBQ0QsU0FGRCxNQUVPO0FBQ0xBLGdCQUFNLElBQUlELEtBQVY7QUFDRDtBQUNELGFBQUtFLE9BQUwsQ0FBYSxvQkFBYixFQUFtQyxZQUFuQyxFQUFpREQsR0FBakQsRUFBc0QsTUFBdEQ7QUFDRDtBQVZPLEssUUFZVkUsTSxHQUFTO0FBQ1AsbUJBQWEsbUJBQUNkLElBQUQsRUFBVTtBQUNyQixjQUFLRyxNQUFMLEdBQWNILElBQWQ7QUFDRDtBQUhNLEs7Ozs7OzJCQXJCRmUsQyxFQUFHO0FBQ1IsVUFBTUMsT0FBTyxJQUFiO0FBQ0EsV0FBS2YsTUFBTCxHQUFjYyxFQUFFRSxFQUFoQjtBQUNBRCxXQUFLWixlQUFMLEdBQXVCLENBQXZCO0FBQ0FZLFdBQUtILE9BQUwsQ0FBYSxvQkFBYixFQUFtQyxlQUFuQyxFQUFvREUsRUFBRUUsRUFBdEQ7QUFDQUMsaUJBQVcsWUFBVTtBQUNuQkYsYUFBS0gsT0FBTCxDQUFhLG9CQUFiLEVBQW1DLFlBQW5DLEVBQWlELEtBQWpELEVBQXdELE1BQXhEO0FBQ0QsT0FGRCxFQUVHLEdBRkg7QUFHRDs7OztFQXpCd0MsZUFBS00sSTs7a0JBQTNCdEIsYSIsImZpbGUiOiJhbGwtcmVwdXRhdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCBSZXB1dGF0aW9uQ2hpb2NlcyBmcm9tICdAL2NvbXBvbmVudHMvcmVwdXRhdGlvbi1jaGlvY2VzJ1xuaW1wb3J0IFJlcHV0YXRpb25Db250ZW50IGZyb20gJ0AvY29tcG9uZW50cy9yZXB1dGF0aW9uLWNvbnRlbnQnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFsbFJlcHV0YXRpb24gZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+aJgOacieivhOS7tydcbiAgfVxuICBkYXRhID0ge1xuICAgIGdvb2RJZDogJycsXG4gICAgcmVwdXRhdGlvbjogWyflhajpg6gnLCAn5aW96K+EJywgJ+S4reivhCcsICflt67or4QnXSxcbiAgICBudW1iZXI6IFtdLFxuICAgIHJlcHV0YXRpb25JbmRleDogMFxuICB9XG4gJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJyZXB1dGF0aW9uLWNvbnRlbnRcIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOmdvb2RJZC5zeW5jXCI6XCJnb29kSWRcIn19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xuICAgICdyZXB1dGF0aW9uLWNoaW9jZXMnOiBSZXB1dGF0aW9uQ2hpb2NlcyxcbiAgICAncmVwdXRhdGlvbi1jb250ZW50JzogUmVwdXRhdGlvbkNvbnRlbnRcbiAgfVxuICBvbkxvYWQoZSkge1xuICAgIGNvbnN0IHRoYXQgPSB0aGlzXG4gICAgdGhpcy5nb29kSWQgPSBlLmlkXG4gICAgdGhhdC5yZXB1dGF0aW9uSW5kZXggPSAwXG4gICAgdGhhdC4kaW52b2tlKCdyZXB1dGF0aW9uLWNvbnRlbnQnLCAnZ2V0UmVwdXRhdGlvbicsIGUuaWQpXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgdGhhdC4kaW52b2tlKCdyZXB1dGF0aW9uLWNvbnRlbnQnLCAnZ2V0Q29udGVudCcsICdhbGwnLCAndHJ1ZScpXG4gICAgfSwgMTAwKVxuICB9XG4gIG1ldGhvZHMgPSB7XG4gICAgY2hvb3NlSW5kZXgoaW5kZXgpIHtcbiAgICAgIHRoaXMucmVwdXRhdGlvbkluZGV4ID0gaW5kZXhcbiAgICAgIGxldCBudW0gPSAnJ1xuICAgICAgaWYoaW5kZXggPT0gMCkge1xuICAgICAgICBudW0gPSAnYWxsJ1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbnVtID0gMyAtIGluZGV4XG4gICAgICB9XG4gICAgICB0aGlzLiRpbnZva2UoJ3JlcHV0YXRpb24tY29udGVudCcsICdnZXRDb250ZW50JywgbnVtLCAndHJ1ZScpXG4gICAgfVxuICB9XG4gIGV2ZW50cyA9IHtcbiAgICAnZ2V0bGVuZ3RoJzogKGRhdGEpID0+IHtcbiAgICAgIHRoaXMubnVtYmVyID0gZGF0YVxuICAgIH1cbiAgfVxufVxuIl19