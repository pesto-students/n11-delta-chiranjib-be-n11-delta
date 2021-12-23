const models = require("../core/models");

// function for getting orders from mongodb database
async function getUserOrders(userId) {
  return await models.orderModel.find({
      userId: userId
  }).populate('orderDetails.bookId', ['_id', 'title']);
}

async function getAllOrders() {
    return await models.orderModel.find({});
}

function saveOrder(orderDetail) {
  const order = new models.orderModel(orderDetail);
  order.save((err, result)=> {
    if (err) {
      throw err;
    } else {
      return result;
    }
  });
}

module.exports = {
  getUserOrders: getUserOrders,
  getAllOrders: getAllOrders,
  saveOrder: saveOrder
};
