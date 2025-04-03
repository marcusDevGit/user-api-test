//api-/src/routes/users.js
import express from 'express';
const router = express.Router();
import userController from '../../controllers/userController.js'; // Importa o controlador de usuários
//midllerware
import verifyAccessToken from './midlleware/verifyAccessToken.js';
import verifyOwner from './midlleware/verifyOwner.js';

const onlyAllowOwner = [verifyAccessToken, verifyOwner]

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
router.put('/:id', onlyAllowOwner, userController.bindMethod("update"));
//destroy
router.delete('/:id', onlyAllowOwner, userController.bindMethod("destroy"));


export default router;
