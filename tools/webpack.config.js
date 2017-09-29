const path = require('path');
import ExtractTextPlugin from 'extract-text-webpack-plugin';
const eslintFormatter = require('react-dev-utils/eslintFormatter');
const AUTOPREFIXER_BROWSERS = [
    'Android 2.3',
    'Android >= 4',
    'Chrome >= 35',
    'Firefox >= 31',
    'Explorer >= 9',
    'iOS >= 6',
    'Opera >= 12',
    'Safari >= 7.1',
];
const config = {
        entry: {
            'style': [path.resolve(__dirname, '../src/style.js')],
        },
        output: {
            path: path.resolve(__dirname, '../lib'),
            publicPath: '../../',
            filename: '[name].js',
            libraryTarget: 'umd',
            library: 'avatar-bc'
        },
        externals: {
            'lodash': {
                commonjs: 'lodash',
                commonjs2: 'lodash',
                amd: 'lodash',
                root: '_'
            }
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    enforce: 'pre',
                    use: [
                        {
                            options: {
                                formatter: eslintFormatter,
                                baseConfig: {
                                    extends: [require.resolve('eslint-config-react-app')],
                                },
                                ignore: false,
                                useEslintrc: false,
                            },
                            loader: require.resolve('eslint-loader'),
                        },
                    ],
                    include: path.resolve(__dirname, '../src'),
                },
                // ** ADDING/UPDATING LOADERS **
                // The "file" loader handles all assets unless explicitly excluded.
                // The `exclude` list *must* be updated with every change to loader extensions.
                // When adding a new loader, you must add its `test`
                // as a new entry in the `exclude` list in the "file" loader.

                // "file" loader makes sure those assets end up in the `build` folder.
                // When you `import` an asset, you get its filename.
                {
                    exclude: [
                        /\.html$/,
                        /\.(js|jsx)$/,
                        /\.css$/,
                        /\.less$/,
                        /\.json$/,
                        /\.bmp$/,
                        /\.gif$/,
                        /\.jpe?g$/,
                        /\.png$/,
                    ],
                    loader: require.resolve('file-loader'),
                    options: {
                        name: 'public/static/media/[name].[hash:8].[ext]',
                    },
                },
                // "url" loader works just like "file" loader but it also embeds
                // assets smaller than specified size as data URLs to avoid requests.
                {
                    test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                    loader: require.resolve('url-loader'),
                    options: {
                        limit: 10000,
                        name: 'public/static/media/[name].[hash:8].[ext]',
                    },
                },
                // Process JS with Babel.
                {
                    test: /\.(js|jsx)$/,
                    include: path.resolve(__dirname, '../src'),
                    loader: require.resolve('babel-loader'),
                    // @remove-on-eject-begin
                    options: {
                        babelrc: false,
                        plugins: [
                            ['@didi/babel-plugin-subimport', {libraryName: '@didi/avatar-ui', style:true }],
                        ],
                        // presets: ["es2015", 'react-app',"react"].map(function (preset) {
                        //     return require.resolve(`babel-preset-${preset}`)
                        // }),
                    },
                    // @remove-on-eject-end
                },
                // The notation here is somewhat confusing.
                // "postcss" loader applies autoprefixer to our CSS.
                // "css" loader resolves paths in CSS and adds assets as dependencies.
                // "style" loader normally turns CSS into JS modules injecting <style>,
                // but unlike in development configuration, we do something different.
                // `ExtractTextPlugin` first applies the "postcss" and "css" loaders
                // (second argument), then grabs the result CSS and puts it into a
                // separate file in our build process. This way we actually ship
                // a single CSS file in production instead of JS code injecting <style>
                // tags. If you use code splitting, however, any async bundles will still
                // use the "style" loader inside the async code so CSS from them won't be
                // in the main CSS file.
                {
                    test: /\.css$/,
                    loader: ExtractTextPlugin.extract(
                        Object.assign(
                            {
                                fallback: require.resolve('style-loader'),
                                use: [
                                    {
                                        loader: require.resolve('css-loader'),
                                        options: {
                                            importLoaders: 1,
                                            minimize: true,
                                            sourceMap: true,
                                        },
                                    },
                                    {
                                        loader: require.resolve('postcss-loader'),
                                        options: {
                                            ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
                                            plugins: () => [
                                                require('postcss-flexbugs-fixes'),
                                                require('postcss-import')({
                                                    path: [path.join(__dirname, '../node_modules')]
                                                }),
                                                require('postcss-mixins')(),
                                                require('postcss-nested')(),
                                                require('postcss-cssnext')({
                                                    browsers: AUTOPREFIXER_BROWSERS,
                                                }),
                                            ],
                                        },
                                    },
                                ],
                            }
                        )
                    ),
                    // Note: this won't work without `new ExtractTextPlugin()` in `plugins`.
                },
                {
                    test: /\.less$/,
                    loader: ExtractTextPlugin.extract(
                        Object.assign(
                            {
                                fallback: require.resolve('style-loader'),
                                use: [
                                    {
                                        loader: require.resolve('css-loader'),
                                        options: {
                                            importLoaders: 1,
                                            minimize: true,
                                            sourceMap: true,
                                        },
                                    },
                                    {
                                        loader: require.resolve('postcss-loader'),
                                        options: {
                                            ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
                                            plugins: () => [
                                                require('postcss-flexbugs-fixes'),
                                                require('postcss-import')({
                                                    path: [path.join(__dirname, '../node_modules')]
                                                }),
                                                require('postcss-mixins')(),
                                                require('postcss-nested')(),
                                                require('postcss-cssnext')({
                                                    browsers: AUTOPREFIXER_BROWSERS,
                                                }),
                                            ],
                                        },
                                    },
                                    {
                                        loader: require.resolve('less-loader'),
                                        options: {
                                            modifyVars: {
                                                "@primary-color": "#1DA57A",
                                                "@icon-url": '"/iconfont/iconfont"'
                                            },
                                        },
                                    },
                                ],
                            }
                        )
                    ),
                },
                // ** STOP ** Are you adding a new loader?
                // Remember to add the new extension(s) to the "file" loader exclusion list.
            ],
        },
       plugins:[
           new ExtractTextPlugin('public/styles/avatar-bc.css'),
       ],
};

export default config;