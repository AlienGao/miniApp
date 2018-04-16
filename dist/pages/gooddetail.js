'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _detaildesc = require('./../components/detaildesc.js');

var _detaildesc2 = _interopRequireDefault(_detaildesc);

var _reputationChioces = require('./../components/reputation-chioces.js');

var _reputationChioces2 = _interopRequireDefault(_reputationChioces);

var _reputationContent = require('./../components/reputation-content.js');

var _reputationContent2 = _interopRequireDefault(_reputationContent);

var _goods = require('./../components/goods.js');

var _goods2 = _interopRequireDefault(_goods);

var _tabBar = require('./../components/tabBar.js');

var _tabBar2 = _interopRequireDefault(_tabBar);

var _wepyComToast = require('./../npm/wepy-com-toast/toast.js');

var _wepyComToast2 = _interopRequireDefault(_wepyComToast);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GoodDeatail = function (_wepy$page) {
  _inherits(GoodDeatail, _wepy$page);

  function GoodDeatail() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, GoodDeatail);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = GoodDeatail.__proto__ || Object.getPrototypeOf(GoodDeatail)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '商品详情',
      usingComponents: {
        'wxc-elip': '../../packages/@minui/wxc-elip/dist/index',
        'wxc-popup': '../../packages/@minui/wxc-popup/dist/index',
        'wxc-counter': '../../packages/@minui/wxc-counter/dist/index'
      }
    }, _this.$repeat = {}, _this.$props = { "reputation-content": { "xmlns:v-bind": "", "v-bind:goodId.sync": "goodId" }, "tabbar": { "v-bind:goodDetail.sync": "goodDetail" } }, _this.$events = {}, _this.components = {
      detaildesc: _detaildesc2.default,
      'reputation-chioces': _reputationChioces2.default,
      'reputation-content': _reputationContent2.default,
      recommend: _goods2.default,
      tabbar: _tabBar2.default,
      toast: _wepyComToast2.default
    }, _this.data = {
      goodDetail: [],
      buyNumMax: 0,
      newPrice: 0,
      oldPrice: 0,
      videoId: '',
      videoMp4Src: '',
      sourceLength: 0,
      swiperCurrent: 0,
      reputation: 0,
      goodId: ''
    }, _this.methods = {
      swiperChange: function swiperChange(e) {
        this.swiperCurrent = e.detail.current;
      },
      lookall: function lookall() {
        if (this.reputation > 0) {
          wx.navigateTo({
            url: '/pages/all-reputation?id=' + this.goodId
          });
        }
      }
    }, _this.events = {
      getReputation: function getReputation(data) {
        this.reputation = data;
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(GoodDeatail, [{
    key: 'onLoad',
    value: function onLoad(e) {
      var that = this;
      that.goodId = e.id;
      that.$broadcast('goodId', e.id);
      that.$invoke('reputation-content', 'getReputation', e.id);
      //获取商品详情
      _wepy2.default.request({
        url: 'https://api.it120.cc/' + that.$parent.globalData.subDomain + '/shop/goods/detail',
        data: {
          id: e.id
        },
        success: function success(res) {
          that.goodDetail = res.data.data;
          that.newPrice = res.data.data.basicInfo.minPrice;
          that.oldPrice = res.data.data.basicInfo.originalPrice;
          that.buyNumMax = res.data.data.basicInfo.stores;
          that.sourceLength = res.data.data.pics.length;
          that.videoId = res.data.data.basicInfo.videoId;
          // that.$apply()
          //获取商品视频
          _wepy2.default.request({
            url: 'https://api.it120.cc/' + that.$parent.globalData.subDomain + '/media/video/detail',
            data: {
              videoId: that.videoId
            },
            success: function success(res) {
              if (res.data.code == 0) {
                that.videoMp4Src = res.data.data.fdMp4;
                that.sourceLength = that.sourceLength + 1;
                // that.$apply()
              }
            }
          });
        }
      });
      // 商品评价
      setTimeout(function () {
        that.$invoke('reputation-content', 'getContent', 'all', 'false');
      }, 500);
    }
  }, {
    key: 'onShareAppMessage',
    value: function onShareAppMessage() {
      return {
        title: this.goodDetail.basicInfo.name,
        path: '/pages/goods-details/index?id=' + this.goodDetail.basicInfo.id + '&inviter_id=' + this.$parent.globalData.uid,
        success: function success(res) {
          // 转发成功
          console.log('成功', res);
        },
        fail: function fail(res) {
          // 转发失败
          console.log('失败', res);
        }
      };
    }
  }]);

  return GoodDeatail;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(GoodDeatail , 'pages/gooddetail'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdvb2RkZXRhaWwuanMiXSwibmFtZXMiOlsiR29vZERlYXRhaWwiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwidXNpbmdDb21wb25lbnRzIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiZGV0YWlsZGVzYyIsInJlY29tbWVuZCIsInRhYmJhciIsInRvYXN0IiwiZGF0YSIsImdvb2REZXRhaWwiLCJidXlOdW1NYXgiLCJuZXdQcmljZSIsIm9sZFByaWNlIiwidmlkZW9JZCIsInZpZGVvTXA0U3JjIiwic291cmNlTGVuZ3RoIiwic3dpcGVyQ3VycmVudCIsInJlcHV0YXRpb24iLCJnb29kSWQiLCJtZXRob2RzIiwic3dpcGVyQ2hhbmdlIiwiZSIsImRldGFpbCIsImN1cnJlbnQiLCJsb29rYWxsIiwid3giLCJuYXZpZ2F0ZVRvIiwidXJsIiwiZXZlbnRzIiwiZ2V0UmVwdXRhdGlvbiIsInRoYXQiLCJpZCIsIiRicm9hZGNhc3QiLCIkaW52b2tlIiwicmVxdWVzdCIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwic3ViRG9tYWluIiwic3VjY2VzcyIsInJlcyIsImJhc2ljSW5mbyIsIm1pblByaWNlIiwib3JpZ2luYWxQcmljZSIsInN0b3JlcyIsInBpY3MiLCJsZW5ndGgiLCJjb2RlIiwiZmRNcDQiLCJzZXRUaW1lb3V0IiwidGl0bGUiLCJuYW1lIiwicGF0aCIsInVpZCIsImNvbnNvbGUiLCJsb2ciLCJmYWlsIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsVzs7Ozs7Ozs7Ozs7Ozs7Z01BQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCLE1BRGpCO0FBRVBDLHVCQUFpQjtBQUNmLG9CQUFZLDJDQURHO0FBRWYscUJBQWEsNENBRkU7QUFHZix1QkFBZTtBQUhBO0FBRlYsSyxRQVFW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LEtBQUtmLFlBQUwsR0FBb0IsQ0FBeEM7QUFDQTtBQUNEO0FBQ0Y7QUFYVSxXQUFiO0FBYUQ7QUEzQlUsT0FBYjtBQTZCQTtBQUNBaUMsaUJBQVcsWUFBVTtBQUNuQmxCLGFBQUtHLE9BQUwsQ0FBYSxvQkFBYixFQUFtQyxZQUFuQyxFQUFpRCxLQUFqRCxFQUF3RCxPQUF4RDtBQUNELE9BRkQsRUFFRyxHQUZIO0FBR0Q7Ozt3Q0FDbUI7QUFDbEIsYUFBTztBQUNMZ0IsZUFBTyxLQUFLeEMsVUFBTCxDQUFnQitCLFNBQWhCLENBQTBCVSxJQUQ1QjtBQUVMQyxjQUFNLG1DQUFtQyxLQUFLMUMsVUFBTCxDQUFnQitCLFNBQWhCLENBQTBCVCxFQUE3RCxHQUFrRSxjQUFsRSxHQUFtRixLQUFLSSxPQUFMLENBQWFDLFVBQWIsQ0FBd0JnQixHQUY1RztBQUdMZCxpQkFBUyxpQkFBVUMsR0FBVixFQUFlO0FBQ3RCO0FBQ0FjLGtCQUFRQyxHQUFSLENBQVksSUFBWixFQUFrQmYsR0FBbEI7QUFDRCxTQU5JO0FBT0xnQixjQUFNLGNBQVVoQixHQUFWLEVBQWU7QUFDbkI7QUFDQWMsa0JBQVFDLEdBQVIsQ0FBWSxJQUFaLEVBQWtCZixHQUFsQjtBQUNEO0FBVkksT0FBUDtBQVlEOzs7O0VBckZzQyxlQUFLaUIsSTs7a0JBQXpCNUQsVyIsImZpbGUiOiJnb29kZGV0YWlsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0IERldGFpbERlc2MgZnJvbSAnQC9jb21wb25lbnRzL2RldGFpbGRlc2MnXG5pbXBvcnQgUmVwdXRhdGlvbkNoaW9jZXMgZnJvbSAnQC9jb21wb25lbnRzL3JlcHV0YXRpb24tY2hpb2NlcydcbmltcG9ydCBSZXB1dGF0aW9uQ29udGVudCBmcm9tICdAL2NvbXBvbmVudHMvcmVwdXRhdGlvbi1jb250ZW50J1xuaW1wb3J0IFJlY29tbWVuZCBmcm9tICdAL2NvbXBvbmVudHMvZ29vZHMnXG5pbXBvcnQgVGFiQmFyIGZyb20gJ0AvY29tcG9uZW50cy90YWJCYXInXG5pbXBvcnQgVG9hc3QgZnJvbSAnd2VweS1jb20tdG9hc3QnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdvb2REZWF0YWlsIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfllYblk4Hor6bmg4UnLFxuICAgIHVzaW5nQ29tcG9uZW50czoge1xuICAgICAgJ3d4Yy1lbGlwJzogJy4uLy4uL3BhY2thZ2VzL0BtaW51aS93eGMtZWxpcC9kaXN0L2luZGV4JyxcbiAgICAgICd3eGMtcG9wdXAnOiAnLi4vLi4vcGFja2FnZXMvQG1pbnVpL3d4Yy1wb3B1cC9kaXN0L2luZGV4JyxcbiAgICAgICd3eGMtY291bnRlcic6ICcuLi8uLi9wYWNrYWdlcy9AbWludWkvd3hjLWNvdW50ZXIvZGlzdC9pbmRleCdcbiAgICB9XG4gIH1cbiAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcInJlcHV0YXRpb24tY29udGVudFwiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6Z29vZElkLnN5bmNcIjpcImdvb2RJZFwifSxcInRhYmJhclwiOntcInYtYmluZDpnb29kRGV0YWlsLnN5bmNcIjpcImdvb2REZXRhaWxcIn19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xuICAgIGRldGFpbGRlc2M6IERldGFpbERlc2MsXG4gICAgJ3JlcHV0YXRpb24tY2hpb2Nlcyc6IFJlcHV0YXRpb25DaGlvY2VzLFxuICAgICdyZXB1dGF0aW9uLWNvbnRlbnQnOiBSZXB1dGF0aW9uQ29udGVudCxcbiAgICByZWNvbW1lbmQ6IFJlY29tbWVuZCxcbiAgICB0YWJiYXI6IFRhYkJhcixcbiAgICB0b2FzdDogVG9hc3RcbiAgfVxuICBkYXRhID0ge1xuICAgIGdvb2REZXRhaWw6IFtdLFxuICAgIGJ1eU51bU1heDogMCxcbiAgICBuZXdQcmljZTogMCxcbiAgICBvbGRQcmljZTogMCxcbiAgICB2aWRlb0lkOiAnJyxcbiAgICB2aWRlb01wNFNyYzogJycsXG4gICAgc291cmNlTGVuZ3RoOiAwLFxuICAgIHN3aXBlckN1cnJlbnQ6IDAsXG4gICAgcmVwdXRhdGlvbjogMCxcbiAgICBnb29kSWQ6ICcnXG4gIH1cbiAgb25Mb2FkKGUpIHtcbiAgICBjb25zdCB0aGF0ID0gdGhpc1xuICAgIHRoYXQuZ29vZElkID0gZS5pZFxuICAgIHRoYXQuJGJyb2FkY2FzdCgnZ29vZElkJywgZS5pZClcbiAgICB0aGF0LiRpbnZva2UoJ3JlcHV0YXRpb24tY29udGVudCcsICdnZXRSZXB1dGF0aW9uJywgZS5pZClcbiAgICAvL+iOt+WPluWVhuWTgeivpuaDhVxuICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICB1cmw6ICdodHRwczovL2FwaS5pdDEyMC5jYy8nICsgdGhhdC4kcGFyZW50Lmdsb2JhbERhdGEuc3ViRG9tYWluICsgJy9zaG9wL2dvb2RzL2RldGFpbCcsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIGlkOiBlLmlkXG4gICAgICB9LFxuICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICB0aGF0Lmdvb2REZXRhaWwgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgIHRoYXQubmV3UHJpY2UgPSByZXMuZGF0YS5kYXRhLmJhc2ljSW5mby5taW5QcmljZVxuICAgICAgICB0aGF0Lm9sZFByaWNlID0gcmVzLmRhdGEuZGF0YS5iYXNpY0luZm8ub3JpZ2luYWxQcmljZVxuICAgICAgICB0aGF0LmJ1eU51bU1heCA9IHJlcy5kYXRhLmRhdGEuYmFzaWNJbmZvLnN0b3Jlc1xuICAgICAgICB0aGF0LnNvdXJjZUxlbmd0aCA9IHJlcy5kYXRhLmRhdGEucGljcy5sZW5ndGhcbiAgICAgICAgdGhhdC52aWRlb0lkID0gcmVzLmRhdGEuZGF0YS5iYXNpY0luZm8udmlkZW9JZFxuICAgICAgICAvLyB0aGF0LiRhcHBseSgpXG4gICAgLy/ojrflj5bllYblk4Hop4bpopFcbiAgICAgICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgICAgICB1cmw6ICdodHRwczovL2FwaS5pdDEyMC5jYy8nICsgdGhhdC4kcGFyZW50Lmdsb2JhbERhdGEuc3ViRG9tYWluICsgJy9tZWRpYS92aWRlby9kZXRhaWwnLFxuICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIHZpZGVvSWQ6IHRoYXQudmlkZW9JZFxuICAgICAgICAgIH0sXG4gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgaWYgKHJlcy5kYXRhLmNvZGUgPT0gMCkge1xuICAgICAgICAgICAgICB0aGF0LnZpZGVvTXA0U3JjID0gcmVzLmRhdGEuZGF0YS5mZE1wNFxuICAgICAgICAgICAgICB0aGF0LnNvdXJjZUxlbmd0aCA9IHRoYXQuc291cmNlTGVuZ3RoICsgMVxuICAgICAgICAgICAgICAvLyB0aGF0LiRhcHBseSgpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0pXG4gICAgLy8g5ZWG5ZOB6K+E5Lu3XG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgdGhhdC4kaW52b2tlKCdyZXB1dGF0aW9uLWNvbnRlbnQnLCAnZ2V0Q29udGVudCcsICdhbGwnLCAnZmFsc2UnKVxuICAgIH0sIDUwMClcbiAgfVxuICBvblNoYXJlQXBwTWVzc2FnZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdGl0bGU6IHRoaXMuZ29vZERldGFpbC5iYXNpY0luZm8ubmFtZSxcbiAgICAgIHBhdGg6ICcvcGFnZXMvZ29vZHMtZGV0YWlscy9pbmRleD9pZD0nICsgdGhpcy5nb29kRGV0YWlsLmJhc2ljSW5mby5pZCArICcmaW52aXRlcl9pZD0nICsgdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudWlkLFxuICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAvLyDovazlj5HmiJDlip9cbiAgICAgICAgY29uc29sZS5sb2coJ+aIkOWKnycsIHJlcylcbiAgICAgIH0sXG4gICAgICBmYWlsOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgIC8vIOi9rOWPkeWksei0pVxuICAgICAgICBjb25zb2xlLmxvZygn5aSx6LSlJywgcmVzKVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBtZXRob2RzID0ge1xuICAgIHN3aXBlckNoYW5nZShlKSB7XG4gICAgICB0aGlzLnN3aXBlckN1cnJlbnQgPSBlLmRldGFpbC5jdXJyZW50XG4gICAgfSxcbiAgICBsb29rYWxsKCkge1xuICAgICAgaWYgKHRoaXMucmVwdXRhdGlvbiA+IDApIHtcbiAgICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnL3BhZ2VzL2FsbC1yZXB1dGF0aW9uP2lkPScgKyB0aGlzLmdvb2RJZFxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBldmVudHMgPSB7XG4gICAgZ2V0UmVwdXRhdGlvbihkYXRhKSB7XG4gICAgICB0aGlzLnJlcHV0YXRpb24gPSBkYXRhXG4gICAgfVxuICB9XG59XG4iXX0=