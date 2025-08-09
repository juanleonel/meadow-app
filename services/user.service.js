const UserModel = require('../models/user.model');

module.exports = class UserService {
  constructor() {}

  async createUser(userData) {
    const errors = [];
    let userFound = null;

    userFound = await this.getUserByEmail(userData.email);

    if (userFound) {
      errors.push('Email already exists');
    }

     userFound = await this.getUserByUserName(userData.username);

    if (userFound) {
      errors.push('username already exists');
    }

    if (errors.length > 0) {
    const error = new Error('Validation errors');
    error.details = errors;

    throw error;
  }


    userFound = await this.getUserByUserName(userData.username);

    if (userFound) {
      errors.push('username already exists');
    }

    const user = new UserModel(userData);

    return await user.save();
  }

  async getAllUsers() {
    return await UserModel.find({ isActive: true });
  }

  async getUserByEmail(email) {
    return await UserModel.findOne({
      isActive: true,
      email: email
    });
  }

  async getUserByUserName(userName) {
    return await UserModel.findOne({
      isActive: true,
      username: userName
    });
  }

  async getUserById(userId) {
    return await UserModel.findById(userId);
  }

  async updateUser(userId, updateData) {
    const user = await UserModel.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    Object.assign(user, updateData);
    user.updatedAt = new Date();

    return await user.save();
  }

  async deleteUser(userId) {
    const user = await UserModel.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    return await user.remove();
  }
}
