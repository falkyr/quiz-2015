var express = require('express');
var router = express.Router();

// Se importa el controlador para las preguntas
var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {
    title: 'Quiz',
    errors: []
  });
});

// Autoload de comandos con :quizId
router.param('quizId', quizController.load); // autoload :quizId

// Definición de rutas de /quizes
router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/new', quizController.new);
router.post('/quizes/create', quizController.create);
router.put('/quizes/:quizId(\\d+)', quizController.update);
router.get('/quizes/:quizId(\\d+)/edit', quizController.edit);
router.delete('/quizes/:quizId(\\d+)', quizController.destroy)

// Comentarios
router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizes/:quizId(\\d+)/comments', commentController.create);

//Página del autor
router.get('/author', quizController.author);

module.exports = router;
