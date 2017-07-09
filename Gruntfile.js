/**
 * Gruntfile
 * Provides tasks and commands to build and distribute the project
 * @param grunt
 */
module.exports = function(grunt) {

	/**
	 * Path shortcuts
	 */
	var path = {
		node_modules: 'node_modules/',
		dist: 'dist/all/',
		dist_chrome: 'dist/chrome/',
		dist_firefox: 'dist/firefox/',
		src: 'src/all/',
		src_addon: 'src/all/lib/',
		src_addon_vendors: 'src/all/lib/vendors/',
	};

	/**
	 * Load and enable Tasks
	 */
	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-browserify');

	grunt.registerTask('default', ['copy:src', 'browserify:vendor', 'browserify:client']);
	grunt.registerTask('build', ['browserify:vendors', 'browserify:app']);

	/**
	 * Main grunt tasks configuration
 	 */
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		/**
		 * Browserify is a tool to package CommonJS Javascript code for use in the browser.
		 * We use CommonJS require syntax to manage dependencies in the web extension add-on code
		 * See also. src/lib/vendor/require_polyfill.js
		 */
		browserify: {
			vendors: {
				src: [ path.src_addon_vendors + 'jquery.js'],
				dest: path.dist + 'vendors.min.js'
			},
			app: {
				src: [ 'src/all/lib/index.js'],
				dest: 'dist/all/index.min.js'
			}
		},

		/**
		 * Copy operations
		 */
		copy: {
			// copy data
			data: {
				files: [
					{expand: true, cwd: path.src + 'data', src: '**', dest: path.dist + 'data'}
				]
			},
			// copy src files to dist, but only those needed
			others: {
				files: [
					{expand: true, cwd: path.src + 'icons', src: '**', dest: path.dist + 'icons'},
					{expand: true, cwd: path.src + 'locale', src: '**', dest: path.dist + 'locale'},
					{expand: true, cwd: path.src, src: 'manifest.json', dest: path.dist}
				]
			},
			// copy node_modules where needed in addon or content code vendors folder
			// TODO
		},

		/**
		 * Shell commands
		 */
		shell: {
			options: {
				stderr: false
			},
			// TODO. add the shell commands
		},

		/**
		 * Watch task run predefined tasks whenever watched file patterns are added, changed or deleted
		 * see. https://github.com/gruntjs/grunt-contrib-watch
		 */
		watch: {
			data: {
				files: [path.src + 'data/**/*.*'],
				tasks: ['copy:data'],
				options: {
					spawn: false,
				}
			},
			app: {
				files: [path.src + 'lib/**/*.js', '!' + path.src + 'lib/vendors/*.js'],
				tasks: ['browserify:app'],
				options: {
					spawn: false,
				}
			},
			vendors: {
				files: [path.src + 'lib/vendors/*.js'],
				tasks: ['browserify:vendors'],
				options: {
					spawn: false,
				}
			},
			others: {
				files: [path.src + 'manifest.json', path.src + 'icons/*', path.src + 'locale/*'],
				tasks: ['copy:others'],
				options: {
					spawn: false,
				}
			}
		}
	});
};