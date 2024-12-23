const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const dishes_order = sequelize.define(
    'dishes_order',
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

  dishes_order.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.dishes_order.belongsTo(db.orders, {
      as: 'order',
      foreignKey: {
        name: 'orderId',
      },
      constraints: false,
    });

    db.dishes_order.belongsTo(db.dishes, {
      as: 'dish',
      foreignKey: {
        name: 'dishId',
      },
      constraints: false,
    });

    db.dishes_order.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.dishes_order.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return dishes_order;
};
