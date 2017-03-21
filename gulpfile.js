const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const run = require('gulp-run');

const reload = browserSync.reload;

gulp.task('browser-sync', () => {
  browserSync.init({
    server: {
      baseDir: './src',
      index: 'index.html'
    },
    port: process.env.PORT || 7000,
    ui: false,
    ghostMode: false,
    notify: false
  });
});

gulp.task('watch', ['browser-sync'], () => {
  gulp.watch(['src/*.html', 'src/css/*.css', 'src/js/*.js'], reload);
});

gulp.task('default', [
  'browser-sync', 'watch'
]);

gulp.task('browserify', () =>
  browserify('./jasmine/spec/invertedindex.test.js')
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./jasmine/testfiles'))
);

gulp.task('test', ['browserify'], () => {
  return run('node node_modules/karma/bin/karma start karma.conf.js --single-run').exec();
});
