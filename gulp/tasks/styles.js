var gulp  				= require("gulp"),
    postcss 			= require("gulp-postcss"),
    cssvars				= require('postcss-simple-vars'),
    nested 				= require('postcss-nested'),
    cssImport 		= require('postcss-import'),
    mixins        =require('postcss-mixins'),
    hexrgba       = require('postcss-hexrgba'),
    autoprefixer	= require("autoprefixer");


gulp.task("styles", function(){
  return gulp.src('./app/assets/styles/styles.css')
    .pipe(postcss([cssImport, mixins, cssvars, nested, hexrgba, autoprefixer])) // remember to put cssImport in the beginning
    .on('error', function(errorInfo){
      console.log(errorInfo.toString());
      this.emit('end'); //tell watch this task has come to end
    })
    .pipe(gulp.dest('./app/temp/styles'));
});
