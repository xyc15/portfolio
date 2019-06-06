var gulp = require('gulp'),
imagemin = require('gulp-imagemin'),
del = require('del'),
usemin = require('gulp-usemin'),
rev = require('gulp-rev'),
cssnano = require('gulp-cssnano'),
uglify = require('gulp-uglify'),
browserSync 	= require('browser-sync').create();

gulp.task('previewDist', function(){
  browserSync.init({
    notify: false,
    server:{
      baseDir: "docs"
    }
  });
});

//deleting the "dist" folder so we begin each build with a clean slate
gulp.task('deleteDistFolder', ['icons'],function(){
  return del('./docs');//using return to let gulp know when this task will complete
});

gulp.task('copyGeneralFiles', ['deleteDistFolder'], function(){
    var pathsToCopy = [
      './app/**/*',
      '!./app/index.html',
      '!./app/assets/images/**',
      '!./app/assets/styles/**',
      '!./app/assets/scripts/**',
      '!./app/temp',
      '!./app/temp/**'//any content in the temp folder
    ];

    return gulp.src(pathsToCopy)
    .pipe(gulp.dest('./docs'));
});

gulp.task('optimizeImages', ['deleteDistFolder'],function(){
  return gulp.src(['./app/assets/images/**/*', '!./app/assets/images/icons', '!./app/assets/images/icons/**/*'])//the second file path is used to exclude files in the icons folder /files in icons folder (the third path)
  .pipe(imagemin({//optimized or compress the images
    progressive: true, //optimize jpg images even further.
    interlaced: true, //help with any gif images that we have
    multipass: true //this help with svg files
  }))
  .pipe(gulp.dest('./docs/assets/images'));//to
});

gulp.task('useminTrigger', ['deleteDistFolder'],function(){
  gulp.start('usemin');
});

gulp.task('usemin', ['styles', 'scripts'], function(){
  return gulp.src('./app/index.html')
  .pipe(usemin({
    css: [function(){return rev()}, function(){return cssnano()}],//using return to let gulp know when these functions are completed.
    js: [function(){return rev()}, function(){return uglify()}]
  }))
  .pipe(gulp.dest('./docs'));
});
gulp.task('build', ['deleteDistFolder', 'copyGeneralFiles', 'optimizeImages', 'useminTrigger']);
