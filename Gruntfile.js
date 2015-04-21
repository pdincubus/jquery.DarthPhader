/*global module:false*/
module.exports = function(grunt) {

/*----------------------------------------------------
*      Project config
*----------------------------------------------------*/
    grunt.initConfig({
        /*----------------------------------------------------
        *      Metadata
        *----------------------------------------------------*/
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*!\n * <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
                ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;\n' +
                ' * <%= pkg.author.homepage %>\n' +
                ' * Twitter: <%= pkg.author.twitter %>\n' +
                ' */',

        /*----------------------------------------------------
        *      Styles
        *----------------------------------------------------*/

        /*----------------------------------------------------
        *      SASS compiler
        *----------------------------------------------------*/

        sass: {
            dist: {
                files: {
                    'src/css/style.css': 'src/scss/style.scss'
                }
            }
        },

        /*----------------------------------------------------
        *      Lint SCSS
        *----------------------------------------------------*/

        scsslint: {
            allFiles: [
                'src/scss/*.scss',
            ],
            options: {
                config: 'scss-lint-config.yml',
                reporterOutput: 'scss-lint-report.xml'
            },
        },

        /*----------------------------------------------------
        *      Minify CSS files
        *----------------------------------------------------*/

        cssmin: {
            options: {
                stripBanners: true
            },

            dist: {
                src: 'src/css/style.css',
                dest: 'dist/css/style.min.css'
            }
        },



        /*----------------------------------------------------
        *      Javascripts
        *----------------------------------------------------*/

        /*----------------------------------------------------
        *      JSHint
        *----------------------------------------------------*/

        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                eqnull: true,
                browser: true,
                globals: {
                    jQuery: true
                }
            }
        },

        /*----------------------------------------------------
        *      Concatenate
        *----------------------------------------------------*/
        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: true
            },

            main: {
                src: ['src/js/jquery-2.1.1.min.js',
	            'src/js/DarthPhader.js',
                'src/js/DarthPhader2.js',
                'src/js/main.js'],
                dest: 'src/js/script.js'
            }
        },

        /*----------------------------------------------------
        *      uglify javascripts
        *----------------------------------------------------*/

        uglify: {
            options: {
                banner: '<%= banner %>',
                stripBanners: true
            },

            main: {
                src: '<%= concat.main.dest %>',
                dest: 'dist/js/main.min.js'
            }
        },


        /*----------------------------------------------------
        *      Files, watching & FTP
        *----------------------------------------------------*/

        /*----------------------------------------------------
        *      Copy required files
        *----------------------------------------------------*/

        copy: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['img/**/*', 'index.html'],
                    dest: 'dist/'
                }]
            }
        },

        /*----------------------------------------------------
        *      push changed files to FTP location
        *----------------------------------------------------*/

        ftpush: {
            build: {
                auth: {
                    host: '',
                    port: 21,
                    authKey: 'key1'
                },

                src: 'dist/',
                dest: '',
                exclusions: ['.DS_Store']
            }
        },

        /*----------------------------------------------------
        *      Watch task.
        *----------------------------------------------------*/

        watch: {
            scss: {
                files: ['src/scss/**/*.scss'],
                tasks: ['compilesass','lintsass','minifycss','files']
            },

            js: {
                files: ['src/js/main.js', 'src/js/DarthPhader.js', 'src/js/DarthPhader2.js'],
                tasks: ['lintjs','combine','uglifyjs','files']
            },

            html: {
                files: ['src/*.html'],
                tasks: ['files']
            },

            other: {
                files: ['src/img/**/*','src/fonts/*'],
                tasks: ['files']
            }
        }
    });



    /*----------------------------------------------------
    *      load node modules
    *----------------------------------------------------*/

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-scss-lint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');

    /*----------------------------------------------------
    *      register tasks for grunt usage
    *----------------------------------------------------*/

    grunt.registerTask('compilesass', ['sass']);
    grunt.registerTask('lintsass', ['scsslint']);
    grunt.registerTask('minifycss', ['cssmin']);

    grunt.registerTask('lintjs', ['jshint']);
    grunt.registerTask('combine', ['concat']);
    grunt.registerTask('uglifyjs', ['uglify']);

    grunt.registerTask('files', ['copy']);
    grunt.registerTask('monitor', ['watch']);

    grunt.registerTask('default', ['compilesass','minifycss','lintjs','combine','uglifyjs','files','watch']);
};
