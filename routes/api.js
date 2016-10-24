var express = require('express');
var router = express.Router();
var path = require('path');

//Handler for /api 
router.get('/',function(req,res,next){
	res.sendFile(path.join(__dirname, '../public', 'api.html'));
})

//Handler for /api/kurals

//logic to fix the target if multiple parameters are given
var fixTarget = function(req,res,next){
	if(req.params.start && req.params.end){
		req.target = "range"
	}
	else
	{ 
		if(req.query.id){
			if(parseInt(req.query.id)>0 &&parseInt(req.query.id)<=1330)
				req.target = "id"
			else
				req.target = "id_error"
		}
		if(req.query.chapter)
			req.target = "chapter"
		if(req.query.chaptergroup)
			req.target = "chaptergroup"
		if(req.query.section)
			req.target = "section"
	}
	next()
}
//logic to search for the kural based on id
var searchKural = function(req,res,next){
	var db = req.db;
	var collection = db.get('kurals');
	
	
	var id = parseInt(req.query.id)
	var section = req.query.section
	var chapter = req.query.chapter
	var chaptergroup = req.query.chaptergroup
	res.setHeader('Content-Type', 'application/json');

	
	if(req.target.localeCompare("range")==0){

		var start = parseInt(req.params.start)
		var end = parseInt(req.params.end)
		
		if(req.path.includes("kurals/id")){
			if(start>0 &&start<=1330 &&end>0 &&end<=1330 && start<=end){
			collection.find({index: {$gte: start,$lte: end}},
							{sort : {index : 1}},function(err,docs){
				if(err)
					console.log(err)
				for(var i=0;i< docs.length; i++){
					delete docs[i]._id
				}
				
				
				//res.setHeader('Content-Type', 'application/json');
				res.send(JSON.stringify(docs,null, 3))
			})
		}
		else
			res.status(400).send({error: 'Please check the range. The id should be between 1 to 1330.'})	
	   }else if(req.path.includes("kurals/chaptergroup")){

	   	if(start>0 &&start<=13 &&end>0 &&end<=13 && start<=end){
	   		collection.find({CG_id: {$gte: start,$lte: end}},
						{sort : {index : 1}},function(err,docs){
			if(err)
				console.log(err)
			for(var i=0;i< docs.length; i++){
				delete docs[i]._id
			}
			
			
		//	res.setHeader('Content-Type', 'application/json');
			res.send(JSON.stringify(docs,null, 3))
			})
	   	}
	   	else
	   		res.status(400).send({error:'Please check the range. The chapter group id should be between 1 to 13'})
	   }else if(req.path.includes("kurals/chapter")){
	   	if(start>0 &&start<=133 &&end>0 &&end<=133 && start<=end){

	   		collection.find({chapter_id: {$gte: start,$lte: end}},
						{sort : {index : 1}},function(err,docs){
			if(err)
				console.log(err)
			for(var i=0;i< docs.length; i++){
				delete docs[i]._id
			}
			
			
		//	res.setHeader('Content-Type', 'application/json');
			res.send(JSON.stringify(docs,null, 3))
		})
		}
		else
			res.status(400).send({error: 'Please check the range. The chapters id should be less than 1 to 133'})
	   }else if(req.path.includes("kurals/section")){
	   	if(start>0 &&start<=3 &&end>0 &&end<=3 && start<=end){

	   		collection.find({section_id: {$gte: start,$lte: end}},
						{sort : {index : 1}},function(err,docs){
			if(err)
				console.log(err)
			for(var i=0;i< docs.length; i++){
				delete docs[i]._id
			}
			
			
		//	res.setHeader('Content-Type', 'application/json');
			res.send(JSON.stringify(docs,null, 3))
		})
	   	}
	   	else
	   		res.status(400).send({error:'Please check the range. There are only 3 sections available in thirukkural'})
	   }

	}
	else{

	
	if(req.target.localeCompare("id")==0){
		collection.find({index: {$eq: id}},'-_id',function(err,docs){
			if(err)
				console.log(err)
			
			
			res.send(JSON.stringify(docs,null, 3))
		})
	}
	else if(req.target.localeCompare("section")==0){
		collection.find(
			{$or: 
			[
			 {section_english: findSection(section)},
			 {section_translate: findSection(section)}
			]}
			 ,{sort : {index : 1}},function(err,docs){
			if(err)
				console.log(err)
			for(var i=0;i< docs.length; i++){
				delete docs[i]._id
			}
			
			
		//	res.setHeader('Content-Type', 'application/json');
			res.send(JSON.stringify(docs,null, 3))
		})
	}
	else if(req.target.localeCompare("chaptergroup")==0){
		var cg = req.query.chaptergroup;
		var count = req.query.count;
		
		if(count && count > 0)
			count = parseInt(count);
		else
			count = 0;
		
		collection.find(
			{$or: 
			[
			 {CG_english: { $regex: new RegExp("^" + cg.toLowerCase(), "i") }},
			 {CG_translate: { $regex: new RegExp("^" + cg.toLowerCase(), "i") }}
			]}
			 ,{sort : {index : 1},
			   limit : count},function(err,docs){
			if(err)
				console.log(err)
			for(var i=0;i< docs.length; i++){
				delete docs[i]._id
			}
			
			
		//	res.setHeader('Content-Type', 'application/json');
			res.send(JSON.stringify(docs,null, 3))
		}) 
	}
	else if(req.target.localeCompare("chapter")==0){
		var chp = req.query.chapter;
		var count = req.query.count;
		
		if(count && count>0 && count<=10)
			count = parseInt(count);
		else
			count = 0;
		
		collection.find(
			{$or: 
			[
			 {chapter_english: { $regex: new RegExp("^" + chp.toLowerCase(), "i") }},
			 {chapter_translate: { $regex: new RegExp("^" + chp.toLowerCase(), "i") }}
			]}
			 ,{sort : {index : 1},
			   limit : count},function(err,docs){
			if(err)
				
			for(var i=0;i< docs.length; i++){
				delete docs[i]._id
			}
			
			
		//	res.setHeader('Content-Type', 'application/json');
			res.send(JSON.stringify(docs,null, 3))
		}) 
	}
 }

}

function findSection(section){
	if(section){
			var regex1 = new RegExp("^a.*r.*t.*p.*a.*l.*", "i"),
			regex2 = new RegExp("^p.*r.*t.*p.*a.*l.*", "i"),
			regex3 = new RegExp("^k.*a.*m.*t.*p.*a.*l.*", "i"),
			regex4 = new RegExp("^w.*e.*l.*t.*h.*", "i"),
			regex5 = new RegExp("^l.*o.*v.*e.*", "i"),
			regex6 = new RegExp("^v.*r.*t.*u.*e.*", "i");

			if(regex1.test(section))
				return "Araththuppaal 1"
			else if(regex2.test(section))
				return "Porutpaal 2"
			else if(regex3.test(section))
				return "Kaamaththuppaal 3"
			else if(regex4.test(section))
				return "Wealth"
			else if(regex5.test(section))
				return "Love"
			else if(regex6.test(section))
				return "Virtue"
			else
				return null			
	}
}
//logic to search for today's kural
var searchKural_today = function(req,res, next){
	//logic to search for the kural
	var db = req.db;
	var collection = db.get('kurals');
	
	var random_id = parseInt(new Date().toLocaleDateString().replace(/\//g,''))%1080;
	collection.find({index: {$eq: random_id}},'-_id',function(err,docs){
			if(err)
				console.log(err)
			
			
			res.setHeader('Content-Type', 'application/json');
			res.send(JSON.stringify(docs,null, 3))
		})
	
}



router.get('/kurals',fixTarget,searchKural);
router.get('/kurals/id/:start-:end',fixTarget,searchKural)
router.get('/todayskural',searchKural_today);
router.get('/kurals/chaptergroup/:start-:end',fixTarget,searchKural)
router.get('/kurals/chapter/:start-:end',fixTarget,searchKural)
router.get('/kurals/section/:start-:end',fixTarget,searchKural);



module.exports = router;
