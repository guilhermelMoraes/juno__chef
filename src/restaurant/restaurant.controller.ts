/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { ValidationError } from 'yup';

import PostgreSqlErrorCodes from '../shared/database/postgresql-error-codes.enum';
import HttpStatusCodes from '../shared/http-codes.enum';
import AppLogger from '../shared/utils/logger';
import RestaurantService from './restaurant.service';

class RestaurantController {
  private readonly logger = new AppLogger('RestaurantController');

  constructor(private readonly service: RestaurantService) {}

  async create(request: Request, response: Response): Promise<void> {
    try {
      const data = await this.service.create(request.body);
      response.status(HttpStatusCodes.CREATED).json({
        success: true,
        message: 'Restaurant successfully created',
        data,
      });
    } catch (error) {
      this.handleExceptions(response, error);
    }
  }

  async delete(request: Request, response: Response): Promise<void> {
    try {
      await this.service.delete(String(request.params.id));
      response.status(HttpStatusCodes.NO_CONTENT).json({
        success: true,
        message: 'Restaurant successfully deleted',
        data: null,
      });
    } catch (error) {
      this.handleExceptions(response, error);
    }
  }

  private handleExceptions(response: Response, error: unknown) {
    const errorObject = error as Record<string, any>;

    if ('driverError' in errorObject) {
      switch (errorObject.driverError.code) {
        case PostgreSqlErrorCodes.NOT_NULL_VIOLATION:
          this.logger.warn(errorObject);

          response.status(HttpStatusCodes.BAD_REQUEST).json({
            success: false,
            error: `${errorObject.driverError.column} cannot be null`,
          });
          break;
        case PostgreSqlErrorCodes.UNIQUE_VIOLATION:
          this.logger.warn(errorObject);

          response.status(HttpStatusCodes.CONFLICT).json({
            success: false,
            error: `${(errorObject.detail as string).substring(4).replaceAll(/[()=.]/g, '')} and cannot be repeated`,
          });
          break;
      }
    } else if (error instanceof ValidationError) {
      this.logger.warn(errorObject);

      response.status(HttpStatusCodes.BAD_REQUEST).json({
        success: false,
        error: error.message,
        data: null,
      });
    } else {
      this.logger.fatal(errorObject);

      response.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        error: 'Internal server error. Please, try again later.',
        data: null,
      });
    }
  }
}

export default RestaurantController;
