(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
angular.module('formioTranslate', [])
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
                'ng-change="changeLanguage(currentLocaleDisplayName, frm)">'+
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
  .service('LocaleService', function ($translate, LOCALES, $rootScope, tmhDynamicLocale) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvZm9ybWlvLXRyYW5zbGF0ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlwidXNlIHN0cmljdFwiO1xuYW5ndWxhci5tb2R1bGUoJ2Zvcm1pb1RyYW5zbGF0ZScsIFtdKVxuICAgIC5kaXJlY3RpdmUoJ25nVHJhbnNsYXRlTGFuZ3VhZ2VTZWxlY3QnLCBmdW5jdGlvbiAoTG9jYWxlU2VydmljZSkgeyAndXNlIHN0cmljdCc7XG4gIHJldHVybiB7XG4gICAgcmVzdHJpY3Q6ICdBJyxcbiAgICByZXBsYWNlOiB0cnVlLFxuICAgIHRlbXBsYXRlOiAnJytcbiAgICAnPGRpdiBjbGFzcz1cImxhbmd1YWdlLXNlbGVjdFwiIG5nLWlmPVwidmlzaWJsZVwiPicrXG4gICAgICAgICc8bGFiZWw+JytcbiAgICAgICAgICAgICd7e1wiZGlyZWN0aXZlcy5sYW5ndWFnZS1zZWxlY3QuTGFuZ3VhZ2VcIiB8IHRyYW5zbGF0ZX19OicrXG4gICAgICAgICAgICAnPHNlbGVjdCBuZy1tb2RlbD1cImN1cnJlbnRMb2NhbGVEaXNwbGF5TmFtZVwiJytcbiAgICAgICAgICAgICAgICAnbmctb3B0aW9ucz1cImxvY2FsZXNEaXNwbGF5TmFtZSBmb3IgbG9jYWxlc0Rpc3BsYXlOYW1lIGluIGxvY2FsZXNEaXNwbGF5TmFtZXNcIicrXG4gICAgICAgICAgICAgICAgJ25nLWNoYW5nZT1cImNoYW5nZUxhbmd1YWdlKGN1cnJlbnRMb2NhbGVEaXNwbGF5TmFtZSwgZnJtKVwiPicrXG4gICAgICAgICAgICAnPC9zZWxlY3Q+JytcbiAgICAgICAgJzwvbGFiZWw+JytcbiAgICAnPC9kaXY+JytcbiAgICAnJyxcbiAgICBjb250cm9sbGVyOiBmdW5jdGlvbiAoJHNjb3BlKSB7XG4gICAgICAkc2NvcGUuY3VycmVudExvY2FsZURpc3BsYXlOYW1lID0gTG9jYWxlU2VydmljZS5nZXRMb2NhbGVEaXNwbGF5TmFtZSgpO1xuXG4gICAgICAkc2NvcGUubG9jYWxlc0Rpc3BsYXlOYW1lcyA9IExvY2FsZVNlcnZpY2UuZ2V0TG9jYWxlc0Rpc3BsYXlOYW1lcygpO1xuICAgICAgJHNjb3BlLnZpc2libGUgPSAkc2NvcGUubG9jYWxlc0Rpc3BsYXlOYW1lcyAmJiAkc2NvcGUubG9jYWxlc0Rpc3BsYXlOYW1lcy5sZW5ndGggPiAxO1xuICAgICAgJHNjb3BlLmNoYW5nZUxhbmd1YWdlID0gZnVuY3Rpb24gKGxvY2FsZSkge1xuICAgICAgICBMb2NhbGVTZXJ2aWNlLnNldExvY2FsZUJ5RGlzcGxheU5hbWUobG9jYWxlKTtcbiAgICAgIH07XG4gICAgfVxuICB9O1xufSlcbiAgLnNlcnZpY2UoJ0xvY2FsZVNlcnZpY2UnLCBmdW5jdGlvbiAoJHRyYW5zbGF0ZSwgTE9DQUxFUywgJHJvb3RTY29wZSwgdG1oRHluYW1pY0xvY2FsZSkge1xuICAgICd1c2Ugc3RyaWN0JztcbiAgICAvLyBQUkVQQVJJTkcgTE9DQUxFUyBJTkZPXG4gICAgdmFyIGxvY2FsZXNPYmogPSBMT0NBTEVTLmxvY2FsZXM7XG5cbiAgICAvLyBsb2NhbGVzIGFuZCBsb2NhbGVzIGRpc3BsYXkgbmFtZXNcbiAgICB2YXIgX0xPQ0FMRVMgPSBPYmplY3Qua2V5cyhsb2NhbGVzT2JqKTtcbiAgICBpZiAoIV9MT0NBTEVTIHx8IF9MT0NBTEVTLmxlbmd0aCA9PT0gMCkge1xuICAgICAgY29uc29sZS5lcnJvcignVGhlcmUgYXJlIG5vIF9MT0NBTEVTIHByb3ZpZGVkJyk7XG4gICAgfVxuICAgIHZhciBfTE9DQUxFU19ESVNQTEFZX05BTUVTID0gW107XG4gICAgX0xPQ0FMRVMuZm9yRWFjaChmdW5jdGlvbiAobG9jYWxlKSB7XG4gICAgICBfTE9DQUxFU19ESVNQTEFZX05BTUVTLnB1c2gobG9jYWxlc09ialtsb2NhbGVdKTtcbiAgICB9KTtcbiAgICBcbiAgICAvLyBTVE9SSU5HIENVUlJFTlQgTE9DQUxFXG4gICAgdmFyIGN1cnJlbnRMb2NhbGUgPSAkdHJhbnNsYXRlLnByb3Bvc2VkTGFuZ3VhZ2UoKTsvLyBiZWNhdXNlIG9mIGFzeW5jIGxvYWRpbmdcbiAgICBcbiAgICAvLyBNRVRIT0RTXG4gICAgdmFyIGNoZWNrTG9jYWxlSXNWYWxpZCA9IGZ1bmN0aW9uIChsb2NhbGUpIHtcbiAgICAgIHJldHVybiBfTE9DQUxFUy5pbmRleE9mKGxvY2FsZSkgIT09IC0xO1xuICAgIH07XG4gICAgXG4gICAgdmFyIHNldExvY2FsZSA9IGZ1bmN0aW9uIChsb2NhbGUpIHtcbiAgICAgIGlmICghY2hlY2tMb2NhbGVJc1ZhbGlkKGxvY2FsZSkpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignTG9jYWxlIG5hbWUgXCInICsgbG9jYWxlICsgJ1wiIGlzIGludmFsaWQnKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY3VycmVudExvY2FsZSA9IGxvY2FsZTsvLyB1cGRhdGluZyBjdXJyZW50IGxvY2FsZVxuICAgICBcbiAgICAgIC8vIGFza2luZyBhbmd1bGFyLXRyYW5zbGF0ZSB0byBsb2FkIGFuZCBhcHBseSBwcm9wZXIgdHJhbnNsYXRpb25zXG4gICAgIFxuICAgICAgJHRyYW5zbGF0ZS51c2UobG9jYWxlKTtcbiAgICB9O1xuICAgIFxuICAgIC8vIEVWRU5UU1xuICAgIC8vIG9uIHN1Y2Nlc3NmdWwgYXBwbHlpbmcgdHJhbnNsYXRpb25zIGJ5IGFuZ3VsYXItdHJhbnNsYXRlXG4gICAgJHJvb3RTY29wZS4kb24oJyR0cmFuc2xhdGVDaGFuZ2VTdWNjZXNzJywgZnVuY3Rpb24gKGV2ZW50LCBkYXRhKSB7XG4gICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2V0QXR0cmlidXRlKCdsYW5nJywgZGF0YS5sYW5ndWFnZSk7Ly8gc2V0cyBcImxhbmdcIiBhdHRyaWJ1dGUgdG8gaHRtbFxuICAgIFxuICAgICAgIC8vIGFza2luZyBhbmd1bGFyLWR5bmFtaWMtbG9jYWxlIHRvIGxvYWQgYW5kIGFwcGx5IHByb3BlciBBbmd1bGFySlMgJGxvY2FsZSBzZXR0aW5nXG4gICAgICB0bWhEeW5hbWljTG9jYWxlLnNldChkYXRhLmxhbmd1YWdlLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXy9nLCAnLScpKTtcbiAgICB9KTtcbiAgICBcbiAgICByZXR1cm4ge1xuICAgICAgZ2V0TG9jYWxlRGlzcGxheU5hbWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGxvY2FsZXNPYmpbY3VycmVudExvY2FsZV07XG4gICAgICB9LFxuICAgICAgc2V0TG9jYWxlQnlEaXNwbGF5TmFtZTogZnVuY3Rpb24gKGxvY2FsZURpc3BsYXlOYW1lKSB7XG4gICAgICAgIHJldHVybiBzZXRMb2NhbGUoXG4gICAgICAgICAgX0xPQ0FMRVNbXG4gICAgICAgICAgICBfTE9DQUxFU19ESVNQTEFZX05BTUVTLmluZGV4T2YobG9jYWxlRGlzcGxheU5hbWUpLy8gZ2V0IGxvY2FsZSBpbmRleFxuICAgICAgICAgICAgXVxuICAgICAgICApO1xuICAgICAgfSxcbiAgICAgIGdldExvY2FsZXNEaXNwbGF5TmFtZXM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIF9MT0NBTEVTX0RJU1BMQVlfTkFNRVM7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7Il19
