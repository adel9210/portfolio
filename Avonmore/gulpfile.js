var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function () {
    // return gulp.src(['src/scss/Blog/blog.scss'])
    return gulp.src(['src/scss/Home/base.scss'])
    // return gulp.src(['src/scss/SingleBlog/single_blog.scss'])
    // return gulp.src(['src/scss/portfolio/portfolio.scss'])
    // return gulp.src(['src/scss/SinglePost/singlepost.scss'])
    // return gulp.src(['src/scss/About/about.scss'])
    // return gulp.src(['src/scss/ShopGrid/shop_grid.scss'])
    // return gulp.src(['src/scss/ShopList/shoplist.scss'])
    // return gulp.src(['src/scss/ShopItem/shopitem.scss'])
    .pipe(sass())
    .pipe(gulp.dest('dest/css/'));
});

gulp.task("watch", function(){
    // return gulp.watch('src/partial/base.scss',['sass'])
    return gulp.watch('src/scss/**/*.scss',['sass'])
})

gulp.task("default", ['sass', 'watch'])
