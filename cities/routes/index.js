var express = require('express');
var fs = require('fs');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('weather.html', { root: 'public' });
});

router.get('/test1.html', function(req,res)
{
	res.sendFile('test1.html', {root: 'public/testFiles' });
});

router.get('/test2.txt', function(req,res)
{
	res.sendFile('test2.txt', {root: 'public/testFiles' });
});

router.get('/test3.gif', function(req,res)
{
	res.sendFile('test3.gif', {root: 'public/testFiles' });
});

router.get('/test4.jpg', function(req,res)
{	
	res.sendFile('test4.jpg', {root: 'public/testFiles' });
});

router.get('/getcity',function(req,res,next)
{
	fs.readFile(__dirname + '/cities.dat.txt',function(err,data)
	{
		if(err) throw err;
		var cities = data.toString().split("\n");
		var myRe = new RegExp("^" + req.query.q);
		var jsonresult = [];
		for(var i =0; i < cities.length; i++)
		{
			var result = cities[i].search(myRe);
			if(result != -1)
			{
				jsonresult.push({city:cities[i]});
			}
		}
		res.status(200).json(jsonresult);
	})
});

router.get('/getimage', function(req, res)
{
	console.log("In getimage route");
	
	var xkcd = "http://exhibitionnest.com/cat";
	request(xkcd).pipe(res);
});

module.exports = router;
