'use strict'

var Project = require('../models/project');
var fs = require('fs');

//La var controller tendra las distintas peticiones que se pueden hacer a la BD
var controller = {

    home: function (req, res) {
        return res.status(200).send({
            message: 'Soy la home'
        });
    },

    test: function (req, res) {
        return res.status(200).send({
            message: 'Soy el metodo o acción test del controlador de project'
        })
    },

    saveProject: function (req, res) {
        var project = new Project();

        var params = req.body;
        project.name = params.name;
        project.description = params.description;
        project.category = params.category;
        project.year = params.year;
        project.langs = params.langs;
        project.image = null;

        project.save((err, projectStored) => {
            if (err) return res.status(500).send({
                message: 'Error al guardar el documento.'
            });

            if (!projectStored) return res.status(404).send({
                message: 'No se ha podido guardar el proyecto'
            });

            return res.status(200).send({
                project: projectStored
            });
        });
    },

    getProject: function (req, res) {
        var projectId = req.params.id;

        if (projectId == null) return res.status(404).send({
            message: 'El proyecto no existe.'
        });

        //Busca por id
        Project.findById(projectId, (err, project) => {
            //Si devuelve un error
            if (err) return res.status(500).send({
                message: 'Error al devolver los datos.'
            });

            //Si no llega el proyecto
            if (!project) return res.status(404).send({
                message: 'El proyecto no existe'
            });

            //Si todo es correcto
            return res.status(200).send({
                project
            })
        });
    },

    getProjects: function (req, res) {

        //Si no hay parametros en el .find, los busca todos
        Project.find({}).exec((err, projects) => {
            if (err) return res.status(500).send({
                message: 'Error al devolver los datos.'
            });

            if (!projects) return res.status(404).send({
                message: 'No hay proyectos que mostrar.'
            });

            return res.status(200).send({
                projects
            });
        });
    },

    updateProject: function (req, res) {
        var projectId = req.params.id;
        var update = req.body;

        //Busca por id y actualiza ese proyecto por los datos que tengamos en el body (TODOS)
        Project.findByIdAndUpdate(projectId, update, {
            new: true
        }, (err, projectUpdated) => {
            if (err) return res.status(500).send({
                message: 'Error al actualizar'
            });

            if (!projectUpdated) return res.status(404).send({
                message: 'No existe el proyecto que se quiere actualizar'
            });

            return res.status(200).send({
                project: projectUpdated
            });
        });
    },

    deleteProject: function (req, res) {
        var projectId = req.params.id;

        Project.findByIdAndDelete(projectId, (err, projectDeleted) => {
            if (err) return res.status(500).send({
                message: 'No se ha podido borrar el proyecto'
            });

            if (!projectDeleted) return res.status(404).send({
                message: 'No existe el proyecto que se quiere borrar'
            });

            return res.status(200).send({
                message: 'Proyecto borrado',
                project: projectDeleted
            });
        });
    },

    uploadImage: function (req, res) {
        var projectId = req.params.id;
        var fileName = 'Imagen no subida...';

        //En caso de que exista la propiedad de que estás subiendo archivos...
        if (req.files) {
            //Carpeta donde se encuentra el archivo
            var filePath = req.files.image.path;
            //Nombre real de la imagen | se corta por '/' porque es lo que devuelve la req
            var fileSplit = filePath.split('/');
            var fileName = fileSplit[1];
            var extSplit = fileName.split('.');
            var fileExt = extSplit[1];

            if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif'){
                Project.findByIdAndUpdate(projectId, { image: fileName }, {new: true}, (err, projectUpdated) => {
                    if (err) return res.status(500).send({
                        message: 'Error al actualizar, la imagen no se ha subido'
                    });
    
                    if (!projectUpdated) return res.status(404).send({
                        message: 'No existe el proyecto que se quiere actualizar'
                    });
                    return res.status(200).send({
                        project: projectUpdated
                    });
                });
           }else{
                fs.unlink (filePath, (err) => {
                    return res.status(200).send({message: 'La extensión no es válida'})
                });
            }
        } else{
            return res.status(200).send({
                message: fileName
            });
        }
    },
};

module.exports = controller;