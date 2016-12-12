module.exports= function(res,statuscode,message,data,success){
	var resformat = {
		StatusCode:statuscode,
		message:message,
		success:success,
		data:data
		
	}
	 return res.json(resformat);
}