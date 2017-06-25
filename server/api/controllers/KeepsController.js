"use strict";

/**
 * KeepsController
 * @description :: Server-side logic for ...
 */

module.exports = {
	getUserKeep : function(req,res){
		Keeps.find({userId : req.params.id}).exec(function(err, data){
			if(err) return ;
			res.ok(data);
		});
	}
};
