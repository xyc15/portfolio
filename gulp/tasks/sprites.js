//the aim of this file is to tell gulp to take all of the individual icon files and put them together into one file.
var gulp = require('gulp'),
svgSprite = require('gulp-svg-sprite'),
rename = require('gulp-rename'),//to rename the sprite.css file
del = require('del'),//delete package
svg2png = require('gulp-svg2png');
var config = {
  shape: {
    spacing: {
      padding: 1
    }
  },
  mode: {
    css: {
      variables: {
        replaceSvgWithPng: function() {
          return function(sprite, render){
            return render(sprite).split('.svg').join('.png');  //replace .svg with .png
          }
        }
      },
      sprite: 'sprite.svg', //change the svg file name (remove .css from the file name)
      render:{
        css: {
          template: './gulp/templates/sprite.css'
        }
      }
    }
  }
};
gulp.task('beginClean', function(){//to delete the old combined .svg file, when an updated one is created
  return del(['./app/temp/sprite', './app/assets/images/sprites']);
});

gulp.task('createSprite', ['beginClean'],function(){
  //we need to add return every time we use gulp.src()
  /*
    \**\ This pattern is often used in Copy Task for recursive folder tree traversal.
    Basically it means that all files with extension svg would be processed from the all subdirectories of icons path.
  */
  return gulp.src('./app/assets/images/icons/**/*.svg')
  .pipe(svgSprite(config)) //create a "sprite.css-d675eadb.svg" file to combine all the icons
  .pipe(gulp.dest('./app/temp/sprite/'));//save the file created above to ./app/temp/sprite/css/svg/
});

gulp.task('createPngCopy', ['createSprite'],function(){
  return gulp.src('./app/temp/sprite/css/*.svg')
  .pipe(svg2png())
  .pipe(gulp.dest('./app/temp/sprite/css'));
});
/*copy the combined css image to a regular image folder, we also need to change the backgroun-image url in templates/sprite.css file*/
gulp.task('copySpriteGraphic', ['createPngCopy'],function(){
  return gulp.src('./app/temp/sprite/css/**/*.{svg,png}')
  .pipe(gulp.dest('./app/assets/images/sprites'));
});

gulp.task('copySpriteCSS', ['createSprite'],function(){ //add [] dependency tasks, which has to be finished before this task.
  return gulp.src('./app/temp/sprite/css/*.css')
  .pipe(rename('_sprite.css'))
  .pipe(gulp.dest('./app/assets/styles/modules'));
});

gulp.task('endClean', ['copySpriteGraphic', 'copySpriteCSS'],function(){
  return del('./app/temp/sprite');//after copy generated .svg file and .css file to proper directory, we do not need this folder any more.
});

gulp.task('icons', ['beginClean', 'createSprite', 'createPngCopy', 'copySpriteGraphic', 'copySpriteCSS', 'endClean']); //this task will run all tasks inside the "[]"
