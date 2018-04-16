'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TabBar = function (_wepy$component) {
  _inherits(TabBar, _wepy$component);

  function TabBar() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, TabBar);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TabBar.__proto__ || Object.getPrototypeOf(TabBar)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
      isCollection: false,
      detail: [],
      orderNumber: 1,
      goodsId: '',
      type: ''
    }, _this.props = {
      goodDetail: {
        type: Object,
        default: {}
      }
    }, _this.methods = {
      toggleCollect: function toggleCollect() {
        this.isCollection = !this.isCollection;
        var that = this;
        if (this.isCollection) {
          _wepy2.default.request({
            url: 'https://api.it120.cc/' + that.$parent.$parent.globalData.subDomain + '/shop/goods/fav/add',
            data: {
              token: that.$parent.$parent.globalData.token,
              goodsId: that.goodsId
            },
            success: function success(res) {
              if (res.data.code == 0) {
                that.$invoke('../toast', 'show', {
                  title: '收藏成功',
                  img: '../images/success.png'
                });
              } else {
                that.$invoke('../toast', 'show', {
                  title: '收藏失败',
                  img: '../images/fail.png'
                });
                that.isCollection = !that.isCollection;
                that.$apply();
              }
            }
          });
        } else {
          _wepy2.default.request({
            url: 'https://api.it120.cc/' + that.$parent.$parent.globalData.subDomain + '/shop/goods/fav/delete',
            data: {
              token: that.$parent.$parent.globalData.token,
              goodsId: that.goodsId
            },
            success: function success(res) {
              if (res.data.code == 0) {
                that.$invoke('../toast', 'show', {
                  title: '取消收藏成功',
                  img: '../images/success.png'
                });
              } else {
                that.$invoke('../toast', 'show', {
                  title: '取消收藏失败',
                  img: '../images/fail.png'
                });
                that.isCollection = !that.isCollection;
                that.$apply();
              }
            }
          });
        }
      },
      toIndex: function toIndex() {
        wx.switchTab({
          url: '/pages/index'
        });
      },
      buyNow: function buyNow() {
        this.orderNumber = 1;
        var counterComponent = this.$wxpage.selectComponent('.counterStyle');
        counterComponent && counterComponent.initNumber();
        this.type = 'buyNow';
        var popupComponent = this.$wxpage.selectComponent('.J_Popup');
        popupComponent && popupComponent.show();
      },
      onChangeNumber: function onChangeNumber(e) {
        this.orderNumber = e.detail.number;
      },
      addGoods: function addGoods() {
        this.orderNumber = 1;
        var counterComponent = this.$wxpage.selectComponent('.counterStyle');
        counterComponent && counterComponent.initNumber();
        this.type = 'addGoods';
        var popupComponent = this.$wxpage.selectComponent('.J_Popup');
        popupComponent && popupComponent.show();
      },
      addGoodsConfim: function addGoodsConfim() {
        var that = this;
        var storeGood = {
          pic: that.goodDetail.basicInfo.pic,
          name: that.goodDetail.basicInfo.name,
          originalPrice: that.goodDetail.basicInfo.originalPrice,
          minPrice: that.goodDetail.basicInfo.minPrice,
          number: that.orderNumber,
          goodsId: that.goodsId
        };
        if (this.orderNumber > 0 && this.type == 'addGoods') {
          wx.getStorage({
            key: 'addGoods',
            success: function success(res) {
              var flag = false;
              var toStoreGood = res.data.map(function (item) {
                if (item.goodsId == that.goodsId) {
                  item.number += that.orderNumber;
                  flag = true;
                }
                return item;
              });
              // 不同商品
              if (!flag) {
                wx.setStorage({
                  key: 'addGoods',
                  data: [].concat(_toConsumableArray(res.data), [storeGood])
                });
                // 相同商品
              } else {
                wx.setStorage({
                  key: 'addGoods',
                  data: [].concat(_toConsumableArray(toStoreGood))
                });
              }
            },
            fail: function fail() {
              wx.setStorage({
                key: 'addGoods',
                data: [storeGood]
              });
            }
          });
        } else if (this.orderNumber > 0 && this.type == 'buyNow') {
          wx.setStorage({
            key: 'buyNow',
            data: storeGood
          });
          wx.navigateTo({
            url: '/pages/pay?from=buyNow'
          });
        }
        var component = that.$wxpage.selectComponent('.J_Popup');
        component && component.forceHide();
      },
      onClose: function onClose() {
        var component = this.$wxpage.selectComponent('.J_Popup');
        component && component.forceHide();
      }
    }, _this.events = {
      'goodId': function goodId(code) {
        this.goodsId = code;
        var that = this;
        _wepy2.default.request({
          url: 'https://api.it120.cc/' + that.$parent.$parent.globalData.subDomain + '/shop/goods/fav/list',
          data: {
            token: that.$parent.$parent.globalData.token
          },
          success: function success(res) {
            if (res.data.code == 404) {
              return;
            } else if (res.data.data.length > 0) {
              that.isCollection = false;
              res.data.data.forEach(function (item) {
                if (item.goodsId == code) {
                  that.isCollection = true;
                  that.$apply();
                }
              });
            }
          }
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return TabBar;
}(_wepy2.default.component);

exports.default = TabBar;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRhYkJhci5qcyJdLCJuYW1lcyI6WyJUYWJCYXIiLCJkYXRhIiwiaXNDb2xsZWN0aW9uIiwiZGV0YWlsIiwib3JkZXJOdW1iZXIiLCJnb29kc0lkIiwidHlwZSIsInByb3BzIiwiZ29vZERldGFpbCIsIk9iamVjdCIsImRlZmF1bHQiLCJtZXRob2RzIiwidG9nZ2xlQ29sbGVjdCIsInRoYXQiLCJyZXF1ZXN0IiwidXJsIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJzdWJEb21haW4iLCJ0b2tlbiIsInN1Y2Nlc3MiLCJyZXMiLCJjb2RlIiwiJGludm9rZSIsInRpdGxlIiwiaW1nIiwiJGFwcGx5IiwidG9JbmRleCIsInd4Iiwic3dpdGNoVGFiIiwiYnV5Tm93IiwiY291bnRlckNvbXBvbmVudCIsIiR3eHBhZ2UiLCJzZWxlY3RDb21wb25lbnQiLCJpbml0TnVtYmVyIiwicG9wdXBDb21wb25lbnQiLCJzaG93Iiwib25DaGFuZ2VOdW1iZXIiLCJlIiwibnVtYmVyIiwiYWRkR29vZHMiLCJhZGRHb29kc0NvbmZpbSIsInN0b3JlR29vZCIsInBpYyIsImJhc2ljSW5mbyIsIm5hbWUiLCJvcmlnaW5hbFByaWNlIiwibWluUHJpY2UiLCJnZXRTdG9yYWdlIiwia2V5IiwiZmxhZyIsInRvU3RvcmVHb29kIiwibWFwIiwiaXRlbSIsInNldFN0b3JhZ2UiLCJmYWlsIiwibmF2aWdhdGVUbyIsImNvbXBvbmVudCIsImZvcmNlSGlkZSIsIm9uQ2xvc2UiLCJldmVudHMiLCJsZW5ndGgiLCJmb3JFYWNoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0lBRXFCQSxNOzs7Ozs7Ozs7Ozs7OztzTEFDbkJDLEksR0FBTztBQUNMQyxvQkFBYyxLQURUO0FBRUxDLGNBQVEsRUFGSDtBQUdMQyxtQkFBYSxDQUhSO0FBSUxDLGVBQVMsRUFKSjtBQUtMQyxZQUFNO0FBTEQsSyxRQU9QQyxLLEdBQVE7QUFDTkMsa0JBQVk7QUFDVkYsY0FBTUcsTUFESTtBQUVW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QUFhO0FBQ1hDLGVBQUssMEJBQTBCRixLQUFLRyxPQUFMLENBQWFBLE9BQWIsQ0FBcUJDLFVBQXJCLENBQWdDQyxTQUExRCxHQUFzRSxzQkFEaEU7QUFFWGpCLGdCQUFNO0FBQ0prQixtQkFBT04sS0FBS0csT0FBTCxDQUFhQSxPQUFiLENBQXFCQyxVQUFyQixDQUFnQ0U7QUFEbkMsV0FGSztBQUtYQyxtQkFBUyxpQkFBVUMsR0FBVixFQUFlO0FBQ3RCLGdCQUFHQSxJQUFJcEIsSUFBSixDQUFTcUIsSUFBVCxJQUFpQixHQUFwQixFQUF5QjtBQUN2QjtBQUNELGFBRkQsTUFFTyxJQUFHRCxJQUFJcEIsSUFBSixDQUFTQSxJQUFULENBQWM0RCxNQUFkLEdBQXVCLENBQTFCLEVBQTZCO0FBQ2xDaEQsbUJBQUtYLFlBQUwsR0FBb0IsS0FBcEI7QUFDQW1CLGtCQUFJcEIsSUFBSixDQUFTQSxJQUFULENBQWM2RCxPQUFkLENBQXNCLFVBQUNULElBQUQsRUFBVTtBQUM5QixvQkFBR0EsS0FBS2hELE9BQUwsSUFBZ0JpQixJQUFuQixFQUF5QjtBQUN2QlQsdUJBQUtYLFlBQUwsR0FBb0IsSUFBcEI7QUFDQVcsdUJBQUthLE1BQUw7QUFDRDtBQUNGLGVBTEQ7QUFNRDtBQUNGO0FBakJVLFNBQWI7QUFtQkQ7QUF2Qk0sSzs7OztFQXRKeUIsZUFBSytCLFM7O2tCQUFwQnpELE0iLCJmaWxlIjoidGFiQmFyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JyBcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFiQmFyIGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xuICBkYXRhID0ge1xuICAgIGlzQ29sbGVjdGlvbjogZmFsc2UsXG4gICAgZGV0YWlsOiBbXSxcbiAgICBvcmRlck51bWJlcjogMSxcbiAgICBnb29kc0lkOiAnJyxcbiAgICB0eXBlOiAnJ1xuICB9XG4gIHByb3BzID0ge1xuICAgIGdvb2REZXRhaWw6IHtcbiAgICAgIHR5cGU6IE9iamVjdCxcbiAgICAgIGRlZmF1bHQ6IHt9XG4gICAgfVxuICB9XG4gIG1ldGhvZHMgPSB7XG4gICAgdG9nZ2xlQ29sbGVjdCgpIHtcbiAgICAgIHRoaXMuaXNDb2xsZWN0aW9uID0gIXRoaXMuaXNDb2xsZWN0aW9uXG4gICAgICBjb25zdCB0aGF0ID0gdGhpc1xuICAgICAgaWYodGhpcy5pc0NvbGxlY3Rpb24pIHtcbiAgICAgICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgICAgICB1cmw6ICdodHRwczovL2FwaS5pdDEyMC5jYy8nICsgdGhhdC4kcGFyZW50LiRwYXJlbnQuZ2xvYmFsRGF0YS5zdWJEb21haW4gKyAnL3Nob3AvZ29vZHMvZmF2L2FkZCcsXG4gICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgdG9rZW46IHRoYXQuJHBhcmVudC4kcGFyZW50Lmdsb2JhbERhdGEudG9rZW4sXG4gICAgICAgICAgICBnb29kc0lkOiB0aGF0Lmdvb2RzSWRcbiAgICAgICAgICB9LFxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgIGlmKHJlcy5kYXRhLmNvZGUgPT0gMCkge1xuICAgICAgICAgICAgICB0aGF0LiRpbnZva2UoJy4uL3RvYXN0JywgJ3Nob3cnLCB7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICfmlLbol4/miJDlip8nLFxuICAgICAgICAgICAgICAgIGltZzogJy4uL2ltYWdlcy9zdWNjZXNzLnBuZydcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoYXQuJGludm9rZSgnLi4vdG9hc3QnLCAnc2hvdycsIHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+aUtuiXj+Wksei0pScsXG4gICAgICAgICAgICAgICAgaW1nOiAnLi4vaW1hZ2VzL2ZhaWwucG5nJ1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICB0aGF0LmlzQ29sbGVjdGlvbiA9ICF0aGF0LmlzQ29sbGVjdGlvblxuICAgICAgICAgICAgICB0aGF0LiRhcHBseSgpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgICAgICB1cmw6ICdodHRwczovL2FwaS5pdDEyMC5jYy8nICsgdGhhdC4kcGFyZW50LiRwYXJlbnQuZ2xvYmFsRGF0YS5zdWJEb21haW4gKyAnL3Nob3AvZ29vZHMvZmF2L2RlbGV0ZScsXG4gICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgdG9rZW46IHRoYXQuJHBhcmVudC4kcGFyZW50Lmdsb2JhbERhdGEudG9rZW4sXG4gICAgICAgICAgICBnb29kc0lkOiB0aGF0Lmdvb2RzSWRcbiAgICAgICAgICB9LFxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgIGlmKHJlcy5kYXRhLmNvZGUgPT0gMCkge1xuICAgICAgICAgICAgICB0aGF0LiRpbnZva2UoJy4uL3RvYXN0JywgJ3Nob3cnLCB7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICflj5bmtojmlLbol4/miJDlip8nLFxuICAgICAgICAgICAgICAgIGltZzogJy4uL2ltYWdlcy9zdWNjZXNzLnBuZydcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoYXQuJGludm9rZSgnLi4vdG9hc3QnLCAnc2hvdycsIHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+WPlua2iOaUtuiXj+Wksei0pScsXG4gICAgICAgICAgICAgICAgaW1nOiAnLi4vaW1hZ2VzL2ZhaWwucG5nJ1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICB0aGF0LmlzQ29sbGVjdGlvbiA9ICF0aGF0LmlzQ29sbGVjdGlvblxuICAgICAgICAgICAgICB0aGF0LiRhcHBseSgpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0sXG4gICAgdG9JbmRleCgpIHtcbiAgICAgIHd4LnN3aXRjaFRhYih7XG4gICAgICAgIHVybDogJy9wYWdlcy9pbmRleCcsXG4gICAgICB9KVxuICAgIH0sXG4gICAgYnV5Tm93KCkge1xuICAgICAgdGhpcy5vcmRlck51bWJlciA9IDFcbiAgICAgIGxldCBjb3VudGVyQ29tcG9uZW50ID0gdGhpcy4kd3hwYWdlLnNlbGVjdENvbXBvbmVudCgnLmNvdW50ZXJTdHlsZScpXG4gICAgICBjb3VudGVyQ29tcG9uZW50ICYmIGNvdW50ZXJDb21wb25lbnQuaW5pdE51bWJlcigpXG4gICAgICB0aGlzLnR5cGUgPSAnYnV5Tm93J1xuICAgICAgbGV0IHBvcHVwQ29tcG9uZW50ID0gdGhpcy4kd3hwYWdlLnNlbGVjdENvbXBvbmVudCgnLkpfUG9wdXAnKTtcbiAgICAgIHBvcHVwQ29tcG9uZW50ICYmIHBvcHVwQ29tcG9uZW50LnNob3coKTtcbiAgICB9LFxuICAgIG9uQ2hhbmdlTnVtYmVyIChlKSB7XG4gICAgICB0aGlzLm9yZGVyTnVtYmVyID0gZS5kZXRhaWwubnVtYmVyXG4gICAgfSxcbiAgICBhZGRHb29kcygpIHtcbiAgICAgIHRoaXMub3JkZXJOdW1iZXIgPSAxXG4gICAgICBsZXQgY291bnRlckNvbXBvbmVudCA9IHRoaXMuJHd4cGFnZS5zZWxlY3RDb21wb25lbnQoJy5jb3VudGVyU3R5bGUnKVxuICAgICAgY291bnRlckNvbXBvbmVudCAmJiBjb3VudGVyQ29tcG9uZW50LmluaXROdW1iZXIoKVxuICAgICAgdGhpcy50eXBlID0gJ2FkZEdvb2RzJ1xuICAgICAgbGV0IHBvcHVwQ29tcG9uZW50ID0gdGhpcy4kd3hwYWdlLnNlbGVjdENvbXBvbmVudCgnLkpfUG9wdXAnKTtcbiAgICAgIHBvcHVwQ29tcG9uZW50ICYmIHBvcHVwQ29tcG9uZW50LnNob3coKTtcbiAgICB9LFxuICAgIGFkZEdvb2RzQ29uZmltKCkge1xuICAgICAgY29uc3QgdGhhdCA9IHRoaXNcbiAgICAgIGNvbnN0IHN0b3JlR29vZCA9IHtcbiAgICAgICAgcGljOiB0aGF0Lmdvb2REZXRhaWwuYmFzaWNJbmZvLnBpYyxcbiAgICAgICAgbmFtZTogdGhhdC5nb29kRGV0YWlsLmJhc2ljSW5mby5uYW1lLFxuICAgICAgICBvcmlnaW5hbFByaWNlOiB0aGF0Lmdvb2REZXRhaWwuYmFzaWNJbmZvLm9yaWdpbmFsUHJpY2UsXG4gICAgICAgIG1pblByaWNlOiB0aGF0Lmdvb2REZXRhaWwuYmFzaWNJbmZvLm1pblByaWNlLFxuICAgICAgICBudW1iZXI6IHRoYXQub3JkZXJOdW1iZXIsXG4gICAgICAgIGdvb2RzSWQ6IHRoYXQuZ29vZHNJZFxuICAgICAgfVxuICAgICAgaWYgKHRoaXMub3JkZXJOdW1iZXIgPiAwICYmIHRoaXMudHlwZSA9PSAnYWRkR29vZHMnKSB7XG4gICAgICAgIHd4LmdldFN0b3JhZ2Uoe1xuICAgICAgICAgIGtleTogJ2FkZEdvb2RzJyxcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgIGxldCBmbGFnID0gZmFsc2VcbiAgICAgICAgICAgIGxldCB0b1N0b3JlR29vZCA9IHJlcy5kYXRhLm1hcCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICBpZihpdGVtLmdvb2RzSWQgPT0gdGhhdC5nb29kc0lkKSB7XG4gICAgICAgICAgICAgICAgaXRlbS5udW1iZXIgKz0gdGhhdC5vcmRlck51bWJlclxuICAgICAgICAgICAgICAgIGZsYWcgPSB0cnVlXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIGl0ZW1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAvLyDkuI3lkIzllYblk4FcbiAgICAgICAgICAgIGlmKCFmbGFnKSB7XG4gICAgICAgICAgICAgIHd4LnNldFN0b3JhZ2Uoe1xuICAgICAgICAgICAgICAgIGtleTogJ2FkZEdvb2RzJyxcbiAgICAgICAgICAgICAgICBkYXRhOiBbLi4ucmVzLmRhdGEsIHN0b3JlR29vZF1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC8vIOebuOWQjOWVhuWTgVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgd3guc2V0U3RvcmFnZSh7XG4gICAgICAgICAgICAgICAga2V5OiAnYWRkR29vZHMnLFxuICAgICAgICAgICAgICAgIGRhdGE6IFsuLi50b1N0b3JlR29vZF1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgd3guc2V0U3RvcmFnZSh7XG4gICAgICAgICAgICAgIGtleTogJ2FkZEdvb2RzJyxcbiAgICAgICAgICAgICAgZGF0YTogW3N0b3JlR29vZF1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIGlmICh0aGlzLm9yZGVyTnVtYmVyID4gMCAmJiB0aGlzLnR5cGUgPT0gJ2J1eU5vdycpIHtcbiAgICAgICAgd3guc2V0U3RvcmFnZSh7XG4gICAgICAgICAga2V5OiAnYnV5Tm93JyxcbiAgICAgICAgICBkYXRhOiBzdG9yZUdvb2RcbiAgICAgICAgfSlcbiAgICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnL3BhZ2VzL3BheT9mcm9tPWJ1eU5vdydcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICAgIGxldCBjb21wb25lbnQgPSB0aGF0LiR3eHBhZ2Uuc2VsZWN0Q29tcG9uZW50KCcuSl9Qb3B1cCcpXG4gICAgICBjb21wb25lbnQgJiYgY29tcG9uZW50LmZvcmNlSGlkZSgpXG4gICAgfSxcbiAgICBvbkNsb3NlKCkge1xuICAgICAgbGV0IGNvbXBvbmVudCA9IHRoaXMuJHd4cGFnZS5zZWxlY3RDb21wb25lbnQoJy5KX1BvcHVwJylcbiAgICAgIGNvbXBvbmVudCAmJiBjb21wb25lbnQuZm9yY2VIaWRlKClcbiAgICB9XG4gIH1cbiAgZXZlbnRzID0ge1xuICAgICdnb29kSWQnKGNvZGUpIHtcbiAgICAgIHRoaXMuZ29vZHNJZCA9IGNvZGVcbiAgICAgIGNvbnN0IHRoYXQgPSB0aGlzXG4gICAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgICB1cmw6ICdodHRwczovL2FwaS5pdDEyMC5jYy8nICsgdGhhdC4kcGFyZW50LiRwYXJlbnQuZ2xvYmFsRGF0YS5zdWJEb21haW4gKyAnL3Nob3AvZ29vZHMvZmF2L2xpc3QnLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgdG9rZW46IHRoYXQuJHBhcmVudC4kcGFyZW50Lmdsb2JhbERhdGEudG9rZW4sXG4gICAgICAgIH0sXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICBpZihyZXMuZGF0YS5jb2RlID09IDQwNCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH0gZWxzZSBpZihyZXMuZGF0YS5kYXRhLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoYXQuaXNDb2xsZWN0aW9uID0gZmFsc2VcbiAgICAgICAgICAgIHJlcy5kYXRhLmRhdGEuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICBpZihpdGVtLmdvb2RzSWQgPT0gY29kZSkge1xuICAgICAgICAgICAgICAgIHRoYXQuaXNDb2xsZWN0aW9uID0gdHJ1ZVxuICAgICAgICAgICAgICAgIHRoYXQuJGFwcGx5KClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9XG59XG4iXX0=