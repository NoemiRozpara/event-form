#Event form   

##Installation
$cd /directory/with/unpacked/project 
$npm install   
**THEN**  
$npm start (to run in development mode)   
open http://localhost:3000 (for the first time it may take a while)  
**OR**  
$npm run build (to build production files)   
$serve -s build (to serve production version of app)    
open http://localhost:5000   

##Used plugins
* mini-css-webpack-plugin and mini-html-webpack-plugin to generate static build files 
* sass-loader and node-sass to transpile .scss files
* postcss-loader to autoprefix styles 
* webpack-merge to create 2 versions of webpack.config.js (dev and prod, both use common file)
* clean-webpack-plugin to clean /build folder before new project build  

##Notes
1. Project was build using react-create-app. However, many changes were made to the setup (e.g. 2 different configs for build and production mode). Advantage is, it supports experimental feature named lexical scoping (no need to use this.method_name = this.method_name.bind(this)) in arrow functions. Disadvantage - I believe many included features are unnecesary and whole package is a bit slow. I'm still on my way to find my perfect webpack package :)  
2. All strings in application are served from 'src/data/messages-en.json'. Better way would be to use .po file, but it would require another libraries and I did't want to make bigger mess in project.  

3. In this case all .json files are simply imported. Normally, I would insert all URL's to appConfig.js, pass them down in props and fetch data in ComponentDidMount (that's why there is commented "loading" property in EventForm state).

4. Because all of form components have similar methods (validate, returnData) I feel this could be done easier (maybe by some parent class), so I'm looking forward to your opinion!