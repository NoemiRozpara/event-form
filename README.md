#Event form   

##Installation
$npm install   

$npm start (to run in development mode)  
**OR**  
$npm run build (to build production files)   
$serve -s build (to serve production version of app)    

##Used plugins
* mini-css-webpack-plugin and mini-html-webpack-plugin to generate static build files 
* sass-loader and node-sass to transpile .scss files
* postcss-loader to autoprefix styles 
* webpack-merge to create 2 versions of webpack.config.js (dev and prod, both use common file)
* clean-webpack-plugin to clean /build folder before new project build  

##Notes
1. All strings in application are served from 'src/data/messages-en.json'. Better way would be to use .po file, but it would require another libraries and I did't want to make bigger mess in project. 
2. I've had problems with importing categories and employees by fetch() locally. That's why these files are just imported.
3. Because all of form components have similar methods (validate, returnData) I feel this could be done easier (maybe by some parent class), so I'm looking forward to your opinion!