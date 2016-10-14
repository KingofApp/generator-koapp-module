'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
  prompting: function () {
    this.log(yosay(
      'Welcome to ' + chalk.red('King of App ') + chalk.blue('module Generator') + '!'
    ));

    return this.prompt([{
      type: 'input',
      name: 'moduleName',
      message: 'Module name',
      required: true
    }, {
      type: 'input',
      name: 'userName',
      message: 'Author\'s name'
    }, {
      type: 'input',
      name: 'homepage',
      message: 'Author\'s homepage'
    }, {
      type: 'input',
      name: 'spanishDescription',
      message: 'Spanish description'
    }, {
      type: 'input',
      name: 'englishDescription',
      message: 'English description'
    }, {
      type: 'inpt',
      name: 'license',
      message: 'License',
      default: 'MIT'
    }, {
      type: 'input',
      name: 'categories',
      message: 'Categories (comma to split)'
    }, {
      type: 'input',
      name: 'price',
      message: 'Price'
    }]).then(function (answers) {
      this.log('Thanks! The process will start now...');

      this.homepage = answers.homepage;
      this.moduleName = fixModuleName(answers.moduleName, '-');
      this.varModuleName = camelize(answers.moduleName);
      this.userName = answers.userName;
      this.spanishDescription = answers.spanishDescription;
      this.englishDescription = answers.englishDescription;
      this.license = answers.license;
      this.categories = fixModuleCategories(answers.categories);
      this.price = answers.price;
    }.bind(this));
  },

  writing: function () {
    var _self = this;
    var moduleInput = {};

    var folder = '/' + this.moduleName;

    this.destinationRoot(this.destinationPath() + folder);

    var keys = [
      'moduleName',
      'homepage',
      'varModuleName',
      'userName',
      'spanishDescription',
      'englishDescription',
      'license',
      'categories',
      'price'
    ];

    keys.forEach(function (key) {
      moduleInput[key] = _self[key];
    });

    var filesToCopy = {
      templated: [
        'index.html',
        'style.html',
        'controller.js',
        'README.md',
        'config.json',
        'bower.json',
        'package.json',
        'locale/en_US.json',
        'locale/es_ES.json',
        'tests/e2e/spec.js',
        'gulp-tasks/integration.js',
        'docs/jsdoc.md',
        'docs/en_US.md',
        'docs/es_ES.md'
      ], direct: [
        'Gulpfile.js',
        'tests/protractor.conf.js',
        'gulp-tasks/distribution.js',
        'gulp-tasks/documentation.js',
        'gulp-tasks/lint.js',
        'gulp-tasks/testing.js',
        'docs/jsdoc.json'
      ]
    };

    directCopy(_self, moduleInput, filesToCopy.templated, true);
    directCopy(_self, moduleInput, filesToCopy.direct, false);

    this.fs.copy(
      this.templatePath('_bowerrc'),
      this.destinationPath('.bowerrc')
    );

    this.directory(
      this.templatePath('images'),
      this.destinationPath('images')
    );
  },

  install: function () {
    this.installDependencies({bower: false});
  }
});

/** Function direct copy files
* @param {object} this
* @param {object} input
* @param {array} relative location - files to copy
* @param {boolean} [false] internally it uses copy or copyTpl
*/
function directCopy(self, input, files, templated) {
  templated = templated || false;

  for (var i = files.length; i--;) {
    if (templated) {
      self.fs.copyTpl(
        self.templatePath(files[i]),
        self.destinationPath(files[i]),
        input
      );
    } else {
      self.fs.copy(
        self.templatePath(files[i]),
        self.destinationPath(files[i]),
        input
      );
    }
  }
}

/** Function that validate the module name
* @returns {String}
*/
function fixModuleName(name, ReplaceSymbol) {
  name = name.toLowerCase().trim();
  return name.replace(/ /g, ReplaceSymbol);
}

/** Function that validate the Categories
* @returns {String}
*/
function fixModuleCategories(list) {
  list = list.replace(/ /g, '').toLowerCase().trim();
  var arrayCategories = list.split(',');
  return JSON.stringify(arrayCategories);
}

/** Function that converts a string into camel case using javascript regex
 * @author Christian C. Salvadó
 * @see http://stackoverflow.com/questions/2970525/converting-any-string-into-camel-case
 * @param {string} user's input
 * @returns {string} camelCase
*/
function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (letter, index) {
    return index === 0 ? letter.toLowerCase() : letter.toUpperCase();
  }).replace(/\s+/g, '');
}
