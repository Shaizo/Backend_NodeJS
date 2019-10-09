'use strict'

var express = require('express');
var ProjectController = require('../controllers/project');

var router = express.Router();

var multipart = require('connect-multiparty');
//Digo donde quiero que se suban los archivos
var multipartMiddleware = multipart({uploadDir: './uploads'})

//Crea las rutas del controlador
router.get('/home', ProjectController.home);
router.post('/test', ProjectController.test);
router.post('/save-project', ProjectController.saveProject);
router.get('/project/:id?', ProjectController.getProject); //el :id es un atributo, y el ? hace que sea opcional ponerlo
router.get('/projects', ProjectController.getProjects);
//.put para la actualización de recursos
router.put('/project/:id', ProjectController.updateProject);
router.delete('/project/:id', ProjectController.deleteProject);
router.post('/upload-image/:id', multipartMiddleware, ProjectController.uploadImage);

module.exports = router;