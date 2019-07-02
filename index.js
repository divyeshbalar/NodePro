const express = require('express');
const bodyparser = require('body-parser');
const path = require('path'); // use to simplify the file path
const port = 3000;
var app = express(); // initializing express app


//logger is a custom middle ware between request and response and you can do all you want here

//order of this code is important and it must be before listening and redirect code 
var logger = (req, res, next) => {
	//Here you can have complete access to the request and response and you can do all you want....
	// you only need to dig into the parameters of request and response object

	console.log('Logging ...');
	//req and res are object and next is the function
	next();
};

app.use(logger);

//View engine ejs
// you can use other engines as well 
// for example: pug; 
	//first set the engine then use render function to render that using its own syntax and function
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // last views is folder name

//these are the body parser middleware and implementation of them is into the body parser
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false})); // {extended: false} is an object we have to pass to function


//YET another middleware 
//Set static path for public file/folder 
//all public resource files will stay in here 
// index.html will override whatever from index.js/app.js
//if you have an angular app or something only at client side; you can add all those resources at here and everything will work fine
app.use(express.static(path.join(__dirname, 'public')));



//Javascript object can be serve as API response
var people = [
{
	name: "Divyesh",
	age: 23
},
{
	name: "Frank",
	age: 12
},
{
	name: "Neysa",
	age: 2
},
{
	name: "Nitin",
	age: 29
}
];

app.get('/', (req, res) => {
	//res.send('How you doing');

	var tempTitle = 'This is title';

	res.render('index', {tempTitle: tempTitle, people: people}); // passing object to view(views/index.ejs) 
});


app.post('/user/adduser', (req, res) => {
	var userObj = {
		firstname: req.body.firstname,
		lastname: req.body.lastname
	};
	console.log(userObj);
});

/*
app.get('/people', (req, res) =>{ 
	//conversting JS object to Json object and send it as response
	res.json(people);
});
*/

app.listen(port, ()=>{
	console.log('Server started at '+ port);
});
