module.exports = function (grunt) {

    grunt.initConfig({
        path: '../scripts',
        pkg: grunt.file.readJSON('package.json'),

        karma: {
            unit: {
                configFile: '../karma-config.js',
                singleRun: true,
                browsers: ['PhantomJS']
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc',
                jshintignore: '.jshintignore'
            },
            all: ['<%=path%>/**/*.js','../tests/**/*.js']
        },

        ngAnnotate: {
            //options: {
            //    singleQuotes: true,
            //},
            ngLargeTemplate: {
                files: [
                    {
                        expand: true,
                        src: [
                            '<%=path%>/**/*.js',
                            '!<%=path%>/core/libraries/*.js',
                            '!<%=path%>/core/libraries/**/*.js'],
                        rename: function (dest, src) {
                            // return the same name as the original file.
                            return src;
                        },
                    },
                ]
            }
        },

        uglify: {
            ngLargeTemplate: {
                files: [{
                    expand: true,
                    cwd: '<%=path%>',
                    src: ['**/*.js', '!core/libraries/*.js', '!core/libraries/**/*.js'],
                    dest: '<%=path%>'
                }]
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['jshint', 'karma', 'ngAnnotate', 'uglify']);
};