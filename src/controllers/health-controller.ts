import * as express from 'express';
import { Request, Response } from 'express';
import IControllerBase from '../interface/IControllerBase.interface';

export default class HealthController implements IControllerBase {
  public router = express.Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes(): void {
    this.router.get('/health', this._health);
  }

  private _health = (req: Request, res: Response): any =>
    res
      .status(200)
      .send({ status: 'ok' });
}