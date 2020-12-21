const path = require("path")
const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

const PATHS = {
    src: path.join(__dirname, "../src"),
    dist: path.join(__dirname, "../dist"),
    global: path.resolve(__dirname, "../src/styles/globals.scss"),
    assets: "assets/"
};

module.exports = [
    {
        entry: {
            app: PATHS.src
        },
        externals: [
            {
                paths: PATHS
            }
        ],
        resolve: {
            extensions: [".ts", ".tsx", "json", ".css", ".scss", ".js", ".jsx", ".svg", ".ignore"]
        },
        module: {
            rules: [{
                test: /\.css$/,
                exclude: [/node_modules/, PATHS.global],
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader",
                        options: {
                            import: true,
                            sourceMap: true,
                            modules: {
                                mode: 'local',
                                localIdentName: '[path][name]__[local]--[hash]',
                                exportLocalsConvention: 'camelCase'
                            }
                        }
                    }, {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: true,
                            postcssOptions: {
                                config: path.resolve(__dirname, "postcss.config.js")
                            }
                        }
                    }]
            }, {
                test: /\.scss$/,
                exclude: [/node_modules/, PATHS.global],
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader",
                        options: {
                            import: true,
                            sourceMap: true,
                            modules: {
                                mode: 'local',
                                localIdentName: '[path][name]__[local]--[hash]',
                                exportLocalsConvention: 'camelCase'
                            }
                        }
                    }, {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: true,
                            postcssOptions: {
                                config: path.resolve(__dirname, "postcss.config.js")
                            }
                        }
                    }, {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true
                        }
                    }]
            }, {
                test: /\.css$/,
                include: [PATHS.global],
                use: ["style-loader", "css-loader"]
            }, {
                test: /\.scss$/,
                include: [PATHS.global],
                use: ["style-loader", "css-loader", "sass-loader"]
            }, {
                test: /\.tsx?$/,
                use: [{
                    loader: "babel-loader"
                }]
            }, {
                test: /\.(ignore|zip|png|ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                use: [{
                    loader: "file-loader",
                    options: {
                        name: "[name].[ext]",
                        outputPath: "static/assets/"
                    }
                }]
            }]
        },
        optimization: {
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        name: "vendors",
                        test: /node_modules/,
                        chunks: "all",
                        enforce: true
                    }
                }
            }
        },
        output: {
            path: PATHS.dist,
            filename: `${PATHS.assets}js/[name]-bundle.[hash].js`,
            publicPath: "/"
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: `${PATHS.src}/index.html`,
                filename: "./index.html"
            }),
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: `${PATHS.src}/static`,
                        to: `${PATHS.assets}/static`
                    }
                ]
            }),
            new CleanWebpackPlugin(),
            new webpack.ProgressPlugin(),
            new webpack.DefinePlugin({
                "process.env.DEV": JSON.stringify(process.env.NODE_ENV),
                "process.env.DEBUG": JSON.stringify(process.env.DEBUG),
                "process.env.API_PREFIX": JSON.stringify(process.env.API_PREFIX)
            })
        ]
    }
];