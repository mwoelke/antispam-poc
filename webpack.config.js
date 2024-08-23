const path = require('path');

module.exports = {
  target: 'web',
  mode: 'production',
  entry: './src/argon2_modified.js', // Your entry point
  output: {
    filename: 'bundle.js', // Output file
    path: path.resolve(__dirname, 'dist'), // Output directory
  },
  resolve: {
    alias: {
      'path': 'path-browserify' // Polyfill the 'path' module for the browser
    },
    extensions: ['.js'],
    fallback: {
        path: false,
        fs: false,
        Buffer: false,
        process: false,
    },
  },
  externals: {
    './node_modules/xlsx-js-style': 'xlsx-js-style'
  },
  module: {
    // Makes WebPack think that we don't need to parse this module,
    // otherwise it tries to recompile it, but fails
    //
    // Error: Module not found: Error: Can't resolve 'env'
    noParse: /\.wasm$/,
    rules: [
            {
                test: /\.wasm$/,
                // Tells WebPack that this module should be included as
                // base64-encoded binary file and not as code
                loader: 'base64-loader',
                // Disables WebPack's opinion where WebAssembly should be,
                // makes it think that it's not WebAssembly
                //
                // Error: WebAssembly module is included in initial chunk.
                type: 'javascript/auto',
            },
        ],
    },
};
