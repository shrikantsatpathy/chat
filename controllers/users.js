   'use strict';


module.exports = function(_, passport){

	return {
		SetRouting: function(router){
			router.get("/", this.indexPage)
			router.get("/signup", this.getSignup)
			router.post("/signup", this.postSignup)
			router.get("/home", this.homePage)
		},

		indexPage: function(req, res){
			res.render('index', {test: "this is the index page shrikant "});
		},

		getSignup: function(req, res){
			res.render('signup');
		},

		postSignup: passport.authenticate('local.signup', {
			successRedirect : '/home',
			failureRedirect : '/signup',
			failureFlash : true
		}),

		homePage: function(req, res){
			res.render('home');
		}
        


		
	}
}