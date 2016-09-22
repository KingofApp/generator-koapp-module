'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-koa-module:app', function () {
  this.timeout(15000);

  var anwsers = {
    moduleName: '   new module',
    userName: 'Yo Mismo',
    spanishDescription: 'Mi nuevo Módulo',
    englishDescription: 'My new Module',
    license: 'MIT',
    homepage: 'http://kingofapp.com',
    categories: '   modules,DOCumentation, demo',
    price: '0'
  };

  var anwsersExpected = {
    moduleName: 'new-module',
    varModuleName: 'newModule',
    homepage: 'http://kingofapp.com',
    userName: 'Yo Mismo',
    spanishDescription: 'Mi nuevo Módulo',
    englishDescription: 'My new Module',
    license: 'MIT',
    categories: ['modules', 'documentation', 'demo'],
    price: 0
  };

  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts(anwsers)
      .toPromise();
  });

  it('creates file .bowerrc', function () {
    assert.file([
      '.bowerrc'
    ]);
  });

  it('creates file bower.json', function () {
    assert.file([
      'bower.json'
    ]);
  });

  it('checks content bower.json', function () {
    assert.jsonFileContent('bower.json', {
      name: anwsersExpected.moduleName,
      description: anwsersExpected.englishDescription,
      authors: anwsersExpected.userName,
      license: anwsersExpected.license,
      homepage: anwsersExpected.homepage
    });
  });

  it('creates file config.json', function () {
    assert.file([
      'config.json'
    ]);
  });

  it('checks content config.json', function () {
    assert.jsonFileContent('config.json', {
      name: anwsersExpected.moduleName,
      identifier: anwsersExpected.moduleName,
      descriptionShort: {
        'es-ES': anwsersExpected.spanishDescription,
        'en-US': anwsersExpected.englishDescription
      },
      author: anwsersExpected.userName,
      category: anwsersExpected.categories,
      price: anwsersExpected.price,
      view: 'modules/' + anwsersExpected.moduleName + '/index.html',
      files: [
        'modules/' + anwsersExpected.moduleName + '/controller.js', 'modules/' + anwsersExpected.moduleName + '/style.html'
      ],
      images: {
        list: 'modules/' + anwsersExpected.moduleName + '/images/list.png',
        screenshots: [
          'modules/' + anwsersExpected.moduleName + '/images/screenshot01.png'
        ],
        popover: 'modules/' + anwsersExpected.moduleName + '/images/popover.png',
        banner: 'modules/' + anwsersExpected.moduleName + '/images/banner.png',
        logo: 'modules/' + anwsersExpected.moduleName + '/images/logo.png'
      }
    });
  });

  it('creates file controller.js', function () {
    assert.file([
      'controller.js'
    ]);
  });

  it('creates file index.html', function () {
    assert.file([
      'index.html'
    ]);
  });

  it('creates file README.md', function () {
    assert.file([
      'README.md'
    ]);
  });

  it('creates file style.html', function () {
    assert.file([
      'style.html'
    ]);
  });

  it('creates file package.json', function () {
    assert.file([
      'package.json'
    ]);
  });

  it('checks content package.json', function () {
    assert.jsonFileContent('package.json', {
      name: anwsersExpected.moduleName,
      description: anwsersExpected.englishDescription,
      author: anwsersExpected.userName,
      license: anwsersExpected.license
    });
  });

  it('creates file Gulpfile.js', function () {
    assert.file([
      'Gulpfile.js'
    ]);
  });

  it('creates file tests/protractor.conf.js', function () {
    assert.file([
      'tests/protractor.conf.js'
    ]);
  });

  it('creates file tests/e2e/spec.js', function () {
    assert.file([
      'tests/e2e/spec.js'
    ]);
  });

  it('creates file locale/en_US.json', function () {
    assert.file([
      'locale/en_US.json'
    ]);
  });

  it('creates file locale/es_ES.json', function () {
    assert.file([
      'locale/es_ES.json'
    ]);
  });

  it('creates file images/banner.png', function () {
    assert.file([
      'images/banner.png'
    ]);
  });

  it('creates file images/list.png', function () {
    assert.file([
      'images/list.png'
    ]);
  });

  it('creates file images/logo.png', function () {
    assert.file([
      'images/logo.png'
    ]);
  });

  it('creates file images/popover.png', function () {
    assert.file([
      'images/popover.png'
    ]);
  });

  it('creates file images/screenshot01.png', function () {
    assert.file([
      'images/screenshot01.png'
    ]);
  });
});
