#Event form   
Form with many different fields to create an event. Validation included.   

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
