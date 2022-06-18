# RPG Dice Roller and Player Sheet Manager
## Description
App made with ReactJS and Node to study CRUD with Node and MySQL.

## Screenshots
### Dice Roller
![dice-roller](https://user-images.githubusercontent.com/71052352/174450947-51613332-7308-462e-929b-08804a4c9929.gif)
### Add Card
![add-card](https://user-images.githubusercontent.com/71052352/174450955-46313182-b655-43b3-9913-aaac5fb5dc6a.gif)
### Delete Card
![delete-card](https://user-images.githubusercontent.com/71052352/174451787-26bddf5b-fb22-4a17-b7db-6404b71e6974.gif)
### Card
![cards](https://user-images.githubusercontent.com/71052352/174451728-e6ba6642-2fde-481d-8dff-b9665630692f.png)

## Installing
### Client
1. `$ cd client`
2. `$ npm install`
3. `$ npm start`

### Server
1. Change your mySQL database data `server/index.js`
2. `$ cd server`
3. `$ npm install`
4. `$ npm start`


### Functionalities
App
+ Dark/Light mode stored in local storage
+ Responsible design

Dice Roller
+ Roll multiple dices
+ Rolled dices history
+ Clear rolled dices history

Player Cards/Sheet
+ Create player card in the database
+ Read player card in the database
+ Update player card in the database
+ Delete player card in the database

### Used Libraries

#### Front-end: 
`axios`
`react-scroll`
`react-textarea-autosize`
`react-usestateref`
`uuid`


#### Back-end:
`express`
`mysql2`
`nodemon`
`cors`
