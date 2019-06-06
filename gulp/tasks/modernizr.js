var gulp = require('gulp'),
modernizr = require('gulp-modernizr');
//this package let us build our customized copy of modernizr, that only include the code to test for the features that we need to test for
//so the modernizr file will be as small as possible, so the website will load as quickly as possible.


gulp.task('modernizr', function(){
  return gulp.src(['./app/assets/styles/**/*.css', './app/assets/scripts/**/*.js'])  //look into all .css and .js files
  .pipe(modernizr({
    'options': [
      'setClasses'
    ]
  }))
  .pipe(gulp.dest('./app/temp/scripts/')); //custom built generated modernizer file (modernizer.js).
});
