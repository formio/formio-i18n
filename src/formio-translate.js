angular.module('ngformioTranslate', ['pascalprecht.translate','tmh.dynamicLocale'])
  .config(['$translateProvider','tmhDynamicLocaleProvider', function($translateProvider, tmhDynamicLocaleProvider){
    $translateProvider.useMissingTranslationHandlerLog();

    $translateProvider.useStaticFilesLoader({
      prefix: 'app/resources/lang/',// path to translations files
      suffix: '.json'// suffix, currently- extension of the translations
    });
    $translateProvider.useSanitizeValueStrategy('escape'); //escapes HTML in the translation
    $translateProvider.preferredLanguage('en');// is applied on first load
    //$translateProvider.useLocalStorage();// saves selected language to localStorage

    tmhDynamicLocaleProvider.localeLocationPattern('bower_components/angular-i18n/angular-locale_en.js');
  }])
  .directive('ngTranslateLanguageSelect', function (LocaleService) { 'use strict';
  return {
    restrict: 'A',
    replace: true,
    template: ''+
    '<div class="language-select" ng-if="visible">'+
      '<label>'+
        '{{"directives.language-select.Language" | translate}}:'+
        '<select ng-model="currentLocaleDisplayName"'+
          'ng-options="localesDisplayName for localesDisplayName in localesDisplayNames"'+
          'ng-change="changeLanguage(currentLocaleDisplayName)">'+
        '</select>'+
      '</label>'+
    '</div>'+
    '',
    controller: function ($scope) {
      $scope.currentLocaleDisplayName = LocaleService.getLocaleDisplayName();
      $scope.localesDisplayNames = LocaleService.getLocalesDisplayNames();
      $scope.visible = $scope.localesDisplayNames && $scope.localesDisplayNames.length > 1;
      $scope.changeLanguage = function (locale) {
        console.log(locale);
        LocaleService.setLocaleByDisplayName(locale);
      };
    }
  };
})
.service('LocaleService', function ($translate, LOCALES, $rootScope, tmhDynamicLocale, $state) {
  'use strict';
  // PREPARING LOCALES INFO
  var localesObj = LOCALES.locales;

  // locales and locales display names
  var _LOCALES = Object.keys(localesObj);
  if (!_LOCALES || _LOCALES.length === 0) {
    console.error('There are no _LOCALES provided');
  }
  var _LOCALES_DISPLAY_NAMES = [];
  _LOCALES.forEach(function (locale) {
    _LOCALES_DISPLAY_NAMES.push(localesObj[locale]);
  });
  
  // STORING CURRENT LOCALE
  var currentLocale = $translate.proposedLanguage();// because of async loading
  
  // METHODS
  var checkLocaleIsValid = function (locale) {
    return _LOCALES.indexOf(locale) !== -1;
  };
  
  var setLocale = function (locale) {
    if (!checkLocaleIsValid(locale)) {
      console.error('Locale name "' + locale + '" is invalid');
      return;
    }
    currentLocale = locale;// updating current locale
   
    // asking angular-translate to load and apply proper translations
    $translate.use(locale);
    $state.reload();
  };
  
  // EVENTS
  // on successful applying translations by angular-translate
  $rootScope.$on('$translateChangeSuccess', function (event, data) {
    document.documentElement.setAttribute('lang', data.language);// sets "lang" attribute to html
  
     // asking angular-dynamic-locale to load and apply proper AngularJS $locale setting
    tmhDynamicLocale.set(data.language.toLowerCase().replace(/_/g, '-'));
  });
  
  return {
    getLocaleDisplayName: function () {
      return localesObj[currentLocale];
    },
    setLocaleByDisplayName: function (localeDisplayName) {
      return setLocale(
        _LOCALES[
          _LOCALES_DISPLAY_NAMES.indexOf(localeDisplayName)// get locale index
          ]
      );
    },
    getLocalesDisplayNames: function () {
      return _LOCALES_DISPLAY_NAMES;
    }
  };
});