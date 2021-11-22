const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const config = require('./config.json');
const gulp = require('gulp');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

const configurePlugins = () => {
    const plugins = [];

    if (process.env.NODE_ENV === 'production') {
        plugins.push(new UglifyJSPlugin({
            sourceMap: true,
        }));
    }

    return plugins;
};

const configureBabelLoader = (browserlist) => {
    return {
        test: /\.js$/,
        use: {
            loader: 'babel-loader',
            options: {
                babelrc: false,
                presets: [
                    ['@babel/preset-env', {
                        debug: true,
                        modules: false,
                        useBuiltIns: 'entry',
                        targets: {
                            browsers: browserlist,
                        },
                    }],
                ],
            },
        },
    };
};

const baseConfig = {
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '..', config.publicDir),
    },
    devtool: '#source-map',
};

const modernPlugins = configurePlugins();
modernPlugins.push(new CleanWebpackPlugin());

const modernConfig = Object.assign({}, baseConfig, {
    entry: {'main': './dev/scripts/main.js'},
    plugins: modernPlugins,
    module: {
        rules: [
            configureBabelLoader([
                // The last two versions of each browser, excluding versions
                // that don't support <script type="module">.
                'last 2 Chrome versions', 'not Chrome < 60',
                'last 2 Safari versions', 'not Safari < 10.1',
                'last 2 iOS versions', 'not iOS < 10.3',
                'last 2 Firefox versions', 'not Firefox < 54',
                'last 2 Edge versions', 'not Edge < 15',
            ]),
        ],
    },
});

const legacyConfig = Object.assign({}, baseConfig, {
    entry: {
        'main-legacy': './dev/scripts/main-legacy.js',
    },
    plugins: configurePlugins(),
    module: {
        rules: [
            configureBabelLoader([
                'last 2 versions',
            ]),
        ],
    },
});

const createCompiler = (config) => {
    const compiler = webpack(config);
    return () => {
        return new Promise((resolve, reject) => {
            compiler.run((err, stats) => {
                if (err) return reject(err);
                /* eslint no-console: ["error", { allow: ["warn", "error"] }] */
                console.error(stats.toString({colors: true}) + '\n');
                resolve();
            });
        });
    };
};

gulp.task('javascript', async () => {
    try {
        const compileModernBundle = createCompiler(modernConfig);
        await compileModernBundle();

        const compileLegacyBundle = createCompiler(legacyConfig);
        await compileLegacyBundle();
    } catch (err) {
        console.error(err);
    }
});
