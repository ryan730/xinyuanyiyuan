module.exports = {
  plugins: {
    "postcss-px-to-viewport": {
      unitToConvert: "px", // 要转化的单位
      viewportWidth: 375, // UI设计稿的宽度 750
      unitPrecision: 6, // 转换后的精度，即小数点位数
      propList: ["*"], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
      viewportUnit: "vw", // 指定需要转换成的视窗单位，默认vw
      fontViewportUnit: "vw", // 指定字体需要转换成的视窗单位，默认vw
      // selectorBlackList: ["ignore-"], // 指定不转换为视窗单位的类名，
      selectorBlackList: ['.ignore', '.hairlines'],
      minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
      mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
      replace: true, // 是否转换后直接更换属性值
      // exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配,设置忽略node_modules会导致测试时，vant组件无法转换单位
      exclude: [/assets/, /src/],
      landscape: false, // 是否处理横屏情况
      landscapeUnit: 'vw',
      landscapeWidth: 568,
    },
    autoprefixer: {},
    "postcss-pxtorem": {
      "rootValue": 16,
      "propList": ["*"],
       //转换成rem后保留的小数点位数
       unitPrecision: 3,
       //小于12px的样式不被替换成rem
       //minPixelValue: 12,
       //selectorBlackList: ['.dyznAnswer .subject em'],// 要忽略的选择器并保留为px。
       //忽略一些文件，不进行转换，比如我想忽略 依赖的UI框架
       exclude: ['node_modules']
    }
  }
};