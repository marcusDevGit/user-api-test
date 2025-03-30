//api-/config/db.js
// Arquivo de configuração de conexão com o banco de dados
import mariadb from 'mariadb';
import dontenv from 'dotenv';

dontenv.config();

// Configuração da conexão
const pool = mariadb.createPool({
    host: process.env.DB_HOST, // Host do banco de dados
    user: process.env.DB_USER,      // Usuário
    password: process.env.DB_PASSWORD, // Senha
    database: process.env.DB_DATABASE, // Nome do banco
    port: process.env.DB_PORT || 3306, // Porta
    connectionLimit: 5, // Limite de conexões simultâneas
});

async function connectDB() {
    try {
        const connection = await pool.getConnection();
        console.log('Conexão bem-sucedida com o banco de dados!');
        connection.release();
        return connection;
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
        throw error;
    }
}
// testar conexão
connectDB()
    .then(() => console.log('Teste de conexão bem-sucedido!'))
    .catch((error) => console.error('Erro ao conectar ao banco de dados:', error));


export default connectDB;