var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');
var copy = require('gulp-copy');
var del = require('del');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var csso = require('gulp-csso');

gulp.task('clean', function () {
	del(['dist']);
});

gulp.task('copy:lib', function () {
	return gulp.src(['./lib/**/*'])
		.pipe(copy('dist/'));
});

gulp.task('copy:html', function () {
	return gulp.src('index.html')
		.pipe(copy('dist'));
});

gulp.task('scss', function () {
	return gulp.src('scss/**/*.scss')
		.pipe(sass())
		.pipe(prefix())
		..pipe(csso())
		.pipe(gulp.dest('dist/style'));
});


gulp.task('build', ['clean', 'copy:lib', 'copy:html']);

gulp.task('deploy', ['build'], function () {
	return gulp.src(['./dist/**/*'])
		.pipe(ghPages());
});

gulp.task('watch', ['build'], function () {
	gulp.watch(['index.html'], ['copy:html']);
});
