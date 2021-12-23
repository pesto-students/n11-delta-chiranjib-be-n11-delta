const { model } = require("mongoose");
const models = require("../core/models");

// function for getting orders from mongodb database
async function getUserCart(userId) {
  return await models.cartModel
    .findOne({
      userId: userId,
    })
    .populate("orderDetails.bookId");
}

async function saveCart(userId, cartDetail) {
  await models.cartModel.updateOne({ userId: userId }, cartDetail, {
    upsert: true,
    setDefaultsOnInsert: true,
  });
}

async function deleteCart(userId) {
  await models.cartModel.deleteOne({ userId: userId });
}

module.exports = {
  getUserCart: getUserCart,
  saveCart: saveCart,
  deleteCart: deleteCart,
};
