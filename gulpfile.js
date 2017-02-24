// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    jshint = require('gulp-jshint'),
    notify = require('gulp-notify'), //通知
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload,
    spritesmith = require('gulp.spritesmith');

var jsHintOpt = {
    undef: true, //必须声明
    unused: true, //必须使用
    eqeqeq: true, //必须使用===
    devel: true //定义用于调试的全局变量：console,alert 
};

// 设置路径
var JS_SRC = "./js/*.js",
    JS_DEST = "./js/",
    SASS_SRC = "css/box.scss",
    CSS_SRC = "css/*.scss",
    CSS_DEST = "css",
    SPRITE_SRC = "images/*.png",
    SPRITE_DEST = "css",
    HTML_DEST = "./*.html",
    SERVER_INDEX = "box.html";

// 静态服务器 + 监听 js/scss/html 文件
gulp.task('serve', ['sass']['js'], function() {
    browserSync.init({
        server: {
            baseDir: "./",
            index: SERVER_INDEX
        }
    });
    gulp.watch(JS_SRC, ['js']);
    gulp.watch(CSS_SRC, ['sass']);
    gulp.watch(HTML_DEST).on('change', reload); // 触发change事件，执行回调
});

// scss编译后的css将注入到浏览器里实现更新
gulp.task('sass', function() {
    return sass(SASS_SRC)
        .pipe(autoprefixer({
            browsers: ['last 40 versions', 'Android >= 4.0', 'Explorer>=6'],
            remove: true,
        })).pipe(gulp.dest(CSS_DEST))
        .pipe(reload({ stream: true }));
});

//雪碧图
gulp.task('sprite', function() {
    var spriteData = gulp.src(SPRITE_SRC).pipe(spritesmith({
        imgName: 'sprite.png',
        cssName: 'sprite.scss',
        cssFormat: 'scss'
    }));
    return spriteData.pipe(gulp.dest(SPRITE_DEST));
});

// js
gulp.task('js', function() {
    return gulp.src(JS_SRC)
        .pipe(jshint(jsHintOpt))
        .pipe(jshint.reporter('default'))
        .pipe(gulp.dest(JS_DEST))
        .pipe(notify({ message: 'Scripts task complete' }))
        .pipe(reload({ stream: true }));
});

gulp.task('default', ['sprite', 'sass', 'js', 'serve']);
