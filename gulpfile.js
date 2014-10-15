var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');
var copy = require('gulp-copy');
var del = require('del');

gulp.task('clean', function () {
	del(['dist']);
});

gulp.task('copy:lib', function () {
	return gulp.src(['./lib/**/*'])
		.pipe(copy('dist/', {
			prefix: 1 //ignore the 'lib' in path
		}));
});

gulp.task('copy:html', function () {
	return gulp.src('index.html')
		.pipe(copy('dist'));
});

gulp.task('build', ['clean', 'copy:lib', 'copy:html']);

gulp.task('deploy', ['build'], function () {
	return gulp.src(['index.html', './lib/**/*', './dist/**/*'])
		.pipe(ghPages());
});
