const { Router } = require("express");
const router = Router();
const { body, validationResult } = require('express-validator');



router.get('/:tag', function (req, res) {
    const {tag} = req.params; 
    var client_id = 'HHuKgPvK_WOfTLO2aSBB';
    var client_secret = 'qxFVxwyfmZ';
    var query =tag; //번역해야할 단어(영어)
   
    var api_url = 'https://openapi.naver.com/v1/papago/n2mt';
    var request = require('request');
    var options = {
       url: api_url,
       form: {'source':'ko', 'target':'en', 'text':query},
       headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
    };
   request.post(options, function (error, response, body) {
    console.log(body); 
     if (!error && response.statusCode == 200) {
       res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
       res.end(body);
     } else {
       res.status(response.statusCode).end();
       console.log('error = ' + response.statusCode);
     }
   });
 });
 module.exports = router;