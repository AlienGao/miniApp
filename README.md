#### **描述**

写这个项目是机缘巧合的在github上发现一个[开源接口](https://www.it120.cc "开源接口")，并且在了解了小程序的开发框架主要是基于Vue的，正好可以做个小程序练手。最近美团也开源了一款[小程序框架](https://github.com/Meituan-Dianping/mpvue "小程序框架")，据说更接近Vue开发，有时间也想尝试一下。目前基于小程序的UI库并不多，比较推荐[MinUI](https://github.com/meili/minui "MinUI")和[zanui-weapp](https://github.com/youzan/zanui-weapp "zanui-weapp")。
> ![](https://github.com/GaoJun9521/miniApp/blob/master/forth.jpg?raw=true)
先放上二维码，项目还在审核中。。。

#### **开发使用说明(重要)**

> 1. 使用微信开发者工具-->添加项目，项目目录请选择dist目录。（由于在minUI组件中加了两个函数，所以上传时保留了dist）
> 2. 微信开发者工具-->项目-->关闭ES6转ES5。 重要：漏掉此项会运行报错。
> 3. 微信开发者工具-->项目-->关闭上传代码时样式自动补全。 重要：某些情况下漏掉此项也会运行报错。
> 4. 微信开发者工具-->项目-->关闭代码压缩上传。 重要：开启后，会导致真机computed, props.sync 等等属性失效。
> 5. 调试基础库版本改为 **1.9.94**

### **项目预览**
![](https://github.com/GaoJun9521/miniApp/blob/master/first.gif?raw=true)![](https://github.com/GaoJun9521/miniApp/blob/master/second.gif?raw=true)

### **TODO**
1. 增加物流接口
1. 增加付款倒计时功能
1. 增加购物送积分（增加用户兴趣）
1. 增加公告提醒

#### **感谢**
- 本项目的后台由[api工厂](https://www.it120.cc)提供
- 本项目UI参考[素洁商城](https://github.com/dyq086/wxYuHanStore)，并使用了其中一些图标

> 最后可以点个赞再走嘛~
