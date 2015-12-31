var gulp = require('gulp');
var frontMatter = require('gulp-front-matter');
var markdown = require('gulp-markdown');
var layout = require('gulp-layout');

gulp.task('default', function() {
    return gulp.src('./docs/**/*.md')
            .pipe(frontMatter())
            .pipe(markdown())
            .pipe(layout(function(file) {
                return file.frontMatter;
            }))
            .pipe(gulp.dest('./public/docs'));
});