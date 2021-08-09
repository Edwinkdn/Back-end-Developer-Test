import * as express from 'express';
import { Request, Response } from 'express';
import UserModel from '../models/user.model';
import UserService from './user.service';

export default class UserController extends UserService {

  public routes(router: express.Router): void {
    // GET all users
    router.get('/', async (req: Request, res: Response) => {
      const userList = await UserModel.find();
      res.send(userList);
    });

    // GET a specific user
    router.get('/:id', async (req: Request, res: Response) => {
      const id = req.params.id;
      try {
        const user = await UserModel.findById(id);
        if (!user) {
          throw new Error(`User ${id} is not found!`);
        }
        console.info(`GET /${id}: ${JSON.stringify(user)}`);
        res.send(user);
      } catch (err) {
        console.error(`${err.message}`);
        return res.status(this.statusCode['item_not_found']).send(err.message);
      }

    });

    // POST operation
    router.post('/', async (req: Request, res: Response) => {
      try {
        const validate = UserService.validateUser(req.body);
        if (validate.error)
          return res.status(this.statusCode['missing_parameters']).send(validate.error.message);
        const newUser = await this.createUser(req.body);
        console.info(`POST: ${JSON.stringify(newUser)}`);
        return res.send(newUser);
      } catch (err) {
        return res.send(err.message);
      }
    });

    // PUT operation
    router.put('/:id', async (req: Request, res: Response) => {
      try {
        const validate = UserService.validateUser(req.body);
        if (validate.error)
          return res.status(this.statusCode['missing_parameters']).send(validate.error.message);
        const { id } = req.params;
        const user = await this.updateUser({ id, ...req.body });
        if ('error' in user) {
          console.info(`PUT /${id}: ${JSON.stringify(user)} unsuccessful`);
          return res.status(user['errorCode']).send(user['error']);
        }
        console.info(`PUT /${id}: ${JSON.stringify(user)}`);
        return res.send(user);
      } catch (err) {
        return res.send(err.message);
      }
    });

    // DELETE operation
    router.delete('/:id', async (req: Request, res: Response) => {
      try {
        const { id } = req.params;
        const user = await this.deleteUser(id);
        if ('error' in user) {
          console.warn(`DELETE /${id}: ${JSON.stringify(user)} unsuccessful`);
          return res.status(user['errorCode']).send(user['error']);
        }
        console.info(`DELETE /${id}: ${JSON.stringify(user)}`);
        return res.send(200);
      } catch (err) {
        return res.send(err.message);
      }
    });
  }

}

