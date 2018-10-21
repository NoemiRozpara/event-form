~~~ Installation: ~~~
$npm install 

$npm start (to run in development mode)
OR 
$npm run build (to build production files)
$serve -s build (to serve production version of app)

~~~ Notes: ~~~
1. Project package was built using create-react-app. Howewer, many changes was made to configuration (e.g. 2 different config files for developer and build mode.). I'm still on my way to find the perfect package (I find the current one slow).
2. Besides of .scss transpiler, I believe css prefixed would be nice.
3. All strings in application are served from 'src/data/messages-en.json'. Better way would be to use .po file, but it would require another libraries and I did't want to make bigger mess in project. 
4. I've had problems with importing categories and employees by fetch() locally. That's why these files are just imported.
5. I really feel like few improvements should be made: 
    - all form controls could be universal FormControl component (but I found this a bit challenging and didn't know if it was worth to do)
    - there could exist one component to be "form" for all form components (title, description, starting time and so on), because all of them have similar methods (validate, returnData) and I felt it could be done easier
  Unfortunately, I'm on learning stage "I know it's ugly, don't know how to fix it yet". That's the reason I dream about having more experienced coworkers and make beautiful, lighweight apps together :)