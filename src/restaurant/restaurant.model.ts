import { object, string } from 'yup';

import Address, { IAddress } from './value-objects/address.value-object';
import OpenFrom, { IOpenFrom } from './value-objects/open-from.value-object';

interface IRestaurant {
  id?: string | undefined;
  name: string;
  description?: string | undefined;
  phone: string;
  cnpj: string;
  owner: string;
  website?: string | undefined;
  openFrom: IOpenFrom[];
  address: IAddress;
}

class Restaurant {
  private static readonly restaurantValidationSchema = object({
    name: string()
      .required('name is a required property')
      .max(100, 'name must have a max of 100 characters')
      .typeError('name must be a string'),
    description: string()
      .max(700, 'description must have a max of 700 characters')
      .typeError('description must a string')
      .optional(),
    phone: string()
      .max(20, 'phone must have a max of 20 characters')
      .matches(/^(\(?[0-9]{2}\)?)? ?([0-9]{4,5})-?([0-9]{4})$/gm, {
        message: 'phone must be a valid phone number',
        excludeEmptyString: true,
      })
      .required('phone is a required property')
      .typeError('phone must be a string'),
    cnpj: string()
      .matches(/\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}/, {
        message: 'cnpj must be a valid CNPJ',
        excludeEmptyString: true,
      })
      .max(20, 'cnpj must have a max of 20 characters')
      .required('cnpj is a required property')
      .typeError('cnpj must be a string'),
    owner: string()
      .required('owner is a required property')
      .max(100, 'owner must have a max of 100 characters')
      .typeError('owner must be a string'),
    website: string()
      .url('website must be a valid URL')
      .max(200, 'website must have a max of 200 characters')
      .typeError('website must be a string')
      .optional(),
    address: Address.addressValidationSchema
      .required('address is a required property')
      .typeError('address must be an object'),
    openFrom: OpenFrom.openFromHoursValidationSchema
      .required('openFrom is a required property')
      .min(1, 'openFrom must have at least one item')
      .typeError('openFrom must be an object'),
  });

  static async validate(data: Partial<IRestaurant>): Promise<IRestaurant> {
    const success = await this.restaurantValidationSchema.validate(data, {
      strict: true,
      abortEarly: false,
    });

    return success;
  }
}

export default Restaurant;
export type { IRestaurant };
