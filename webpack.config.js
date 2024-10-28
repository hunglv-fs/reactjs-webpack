const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/, // Định nghĩa rule cho file .css
        use: ['style-loader', 'css-loader'], // Sử dụng style-loader và css-loader
      },
      {
        test: /\.svg$/, // Định nghĩa rule cho file SVG
        use: 'file-loader', // Sử dụng file-loader
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    static: './dist',
  },
  optimization: {
    minimize: false,
    minimizer: [new TerserPlugin()],
    usedExports: true,
  },
  plugins: [
    new BundleAnalyzerPlugin(), // Thêm plugin phân tích
  ],
  mode: 'development', // Đặt chế độ production để kích hoạt Tree Shaking
};
