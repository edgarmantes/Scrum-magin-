Scrum-maging
===========
### Live Site:
https://salty-reef-77673.herokuapp.com/#/
### Introduction

Scrum-mage is a productivity app that uses the Agile framework of SCRUM to keep track of complicated projects work flow. It can be used by a team of developers in an office setting or remote work. Very clean and quick to get started, Scrum-mage can get you up and running with your project in no time. This app is not only for computer programmers but for any team or person who falls under the umbrella of project based developement. It is a great way to ensure features of your project will get tracked from beginning to deployment. 

### Use Case

Why would this be valuable to you? For anyone who has had the experience working with a team in a big project that has many parts and very intricately designed would understand that keeping organized is the only way to ensure nothing is missed or overlooked. This app helps to keep you on track to completing every feature that needs to be completed. Every team member will be able to see where in production is a specific task currently on and what else needs to be done. 


### UI Design

![wireframe-scrum](https://cloud.githubusercontent.com/assets/15925701/23138274/fd0ccecc-f76b-11e6-9851-e42c41bf227a.png)



From the main sign-in/sign-up page, the user will require a unique username and password. After successfully signing in the page will be directed to the home screen which lists out all current projects that has been made. The user will have the choice of clicking onto a current project or opening up the side bar menu, which will give the option to create a new project. When the user is on a mobile device and enters a project, they will be brought to the Back Log page of the project, a menu at the top will appear for the Scrum board and Done Pile. From the back log page the user can enter a new entry and push it forward onto the Task List. Entries can traverse backward and forward throughout the board until it is placed into the Done Pile. 



Page Layout
--------
### Mobile:
![mobile-scrum-row](https://cloud.githubusercontent.com/assets/15925701/23139038/28aa8ab6-f770-11e6-8db0-b2dc0c676047.png)
### Desktop:
![desktop-scrum](https://cloud.githubusercontent.com/assets/15925701/23139046/2df31402-f770-11e6-8600-98d9e5703344.PNG)


__________________

Technologies Used:
------
* HTML5 - Used to style to page content that takes into consideration the symatic meaning of tags to provide better accessibility.
* CSS3 - Used to implement page layout and styling. Media queries were implemented to provide a responsive grid
* React.js - Used to provide the client side dynamic rendering.
* Redux.js - Provides management of the store data on the front-end store and Asynchronous calls
* Node.js / Express.js - Used to handle http request and hadle all RESTful API calls.
* MongoDB/ Mongoose - Handles data persistance on the server side.

### Installation
```
git clone https://github.com/shootermantes/Scrum-magin-.git
```
### Initiate Build
```
npm run dev
```



