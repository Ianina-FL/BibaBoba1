const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Dish_ingredientsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const dish_ingredients = await db.dish_ingredients.create(
      {
        id: data.id || undefined,

        quantity: data.quantity || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await dish_ingredients.setDish(data.dish || null, {
      transaction,
    });

    await dish_ingredients.setIngredient(data.ingredient || null, {
      transaction,
    });

    return dish_ingredients;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const dish_ingredientsData = data.map((item, index) => ({
      id: item.id || undefined,

      quantity: item.quantity || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const dish_ingredients = await db.dish_ingredients.bulkCreate(
      dish_ingredientsData,
      { transaction },
    );

    // For each item created, replace relation files

    return dish_ingredients;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const dish_ingredients = await db.dish_ingredients.findByPk(
      id,
      {},
      { transaction },
    );

    await dish_ingredients.update(
      {
        quantity: data.quantity || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await dish_ingredients.setDish(data.dish || null, {
      transaction,
    });

    await dish_ingredients.setIngredient(data.ingredient || null, {
      transaction,
    });

    return dish_ingredients;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const dish_ingredients = await db.dish_ingredients.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of dish_ingredients) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of dish_ingredients) {
        await record.destroy({ transaction });
      }
    });

    return dish_ingredients;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const dish_ingredients = await db.dish_ingredients.findByPk(id, options);

    await dish_ingredients.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await dish_ingredients.destroy({
      transaction,
    });

    return dish_ingredients;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const dish_ingredients = await db.dish_ingredients.findOne(
      { where },
      { transaction },
    );

    if (!dish_ingredients) {
      return dish_ingredients;
    }

    const output = dish_ingredients.get({ plain: true });

    output.dish = await dish_ingredients.getDish({
      transaction,
    });

    output.ingredient = await dish_ingredients.getIngredient({
      transaction,
    });

    return output;
  }

  static async findAll(filter, options) {
    const limit = filter.limit || 0;
    let offset = 0;
    const currentPage = +filter.page;

    offset = currentPage * limit;

    const orderBy = null;

    const transaction = (options && options.transaction) || undefined;
    let where = {};
    let include = [
      {
        model: db.dishes,
        as: 'dish',
      },

      {
        model: db.ingredients,
        as: 'ingredient',
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.quantityRange) {
        const [start, end] = filter.quantityRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            quantity: {
              ...where.quantity,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            quantity: {
              ...where.quantity,
              [Op.lte]: end,
            },
          };
        }
      }

      if (
        filter.active === true ||
        filter.active === 'true' ||
        filter.active === false ||
        filter.active === 'false'
      ) {
        where = {
          ...where,
          active: filter.active === true || filter.active === 'true',
        };
      }

      if (filter.dish) {
        const listItems = filter.dish.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          dishId: { [Op.or]: listItems },
        };
      }

      if (filter.ingredient) {
        const listItems = filter.ingredient.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          ingredientId: { [Op.or]: listItems },
        };
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.lte]: end,
            },
          };
        }
      }
    }

    let { rows, count } = options?.countOnly
      ? {
          rows: [],
          count: await db.dish_ingredients.count({
            where,
            include,
            distinct: true,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            order:
              filter.field && filter.sort
                ? [[filter.field, filter.sort]]
                : [['createdAt', 'desc']],
            transaction,
          }),
        }
      : await db.dish_ingredients.findAndCountAll({
          where,
          include,
          distinct: true,
          limit: limit ? Number(limit) : undefined,
          offset: offset ? Number(offset) : undefined,
          order:
            filter.field && filter.sort
              ? [[filter.field, filter.sort]]
              : [['createdAt', 'desc']],
          transaction,
        });

    //    rows = await this._fillWithRelationsAndFilesForRows(
    //      rows,
    //      options,
    //    );

    return { rows, count };
  }

  static async findAllAutocomplete(query, limit) {
    let where = {};

    if (query) {
      where = {
        [Op.or]: [
          { ['id']: Utils.uuid(query) },
          Utils.ilike('dish_ingredients', 'dish', query),
        ],
      };
    }

    const records = await db.dish_ingredients.findAll({
      attributes: ['id', 'dish'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['dish', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.dish,
    }));
  }
};
