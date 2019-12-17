const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CleanCSSPlugin = require('less-plugin-clean-css');
const path = require('path');
const packageFile = require('./package.json');

module.exports = (env, args) => {
    let production = false;

    if (args && args.mode === 'production') {
        production = true;
        console.log('== Production mode');
    } else {
        console.log('== Development mode');
    }

    const lessLoader = production
        ? {
            loader: 'less-loader',
            options: {
                plugins: [
                    new CleanCSSPlugin({advanced: true})
                ]
            }
        }
        : {
            loader: 'less-loader',
        };

    return {
        entry: {
            'rough-chart': './source/index.jsx',
        },
        output: {
            path: path.resolve('./build'),
            filename: './js/[name].js',
        },
        target: 'web',
        devtool: production ? false : 'source-map',
        optimization: {
            minimize: true,
            // SplitChunksPlugin
            // https://webpack.js.org/plugins/split-chunks-plugin/
            splitChunks: {
                chunks: 'all',
                minSize: 30000,
                maxSize: 0,
                minChunks: 1,
                maxAsyncRequests: 5,
                maxInitialRequests: 3,
                name: true,
                cacheGroups: {
                    'default': {
                        minChunks: 2,
                        priority: -20,
                        reuseExistingChunk: true,
                    },
                    vendors: {
                        test: /[\\/]node_modules[\\/]/,
                        priority: -10,
                    },
                },
            },
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx', '.html', '.txt'],
        },
        module: {
            rules: [
                {
                    test: /\.[t|j]sx?$/,
                    exclude: /node_modules/,
                    use: [{
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                        },
                    }],
                },
                // app main .less file
                {
                    test: /app\.less$/i,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: 'styles/[name].css',
                            }

                        },
                        lessLoader
                    ]
                },
            ],
        },
        devServer: {
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            contentBase: './build',
            compress: true,
            port: 3030,
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './source/index.ejs',
                filename: './index.html',
                appVersion: packageFile.version,
            }),

            new CleanWebpackPlugin({
                verbose: true,
                dry: false,
                cleanOnceBeforeBuildPatterns: [
                    '**/*',
                    '!.gitignore',
                ],
            }),
        ],
    };
};
