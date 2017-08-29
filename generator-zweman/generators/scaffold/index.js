'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(chalk.cyan("Setting up services..."));
  }
  writing() {
    var prjName = this.config.get('promptValues').projectName;
    var model_list = this.config.get("models");

    var model_list = [];
    var relations = [];
    model_list = this.config.get("models");
    relations = this.config.get("relations");
    //Component Build
    model_list.forEach( m =>{
      var files = ["form", "list", "details"];
      files.forEach(i => {
        this.fs.copyTpl(
          this.templatePath(`html/${i}.txt`),
          this.destinationPath(prjName + "/src/app/components/" + m.name.toLowerCase() + "/" + m.name.toLowerCase() + `-${i}/` +
            m.name.toLowerCase() + `-${i}.component.html`), {
            name: m.name,
            fields: m.fields,
            relations: relations
          }
        );

        this.fs.copyTpl(
          this.templatePath(`typescript/${i}.txt`),
          this.destinationPath(prjName + "/src/app/components/" + m.name.toLowerCase() + "/" + m.name.toLowerCase() + `-${i}/` +
            m.name.toLowerCase() + `-${i}.component.ts`), {
            name: m.name,
            fields: m.fields,
            relations: relations
          }
        );
      });
    });
    //this.log(model_list);
    //build services
    this.fs.copyTpl(
      this.templatePath('create.service.ejs'),
      this.destinationPath(prjName + '/src/app/services/create.service.ts'),
      { fields: model_list }
    );
    this.fs.copyTpl(
      this.templatePath('read.service.ejs'),
      this.destinationPath(prjName + '/src/app/services/read.service.ts'),
      { fields: model_list }
    );
    this.fs.copyTpl(
      this.templatePath('update.service.ejs'),
      this.destinationPath(prjName + '/src/app/services/update.service.ts'),
      { fields: model_list }
    );
    this.fs.copyTpl(
      this.templatePath('delete.service.ejs'),
      this.destinationPath(prjName + '/src/app/services/delete.service.ts'),
      { fields: model_list }
    );
    //build app.module
    this.fs.copyTpl(
      this.templatePath('app.module.ejs'),
      this.destinationPath(prjName + '/src/app/app.module.ts'),
      { fields: model_list }
    );

    //build main-page component
    this.fs.copyTpl(
      this.templatePath('main-page.ts.ejs'),
      this.destinationPath(prjName + '/src/app/components/main-page/main-page.component.ts'),
      { fields: model_list }
    );
    this.fs.copyTpl(
      this.templatePath('main-page.html.ejs'),
      this.destinationPath(prjName + '/src/app/components/main-page/main-page.component.html'),
      { fields: model_list }
    );

    //build app.component.html
    this.fs.copy(
      this.templatePath('app.component.html.ejs'),
      this.destinationPath(prjName + '/src/app/app.component.html')
    );
  }

  // install() {
  //   this.installDependencies();
  // }
};
