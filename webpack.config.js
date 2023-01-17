const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = (env) => ({
    entry: './src/main.js',
    output: {
        path: path.resolve(process.cwd(), 'dist'),
        filename: 'main.[contenthash].js',
        // publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|ttf)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.css$/i,
                use: [
                    // выполняются от последнего к первому
                    env.prod ? MiniCssExtractPlugin.loader : 'style-loader',
                    'css-loader',
                ]
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './index.html'),
            filename: env.prod? 'index.[contenthash].html' : 'index.html',
        }),
        new MiniCssExtractPlugin({
            filename: 'main.[contenthash].css',
        }),
    ],
    devServer: {
        hot: true,
    },
});