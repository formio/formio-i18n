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
  .directive('ngTranslateLanguageSelect', function (LocaleService) { 
  'use strict';
  return {
    restrict: 'A',
    replace: true,
    template: ''+
    '<div class="language-select" ng-if="visible">'+
      '<label>'+
        '{{"Language" | translate}}:'+
        '<select class="language-dropdown" ng-model="currentLocaleDisplayName"'+
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
        LocaleService.setLocaleByDisplayName(locale);
      };
      $scope.languageRtl = LocaleService.getLocaleRTL();
    }
  };
})
.service('LocaleService', function ($translate, LOCALES, $rootScope, tmhDynamicLocale, $state) {
  'use strict';
  // PREPARING LOCALES INFO
  var localesObj = LOCALES.languages;
  var _LOCALES = [];
  var _LOCALES_DISPLAY_NAMES = [];
  var _LOCALES_RTL = [];

  localesObj.forEach(function(loc){
    _LOCALES.push(loc['locales']);
    _LOCALES_DISPLAY_NAMES.push(loc['name']);
    _LOCALES_RTL.push(loc['rtl']);
  });

  if (!_LOCALES || _LOCALES.length === 0) {
    console.error('There are no _LOCALES provided');
  }

  // STORING CURRENT LOCALE
  var currentLocale = $translate.proposedLanguage();// because of async loading

  var currentLang = _LOCALES_DISPLAY_NAMES[_LOCALES.indexOf(currentLocale)];

  var currentRtl;

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
    currentLang = _LOCALES_DISPLAY_NAMES[_LOCALES.indexOf(locale)];
    currentRtl = _LOCALES_RTL[_LOCALES.indexOf(locale)];
    if(_LOCALES_RTL[_LOCALES.indexOf(locale)] == true) {
      currentRtl = 'rtl';
    }
    $rootScope.languageRtl = currentRtl;
    $rootScope.currentLocaleDisplayName = currentLang;

    

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
      return currentLang;
    },
    getLocaleRTL: function () {
      return currentRtl;
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