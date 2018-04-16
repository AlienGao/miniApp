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
            this.content = [];
            this.filterData = null;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlcHV0YXRpb24tY29udGVudC5qcyJdLCJuYW1lcyI6WyJSZXB1dGF0aW9uQ29udGVudCIsImRhdGEiLCJyZXB1dGF0aW9uIiwiY29udGVudCIsImZpbHRlckRhdGEiLCJpc1Nob3dBbGwiLCJwcm9wcyIsImdvb2RJZCIsIlN0cmluZyIsIm1ldGhvZHMiLCJsb29rYWxsIiwid3giLCJuYXZpZ2F0ZVRvIiwidXJsIiwibmV3VmFsdWUiLCJ0aGF0IiwicmVxdWVzdCIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwic3ViRG9tYWluIiwiZ29vZHNJZCIsInN1Y2Nlc3MiLCJyZXMiLCIkYXBwbHkiLCJ0eXBlIiwic2hvd0FsbCIsImxlbmd0aCIsImFycmF5IiwidHlwZTIiLCJ0eXBlMSIsInR5cGUwIiwibWFwIiwiaXRlbSIsImdvb2RzIiwiZ29vZFJlcHV0YXRpb24iLCJwdXNoIiwiJGludm9rZSIsIiRlbWl0IiwidXNlciIsImF2YXRhclVybCIsIm5pY2siLCJyZXB1dGF0aW9uRGF0ZSIsImRhdGVSZXB1dGF0aW9uIiwic2xpY2UiLCJnb29kUmVwdXRhdGlvblJlbWFyayIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsaUI7Ozs7Ozs7Ozs7Ozs7OzRNQUNuQkMsSSxHQUFPO0FBQ0xDLGtCQUFZLElBRFA7QUFFTEMsZUFBUyxFQUZKO0FBR0xDLGtCQUFZLElBSFA7QUFJTEMsaUJBQVc7QUFKTixLLFFBTVBDLEssR0FBUTtBQUNOQyxjQUFRQztBQURGLEssUUFHUkMsTyxHQUFVO0FBQ1JDLGFBRFEscUJBQ0U7QUFDUkMsV0FBR0MsVUFBSCxDQUFjO0FBQ1pDLGVBQUssOEJBQThCLEtBQUtOO0FBRDVCLFNBQWQ7QUFHRDtBQUxPLEs7Ozs7O2tDQU9LTyxRLEVBQVU7QUFDdkIsV0FBS1osVUFBTCxHQUFrQixJQUFsQjtBQUNBLFVBQU1hLE9BQU8sSUFBYjtBQUNBLHFCQUFLQyxPQUFMLENBQWE7QUFDWEgsYUFB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b3J0IHdlcHkgZnJvbSAnd2VweScgXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlcHV0YXRpb25Db250ZW50IGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xuICBkYXRhID0ge1xuICAgIHJlcHV0YXRpb246IG51bGwsXG4gICAgY29udGVudDogW10sXG4gICAgZmlsdGVyRGF0YTogbnVsbCxcbiAgICBpc1Nob3dBbGw6IGZhbHNlXG4gIH1cbiAgcHJvcHMgPSB7XG4gICAgZ29vZElkOiBTdHJpbmdcbiAgfVxuICBtZXRob2RzID0ge1xuICAgIGxvb2thbGwoKSB7XG4gICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgdXJsOiAnL3BhZ2VzL2FsbC1yZXB1dGF0aW9uP2lkPScgKyB0aGlzLmdvb2RJZFxuICAgICAgfSlcbiAgICB9XG4gIH1cbiAgZ2V0UmVwdXRhdGlvbiAobmV3VmFsdWUpIHtcbiAgICB0aGlzLnJlcHV0YXRpb24gPSBudWxsXG4gICAgY29uc3QgdGhhdCA9IHRoaXNcbiAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgdXJsOiAnaHR0cHM6Ly9hcGkuaXQxMjAuY2MvJyArIHRoYXQuJHBhcmVudC4kcGFyZW50Lmdsb2JhbERhdGEuc3ViRG9tYWluICsgJy9zaG9wL2dvb2RzL3JlcHV0YXRpb24nLFxuICAgICAgZGF0YToge1xuICAgICAgICBnb29kc0lkOiBuZXdWYWx1ZVxuICAgICAgfSxcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgdGhhdC5yZXB1dGF0aW9uID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICB0aGF0LiRhcHBseSgpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuICAvLyB0eXBl5p+l55yL6YCJ6aG577yMc2hvd0FsbOaYr+WQpuaYr+afpeeci+aJgOacieivhOiuuumhtVxuICBnZXRDb250ZW50ICh0eXBlPSdhbGwnLCBzaG93QWxsPSdmYWxzZScpIHtcbiAgICBjb25zdCB0aGF0ID0gdGhpc1xuICAgIC8vIOavj+asoeetm+mAieWIneWni+WMllxuICAgIHRoYXQuY29udGVudCA9IFtdXG4gICAgdGhhdC5maWx0ZXJEYXRhID0gbnVsbFxuICAgIHRoYXQuaXNTaG93QWxsID0gc2hvd0FsbCA9PSAnZmFsc2UnID8gZmFsc2UgOiB0cnVlXG4gICAgLy8g5a2Y5ZyocmVwdXRhdGlvblxuICAgIGlmICh0aGlzLnJlcHV0YXRpb24gJiYgdGhpcy5yZXB1dGF0aW9uLmxlbmd0aCAhPT0gMCkge1xuICAgICAgbGV0IGFycmF5ID0gW11cbiAgICAgIGxldCB0eXBlMiA9IFtdXG4gICAgICBsZXQgdHlwZTEgPSBbXVxuICAgICAgbGV0IHR5cGUwID0gW11cbiAgICAgIHRoaXMucmVwdXRhdGlvbi5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgaWYgKGl0ZW0uZ29vZHMuZ29vZFJlcHV0YXRpb24gPT0gMikge1xuICAgICAgICAgIHR5cGUyLnB1c2goaXRlbSlcbiAgICAgICAgfSBlbHNlIGlmIChpdGVtLmdvb2RzLmdvb2RSZXB1dGF0aW9uID09IDEpIHtcbiAgICAgICAgICB0eXBlMS5wdXNoKGl0ZW0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdHlwZTAucHVzaChpdGVtKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgYXJyYXkucHVzaCh0aGlzLnJlcHV0YXRpb24ubGVuZ3RoLCB0eXBlMi5sZW5ndGgsIHR5cGUxLmxlbmd0aCwgdHlwZTAubGVuZ3RoKVxuICAgICAgdGhhdC4kaW52b2tlKCcuLi9yZXB1dGF0aW9uLWNoaW9jZXMnLCAnZ2V0bGVuZ3RoJywgYXJyYXkpXG4gICAgICB0aGF0LiRlbWl0KCdnZXRsZW5ndGgnLCBhcnJheSlcbiAgICAgIC8vIOS4jeaYr+afpeeci+aJgOacieivhOiuulxuICAgICAgaWYoIXRoYXQuaXNTaG93QWxsKSB7XG4gICAgICAgIGxldCB1c2VyID0ge31cbiAgICAgICAgLy8g5p+l55yL5omA5pyJ6YCJ6aG5XG4gICAgICAgIGlmICh0eXBlID09PSAnYWxsJykge1xuICAgICAgICAgIHVzZXIuYXZhdGFyVXJsID0gdGhpcy5yZXB1dGF0aW9uWzBdLnVzZXIuYXZhdGFyVXJsXG4gICAgICAgICAgdXNlci5uaWNrID0gdGhpcy5yZXB1dGF0aW9uWzBdLnVzZXIubmlja1xuICAgICAgICAgIHVzZXIucmVwdXRhdGlvbkRhdGUgPSB0aGlzLnJlcHV0YXRpb25bMF0uZ29vZHMuZGF0ZVJlcHV0YXRpb24uc2xpY2UoMCwgMTApXG4gICAgICAgICAgdXNlci5nb29kUmVwdXRhdGlvblJlbWFyayA9IHRoaXMucmVwdXRhdGlvblswXS5nb29kcy5nb29kUmVwdXRhdGlvblJlbWFya1xuICAgICAgICAgIHRoaXMuY29udGVudC5wdXNoKHVzZXIpXG4gICAgICAgICAgLy8g5p+l55yL5aW95Lit5beu6YCJ6aG5XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5jb250ZW50ID0gW11cbiAgICAgICAgICB0aGlzLmZpbHRlckRhdGEgPSBudWxsXG4gICAgICAgICAgdGhhdC5yZXB1dGF0aW9uLm1hcCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgaWYoaXRlbS5nb29kcy5nb29kUmVwdXRhdGlvbiA9PSB0eXBlKSB7XG4gICAgICAgICAgICAgIHRoYXQuY29udGVudC5wdXNoKHtcbiAgICAgICAgICAgICAgICBhdmF0YXJVcmw6IGl0ZW0udXNlci5hdmF0YXJVcmwsXG4gICAgICAgICAgICAgICAgbmljazogaXRlbS51c2VyLm5pY2ssXG4gICAgICAgICAgICAgICAgcmVwdXRhdGlvbkRhdGU6IGl0ZW0uZ29vZHMuZGF0ZVJlcHV0YXRpb24uc2xpY2UoMCwgMTApLFxuICAgICAgICAgICAgICAgIGdvb2RSZXB1dGF0aW9uUmVtYXJrOiBpdGVtLmdvb2RzLmdvb2RSZXB1dGF0aW9uUmVtYXJrXG4gICAgICAgICAgICAgIH0pICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgdGhhdC5maWx0ZXJEYXRhID0gdGhhdC5jb250ZW50WzBdXG4gICAgICAgIHRoYXQuJGFwcGx5KClcbiAgICAgICAgLy8g5p+l55yL5omA5pyJ6K+E6K66XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGF0LnJlcHV0YXRpb24ubWFwKChpdGVtKSA9PiB7XG4gICAgICAgICAgaWYoaXRlbS5nb29kcy5nb29kUmVwdXRhdGlvbiA9PSB0eXBlIHx8IHR5cGUgPT09ICdhbGwnKSB7XG4gICAgICAgICAgICB0aGF0LmNvbnRlbnQucHVzaCh7XG4gICAgICAgICAgICAgIGF2YXRhclVybDogaXRlbS51c2VyLmF2YXRhclVybCxcbiAgICAgICAgICAgICAgbmljazogaXRlbS51c2VyLm5pY2ssXG4gICAgICAgICAgICAgIHJlcHV0YXRpb25EYXRlOiBpdGVtLmdvb2RzLmRhdGVSZXB1dGF0aW9uLnNsaWNlKDAsIDEwKSxcbiAgICAgICAgICAgICAgZ29vZFJlcHV0YXRpb25SZW1hcms6IGl0ZW0uZ29vZHMuZ29vZFJlcHV0YXRpb25SZW1hcmtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICB0aGF0LiRhcHBseSgpXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoYXQuJGludm9rZSgnLi4vcmVwdXRhdGlvbi1jaGlvY2VzJywgJ2dldGxlbmd0aCcsIFtdKVxuICAgICAgdGhhdC4kZW1pdCgnZ2V0bGVuZ3RoJywgW10pXG4gICAgfVxuICB9XG59XG4iXX0=