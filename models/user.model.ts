import { model, Schema, Document } from "mongoose";
import Config from "config";

export interface IUser {
  id?: string,             // user ID
  name: string,           // user name
  dob: string,            // date of birth
  address: string,        // user address
  description: string,    // user description
  createdAt?: Date       // user created date
}

export interface IUserModel extends Document {
  name: string,           // user name
  dob: string,            // date of birth
  address: string,        // user address
  description: string,    // user description
}

const userSchema = new Schema({
  name : {
    type: String
  },
  dob: {
    type: String
  },
  address: {
    type: String
  },
  description: {
    type: String
  },
},
{
  collection: process.env.DB_COLLECTION_NAME || Config.get('dbCollection'),
  versionKey: false,
  timestamps: { createdAt: true, updatedAt: false }
});

const UserModel = model<IUserModel>('User', userSchema);

export default UserModel;