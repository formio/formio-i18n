Let's enhance your formio forms with multilingual feature with the help of formio-translate bower component.
--------------------------------------------------------------------------------------------------------------------
**app.js**
```
angular.module('formioAppBasic', [
  'ngformioTranslate' //Custom formio translate component
]);
```
Decleare language constants
```
.constant('LOCALES', {
  'locales': {
      'ru': 'Русский',
      'en': 'English',
      'ar': 'Arabian'
  },
  'preferredLocale': 'en_US'
})
```

**index.html**

Add:
```
<script src="config.js" type="text/javascript"></script>
```
```
<script src="../bower_components/angular-translate/angular-translate.js"></script>
```
```
<script src="../bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.js"></script> 
```
```
<script src="../bower_components/angular-cookies/angular-cookies.js"></script>
```
```
<script src="../bower_components/angular-dynamic-locale/src/tmhDynamicLocale.js"></script>
```
```
<script src="../bower_components/formio-translate/src/formio-translate.js"></script> 
```

**Include directive to load supported language list in dropdown on a form page:**
```
 <div ng-translate-language-select></div>
```

**Add "app/resources/lang/" with language files eg. en.json, ar.json etc**
```
{
    "Email": "Email",
    "Password": "Password",
    "Submit": "Submit"
}
```