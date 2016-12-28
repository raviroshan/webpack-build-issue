var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context: __dirname,
    devtool: 'inline-source-map',
    entry: {
        reactApp: './src/app/entry.js'
    },
    output: {
        path: path.join(__dirname, 'src', 'dist'),
        filename: '[name].bundle.js',
        publicPath: '/public/'
    },
    module: {
        loaders: [
            // Our Javascript (bundle into one)
            {
                test: /\.js$/,
                loaders: ['babel-loader'],
                exclude: /node_modules/,
                include: [
                    path.join(__dirname, 'src')
                ]
            },
            // Sass
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap!sass-loader?sourceMap')
            },
            // Images
            {
                test: /\.(jpe?g|png|gif|svg|ico)/,
                loader: require.resolve('url-loader'),
                query: {
                    limit: 1000,
                    name: '[name].[ext]'
                }
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('[name].bundle.css', {
            allChunks: true
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, 'src'),
        port: 9090,
        inline: true,
        noInfo: false,
        open: true,
        historyApiFallback: true
    }
};
