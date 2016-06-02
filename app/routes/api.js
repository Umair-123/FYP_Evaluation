var User = require('../models/authUser');
var Business = require('../models/business');
var Post = require('../models/posts');
var jsonwebtoken = require('jsonwebtoken');
var qs = require('querystring');
var config = require('../../config');

var secretKey = config.secretKey;

function createToken(user){

	return jsonwebtoken.sign({

		id: user._id,
		firstname: user.firstname,
		lastname: user.lastname,
		username: user.username

	}, secretKey, {
		expiresInMinute: 1440
	});
}

module.exports = function(app, express,io){

	var api = express.Router();
	//here we are going to search a business by ebusiness Name
	api.post('/search_business', function(req, res) {
		

		
		var keyword=qs.stringify(req.body.bizName);

		/*
		var query = { bizName: new RegExp('^' + keyword) };
		*/
		Business.find({"bizName":{$regex:keyword}}, function(err, businesses) {
			if(err) {
				res.send(err);
				return;
			}
			res.json(businesses);
		});
	});
	api.get('/all_businesses', function(req, res) {
		
		Business.find({}, function(err, businesses) {
			if(err) {
				res.send(err);
				return;
			}
			res.json(businesses);
		});
	});
	
	api.get('/all_posts', function(req, res) {
		
		Post.find({}, function(err, posts) {
			if(err) {
				res.send(err);
				return;
			}
			res.json(posts);
		});
	});


	api.put('/comment', function(req, res) {
	//Business.update({bizName: req.body.bizName}, {$set: {comment:req.body.comment}});
	Business.findOne({ bizName: req.body.bizName }, function(error, business){
    if(error){
    	res.json('idr araha hai masla!')
        res.json(error);
    }
    else if(business == null){
        res.json('no such business!')
    }
    else{
    
        business.Comments.push({
    		comment:req.body.comment
    	});
        business.save( function(error, data){
            if(error){
                res.json(error);
            }
            else{
                res.json(data);
            }
        });
    }
	});
	
	});

	//end

	api.post('/signup', function(req, res){

		var user = new User({
			firstname: req.body.firstname,
			lastname: req.body.lastname,
			username: req.body.username,
			password: req.body.password
		});

		var token = createToken(user);

		user.save(function(err){

			if(err){
				res.send(err);
				console.log("There was some error,though its here");
				return;
			}
			
			res.json({
				success: true,
				message: 'User has been created!',
				token: token
			});
		});
	});

	api.get('/users', function(req, res){

		User.find({}, function(err, users){
			if(err){
				res.send(err);
				return;
			}

			res.json(users);
		});
	});

	api.post('/login', function(req, res){

		User.findOne({
			username: req.body.username
		}).select('name username password').exec(function(err, user){

			if(err) throw err;

			if(!user){
				res.send({message: "User doesnot exist"});
			}
			else if(user){

				var validPass = user.comparePassword(req.body.password);
				if(!validPass){
					res.send({message: "Incorrect password"});
				}
				else{
					// token
					var token = createToken(user);

					res.json({
						success: true,
						message: "Successfully logged in",
						token: token
					});
				}
			}


		});
	});

	api.use(function(req, res, next){

		var token = req.body.token || req.param("token") || req.headers["x-access-token"];

		if(token){
			
			jsonwebtoken.verify(token, secretKey, function(err, decoded){

				if(err){
					res.status(403).send({success: false, message: "Failed to authenticate User"});
				}
				else{
					req.decoded = decoded;
					next();
				}
			});
		}
		else{
			res.status(403).send({success: false, message: "No Token Provided"});
		}
	});
	

	//after middleware

	

	api.route('/')

		.post(function(req, res) {

			var business = new Business({
				creator: req.decoded.id,
				description: req.body.description,
				bizName: req.body.bizName,
				bizAddress: req.body.bizAddress


			});

			business.save(function(err, newBusiness) {
				if(err) {
					res.send(err);
					return
				}
				io.emit('business', newBusiness)
				res.json({message: "New Business Created!"});
			});
		})


		.get(function(req, res) {

			Business.find({ creator: req.decoded.id }, function(err, businesses) {

				if(err) {
					res.send(err);
					return;
				}

				res.send(businesses);
			});
		});

	//Post By User

	api.post('/postbyuser', function(req, res){


		var usr;
		User.findOne({ _id:req.decoded.id },{'username':true,'_id':false}, function(err, usernam){
			if(err){
				res.send(err);
				return;
			}
				usr=qs.stringify(usernam);
				console.log("Its"+usernam);
		});
		var posto = new Post({

			postedBy: req.decoded.id,
			postOwner:usr,
			postmade: req.body.postmade
		});


		posto.save(function(err,newPost){

			if(err){
				res.send(err);
				console.log("There was some error,though its here");
				return;
			}
			io.emit('post', newPost)
			res.json({
				message: 'Post has been created!'
			});
		});
	});
	api.get('/postbyuser',function(req, res) {

		Post.find({ postedBy: req.decoded.id }, function(err, posts) {

				if(err) {
					res.send(err);
					return;
				}

				res.send(posts);
			});
		});
	


	api.get('/me', function(req, res) {
		res.send(req.decoded);
	});




	return api;
};