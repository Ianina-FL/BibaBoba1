const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const dish_ingredients = sequelize.define(
    'dish_ingredients',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      quantity: {
        type: DataTypes.INTEGER,
      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  dish_ingredients.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.dish_ingredients.belongsTo(db.dishes, {
      as: 'dish',
      foreignKey: {
        name: 'dishId',
      },
      constraints: false,
    });

    db.dish_ingredients.belongsTo(db.ingredients, {
      as: 'ingredient',
      foreignKey: {
        name: 'ingredientId',
      },
      constraints: false,
    });

    db.dish_ingredients.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.dish_ingredients.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return dish_ingredients;
};
