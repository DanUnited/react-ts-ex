const CracoAntDesignPlugin = require("craco-antd");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const WebpackBar = require("webpackbar");
const path = require("path");

process.env.BROWSER = "none";

module.exports = {
  jest: {
    configure(config) {
      config.transformIgnorePatterns = [
        '/node_modules/(?!antd|rc-pagination|rc-calendar|rc-tooltip)/.+\\.js$',
      ];
      return config;
    },
  },
  webpack: {
    cache: {
        buildDependencies: {
            // This makes all dependencies of this file - build dependencies
            config: [__filename],
            // By default webpack and loaders are build dependencies
        },
    },
    plugins: [
      new WebpackBar({ profile: true }),
      ...(process.env.NODE_ENV === "development"
        ? [new BundleAnalyzerPlugin({ openAnalyzer: false })]
        : []),
    ],
  },
  plugins: [
    {
      plugin: CracoAntDesignPlugin,
      options: {
        customizeThemeLessPath: path.join(
          __dirname,
          "src/modules/theme/theme.less"
        ),
        miniCssExtractPluginOptions: {
          ignoreOrder: true,
        }
      },
    },
  ],
};
