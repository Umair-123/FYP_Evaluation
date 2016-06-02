var express=require('express');
var body_parser=require('body-parser');
var mongoose=require('mongoose');
var morgan=require('morgan');
var app=express();


var http = require('http').Server(app);
var io = require('socket.io')(http);



var config=require('./config');

mongoose.connect(config.database,function(err){
	if(err){
		console.log("database connection unsuccessful");
	}
	else{
		console.log("database connection successful");	
	}

});





app.use(body_parser.urlencoded({extended:true}));
app.use(body_parser.json());
app.use(morgan('dev'));

var api=require('./app/routes/api')(app,express,io);
app.use('/api',api);



app.use(express.static(__dirname+'/public'));


app.get('*',function(req,res){
	res.sendFile(__dirname+'/public/app/views/index.html');
});

http.listen(config.port,function(err){
	if(err)
	{
		console.log(err);
	}
	else
	{
		console.log("Listening on Port 2929");
	}



})