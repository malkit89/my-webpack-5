const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const PrettierPlugin = require('prettier-webpack-plugin')
const webpack = require('webpack');
const myEnvs = require('./my.env')
const ESLintPlugin = require('eslint-webpack-plugin')
const paths = require('./paths')
const { VueLoaderPlugin } = require("vue-loader")
module.exports = {
    // Where webpack looks to start building the bundle
    entry: [paths.src + '/index.js'],

    // Where webpack outputs the assets and bundles
    output: {
        path: paths.build,
        filename: "[name].[contenthash:8].js",
        chunkFilename: "[name].[contenthash:8].js",
        publicPath: '/',
    },

    // Customize the webpack build process
    plugins: [
        //  Carica loader per vue files
        new VueLoaderPlugin(),
        // Removes/cleans build folders and unused assets when rebuilding
        new CleanWebpackPlugin(),

        // Copies files from target to destination folder
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: paths.public + '/static',
                    to: 'assets',
                    globOptions: {
                        ignore: ['*.DS_Store'],
                    },
                    noErrorOnMissing: true,
                },
            ],
        }),

        // Generates an HTML file from a template
        // Generates deprecation warning: https://github.com/jantimon/html-webpack-plugin/issues/1501
        new HtmlWebpackPlugin({
            title: 'webpack Boilerplate',
            favicon: paths.public + '/favicon.png',
            template: paths.public + '/index.html', // template file
            filename: 'index.html', // output file
        }),

        // ESLint configuration
        new ESLintPlugin({
            files: ['.', 'src', 'config'],
            formatter: 'table',
        }),

        // Prettier configuration
        new PrettierPlugin(),
        //  Enviorment variabili con webpack
        new webpack.DefinePlugin(myEnvs)
    ],

    // Determine how modules within the project are treated
    module: {
        rules: [
            // JavaScript: Use Babel to transpile JavaScript files
            { test: /\.js$/, exclude: /node_modules/, use: ['babel-loader'] },

            // Images: Copy image files to build folder
            { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: 'asset/resource' },

            // Fonts and SVGs: Inline files
            { test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: 'asset/inline' },
            //  Vue file loader
            { test: /\.vue$/, loader: "vue-loader", },
        ],
    },
    resolve: {
        alias: {
            vue$: "vue/dist/vue.runtime.esm.js",
        },
        extensions: ["*", ".js", ".vue", ".json"],
    },
    optimization: {
        moduleIds: "deterministic",
        runtimeChunk: "single",
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    priority: -10,
                    chunks: "all",
                },
            },
        },
    },
    devServer: {
        historyApiFallback: true,
    },
}
