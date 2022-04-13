const path = require('path');

const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            favicon: 'src/res/favicon.ico'
        }),
        new VueLoaderPlugin(),
        // new webpack.DefinePlugin({
        //     BUILD_TIMESTAMP: Date.now(),
        //     VERSION: JSON.stringify(require('./package.json').version)
        // })
    ],
    devServer: {
        port: 9000,
        historyApiFallback: {
            rewrites: [
                {
                    from: /.(js|png|svg|ico)$/,
                    to: (context) => {
                        const path = context.parsedUrl.pathname.split('/')
                        return `/${path[path.length - 1]}`
                    }
                },
                { from: /^\/#/, to: 'public/index.html' },
            ]
        },
        proxy: {
            '/api': {
                target: '<api_url_here>',
                secure: false,
                changeOrigin: true
            }
        }
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
        rules: [
            {
              test: /\.vue$/,
              use: [
                  'vue-loader',
              ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ],
            },
            {
                test: /\.(png|ico|svg)$/,
                loader: 'file-loader'
            },
            {
                test: /\.worker.js$/,
                use: { loader: 'worker-loader' }
            },
            {
                test: /\.styl(us)?$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'stylus-loader'
                ]
            },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
            },
            // For old modules that declares themselves into global "window.xxx" space
            // {
            //     test :/\.exec\.js$/,
            //     use: 'script-loader'
            // }
        ],
    }
};
