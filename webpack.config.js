const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = (env) => ({
    entry: './src/main.js',
    output: {
        path: path.resolve(process.cwd(), 'dist'),
        filename: 'main.[contenthash].js',
        publicPath: env.prod ? '/projects/herzen-project/' : '/'
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
                test: /\.(png|svg|jpg|jpeg|gif|ttf|json|webp)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    env.prod ? MiniCssExtractPlugin.loader : 'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
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