'use strict';
const Promise = require("bluebird");
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const cmd = require('node-cmd');
const yosay = require('yosay');

module.exports = class extends Generator {

	prompting() {
		// Have Yeoman greet the user.
		this.log(yosay(
			'Welcome to the wicked ' + chalk.red('generator-zweman') + ' generator!'
		));

		const prompts = [{
			type: 'input',
			name: 'projectName',
			message: 'What is the name of your project?',
			default: 'MyRailsAngular',
			store: true
		}];

		return this.prompt(prompts).then(props => {
			// To access props later use this.props.someAnswer;
			this.props = props;
		});
	}

	writing() {
		this.config.set({ model_count: 0 });
	}

	install() {
		this.installDependencies();

		this.log("Installing Angular CLI");

		this.log(this.props.projectName);
		var siht = this;
		this.npmInstall(['typescript'], { 'g': true });

		this.npmInstall(['@angular/cli'], { 'g': true }, function (err, name) {
			siht.spawnCommand('ng', ['new', siht.props.projectName]);
		});
		//	cmd.run('npm install -g @angular/cli');
		//	cmd.run('npm install -g typescript')
	}
	initProject() {

	}
};
