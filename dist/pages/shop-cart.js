'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _wepyComToast = require('./../npm/wepy-com-toast/toast.js');

var _wepyComToast2 = _interopRequireDefault(_wepyComToast);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Pay = function (_wepy$page) {
  _inherits(Pay, _wepy$page);

  function Pay() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Pay);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Pay.__proto__ || Object.getPrototypeOf(Pay)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '购物车',
      usingComponents: {
        'wxc-counter': '../../packages/@minui/wxc-counter/dist/index'
      }
    }, _this.components = {
      toast: _wepyComToast2.default
    }, _this.data = {
      orders: [],
      number: 1,
      isShow: '',
      chooseAll: false, // 是否全选UI
      total: 0
    }, _this.methods = {
      onChangeNumber: function onChangeNumber(e) {
        this.orders.map(function (item, index) {
          if (index == e.currentTarget.id) {
            item.number = e.detail.number;
          }
          return item;
        });
        wx.setStorage({
          key: 'addGoods',
          data: this.orders
        });
        this.calcTotal();
      },
      onhtouchmove: function onhtouchmove(item) {
        this.isShow = item.goodsId;
      },
      delete: function _delete(e) {
        var array = [];
        this.orders.forEach(function (item) {
          if (item.goodsId !== e) {
            array.push(item);
          }
        });
        wx.setStorage({
          key: 'addGoods',
          data: array
        });
        this.orders = array;
        this.calcTotal();
      },
      chooseGood: function chooseGood(data) {
        this.orders.map(function (item) {
          if (item.goodsId == data.goodsId) {
            item.isChoosed = !item.isChoosed;
          }
          return item;
        });
        this.calcTotal();
        var flag = true;
        this.orders.forEach(function (item) {
          if (!item.isChoosed) {
            flag = false;
          }
        });
        this.chooseAll = flag;
      },
      onChooseAll: function onChooseAll() {
        var _this2 = this;

        this.chooseAll = !this.chooseAll;
        this.orders.map(function (item) {
          item.isChoosed = _this2.chooseAll;
          return item;
        });
        this.calcTotal();
      },
      toDetail: function toDetail(id) {
        wx.navigateTo({
          url: '/pages/gooddetail?id=' + id
        });
      },

      // 下单
      buyNow: function buyNow() {
        var array = [];
        this.orders.forEach(function (item) {
          if (item.isChoosed) {
            array.push(item);
          }
        });
        if (array.length == 0) {
          this.$invoke('toast', 'show', {
            title: '没有选择物品哦~',
            img: '../images/fail.png'
          });
        } else {
          wx.setStorage({
            key: 'addGoods',
            data: this.orders
          });
          wx.navigateTo({
            url: '/pages/pay?from=shop-cart'
          });
        }
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Pay, [{
    key: 'calcTotal',

    // 自定义method
    value: function calcTotal() {
      var _this3 = this;

      this.total = 0;
      this.orders.forEach(function (item) {
        if (item.isChoosed && item.number > 2) {
          _this3.total += item.number * item.minPrice;
        } else if (item.isChoosed && item.number < 3) {
          _this3.total += item.number * item.originalPrice;
        }
      });
      this.total = this.total.toFixed(1);
    }
  }, {
    key: 'getData',
    value: function getData() {
      var that = this;
      wx.getStorage({
        key: 'addGoods',
        success: function success(res) {
          that.orders = res.data.map(function (item) {
            item.isChoosed = false;
            return item;
          });
          wx.setStorage({
            key: 'addGoods',
            data: that.orders
          });
          that.$apply();
        }
      });
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      var _this4 = this;

      this.getData();
      this.chooseAll = false;
      setTimeout(function () {
        _this4.orders.forEach(function (item, index) {
          var component = _this4.$wxpage.selectComponent('.counter_' + index);
          component && component.updateNumber(item.number);
        });
        _this4.calcTotal();
        _this4.$apply();
      }, 100);
    }
  }]);

  return Pay;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Pay , 'pages/shop-cart'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNob3AtY2FydC5qcyJdLCJuYW1lcyI6WyJQYXkiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwidXNpbmdDb21wb25lbnRzIiwiY29tcG9uZW50cyIsInRvYXN0IiwiZGF0YSIsIm9yZGVycyIsIm51bWJlciIsImlzU2hvdyIsImNob29zZUFsbCIsInRvdGFsIiwibWV0aG9kcyIsIm9uQ2hhbmdlTnVtYmVyIiwiZSIsIm1hcCIsIml0ZW0iLCJpbmRleCIsImN1cnJlbnRUYXJnZXQiLCJpZCIsImRldGFpbCIsInd4Iiwic2V0U3RvcmFnZSIsImtleSIsImNhbGNUb3RhbCIsIm9uaHRvdWNobW92ZSIsImdvb2RzSWQiLCJkZWxldGUiLCJhcnJheSIsImZvckVhY2giLCJwdXNoIiwiY2hvb3NlR29vZCIsImlzQ2hvb3NlZCIsImZsYWciLCJvbkNob29zZUFsbCIsInRvRGV0YWlsIiwibmF2aWdhdGVUbyIsInVybCIsImJ1eU5vdyIsImxlbmd0aCIsIiRpbnZva2UiLCJ0aXRsZSIsImltZyIsIm1pblByaWNlIiwib3JpZ2luYWxQcmljZSIsInRvRml4ZWQiLCJ0aGF0IiwiZ2V0U3RvcmFnZSIsInN1Y2Nlc3MiLCJyZXMiLCIkYXBwbHkiLCJnZXREYXRhIiwic2V0VGltZW91dCIsImNvbXBvbmVudCIsIiR3eHBhZ2UiLCJzZWxlY3RDb21wb25lbnQiLCJ1cGRhdGVOdW1iZXIiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLEc7Ozs7Ozs7Ozs7Ozs7O2dMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QixLQURqQjtBQUVQQyx1QkFBaUI7QUFDZix1QkFBZTtBQURBO0FBRlYsSyxRQU1UQyxVLEdBQWE7QUFDWEM7QUFEVyxLLFFBR2JDLEksR0FBTztBQUNMQyxjQUFRLEVBREg7QUFFTEMsY0FBUSxDQUZIO0FBR0xDLGNBQVEsRUFISDtBQUlMQyxpQkFBVyxLQUpOLEVBSWE7QUFDbEJDLGFB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QUFpQixLQUFqQjtBQUNBMEMsaUJBQVcsWUFBTTtBQUNmLGVBQUs3QyxNQUFMLENBQVlzQixPQUFaLENBQW9CLFVBQUNiLElBQUQsRUFBT0MsS0FBUCxFQUFpQjtBQUNuQyxjQUFJb0MsWUFBWSxPQUFLQyxPQUFMLENBQWFDLGVBQWIsZUFBeUN0QyxLQUF6QyxDQUFoQjtBQUNBb0MsdUJBQWFBLFVBQVVHLFlBQVYsQ0FBdUJ4QyxLQUFLUixNQUE1QixDQUFiO0FBQ0QsU0FIRDtBQUlBLGVBQUtnQixTQUFMO0FBQ0EsZUFBSzBCLE1BQUw7QUFDRCxPQVBELEVBT0csR0FQSDtBQVFEOzs7O0VBN0k4QixlQUFLTyxJOztrQkFBakJ6RCxHIiwiZmlsZSI6InNob3AtY2FydC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCBUb2FzdCBmcm9tICd3ZXB5LWNvbS10b2FzdCdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGF5IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfotK3nianovaYnLFxuICAgIHVzaW5nQ29tcG9uZW50czoge1xuICAgICAgJ3d4Yy1jb3VudGVyJzogJy4uLy4uL3BhY2thZ2VzL0BtaW51aS93eGMtY291bnRlci9kaXN0L2luZGV4J1xuICAgIH1cbiAgfVxuICBjb21wb25lbnRzID0ge1xuICAgIHRvYXN0OiBUb2FzdFxuICB9XG4gIGRhdGEgPSB7XG4gICAgb3JkZXJzOiBbXSxcbiAgICBudW1iZXI6IDEsXG4gICAgaXNTaG93OiAnJyxcbiAgICBjaG9vc2VBbGw6IGZhbHNlLCAvLyDmmK/lkKblhajpgIlVSVxuICAgIHRvdGFsOiAwXG4gIH1cbiAgbWV0aG9kcyA9IHtcbiAgICBvbkNoYW5nZU51bWJlcihlKSB7XG4gICAgICB0aGlzLm9yZGVycy5tYXAoKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgIGlmKGluZGV4ID09IGUuY3VycmVudFRhcmdldC5pZCkge1xuICAgICAgICAgIGl0ZW0ubnVtYmVyID0gZS5kZXRhaWwubnVtYmVyXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGl0ZW1cbiAgICAgIH0pXG4gICAgICB3eC5zZXRTdG9yYWdlKHtcbiAgICAgICAga2V5OiAnYWRkR29vZHMnLFxuICAgICAgICBkYXRhOiB0aGlzLm9yZGVyc1xuICAgICAgfSlcbiAgICAgIHRoaXMuY2FsY1RvdGFsKClcbiAgICB9LFxuICAgIG9uaHRvdWNobW92ZShpdGVtKSB7XG4gICAgICB0aGlzLmlzU2hvdyA9IGl0ZW0uZ29vZHNJZFxuICAgIH0sXG4gICAgZGVsZXRlKGUpIHtcbiAgICAgIGxldCBhcnJheSA9IFtdXG4gICAgICB0aGlzLm9yZGVycy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIGlmKGl0ZW0uZ29vZHNJZCAhPT0gZSkge1xuICAgICAgICAgIGFycmF5LnB1c2goaXRlbSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIHd4LnNldFN0b3JhZ2Uoe1xuICAgICAgICBrZXk6ICdhZGRHb29kcycsXG4gICAgICAgIGRhdGE6IGFycmF5XG4gICAgICB9KVxuICAgICAgdGhpcy5vcmRlcnMgPSBhcnJheVxuICAgICAgdGhpcy5jYWxjVG90YWwoKVxuICAgIH0sXG4gICAgY2hvb3NlR29vZChkYXRhKSB7XG4gICAgICB0aGlzLm9yZGVycy5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgaWYoaXRlbS5nb29kc0lkID09IGRhdGEuZ29vZHNJZCkge1xuICAgICAgICAgIGl0ZW0uaXNDaG9vc2VkID0gIWl0ZW0uaXNDaG9vc2VkXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGl0ZW1cbiAgICAgIH0pXG4gICAgICB0aGlzLmNhbGNUb3RhbCgpXG4gICAgICBsZXQgZmxhZyA9IHRydWVcbiAgICAgIHRoaXMub3JkZXJzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgaWYoIWl0ZW0uaXNDaG9vc2VkKSB7XG4gICAgICAgICAgZmxhZyA9IGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICB0aGlzLmNob29zZUFsbCA9IGZsYWdcbiAgICB9LFxuICAgIG9uQ2hvb3NlQWxsKCkge1xuICAgICAgdGhpcy5jaG9vc2VBbGwgPSAhdGhpcy5jaG9vc2VBbGxcbiAgICAgIHRoaXMub3JkZXJzLm1hcCgoaXRlbSkgPT4ge1xuICAgICAgICBpdGVtLmlzQ2hvb3NlZCA9IHRoaXMuY2hvb3NlQWxsXG4gICAgICAgIHJldHVybiBpdGVtXG4gICAgICB9KVxuICAgICAgdGhpcy5jYWxjVG90YWwoKVxuICAgIH0sXG4gICAgdG9EZXRhaWwoaWQpIHtcbiAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICB1cmw6ICcvcGFnZXMvZ29vZGRldGFpbD9pZD0nICsgaWRcbiAgICAgIH0pXG4gICAgfSxcbiAgICAvLyDkuIvljZVcbiAgICBidXlOb3coKSB7XG4gICAgICBsZXQgYXJyYXkgPSBbXVxuICAgICAgdGhpcy5vcmRlcnMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICBpZihpdGVtLmlzQ2hvb3NlZCkge1xuICAgICAgICAgIGFycmF5LnB1c2goaXRlbSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIGlmKGFycmF5Lmxlbmd0aCA9PSAwKSB7XG4gICAgICAgIHRoaXMuJGludm9rZSgndG9hc3QnLCAnc2hvdycsIHtcbiAgICAgICAgICB0aXRsZTogJ+ayoeaciemAieaLqeeJqeWTgVxi5ZOmficsXG4gICAgICAgICAgaW1nOiAnLi4vaW1hZ2VzL2ZhaWwucG5nJ1xuICAgICAgICB9KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd3guc2V0U3RvcmFnZSh7XG4gICAgICAgICAga2V5OiAnYWRkR29vZHMnLFxuICAgICAgICAgIGRhdGE6IHRoaXMub3JkZXJzXG4gICAgICAgIH0pXG4gICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy9wYWdlcy9wYXk/ZnJvbT1zaG9wLWNhcnQnIFxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgfVxuICAvLyDoh6rlrprkuYltZXRob2RcbiAgY2FsY1RvdGFsICgpIHtcbiAgICB0aGlzLnRvdGFsID0gMFxuICAgIHRoaXMub3JkZXJzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGlmKGl0ZW0uaXNDaG9vc2VkICYmIGl0ZW0ubnVtYmVyID4gMikge1xuICAgICAgICB0aGlzLnRvdGFsICs9IGl0ZW0ubnVtYmVyICogaXRlbS5taW5QcmljZSAgIFxuICAgICAgfSBlbHNlIGlmIChpdGVtLmlzQ2hvb3NlZCAmJiBpdGVtLm51bWJlciA8IDMpIHtcbiAgICAgICAgdGhpcy50b3RhbCArPSBpdGVtLm51bWJlciAqIGl0ZW0ub3JpZ2luYWxQcmljZVxuICAgICAgfVxuICAgIH0pXG4gICAgdGhpcy50b3RhbCA9IHRoaXMudG90YWwudG9GaXhlZCgxKVxuICB9XG4gIGdldERhdGEgKCkge1xuICAgIGNvbnN0IHRoYXQgPSB0aGlzXG4gICAgd3guZ2V0U3RvcmFnZSh7XG4gICAgICBrZXk6ICdhZGRHb29kcycsXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgIHRoYXQub3JkZXJzID0gcmVzLmRhdGEubWFwKChpdGVtKSA9PiB7XG4gICAgICAgICAgaXRlbS5pc0Nob29zZWQgPSBmYWxzZVxuICAgICAgICAgIHJldHVybiBpdGVtXG4gICAgICAgIH0pXG4gICAgICAgIHd4LnNldFN0b3JhZ2Uoe1xuICAgICAgICAgIGtleTogJ2FkZEdvb2RzJyxcbiAgICAgICAgICBkYXRhOiB0aGF0Lm9yZGVyc1xuICAgICAgICB9KVxuICAgICAgICB0aGF0LiRhcHBseSgpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuICBvblNob3coKSB7XG4gICAgdGhpcy5nZXREYXRhKClcbiAgICB0aGlzLmNob29zZUFsbCA9IGZhbHNlXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLm9yZGVycy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICBsZXQgY29tcG9uZW50ID0gdGhpcy4kd3hwYWdlLnNlbGVjdENvbXBvbmVudChgLmNvdW50ZXJfJHtpbmRleH1gKVxuICAgICAgICBjb21wb25lbnQgJiYgY29tcG9uZW50LnVwZGF0ZU51bWJlcihpdGVtLm51bWJlcilcbiAgICAgIH0pXG4gICAgICB0aGlzLmNhbGNUb3RhbCgpXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSwgMTAwKVxuICB9XG59XG4iXX0=