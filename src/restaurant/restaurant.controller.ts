/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';

import HttpStatusCodes from '../shared/http-codes.enum';
import AppLogger from '../shared/logger';
import IRepository from '../shared/repository.interface';

class RestaurantController {
  private readonly logger = AppLogger.getInstance();

  constructor(private readonly repository: IRepository) {}

  async create(request: Request, response: Response): Promise<void> {
    try {
      const restaurant = await this.repository.create(request.body);

      response.status(HttpStatusCodes.CREATED).json({
        message: 'Resource successfully created',
        data: restaurant,
      });
    } catch (exception) {
      const UNIQUE_VIOLATION_PG_CODE = '23505';
      const error = exception as Error;

      this.logger.warn(`${error.name}: ${error.message}`);

      if ((error as any).driverError.code === UNIQUE_VIOLATION_PG_CODE) {
        response.status(HttpStatusCodes.CONFLICT).json({
          error: (error as any).driverError.detail,
          data: null,
        });
      } else {
        response.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
          error: 'Internal server error. Please, try again later.',
          data: null,
        });
      }
    }
  }
}

export default RestaurantController;
