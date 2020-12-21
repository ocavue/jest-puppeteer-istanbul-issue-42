const webpack = require("webpack");
const { merge } = require("webpack-merge");
const [renderer] = require("./webpack.base.conf")

const buildWebpackConfig = [merge(renderer, {
    mode: "development",
    devtool: "eval-cheap-module-source-map",
    devServer: {
        contentBase: renderer.externals[0].paths.dist,
        port: 8081,
        overlay: {
            warnings: false,
            errors: true
        },
        hot: true,
        open: true,
        historyApiFallback: true
    },
    plugins: [
        new webpack.SourceMapDevToolPlugin({
            filename: "[file].map"
        })
    ]
})]