var gulp = require('gulp'),
    karma = require('karma').server,
    protractor = require("gulp-protractor").protractor;

gulp.task('e2e', function(done) {
  var args = ['--baseUrl', 'http://127.0.0.1:8080'];
  gulp.src(["./tests/e2e/*.js"])
    .pipe(protractor({
      configFile: "tests/protractor.conf.js",
      args: args
    }))
    .on('error', function(e) { throw e; });
});

gulp.task('default', ['connect']);