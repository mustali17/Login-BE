const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/User");

const JWT_SECRET = "GIrWAiTzbb9C8gFwkuI2C3nd7PEqHDUkkpo1QYSlmk0";

const registerUser = async (username, email, password) => {
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  return { id: newUser.id, username: newUser.username, email: newUser.email };
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });

  return { token, user: { id: user.id, username: user.username } };
};

const getAllUsers = async () => {
  return await User.findAll({
    attributes: ["id", "username", "email"],
  });
};

const deleteUser = async (id) => {
  return await User.destroy({ where: { id } });
};

const updateUser = async (id, data) => {
  const user = await User.findByPk(id);
  if (!user) throw new Error("User not found");

  await user.update(data);
  return user;
};

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  deleteUser,
  updateUser,
};
