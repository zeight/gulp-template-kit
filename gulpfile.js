// sudo npm install gulp-sass gulp-concat del --save-dev

var gulp = require('gulp');
var connect = require('gulp-connect');
var chmod = require('gulp-chmod');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var minifycss = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');
var notify = require('gulp-notify');
var rename = require('gulp-rename');
var gzip = require('gulp-gzip');
var livereload = require('gulp-livereload');
var open = require('gulp-open');
var uglify = require('gulp-uglify');

var gzip_options = {
    threshold: '1kb',
    gzipOptions: {
        level: 9
    }
};

/* Server task */
gulp.task('webserver', function(){
    connect.server({
      port: 8002,
      livereload: true
    });
});

/* Apre il browser*/
gulp.task('launch', function(){
  gulp.src(__filename)
  .pipe(open({uri: 'http://localhost:8002'}));
});


/* Concat scripts */
gulp.task('scripts', function() {
  return gulp.src('./scripts/*.js')
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./assets/js/'))
    .pipe(livereload())
    //.pipe(connect.reload())
    .pipe(notify({ message: 'Scripts task complete' }));
});

/* Compile Our Sass */
gulp.task('sass', function() {
    return gulp.src('scss/*.scss')
        .pipe(sass({ style: 'compressed' }))
        .pipe(gulp.dest('assets/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('assets/css'))
        .pipe(gzip(gzip_options))
        .pipe(gulp.dest('assets/css'))
        .pipe(livereload())
        //.pipe(connect.reload())
        .pipe(notify({ message: 'Sass task complete' }));
});


/* Minify images */
gulp.task('images', function() {
  return gulp.src('images/**/*')
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest('assets/img'))
    .pipe(livereload())
    .pipe(notify({ message: 'Images task complete' }));
});

/* Reset permissions on img folder */
gulp.task('permissions', function(){
    return gulp.src('assets/img')
      .pipe(chmod(755));
});

/* Watch Files For Changes */
gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('scss/*.scss', ['sass']);
    gulp.watch('scripts/*.js', ['scripts']);
    gulp.watch('images/*', ['images']);
    gulp.watch('*.html').on('change', livereload.changed);
    /* Trigger a live reload on any Django template changes */
    //gulp.watch('**/templates/*').on('change', livereload.changed);

});

gulp.task('default', ['scripts', 'sass', 'images', 'permissions', 'webserver', 'launch', 'watch']);
