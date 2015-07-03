var models = require( '../models/models.js' );

// Autoload - factoriza el código si ruta incluye :quizId
exports.load = function(req, res, next, quizId) {
  models.Quiz.find(quizId).then(
    function(quiz) {
      if (quiz) {
        req.quiz = quiz;
        next();
      } else {
        next(new Error("No existe quizId="+quizId));
      }
    }
  ).catch(function(error){ next(error); });
};

// GET /quizes
exports.index = function( req, res ){

  //@FIX

  if (req.query.search){
    var search = req.query.search;
    words = search.replace(' ', '%'); // Se reemplazan los espacios por % para incluir todas las palabras en la búsqueda
    query = "pregunta like '%"+words+"%'";



    models.Quiz.findAll({where: [query, search], order: ['pregunta']}).then(function(quizes) {
      res.render('quizes/index.ejs', { quizes: quizes });
    })
  }else{
    models.Quiz.findAll().then(function(quizes) {
      res.render('quizes/index.ejs', { quizes: quizes });
    })
  }
};

// GET /quizes/:id
exports.show = function(req, res) {
  models.Quiz.find(req.params.quizId).then( function (quiz) {
    res.render('quizes/show', { quiz: req.quiz });
  })
};

// GET /quizes/:id/answer
exports.answer = function(req, res) {
  models.Quiz.find(req.params.quizId).then( function (quiz) {
    if (req.query.respuesta.toLowerCase() === req.quiz.respuesta.toLowerCase()) {
      res.render('quizes/answer', { quiz:quiz, respuesta: 'correcta'});
    }else{
      res.render('quizes/answer', { quiz: req.quiz, respuesta: 'incorrecta'});
    }
  })
};

// GET /quizes/new
exports.new = function(req, res){
  var quiz = models.Quiz.build( // Crea objeto quiz
    { pregunta: "Pregunta", respuesta: "Respuesta"}
  );

  res.render('quizes/new', {quiz: quiz});
}

// GET /quizes/create
exports.create = function(req, res){
  var quiz = models.Quiz.build( req.body.quiz );

  // guarda en DB los campos pregunta y respuesta de quiz
  quiz.save({fields: ["pregunta", "respuesta"]}).then(function(){
      res.redirect('/quizes');
  });  // Redirección HTTP (URL relativo) lista preguntas

};


// GET /author
exports.author = function(req, res) {
  res.render('author');
};
