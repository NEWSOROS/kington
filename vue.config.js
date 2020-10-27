module.exports = {
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = "KINGTON — extraTON extension demo";

        return args;
      });
  }
}
