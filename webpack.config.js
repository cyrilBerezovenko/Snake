module.exports = {
    context: "G:\\WebStormProjects\\snake",
    devtool: "source-map",
    mode: "development",
    entry: ".\\src\\js\\index.js",
    output: {
        path: "G:\\WebStormProjects\\snake\\dist",
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude:/node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }
        ]
    }
};