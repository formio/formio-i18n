(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
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
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvZm9ybWlvLXRyYW5zbGF0ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlwidXNlIHN0cmljdFwiO1xuYW5ndWxhci5tb2R1bGUoJ25nZm9ybWlvVHJhbnNsYXRlJywgWydwYXNjYWxwcmVjaHQudHJhbnNsYXRlJywndG1oLmR5bmFtaWNMb2NhbGUnXSlcbiAgLmNvbmZpZyhbJyR0cmFuc2xhdGVQcm92aWRlcicsJ3RtaER5bmFtaWNMb2NhbGVQcm92aWRlcicsIGZ1bmN0aW9uKCR0cmFuc2xhdGVQcm92aWRlciwgdG1oRHluYW1pY0xvY2FsZVByb3ZpZGVyKXtcbiAgICAkdHJhbnNsYXRlUHJvdmlkZXIudXNlTWlzc2luZ1RyYW5zbGF0aW9uSGFuZGxlckxvZygpO1xuXG4gICAgJHRyYW5zbGF0ZVByb3ZpZGVyLnVzZVN0YXRpY0ZpbGVzTG9hZGVyKHtcbiAgICAgIHByZWZpeDogJ2FwcC9yZXNvdXJjZXMvbGFuZy8nLC8vIHBhdGggdG8gdHJhbnNsYXRpb25zIGZpbGVzXG4gICAgICBzdWZmaXg6ICcuanNvbicvLyBzdWZmaXgsIGN1cnJlbnRseS0gZXh0ZW5zaW9uIG9mIHRoZSB0cmFuc2xhdGlvbnNcbiAgICB9KTtcbiAgICAkdHJhbnNsYXRlUHJvdmlkZXIudXNlU2FuaXRpemVWYWx1ZVN0cmF0ZWd5KCdlc2NhcGUnKTsgLy9lc2NhcGVzIEhUTUwgaW4gdGhlIHRyYW5zbGF0aW9uXG4gICAgJHRyYW5zbGF0ZVByb3ZpZGVyLnByZWZlcnJlZExhbmd1YWdlKCdlbicpOy8vIGlzIGFwcGxpZWQgb24gZmlyc3QgbG9hZFxuICAgIC8vJHRyYW5zbGF0ZVByb3ZpZGVyLnVzZUxvY2FsU3RvcmFnZSgpOy8vIHNhdmVzIHNlbGVjdGVkIGxhbmd1YWdlIHRvIGxvY2FsU3RvcmFnZVxuXG4gICAgdG1oRHluYW1pY0xvY2FsZVByb3ZpZGVyLmxvY2FsZUxvY2F0aW9uUGF0dGVybignYm93ZXJfY29tcG9uZW50cy9hbmd1bGFyLWkxOG4vYW5ndWxhci1sb2NhbGVfZW4uanMnKTtcbiAgfV0pXG4gIC5kaXJlY3RpdmUoJ25nVHJhbnNsYXRlTGFuZ3VhZ2VTZWxlY3QnLCBmdW5jdGlvbiAoTG9jYWxlU2VydmljZSkgeyAndXNlIHN0cmljdCc7XG4gIHJldHVybiB7XG4gICAgcmVzdHJpY3Q6ICdBJyxcbiAgICByZXBsYWNlOiB0cnVlLFxuICAgIHRlbXBsYXRlOiAnJytcbiAgICAnPGRpdiBjbGFzcz1cImxhbmd1YWdlLXNlbGVjdFwiIG5nLWlmPVwidmlzaWJsZVwiPicrXG4gICAgICAnPGxhYmVsPicrXG4gICAgICAgICd7e1wiZGlyZWN0aXZlcy5sYW5ndWFnZS1zZWxlY3QuTGFuZ3VhZ2VcIiB8IHRyYW5zbGF0ZX19OicrXG4gICAgICAgICc8c2VsZWN0IG5nLW1vZGVsPVwiY3VycmVudExvY2FsZURpc3BsYXlOYW1lXCInK1xuICAgICAgICAgICduZy1vcHRpb25zPVwibG9jYWxlc0Rpc3BsYXlOYW1lIGZvciBsb2NhbGVzRGlzcGxheU5hbWUgaW4gbG9jYWxlc0Rpc3BsYXlOYW1lc1wiJytcbiAgICAgICAgICAnbmctY2hhbmdlPVwiY2hhbmdlTGFuZ3VhZ2UoY3VycmVudExvY2FsZURpc3BsYXlOYW1lKVwiPicrXG4gICAgICAgICc8L3NlbGVjdD4nK1xuICAgICAgJzwvbGFiZWw+JytcbiAgICAnPC9kaXY+JytcbiAgICAnJyxcbiAgICBjb250cm9sbGVyOiBmdW5jdGlvbiAoJHNjb3BlKSB7XG4gICAgICAkc2NvcGUuY3VycmVudExvY2FsZURpc3BsYXlOYW1lID0gTG9jYWxlU2VydmljZS5nZXRMb2NhbGVEaXNwbGF5TmFtZSgpO1xuICAgICAgJHNjb3BlLmxvY2FsZXNEaXNwbGF5TmFtZXMgPSBMb2NhbGVTZXJ2aWNlLmdldExvY2FsZXNEaXNwbGF5TmFtZXMoKTtcbiAgICAgICRzY29wZS52aXNpYmxlID0gJHNjb3BlLmxvY2FsZXNEaXNwbGF5TmFtZXMgJiYgJHNjb3BlLmxvY2FsZXNEaXNwbGF5TmFtZXMubGVuZ3RoID4gMTtcbiAgICAgICRzY29wZS5jaGFuZ2VMYW5ndWFnZSA9IGZ1bmN0aW9uIChsb2NhbGUpIHtcbiAgICAgICAgTG9jYWxlU2VydmljZS5zZXRMb2NhbGVCeURpc3BsYXlOYW1lKGxvY2FsZSk7XG4gICAgICB9O1xuICAgIH1cbiAgfTtcbn0pXG4uc2VydmljZSgnTG9jYWxlU2VydmljZScsIGZ1bmN0aW9uICgkdHJhbnNsYXRlLCBMT0NBTEVTLCAkcm9vdFNjb3BlLCB0bWhEeW5hbWljTG9jYWxlLCAkc3RhdGUpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICAvLyBQUkVQQVJJTkcgTE9DQUxFUyBJTkZPXG4gIHZhciBsb2NhbGVzT2JqID0gTE9DQUxFUy5sb2NhbGVzO1xuXG4gIC8vIGxvY2FsZXMgYW5kIGxvY2FsZXMgZGlzcGxheSBuYW1lc1xuICB2YXIgX0xPQ0FMRVMgPSBPYmplY3Qua2V5cyhsb2NhbGVzT2JqKTtcbiAgaWYgKCFfTE9DQUxFUyB8fCBfTE9DQUxFUy5sZW5ndGggPT09IDApIHtcbiAgICBjb25zb2xlLmVycm9yKCdUaGVyZSBhcmUgbm8gX0xPQ0FMRVMgcHJvdmlkZWQnKTtcbiAgfVxuICB2YXIgX0xPQ0FMRVNfRElTUExBWV9OQU1FUyA9IFtdO1xuICBfTE9DQUxFUy5mb3JFYWNoKGZ1bmN0aW9uIChsb2NhbGUpIHtcbiAgICBfTE9DQUxFU19ESVNQTEFZX05BTUVTLnB1c2gobG9jYWxlc09ialtsb2NhbGVdKTtcbiAgfSk7XG4gIFxuICAvLyBTVE9SSU5HIENVUlJFTlQgTE9DQUxFXG4gIHZhciBjdXJyZW50TG9jYWxlID0gJHRyYW5zbGF0ZS5wcm9wb3NlZExhbmd1YWdlKCk7Ly8gYmVjYXVzZSBvZiBhc3luYyBsb2FkaW5nXG4gIFxuICAvLyBNRVRIT0RTXG4gIHZhciBjaGVja0xvY2FsZUlzVmFsaWQgPSBmdW5jdGlvbiAobG9jYWxlKSB7XG4gICAgcmV0dXJuIF9MT0NBTEVTLmluZGV4T2YobG9jYWxlKSAhPT0gLTE7XG4gIH07XG4gIFxuICB2YXIgc2V0TG9jYWxlID0gZnVuY3Rpb24gKGxvY2FsZSkge1xuICAgIGlmICghY2hlY2tMb2NhbGVJc1ZhbGlkKGxvY2FsZSkpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0xvY2FsZSBuYW1lIFwiJyArIGxvY2FsZSArICdcIiBpcyBpbnZhbGlkJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGN1cnJlbnRMb2NhbGUgPSBsb2NhbGU7Ly8gdXBkYXRpbmcgY3VycmVudCBsb2NhbGVcbiAgIFxuICAgIC8vIGFza2luZyBhbmd1bGFyLXRyYW5zbGF0ZSB0byBsb2FkIGFuZCBhcHBseSBwcm9wZXIgdHJhbnNsYXRpb25zXG4gICAgJHRyYW5zbGF0ZS51c2UobG9jYWxlKTtcbiAgICAkc3RhdGUucmVsb2FkKCk7XG4gIH07XG4gIFxuICAvLyBFVkVOVFNcbiAgLy8gb24gc3VjY2Vzc2Z1bCBhcHBseWluZyB0cmFuc2xhdGlvbnMgYnkgYW5ndWxhci10cmFuc2xhdGVcbiAgJHJvb3RTY29wZS4kb24oJyR0cmFuc2xhdGVDaGFuZ2VTdWNjZXNzJywgZnVuY3Rpb24gKGV2ZW50LCBkYXRhKSB7XG4gICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNldEF0dHJpYnV0ZSgnbGFuZycsIGRhdGEubGFuZ3VhZ2UpOy8vIHNldHMgXCJsYW5nXCIgYXR0cmlidXRlIHRvIGh0bWxcbiAgXG4gICAgIC8vIGFza2luZyBhbmd1bGFyLWR5bmFtaWMtbG9jYWxlIHRvIGxvYWQgYW5kIGFwcGx5IHByb3BlciBBbmd1bGFySlMgJGxvY2FsZSBzZXR0aW5nXG4gICAgdG1oRHluYW1pY0xvY2FsZS5zZXQoZGF0YS5sYW5ndWFnZS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL18vZywgJy0nKSk7XG4gIH0pO1xuICBcbiAgcmV0dXJuIHtcbiAgICBnZXRMb2NhbGVEaXNwbGF5TmFtZTogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGxvY2FsZXNPYmpbY3VycmVudExvY2FsZV07XG4gICAgfSxcbiAgICBzZXRMb2NhbGVCeURpc3BsYXlOYW1lOiBmdW5jdGlvbiAobG9jYWxlRGlzcGxheU5hbWUpIHtcbiAgICAgIHJldHVybiBzZXRMb2NhbGUoXG4gICAgICAgIF9MT0NBTEVTW1xuICAgICAgICAgIF9MT0NBTEVTX0RJU1BMQVlfTkFNRVMuaW5kZXhPZihsb2NhbGVEaXNwbGF5TmFtZSkvLyBnZXQgbG9jYWxlIGluZGV4XG4gICAgICAgICAgXVxuICAgICAgKTtcbiAgICB9LFxuICAgIGdldExvY2FsZXNEaXNwbGF5TmFtZXM6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfTE9DQUxFU19ESVNQTEFZX05BTUVTO1xuICAgIH1cbiAgfTtcbn0pOyJdfQ==
