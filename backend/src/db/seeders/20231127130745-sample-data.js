const db = require('../models');
const Users = db.users;

const ClientAddresses = db.client_addresses;

const Clients = db.clients;

const DishIngredients = db.dish_ingredients;

const Dishes = db.dishes;

const DishesOrdered = db.dishes_ordered;

const Ingredients = db.ingredients;

const Orders = db.orders;

const Sources = db.sources;

const ClientAddressesData = [
  {
    // type code here for "relation_one" field

    street: 'Main St',

    house_number: '123',

    code: '10001',

    flat_number: '1A',
  },

  {
    // type code here for "relation_one" field

    street: 'Broadway',

    house_number: '456',

    code: '10002',

    flat_number: '2B',
  },

  {
    // type code here for "relation_one" field

    street: '5th Ave',

    house_number: '789',

    code: '10003',

    flat_number: '3C',
  },

  {
    // type code here for "relation_one" field

    street: 'Wall St',

    house_number: '101',

    code: '10004',

    flat_number: '4D',
  },
];

const ClientsData = [
  {
    name: 'John Doe',

    phone: '5551234567',
  },

  {
    name: 'Jane Smith',

    phone: '5559876543',
  },

  {
    name: 'Emily Johnson',

    phone: '5557654321',
  },

  {
    name: 'Michael Brown',

    phone: '5552345678',
  },
];

const DishIngredientsData = [
  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    quantity: 2,
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    quantity: 1,
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    quantity: 1,
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    quantity: 3,
  },
];

const DishesData = [
  {
    name: 'Poached Egg Sandwich',

    cutlery: true,

    price: 5.99,
  },

  {
    name: 'Pancakes',

    cutlery: true,

    price: 7.49,
  },

  {
    name: 'Porridge',

    cutlery: false,

    price: 4.99,
  },

  {
    name: 'English Breakfast',

    cutlery: true,

    price: 9.99,
  },
];

const DishesOrderedData = [
  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    quantity: 2,
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    quantity: 1,
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    quantity: 3,
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    quantity: 1,
  },
];

const IngredientsData = [
  {
    name: 'Eggs',
  },

  {
    name: 'Flour',
  },

  {
    name: 'Milk',
  },

  {
    name: 'Bacon',
  },
];

const OrdersData = [
  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    order_received: new Date('2023-10-01T08:00:00Z'),

    order_ready: new Date('2023-10-01T09:00:00Z'),

    order_delivered: new Date('2023-10-01T10:00:00Z'),

    order_rejected: new Date(),

    repeated: false,
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    order_received: new Date('2023-10-02T11:00:00Z'),

    order_ready: new Date('2023-10-02T12:00:00Z'),

    order_delivered: new Date('2023-10-02T13:00:00Z'),

    order_rejected: new Date(),

    repeated: true,
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    order_received: new Date('2023-10-03T14:00:00Z'),

    order_ready: new Date('2023-10-03T15:00:00Z'),

    order_delivered: new Date('2023-10-03T16:00:00Z'),

    order_rejected: new Date(),

    repeated: true,
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    order_received: new Date('2023-10-04T17:00:00Z'),

    order_ready: new Date('2023-10-04T18:00:00Z'),

    order_delivered: new Date('2023-10-04T19:00:00Z'),

    order_rejected: new Date(),

    repeated: true,
  },
];

const SourcesData = [
  {
    source_name: 'Online',
  },

  {
    source_name: 'Phone',
  },

  {
    source_name: 'App',
  },

  {
    source_name: 'Walk-in',
  },
];

// Similar logic for "relation_many"

async function associateClientAddressWithClient() {
  const relatedClient0 = await Clients.findOne({
    offset: Math.floor(Math.random() * (await Clients.count())),
  });
  const ClientAddress0 = await ClientAddresses.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (ClientAddress0?.setClient) {
    await ClientAddress0.setClient(relatedClient0);
  }

  const relatedClient1 = await Clients.findOne({
    offset: Math.floor(Math.random() * (await Clients.count())),
  });
  const ClientAddress1 = await ClientAddresses.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (ClientAddress1?.setClient) {
    await ClientAddress1.setClient(relatedClient1);
  }

  const relatedClient2 = await Clients.findOne({
    offset: Math.floor(Math.random() * (await Clients.count())),
  });
  const ClientAddress2 = await ClientAddresses.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (ClientAddress2?.setClient) {
    await ClientAddress2.setClient(relatedClient2);
  }

  const relatedClient3 = await Clients.findOne({
    offset: Math.floor(Math.random() * (await Clients.count())),
  });
  const ClientAddress3 = await ClientAddresses.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (ClientAddress3?.setClient) {
    await ClientAddress3.setClient(relatedClient3);
  }
}

async function associateDishIngredientWithDish() {
  const relatedDish0 = await Dishes.findOne({
    offset: Math.floor(Math.random() * (await Dishes.count())),
  });
  const DishIngredient0 = await DishIngredients.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (DishIngredient0?.setDish) {
    await DishIngredient0.setDish(relatedDish0);
  }

  const relatedDish1 = await Dishes.findOne({
    offset: Math.floor(Math.random() * (await Dishes.count())),
  });
  const DishIngredient1 = await DishIngredients.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (DishIngredient1?.setDish) {
    await DishIngredient1.setDish(relatedDish1);
  }

  const relatedDish2 = await Dishes.findOne({
    offset: Math.floor(Math.random() * (await Dishes.count())),
  });
  const DishIngredient2 = await DishIngredients.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (DishIngredient2?.setDish) {
    await DishIngredient2.setDish(relatedDish2);
  }

  const relatedDish3 = await Dishes.findOne({
    offset: Math.floor(Math.random() * (await Dishes.count())),
  });
  const DishIngredient3 = await DishIngredients.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (DishIngredient3?.setDish) {
    await DishIngredient3.setDish(relatedDish3);
  }
}

async function associateDishIngredientWithIngredient() {
  const relatedIngredient0 = await Ingredients.findOne({
    offset: Math.floor(Math.random() * (await Ingredients.count())),
  });
  const DishIngredient0 = await DishIngredients.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (DishIngredient0?.setIngredient) {
    await DishIngredient0.setIngredient(relatedIngredient0);
  }

  const relatedIngredient1 = await Ingredients.findOne({
    offset: Math.floor(Math.random() * (await Ingredients.count())),
  });
  const DishIngredient1 = await DishIngredients.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (DishIngredient1?.setIngredient) {
    await DishIngredient1.setIngredient(relatedIngredient1);
  }

  const relatedIngredient2 = await Ingredients.findOne({
    offset: Math.floor(Math.random() * (await Ingredients.count())),
  });
  const DishIngredient2 = await DishIngredients.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (DishIngredient2?.setIngredient) {
    await DishIngredient2.setIngredient(relatedIngredient2);
  }

  const relatedIngredient3 = await Ingredients.findOne({
    offset: Math.floor(Math.random() * (await Ingredients.count())),
  });
  const DishIngredient3 = await DishIngredients.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (DishIngredient3?.setIngredient) {
    await DishIngredient3.setIngredient(relatedIngredient3);
  }
}

async function associateDishesOrderedWithOrder() {
  const relatedOrder0 = await Orders.findOne({
    offset: Math.floor(Math.random() * (await Orders.count())),
  });
  const DishesOrdered0 = await DishesOrdered.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (DishesOrdered0?.setOrder) {
    await DishesOrdered0.setOrder(relatedOrder0);
  }

  const relatedOrder1 = await Orders.findOne({
    offset: Math.floor(Math.random() * (await Orders.count())),
  });
  const DishesOrdered1 = await DishesOrdered.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (DishesOrdered1?.setOrder) {
    await DishesOrdered1.setOrder(relatedOrder1);
  }

  const relatedOrder2 = await Orders.findOne({
    offset: Math.floor(Math.random() * (await Orders.count())),
  });
  const DishesOrdered2 = await DishesOrdered.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (DishesOrdered2?.setOrder) {
    await DishesOrdered2.setOrder(relatedOrder2);
  }

  const relatedOrder3 = await Orders.findOne({
    offset: Math.floor(Math.random() * (await Orders.count())),
  });
  const DishesOrdered3 = await DishesOrdered.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (DishesOrdered3?.setOrder) {
    await DishesOrdered3.setOrder(relatedOrder3);
  }
}

async function associateDishesOrderedWithDish() {
  const relatedDish0 = await Dishes.findOne({
    offset: Math.floor(Math.random() * (await Dishes.count())),
  });
  const DishesOrdered0 = await DishesOrdered.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (DishesOrdered0?.setDish) {
    await DishesOrdered0.setDish(relatedDish0);
  }

  const relatedDish1 = await Dishes.findOne({
    offset: Math.floor(Math.random() * (await Dishes.count())),
  });
  const DishesOrdered1 = await DishesOrdered.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (DishesOrdered1?.setDish) {
    await DishesOrdered1.setDish(relatedDish1);
  }

  const relatedDish2 = await Dishes.findOne({
    offset: Math.floor(Math.random() * (await Dishes.count())),
  });
  const DishesOrdered2 = await DishesOrdered.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (DishesOrdered2?.setDish) {
    await DishesOrdered2.setDish(relatedDish2);
  }

  const relatedDish3 = await Dishes.findOne({
    offset: Math.floor(Math.random() * (await Dishes.count())),
  });
  const DishesOrdered3 = await DishesOrdered.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (DishesOrdered3?.setDish) {
    await DishesOrdered3.setDish(relatedDish3);
  }
}

async function associateOrderWithClient() {
  const relatedClient0 = await Clients.findOne({
    offset: Math.floor(Math.random() * (await Clients.count())),
  });
  const Order0 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Order0?.setClient) {
    await Order0.setClient(relatedClient0);
  }

  const relatedClient1 = await Clients.findOne({
    offset: Math.floor(Math.random() * (await Clients.count())),
  });
  const Order1 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Order1?.setClient) {
    await Order1.setClient(relatedClient1);
  }

  const relatedClient2 = await Clients.findOne({
    offset: Math.floor(Math.random() * (await Clients.count())),
  });
  const Order2 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Order2?.setClient) {
    await Order2.setClient(relatedClient2);
  }

  const relatedClient3 = await Clients.findOne({
    offset: Math.floor(Math.random() * (await Clients.count())),
  });
  const Order3 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Order3?.setClient) {
    await Order3.setClient(relatedClient3);
  }
}

async function associateOrderWithSource() {
  const relatedSource0 = await Sources.findOne({
    offset: Math.floor(Math.random() * (await Sources.count())),
  });
  const Order0 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Order0?.setSource) {
    await Order0.setSource(relatedSource0);
  }

  const relatedSource1 = await Sources.findOne({
    offset: Math.floor(Math.random() * (await Sources.count())),
  });
  const Order1 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Order1?.setSource) {
    await Order1.setSource(relatedSource1);
  }

  const relatedSource2 = await Sources.findOne({
    offset: Math.floor(Math.random() * (await Sources.count())),
  });
  const Order2 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Order2?.setSource) {
    await Order2.setSource(relatedSource2);
  }

  const relatedSource3 = await Sources.findOne({
    offset: Math.floor(Math.random() * (await Sources.count())),
  });
  const Order3 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Order3?.setSource) {
    await Order3.setSource(relatedSource3);
  }
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await ClientAddresses.bulkCreate(ClientAddressesData);

    await Clients.bulkCreate(ClientsData);

    await DishIngredients.bulkCreate(DishIngredientsData);

    await Dishes.bulkCreate(DishesData);

    await DishesOrdered.bulkCreate(DishesOrderedData);

    await Ingredients.bulkCreate(IngredientsData);

    await Orders.bulkCreate(OrdersData);

    await Sources.bulkCreate(SourcesData);

    await Promise.all([
      // Similar logic for "relation_many"

      await associateClientAddressWithClient(),

      await associateDishIngredientWithDish(),

      await associateDishIngredientWithIngredient(),

      await associateDishesOrderedWithOrder(),

      await associateDishesOrderedWithDish(),

      await associateOrderWithClient(),

      await associateOrderWithSource(),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('client_addresses', null, {});

    await queryInterface.bulkDelete('clients', null, {});

    await queryInterface.bulkDelete('dish_ingredients', null, {});

    await queryInterface.bulkDelete('dishes', null, {});

    await queryInterface.bulkDelete('dishes_ordered', null, {});

    await queryInterface.bulkDelete('ingredients', null, {});

    await queryInterface.bulkDelete('orders', null, {});

    await queryInterface.bulkDelete('sources', null, {});
  },
};
