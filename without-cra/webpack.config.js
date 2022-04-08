const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: './src/index.js'
  },
  /* 확장자 생략 가능 */
  resolve:{
    extensions: ['.mjs','.js','.jsx','.css']
  },
  /* source-map을 설정하는 부분으로 에러가 발생했을 때 번들링된 파일에서 어느 부분에 에러가 났는지를 쉽게 확인할 수 있게 해주는 도구 */
  devtool: 'eval-cheap-source-map',
  devServer:{
    port: 8000,
    // 수정 사항이 있을 때 업데이트
    hot: true,
    // 서버 시작된 후 브라우저를 열도록함
    open: true,
    client: {
      // 컴파일 진행률을 백분율로 보여줌
      progress: true,
      // 에러 경고 사항 등을 전체 화면으로 보여줌
      overlay: true,
    },
    // 번들된 코드가 실제로 어디 있는지
    static: {
      publicPath: '/dist/',
    },
  },
  output:{
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'images/[hash][ext][query]'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: '/node_modules/',
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      /* 뒤에서부터 실행되므로, css-loader로 처리한 뒤 그 결과물을 style-loader로 한번 더 처리한다. */
      {
        test: /\.svg/,
        type: 'asset/resource',
      },
      {
        test: /\.txt/,
        type: 'asset/source',
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      // favicon: './asset/lp.png',
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),
  ],
}
