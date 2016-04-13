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
  'languages': [
    {
      'locales': 'ru', 
      'name': 'Русский', 
      'rtl': false
    },
    {
      'locales': 'en', 
      'name': 'English', 
      'rtl': false
    },
    {
      'locales': 'ar', 
      'name': 'Arabian', 
      'rtl': true
    }
 ],
 'preferredLocale': 'en'
})
```

**index.html**

Add:
```
<script src="../bower_components/formio-translate/dist/ng-formio-translate-full.js"></script>
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

** To set an alignment (Right or Left) of a text for some special languages like Arabian.. etc, please add the following attribute in a div**

```
<div dir={{languageRtl}}>
```