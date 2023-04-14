const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const appDirectory = path.resolve(__dirname);
const {presets} = require(`${appDirectory}/babel.config.js`);


const compileNodeModules = [
    "@microsoft/signalr",
    "@qeepsake/react-native-file-utils",
    "@react-native-async-storage/async-storage",
    "@react-native-clipboard/clipboard",
    "@react-native-community/viewpager",
    "@react-native-cookies/cookies",
    "@react-native-hero/umeng-push",
    "@react-native-masked-view/masked-view",
    "@rneui/base",
    "@rneui/themed",
    "fbjs",
    "jsencrypt",
    "moment",
    "react",
    "react-native",
    "react-native-actionsheet",
    "react-native-base64",
    "react-native-code-push",
    "react-native-create-thumbnail",
    "react-native-device-info",
    "react-native-error-helper",
    "react-native-exit-app",
    "react-native-gesture-handler",
    "react-native-get-random-values",
    "react-native-image-viewing",
    "react-native-linear-gradient",
    "react-native-linear-gradient-text",
    "react-native-marquee-ab",
    "react-native-navigation",
    "react-native-reanimated",
    "react-native-render-html",
    "react-native-safe-area-context",
    "react-native-scroll-head-tab-view",
    "react-native-swiper",
    "react-native-ui-lib",
    "react-native-vector-icons",
    "react-native-web",
    "react-native-webview",
    "react-native-wechat-lib",
    "react-usestateref",
    "uuid",
    'react-native-svg',
    'react-native-shimmer-placeholder',
    'postcss-js',
    '@react-native-picker/picker',
    'react-native-haptic-feedback',
    '@react-native-community/async-storage',
    '@react-native-community/netinfo',
    '@react-native-community/picker',
    'postcss',
    '@react-navigation/bottom-tabs',
    '@react-navigation/native',
    '@react-navigation/native-stack',
    '@react-navigation/elements',
    'react-native-web-linear-gradient',
    '@ant-design/react-native',
    '@react-native-community/segmented-control',
    '@react-native-community/slider',
    '@yz1311/react-native-wheel-picker',
    '@react-native-cookies/cookies',
].map(moduleName =>
    path.resolve(appDirectory, `node_modules/${moduleName}`),
);

const babelLoaderConfiguration = {
    test: /\.js$|tsx?$/,
    // Add every directory that needs to be compiled by Babel during the build.
    include: [
        path.resolve(__dirname, 'index.web.js'), // Entry to your application
        path.resolve(__dirname, 'App.js'), // Change this to your main App file
        path.resolve(__dirname, 'src'),
        ...compileNodeModules,
    ],
    use: {
        loader: 'babel-loader',
        options: {
            cacheDirectory: true,
            presets,
            plugins: [
                'react-native-web',
                ["import", { libraryName: "@ant-design/react-native" }]
            ],
        },
    },
};

const svgLoaderConfiguration = {
    test: /\.svg$/,
    use: [
        {
        loader: '@svgr/webpack',
        },
    ],
};

const imageLoaderConfiguration = {
    test: /\.(gif|jpe?g|png)$/,
    // type: 'asset/inline',
    use: {
        loader: 'react-native-web-image-loader',
        options: {
            name: 'static/media/[name].[hash:8].[ext]',
            esModule: false,
            scalings: {'@2x': 2, '@3x': 3 },
        },
    },
};

const webViewRule = {
    test: /postMock.html$/,
    use: {
        loader: 'file-loader',
        options: {
            name: '[name].[ext]',
        },
    },
}

module.exports = {
    devServer: {//代理
        https: true,     
        hot: true,
        host:'dd373.com',
        port:8080,      
    },
    entry: {
        app: path.join(__dirname, 'index.web.js'),
    },
    output: {
        path: path.resolve(appDirectory, 'dist'),
        publicPath: '/',
        filename: 'rnw_blogpost.bundle.js',
    },
    resolve: {
        extensions: ['.web.tsx', '.web.ts', '.tsx', '.ts', '.web.js', '.js'],
        alias: {
            'react-native$': 'react-native-web',
            'react-native-linear-gradient': 'react-native-web-linear-gradient',
            'react-native-webview': 'react-native-web-webview'
        },
    },
    module: {
        rules: [
            babelLoaderConfiguration,
            imageLoaderConfiguration,
            svgLoaderConfiguration,
            webViewRule
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'index.html'),
            meta: {
                viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, shrink-to-fit=no'
            },
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            __DEV__: process.env.NODE_ENV === 'production' || true
        }),
        new webpack.ProvidePlugin({
            process: 'process/browser'
        }),
    ],
};
