const models = require("../core/models");

// function for getting orders from mongodb database
async function getUserOrders(userId) {
  return await models.orderModel
    .find({
      userId: userId,
    })
    .populate("orderDetails.bookId", ["_id", "title"])
    .sort({ createdOn: -1 });
}

async function getAllOrders() {
  return await models.orderModel
    .find({})
    .populate("orderDetails.bookId", ["_id", "title"])
    .sort({ createdOn: -1 });
}

async function saveOrder(orderDetail) {
  const order = new models.orderModel(orderDetail);
  return await order.save();
}

module.exports = {
  getUserOrders: getUserOrders,
  getAllOrders: getAllOrders,
  saveOrder: saveOrder,
};
