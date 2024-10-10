const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

// Compilação do SASS
function compilaSass() {
    return gulp.src('./source/sass/**/*.scss') // Ajuste o caminho para seus arquivos SASS
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./build/css')); // Saída para o diretório build/css
}

// Compressão de imagens
function comprimeImagens() {
    return gulp.src('./source/images/*') // Ajuste o caminho para suas imagens
        .pipe(imagemin())
        .pipe(gulp.dest('./build/images')); // Saída para o diretório build/images
}

// Compressão de código JavaScript
function comprimeJs() {
    return gulp.src('./source/js/*.js') // Ajuste o caminho para seus arquivos JS
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' })) // Renomeia os arquivos para .min.js
        .pipe(gulp.dest('./build/js')); // Saída para o diretório build/js
}

// Tarefa para compilar SASS, comprimir imagens e JS
const build = gulp.series(compilaSass, comprimeImagens, comprimeJs);

// Exporta as tarefas
exports.build = build;
exports.images = comprimeImagens;
exports.sass = compilaSass;
exports.js = comprimeJs;
