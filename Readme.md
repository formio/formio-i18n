angular-translate bower component to help to enable multilingual feature to the formio-forms.
--------------------------------------------------------------------------------------------------------------------
**app.js**

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

**Include directive to load supported language list in dropdown:**
```
 <div ng-translate-language-select></div>
```

**Add "app/resources/lang/" with language files eg. en.json, ar.json etc**
```
{
    "views.myapp.Splendid!": "Behatareen!",
    "directives.language-select.Language": "Language",
    "Email": "Email",
    "Password": "Password",
    "Submit": "Submit"
}
```