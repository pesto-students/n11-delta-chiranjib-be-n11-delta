const models = require("../core/models");

// function for getting users from mongodb database
async function getUsersByTimestamp(skip, limit) {
  return await models.userModel.find().sort({_id:-1}).skip(skip).limit(limit);
}

async function getUserById(_id) {
  return await models.userModel.findById(_id);
}

async function updateUserName(user_id, username) {
  models.userModel.updateOne(
    { _id: user_id },
    { username: username },
    function (err, result) {
      if (err) {
        console.log(err);
        throw err;
      } else {
        console.log(result);
        return result;
      }
    }
  )
}

module.exports = {
    getUsersByTimestamp: getUsersByTimestamp,
    getUserById: getUserById,
    updateUserName: updateUserName
};
