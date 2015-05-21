angular.module('app', ['app.tpl', 'ui.router', 'hc.marked', 'toaster']);

angular.module('app').config(function ($httpProvider) {

  // $http を利用した通信に、必ず X-Requested-With ヘッダーを付ける。
  // JSON 関連の攻撃対策
  //   - 直接ブラウズ
  //   - JSON ハイジャック
  //   - UTF-7
  // see: 3分で分かるAngularJSセキュリティ - teppeis blog
  //      http://teppeis.hatenablog.com/entry/2013/12/angularjs-security
  $httpProvider.defaults.headers.common = {
    'X-Requested-With' : 'XMLHttpRequest'
  };

});

angular.module('app').config(function ($locationProvider, $stateProvider, $urlRouterProvider) {

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });

});
