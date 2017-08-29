# **Zweman** [![NPM version][npm-image]][npm-url] 
> Yeoman Angular Generator with REST API

## **About**
Zweman is a generator that accepts Models with API links and generates an Angular project with basic CRUD features.

---
## **Installation**

First, install [Yeoman](http://yeoman.io) and generator-zweman using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-zweman
```
---

## **Creating a project**
### **Starting a new project**
A new project must be created before creating models.

Starting a project will install the `angular-cli` if you don't have one and generate a new angular project.
```bash
yo zweman MyNewProject
```

---
### **Creating a model**
This will create a new model with specified data types.

``yo zweman:model ModelName var1:var_type var2:vartype``

Each model must provide an API URL for the CRUD processes of that model.
#### Model Name
Model name must start with a capital letter.
Model name must not contain spaces.
#### Data Types
* `number` for numbers and floating points.
* `string` for strings and texts.
* `boolean` for boolean.
* `Date` for DateTime.
* Objects can also be used as a data type but the object must be created as a model first. (i.e. If you want a `Book` object that has an `Author` object as a data type, an `Author` object must be created first. )

```bash
yo zweman:model Author id:number name:string email:string

yo zweman:model Book id:number title:string author:Author publication_date:Date stock:boolean
```
#### API
You only need the provide one URL for all CRUD processes like ``` http://192.168.0.112:4000/api/v1 ```

---

### **Scaffolding the project**
After creating all necessary models, you can scaffold the project.

Scaffolding will generate angular components and services or the respective models.

```bash
yo zweman:scaffold
```
---
### **Running the project**
To run the project change directory to the project folder
```bash
cd MyNewProject 
```
and run this command
```bash
ng serve
```
---
### **Building a production distribution**
To build your project for production run this command inside the project folder.
```bash
ng build --aot --prod
```
A new folder named ``dist`` will appear inside your project folder. That is the production build of your project.


---
## License

MIT © [zwenex]()


[npm-image]: https://badge.fury.io/js/generator-zweman.svg
[npm-url]: https://npmjs.org/package/generator-zweman
[travis-image]: https://travis-ci.org/miles-pudge-halter/generator-zweman.svg?branch=master
[travis-url]: https://travis-ci.org/miles-pudge-halter/generator-zweman
[daviddm-image]: https://david-dm.org/miles-pudge-halter/generator-zweman.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/miles-pudge-halter/generator-zweman
