/* quiz-app */

//require dependencies
const gulp         = require('gulp');
const concat       = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const uglify       = require('gulp-uglify');
const babel        = require('gulp-babel');
const rename       = require("gulp-rename");


//define paths
const pathCSS = { 
  sourceCSS: [
             'src/css/stylesheet.css',
             'src/css/quiz-style.css'
             ],
  destCSS: 'dist/css'
};
const pathJS = {
  sourceJS: 'src/js/logic.js',
  destJS: 'dist/js'
};

//concatenate css files and add vendor prefixed properities in css rules
function css() {
  return gulp
    .src(pathCSS.sourceCSS)
    .pipe(concat('stylesheet-quiz-app.css'))
    .pipe(autoprefixer({
      browsers: ['last 2 versions']  // config object
    }))
    .pipe(gulp.dest(pathCSS.destCSS));
}

//transpile, minify and rename js files
function js() {
  return gulp
    .src(pathJS.sourceJS)     
    .pipe(babel({
      presets: ['@babel/env']  // babel config object
    }))
    .pipe(uglify())
    .pipe(rename('quiz-app.min.js'))
    .pipe(gulp.dest(pathJS.destJS));
}

//export functions as tasks
exports.css = css;
exports.js = js;
