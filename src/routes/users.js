//api-/src/routes/users.js
import express from 'express';
const router = express.Router();
import userController from '../../controllers/userController.js'; // Importa o controlador de usuários


/* GET users listing. */
//index
router.get('/', userController.index.bind(userController));
//show
router.get('/:id', userController.show.bind(userController));
//store
router.post('/', userController.create.bind(userController));
//update
router.put('/:id', userController.update.bind(userController));
//destroy
router.delete('/:id', userController.destroy.bind(userController));


export default router;
