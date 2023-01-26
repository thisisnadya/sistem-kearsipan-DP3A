const { Schema, models, model } = require("mongoose");

const userSchema = new Schema({
  username: String,
  password: String,
});

const Users = models.user || model("user", userSchema);

export default Users;
