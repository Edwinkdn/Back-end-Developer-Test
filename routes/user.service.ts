import Joi from '@hapi/joi';
import mongoose from 'mongoose';
import Config from 'config';
import UserModel, { IUser, IUserModel } from '../models/user.model';
import { IError } from '.';

export default class UserService {
  public statusCode: any;

  constructor() {
    this.statusCode = Config.get('statusCode');
  }

  // validate input values
  public static validateUser(body: Request["body"]) {
    const schema = Joi.object().keys({
      name: Joi.string().required(),
      dob: Joi.string().required(),
      address: Joi.string().required(),
      description: Joi.string().required(),
    });
    return schema.validate(body);
  }

  public async createUser(_user: IUser): Promise<IUserModel | IError> {
    let newUser = new UserModel(_user);
    newUser = await newUser.save();
    return newUser;
  }

  public async updateUser(_user: IUser): Promise<IUserModel | IError> {
    try {
      let _id = mongoose.Types.ObjectId(_user.id);
      let user = await UserModel.findById(_id);
      if (!user)
        throw new Error(`Task ${_id} is not found!`);
      user.set(_user);
      user.save();
      return user;
    } catch (err) {
      return { errorCode: this.statusCode['item_not_found'], error: `${err.message}` };
    }
  }

  public async deleteUser(id: string): Promise<IUserModel | IError> {
    try {
      let _id = mongoose.Types.ObjectId(id);
      let user = await UserModel.findById(_id);
      if (!user)
        throw new Error(`Task ${_id} is not found!`);
      user.delete();
      return user;
    } catch (err) {
      return { errorCode: this.statusCode['item_not_found'], error: `${err.message}` };
    }
  }
}