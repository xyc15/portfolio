var gulp  				= require("gulp"),
    watch 				= require("gulp-watch"),
    browserSync 	= require('browser-sync').create();

gulp.task('watch', function(){
	browserSync.init({
		notify: false,
		server:{
			baseDir: "app"
		}
	});

	watch('./app/index.html', function(){
		// gulp.start('html');
		browserSync.reload();
	});

	watch('app/assets/styles/**/*.css', function(){
		// gulp.start('styles');
		gulp.start('cssInject');
	});

  watch('./app/assets/scripts/**/*.js', function(){
    gulp.start('scriptsRefresh');
  });
});


//when it comes to css, browserSync can actually inject our latest CSS into the page without even forcing a refresh
//This task take the contents of compiled CSS file, and hand that over to browser sync, so it can inject those styles into the page on the fly (without refresh the browser).
gulp.task('cssInject',['styles'] ,function(){ //"styles" task is an dependency of "cssInject" task, i.e. the cssInject task won't begin until the styles task complete
//gulp.src is an async function, so we need to make sure it begines with a return, so we can know when the function will finish
	return gulp.src('./app/temp/styles/styles.css')
		.pipe(browserSync.stream()); //browserSync.stream method will make whatever we are piping into it available in the browser
});

gulp.task('scriptsRefresh', ['scripts'],function(){
  browserSync.reload();
});
