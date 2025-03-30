const db = require('./src/models');

(async () => {
    try {
        // Sincronizar o banco de dados (opcional, apenas para garantir que as tabelas existam)
        await db.sequelize.sync();

        // Criar usuários no banco de dados
        const users = await db.User.bulkCreate([
            {
                name: 'John Doe',
                description: 'A sample user',
                pic: 'profile1.jpg',
                email: 'john.doe@example.com',
                password: 'securepassword',
            },
            {
                name: 'Jane Smith',
                description: 'Another sample user',
                pic: 'profile2.jpg',
                email: 'jane.smith@example.com',
                password: 'anothersecurepassword',
            },
            {
                name: 'Alice Johnson',
                description: 'Yet another user',
                pic: 'profile3.jpg',
                email: 'alice.johnson@example.com',
                password: 'yetanotherpassword',
            },
        ]);

        console.log('Usuários criados com sucesso:', users.map(user => user.toJSON()));

        // Fechar a conexão com o banco de dados
        await db.sequelize.close();
    } catch (error) {
        console.error('Erro ao popular o banco de dados:', error);
    }
})();