const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // Tambahkan ini

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src/main.jsx'), // Ubah dari index.js ke main.jsx jika itu entry point React Anda
    // sw: path.resolve(__dirname, 'src/sw.js'), // Akan dikelola oleh InjectManifest, jadi nonaktifkan di sini
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    publicPath: '/', // Penting untuk routing SPA dan PWA
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'], // Tambahkan .jsx
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Tangani file .js dan .jsx
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'], // Gunakan MiniCssExtractPlugin
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i, // Tambahkan ini untuk asset gambar
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i, // Tambahkan ini untuk font
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html'), // Sesuaikan path jika index.html ada di luar src
      filename: 'index.html',
      excludeChunks: ['sw'], // Penting: Jangan sertakan sw.bundle.js di index.html
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'public/'), // Sesuaikan jika folder assets Anda bernama lain
          to: path.resolve(__dirname, 'dist/'),
          globOptions: {
            ignore: ['**/index.html'], // Jangan copy index.html dari public jika sudah dibuat oleh HtmlWebpackPlugin
          },
        },
      ],
    }),
    new MiniCssExtractPlugin({ filename: 'styles/[name].css' }), // Output CSS ke folder styles
  ],
};