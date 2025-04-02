//api-/src/routes/users.js
import express from 'express';
const router = express.Router();
import userController from '../../controllers/userController.js'; // Importa o controlador de usuários

//Autentication
//Login
router.post('/login', userController.bindMethod("login"));

/* GET users listing. */
//index
router.get('/', userController.bindMethod("index"));
//show
router.get('/:id', userController.bindMethod("show"));
//store
router.post('/', userController.bindMethod("create"));
//update
router.put('/:id', userController.bindMethod("update"));
//destroy
router.delete('/:id', userController.bindMethod("destroy"));


export default router;
