'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReputationContent = function (_wepy$component) {
  _inherits(ReputationContent, _wepy$component);

  function ReputationContent() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ReputationContent);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ReputationContent.__proto__ || Object.getPrototypeOf(ReputationContent)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
      reputation: null,
      content: [],
      filterData: null,
      isShowAll: false
    }, _this.props = {
      goodId: String
    }, _this.methods = {
      lookall: function lookall() {
        wx.navigateTo({
          url: '/pages/all-reputation?id=' + this.goodId
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ReputationContent, [{
    key: 'getReputation',
    value: function getReputation(newValue) {
      this.reputation = null;
      var that = this;
      _wepy2.default.request({
        url: 'https://api.it120.cc/' + that.$parent.$parent.globalData.subDomain + '/shop/goods/reputation',
        data: {
          goodsId: newValue
        },
        success: function success(res) {
          that.reputation = res.data.data;
          that.$apply();
        }
      });
    }
    // type查看选项，showAll是否是查看所有评论页

  }, {
    key: 'getContent',
    value: function getContent() {
      var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'all';
      var showAll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'false';

      var that = this;
      // 每次筛选初始化
      that.content = [];
      that.filterData = null;
      that.isShowAll = showAll == 'false' ? false : true;
      // 存在reputation
      if (this.reputation && this.reputation.length !== 0) {
        var array = [];
        var type2 = [];
        var type1 = [];
        var type0 = [];
        this.reputation.map(function (item) {
          if (item.goods.goodReputation == 2) {
            type2.push(item);
          } else if (item.goods.goodReputation == 1) {
            type1.push(item);
          } else {
            type0.push(item);
          }
        });
        array.push(this.reputation.length, type2.length, type1.length, type0.length);
        that.$invoke('../reputation-chioces', 'getlength', array);
        that.$emit('getlength', array);
        // 不是查看所有评论
        if (!that.isShowAll) {
          var user = {};
          // 查看所有选项
          if (type === 'all') {
            user.avatarUrl = this.reputation[0].user.avatarUrl;
            user.nick = this.reputation[0].user.nick;
            user.reputationDate = this.reputation[0].goods.dateReputation.slice(0, 10);
            user.goodReputationRemark = this.reputation[0].goods.goodReputationRemark;
            this.content.push(user);
            // 查看好中差选项
          } else {
            that.reputation.map(function (item) {
              if (item.goods.goodReputation == type) {
                that.content.push({
                  avatarUrl: item.user.avatarUrl,
                  nick: item.user.nick,
                  reputationDate: item.goods.dateReputation.slice(0, 10),
                  goodReputationRemark: item.goods.goodReputationRemark
                });
              }
            });
          }
          that.filterData = that.content[0];
          that.$apply();
          // 查看所有评论
        } else {
          that.reputation.map(function (item) {
            if (item.goods.goodReputation == type || type === 'all') {
              that.content.push({
                avatarUrl: item.user.avatarUrl,
                nick: item.user.nick,
                reputationDate: item.goods.dateReputation.slice(0, 10),
                goodReputationRemark: item.goods.goodReputationRemark
              });
            }
          });
          that.$apply();
        }
      } else {
        that.$invoke('../reputation-chioces', 'getlength', []);
        that.$emit('getlength', []);
      }
    }
  }]);

  return ReputationContent;
}(_wepy2.default.component);

exports.default = ReputationContent;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlcHV0YXRpb24tY29udGVudC5qcyJdLCJuYW1lcyI6WyJSZXB1dGF0aW9uQ29udGVudCIsImRhdGEiLCJyZXB1dGF0aW9uIiwiY29udGVudCIsImZpbHRlckRhdGEiLCJpc1Nob3dBbGwiLCJwcm9wcyIsImdvb2RJZCIsIlN0cmluZyIsIm1ldGhvZHMiLCJsb29rYWxsIiwid3giLCJuYXZpZ2F0ZVRvIiwidXJsIiwibmV3VmFsdWUiLCJ0aGF0IiwicmVxdWVzdCIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwic3ViRG9tYWluIiwiZ29vZHNJZCIsInN1Y2Nlc3MiLCJyZXMiLCIkYXBwbHkiLCJ0eXBlIiwic2hvd0FsbCIsImxlbmd0aCIsImFycmF5IiwidHlwZTIiLCJ0eXBlMSIsInR5cGUwIiwibWFwIiwiaXRlbSIsImdvb2RzIiwiZ29vZFJlcHV0YXRpb24iLCJwdXNoIiwiJGludm9rZSIsIiRlbWl0IiwidXNlciIsImF2YXRhclVybCIsIm5pY2siLCJyZXB1dGF0aW9uRGF0ZSIsImRhdGVSZXB1dGF0aW9uIiwic2xpY2UiLCJnb29kUmVwdXRhdGlvblJlbWFyayIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsaUI7Ozs7Ozs7Ozs7Ozs7OzRNQUNuQkMsSSxHQUFPO0FBQ0xDLGtCQUFZLElBRFA7QUFFTEMsZUFBUyxFQUZKO0FBR0xDLGtCQUFZLElBSFA7QUFJTEMsaUJBQVc7QUFKTixLLFFBTVBDLEssR0FBUTtBQUNOQyxjQUFRQztBQURGLEssUUFHUkMsTyxHQUFVO0FBQ1JDLGFBRFEscUJBQ0U7QUFDUkMsV0FBR0MsVUFBSCxDQUFjO0FBQ1pDLGVBQUssOEJBQThCLEtBQUtOO0FBRDVCLFNBQWQ7QUFHRDtBQUxPLEs7Ozs7O2tDQU9LTyxRLEVBQVU7QUFDdkIsV0FBS1osVUFBTCxHQUFrQixJQUFsQjtBQUNBLFVBQU1hLE9BQU8sSUFBYjtBQUNBLHFCQUFLQyxPQUFMLENBQWE7QUFDWEgsYUFB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LElBRkE7QUFHaEJDLGtDQUFnQlQsS0FBS0MsS0FBTCxDQUFXUyxjQUFYLENBQTBCQyxLQUExQixDQUFnQyxDQUFoQyxFQUFtQyxFQUFuQyxDQUhBO0FBSWhCQyx3Q0FBc0JaLEtBQUtDLEtBQUwsQ0FBV1c7QUFKakIsaUJBQWxCO0FBTUQ7QUFDRixhQVREO0FBVUQ7QUFDRDdCLGVBQUtYLFVBQUwsR0FBa0JXLEtBQUtaLE9BQUwsQ0FBYSxDQUFiLENBQWxCO0FBQ0FZLGVBQUtRLE1BQUw7QUFDQTtBQUNELFNBekJELE1BeUJPO0FBQ0xSLGVBQUtiLFVBQUwsQ0FBZ0I2QixHQUFoQixDQUFvQixVQUFDQyxJQUFELEVBQVU7QUFDNUIsZ0JBQUdBLEtBQUtDLEtBQUwsQ0FBV0MsY0FBWCxJQUE2QlYsSUFBN0IsSUFBcUNBLFNBQVMsS0FBakQsRUFBd0Q7QUFDdERULG1CQUFLWixPQUFMLENBQWFnQyxJQUFiLENBQWtCO0FBQ2hCSSwyQkFBV1AsS0FBS00sSUFBTCxDQUFVQyxTQURMO0FBRWhCQyxzQkFBTVIsS0FBS00sSUFBTCxDQUFVRSxJQUZBO0FBR2hCQyxnQ0FBZ0JULEtBQUtDLEtBQUwsQ0FBV1MsY0FBWCxDQUEwQkMsS0FBMUIsQ0FBZ0MsQ0FBaEMsRUFBbUMsRUFBbkMsQ0FIQTtBQUloQkMsc0NBQXNCWixLQUFLQyxLQUFMLENBQVdXO0FBSmpCLGVBQWxCO0FBTUQ7QUFDRixXQVREO0FBVUE3QixlQUFLUSxNQUFMO0FBQ0Q7QUFDRixPQXhERCxNQXdETztBQUNMUixhQUFLcUIsT0FBTCxDQUFhLHVCQUFiLEVBQXNDLFdBQXRDLEVBQW1ELEVBQW5EO0FBQ0FyQixhQUFLc0IsS0FBTCxDQUFXLFdBQVgsRUFBd0IsRUFBeEI7QUFDRDtBQUNGOzs7O0VBbkc0QyxlQUFLUSxTOztrQkFBL0I3QyxpQiIsImZpbGUiOiJyZXB1dGF0aW9uLWNvbnRlbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknIFxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZXB1dGF0aW9uQ29udGVudCBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcbiAgZGF0YSA9IHtcbiAgICByZXB1dGF0aW9uOiBudWxsLFxuICAgIGNvbnRlbnQ6IFtdLFxuICAgIGZpbHRlckRhdGE6IG51bGwsXG4gICAgaXNTaG93QWxsOiBmYWxzZVxuICB9XG4gIHByb3BzID0ge1xuICAgIGdvb2RJZDogU3RyaW5nXG4gIH1cbiAgbWV0aG9kcyA9IHtcbiAgICBsb29rYWxsKCkge1xuICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgIHVybDogJy9wYWdlcy9hbGwtcmVwdXRhdGlvbj9pZD0nICsgdGhpcy5nb29kSWRcbiAgICAgIH0pXG4gICAgfVxuICB9XG4gIGdldFJlcHV0YXRpb24gKG5ld1ZhbHVlKSB7XG4gICAgdGhpcy5yZXB1dGF0aW9uID0gbnVsbFxuICAgIGNvbnN0IHRoYXQgPSB0aGlzXG4gICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgIHVybDogJ2h0dHBzOi8vYXBpLml0MTIwLmNjLycgKyB0aGF0LiRwYXJlbnQuJHBhcmVudC5nbG9iYWxEYXRhLnN1YkRvbWFpbiArICcvc2hvcC9nb29kcy9yZXB1dGF0aW9uJyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgZ29vZHNJZDogbmV3VmFsdWVcbiAgICAgIH0sXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgIHRoYXQucmVwdXRhdGlvbiA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgdGhhdC4kYXBwbHkoKVxuICAgICAgfVxuICAgIH0pXG4gIH1cbiAgLy8gdHlwZeafpeeci+mAiemhue+8jHNob3dBbGzmmK/lkKbmmK/mn6XnnIvmiYDmnInor4TorrrpobVcbiAgZ2V0Q29udGVudCAodHlwZT0nYWxsJywgc2hvd0FsbD0nZmFsc2UnKSB7XG4gICAgY29uc3QgdGhhdCA9IHRoaXNcbiAgICAvLyDmr4/mrKHnrZvpgInliJ3lp4vljJZcbiAgICB0aGF0LmNvbnRlbnQgPSBbXVxuICAgIHRoYXQuZmlsdGVyRGF0YSA9IG51bGxcbiAgICB0aGF0LmlzU2hvd0FsbCA9IHNob3dBbGwgPT0gJ2ZhbHNlJyA/IGZhbHNlIDogdHJ1ZVxuICAgIC8vIOWtmOWcqHJlcHV0YXRpb25cbiAgICBpZiAodGhpcy5yZXB1dGF0aW9uICYmIHRoaXMucmVwdXRhdGlvbi5sZW5ndGggIT09IDApIHtcbiAgICAgIGxldCBhcnJheSA9IFtdXG4gICAgICBsZXQgdHlwZTIgPSBbXVxuICAgICAgbGV0IHR5cGUxID0gW11cbiAgICAgIGxldCB0eXBlMCA9IFtdXG4gICAgICB0aGlzLnJlcHV0YXRpb24ubWFwKChpdGVtKSA9PiB7XG4gICAgICAgIGlmIChpdGVtLmdvb2RzLmdvb2RSZXB1dGF0aW9uID09IDIpIHtcbiAgICAgICAgICB0eXBlMi5wdXNoKGl0ZW0pXG4gICAgICAgIH0gZWxzZSBpZiAoaXRlbS5nb29kcy5nb29kUmVwdXRhdGlvbiA9PSAxKSB7XG4gICAgICAgICAgdHlwZTEucHVzaChpdGVtKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHR5cGUwLnB1c2goaXRlbSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIGFycmF5LnB1c2godGhpcy5yZXB1dGF0aW9uLmxlbmd0aCwgdHlwZTIubGVuZ3RoLCB0eXBlMS5sZW5ndGgsIHR5cGUwLmxlbmd0aClcbiAgICAgIHRoYXQuJGludm9rZSgnLi4vcmVwdXRhdGlvbi1jaGlvY2VzJywgJ2dldGxlbmd0aCcsIGFycmF5KVxuICAgICAgdGhhdC4kZW1pdCgnZ2V0bGVuZ3RoJywgYXJyYXkpXG4gICAgICAvLyDkuI3mmK/mn6XnnIvmiYDmnInor4TorrpcbiAgICAgIGlmKCF0aGF0LmlzU2hvd0FsbCkge1xuICAgICAgICBsZXQgdXNlciA9IHt9XG4gICAgICAgIC8vIOafpeeci+aJgOaciemAiemhuVxuICAgICAgICBpZiAodHlwZSA9PT0gJ2FsbCcpIHtcbiAgICAgICAgICB1c2VyLmF2YXRhclVybCA9IHRoaXMucmVwdXRhdGlvblswXS51c2VyLmF2YXRhclVybFxuICAgICAgICAgIHVzZXIubmljayA9IHRoaXMucmVwdXRhdGlvblswXS51c2VyLm5pY2tcbiAgICAgICAgICB1c2VyLnJlcHV0YXRpb25EYXRlID0gdGhpcy5yZXB1dGF0aW9uWzBdLmdvb2RzLmRhdGVSZXB1dGF0aW9uLnNsaWNlKDAsIDEwKVxuICAgICAgICAgIHVzZXIuZ29vZFJlcHV0YXRpb25SZW1hcmsgPSB0aGlzLnJlcHV0YXRpb25bMF0uZ29vZHMuZ29vZFJlcHV0YXRpb25SZW1hcmtcbiAgICAgICAgICB0aGlzLmNvbnRlbnQucHVzaCh1c2VyKVxuICAgICAgICAgIC8vIOafpeeci+WlveS4reW3rumAiemhuVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoYXQucmVwdXRhdGlvbi5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIGlmKGl0ZW0uZ29vZHMuZ29vZFJlcHV0YXRpb24gPT0gdHlwZSkge1xuICAgICAgICAgICAgICB0aGF0LmNvbnRlbnQucHVzaCh7XG4gICAgICAgICAgICAgICAgYXZhdGFyVXJsOiBpdGVtLnVzZXIuYXZhdGFyVXJsLFxuICAgICAgICAgICAgICAgIG5pY2s6IGl0ZW0udXNlci5uaWNrLFxuICAgICAgICAgICAgICAgIHJlcHV0YXRpb25EYXRlOiBpdGVtLmdvb2RzLmRhdGVSZXB1dGF0aW9uLnNsaWNlKDAsIDEwKSxcbiAgICAgICAgICAgICAgICBnb29kUmVwdXRhdGlvblJlbWFyazogaXRlbS5nb29kcy5nb29kUmVwdXRhdGlvblJlbWFya1xuICAgICAgICAgICAgICB9KSAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIHRoYXQuZmlsdGVyRGF0YSA9IHRoYXQuY29udGVudFswXVxuICAgICAgICB0aGF0LiRhcHBseSgpIFxuICAgICAgICAvLyDmn6XnnIvmiYDmnInor4TorrpcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoYXQucmVwdXRhdGlvbi5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgICBpZihpdGVtLmdvb2RzLmdvb2RSZXB1dGF0aW9uID09IHR5cGUgfHwgdHlwZSA9PT0gJ2FsbCcpIHtcbiAgICAgICAgICAgIHRoYXQuY29udGVudC5wdXNoKHtcbiAgICAgICAgICAgICAgYXZhdGFyVXJsOiBpdGVtLnVzZXIuYXZhdGFyVXJsLFxuICAgICAgICAgICAgICBuaWNrOiBpdGVtLnVzZXIubmljayxcbiAgICAgICAgICAgICAgcmVwdXRhdGlvbkRhdGU6IGl0ZW0uZ29vZHMuZGF0ZVJlcHV0YXRpb24uc2xpY2UoMCwgMTApLFxuICAgICAgICAgICAgICBnb29kUmVwdXRhdGlvblJlbWFyazogaXRlbS5nb29kcy5nb29kUmVwdXRhdGlvblJlbWFya1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIHRoYXQuJGFwcGx5KClcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhhdC4kaW52b2tlKCcuLi9yZXB1dGF0aW9uLWNoaW9jZXMnLCAnZ2V0bGVuZ3RoJywgW10pXG4gICAgICB0aGF0LiRlbWl0KCdnZXRsZW5ndGgnLCBbXSlcbiAgICB9XG4gIH1cbn1cbiJdfQ==