const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const jsonfile = require('jsonfile')

module.exports = (env) => ({
    entry: './src/main.js',
    output: {
        path: path.resolve(process.cwd(), 'dist'),
        filename: 'main.[contenthash].js',
        publicPath: '/',
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
                test: /\.(png|svg|jpg|jpeg|gif|ttf|json)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // выполняются от последнего к первому
                    env.prod ? MiniCssExtractPlugin.loader : 'style-loader',
                    'css-loader',
                    "sass-loader",
                ]
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            // template: path.resolve(__dirname, './src/index.html'),
            filename: env.prod ? 'index.html' : 'index.html',
            template: "./src/index.html",
        }),
        new MiniCssExtractPlugin({
            filename: 'main.[contenthash].css',
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/public', to: 'public' }
            ]
        })
    ],
    devServer: {
        historyApiFallback: true,
        hot: true,
    },
});