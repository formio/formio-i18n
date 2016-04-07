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