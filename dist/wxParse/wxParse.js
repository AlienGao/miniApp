'use strict';

var _showdown = require('./showdown.js');

var _showdown2 = _interopRequireDefault(_showdown);

var _html2json = require('./html2json.js');

var _html2json2 = _interopRequireDefault(_html2json);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /**
                                                                                                                                                                                                                   * author: Di (微信小程序开发工程师)
                                                                                                                                                                                                                   * organization: WeAppDev(微信小程序开发论坛)(http://weappdev.com)
                                                                                                                                                                                                                   *               垂直微信小程序开发交流社区
                                                                                                                                                                                                                   * 
                                                                                                                                                                                                                   * github地址: https://github.com/icindy/wxParse
                                                                                                                                                                                                                   * 
                                                                                                                                                                                                                   * for: 微信小程序富文本解析
                                                                                                                                                                                                                   * detail : http://weappdev.com/t/wxparse-alpha0-1-html-markdown/184
                                                                                                                                                                                                                   */

/**
 * utils函数引入
 **/


/**
 * 配置及公有属性
 **/
var realWindowWidth = 0;
var realWindowHeight = 0;
wx.getSystemInfo({
  success: function success(res) {
    realWindowWidth = res.windowWidth;
    realWindowHeight = res.windowHeight;
  }
});
/**
 * 主函数入口区
 **/
function wxParse() {
  var bindName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'wxParseData';
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'html';
  var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '<div class="color:red;">数据不能为空</div>';
  var target = arguments[3];
  var imagePadding = arguments[4];

  var that = target;
  var transData = {}; //存放转化后的数据
  if (type == 'html') {
    transData = _html2json2.default.html2json(data, bindName);
    // console.log(JSON.stringify(transData, ' ', ' '));
  } else if (type == 'md' || type == 'markdown') {
    var converter = new _showdown2.default.Converter();
    var html = converter.makeHtml(data);
    transData = _html2json2.default.html2json(html, bindName);
    // console.log(JSON.stringify(transData, ' ', ' '));
  }
  transData.view = {};
  transData.view.imagePadding = 0;
  if (typeof imagePadding != 'undefined') {
    transData.view.imagePadding = imagePadding;
  }
  var bindData = {};
  bindData[bindName] = transData;
  bindData.wxParseImgLoad = wxParseImgLoad;
  bindData.wxParseImgTap = wxParseImgTap;
  that.setData(bindData);
  that.wxParseImgLoad = wxParseImgLoad;
  that.wxParseImgTap = wxParseImgTap;
  return bindData;
}
// 图片点击事件
function wxParseImgTap(e) {
  var that = this;
  var nowImgUrl = e.target.dataset.src;
  var tagFrom = e.target.dataset.from;
  if (typeof tagFrom != 'undefined' && tagFrom.length > 0) {
    wx.previewImage({
      current: nowImgUrl, // 当前显示图片的http链接
      urls: that.data[tagFrom].imageUrls // 需要预览的图片http链接列表
    });
  }
}

/**
 * 图片视觉宽高计算函数区 
 **/
function wxParseImgLoad(e) {
  var that = this;
  var tagFrom = e.target.dataset.from;
  var idx = e.target.dataset.idx;
  if (typeof tagFrom != 'undefined' && tagFrom.length > 0) {
    calMoreImageInfo(e, idx, that, tagFrom);
  }
}
// 假循环获取计算图片视觉最佳宽高
function calMoreImageInfo(e, idx, that, bindName) {
  var _that$setData;

  var temData = that.data[bindName];
  if (!temData || temData.images.length == 0) {
    return;
  }
  var temImages = temData.images;
  //因为无法获取view宽度 需要自定义padding进行计算，稍后处理
  var recal = wxAutoImageCal(e.detail.width, e.detail.height, that, bindName);
  // temImages[idx].width = recal.imageWidth;
  // temImages[idx].height = recal.imageheight; 
  // temData.images = temImages;
  // var bindData = {};
  // bindData[bindName] = temData;
  // that.setData(bindData);
  var index = temImages[idx].index;
  var key = '' + bindName;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = index.split('.')[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var i = _step.value;
      key += '.nodes[' + i + ']';
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var keyW = key + '.width';
  var keyH = key + '.height';
  that.setData((_that$setData = {}, _defineProperty(_that$setData, keyW, recal.imageWidth), _defineProperty(_that$setData, keyH, recal.imageheight), _that$setData));
}

// 计算视觉优先的图片宽高
function wxAutoImageCal(originalWidth, originalHeight, that, bindName) {
  //获取图片的原始长宽
  var windowWidth = 0,
      windowHeight = 0;
  var autoWidth = 0,
      autoHeight = 0;
  var results = {};
  var padding = that.data[bindName].view.imagePadding;
  windowWidth = realWindowWidth - 2 * padding;
  windowHeight = realWindowHeight;
  //判断按照那种方式进行缩放
  // console.log("windowWidth" + windowWidth);
  if (originalWidth > windowWidth) {
    //在图片width大于手机屏幕width时候
    autoWidth = windowWidth;
    // console.log("autoWidth" + autoWidth);
    autoHeight = autoWidth * originalHeight / originalWidth;
    // console.log("autoHeight" + autoHeight);
    results.imageWidth = autoWidth;
    results.imageheight = autoHeight;
  } else {
    //否则展示原来的数据
    results.imageWidth = originalWidth;
    results.imageheight = originalHeight;
  }
  return results;
}

function wxParseTemArray(temArrayName, bindNameReg, total, that) {
  var array = [];
  var temData = that.data;
  var obj = null;
  for (var i = 0; i < total; i++) {
    var simArr = temData[bindNameReg + i].nodes;
    array.push(simArr);
  }

  temArrayName = temArrayName || 'wxParseTemArray';
  obj = JSON.parse('{"' + temArrayName + '":""}');
  obj[temArrayName] = array;
  that.setData(obj);
}

/**
 * 配置emojis
 * 
 */

function emojisInit() {
  var reg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var baseSrc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "/wxParse/emojis/";
  var emojis = arguments[2];

  _html2json2.default.emojisInit(reg, baseSrc, emojis);
}

module.exports = {
  wxParse: wxParse,
  wxParseTemArray: wxParseTemArray,
  emojisInit: emojisInit
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInd4UGFyc2UuanMiXSwibmFtZXMiOlsicmVhbFdpbmRvd1dpZHRoIiwicmVhbFdpbmRvd0hlaWdodCIsInd4IiwiZ2V0U3lzdGVtSW5mbyIsInN1Y2Nlc3MiLCJyZXMiLCJ3aW5kb3dXaWR0aCIsIndpbmRvd0hlaWdodCIsInd4UGFyc2UiLCJiaW5kTmFtZSIsInR5cGUiLCJkYXRhIiwidGFyZ2V0IiwiaW1hZ2VQYWRkaW5nIiwidGhhdCIsInRyYW5zRGF0YSIsImh0bWwyanNvbiIsImNvbnZlcnRlciIsIkNvbnZlcnRlciIsImh0bWwiLCJtYWtlSHRtbCIsInZpZXciLCJiaW5kRGF0YSIsInd4UGFyc2VJbWdMb2FkIiwid3hQYXJzZUltZ1RhcCIsInNldERhdGEiLCJlIiwibm93SW1nVXJsIiwiZGF0YXNldCIsInNyYyIsInRhZ0Zyb20iLCJmcm9tIiwibGVuZ3RoIiwicHJldmlld0ltYWdlIiwiY3VycmVudCIsInVybHMiLCJpbWFnZVVybHMiLCJpZHgiLCJjYWxNb3JlSW1hZ2VJbmZvIiwidGVtRGF0YSIsImltYWdlcyIsInRlbUltYWdlcyIsInJlY2FsIiwid3hBdXRvSW1hZ2VDYWwiLCJkZXRhaWwiLCJ3aWR0aCIsImhlaWdodCIsImluZGV4Iiwia2V5Iiwic3BsaXQiLCJpIiwia2V5VyIsImtleUgiLCJpbWFnZVdpZHRoIiwiaW1hZ2VoZWlnaHQiLCJvcmlnaW5hbFdpZHRoIiwib3JpZ2luYWxIZWlnaHQiLCJhdXRvV2lkdGgiLCJhdXRvSGVpZ2h0IiwicmVzdWx0cyIsInBhZGRpbmciLCJ3eFBhcnNlVGVtQXJyYXkiLCJ0ZW1BcnJheU5hbWUiLCJiaW5kTmFtZVJlZyIsInRvdGFsIiwiYXJyYXkiLCJvYmoiLCJzaW1BcnIiLCJub2RlcyIsInB1c2giLCJKU09OIiwicGFyc2UiLCJlbW9qaXNJbml0IiwicmVnIiwiYmFzZVNyYyIsImVtb2ppcyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBY0E7Ozs7QUFDQTs7Ozs7O2tOQWZB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VUFBVCxHQUE2RDtBQUFBLE1BQXpDQyxHQUF5Qyx1RUFBckMsRUFBcUM7QUFBQSxNQUFsQ0MsT0FBa0MsdUVBQTFCLGtCQUEwQjtBQUFBLE1BQVBDLE1BQU87O0FBQzFELHNCQUFXSCxVQUFYLENBQXNCQyxHQUF0QixFQUEwQkMsT0FBMUIsRUFBa0NDLE1BQWxDO0FBQ0Y7O0FBRURDLE9BQU9DLE9BQVAsR0FBaUI7QUFDZnJFLFdBQVNBLE9BRE07QUFFZnFELG1CQUFnQkEsZUFGRDtBQUdmVyxjQUFXQTtBQUhJLENBQWpCIiwiZmlsZSI6Ind4UGFyc2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIGF1dGhvcjogRGkgKOW+ruS/oeWwj+eoi+W6j+W8gOWPkeW3peeoi+W4iClcbiAqIG9yZ2FuaXphdGlvbjogV2VBcHBEZXYo5b6u5L+h5bCP56iL5bqP5byA5Y+R6K665Z2bKShodHRwOi8vd2VhcHBkZXYuY29tKVxuICogICAgICAgICAgICAgICDlnoLnm7Tlvq7kv6HlsI/nqIvluo/lvIDlj5HkuqTmtYHnpL7ljLpcbiAqIFxuICogZ2l0aHVi5Zyw5Z2AOiBodHRwczovL2dpdGh1Yi5jb20vaWNpbmR5L3d4UGFyc2VcbiAqIFxuICogZm9yOiDlvq7kv6HlsI/nqIvluo/lr4zmlofmnKzop6PmnpBcbiAqIGRldGFpbCA6IGh0dHA6Ly93ZWFwcGRldi5jb20vdC93eHBhcnNlLWFscGhhMC0xLWh0bWwtbWFya2Rvd24vMTg0XG4gKi9cblxuLyoqXG4gKiB1dGlsc+WHveaVsOW8leWFpVxuICoqL1xuaW1wb3J0IHNob3dkb3duIGZyb20gJy4vc2hvd2Rvd24uanMnO1xuaW1wb3J0IEh0bWxUb0pzb24gZnJvbSAnLi9odG1sMmpzb24uanMnO1xuLyoqXG4gKiDphY3nva7lj4rlhazmnInlsZ7mgKdcbiAqKi9cbnZhciByZWFsV2luZG93V2lkdGggPSAwO1xudmFyIHJlYWxXaW5kb3dIZWlnaHQgPSAwO1xud3guZ2V0U3lzdGVtSW5mbyh7XG4gIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICByZWFsV2luZG93V2lkdGggPSByZXMud2luZG93V2lkdGhcbiAgICByZWFsV2luZG93SGVpZ2h0ID0gcmVzLndpbmRvd0hlaWdodFxuICB9XG59KVxuLyoqXG4gKiDkuLvlh73mlbDlhaXlj6PljLpcbiAqKi9cbmZ1bmN0aW9uIHd4UGFyc2UoYmluZE5hbWUgPSAnd3hQYXJzZURhdGEnLCB0eXBlPSdodG1sJywgZGF0YT0nPGRpdiBjbGFzcz1cImNvbG9yOnJlZDtcIj7mlbDmja7kuI3og73kuLrnqbo8L2Rpdj4nLCB0YXJnZXQsaW1hZ2VQYWRkaW5nKSB7XG4gIHZhciB0aGF0ID0gdGFyZ2V0O1xuICB2YXIgdHJhbnNEYXRhID0ge307Ly/lrZjmlL7ovazljJblkI7nmoTmlbDmja5cbiAgaWYgKHR5cGUgPT0gJ2h0bWwnKSB7XG4gICAgdHJhbnNEYXRhID0gSHRtbFRvSnNvbi5odG1sMmpzb24oZGF0YSwgYmluZE5hbWUpO1xuICAgIC8vIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHRyYW5zRGF0YSwgJyAnLCAnICcpKTtcbiAgfSBlbHNlIGlmICh0eXBlID09ICdtZCcgfHwgdHlwZSA9PSAnbWFya2Rvd24nKSB7XG4gICAgdmFyIGNvbnZlcnRlciA9IG5ldyBzaG93ZG93bi5Db252ZXJ0ZXIoKTtcbiAgICB2YXIgaHRtbCA9IGNvbnZlcnRlci5tYWtlSHRtbChkYXRhKTtcbiAgICB0cmFuc0RhdGEgPSBIdG1sVG9Kc29uLmh0bWwyanNvbihodG1sLCBiaW5kTmFtZSk7XG4gICAgLy8gY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodHJhbnNEYXRhLCAnICcsICcgJykpO1xuICB9XG4gIHRyYW5zRGF0YS52aWV3ID0ge307XG4gIHRyYW5zRGF0YS52aWV3LmltYWdlUGFkZGluZyA9IDA7XG4gIGlmKHR5cGVvZihpbWFnZVBhZGRpbmcpICE9ICd1bmRlZmluZWQnKXtcbiAgICB0cmFuc0RhdGEudmlldy5pbWFnZVBhZGRpbmcgPSBpbWFnZVBhZGRpbmdcbiAgfVxuICB2YXIgYmluZERhdGEgPSB7fTtcbiAgYmluZERhdGFbYmluZE5hbWVdID0gdHJhbnNEYXRhO1xuICBiaW5kRGF0YS53eFBhcnNlSW1nTG9hZCA9IHd4UGFyc2VJbWdMb2FkO1xuICBiaW5kRGF0YS53eFBhcnNlSW1nVGFwID0gd3hQYXJzZUltZ1RhcDtcbiAgdGhhdC5zZXREYXRhKGJpbmREYXRhKVxuICB0aGF0Lnd4UGFyc2VJbWdMb2FkID0gd3hQYXJzZUltZ0xvYWQ7XG4gIHRoYXQud3hQYXJzZUltZ1RhcCA9IHd4UGFyc2VJbWdUYXA7XG4gIHJldHVybiBiaW5kRGF0YTtcbn1cbi8vIOWbvueJh+eCueWHu+S6i+S7tlxuZnVuY3Rpb24gd3hQYXJzZUltZ1RhcChlKSB7XG4gIHZhciB0aGF0ID0gdGhpcztcbiAgdmFyIG5vd0ltZ1VybCA9IGUudGFyZ2V0LmRhdGFzZXQuc3JjO1xuICB2YXIgdGFnRnJvbSA9IGUudGFyZ2V0LmRhdGFzZXQuZnJvbTtcbiAgaWYgKHR5cGVvZiAodGFnRnJvbSkgIT0gJ3VuZGVmaW5lZCcgJiYgdGFnRnJvbS5sZW5ndGggPiAwKSB7XG4gICAgd3gucHJldmlld0ltYWdlKHtcbiAgICAgIGN1cnJlbnQ6IG5vd0ltZ1VybCwgLy8g5b2T5YmN5pi+56S65Zu+54mH55qEaHR0cOmTvuaOpVxuICAgICAgdXJsczogdGhhdC5kYXRhW3RhZ0Zyb21dLmltYWdlVXJscyAvLyDpnIDopoHpooTop4jnmoTlm77niYdodHRw6ZO+5o6l5YiX6KGoXG4gICAgfSlcbiAgfVxufVxuXG4vKipcbiAqIOWbvueJh+inhuinieWuvemrmOiuoeeul+WHveaVsOWMuiBcbiAqKi9cbmZ1bmN0aW9uIHd4UGFyc2VJbWdMb2FkKGUpIHtcbiAgdmFyIHRoYXQgPSB0aGlzO1xuICB2YXIgdGFnRnJvbSA9IGUudGFyZ2V0LmRhdGFzZXQuZnJvbTtcbiAgdmFyIGlkeCA9IGUudGFyZ2V0LmRhdGFzZXQuaWR4O1xuICBpZiAodHlwZW9mICh0YWdGcm9tKSAhPSAndW5kZWZpbmVkJyAmJiB0YWdGcm9tLmxlbmd0aCA+IDApIHtcbiAgICBjYWxNb3JlSW1hZ2VJbmZvKGUsIGlkeCwgdGhhdCwgdGFnRnJvbSlcbiAgfSBcbn1cbi8vIOWBh+W+queOr+iOt+WPluiuoeeul+WbvueJh+inhuinieacgOS9s+WuvemrmFxuZnVuY3Rpb24gY2FsTW9yZUltYWdlSW5mbyhlLCBpZHgsIHRoYXQsIGJpbmROYW1lKSB7XG4gIHZhciB0ZW1EYXRhID0gdGhhdC5kYXRhW2JpbmROYW1lXTtcbiAgaWYgKCF0ZW1EYXRhIHx8IHRlbURhdGEuaW1hZ2VzLmxlbmd0aCA9PSAwKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciB0ZW1JbWFnZXMgPSB0ZW1EYXRhLmltYWdlcztcbiAgLy/lm6DkuLrml6Dms5Xojrflj5Z2aWV35a695bqmIOmcgOimgeiHquWumuS5iXBhZGRpbmfov5vooYzorqHnrpfvvIznqI3lkI7lpITnkIZcbiAgdmFyIHJlY2FsID0gd3hBdXRvSW1hZ2VDYWwoZS5kZXRhaWwud2lkdGgsIGUuZGV0YWlsLmhlaWdodCx0aGF0LGJpbmROYW1lKTsgXG4gIC8vIHRlbUltYWdlc1tpZHhdLndpZHRoID0gcmVjYWwuaW1hZ2VXaWR0aDtcbiAgLy8gdGVtSW1hZ2VzW2lkeF0uaGVpZ2h0ID0gcmVjYWwuaW1hZ2VoZWlnaHQ7IFxuICAvLyB0ZW1EYXRhLmltYWdlcyA9IHRlbUltYWdlcztcbiAgLy8gdmFyIGJpbmREYXRhID0ge307XG4gIC8vIGJpbmREYXRhW2JpbmROYW1lXSA9IHRlbURhdGE7XG4gIC8vIHRoYXQuc2V0RGF0YShiaW5kRGF0YSk7XG4gIHZhciBpbmRleCA9IHRlbUltYWdlc1tpZHhdLmluZGV4XG4gIHZhciBrZXkgPSBgJHtiaW5kTmFtZX1gXG4gIGZvciAodmFyIGkgb2YgaW5kZXguc3BsaXQoJy4nKSkga2V5Kz1gLm5vZGVzWyR7aX1dYFxuICB2YXIga2V5VyA9IGtleSArICcud2lkdGgnXG4gIHZhciBrZXlIID0ga2V5ICsgJy5oZWlnaHQnXG4gIHRoYXQuc2V0RGF0YSh7XG4gICAgW2tleVddOiByZWNhbC5pbWFnZVdpZHRoLFxuICAgIFtrZXlIXTogcmVjYWwuaW1hZ2VoZWlnaHQsXG4gIH0pXG59XG5cbi8vIOiuoeeul+inhuinieS8mOWFiOeahOWbvueJh+WuvemrmFxuZnVuY3Rpb24gd3hBdXRvSW1hZ2VDYWwob3JpZ2luYWxXaWR0aCwgb3JpZ2luYWxIZWlnaHQsdGhhdCxiaW5kTmFtZSkge1xuICAvL+iOt+WPluWbvueJh+eahOWOn+Wni+mVv+WuvVxuICB2YXIgd2luZG93V2lkdGggPSAwLCB3aW5kb3dIZWlnaHQgPSAwO1xuICB2YXIgYXV0b1dpZHRoID0gMCwgYXV0b0hlaWdodCA9IDA7XG4gIHZhciByZXN1bHRzID0ge307XG4gIHZhciBwYWRkaW5nID0gdGhhdC5kYXRhW2JpbmROYW1lXS52aWV3LmltYWdlUGFkZGluZztcbiAgd2luZG93V2lkdGggPSByZWFsV2luZG93V2lkdGgtMipwYWRkaW5nO1xuICB3aW5kb3dIZWlnaHQgPSByZWFsV2luZG93SGVpZ2h0O1xuICAvL+WIpOaWreaMieeFp+mCo+enjeaWueW8j+i/m+ihjOe8qeaUvlxuICAvLyBjb25zb2xlLmxvZyhcIndpbmRvd1dpZHRoXCIgKyB3aW5kb3dXaWR0aCk7XG4gIGlmIChvcmlnaW5hbFdpZHRoID4gd2luZG93V2lkdGgpIHsvL+WcqOWbvueJh3dpZHRo5aSn5LqO5omL5py65bGP5bmVd2lkdGjml7blgJlcbiAgICBhdXRvV2lkdGggPSB3aW5kb3dXaWR0aDtcbiAgICAvLyBjb25zb2xlLmxvZyhcImF1dG9XaWR0aFwiICsgYXV0b1dpZHRoKTtcbiAgICBhdXRvSGVpZ2h0ID0gKGF1dG9XaWR0aCAqIG9yaWdpbmFsSGVpZ2h0KSAvIG9yaWdpbmFsV2lkdGg7XG4gICAgLy8gY29uc29sZS5sb2coXCJhdXRvSGVpZ2h0XCIgKyBhdXRvSGVpZ2h0KTtcbiAgICByZXN1bHRzLmltYWdlV2lkdGggPSBhdXRvV2lkdGg7XG4gICAgcmVzdWx0cy5pbWFnZWhlaWdodCA9IGF1dG9IZWlnaHQ7XG4gIH0gZWxzZSB7Ly/lkKbliJnlsZXnpLrljp/mnaXnmoTmlbDmja5cbiAgICByZXN1bHRzLmltYWdlV2lkdGggPSBvcmlnaW5hbFdpZHRoO1xuICAgIHJlc3VsdHMuaW1hZ2VoZWlnaHQgPSBvcmlnaW5hbEhlaWdodDtcbiAgfVxuICByZXR1cm4gcmVzdWx0cztcbn1cblxuZnVuY3Rpb24gd3hQYXJzZVRlbUFycmF5KHRlbUFycmF5TmFtZSxiaW5kTmFtZVJlZyx0b3RhbCx0aGF0KXtcbiAgdmFyIGFycmF5ID0gW107XG4gIHZhciB0ZW1EYXRhID0gdGhhdC5kYXRhO1xuICB2YXIgb2JqID0gbnVsbDtcbiAgZm9yKHZhciBpID0gMDsgaSA8IHRvdGFsOyBpKyspe1xuICAgIHZhciBzaW1BcnIgPSB0ZW1EYXRhW2JpbmROYW1lUmVnK2ldLm5vZGVzO1xuICAgIGFycmF5LnB1c2goc2ltQXJyKTtcbiAgfVxuXG4gIHRlbUFycmF5TmFtZSA9IHRlbUFycmF5TmFtZSB8fCAnd3hQYXJzZVRlbUFycmF5JztcbiAgb2JqID0gSlNPTi5wYXJzZSgne1wiJysgdGVtQXJyYXlOYW1lICsnXCI6XCJcIn0nKTtcbiAgb2JqW3RlbUFycmF5TmFtZV0gPSBhcnJheTtcbiAgdGhhdC5zZXREYXRhKG9iaik7XG59XG5cbi8qKlxuICog6YWN572uZW1vamlzXG4gKiBcbiAqL1xuXG5mdW5jdGlvbiBlbW9qaXNJbml0KHJlZz0nJyxiYXNlU3JjPVwiL3d4UGFyc2UvZW1vamlzL1wiLGVtb2ppcyl7XG4gICBIdG1sVG9Kc29uLmVtb2ppc0luaXQocmVnLGJhc2VTcmMsZW1vamlzKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHd4UGFyc2U6IHd4UGFyc2UsXG4gIHd4UGFyc2VUZW1BcnJheTp3eFBhcnNlVGVtQXJyYXksXG4gIGVtb2ppc0luaXQ6ZW1vamlzSW5pdFxufVxuXG5cbiJdfQ==