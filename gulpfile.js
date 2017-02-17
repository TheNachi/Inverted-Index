const gulp = require('gulp');
const browserSync = require('browser-sync').create;

gulp.task('browser-sync', () => {
  browserSync.init({
    server: {
      baseDir: './src'
    },
    port: 0,
    ui: {
      port
    }
  });
});

gulp.task('default', [browserSync.reload]);


// Default task
gulp.task('watch', () => {
  gulp.watch(['src/*.html', 'src/css/*.css','src/js/*.js'])
  .on('change', browserSync.reload);
});

