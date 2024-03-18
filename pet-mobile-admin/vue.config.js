/*
 * @Author: ryan zhuyan730@163.com
 * @Date: 2023-03-24 15:03:47
 * @LastEditors: ryan zhuyan730@163.com
 * @LastEditTime: 2023-10-20 00:47:18
 * @FilePath: /meta-psy-front/vue.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const { defineConfig } = require("@vue/cli-service");
const path = require("path");
const zlib = require("zlib");
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  configureWebpack: {
    devServer: {
      //host: '127.0.0.1',
      host: "0.0.0.0",
      port: "9090",
      allowedHosts: "all",
      // disableHostCheck: true
      // allowedHosts: ['www.test.com']  // 此处是要改变的域名
    },
    plugins: [
      // 压缩成 .gz 文件
      new CompressionPlugin({
        filename: "[path][base].gz",
        algorithm: "gzip",
        test: /\.js$|\.css$|\.html$/,
        threshold: 10240,
        minRatio: 0.8,
      }),
      // 压缩成 .br 文件，如果 zlib 报错无法解决，可以注释这段使用代码，一般本地没问题，需要注意线上服务器会可能发生找不到 zlib 的情况。
      new CompressionPlugin({
        filename: "[path][base].br",
        algorithm: "brotliCompress",
        test: /\.(js|css|html|svg)$/,
        compressionOptions: {
          params: {
            [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
          },
        },
        threshold: 10240,
        minRatio: 0.8,
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@i": path.resolve(__dirname, "./src/assets"),
        "@n": path.resolve(__dirname, "./node_modules"),
      },
    },
    // optimization: {// 开启分离 js
    // 	runtimeChunk: 'single',
    // 	splitChunks: {
    // 		chunks: 'all',
    // 		maxInitialRequests: Infinity,
    // 		minSize: 20000,
    // 		cacheGroups: {
    // 			vendor: {
    // 				test: /[\\/]node_modules[\\/]/,
    // 				name(module) {
    // 					// get the name. E.g. node_modules/packageName/not/this/part.js
    // 					// or node_modules/packageName
    // 					const math = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/);
    // 					let packageName = '';
    // 					if (math && math[1]) {
    // 						packageName = math[1];
    // 					} else {
    // 						packageName = '__noMod__' + module.context.split('/').slice(-1)[0];
    // 					}
    // 					// npm package names are URL-safe, but some servers don't like @ symbols
    // 					return `compress.${packageName.replace('@', '')}`;
    // 				}
    // 			}
    // 		}
    // 	}
    // }
  },
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [
        // path.resolve(__dirname, 'src/global.less')
      ],
    },
    // 'postcss-pxtorem': {
    // 	rootValue({file}) {
    // 		console.log(file);
    // 		return file.indexOf('vant') !== -1 ? 75 : 75;
    // 	},
    // 	propList: ['*']
    //   }
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            "primary-color": "#ec6800",
          },
          javascriptEnabled: true,
        },
      },
    },
  },
});
