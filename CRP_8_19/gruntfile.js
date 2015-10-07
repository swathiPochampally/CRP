module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
		// Linting
        jshint: {
            files: [
                '**/*.js',
                '!node_modules/**/*.js',
                '!core/libraries/**/*.js'
            ],
            options: {
                globals: {
                    document: true,
                    jQuery: true,
                    angular: true,
                    require: true
                }
            }
        },

        // Build LESS
        less: {
            development: {
                files: {
                    '../build/css/styles.css': './less/styles.less'
                }
            }
        },

        // Run tasks when files change
        watch: {
            jshint: {
                files: '**/*.js',
                tasks: ['newer:jshint'],
                options: {
                    livereload: true
                }
            },
            less: {
                files: './less/*.less',
                tasks: ['newer:less'],
                options: {
                    // don't reload since the css files changes are monitored
                }
            },
            css: {
                files: '../build/css/*.css',
                options: {
                    livereload: true
                }
            },
            html: {
                files: '../build/*.html',
                options: {
                    livereload: true
                }
            }
        },
        connect: {
            uses_defaults: {}
        },
        karma: {
          test: {
            configFile: 'karma-config.js'
          }
        },
		concat: {
		  options: {
			// define a string to put between each file in the concatenated output
			separator: ';'
		  },
		  dist: {
			// the files to concatenate
			src: ['src/**/*.js'],
			// the location of the resulting JS file
			dest: 'dist/<%= pkg.name %>.js'
		  }
		},
		uglify: {
		  options: {
			// the banner is inserted at the top of the output
			banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
		  },
		  dist: {
			files: {
			  'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
			}
		  }
		}
    });

    // Load the tasks
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');


    // Speficty the default task
    grunt.registerTask('default', ['jshint', 'concat', 'uglify','less']);
    grunt.registerTask('server', ['connect', 'watch']);
    grunt.registerTask('test', ['karma:test']);
};
