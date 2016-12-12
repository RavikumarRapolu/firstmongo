var mongoose = require('mongoose');
var User= require('../model/user.js');
var resformat = require('../util/util.js');
exports.insert=function(req,res){
console.log('sdvd '+req.body);
var user=new User({
	username:req.body.username,
	password:req.body.password,
	email:req.body.email,
	phone:req.body.phone

});

//save model to MongoDB
user.save(function (err) {
	console.log(err);
  if (err) {
  		if(err.code ===11000){
  			resformat(res,409,'A user already exists',user,false);
  			return;
  		}else
		return err;
  }
  else{
  	resformat(res,200,'successfully cretaed',user,true);
  	return;
  }
});

};

exports.getall=function(req,res){

User.find({}, function(err, users) {
  if (err) throw err;

  // object of all the users
  console.log(users);
  if(users!=null){
  	resformat(res,200,'successfully fetched all users',users,true);
  }else
  resformat(res,200,'No users are found',null,true)


});
};

exports.getUser=function(req,res){
	console.log(req.query.username);
User.find({username:req.query.username},function(err,user){
if(err) throw err;
if(user!=null){
  	resformat(res,200,'successfully fetched user',user,true);
  }else
  resformat(res,200,'No users are found',null,true)

});
};

exports.getUserbyid=function(req,res){
User.findById({_id:req.query.id},function(err,user){
if(err) throw err;
if(user!=null){
	resformat(res,200,'fetched user',user,true);
}
});
};

exports.updateUser=function(req,res){
User.findByIdAndUpdate(req.body.id,{username:req.body.username},{password:req.body.password},function(err,user){
if(err) throw err;
console.log('updated');
if(user!=null){
	resformat(res,200,'upadted user',user,true);
}
});
};

exports.deleteUser=function(req,res){
User.findById({_id:req.query.id},function(err,user){
if(err) throw err;
user.remove(function(err){
	if(err) throw err;
	resformat(res,200,'deleted user',user,true);
});
});
};
