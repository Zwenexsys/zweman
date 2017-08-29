'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
var model_name = "";
var model_fields = [];
var api_link = "";
var create_api = "";
var read_api = "";
var update_api = "";
var delete_api = "";
var model_list = [];
module.exports = class extends Generator {
  prompting() {

    //Check if model list exists in conifg
    var modelNames = [];
    if (this.config.get("models")) {
      model_list = this.config.get("models");
      model_list.forEach(eachModel => {
        modelNames.push(eachModel.name)
      });
    }

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the badass ' + chalk.red('generator-zweman') + ' generator!'
    ));
    const prompts = [{
      type: 'input',
      name: 'api_link',
      message: 'Enter API URL',
      default: null
    }];
    this.argument('model_string', {
      type: String,
      required: true
    });
    var data = this.argument().arguments

    //1st Position is model name



    model_name = data[0];
    var fields = data.splice(1);
    for (var i in fields) {
      var field_name = fields[i].split(':')[0];
      var field_type = fields[i].split(':')[1];

      if (field_type == 'string' || field_type == 'number' || field_type == 'boolean' || field_type == 'Date' || modelNames.indexOf(field_type) >= 0) {
        model_fields.push({
          'name': field_name,
          'type': field_type
        });
      } else { 
        this.log(field_type+' is not a valid type');
        process.exit(1);
      }
    }
    //this.log(model_fields)

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
      api_link = this.props.api_link;
      this.log('Model: ' + chalk.red.bold(model_name) + ' under ' + this.appname)
      this.log(chalk.yellow('Create API :') + create_api);
      this.log(chalk.yellow('Read API :') + read_api);
      this.log(chalk.yellow('Update API :') + update_api);
      this.log(chalk.yellow('Delete API of :') + delete_api);
      this.log('Parameters');
      for (var i in model_fields) {
        this.log(chalk.bgMagenta(model_fields[i].name) + ':' + chalk.bold(model_fields[i].type))
      }
    });
  }

  writing() {
    var prjName = this.config.get('promptValues').projectName;
    //Index. build
    this.fs.copyTpl(
      this.templatePath('index.ejs'),
      this.destinationPath(prjName + '/src/index.html'), {
        appName:prjName
      }
    );

    //Navbar build
    this.fs.copy(
      this.templatePath('navbar.ts.ejs'),
      this.destinationPath(prjName + '/src/app/components/navbar/navbar.component.ts')
    );
    this.fs.copyTpl(
      this.templatePath('navbar.html.ejs'),
      this.destinationPath(prjName + '/src/app/components/navbar/navbar.component.html'), {
        appName:prjName
      }
    );

    // //Component Build
    // var files = ["form", "list", "details"];
    // files.forEach(i => {
    //   this.fs.copyTpl(
    //     this.templatePath(`html/${i}.txt`),
    //     this.destinationPath(prjName + "/src/app/components/" + model_name.toLowerCase() + "/" + model_name.toLowerCase() + `-${i}/` +
    //       model_name.toLowerCase() + `-${i}.component.html`), {
    //       name: model_name,
    //       fields: model_fields,
    //       api_link: api_link
    //     }

    //   );

    //   this.fs.copyTpl(
    //     this.templatePath(`typescript/${i}.txt`),
    //     this.destinationPath(prjName + "/src/app/components/" + model_name.toLowerCase() + "/" + model_name.toLowerCase() + `-${i}/` +
    //       model_name.toLowerCase() + `-${i}.component.ts`), {
    //       name: model_name,
    //       fields: model_fields,
    //       api_link: api_link
    //     }
    //   );
    // });

    //Model build
    this.fs.copyTpl(
      this.templatePath('model.txt'),
      this.destinationPath(prjName + '/src/app/models/' + model_name.toLowerCase() + '.model.ts'), {
        name: model_name,
        fields: model_fields
      }
    );

    //Config Save
    
    var relationList = [];
    if (this.config.get("relations")) 
      relationList = this.config.get("relations");
      //configuring relations
    for(var f in model_fields){
      if(model_fields[f].type == 'string' || model_fields[f].type == 'number' || model_fields[f].type == 'boolean' || model_fields[f].type == 'Date')
        {}
      else{
        relationList.push({
          belongsTo:model_fields[f].type,
          object:model_name
        });
      }
    }
    console.log(relationList);
    model_list.push({
      name: model_name,
      fields: model_fields,
      api_link: api_link
    });
    this.config.set({
      models: model_list
    });
    this.config.set({
      relations: relationList
    });
    this.config.set({
      model_count: this.config.get("model_count") + 1
    });

  }

  install() {
    //this.installDependencies();
  }
  end(){
    this.log("*****FINISHED******");
  }
};

