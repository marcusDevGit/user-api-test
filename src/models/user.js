//api-/src/models/user.js
'use strict';
import { Model, Op } from 'sequelize';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import 'dotenv/config';



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
    static async search(query) {
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
          count: entity.count,
          limit: limit,
          offset: offset,
        },
      };
    }
    static async getId(id) {
      return await User.findByPk(id, {});
    }
    static async verifyLogin(email, password) {
      try {
        let user = await User.findOne({
          where: {
            email: email
          },
        })
        if (!user) {
          throw new Error("Email não encontrado")
        }
        if (!bcrypt.compareSync(password, user.password)) {
          throw new Error("Senha incorreta!")
        }

        let token = jwt.sign({
          id: user.id
        }, process.env.SECRET, {
          expiresIn: '1h'
        })
        return {
          user: user.transform(),
          token: token
        }
      } catch (error) {
        throw error
      }
    }
    toJSON() {
      const value = Object.assign({}, this.get());
      delete value.password
      return value
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
    hooks: {
      beforeSave: (user, options) => {
        user.password = bcrypt.hashSync(user.password, 10)
      }
    }
  });
  return User;
};