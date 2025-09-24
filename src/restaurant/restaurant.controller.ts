/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';

import IRepository from '../shared/database/repository.interface';
import HttpStatusCodes from '../shared/http-codes.enum';
import AppLogger from '../shared/logger';
import JunoValidationError from '../shared/juno-validation.error';

class RestaurantController {
  private readonly logger = AppLogger.getInstance();

  constructor(
    private readonly repository: IRepository
  ) { }

  async create(request: Request, response: Response): Promise<void> {
    try {
      const restaurant = await this.repository.create(request.body);

      response.status(HttpStatusCodes.CREATED).json({
        message: 'Resource successfully created',
        data: restaurant,
      });
    } catch (exception) {
      const UNIQUE_VIOLATION_PG_CODE = '23505';
      const error = exception as any;

      if (error.driverError.code === UNIQUE_VIOLATION_PG_CODE) {
        this.logger.warn(`${error.name}: ${error.message}`);

        response.status(HttpStatusCodes.CONFLICT).json({
          error: error.driverError.detail,
          data: null,
        });
      } else {
        this.internalServerError(response, exception);
      }
    }
  }

  async delete(request: Request, response: Response): Promise<void> {
    try {
      await this.repository.delete(String(request.params.id));
      response.status(HttpStatusCodes.NO_CONTENT).json({
        message: 'Resource successfully deleted',
        data: null,
      });
    } catch (exception) {
      if (exception instanceof JunoValidationError) {
        this.logger.warn(exception);
        response.status(HttpStatusCodes.NOT_FOUND).json({
          error: exception.message,
          data: null,
        });
      } else {
        this.internalServerError(response, exception);
      }
    }
  }

  private internalServerError(response: Response, exception: unknown): void {
    this.logger.fatal(exception);

    response.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
      error: 'Internal server error. Please, try again later.',
      data: null,
    });
  }
}

export default RestaurantController;
