var path = require("path"),
    nodeModules = path.join(__dirname, "node_modules"),
    extractTextPlugin = require('extract-text-webpack-plugin'),
    autoprefixer = require('autoprefixer'),
    entrys = {
        index: ['./src/apps/index/js/index'],
        libs:['./src/libs/libs']
    }

module.exports = {
    entry: entrys,
    output: {
        path: './dist',
        filename: '[name].js',
    },
    module: {
        loaders: [{
            test: require.resolve('jquery'),
            loader: 'expose?jQuery!expose?$'
        },
        {
            test: /apps.+\.scss$/,
            loader: 'style!css!sass'
        }, {
            test: /.(png|jpg)$/,
            loader: 'url-loader?limit=10240'
        }, {
            test: /\.(woff2?|otf|eot|svg|ttf)$/i,
            loader: 'url?name=fonts/[name].[ext]'
        }, {
            test: /uiComponent.+\.scss$/,
            loader: 'style!css!sass'
        }, {
            test: /\.html$/,
            loader: 'html'
        }]
    },
    postcss: function() {
        return [autoprefixer];
    },

    resolve: {
        alias: {
            "jquery": path.join(__dirname, "src/libs/jsTools/jquery/jquery.js"),
            "toast": path.join(__dirname, "src/libs/uiComponent/toast/toast.js"),
            "header": path.join(__dirname, "src/libs/uiComponent/header/header.js"),
            "table": path.join(__dirname, "src/libs/uiComponent/table/table.js"),
            "nav": path.join(__dirname, "src/libs/uiComponent/nav/nav.js"),
            "page": path.join(__dirname, "src/libs/uiComponent/page/page.js"),
            "form": path.join(__dirname, "src/libs/uiComponent/form/form.js"),
            "confirmBox":path.join(__dirname, "src/libs/uiComponent/confirmBox/confirmBox.js")
            
        }
    },

    plugins: [
        new extractTextPlugin('[name].css')
    ]
}
