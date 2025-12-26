const userService = require("../services/userService");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const user = await userService.registerUser(username, email, password);
    res
      .status(201)
      .json({ message: "User registered successfully", data: user });
  } catch (error) {
    const status = error.message === "User already exists" ? 409 : 500;
    res.status(status).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await userService.loginUser(email, password);
    res.status(200).json({ message: "Login successful", ...result });
  } catch (error) {
    const status =
      error.message === "User not found" ||
      error.message === "Invalid credentials"
        ? 401
        : 500;
    res.status(status).json({ error: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email } = req.body;

    await userService.updateUser(id, { username, email });
    res.json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    await userService.deleteUser(id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { register, login, getUsers, update, remove };
