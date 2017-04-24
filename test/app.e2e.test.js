'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-koa-module:app', function () {
  this.timeout(20000);
  var moduleName = '   new module';
  var answers = {
    userName: 'Yo Mismo',
    spanishDescription: 'Mi nuevo Módulo',
    englishDescription: 'My new Module',
    license: 'MIT',
    homepage: 'http://kingofapp.com',
    categories: '   modules,DOCumentation, demo',
    price: '0'
  };

  var answersExpected = {
    pluginName: 'new-module',
    varModuleName: 'newModule',
    homepage: 'http://kingofapp.com',
    userName: 'Yo Mismo',
    spanishDescription: 'Mi nuevo Módulo',
    englishDescription: 'My new Module',
    license: 'MIT',
    categories: ['modules', 'documentation', 'demo'],
    price: 0
  };

  before(function (done) {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withArguments([moduleName])
      .withOptions(answers)
      .on('end', done);
  });

  [
    'config.json',
    'bower.json',
    '.bowerrc',
    'controller.js',
    'index.html',
    'README.md',
    'style.html',
    'package.json',
    'Gulpfile.js',
    'gulp-tasks/distribution.js',
    'gulp-tasks/documentation.js',
    'gulp-tasks/lint.js',
    'gulp-tasks/testing.js',
    'gulp-tasks/integration.js',
    'tests/protractor.conf.js',
    'tests/e2e/spec.js',
    'locale/en_US.json',
    'locale/es_ES.json',
    'images/banner.png',
    'images/list.png',
    'images/logo.png',
    'images/popover.png',
    'images/screenshot01.png',
    'docs/jsdoc.json',
    'docs/jsdoc.md',
    'docs/en_US.md',
    'docs/es_ES.md'
  ].forEach(function(key) {
    it('creates file ' + key, function () {
      assert.file([
        key
      ]);
    });
  });

  it('checks content bower.json', function () {
    assert.jsonFileContent('bower.json', {
      name: answersExpected.pluginName,
      description: answersExpected.englishDescription,
      authors: answersExpected.userName,
      license: answersExpected.license,
      homepage: answersExpected.homepage
    });
  });

  it('checks content package.json', function () {
    assert.jsonFileContent('package.json', {
      name: 'koapp-module-' + answersExpected.pluginName,
      description: answersExpected.englishDescription,
      author: answersExpected.userName,
      license: answersExpected.license
    });
  });


  it('checks content config.json', function () {
    assert.jsonFileContent('config.json', {
      name: answersExpected.pluginName,
      identifier: answersExpected.pluginName,
      descriptionShort: {
        'es-ES': answersExpected.spanishDescription,
        'en-US': answersExpected.englishDescription
      },
      author: answersExpected.userName,
      category: answersExpected.categories,
      price: answersExpected.price,
      view: 'modules/' + answersExpected.pluginName + '/index.html',
      files: [
        'modules/' + answersExpected.pluginName + '/controller.js', 'modules/' + answersExpected.pluginName + '/style.html'
      ],
      images: {
        list: 'modules/' + answersExpected.pluginName + '/images/list.png',
        screenshots: [
          'modules/' + answersExpected.pluginName + '/images/screenshot01.png'
        ],
        popover: 'modules/' + answersExpected.pluginName + '/images/popover.png',
        banner: 'modules/' + answersExpected.pluginName + '/images/banner.png',
        logo: 'modules/' + answersExpected.pluginName + '/images/logo.png'
      }
    });
  });

});
