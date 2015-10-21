var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    del = require('del'),
    autoprefixer = require('gulp-autoprefixer');

// Config
var config = {
    theme_dir: 'theme',
    theme: 'default', // Site theme name as declared in config.php
    public: 'html' // Public folder
}

    /**
     * Style Tasks
     *
     * @output: assets/css/style.css
     *
     * Sass stylesheets are compiled,
     * then run through Plumber to catch
     * any errors, they are then placed
     * in the assets folder in your theme.
     *
     * Autoprefixer then checks and adds
     * required prefixes before minifying the
     * CSS and compiling it to your theme
     * assets folder.
     *
     * Once it's all done, Gulp will pop a
     * notification on your screen.
     */
    gulp.task('styles', function() {
        return sass('src/css/style.scss', { style: 'expanded' })
        .pipe(plumber())
        .pipe(gulp.dest(''+ config.public +'/'+ config.theme_dir +'/'+ config.theme +'/assets/css'))
        .pipe(autoprefixer({cascade: false}))
        .pipe(minifycss())
        .pipe(gulp.dest(''+ config.public +'/'+ config.theme_dir +'/'+ config.theme +'/assets/css'))
        .pipe(notify({ message: 'Styles task complete' }));
    });

    /**
     * Javascript Tasks
     *
     * @output: assets/js/main.js
     *
     * Javascript files from src/js and src/js/vendor
     * are put in to a single file. After that Uglify
     * minifies and Plumber checks for errors before
     * putting the final javascript file in to
     * the assets folder of your theme.
     *
     */
    gulp.task('scripts', function() {
        return gulp.src(['src/js/*.js', 'src/js/vendor/*.js'], { base: '/src' })
        .pipe(concat('main.js'))
        .pipe(gulp.dest(''+ config.public +'/'+ config.theme_dir +'/'+ config.theme +'/assets/js'))
        .pipe(uglify())
        .pipe(plumber())
        .pipe(gulp.dest(''+ config.public +'/'+ config.theme_dir +'/'+ config.theme +'/assets/js'))
        .pipe(notify({ message: 'Scripts task complete' }));
    });

    /**
     * Housekeeping
     *
     * This little task helps keep
     * your assets folder clean and
     * tidy. (Removing old files etc.)
     */
    gulp.task('clean', function(cb) {
        del([''+ config.public +'/'+ config.theme_dir +'/'+ config.theme +'/assets/css'], cb)
    });

    /**
     * Default task
     *
     * This task runs styles, scripts and images.
     */
    gulp.task('default', ['clean'], function() {
        gulp.start('styles', 'scripts');
    });

    /**
     * Watch Task
     *
     * When running, Watch will watch your
     * files for changes and run the appropriate
     * task each time.
     */
    gulp.task('watch', function() {

        // Watch .scss files
        gulp.watch(['src/css/*.scss', 'src/css/**/*.scss', 'src/css/**/**/*.scss'], ['styles']);

        // Watch .js files
        gulp.watch('src/js/*.js', ['scripts']);

    });
