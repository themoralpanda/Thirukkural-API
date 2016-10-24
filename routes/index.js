var express = require('express');

var router = express.Router();
/* GET home page. */
//router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
//});

//home page display
router.get('/',function(req,res,next){
	var db = req.db;
	var collection = db.get('kurals');
	//var random_id = Math.floor(Math.random() * (1080 - 1 + 1)) + 1;
	var random_id = parseInt(new Date().toLocaleDateString().replace(/\//g,''))%1080;
	collection.find({index: {$eq: random_id}},{firstLine:1, secondLine:1},function(err,docs){
	res.render('todayskural',
		{
			"kural" :docs
		})
	})
	
});


//JSONP endpoint for Thirukkural HTML widget
router.get('/jsonp',function(req,res,next){
	var db = req.db;
	var collection = db.get('kurals');
	//var random_id = Math.floor(Math.random() * (1080 - 1 + 1)) + 1;
	var random_id = parseInt(new Date().toLocaleDateString().replace(/\//g,''))%1080;
	collection.find({index: {$eq: random_id}},{firstLine:1, secondLine:1},function(err,docs){
		console.log(docs[0].firstLine)
		console.log(docs)
		res.jsonp({'todaysKural': docs[0].firstLine +" <br/> "+docs[0].secondLine , "title" : "இன்றைய குறள்",
					"explanation": docs[0].definition_Papaiya,
					"explanation_english": docs[0].explanation,
					"title_explanation": "உரை",
					"copyright": "©"+" infinitekural.net"
					} );
	})

})

//Handler for /widget

router.get('/widget',function(req,res,next){
	var type = parseInt(req.query.type)
})



module.exports = router;
