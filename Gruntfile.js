module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		meta: {
			copyright: 'Copyright Text TODO',
			// TODO: This is Linux/Gnome-specific.
			// Need cross platform build notification solution.
			notifyCmd: 'notify-send -i ' +
						'/usr/share/icons/gnome/32x32/emotes/face-laugh.png ' +
						'-t 500 ',
		},

		less: {
			library: {
				src: 'less/library.less',
				dest: 'css/built/library.css',
				options: {
					yuicompress: true,
				},
			},
			style: {
				src: 'less/main.less',
				dest: 'css/built/main.css',
				options: {
					yuicompress: true,
				},
			},
		},

		watch: {
			style: {
				files: [
					'less/*.less',
					'less/*/*.less',
				],
				tasks: [
					'less:style', 
					'shell:alert',
				],
			},
		},

		shell: {
			alert: {
				command: '<%= meta.notifyCmd%> "Grunt" ' +
						 '"Yay, it compiled!"',
				options: {
					stdout: false,
				},
			},
		},
	});
 
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-handlebars');
	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-neuter');
	grunt.loadNpmTasks('grunt-notify');

	// Default task: Watch for changes, compile, minify, notify.
	grunt.registerTask('default', [
				'watch',
			]);

	grunt.registerTask('build', [
				'less:style',
			]);
};

