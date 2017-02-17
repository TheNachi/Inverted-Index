const gulp = require('gulp');
const browserSync = require('browser-sync').create;

gulp.task('serve', () => {
  browserSync({
    server: {
      baseDir: './src'
    }
  });
});

gulp.task('watch-html', browserSync.reload);


// Default task
gulp.task('watch', ['serve', 'watch-html'], () => {
  gulp.watch('./src/*.html', ['watch-html']);
  gulp.watch('./src/css/*.css', ['watch-html']);
  gulp.watch('./src/js/*.js', ['watch-html']);
});