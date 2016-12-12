var express = require('express');
var mongodb = require('mongodb');
var bodyparser = require('body-parser');
var nodemailer = require('nodemailer');
var smtpTransport = require("nodemailer-smtp-transport")
var app = express();
var mongoose = require('mongoose');
var userroutes = require('./routes/userRoutes');
var FCM = require('fcm-push');
var serverKey = 'AIzaSyBSAtccBLjWBt1FW7ChmjqIphlsT0KKUWU';
var fcm = new FCM(serverKey);



mongoose.connect('mongodb://localhost/nodedb', function(err) {
    if(err) {
        console.log('err '+err);
    } else {
        console.log('connection established ');
    }
});

app.listen(1234);
app.use(bodyparser.json())
app.post('/insert',userroutes.insert);
app.get('/getall',userroutes.getall);
app.get('/getuser',userroutes.getUser);
app.get('/getuserbyid',userroutes.getUserbyid);
app.get('/deleteuser',userroutes.deleteUser);
app.post('/updateuser',userroutes.updateUser);

app.get('/get',function(req,res){
console.log("hello");
res.send('helllooooo')
});

app.post('/post',function(req,res){
console.log(req.body);
res.send('hello Mr. '+req.body.hello)
});

app.get('/send',function(req,res){
	var mailOptions={
        from : "rkravisunny@gmail.com",
        to : "ravirapolu97@gmail.com",
        subject : "car",
        text : "helllo",
        html : "<b>Super</b>",
        attachments : [
            {   // file on disk as an attachment
                filename: 'marblesz sql schema.txt',
                path: 'D:\marblesz sql schema.txt' // stream this file
            }
        ]
    }

	var sm = nodemailer.createTransport(smtpTransport({
    host : "localhost",
    debug: true,
    secureConnection : false,
    port: 587,
    auth : {
        user : "rkravisunny@gmail.com",
        pass : "Ravi@1993"
    }
	}));

    console.log("smmm  "+sm);
    console.log(mailOptions);
    sm.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
            res.end("error");
        }else{
            console.log(response.response.toString());
            console.log("Message sent: " + response.message);
            res.end("sent");
        }
    });
});

app.get('/noti',function(req,res){
var message = {
    to: 'fXvOb3AlYbs:APA91bHrV_4M_S1Fk5uomcrPdJbKGVKZdH31wTD4FHdWX88_QBTqm1KQJki52vgEqXYuxo5-VLX8cAOrjb6OZhd6g1uJduuK7WXS5ciGSlqiMn2r7dfvcMo4MgGu8ynw8yBHiNx8xMYx', // required
    collapse_key: 'your_collapse_key',
    data: {
        hello: 'ravi',
		"registration_ids": ["fXvOb3AlYbs:APA91bHrV_4M_S1Fk5uomcrPdJbKGVKZdH31wTD4FHdWX88_QBTqm1KQJki52vgEqXYuxo5-VLX8cAOrjb6OZhd6g1uJduuK7WXS5ciGSlqiMn2r7dfvcMo4MgGu8ynw8yBHiNx8xMYx"],
	"data": {
		"type": 501,
		"receiverId": "1474528650170",
		"senderId": "1474527962838",
		"senderUsername": "srujana",
		"cardId": "1474534284153",
		"card": {
			"id": "1474534284153",
			"userFullName": "Meghana",
			"maxExtraImages": 0,
			"images": [],
			"color": "F1D609",
			"bizCardCode": "srujana57",
			"designation": "Homemaker",
			"userImage": "https://commondatastorage.googleapis.com/bizcards-prod//images/card/1474534284153/card-user-image.png",
			"logoImage": "https://commondatastorage.googleapis.com/bizcards-prod//images/card/1474534284153/card-logo.png",
			"phone": "9632369805",
			"website": "www.google.com",
			"email": "meghana@gmail.com",
			"isPrimary": true,
			"isActive": false,
			"isArchived": false,
			"isDeleted": false
		},
		"userImageUrl": "https://commondatastorage.googleapis.com/bizcards-prod//images/user/1474527962838/user-dp.png",
		"cardShareId": "1474872456266",
		"title": "CARD_SHARED",
		"body": "CARD_SHARED"
	},
	"priority": "high",
	"alert": "CARD_SHARED",
	"message": "CARD_SHARED",
	"content_available": true,
	"notification": {
		"type": 501,
		"receiverId": "1474528650170",
		"senderId": "1474527962838",
		"senderUsername": "srujana",
		"cardId": "1474534284153"
		
	}

    },
    notification: {
        title: 'test push notification',
        body: 'Hello Ravi'
    }
};
fcm.send(message, function(err, response){
    if (err) {
        console.log("Something has gone wrong!"+err);
    } else {
        console.log("Successfully sent with response: ", response);
    }
});
});
