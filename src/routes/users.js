//api-/src/routes/users.js
import express from 'express';
const router = express.Router();
import userController from '../../controllers/userController.js'; // Importa o controlador de usuários
import verifyAccessToken from './midlleware/verifyAccessToken.js';


//Autentication
//Login
router.post('/login', userController.bindMethod("login"));

/* GET users listing. */
//index
router.get('/', verifyAccessToken, userController.bindMethod("index"));
//show
router.get('/:id', verifyAccessToken, userController.bindMethod("show"));
//store
router.post('/', userController.bindMethod("create"));
//update
router.put('/:id', verifyAccessToken, userController.bindMethod("update"));
//destroy
router.delete('/:id', verifyAccessToken, userController.bindMethod("destroy"));


export default router;
