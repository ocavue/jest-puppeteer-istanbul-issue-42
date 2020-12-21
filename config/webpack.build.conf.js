const {merge} = require("webpack-merge");
const [app] = require("./webpack.base.conf");

const buildWebpackConfig = [merge(app, {
    mode: "production"
})]

module.exports = new Promise(resolve => resolve(buildWebpackConfig));