//api-/src/models/user.js
'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

    }
    static async seach(query) {
      const limit = query.limit ? parseInt(query.limit) : 20;
      const offset = query.offset ? parseInt(query.offset) : 0;
      let where = {};
      if (query.name) where.name = {
        [Op.like]: `%${query.name}%`,
      }
      if (query.email) where.email = query.email;

      const entity = await User.findAndCountAll({
        where,
        limit: limit,
        offset: offset,
        order: [['created_at', 'DESC']],
      });
      return {
        entity: entity.rows,
        meta: {
          caunt: entity.count,
          limit: limit,
          offset: offset,
        },
      };
    }
    static async getId(id) {

      return await User.findByPk(id, {});
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "O nome e obrigatório",
        },
      }
    },
    description: DataTypes.STRING,
    pic: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "O e-mail e obrigatório",
        },
        isEmail: {
          msg: "O e-mail deve ser válido",
        },
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "A senha e obrigatório",
        },
      }
    },
  }, {
    sequelize,
    modelName: 'User',
    underscored: true,
  });
  return User;
};