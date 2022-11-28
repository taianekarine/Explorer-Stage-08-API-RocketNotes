const { Router } = require('express');
const multer = require('multer');
const uploadConfig = require('../Configs/updload');

const UsersController = require('../controllers/UsersController')
const ensureAuthenticated = require('../Middlewares/ensureAuthenticated');

const usersRoutes = Router();
const uplodad = multer(uploadConfig.MULTER);


const usersController = new UsersController()


usersRoutes.post('/', usersController.create);
usersRoutes.put('/', ensureAuthenticated, usersController.update); // ensureAuthenticated capitura autenticação.
usersRoutes.patch('/avatar', ensureAuthenticated, uplodad.single('avatar'), (request, response ) => {
  console.log(request.file.filename);
  return response.json();
});




module.exports = usersRoutes;