const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const ingredients = sequelize.define(
    'ingredients',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
        type: DataTypes.TEXT,
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

  ingredients.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.ingredients.hasMany(db.dish_ingredients, {
      as: 'dish_ingredients_ingredient',
      foreignKey: {
        name: 'ingredientId',
      },
      constraints: false,
    });

    //end loop

    db.ingredients.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.ingredients.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return ingredients;
};
