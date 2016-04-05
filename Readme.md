This is a helper module works with angular-translate and help to integrate multilingual feature to the formio-forms.
===============
Step-I:
------ app.js -------
angular.module('formioAppBasic', [
    'formioTranslate', //Custom formio translate component
    'pascalprecht.translate',// angular-translate
    'tmh.dynamicLocale'// angular-dynamic-locale
  ])
  .constant('LOCALES', {
    'locales': {
        'ru': 'Русский',
        'en': 'English',
        'ar': 'Arabian'
    },
    'preferredLocale': 'en_US'
  })
  .config([
    '$translateProvider',
    'tmhDynamicLocaleProvider',
    function(
      $translateProvider,
      tmhDynamicLocaleProvider
    ) {
     
      $translateProvider.useMissingTranslationHandlerLog();
      $translateProvider.useStaticFilesLoader({
        prefix: 'app/resources/lang/',// path to translations files
        suffix: '.json'// suffix, currently- extension of the translations
      });
      $translateProvider.preferredLanguage('en');// is applied on first load
      tmhDynamicLocaleProvider.localeLocationPattern('bower_components/formio-translate/bower_component/angular-i18n/angular-locale_en.js');



Step-II
------- index.html ------
Add:
<script src="../bower_components/formio-translate/src/formio-translate.js"></script>

Step-III
Include directive to load supported language list in dropdown:
 <div ng-translate-language-select></div>
 
step - VI
Add "app/resources/lang/" with language files eg. en.json, ar.json etc

{
    "views.myapp.Splendid!": "Behatareen!",
    "directives.language-select.Language": "Language",
    "Email": "Email",
    "Password": "Password",
    "Submit": "Submit"
}
 