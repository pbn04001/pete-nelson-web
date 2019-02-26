module.exports = {
  lintOnSave: false,
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.svg$/,
          include: /src(\/|\\)assets(\/|\\)icons/,
          use: [
            { loader: 'svg-sprite-loader' },
            {
              loader: 'svgo-loader',
              options: {
                plugins: [
                  { removeTitle: false },
                ],
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new SpriteLoaderPlugin({
        plainSprite: true,
      }),
    ],
  },
  chainWebpack: config => {
    config.module
      .rule('svg')
      .use('file-loader')
      .loader('svg-sprite-loader');
  },
};
