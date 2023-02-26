import { ContainerDaoUser } from "../dao/index.js";
import { logger } from "../utils/logger/logger.js";

const getUsers = async () => {
  try {
    return await ContainerDaoUser.getAll();
  } catch (err) {
    logger.error(err);
  }
};

const getUserById = async (id) => {
  try {
    return await ContainerDaoUser.getById(id);
  } catch (err) {
    logger.error(err);
  }
};

const saveUser = async (body) => {
  try {
    return await ContainerDaoUser.save(body);
  } catch (err) {
    logger.error(err);
  }
};

const updateUserById = async (id, body) => {
  try {
    return await ContainerDaoUser.updateById(id, body);
  } catch (err) {
    logger.error(err);
  }
};

const deleteUsers = async () => {
  try {
    return await ContainerDaoUser.deleteAll();
  } catch (err) {
    logger.error(err);
  }
};

const deleteUserById = async (id) => {
  try {
    return await ContainerDaoUser.deleteById(id);
  } catch (err) {
    logger.error(err);
  }
};

export default {
  getUsers,
  getUserById,
  saveUser,
  updateUserById,
  deleteUserById,
  deleteUsers,
};
