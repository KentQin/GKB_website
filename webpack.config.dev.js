import path from 'path';
import webpack from 'webpack';

export default {
    entry: [
        path.join(__dirname, '/client/index.js')
        ],
    output: {
        path: "/",
        filename: "bundle.js",
        publicPath: "/"
    },
    plugins:[
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin()
    ],
    devtool: 'cheap-source-map',
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: [
                    path.join(__dirname, 'client'),
                    path.join(__dirname, 'server/shared')
                    ],
                loaders: ['babel-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.js']
    }
}
