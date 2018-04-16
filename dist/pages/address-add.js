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

var AddressAdd = function (_wepy$page) {
  _inherits(AddressAdd, _wepy$page);

  function AddressAdd() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, AddressAdd);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = AddressAdd.__proto__ || Object.getPrototypeOf(AddressAdd)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      "navigationBarTitleText": "新增地址"
    }, _this.data = {
      provinces: [],
      citys: [],
      districts: [],
      selProvince: '请选择',
      selCity: '请选择',
      selDistrict: '请选择',
      selProvinceIndex: 0,
      selCityIndex: 0,
      selDistrictIndex: 0,
      addressData: null,
      id: '',
      commonCityData: []
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(AddressAdd, [{
    key: "bindCancel",
    value: function bindCancel() {
      wx.navigateBack({});
    }
  }, {
    key: "bindSave",
    value: function bindSave(e) {
      var that = this;
      var userName = e.detail.value.userName;
      var detailInfo = e.detail.value.detailInfo;
      var telNumber = e.detail.value.telNumber;
      var postalCode = e.detail.value.postalCode;

      if (userName == "") {
        wx.showModal({
          title: '提示',
          content: '请填写联系人姓名',
          showCancel: false
        });
        return;
      }
      if (telNumber == "") {
        wx.showModal({
          title: '提示',
          content: '请填写手机号码',
          showCancel: false
        });
        return;
      }
      if (this.selProvince == "请选择") {
        wx.showModal({
          title: '提示',
          content: '请选择地区',
          showCancel: false
        });
        return;
      }
      if (this.selCity == "请选择") {
        wx.showModal({
          title: '提示',
          content: '请选择地区',
          showCancel: false
        });
        return;
      }
      var cityId = this.commonCityData[this.selProvinceIndex].cityList[this.selCityIndex].id;
      var districtId;
      if (this.selDistrict == "请选择" || !this.selDistrict) {
        districtId = '';
      } else {
        districtId = this.commonCityData[this.selProvinceIndex].cityList[this.selCityIndex].districtList[this.selDistrictIndex].id;
      }
      if (detailInfo == "") {
        wx.showModal({
          title: '提示',
          content: '请填写详细地址',
          showCancel: false
        });
        return;
      }
      if (postalCode == "") {
        wx.showModal({
          title: '提示',
          content: '请填写邮编',
          showCancel: false
        });
        return;
      }
      var apiAddoRuPDATE = "add";
      var apiAddid = that.id;
      if (apiAddid) {
        apiAddoRuPDATE = "update";
      } else {
        apiAddid = 0;
      }
      wx.request({
        url: 'https://api.it120.cc/' + that.$parent.globalData.subDomain + '/user/shipping-address/' + apiAddoRuPDATE,
        data: {
          token: that.$parent.globalData.token,
          id: apiAddid,
          provinceId: that.commonCityData[that.selProvinceIndex].id,
          cityId: cityId,
          districtId: districtId,
          linkMan: userName,
          address: detailInfo,
          mobile: telNumber,
          code: postalCode,
          isDefault: 'true'
        },
        success: function success(res) {
          if (res.data.code != 0) {
            // 登录错误 
            wx.hideLoading();
            wx.showModal({
              title: '失败',
              content: res.data.msg,
              showCancel: false
            });
            return;
          }
          // 跳转到结算页面
          wx.navigateBack({});
        }
      });
    }
  }, {
    key: "initCityData",
    value: function initCityData(level, obj) {
      if (level == 1) {
        var pinkArray = [];
        for (var i = 0; i < this.commonCityData.length; i++) {
          pinkArray.push(this.commonCityData[i].name);
        }
        this.provinces = pinkArray;
      } else if (level == 2) {
        var pinkArray = [];
        var dataArray = obj.cityList;
        for (var i = 0; i < dataArray.length; i++) {
          pinkArray.push(dataArray[i].name);
        }
        this.citys = pinkArray;
      } else if (level == 3) {
        var pinkArray = [];
        var dataArray = obj.districtList;
        for (var i = 0; i < dataArray.length; i++) {
          pinkArray.push(dataArray[i].name);
        }
        this.districts = pinkArray;
      }
    }
  }, {
    key: "bindPickerProvinceChange",
    value: function bindPickerProvinceChange(event) {
      var selIterm = this.commonCityData[event.detail.value];
      this.selProvince = selIterm.name;
      this.selProvinceIndex = event.detail.value;
      this.selCity = '请选择';
      this.selCityIndex = 0;
      this.selDistrict = '请选择';
      this.selDistrictIndex = 0;
      this.initCityData(2, selIterm);
    }
  }, {
    key: "bindPickerCityChange",
    value: function bindPickerCityChange(event) {
      var selIterm = this.commonCityData[this.selProvinceIndex].cityList[event.detail.value];
      this.selCity = selIterm.name;
      this.selCityIndex = event.detail.value;
      this.selDistrict = '请选择';
      this.selDistrictIndex = 0;
      this.initCityData(3, selIterm);
    }
  }, {
    key: "bindPickerChange",
    value: function bindPickerChange(event) {
      var selIterm = this.commonCityData[this.selProvinceIndex].cityList[this.selCityIndex].districtList[event.detail.value];
      if (selIterm && selIterm.name && event.detail.value) {
        this.selDistrict = selIterm.name, this.selDistrictIndex = event.detail.value;
      }
    }
  }, {
    key: "onLoad",
    value: function onLoad(e) {
      var that = this;
      wx.showLoading();
      this.commonCityData = this.$parent.globalData.commonCityData;
      this.$apply();
      this.initCityData(1);
      var id = e.id;
      if (id) {
        // 初始化原数据
        wx.request({
          url: 'https://api.it120.cc/' + that.$parent.globalData.subDomain + '/user/shipping-address/detail',
          data: {
            token: that.$parent.globalData.token,
            id: id
          },
          success: function success(res) {
            if (res.data.code == 0) {
              that.id = id;
              that.addressData = {
                userName: res.data.data.linkMan,
                detailInfo: res.data.data.address,
                telNumber: res.data.data.mobile,
                postalCode: res.data.data.code,
                id: res.data.data.id
              };
              that.selProvince = res.data.data.provinceStr;
              that.selCity = res.data.data.cityStr;
              that.selDistrict = res.data.data.areaStr;
              that.$apply();
              that.setDBSaveAddressId(res.data.data);
              wx.hideLoading();
              return;
            } else {
              wx.showModal({
                title: '提示',
                content: '无法获取快递地址数据',
                showCancel: false
              });
            }
          }
        });
      } else {
        that.id = '';
        that.addressData = null;
        that.selProvince = '请选择';
        that.selCity = '请选择';
        that.selDistrict = '请选择';
        wx.hideLoading();
        that.$apply();
      }
    }
  }, {
    key: "setDBSaveAddressId",
    value: function setDBSaveAddressId(data) {
      var retSelIdx = 0;
      for (var i = 0; i < this.commonCityData.length; i++) {
        if (data.provinceId == this.commonCityData[i].id) {
          this.selProvinceIndex = i;
          for (var j = 0; j < this.commonCityData[i].cityList.length; j++) {
            if (data.cityId == this.commonCityData[i].cityList[j].id) {
              this.selCityIndex = j;
              for (var k = 0; k < this.commonCityData[i].cityList[j].districtList.length; k++) {
                if (data.districtId == this.commonCityData[i].cityList[j].districtList[k].id) {
                  this.selDistrictIndex = k;
                }
              }
            }
          }
        }
      }
    }
  }, {
    key: "selectCity",
    value: function selectCity() {}
  }, {
    key: "deleteAddress",
    value: function deleteAddress(e) {
      var that = this;
      var id = e.currentTarget.dataset.id;
      wx.showModal({
        title: '提示',
        content: '确定要删除该收货地址吗？',
        success: function success(res) {
          if (res.confirm) {
            wx.request({
              url: 'https://api.it120.cc/' + that.$parent.globalData.subDomain + '/user/shipping-address/delete',
              data: {
                token: that.$parent.globalData.token,
                id: id
              },
              success: function success(res) {
                wx.navigateBack({});
              }
            });
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        }
      });
    }
  }, {
    key: "readFromWx",
    value: function readFromWx() {
      var that = this;
      wx.chooseAddress({
        success: function success(res) {
          var provinceName = res.provinceName;
          var cityName = res.cityName;
          var diatrictName = res.countyName;
          var retSelIdx = 0;
          for (var i = 0; i < that.commonCityData.length; i++) {
            if (provinceName == that.commonCityData[i].name) {
              var eventJ = { detail: { value: i } };
              that.bindPickerProvinceChange(eventJ);
              that.selProvinceIndex = i;
              for (var j = 0; j < that.commonCityData[i].cityList.length; j++) {
                if (cityName == that.commonCityData[i].cityList[j].name) {
                  //that.data.selCityIndex = j;
                  eventJ = { detail: { value: j } };
                  that.bindPickerCityChange(eventJ);
                  for (var k = 0; k < that.commonCityData[i].cityList[j].districtList.length; k++) {
                    if (diatrictName == that.commonCityData[i].cityList[j].districtList[k].name) {
                      //that.data.selDistrictIndex = k;
                      eventJ = { detail: { value: k } };
                      that.bindPickerChange(eventJ);
                    }
                  }
                }
              }
            }
          }
          that.addressData = res;
          that.$apply();
        }
      });
    }
  }]);

  return AddressAdd;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(AddressAdd , 'pages/address-add'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkZHJlc3MtYWRkLmpzIl0sIm5hbWVzIjpbIkFkZHJlc3NBZGQiLCJjb25maWciLCJkYXRhIiwicHJvdmluY2VzIiwiY2l0eXMiLCJkaXN0cmljdHMiLCJzZWxQcm92aW5jZSIsInNlbENpdHkiLCJzZWxEaXN0cmljdCIsInNlbFByb3ZpbmNlSW5kZXgiLCJzZWxDaXR5SW5kZXgiLCJzZWxEaXN0cmljdEluZGV4IiwiYWRkcmVzc0RhdGEiLCJpZCIsImNvbW1vbkNpdHlEYXRhIiwid3giLCJuYXZpZ2F0ZUJhY2siLCJlIiwidGhhdCIsInVzZXJOYW1lIiwiZGV0YWlsIiwidmFsdWUiLCJkZXRhaWxJbmZvIiwidGVsTnVtYmVyIiwicG9zdGFsQ29kZSIsInNob3dNb2RhbCIsInRpdGxlIiwiY29udGVudCIsInNob3dDYW5jZWwiLCJjaXR5SWQiLCJjaXR5TGlzdCIsImRpc3RyaWN0SWQiLCJkaXN0cmljdExpc3QiLCJhcGlBZGRvUnVQREFURSIsImFwaUFkZGlkIiwicmVxdWVzdCIsInVybCIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwic3ViRG9tYWluIiwidG9rZW4iLCJwcm92aW5jZUlkIiwibGlua01hbiIsImFkZHJlc3MiLCJtb2JpbGUiLCJjb2RlIiwiaXNEZWZhdWx0Iiwic3VjY2VzcyIsInJlcyIsImhpZGVMb2FkaW5nIiwibXNnIiwibGV2ZWwiLCJvYmoiLCJwaW5rQXJyYXkiLCJpIiwibGVuZ3RoIiwicHVzaCIsIm5hbWUiLCJkYXRhQXJyYXkiLCJldmVudCIsInNlbEl0ZXJtIiwiaW5pdENpdHlEYXRhIiwic2hvd0xvYWRpbmciLCIkYXBwbHkiLCJwcm92aW5jZVN0ciIsImNpdHlTdHIiLCJhcmVhU3RyIiwic2V0REJTYXZlQWRkcmVzc0lkIiwicmV0U2VsSWR4IiwiaiIsImsiLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsImNvbmZpcm0iLCJjYW5jZWwiLCJjb25zb2xlIiwibG9nIiwiY2hvb3NlQWRkcmVzcyIsInByb3ZpbmNlTmFtZSIsImNpdHlOYW1lIiwiZGlhdHJpY3ROYW1lIiwiY291bnR5TmFtZSIsImV2ZW50SiIsImJpbmRQaWNrZXJQcm92aW5jZUNoYW5nZSIsImJpbmRQaWNrZXJDaXR5Q2hhbmdlIiwiYmluZFBpY2tlckNoYW5nZSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFDcUJBLFU7Ozs7Ozs7Ozs7Ozs7OzhMQUNuQkMsTSxHQUFTO0FBQ1AsZ0NBQTBCO0FBRG5CLEssUUFHVEMsSSxHQUFPO0FBQ0xDLGlCQUFVLEVBREw7QUFFTEMsYUFBTSxFQUZEO0FBR0xDLGlCQUFVLEVBSEw7QUFJTEMsbUJBQVksS0FKUDtBQUtMQyxlQUFRLEtBTEg7QUFNTEMsbUJBQVksS0FOUDtBQU9MQyx3QkFBaUIsQ0FQWjtBQVFMQyxvQkFBYSxDQVJSO0FBU0xDLHdCQUFpQixDQVRaO0FBVUxDLG1CQUFhLElBVlI7QUFXTEMsVUFBRyxFQVhFO0FBWUxDLHNCQUFnQjtBQVpYLEs7Ozs7O2lDQWNPO0FBQ1pDLFNBQUdDLFlBQUgsQ0FBZ0IsRUFBaEI7QUFDRDs7OzZCQUNTQyxDLEVBQUc7QUFDWCxVQUFJQyxPQUFPLElBQVg7QUFDQSxVQUFJQyxXQUFXRixFQUFFRyxNQUFGLENBQVNDLEtBQVQsQ0FBZUYsUUFBOUI7QUFDQSxVQUFJRyxhQUFhTCxFQUFFRyxNQUFGLENBQVNDLEtBQVQsQ0FBZUMsVUFBaEM7QUFDQSxVQUFJQyxZQUFZTixFQUFFRyxNQUFGLENBQVNDLEtBQVQsQ0FBZUUsU0FBL0I7QUFDQSxVQUFJQyxhQUFhUCxFQUFFRyxNQUFGLENBQVNDLEtBQVQsQ0FBZUcsVUFBaEM7O0FBRUEsVUFBSUwsWUFBWSxFQUFoQixFQUFtQjtBQUNqQkosV0FBR1UsU0FBSCxDQUFhO0FBQ1hDLGlCQUFPLElBREk7QUFFWEMsbUJBQVMsVUFGRTtBQUdYQyxzQkFBVztBQUhBLFNBQWI7QUFLQTtBQUNEO0FBQ0QsVUFBSUwsYUFBYSxFQUFqQixFQUFvQjtBQUNsQlIsV0FBR1UsU0FBSCxDQUFhO0FBQ1hDLGlCQUFPLElBREk7QUFFWEMsbUJBQVMsU0FGRTtBQUdYQyxzQkFBVztBQUhBLFNBQWI7QUFLQTtBQUNEO0FBQ0QsVUFBSSxLQUFLdEIsV0FBTCxJQUFvQixLQUF4QixFQUE4QjtBQUM1QlMsV0FBR1UsU0FBSCxDQUFhO0FBQ1hDLGlCQUFPLElBREk7QUFFWEMsbUJBQVMsT0FGRTtBQUdYQyxzQkFBVztBQUhBLFNBQWI7QUFLQTtBQUNEO0FBQ0QsVUFBSSxLQUFLckIsT0FBTCxJQUFnQixLQUFwQixFQUEwQjtBQUN4QlEsV0FBR1UsU0FBSCxDQUFhO0FBQ1hDLGlCQUFPLElBREk7QUFFWEMsbUJBQVMsT0FGRTtBQUdYQyxzQkFBVztBQUhBLFNBQWI7QUFLQTtBQUNEO0FBQ0QsVUFBSUMsU0FBUyxLQUFLZixjQUFMLENBQW9CLEtBQUtMLGdCQUF6QixFQUEyQ3FCLFFBQTNDLENBQW9ELEtBQUtwQixZQUF6RCxFQUF1RUcsRUFBcEY7QUFDQSxVQUFJa0IsVUFBSjtBQUNBLFVBQUksS0FBS3ZCLFdBQUwsSUFBb0IsS0FBcEIsSUFBNkIsQ0FBQyxLQUFLQSxXQUF2QyxFQUFtRDtBQUNqRHVCLHFCQUFhLEVBQWI7QUFDRCxPQUZELE1BRU87QUFDTEEscUJBQWEsS0FBS2pCLGNBQUwsQ0FBb0IsS0FBS0wsZ0JBQXpCLEVBQTJDcUIsUUFBM0MsQ0FBb0QsS0FBS3BCLFlBQXpELEVBQXVFc0IsWUFBdkUsQ0FBb0YsS0FBS3JCLGdCQUF6RixFQUEyR0UsRUFBeEg7QUFDRDtBQUNELFVBQUlTLGNBQWMsRUFBbEIsRUFBcUI7QUFDbkJQLFdBQUdVLFNBQUgsQ0FBYTtBQUNYQyxpQkFBTyxJQURJO0FBRVhDLG1CQUFTLFNBRkU7QUFHWEMsc0JBQVc7QUFIQSxTQUFiO0FBS0E7QUFDRDtBQUNELFVBQUlKLGNBQWMsRUFBbEIsRUFBcUI7QUFDbkJULFdBQUdVLFNBQUgsQ0FBYTtBQUNYQyxpQkFBTyxJQURJO0FBRVhDLG1CQUFTLE9BRkU7QUFHWEMsc0JBQVc7QUFIQSxTQUFiO0FBS0E7QUFDRDtBQUNELFVBQUlLLGlCQUFpQixLQUFyQjtBQUNBLFVBQUlDLFdBQVdoQixLQUFLTCxFQUFwQjtBQUNBLFVBQUlxQixRQUFKLEVBQWM7QUFDWkQseUJBQWlCLFFBQWpCO0FBQ0QsT0FGRCxNQUVPO0FBQ0xDLG1CQUFXLENBQVg7QUFDRDtBQUNEbkIsU0FBR29CLE9BQUgsQ0FBVztBQUNUQyxhQUFLLDBCQUEwQmxCLEtBQUttQixPQUFMLENBQWFDLFVBQWIsQ0FBd0JDLFNBQWxELEdBQThELHlCQUE5RCxHQUEwRk4sY0FEdEY7QUFFVC9CLGNBQU07QUFDSnNDLGlCQUFPdEIsS0FBS21CLE9BQUwsQ0FBYUMsVUFBYixDQUF3QkUsS0FEM0I7QUFFSjNCLGNBQUlxQixRQUZBO0FBR0pPLHNCQUFZdkIsS0FBS0osY0FBTCxDQUFvQkksS0FBS1QsZ0JBQXpCLEVBQTJDSSxFQUhuRDtBQUlKZ0Isa0JBQVFBLE1BSko7QUFLSkUsc0JBQVlBLFVBTFI7QUFNSlcsbUJBQVF2QixRQU5KO0FBT0p3QixtQkFBUXJCLFVBUEo7QUFRSnNCLGtCQUFPckIsU0FSSDtBQVNKc0IsZ0JBQUtyQixVQVREO0FBVUpzQixxQkFBVTtBQVZOLFNBRkc7QUFjVEMsaUJBQVMsaUJBQVNDLEdBQVQsRUFBYztBQUNyQixjQUFJQSxJQUFJOUMsSUFBSixDQUFTMkMsSUFBVCxJQUFpQixDQUFyQixFQUF3QjtBQUN0QjtBQUNBOUIsZUFBR2tDLFdBQUg7QUFDQWxDLGVBQUdVLFNBQUgsQ0FBYTtBQUNYQyxxQkFBTyxJQURJO0FBRVhDLHVCQUFTcUIsSUFBSTlDLElBQUosQ0FBU2dELEdBRlA7QUFHWHRCLDBCQUFXO0FBSEEsYUFBYjtBQUtBO0FBQ0Q7QUFDRDtBQUNBYixhQUFHQyxZQUFILENBQWdCLEVBQWhCO0FBQ0Q7QUEzQlEsT0FBWDtBQTZCRDs7O2lDQUNhbUMsSyxFQUFPQyxHLEVBQUs7QUFDeEIsVUFBR0QsU0FBUyxDQUFaLEVBQWM7QUFDWixZQUFJRSxZQUFZLEVBQWhCO0FBQ0EsYUFBSSxJQUFJQyxJQUFJLENBQVosRUFBY0EsSUFBRSxLQUFLeEMsY0FBTCxDQUFvQnlDLE1BQXBDLEVBQTJDRCxHQUEzQyxFQUErQztBQUM3Q0Qsb0JBQVVHLElBQVYsQ0FBZSxLQUFLMUMsY0FBTCxDQUFvQndDLENBQXBCLEVBQXVCRyxJQUF0QztBQUNEO0FBQ0QsYUFBS3RELFNBQUwsR0FBaUJrRCxTQUFqQjtBQUNELE9BTkQsTUFNTyxJQUFJRixTQUFTLENBQWIsRUFBZTtBQUNwQixZQUFJRSxZQUFZLEVBQWhCO0FBQ0EsWUFBSUssWUFBWU4sSUFBSXRCLFFBQXBCO0FBQ0EsYUFBSSxJQUFJd0IsSUFBSSxDQUFaLEVBQWNBLElBQUVJLFVBQVVILE1BQTFCLEVBQWlDRCxHQUFqQyxFQUFxQztBQUNuQ0Qsb0JBQVVHLElBQVYsQ0FBZUUsVUFBVUosQ0FBVixFQUFhRyxJQUE1QjtBQUNEO0FBQ0QsYUFBS3JELEtBQUwsR0FBYWlELFNBQWI7QUFDRCxPQVBNLE1BT0EsSUFBSUYsU0FBUyxDQUFiLEVBQWU7QUFDcEIsWUFBSUUsWUFBWSxFQUFoQjtBQUNBLFlBQUlLLFlBQVlOLElBQUlwQixZQUFwQjtBQUNBLGFBQUksSUFBSXNCLElBQUksQ0FBWixFQUFjQSxJQUFFSSxVQUFVSCxNQUExQixFQUFpQ0QsR0FBakMsRUFBcUM7QUFDbkNELG9CQUFVRyxJQUFWLENBQWVFLFVBQVVKLENBQVYsRUFBYUcsSUFBNUI7QUFDRDtBQUNELGFBQUtwRCxTQUFMLEdBQWlCZ0QsU0FBakI7QUFDRDtBQUNGOzs7NkNBQ3lCTSxLLEVBQU87QUFDL0IsVUFBSUMsV0FBVyxLQUFLOUMsY0FBTCxDQUFvQjZDLE1BQU12QyxNQUFOLENBQWFDLEtBQWpDLENBQWY7QUFDQSxXQUFLZixXQUFMLEdBQW1Cc0QsU0FBU0gsSUFBNUI7QUFDQSxXQUFLaEQsZ0JBQUwsR0FBd0JrRCxNQUFNdkMsTUFBTixDQUFhQyxLQUFyQztBQUNBLFdBQUtkLE9BQUwsR0FBZSxLQUFmO0FBQ0EsV0FBS0csWUFBTCxHQUFvQixDQUFwQjtBQUNBLFdBQUtGLFdBQUwsR0FBbUIsS0FBbkI7QUFDQSxXQUFLRyxnQkFBTCxHQUF3QixDQUF4QjtBQUNBLFdBQUtrRCxZQUFMLENBQWtCLENBQWxCLEVBQXFCRCxRQUFyQjtBQUNEOzs7eUNBQ3FCRCxLLEVBQU87QUFDM0IsVUFBSUMsV0FBVyxLQUFLOUMsY0FBTCxDQUFvQixLQUFLTCxnQkFBekIsRUFBMkNxQixRQUEzQyxDQUFvRDZCLE1BQU12QyxNQUFOLENBQWFDLEtBQWpFLENBQWY7QUFDQSxXQUFLZCxPQUFMLEdBQWVxRCxTQUFTSCxJQUF4QjtBQUNBLFdBQUsvQyxZQUFMLEdBQW9CaUQsTUFBTXZDLE1BQU4sQ0FBYUMsS0FBakM7QUFDQSxXQUFLYixXQUFMLEdBQW1CLEtBQW5CO0FBQ0EsV0FBS0csZ0JBQUwsR0FBeUIsQ0FBekI7QUFDQSxXQUFLa0QsWUFBTCxDQUFrQixDQUFsQixFQUFxQkQsUUFBckI7QUFDRDs7O3FDQUNpQkQsSyxFQUFPO0FBQ3ZCLFVBQUlDLFdBQVcsS0FBSzlDLGNBQUwsQ0FBb0IsS0FBS0wsZ0JBQXpCLEVBQTJDcUIsUUFBM0MsQ0FBb0QsS0FBS3BCLFlBQXpELEVBQXVFc0IsWUFBdkUsQ0FBb0YyQixNQUFNdkMsTUFBTixDQUFhQyxLQUFqRyxDQUFmO0FBQ0EsVUFBSXVDLFlBQVlBLFNBQVNILElBQXJCLElBQTZCRSxNQUFNdkMsTUFBTixDQUFhQyxLQUE5QyxFQUFxRDtBQUNuRCxhQUFLYixXQUFMLEdBQW1Cb0QsU0FBU0gsSUFBNUIsRUFDQSxLQUFLOUMsZ0JBQUwsR0FBd0JnRCxNQUFNdkMsTUFBTixDQUFhQyxLQURyQztBQUVEO0FBQ0Y7OzsyQkFDTUosQyxFQUFHO0FBQ1IsVUFBSUMsT0FBTyxJQUFYO0FBQ0FILFNBQUcrQyxXQUFIO0FBQ0EsV0FBS2hELGNBQUwsR0FBc0IsS0FBS3VCLE9BQUwsQ0FBYUMsVUFBYixDQUF3QnhCLGNBQTlDO0FBQ0EsV0FBS2lELE1BQUw7QUFDQSxXQUFLRixZQUFMLENBQWtCLENBQWxCO0FBQ0EsVUFBSWhELEtBQUtJLEVBQUVKLEVBQVg7QUFDQSxVQUFJQSxFQUFKLEVBQVE7QUFDTjtBQUNBRSxXQUFHb0IsT0FBSCxDQUFXO0FBQ1RDLGVBQUssMEJBQTBCbEIsS0FBS21CLE9BQUwsQ0FBYUMsVUFBYixDQUF3QkMsU0FBbEQsR0FBOEQsK0JBRDFEO0FBRVRyQyxnQkFBTTtBQUNKc0MsbUJBQU90QixLQUFLbUIsT0FBTCxDQUFhQyxVQUFiLENBQXdCRSxLQUQzQjtBQUVKM0IsZ0JBQUlBO0FBRkEsV0FGRztBQU1Ua0MsbUJBQVMsaUJBQVVDLEdBQVYsRUFBZTtBQUN0QixnQkFBSUEsSUFBSTlDLElBQUosQ0FBUzJDLElBQVQsSUFBaUIsQ0FBckIsRUFBd0I7QUFDdEIzQixtQkFBS0wsRUFBTCxHQUFVQSxFQUFWO0FBQ0FLLG1CQUFLTixXQUFMLEdBQW1CO0FBQ2pCTywwQkFBVTZCLElBQUk5QyxJQUFKLENBQVNBLElBQVQsQ0FBY3dDLE9BRFA7QUFFakJwQiw0QkFBWTBCLElBQUk5QyxJQUFKLENBQVNBLElBQVQsQ0FBY3lDLE9BRlQ7QUFHakJwQiwyQkFBV3lCLElBQUk5QyxJQUFKLENBQVNBLElBQVQsQ0FBYzBDLE1BSFI7QUFJakJwQiw0QkFBWXdCLElBQUk5QyxJQUFKLENBQVNBLElBQVQsQ0FBYzJDLElBSlQ7QUFLakJoQyxvQkFBSW1DLElBQUk5QyxJQUFKLENBQVNBLElBQVQsQ0FBY1c7QUFMRCxlQUFuQjtBQU9BSyxtQkFBS1osV0FBTCxHQUFtQjBDLElBQUk5QyxJQUFKLENBQVNBLElBQVQsQ0FBYzhELFdBQWpDO0FBQ0E5QyxtQkFBS1gsT0FBTCxHQUFleUMsSUFBSTlDLElBQUosQ0FBU0EsSUFBVCxDQUFjK0QsT0FBN0I7QUFDQS9DLG1CQUFLVixXQUFMLEdBQW1Cd0MsSUFBSTlDLElBQUosQ0FBU0EsSUFBVCxDQUFjZ0UsT0FBakM7QUFDQWhELG1CQUFLNkMsTUFBTDtBQUNBN0MsbUJBQUtpRCxrQkFBTCxDQUF3Qm5CLElBQUk5QyxJQUFKLENBQVNBLElBQWpDO0FBQ0FhLGlCQUFHa0MsV0FBSDtBQUNBO0FBQ0QsYUFoQkQsTUFnQk87QUFDTGxDLGlCQUFHVSxTQUFILENBQWE7QUFDWEMsdUJBQU8sSUFESTtBQUVYQyx5QkFBUyxZQUZFO0FBR1hDLDRCQUFZO0FBSEQsZUFBYjtBQUtEO0FBQ0Y7QUE5QlEsU0FBWDtBQWdDRCxPQWxDRCxNQWtDTztBQUNMVixhQUFLTCxFQUFMLEdBQVUsRUFBVjtBQUNBSyxhQUFLTixXQUFMLEdBQW1CLElBQW5CO0FBQ0FNLGFBQUtaLFdBQUwsR0FBbUIsS0FBbkI7QUFDQVksYUFBS1gsT0FBTCxHQUFlLEtBQWY7QUFDQVcsYUFBS1YsV0FBTCxHQUFtQixLQUFuQjtBQUNBTyxXQUFHa0MsV0FBSDtBQUNBL0IsYUFBSzZDLE1BQUw7QUFDRDtBQUNGOzs7dUNBQ21CN0QsSSxFQUFNO0FBQ3hCLFVBQUlrRSxZQUFZLENBQWhCO0FBQ0EsV0FBSyxJQUFJZCxJQUFJLENBQWIsRUFBZ0JBLElBQUksS0FBS3hDLGNBQUwsQ0FBb0J5QyxNQUF4QyxFQUFnREQsR0FBaEQsRUFBcUQ7QUFDbkQsWUFBSXBELEtBQUt1QyxVQUFMLElBQW1CLEtBQUszQixjQUFMLENBQW9Cd0MsQ0FBcEIsRUFBdUJ6QyxFQUE5QyxFQUFrRDtBQUNoRCxlQUFLSixnQkFBTCxHQUF3QjZDLENBQXhCO0FBQ0EsZUFBSyxJQUFJZSxJQUFJLENBQWIsRUFBZ0JBLElBQUksS0FBS3ZELGNBQUwsQ0FBb0J3QyxDQUFwQixFQUF1QnhCLFFBQXZCLENBQWdDeUIsTUFBcEQsRUFBNERjLEdBQTVELEVBQWlFO0FBQy9ELGdCQUFJbkUsS0FBSzJCLE1BQUwsSUFBZSxLQUFLZixjQUFMLENBQW9Cd0MsQ0FBcEIsRUFBdUJ4QixRQUF2QixDQUFnQ3VDLENBQWhDLEVBQW1DeEQsRUFBdEQsRUFBMEQ7QUFDeEQsbUJBQUtILFlBQUwsR0FBb0IyRCxDQUFwQjtBQUNBLG1CQUFLLElBQUlDLElBQUksQ0FBYixFQUFnQkEsSUFBSSxLQUFLeEQsY0FBTCxDQUFvQndDLENBQXBCLEVBQXVCeEIsUUFBdkIsQ0FBZ0N1QyxDQUFoQyxFQUFtQ3JDLFlBQW5DLENBQWdEdUIsTUFBcEUsRUFBNEVlLEdBQTVFLEVBQWlGO0FBQy9FLG9CQUFJcEUsS0FBSzZCLFVBQUwsSUFBbUIsS0FBS2pCLGNBQUwsQ0FBb0J3QyxDQUFwQixFQUF1QnhCLFFBQXZCLENBQWdDdUMsQ0FBaEMsRUFBbUNyQyxZQUFuQyxDQUFnRHNDLENBQWhELEVBQW1EekQsRUFBMUUsRUFBOEU7QUFDNUUsdUJBQUtGLGdCQUFMLEdBQXdCMkQsQ0FBeEI7QUFDRDtBQUNGO0FBQ0Y7QUFDRjtBQUNGO0FBQ0Y7QUFDRDs7O2lDQUNZLENBQ2I7OztrQ0FDY3JELEMsRUFBRztBQUNoQixVQUFJQyxPQUFPLElBQVg7QUFDQSxVQUFJTCxLQUFLSSxFQUFFc0QsYUFBRixDQUFnQkMsT0FBaEIsQ0FBd0IzRCxFQUFqQztBQUNBRSxTQUFHVSxTQUFILENBQWE7QUFDWEMsZUFBTyxJQURJO0FBRVhDLGlCQUFTLGNBRkU7QUFHWG9CLGlCQUFTLGlCQUFVQyxHQUFWLEVBQWU7QUFDdEIsY0FBSUEsSUFBSXlCLE9BQVIsRUFBaUI7QUFDZjFELGVBQUdvQixPQUFILENBQVc7QUFDVEMsbUJBQUssMEJBQTBCbEIsS0FBS21CLE9BQUwsQ0FBYUMsVUFBYixDQUF3QkMsU0FBbEQsR0FBOEQsK0JBRDFEO0FBRVRyQyxvQkFBTTtBQUNKc0MsdUJBQU90QixLQUFLbUIsT0FBTCxDQUFhQyxVQUFiLENBQXdCRSxLQUQzQjtBQUVKM0Isb0JBQUlBO0FBRkEsZUFGRztBQU1Ua0MsdUJBQVMsaUJBQUNDLEdBQUQsRUFBUztBQUNoQmpDLG1CQUFHQyxZQUFILENBQWdCLEVBQWhCO0FBQ0Q7QUFSUSxhQUFYO0FBVUQsV0FYRCxNQVdPLElBQUlnQyxJQUFJMEIsTUFBUixFQUFnQjtBQUNyQkMsb0JBQVFDLEdBQVIsQ0FBWSxRQUFaO0FBQ0Q7QUFDRjtBQWxCVSxPQUFiO0FBb0JEOzs7aUNBQ2E7QUFDWixVQUFJMUQsT0FBTyxJQUFYO0FBQ0FILFNBQUc4RCxhQUFILENBQWlCO0FBQ2Y5QixpQkFBUyxpQkFBVUMsR0FBVixFQUFlO0FBQ3RCLGNBQUk4QixlQUFlOUIsSUFBSThCLFlBQXZCO0FBQ0EsY0FBSUMsV0FBVy9CLElBQUkrQixRQUFuQjtBQUNBLGNBQUlDLGVBQWVoQyxJQUFJaUMsVUFBdkI7QUFDQSxjQUFJYixZQUFZLENBQWhCO0FBQ0EsZUFBSyxJQUFJZCxJQUFJLENBQWIsRUFBZ0JBLElBQUlwQyxLQUFLSixjQUFMLENBQW9CeUMsTUFBeEMsRUFBZ0RELEdBQWhELEVBQXFEO0FBQ25ELGdCQUFJd0IsZ0JBQWdCNUQsS0FBS0osY0FBTCxDQUFvQndDLENBQXBCLEVBQXVCRyxJQUEzQyxFQUFpRDtBQUMvQyxrQkFBSXlCLFNBQVMsRUFBRTlELFFBQVEsRUFBRUMsT0FBTWlDLENBQVIsRUFBVixFQUFiO0FBQ0FwQyxtQkFBS2lFLHdCQUFMLENBQThCRCxNQUE5QjtBQUNBaEUsbUJBQUtULGdCQUFMLEdBQXdCNkMsQ0FBeEI7QUFDQSxtQkFBSyxJQUFJZSxJQUFJLENBQWIsRUFBZ0JBLElBQUluRCxLQUFLSixjQUFMLENBQW9Cd0MsQ0FBcEIsRUFBdUJ4QixRQUF2QixDQUFnQ3lCLE1BQXBELEVBQTREYyxHQUE1RCxFQUFpRTtBQUMvRCxvQkFBSVUsWUFBWTdELEtBQUtKLGNBQUwsQ0FBb0J3QyxDQUFwQixFQUF1QnhCLFFBQXZCLENBQWdDdUMsQ0FBaEMsRUFBbUNaLElBQW5ELEVBQXlEO0FBQ3ZEO0FBQ0F5QiwyQkFBUyxFQUFFOUQsUUFBUSxFQUFFQyxPQUFPZ0QsQ0FBVCxFQUFWLEVBQVQ7QUFDQW5ELHVCQUFLa0Usb0JBQUwsQ0FBMEJGLE1BQTFCO0FBQ0EsdUJBQUssSUFBSVosSUFBSSxDQUFiLEVBQWdCQSxJQUFJcEQsS0FBS0osY0FBTCxDQUFvQndDLENBQXBCLEVBQXVCeEIsUUFBdkIsQ0FBZ0N1QyxDQUFoQyxFQUFtQ3JDLFlBQW5DLENBQWdEdUIsTUFBcEUsRUFBNEVlLEdBQTVFLEVBQWlGO0FBQy9FLHdCQUFJVSxnQkFBZ0I5RCxLQUFLSixjQUFMLENBQW9Cd0MsQ0FBcEIsRUFBdUJ4QixRQUF2QixDQUFnQ3VDLENBQWhDLEVBQW1DckMsWUFBbkMsQ0FBZ0RzQyxDQUFoRCxFQUFtRGIsSUFBdkUsRUFBNkU7QUFDM0U7QUFDQXlCLCtCQUFTLEVBQUU5RCxRQUFRLEVBQUVDLE9BQU9pRCxDQUFULEVBQVYsRUFBVDtBQUNBcEQsMkJBQUttRSxnQkFBTCxDQUFzQkgsTUFBdEI7QUFDRDtBQUNGO0FBQ0Y7QUFDRjtBQUNGO0FBQ0Y7QUFDRGhFLGVBQUtOLFdBQUwsR0FBbUJvQyxHQUFuQjtBQUNBOUIsZUFBSzZDLE1BQUw7QUFDRDtBQTdCYyxPQUFqQjtBQStCRDs7OztFQXhTcUMsZUFBS3VCLEk7O2tCQUF4QnRGLFUiLCJmaWxlIjoiYWRkcmVzcy1hZGQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBZGRyZXNzQWRkIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge1xuICAgIFwibmF2aWdhdGlvbkJhclRpdGxlVGV4dFwiOiBcIuaWsOWinuWcsOWdgFwiXG4gIH1cbiAgZGF0YSA9IHtcbiAgICBwcm92aW5jZXM6W10sXG4gICAgY2l0eXM6W10sXG4gICAgZGlzdHJpY3RzOltdLFxuICAgIHNlbFByb3ZpbmNlOifor7fpgInmi6knLFxuICAgIHNlbENpdHk6J+ivt+mAieaLqScsXG4gICAgc2VsRGlzdHJpY3Q6J+ivt+mAieaLqScsXG4gICAgc2VsUHJvdmluY2VJbmRleDowLFxuICAgIHNlbENpdHlJbmRleDowLFxuICAgIHNlbERpc3RyaWN0SW5kZXg6MCxcbiAgICBhZGRyZXNzRGF0YTogbnVsbCxcbiAgICBpZDonJyxcbiAgICBjb21tb25DaXR5RGF0YTogW11cbiAgfVxuICBiaW5kQ2FuY2VsICgpIHtcbiAgICB3eC5uYXZpZ2F0ZUJhY2soe30pXG4gIH1cbiAgYmluZFNhdmUgKGUpIHtcbiAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgdmFyIHVzZXJOYW1lID0gZS5kZXRhaWwudmFsdWUudXNlck5hbWU7XG4gICAgdmFyIGRldGFpbEluZm8gPSBlLmRldGFpbC52YWx1ZS5kZXRhaWxJbmZvO1xuICAgIHZhciB0ZWxOdW1iZXIgPSBlLmRldGFpbC52YWx1ZS50ZWxOdW1iZXI7XG4gICAgdmFyIHBvc3RhbENvZGUgPSBlLmRldGFpbC52YWx1ZS5wb3N0YWxDb2RlO1xuXG4gICAgaWYgKHVzZXJOYW1lID09IFwiXCIpe1xuICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgICBjb250ZW50OiAn6K+35aGr5YaZ6IGU57O75Lq65aeT5ZCNJyxcbiAgICAgICAgc2hvd0NhbmNlbDpmYWxzZVxuICAgICAgfSlcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBpZiAodGVsTnVtYmVyID09IFwiXCIpe1xuICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgICBjb250ZW50OiAn6K+35aGr5YaZ5omL5py65Y+356CBJyxcbiAgICAgICAgc2hvd0NhbmNlbDpmYWxzZVxuICAgICAgfSlcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBpZiAodGhpcy5zZWxQcm92aW5jZSA9PSBcIuivt+mAieaLqVwiKXtcbiAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgY29udGVudDogJ+ivt+mAieaLqeWcsOWMuicsXG4gICAgICAgIHNob3dDYW5jZWw6ZmFsc2VcbiAgICAgIH0pXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgaWYgKHRoaXMuc2VsQ2l0eSA9PSBcIuivt+mAieaLqVwiKXtcbiAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgY29udGVudDogJ+ivt+mAieaLqeWcsOWMuicsXG4gICAgICAgIHNob3dDYW5jZWw6ZmFsc2VcbiAgICAgIH0pXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgdmFyIGNpdHlJZCA9IHRoaXMuY29tbW9uQ2l0eURhdGFbdGhpcy5zZWxQcm92aW5jZUluZGV4XS5jaXR5TGlzdFt0aGlzLnNlbENpdHlJbmRleF0uaWQ7XG4gICAgdmFyIGRpc3RyaWN0SWQ7XG4gICAgaWYgKHRoaXMuc2VsRGlzdHJpY3QgPT0gXCLor7fpgInmi6lcIiB8fCAhdGhpcy5zZWxEaXN0cmljdCl7XG4gICAgICBkaXN0cmljdElkID0gJyc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRpc3RyaWN0SWQgPSB0aGlzLmNvbW1vbkNpdHlEYXRhW3RoaXMuc2VsUHJvdmluY2VJbmRleF0uY2l0eUxpc3RbdGhpcy5zZWxDaXR5SW5kZXhdLmRpc3RyaWN0TGlzdFt0aGlzLnNlbERpc3RyaWN0SW5kZXhdLmlkO1xuICAgIH1cbiAgICBpZiAoZGV0YWlsSW5mbyA9PSBcIlwiKXtcbiAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgY29udGVudDogJ+ivt+Whq+WGmeivpue7huWcsOWdgCcsXG4gICAgICAgIHNob3dDYW5jZWw6ZmFsc2VcbiAgICAgIH0pXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgaWYgKHBvc3RhbENvZGUgPT0gXCJcIil7XG4gICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgIGNvbnRlbnQ6ICfor7floavlhpnpgq7nvJYnLFxuICAgICAgICBzaG93Q2FuY2VsOmZhbHNlXG4gICAgICB9KVxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHZhciBhcGlBZGRvUnVQREFURSA9IFwiYWRkXCI7XG4gICAgdmFyIGFwaUFkZGlkID0gdGhhdC5pZDtcbiAgICBpZiAoYXBpQWRkaWQpIHtcbiAgICAgIGFwaUFkZG9SdVBEQVRFID0gXCJ1cGRhdGVcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpQWRkaWQgPSAwO1xuICAgIH1cbiAgICB3eC5yZXF1ZXN0KHtcbiAgICAgIHVybDogJ2h0dHBzOi8vYXBpLml0MTIwLmNjLycgKyB0aGF0LiRwYXJlbnQuZ2xvYmFsRGF0YS5zdWJEb21haW4gKyAnL3VzZXIvc2hpcHBpbmctYWRkcmVzcy8nICsgYXBpQWRkb1J1UERBVEUsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIHRva2VuOiB0aGF0LiRwYXJlbnQuZ2xvYmFsRGF0YS50b2tlbixcbiAgICAgICAgaWQ6IGFwaUFkZGlkLFxuICAgICAgICBwcm92aW5jZUlkOiB0aGF0LmNvbW1vbkNpdHlEYXRhW3RoYXQuc2VsUHJvdmluY2VJbmRleF0uaWQsXG4gICAgICAgIGNpdHlJZDogY2l0eUlkLFxuICAgICAgICBkaXN0cmljdElkOiBkaXN0cmljdElkLFxuICAgICAgICBsaW5rTWFuOnVzZXJOYW1lLFxuICAgICAgICBhZGRyZXNzOmRldGFpbEluZm8sXG4gICAgICAgIG1vYmlsZTp0ZWxOdW1iZXIsXG4gICAgICAgIGNvZGU6cG9zdGFsQ29kZSxcbiAgICAgICAgaXNEZWZhdWx0Oid0cnVlJ1xuICAgICAgfSxcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICBpZiAocmVzLmRhdGEuY29kZSAhPSAwKSB7XG4gICAgICAgICAgLy8g55m75b2V6ZSZ6K+vIFxuICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgIHRpdGxlOiAn5aSx6LSlJyxcbiAgICAgICAgICAgIGNvbnRlbnQ6IHJlcy5kYXRhLm1zZyxcbiAgICAgICAgICAgIHNob3dDYW5jZWw6ZmFsc2VcbiAgICAgICAgICB9KVxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyDot7PovazliLDnu5PnrpfpobXpnaJcbiAgICAgICAgd3gubmF2aWdhdGVCYWNrKHt9KVxuICAgICAgfVxuICAgIH0pXG4gIH1cbiAgaW5pdENpdHlEYXRhIChsZXZlbCwgb2JqKSB7XG4gICAgaWYobGV2ZWwgPT0gMSl7XG4gICAgICB2YXIgcGlua0FycmF5ID0gW107XG4gICAgICBmb3IodmFyIGkgPSAwO2k8dGhpcy5jb21tb25DaXR5RGF0YS5sZW5ndGg7aSsrKXtcbiAgICAgICAgcGlua0FycmF5LnB1c2godGhpcy5jb21tb25DaXR5RGF0YVtpXS5uYW1lKTtcbiAgICAgIH1cbiAgICAgIHRoaXMucHJvdmluY2VzID0gcGlua0FycmF5XG4gICAgfSBlbHNlIGlmIChsZXZlbCA9PSAyKXtcbiAgICAgIHZhciBwaW5rQXJyYXkgPSBbXTtcbiAgICAgIHZhciBkYXRhQXJyYXkgPSBvYmouY2l0eUxpc3RcbiAgICAgIGZvcih2YXIgaSA9IDA7aTxkYXRhQXJyYXkubGVuZ3RoO2krKyl7XG4gICAgICAgIHBpbmtBcnJheS5wdXNoKGRhdGFBcnJheVtpXS5uYW1lKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuY2l0eXMgPSBwaW5rQXJyYXlcbiAgICB9IGVsc2UgaWYgKGxldmVsID09IDMpe1xuICAgICAgdmFyIHBpbmtBcnJheSA9IFtdO1xuICAgICAgdmFyIGRhdGFBcnJheSA9IG9iai5kaXN0cmljdExpc3RcbiAgICAgIGZvcih2YXIgaSA9IDA7aTxkYXRhQXJyYXkubGVuZ3RoO2krKyl7XG4gICAgICAgIHBpbmtBcnJheS5wdXNoKGRhdGFBcnJheVtpXS5uYW1lKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuZGlzdHJpY3RzID0gcGlua0FycmF5XG4gICAgfVxuICB9XG4gIGJpbmRQaWNrZXJQcm92aW5jZUNoYW5nZSAoZXZlbnQpIHtcbiAgICB2YXIgc2VsSXRlcm0gPSB0aGlzLmNvbW1vbkNpdHlEYXRhW2V2ZW50LmRldGFpbC52YWx1ZV1cbiAgICB0aGlzLnNlbFByb3ZpbmNlID0gc2VsSXRlcm0ubmFtZVxuICAgIHRoaXMuc2VsUHJvdmluY2VJbmRleCA9IGV2ZW50LmRldGFpbC52YWx1ZVxuICAgIHRoaXMuc2VsQ2l0eSA9ICfor7fpgInmi6knXG4gICAgdGhpcy5zZWxDaXR5SW5kZXggPSAwXG4gICAgdGhpcy5zZWxEaXN0cmljdCA9ICfor7fpgInmi6knXG4gICAgdGhpcy5zZWxEaXN0cmljdEluZGV4ID0gMFxuICAgIHRoaXMuaW5pdENpdHlEYXRhKDIsIHNlbEl0ZXJtKVxuICB9XG4gIGJpbmRQaWNrZXJDaXR5Q2hhbmdlIChldmVudCkge1xuICAgIHZhciBzZWxJdGVybSA9IHRoaXMuY29tbW9uQ2l0eURhdGFbdGhpcy5zZWxQcm92aW5jZUluZGV4XS5jaXR5TGlzdFtldmVudC5kZXRhaWwudmFsdWVdO1xuICAgIHRoaXMuc2VsQ2l0eSA9IHNlbEl0ZXJtLm5hbWVcbiAgICB0aGlzLnNlbENpdHlJbmRleCA9IGV2ZW50LmRldGFpbC52YWx1ZVxuICAgIHRoaXMuc2VsRGlzdHJpY3QgPSAn6K+36YCJ5oupJ1xuICAgIHRoaXMuc2VsRGlzdHJpY3RJbmRleCA9ICAwXG4gICAgdGhpcy5pbml0Q2l0eURhdGEoMywgc2VsSXRlcm0pXG4gIH1cbiAgYmluZFBpY2tlckNoYW5nZSAoZXZlbnQpIHtcbiAgICB2YXIgc2VsSXRlcm0gPSB0aGlzLmNvbW1vbkNpdHlEYXRhW3RoaXMuc2VsUHJvdmluY2VJbmRleF0uY2l0eUxpc3RbdGhpcy5zZWxDaXR5SW5kZXhdLmRpc3RyaWN0TGlzdFtldmVudC5kZXRhaWwudmFsdWVdO1xuICAgIGlmIChzZWxJdGVybSAmJiBzZWxJdGVybS5uYW1lICYmIGV2ZW50LmRldGFpbC52YWx1ZSkge1xuICAgICAgdGhpcy5zZWxEaXN0cmljdCA9IHNlbEl0ZXJtLm5hbWUsXG4gICAgICB0aGlzLnNlbERpc3RyaWN0SW5kZXggPSBldmVudC5kZXRhaWwudmFsdWVcbiAgICB9XG4gIH1cbiAgb25Mb2FkKGUpIHtcbiAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgd3guc2hvd0xvYWRpbmcoKTtcbiAgICB0aGlzLmNvbW1vbkNpdHlEYXRhID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuY29tbW9uQ2l0eURhdGFcbiAgICB0aGlzLiRhcHBseSgpXG4gICAgdGhpcy5pbml0Q2l0eURhdGEoMSk7XG4gICAgdmFyIGlkID0gZS5pZDtcbiAgICBpZiAoaWQpIHtcbiAgICAgIC8vIOWIneWni+WMluWOn+aVsOaNrlxuICAgICAgd3gucmVxdWVzdCh7XG4gICAgICAgIHVybDogJ2h0dHBzOi8vYXBpLml0MTIwLmNjLycgKyB0aGF0LiRwYXJlbnQuZ2xvYmFsRGF0YS5zdWJEb21haW4gKyAnL3VzZXIvc2hpcHBpbmctYWRkcmVzcy9kZXRhaWwnLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgdG9rZW46IHRoYXQuJHBhcmVudC5nbG9iYWxEYXRhLnRva2VuLFxuICAgICAgICAgIGlkOiBpZFxuICAgICAgICB9LFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgaWYgKHJlcy5kYXRhLmNvZGUgPT0gMCkge1xuICAgICAgICAgICAgdGhhdC5pZCA9IGlkXG4gICAgICAgICAgICB0aGF0LmFkZHJlc3NEYXRhID0ge1xuICAgICAgICAgICAgICB1c2VyTmFtZTogcmVzLmRhdGEuZGF0YS5saW5rTWFuLFxuICAgICAgICAgICAgICBkZXRhaWxJbmZvOiByZXMuZGF0YS5kYXRhLmFkZHJlc3MsXG4gICAgICAgICAgICAgIHRlbE51bWJlcjogcmVzLmRhdGEuZGF0YS5tb2JpbGUsXG4gICAgICAgICAgICAgIHBvc3RhbENvZGU6IHJlcy5kYXRhLmRhdGEuY29kZSxcbiAgICAgICAgICAgICAgaWQ6IHJlcy5kYXRhLmRhdGEuaWRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoYXQuc2VsUHJvdmluY2UgPSByZXMuZGF0YS5kYXRhLnByb3ZpbmNlU3RyXG4gICAgICAgICAgICB0aGF0LnNlbENpdHkgPSByZXMuZGF0YS5kYXRhLmNpdHlTdHJcbiAgICAgICAgICAgIHRoYXQuc2VsRGlzdHJpY3QgPSByZXMuZGF0YS5kYXRhLmFyZWFTdHJcbiAgICAgICAgICAgIHRoYXQuJGFwcGx5KClcbiAgICAgICAgICAgIHRoYXQuc2V0REJTYXZlQWRkcmVzc0lkKHJlcy5kYXRhLmRhdGEpO1xuICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgICAgICAgICBjb250ZW50OiAn5peg5rOV6I635Y+W5b+r6YCS5Zyw5Z2A5pWw5o2uJyxcbiAgICAgICAgICAgICAgc2hvd0NhbmNlbDogZmFsc2VcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGF0LmlkID0gJydcbiAgICAgIHRoYXQuYWRkcmVzc0RhdGEgPSBudWxsXG4gICAgICB0aGF0LnNlbFByb3ZpbmNlID0gJ+ivt+mAieaLqSdcbiAgICAgIHRoYXQuc2VsQ2l0eSA9ICfor7fpgInmi6knXG4gICAgICB0aGF0LnNlbERpc3RyaWN0ID0gJ+ivt+mAieaLqSdcbiAgICAgIHd4LmhpZGVMb2FkaW5nKClcbiAgICAgIHRoYXQuJGFwcGx5KClcbiAgICB9XG4gIH1cbiAgc2V0REJTYXZlQWRkcmVzc0lkIChkYXRhKSB7XG4gICAgdmFyIHJldFNlbElkeCA9IDA7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmNvbW1vbkNpdHlEYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoZGF0YS5wcm92aW5jZUlkID09IHRoaXMuY29tbW9uQ2l0eURhdGFbaV0uaWQpIHtcbiAgICAgICAgdGhpcy5zZWxQcm92aW5jZUluZGV4ID0gaTtcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB0aGlzLmNvbW1vbkNpdHlEYXRhW2ldLmNpdHlMaXN0Lmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgaWYgKGRhdGEuY2l0eUlkID09IHRoaXMuY29tbW9uQ2l0eURhdGFbaV0uY2l0eUxpc3Rbal0uaWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsQ2l0eUluZGV4ID0gajtcbiAgICAgICAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5jb21tb25DaXR5RGF0YVtpXS5jaXR5TGlzdFtqXS5kaXN0cmljdExpc3QubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICAgICAgaWYgKGRhdGEuZGlzdHJpY3RJZCA9PSB0aGlzLmNvbW1vbkNpdHlEYXRhW2ldLmNpdHlMaXN0W2pdLmRpc3RyaWN0TGlzdFtrXS5pZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsRGlzdHJpY3RJbmRleCA9IGs7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICB9XG4gIHNlbGVjdENpdHkgKCkge1xuICB9XG4gIGRlbGV0ZUFkZHJlc3MgKGUpIHtcbiAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgdmFyIGlkID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaWQ7XG4gICAgd3guc2hvd01vZGFsKHtcbiAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgIGNvbnRlbnQ6ICfnoa7lrpropoHliKDpmaTor6XmlLbotKflnLDlnYDlkJfvvJ8nLFxuICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICB3eC5yZXF1ZXN0KHtcbiAgICAgICAgICAgIHVybDogJ2h0dHBzOi8vYXBpLml0MTIwLmNjLycgKyB0aGF0LiRwYXJlbnQuZ2xvYmFsRGF0YS5zdWJEb21haW4gKyAnL3VzZXIvc2hpcHBpbmctYWRkcmVzcy9kZWxldGUnLFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICB0b2tlbjogdGhhdC4kcGFyZW50Lmdsb2JhbERhdGEudG9rZW4sXG4gICAgICAgICAgICAgIGlkOiBpZFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICAgICAgd3gubmF2aWdhdGVCYWNrKHt9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSBpZiAocmVzLmNhbmNlbCkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCfnlKjmiLfngrnlh7vlj5bmtognKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgfVxuICByZWFkRnJvbVd4ICgpIHtcbiAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgd3guY2hvb3NlQWRkcmVzcyh7XG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgIGxldCBwcm92aW5jZU5hbWUgPSByZXMucHJvdmluY2VOYW1lO1xuICAgICAgICBsZXQgY2l0eU5hbWUgPSByZXMuY2l0eU5hbWU7XG4gICAgICAgIGxldCBkaWF0cmljdE5hbWUgPSByZXMuY291bnR5TmFtZTtcbiAgICAgICAgbGV0IHJldFNlbElkeCA9IDA7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhhdC5jb21tb25DaXR5RGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmIChwcm92aW5jZU5hbWUgPT0gdGhhdC5jb21tb25DaXR5RGF0YVtpXS5uYW1lKSB7XG4gICAgICAgICAgICBsZXQgZXZlbnRKID0geyBkZXRhaWw6IHsgdmFsdWU6aSB9fTtcbiAgICAgICAgICAgIHRoYXQuYmluZFBpY2tlclByb3ZpbmNlQ2hhbmdlKGV2ZW50Sik7XG4gICAgICAgICAgICB0aGF0LnNlbFByb3ZpbmNlSW5kZXggPSBpO1xuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB0aGF0LmNvbW1vbkNpdHlEYXRhW2ldLmNpdHlMaXN0Lmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgIGlmIChjaXR5TmFtZSA9PSB0aGF0LmNvbW1vbkNpdHlEYXRhW2ldLmNpdHlMaXN0W2pdLm5hbWUpIHtcbiAgICAgICAgICAgICAgICAvL3RoYXQuZGF0YS5zZWxDaXR5SW5kZXggPSBqO1xuICAgICAgICAgICAgICAgIGV2ZW50SiA9IHsgZGV0YWlsOiB7IHZhbHVlOiBqIH0gfTtcbiAgICAgICAgICAgICAgICB0aGF0LmJpbmRQaWNrZXJDaXR5Q2hhbmdlKGV2ZW50Sik7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGF0LmNvbW1vbkNpdHlEYXRhW2ldLmNpdHlMaXN0W2pdLmRpc3RyaWN0TGlzdC5sZW5ndGg7IGsrKykge1xuICAgICAgICAgICAgICAgICAgaWYgKGRpYXRyaWN0TmFtZSA9PSB0aGF0LmNvbW1vbkNpdHlEYXRhW2ldLmNpdHlMaXN0W2pdLmRpc3RyaWN0TGlzdFtrXS5uYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vdGhhdC5kYXRhLnNlbERpc3RyaWN0SW5kZXggPSBrO1xuICAgICAgICAgICAgICAgICAgICBldmVudEogPSB7IGRldGFpbDogeyB2YWx1ZTogayB9IH07XG4gICAgICAgICAgICAgICAgICAgIHRoYXQuYmluZFBpY2tlckNoYW5nZShldmVudEopO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSAgIFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGF0LmFkZHJlc3NEYXRhID0gcmVzXG4gICAgICAgIHRoYXQuJGFwcGx5KClcbiAgICAgIH1cbiAgICB9KVxuICB9XG59XG4iXX0=