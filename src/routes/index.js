import express from 'express';
const router = express.Router();
import db from '../models/index.js'; // Importa o banco de dados

/* GET home page. */
router.get('/', (req, res, next) => {
  res.send('Ola Mundo v2');
});

// router.get('/users', async (req, res) => {
//   try {
//     const users = await db.User.findAll(); // Busca todos os usuários no banco
//     attribute: {
//       exclude: ['password'] // Exclui a senha dos resultados
//     }   // Exclui a senha dos resultados
//     res.json(users); // Retorna os usuários como JSON
//   } catch (error) {
//     console.error('Erro ao buscar usuários:', error);
//     res.status(500).json({ error: 'Erro ao buscar usuários' });
//   }
// });

export default router;
