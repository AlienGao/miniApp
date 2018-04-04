#### **安装（更新） wepy 命令行工具**

```
npm install wepy-cli -g
```
#### **安装依赖包**

```
npm install
```
#### **开发实时编译**

```
npm run dev
```
#### **开发使用说明(重要)**

```
1. 使用微信开发者工具-->添加项目，项目目录请选择dist目录。
2. 微信开发者工具-->项目-->关闭ES6转ES5。 重要：漏掉此项会运行报错。
3. 微信开发者工具-->项目-->关闭上传代码时样式自动补全。 重要：某些情况下漏掉此项也会运行报错。
4. 微信开发者工具-->项目-->关闭代码压缩上传。 重要：开启后，会导致真机computed, props.sync 等等属性失效。
```
### **wepy开发文档地址**

```
https://tencent.github.io/wepy/
```
#### **小程序开发文档**

```
http://mp.weixin.qq.com/debug/wxadoc/dev/
```
#### **感谢**
- 本项目的后台由[api工厂](https://www.it120.cc)提供
- 本项目UI参考[素洁商城](https://github.com/dyq086/wxYuHanStore)，并使用了其中一些图标
