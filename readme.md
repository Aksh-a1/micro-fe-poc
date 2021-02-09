Example POC for how we can have micro-frontend architecture using `iframe`.


This is just an example, as there is no perfect or correct way to design any architecture.

Pre-requisites:

1. node >= 12
2. yarn >= 1.21

How to run:

1. `yarn initialise` in main root folder i.e. `micro-fe-app`. This will install the packages in all the apps.
2. `yarn start` in container-app directory. It will be available at the address printed in the terminal.
This is the main app which drives or contains all the other app in an iframe.
3. `yarn start` in `application1` and `application2` directories.

>`application1` and `application1` are built using react, webpack and babel.

>`container-app` is built using native html&js, webpack and babel.
***
Want to add new apps (you can add any type of app vue, react, angular etc):
>:warning: **Keep in mind: The app start command must accept PORT as a parameter then only you can have this project work otherwise cannot (as that is how it is build). For example if you create a new app using create-react-app then it takes a PORT value while app start as _`yarn start PORT=`_**

1. Create them at the same level as other apps.
2. Change the start command in package.json to pass a dynamic PORT env value to your app (the name could differ as per the app you chose). Like below:
```
PORT=\"`node ../bin/generateFilePortsJson.js --name=${npm_package_name}`\"
```
3. Add a new button element inside `<div id="app-buttons">` in `container-app/index.html`.
4. Add a new object inside `container-app/applist.js` like below (_Just put the object at the same serial number you have put the button element in the `html`_):
```
[
  {
    id: 1,
    name: 'application1'
  },
  ...
  {
    id: <uniqueId>,
    name: <Your exact app name which you have in your app's package.json>
  }
]
```
That's it, you are done just `yarn start` your app and then click the button corresponding your app on the `container-app` and you will get your app running in the `iframe`.