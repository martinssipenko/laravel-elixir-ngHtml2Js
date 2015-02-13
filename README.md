## Laravel Elixir ngHtml2Js

![Version](https://img.shields.io/npm/v/laravel-elixir-ng-html2js.svg?style=flat-square)
![Dependencies](https://img.shields.io/david/msipenko/laravel-elixir-ng-html2js.svg?style=flat-square)

Simple extension to *laravel elixir* which generates AngularJS modules, which pre-load your HTML code into the $templateCache.
This way AngularJS doesn't need to request the actual HTML files anymore.

## Install

```
npm install --save-dev laravel-elixir-ng-html2js
```

## Usage

### Example *Gulpfile.js*:

```javascript
var elixir = require('laravel-elixir');

require('laravel-elixir-ng-html2js');

elixir(function(mix) {
    mix.ngHtml2Js();
});
```

- First argument is the `src` that is used to look for your partials, default: `resources/assets/partials/**/*.html`
- Second argument is the location where you output `partials.js` should be palces, default: `resources/assets/js/partials.js`
- Third argument is config options object of [ngHtml2Js](https://github.com/marklagendijk/gulp-ng-html2js#nghtml2jsoptions), default:
`{moduleName: 'partialsModule', prefix : ''}`

### Example Angular Usage:

```javascript
require('angular');
require('angular-route');
require('./partials');

var app = angular.module('app', [
    'ngRoute',
    'partialsModule'
]);

app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
          templateUrl: 'index.html',
          controller: 'mainController'
        });
});
```

## Changelog

__0.2.1))
- Added `htm` as possible file extension for partials
- Fixed bug with missing `*` that caused issue where no partials were being found

__0.2.0__
- Initial release
