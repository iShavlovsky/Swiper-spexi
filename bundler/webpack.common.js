const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')

const path = require('path')
const mode = process.env.NODE_ENV || 'development';
const devMode = mode === 'production';

module.exports = {
    mode,
    entry: path.resolve(__dirname, '../src/script.js'),
    output:
        {
            hashFunction: 'xxhash64',
            filename: 'bundle.[contenthash].js',
            path: path.resolve(__dirname, '../dist'),
            clean: true
        },
    devtool: 'eval-source-map',
    plugins:
        [
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: path.resolve(__dirname, '../static')
                    }
                ]
            }),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, '../src/index.html'),
                minify: true
            }),
            new MiniCSSExtractPlugin({
                filename: '[name].[contenthash].css',
            })
        ],
    module:
        {
            rules:
                [
                    // HTML
                    {
                        test: /\.(html)$/i,
                        use:
                            [
                                'html-loader'
                            ]
                    },

                    // JS
                    {
                        test: /\.m?js$/i,
                        exclude: /(node_modules|bower_components)/,
                        use:{
                            loader: 'babel-loader',
                            options: {
                                presets: ['@babel/preset-env'],
                            },
                        },
                    },
                    {
                        // scss
                        test: /\.(c|sa|sc)ss$/i,
                        use: [
                            devMode ? 'style-loader' : MiniCSSExtractPlugin.loader,
                            {
                                loader: 'css-loader',
                                options: {
                                    sourceMap: true,
                                    importLoaders: 1,
                                }
                            },
                            {
                                loader: 'postcss-loader',
                                options: {
                                    sourceMap: true,
                                    postcssOptions: {
                                        plugins: [require('postcss-preset-env')],
                                    },
                                }
                            },
                            'group-css-media-queries-loader',
                            {
                                loader: 'resolve-url-loader',
                            },
                            {
                                loader: 'sass-loader',
                                options: {
                                    sourceMap: true
                                }
                            }
                        ]
                    },
                    // Images
                    {
                        test: /\.(jpe?g|png|webp|gif|svg)$/i,
                        use: [
                                {
                                    loader: 'image-webpack-loader',
                                    options: {
                                        mozjpeg: {
                                            progressive: true,
                                        },
                                        optipng: {
                                            enabled: false,
                                        },
                                        pngquant: {
                                            quality: [0.65, 0.9],
                                            speed: 4,
                                        },
                                        gifsicle: {
                                            interlaced: false,
                                        },
                                        webp: {
                                            quality: 75,
                                        },
                                    },
                                },
                            ],
                        type: 'asset/resource',
                        generator:
                            {
                                filename: 'assets/image/[hash][ext]'
                            }
                    },
                    // Fonts
                    {
                        test: /\.(ttf|eot|woff|woff2)$/,
                        type: 'asset/resource',
                        generator:
                            {
                                filename: 'assets/fonts/[hash][ext]'
                            }
                    }
                ]
        }
}
