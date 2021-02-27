const path = require("path");
const babiliPlugin = require("babili-webpack-plugin");
const extractTextPlugin = require('extract-text-webpack-plugin');

let plugins = []

plugins.push(new extractTextPlugin('styles.css'))

if (process.env.NODE_ENV == "prod") {
    plugins.push(new babiliPlugin())
}

module.exports = {
    entry: "./app-src/app.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
        publicPath: 'dist'
    },
    module: {
        rules: [
            { // Executar antes do bundle
                test: /\.js$/, // Para aceitar arquivos com extenção .js
                exclude: /node_modules/, // Remover diretorio
                use: {
                    loader: 'babel-loader'
                }
            },
            { 
                test: /\.css$/, 
                use: extractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
            { 
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, 
                loader: 'url-loader?limit=10000&mimetype=application/font-woff' 
            },
            { 
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, 
                loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
            },
            { 
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, 
                loader: 'file-loader' 
            },
            { 
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, 
                loader: 'url-loader?limit=10000&mimetype=image/svg+xml' 
            }
        ]
    },
    plugins: plugins
}