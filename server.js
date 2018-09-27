const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs'); 
const http = require('http');
const cookieParser = require('cookie-parser');
const validator = require('express-validator');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const flash = require('connect-flash');
const passport = require('passport');


const container = require("./container")
container.resolve(function(users){
	mongoose.Promise = global.Promise; 
	mongoose.connect("mongodb://localhost:27017/chat", {useNewUrlParser: true});
	const app = SetupExpress();

	function SetupExpress(){
		const app = express();
		const server = http.createServer(app);
		server.listen(3000, function(){
            console.log('Listening on port 3000');
        });

    ConfigureExpress(app);
    //setup Router
	const router = require("express-promise-router")(); 
	users.SetRouting(router)
    app.use(router)

    app.use(function(req, res){
            res.send('404');
        });
	}
 

	function ConfigureExpress(app){
        require("./passport/passport-local");



		app.use(cookieParser());
		app.set("view engine", "ejs");
		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({extended : true}))

		app.use(validator());
		app.use(session({
			secret: 'this is a secret key',
			resave: false,
			saveUninitialized: false,
			stroe: new MongoStore({mongooseConnection: mongoose.connection})
		}));

		app.use(flash());

		app.use(passport.initialize());
		app.use(passport.session())
	}
})