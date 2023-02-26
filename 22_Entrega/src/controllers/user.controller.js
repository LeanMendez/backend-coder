import { logger } from "../utils/logger/logger.js";
import serviceUser from "../services/user.service.js";
import { createHash } from "../utils/generateHash.js";

const getUsers = async (req, res) => {
  try {
    const users = await serviceUser.getUsers();
    res.status(200).json({ users });
  } catch (err) {
    logger.error(err);
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await serviceUser.getUserById(id);
    res.status(200).json({ user });
  } catch (err) {
    logger.error(err);
  }
};
const saveUser = async (req, res) => {
  try {
    const { body } = req;
    const newUser = {
        email: body.email,
        password: await createHash(body.password)
    }
    await serviceUser.saveUser(newUser);
    res.status(201).json({ message: `User was created successfully` });
  } catch (err) {
    logger.error(err);
  }
};

const updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const userToUpdate = await serviceUser(id);
    if (!userToUpdate)
      return res
        .status(400)
        .json({ message: `User with ID ${id} doesn't exist` });
    const { body } = req;
    await serviceUser.updateUserById(id, body);
    res.status(200),
      json({ message: `User with ID ${id} was updated successfully` });
  } catch (err) {
    logger.error(err);
  }
};

const deleteUsers = async (req, res) => {
  try {
    await serviceUser.deleteUsers();
    res.status(200).json({ message: `All users have been deleted` });
  } catch (err) {
    logger.error(err);
  }
};
const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const userToDelete = await serviceUser.getUserById(id);
    if (!userToDelete)
      return res
        .status(400)
        .json({ message: `User with ID ${id} doesn't exist` });
    await serviceUser.deleteUserById(id);
    res
      .status(200)
      .json({ message: `User with ID ${id} was deleted succesfully` });
  } catch (err) {
    logger.error(err);
  }
};

export {
  getUsers,
  getUserById,
  saveUser,
  updateUserById,
  deleteUsers,
  deleteUserById,
};
