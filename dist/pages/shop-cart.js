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
      onhtouchmove: function onhtouchmove(index) {
        this.x[index] = this.x[index] == 0 ? 146 : 0;
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNob3AtY2FydC5qcyJdLCJuYW1lcyI6WyJQYXkiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwidXNpbmdDb21wb25lbnRzIiwiY29tcG9uZW50cyIsInRvYXN0IiwiZGF0YSIsIm9yZGVycyIsIm51bWJlciIsImNob29zZUFsbCIsInRvdGFsIiwibWV0aG9kcyIsIm9uQ2hhbmdlTnVtYmVyIiwiZSIsIm1hcCIsIml0ZW0iLCJpbmRleCIsImN1cnJlbnRUYXJnZXQiLCJpZCIsImRldGFpbCIsInd4Iiwic2V0U3RvcmFnZSIsImtleSIsImNhbGNUb3RhbCIsIm9uaHRvdWNobW92ZSIsIngiLCJkZWxldGUiLCJhcnJheSIsImZvckVhY2giLCJnb29kc0lkIiwicHVzaCIsImNob29zZUdvb2QiLCJpc0Nob29zZWQiLCJmbGFnIiwib25DaG9vc2VBbGwiLCJ0b0RldGFpbCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJidXlOb3ciLCJsZW5ndGgiLCIkaW52b2tlIiwidGl0bGUiLCJpbWciLCJtaW5QcmljZSIsIm9yaWdpbmFsUHJpY2UiLCJ0b0ZpeGVkIiwidGhhdCIsImdldFN0b3JhZ2UiLCJzdWNjZXNzIiwicmVzIiwiJGFwcGx5IiwiZ2V0RGF0YSIsInNldFRpbWVvdXQiLCJjb21wb25lbnQiLCIkd3hwYWdlIiwic2VsZWN0Q29tcG9uZW50IiwidXBkYXRlTnVtYmVyIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxHOzs7Ozs7Ozs7Ozs7OztnTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0IsS0FEakI7QUFFUEMsdUJBQWlCO0FBQ2YsdUJBQWU7QUFEQTtBQUZWLEssUUFNVEMsVSxHQUFhO0FBQ1hDO0FBRFcsSyxRQUdiQyxJLEdBQU87QUFDTEMsY0FBUSxFQURIO0FBRUxDLGNBQVEsQ0FGSDtBQUdMQyxpQkFBVyxLQUhOLEVBR2E7QUFDbEJDLGFBQU87QUFKRixLLFFBTVBDLE8sR0FB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QUFBOztBQUNQLFdBQUtDLE9BQUw7QUFDQSxXQUFLMUMsU0FBTCxHQUFpQixLQUFqQjtBQUNBMkMsaUJBQVcsWUFBTTtBQUNmLGVBQUs3QyxNQUFMLENBQVlxQixPQUFaLENBQW9CLFVBQUNiLElBQUQsRUFBT0MsS0FBUCxFQUFpQjtBQUNuQyxjQUFJcUMsWUFBWSxPQUFLQyxPQUFMLENBQWFDLGVBQWIsZUFBeUN2QyxLQUF6QyxDQUFoQjtBQUNBcUMsdUJBQWFBLFVBQVVHLFlBQVYsQ0FBdUJ6QyxLQUFLUCxNQUE1QixDQUFiO0FBQ0QsU0FIRDtBQUlBLGVBQUtlLFNBQUw7QUFDQSxlQUFLMkIsTUFBTDtBQUNELE9BUEQsRUFPRyxHQVBIO0FBUUQ7Ozs7RUE1SThCLGVBQUtPLEk7O2tCQUFqQnpELEciLCJmaWxlIjoic2hvcC1jYXJ0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0IFRvYXN0IGZyb20gJ3dlcHktY29tLXRvYXN0J1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYXkgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+i0reeJqei9picsXG4gICAgdXNpbmdDb21wb25lbnRzOiB7XG4gICAgICAnd3hjLWNvdW50ZXInOiAnLi4vLi4vcGFja2FnZXMvQG1pbnVpL3d4Yy1jb3VudGVyL2Rpc3QvaW5kZXgnXG4gICAgfVxuICB9XG4gIGNvbXBvbmVudHMgPSB7XG4gICAgdG9hc3Q6IFRvYXN0XG4gIH1cbiAgZGF0YSA9IHtcbiAgICBvcmRlcnM6IFtdLFxuICAgIG51bWJlcjogMSxcbiAgICBjaG9vc2VBbGw6IGZhbHNlLCAvLyDmmK/lkKblhajpgIlVSVxuICAgIHRvdGFsOiAwXG4gIH1cbiAgbWV0aG9kcyA9IHtcbiAgICBvbkNoYW5nZU51bWJlcihlKSB7XG4gICAgICB0aGlzLm9yZGVycy5tYXAoKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgIGlmKGluZGV4ID09IGUuY3VycmVudFRhcmdldC5pZCkge1xuICAgICAgICAgIGl0ZW0ubnVtYmVyID0gZS5kZXRhaWwubnVtYmVyXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGl0ZW1cbiAgICAgIH0pXG4gICAgICB3eC5zZXRTdG9yYWdlKHtcbiAgICAgICAga2V5OiAnYWRkR29vZHMnLFxuICAgICAgICBkYXRhOiB0aGlzLm9yZGVyc1xuICAgICAgfSlcbiAgICAgIHRoaXMuY2FsY1RvdGFsKClcbiAgICB9LFxuICAgIG9uaHRvdWNobW92ZShpbmRleCkge1xuICAgICAgdGhpcy54W2luZGV4XSA9IHRoaXMueFtpbmRleF0gPT0gMCA/IDE0NiA6IDBcbiAgICB9LFxuICAgIGRlbGV0ZShlKSB7XG4gICAgICBsZXQgYXJyYXkgPSBbXVxuICAgICAgdGhpcy5vcmRlcnMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICBpZihpdGVtLmdvb2RzSWQgIT09IGUpIHtcbiAgICAgICAgICBhcnJheS5wdXNoKGl0ZW0pXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICB3eC5zZXRTdG9yYWdlKHtcbiAgICAgICAga2V5OiAnYWRkR29vZHMnLFxuICAgICAgICBkYXRhOiBhcnJheVxuICAgICAgfSlcbiAgICAgIHRoaXMub3JkZXJzID0gYXJyYXlcbiAgICAgIHRoaXMuY2FsY1RvdGFsKClcbiAgICB9LFxuICAgIGNob29zZUdvb2QoZGF0YSkge1xuICAgICAgdGhpcy5vcmRlcnMubWFwKChpdGVtKSA9PiB7XG4gICAgICAgIGlmKGl0ZW0uZ29vZHNJZCA9PSBkYXRhLmdvb2RzSWQpIHtcbiAgICAgICAgICBpdGVtLmlzQ2hvb3NlZCA9ICFpdGVtLmlzQ2hvb3NlZFxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpdGVtXG4gICAgICB9KVxuICAgICAgdGhpcy5jYWxjVG90YWwoKVxuICAgICAgbGV0IGZsYWcgPSB0cnVlXG4gICAgICB0aGlzLm9yZGVycy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIGlmKCFpdGVtLmlzQ2hvb3NlZCkge1xuICAgICAgICAgIGZsYWcgPSBmYWxzZVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgdGhpcy5jaG9vc2VBbGwgPSBmbGFnXG4gICAgfSxcbiAgICBvbkNob29zZUFsbCgpIHtcbiAgICAgIHRoaXMuY2hvb3NlQWxsID0gIXRoaXMuY2hvb3NlQWxsXG4gICAgICB0aGlzLm9yZGVycy5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgaXRlbS5pc0Nob29zZWQgPSB0aGlzLmNob29zZUFsbFxuICAgICAgICByZXR1cm4gaXRlbVxuICAgICAgfSlcbiAgICAgIHRoaXMuY2FsY1RvdGFsKClcbiAgICB9LFxuICAgIHRvRGV0YWlsKGlkKSB7XG4gICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgdXJsOiAnL3BhZ2VzL2dvb2RkZXRhaWw/aWQ9JyArIGlkXG4gICAgICB9KVxuICAgIH0sXG4gICAgLy8g5LiL5Y2VXG4gICAgYnV5Tm93KCkge1xuICAgICAgbGV0IGFycmF5ID0gW11cbiAgICAgIHRoaXMub3JkZXJzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgaWYoaXRlbS5pc0Nob29zZWQpIHtcbiAgICAgICAgICBhcnJheS5wdXNoKGl0ZW0pXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICBpZihhcnJheS5sZW5ndGggPT0gMCkge1xuICAgICAgICB0aGlzLiRpbnZva2UoJ3RvYXN0JywgJ3Nob3cnLCB7XG4gICAgICAgICAgdGl0bGU6ICfmsqHmnInpgInmi6nnianlk4FcYuWTpn4nLFxuICAgICAgICAgIGltZzogJy4uL2ltYWdlcy9mYWlsLnBuZydcbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHd4LnNldFN0b3JhZ2Uoe1xuICAgICAgICAgIGtleTogJ2FkZEdvb2RzJyxcbiAgICAgICAgICBkYXRhOiB0aGlzLm9yZGVyc1xuICAgICAgICB9KVxuICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcvcGFnZXMvcGF5P2Zyb209c2hvcC1jYXJ0JyBcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgLy8g6Ieq5a6a5LmJbWV0aG9kXG4gIGNhbGNUb3RhbCAoKSB7XG4gICAgdGhpcy50b3RhbCA9IDBcbiAgICB0aGlzLm9yZGVycy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICBpZihpdGVtLmlzQ2hvb3NlZCAmJiBpdGVtLm51bWJlciA+IDIpIHtcbiAgICAgICAgdGhpcy50b3RhbCArPSBpdGVtLm51bWJlciAqIGl0ZW0ubWluUHJpY2UgICBcbiAgICAgIH0gZWxzZSBpZiAoaXRlbS5pc0Nob29zZWQgJiYgaXRlbS5udW1iZXIgPCAzKSB7XG4gICAgICAgIHRoaXMudG90YWwgKz0gaXRlbS5udW1iZXIgKiBpdGVtLm9yaWdpbmFsUHJpY2VcbiAgICAgIH1cbiAgICB9KVxuICAgIHRoaXMudG90YWwgPSB0aGlzLnRvdGFsLnRvRml4ZWQoMSlcbiAgfVxuICBnZXREYXRhICgpIHtcbiAgICBjb25zdCB0aGF0ID0gdGhpc1xuICAgIHd4LmdldFN0b3JhZ2Uoe1xuICAgICAga2V5OiAnYWRkR29vZHMnLFxuICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICB0aGF0Lm9yZGVycyA9IHJlcy5kYXRhLm1hcCgoaXRlbSkgPT4ge1xuICAgICAgICAgIGl0ZW0uaXNDaG9vc2VkID0gZmFsc2VcbiAgICAgICAgICByZXR1cm4gaXRlbVxuICAgICAgICB9KVxuICAgICAgICB3eC5zZXRTdG9yYWdlKHtcbiAgICAgICAgICBrZXk6ICdhZGRHb29kcycsXG4gICAgICAgICAgZGF0YTogdGhhdC5vcmRlcnNcbiAgICAgICAgfSlcbiAgICAgICAgdGhhdC4kYXBwbHkoKVxuICAgICAgfVxuICAgIH0pXG4gIH1cbiAgb25TaG93KCkge1xuICAgIHRoaXMuZ2V0RGF0YSgpXG4gICAgdGhpcy5jaG9vc2VBbGwgPSBmYWxzZVxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5vcmRlcnMuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgbGV0IGNvbXBvbmVudCA9IHRoaXMuJHd4cGFnZS5zZWxlY3RDb21wb25lbnQoYC5jb3VudGVyXyR7aW5kZXh9YClcbiAgICAgICAgY29tcG9uZW50ICYmIGNvbXBvbmVudC51cGRhdGVOdW1iZXIoaXRlbS5udW1iZXIpXG4gICAgICB9KVxuICAgICAgdGhpcy5jYWxjVG90YWwoKVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sIDEwMClcbiAgfVxufVxuIl19