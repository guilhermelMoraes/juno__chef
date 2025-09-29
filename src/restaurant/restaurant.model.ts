/* eslint-disable no-useless-escape */
import { object, string } from 'yup';

import {
  matchesMsg,
  maxMsg,
  minMsg,
  requiredMsg,
  typeErrorMsg,
} from '../shared/utils/error-messages';
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
      .required(requiredMsg('name'))
      .min(3, minMsg('name', 3))
      .max(100, maxMsg('name', 100))
      .typeError(typeErrorMsg('name')),
    description: string()
      .optional()
      .max(700, maxMsg('description', 700))
      .typeError(typeErrorMsg('description')),
    phone: string()
      .required(requiredMsg('phone'))
      .matches(
        /^(\(?[0-9]{2}\)?)? ?([0-9]{4,5})-?([0-9]{4})$/gm,
        matchesMsg('phone', '00 (99) 9999[9]-9999'),
      )
      .max(20, maxMsg('phone', 20))
      .typeError(typeErrorMsg('phone')),
    cnpj: string()
      .required(requiredMsg('cnpj'))
      .matches(
        /^[0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2}$/,
        matchesMsg('cnpj', '99.999.999/9999-99 or 99999999999999'),
      )
      .max(20, maxMsg('cnpj', 20))
      .typeError(typeErrorMsg('cnpj')),
    owner: string()
      .required(requiredMsg('owner'))
      .matches(/^[a-z ,.'-]+$/i, matchesMsg('owner', 'letters only'))
      .min(5, minMsg('owner', 5))
      .max(100, maxMsg('owner', 100))
      .typeError(typeErrorMsg('owner')),
    website: string()
      .optional()
      .url('website must be a valid URL')
      .max(200, maxMsg('website', 200)),
    address: Address.addressValidationSchema
      .required(requiredMsg('address'))
      .typeError(typeErrorMsg('address', 'object')),
    openFrom: OpenFrom.openFromValidationSchema
      .required(requiredMsg('openFrom'))
      .min(1, minMsg('openFrom', 1))
      .typeError(typeErrorMsg('openFrom', 'array')),
  });

  static async validate(data: Partial<IRestaurant>): Promise<Partial<IRestaurant>> {
    const success = await this.restaurantValidationSchema.validate(data, {
      strict: true,
    });

    return success;
  }
}

export default Restaurant;
export type { IRestaurant };
