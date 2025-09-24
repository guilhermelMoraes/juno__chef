import { object, string } from 'yup';

import { IAddress } from './value-objects/address.value-object';

interface IRestaurant {
  id?: string;
  name: string;
  description?: string;
  phone: string;
  cnpj: string;
  owner: string;
  website?: string;
  hoursOfOperation: IHoursOfOperation[];
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
      .max(18, 'phone must have a max of 18 characters')
      .matches(
        /^[\+]?[0-9]{0,3}\W?+[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
        {
          message: 'phone must be a valid phone number',
          excludeEmptyString: true,
        },
      )
      .required('phone is a required property')
      .typeError('phone must be a string'),
    cnpj: string()
      .matches(/\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}/, {
        message: 'cnpj must be a valid CNPJ',
        excludeEmptyString: true,
      })
      .max(20, 'cnpj must have a max of 20 characters')
      .required('cnpj is a required property')
      .typeError('cnpj must a string'),
    owner: string()
      .required('owner is a required property')
      .max(100, 'owner must have a max of 100 characters')
      .typeError('owner must a string'),
    website: string()
      .url('website must be a valid URL')
      .max(200, 'website must have a max of 200 characters')
      .typeError('website must a string')
      .optional(),
  });

  static async validate(data: Partial<IRestaurant>): Promise<void> {
    await this.restaurantValidationSchema.validate(data);
  }
}

export default Restaurant;
export type { IRestaurant };

