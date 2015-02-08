require.config({
  baseUrl: 'js',
  paths: {
      jquery:       'libs/jquery'
  ,   transparency: 'libs/transparency'
  ,   spinner:      'libs/spin'
  ,   velocity:     'libs/velocity'
  }
});

require(['app'], function (App) {

  window.TwitterBookmarks = new App();

  console.log(window.TwitterBookmarks);

});