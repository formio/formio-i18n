(function() {
  'use strict';
  angular.module('formioAppBasic', [
    'ngSanitize',
    'ui.router',
    'ui.bootstrap',
    'formio',
    'ngFormioHelper'
  ])
  .config([
    '$stateProvider',
    '$urlRouterProvider',
    'FormioProvider',
    'FormioAuthProvider',
    'FormioResourceProvider',
    'AppConfig',
    '$injector',
    function(
      $stateProvider,
      $urlRouterProvider,
      FormioProvider,
      FormioAuthProvider,
      FormioResourceProvider,
      AppConfig,
      $injector
    ) {
      FormioProvider.setBaseUrl(AppConfig.apiUrl);
      FormioAuthProvider.setForceAuth(true);
      FormioAuthProvider.setStates('auth.login', 'home');
      FormioAuthProvider.register('login', 'user', 'login');
      FormioAuthProvider.register('register', 'user', 'register');

      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: 'views/home.html'
        });

      // Register all of the resources.
      angular.forEach(AppConfig.resources, function(resource, name) {
        FormioResourceProvider.register(name, resource.form, $injector.get(resource.resource + 'Provider'));
      });

      $urlRouterProvider.otherwise('/');
    }
  ])
  .controller('translate', ['$scope','langSelect', function($scope, langSelect){
    langSelect.languageTrans($scope);
  }])
  .factory('langSelect', ['FormioUtils', '$http','AppConfig', function (FormioUtils,$http,AppConfig) {
    return {
      languageTrans: function ($scope) {
        $scope.$on('formLoad', function (event, form) {
          $scope.languageSelect = 'en';
          $scope.$watch('languageSelect', function(languageOption){
            $http.get(AppConfig.languageUrl + '/' + languageOption + '.json').then(function(response){
              FormioUtils.eachComponent(form.components, function (component) {
                console.log(component);
                angular.forEach(response.data, function(key, value){
                  if(component.key == value){
                    component.label = key;
                  }
                });
              });
            });
          });
        });
      }
    };
  }]);
})();
