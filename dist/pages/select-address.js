"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SelectAddress = function (_wepy$page) {
  _inherits(SelectAddress, _wepy$page);

  function SelectAddress() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, SelectAddress);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SelectAddress.__proto__ || Object.getPrototypeOf(SelectAddress)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      "navigationBarTitleText": "我的地址"
    }, _this.data = {
      addressList: [],
      from: ''
    }, _this.methods = {
      selectTap: function selectTap(e) {
        var that = this;
        var id = e.currentTarget.dataset.id;
        wx.request({
          url: 'https://api.it120.cc/' + that.$parent.globalData.subDomain + '/user/shipping-address/update',
          data: {
            token: that.$parent.globalData.token,
            id: id,
            isDefault: 'true'
          },
          success: function success(res) {
            if (that.from == 'my') {
              wx.switchTab({
                url: '/pages/my'
              });
            } else {
              wx.navigateBack({});
            }
          }
        });
      },
      addAddess: function addAddess() {
        wx.navigateTo({
          url: "/pages/address-add"
        });
      },
      editAddess: function editAddess(e) {
        wx.navigateTo({
          url: "/pages/address-add?id=" + e.currentTarget.dataset.id
        });
      }
    }, _this.events = {
      'popstate': function popstate(res) {
        console.log(res);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(SelectAddress, [{
    key: "onShow",

    // onUnload() {
    //   wx.switchTab({
    //     url: '/pages/my'
    //   })
    // }
    value: function onShow() {
      this.initShippingAddress();
    }
  }, {
    key: "onLoad",
    value: function onLoad(e) {
      this.from = e.from;
    }
  }, {
    key: "initShippingAddress",
    value: function initShippingAddress() {
      var that = this;
      wx.request({
        url: 'https://api.it120.cc/' + that.$parent.globalData.subDomain + '/user/shipping-address/list',
        data: {
          token: that.$parent.globalData.token
        },
        success: function success(res) {
          if (res.data.code == 0) {
            that.addressList = res.data.data;
            that.$apply();
          } else if (res.data.code == 700) {
            that.addressList = [];
            that.$apply();
          }
        }
      });
    }
  }]);

  return SelectAddress;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(SelectAddress , 'pages/select-address'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlbGVjdC1hZGRyZXNzLmpzIl0sIm5hbWVzIjpbIlNlbGVjdEFkZHJlc3MiLCJjb25maWciLCJkYXRhIiwiYWRkcmVzc0xpc3QiLCJmcm9tIiwibWV0aG9kcyIsInNlbGVjdFRhcCIsImUiLCJ0aGF0IiwiaWQiLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsInd4IiwicmVxdWVzdCIsInVybCIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwic3ViRG9tYWluIiwidG9rZW4iLCJpc0RlZmF1bHQiLCJzdWNjZXNzIiwicmVzIiwic3dpdGNoVGFiIiwibmF2aWdhdGVCYWNrIiwiYWRkQWRkZXNzIiwibmF2aWdhdGVUbyIsImVkaXRBZGRlc3MiLCJldmVudHMiLCJjb25zb2xlIiwibG9nIiwiaW5pdFNoaXBwaW5nQWRkcmVzcyIsImNvZGUiLCIkYXBwbHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxhOzs7Ozs7Ozs7Ozs7OztvTUFDbkJDLE0sR0FBUztBQUNQLGdDQUEwQjtBQURuQixLLFFBR1RDLEksR0FBTztBQUNMQyxtQkFBYSxFQURSO0FBRUxDLFlBQU07QUFGRCxLLFFBSVBDLE8sR0FBVTtBQUNSQyxlQURRLHFCQUNFQyxDQURGLEVBQ0s7QUFDWCxZQUFNQyxPQUFPLElBQWI7QUFDQSxZQUFJQyxLQUFLRixFQUFFRyxhQUFGLENBQWdCQyxPQUFoQixDQUF3QkYsRUFBakM7QUFDQUcsV0FBR0MsT0FBSCxDQUFXO0FBQ1RDLGVBQUssMEJBQXlCTixLQUFLTyxPQUFMLENBQWFDLFVBQWIsQ0FBd0JDLFNBQWpELEdBQTRELCtCQUR4RDtBQUVUZixnQkFBTTtBQUNKZ0IsbUJBQU1WLEtBQUtPLE9BQUwsQ0FBYUMsVUFBYixDQUF3QkUsS0FEMUI7QUFFSlQsZ0JBQUdBLEVBRkM7QUFHSlUsdUJBQVU7QUFITixXQUZHO0FBT1RDLG1CQUFTLGlCQUFDQyxHQUFELEVBQVE7QUFDZixnQkFBR2IsS0FBS0osSUFBTCxJQUFhLElBQWhCLEVBQXNCO0FBQ3BCUSxpQkFBR1UsU0FBSCxDQUFhO0FBQ1hSLHFCQUFLO0FBRE0sZUFBYjtBQUdELGFBSkQsTUFJTztBQUNMRixpQkFBR1csWUFBSCxDQUFnQixFQUFoQjtBQUNEO0FBQ0Y7QUFmUSxTQUFYO0FBaUJELE9BckJPO0FBc0JSQyxlQXRCUSx1QkFzQkk7QUFDVlosV0FBR2EsVUFBSCxDQUFjO0FBQ1pYLGVBQUk7QUFEUSxTQUFkO0FBR0QsT0ExQk87QUEyQlJZLGdCQTNCUSxzQkEyQkluQixDQTNCSixFQTJCTztBQUNiSyxXQUFHYSxVQUFILENBQWM7QUFDWlgsZUFBSywyQkFBMkJQLEVBQUVHLGFBQUYsQ0FBZ0JDLE9BQWhCLENBQXdCRjtBQUQ1QyxTQUFkO0FBR0Q7QUEvQk8sSyxRQThEVmtCLE0sR0FBUztBQUNQLGdCQURPLG9CQUNJTixHQURKLEVBQ1M7QUFDZE8sZ0JBQVFDLEdBQVIsQ0FBWVIsR0FBWjtBQUNEO0FBSE0sSzs7Ozs7O0FBN0JUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7NkJBQ1M7QUFDUCxXQUFLUyxtQkFBTDtBQUNEOzs7MkJBQ012QixDLEVBQUc7QUFDUixXQUFLSCxJQUFMLEdBQVlHLEVBQUVILElBQWQ7QUFDRDs7OzBDQUNzQjtBQUNyQixVQUFJSSxPQUFPLElBQVg7QUFDQUksU0FBR0MsT0FBSCxDQUFXO0FBQ1RDLGFBQUssMEJBQXlCTixLQUFLTyxPQUFMLENBQWFDLFVBQWIsQ0FBd0JDLFNBQWpELEdBQTRELDZCQUR4RDtBQUVUZixjQUFNO0FBQ0pnQixpQkFBTVYsS0FBS08sT0FBTCxDQUFhQyxVQUFiLENBQXdCRTtBQUQxQixTQUZHO0FBS1RFLGlCQUFTLGlCQUFDQyxHQUFELEVBQVE7QUFDZixjQUFJQSxJQUFJbkIsSUFBSixDQUFTNkIsSUFBVCxJQUFpQixDQUFyQixFQUF3QjtBQUN0QnZCLGlCQUFLTCxXQUFMLEdBQW1Ca0IsSUFBSW5CLElBQUosQ0FBU0EsSUFBNUI7QUFDQU0saUJBQUt3QixNQUFMO0FBQ0QsV0FIRCxNQUdPLElBQUlYLElBQUluQixJQUFKLENBQVM2QixJQUFULElBQWlCLEdBQXJCLEVBQXlCO0FBQzlCdkIsaUJBQUtMLFdBQUwsR0FBbUIsRUFBbkI7QUFDQUssaUJBQUt3QixNQUFMO0FBQ0Q7QUFDRjtBQWJRLE9BQVg7QUFlRDs7OztFQXJFd0MsZUFBS0MsSTs7a0JBQTNCakMsYSIsImZpbGUiOiJzZWxlY3QtYWRkcmVzcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VsZWN0QWRkcmVzcyBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGNvbmZpZyA9IHtcbiAgICBcIm5hdmlnYXRpb25CYXJUaXRsZVRleHRcIjogXCLmiJHnmoTlnLDlnYBcIlxuICB9XG4gIGRhdGEgPSB7XG4gICAgYWRkcmVzc0xpc3Q6IFtdLFxuICAgIGZyb206ICcnXG4gIH1cbiAgbWV0aG9kcyA9IHtcbiAgICBzZWxlY3RUYXAoZSkge1xuICAgICAgY29uc3QgdGhhdCA9IHRoaXNcbiAgICAgIHZhciBpZCA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmlkO1xuICAgICAgd3gucmVxdWVzdCh7XG4gICAgICAgIHVybDogJ2h0dHBzOi8vYXBpLml0MTIwLmNjLycrIHRoYXQuJHBhcmVudC5nbG9iYWxEYXRhLnN1YkRvbWFpbiArJy91c2VyL3NoaXBwaW5nLWFkZHJlc3MvdXBkYXRlJyxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIHRva2VuOnRoYXQuJHBhcmVudC5nbG9iYWxEYXRhLnRva2VuLFxuICAgICAgICAgIGlkOmlkLFxuICAgICAgICAgIGlzRGVmYXVsdDondHJ1ZSdcbiAgICAgICAgfSxcbiAgICAgICAgc3VjY2VzczogKHJlcykgPT57XG4gICAgICAgICAgaWYodGhhdC5mcm9tID09ICdteScpIHtcbiAgICAgICAgICAgIHd4LnN3aXRjaFRhYih7XG4gICAgICAgICAgICAgIHVybDogJy9wYWdlcy9teSdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHd4Lm5hdmlnYXRlQmFjayh7fSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSxcbiAgICBhZGRBZGRlc3MoKSB7XG4gICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgdXJsOlwiL3BhZ2VzL2FkZHJlc3MtYWRkXCJcbiAgICAgIH0pXG4gICAgfSxcbiAgICBlZGl0QWRkZXNzIChlKSB7XG4gICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgdXJsOiBcIi9wYWdlcy9hZGRyZXNzLWFkZD9pZD1cIiArIGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmlkXG4gICAgICB9KVxuICAgIH1cbiAgfVxuICAvLyBvblVubG9hZCgpIHtcbiAgLy8gICB3eC5zd2l0Y2hUYWIoe1xuICAvLyAgICAgdXJsOiAnL3BhZ2VzL215J1xuICAvLyAgIH0pXG4gIC8vIH1cbiAgb25TaG93KCkge1xuICAgIHRoaXMuaW5pdFNoaXBwaW5nQWRkcmVzcygpXG4gIH1cbiAgb25Mb2FkKGUpIHtcbiAgICB0aGlzLmZyb20gPSBlLmZyb21cbiAgfVxuICBpbml0U2hpcHBpbmdBZGRyZXNzICgpIHtcbiAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgd3gucmVxdWVzdCh7XG4gICAgICB1cmw6ICdodHRwczovL2FwaS5pdDEyMC5jYy8nKyB0aGF0LiRwYXJlbnQuZ2xvYmFsRGF0YS5zdWJEb21haW4gKycvdXNlci9zaGlwcGluZy1hZGRyZXNzL2xpc3QnLFxuICAgICAgZGF0YToge1xuICAgICAgICB0b2tlbjp0aGF0LiRwYXJlbnQuZ2xvYmFsRGF0YS50b2tlblxuICAgICAgfSxcbiAgICAgIHN1Y2Nlc3M6IChyZXMpID0+e1xuICAgICAgICBpZiAocmVzLmRhdGEuY29kZSA9PSAwKSB7XG4gICAgICAgICAgdGhhdC5hZGRyZXNzTGlzdCA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICB0aGF0LiRhcHBseSgpXG4gICAgICAgIH0gZWxzZSBpZiAocmVzLmRhdGEuY29kZSA9PSA3MDApe1xuICAgICAgICAgIHRoYXQuYWRkcmVzc0xpc3QgPSBbXVxuICAgICAgICAgIHRoYXQuJGFwcGx5KClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gIH1cbiAgZXZlbnRzID0ge1xuICAgICdwb3BzdGF0ZScocmVzKSB7XG4gICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgfVxuICB9XG59XG4iXX0=