var express = require('express');
var router = express.Router();
var knex = require('../db/knex')

function getPosts(){
  return knex('post_tbl')
}

function getComments(){
  return knex('comment_tbl')
}

/* GET home page. */
router.get('/', function(req, res, next) {
  getPosts()
  .orderBy('id', 'asc')
  .then(function(data){
    res.render('index', { post: data });
  })
});

router.post('/blogThis', function(req, res, next){
  getPosts().insert({title: req.body.title, content: req.body.content})
  .then(function(data){
    res.redirect('/')
  })
})

router.get('/:id', function(req,res,next){
  getPosts().where('id', req.params.id)
  .then(function(data){
    res.render('id', {data : data, id : req.params.id})
  })
})

router.post('/:id/update', function(req, res, next){
  getPosts()
  .where('id', req.params.id)
  .update({
    title: req.body.title,
    content: req.body.content
  })
  .then(function(data){
    res.redirect('/')
  })
})

router.get('/:id/delete', function(req, res, next){
  getPosts()
  .where('id', req.params.id)
  .delete()
  .then(function(data){
    res.redirect('/')
  })
})

module.exports = router;
