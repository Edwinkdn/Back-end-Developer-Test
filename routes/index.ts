// Logic
import * as express from 'express';
let router = express.Router();

export interface IError {
    error: string;
    errorCode: number;
};

// Controller/Routes Managers.
import UserController from './user.router';

// Creating new Routes Instances.
const userController: UserController = new UserController();

// Registering our Routes.
userController.routes(router);

export default router;