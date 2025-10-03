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

type ValidationOptions = {
  makeAllOptional?: boolean | undefined;
  abortEarly?: boolean | undefined;
};

class Restaurant {
  static readonly restaurantValidationSchema = object({
    name: string()
      .typeError(typeErrorMsg('name'))
      .required(requiredMsg('name'))
      .min(3, minMsg('name', 3))
      .max(100, maxMsg('name', 100))
      .when('$update', {
        is: false,
        then: (schema) => schema,
        otherwise: (schema) => schema.optional(),
      }),
    description: string()
      .optional()
      .typeError(typeErrorMsg('description'))
      .min(40, minMsg('description', 40))
      .max(700, maxMsg('description', 700)),
    phone: string()
      .typeError(typeErrorMsg('phone'))
      .required(requiredMsg('phone'))
      .matches(
        /^(\(?[0-9]{2}\)?)? ?([0-9]{4,5})-?([0-9]{4})$/gm,
        matchesMsg('phone', '00 (99) 9999[9]-9999'),
      )
      .max(20, maxMsg('phone', 20))
      .when('$update', {
        is: false,
        then: (schema) => schema,
        otherwise: (schema) => schema.optional(),
      }),
    cnpj: string()
      .typeError(typeErrorMsg('cnpj'))
      .required(requiredMsg('cnpj'))
      .matches(
        /^[0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2}$/,
        matchesMsg('cnpj', '99.999.999/9999-99 or 99999999999999'),
      )
      .max(20, maxMsg('cnpj', 20))
      .when('$update', {
        is: false,
        then: (schema) => schema,
        otherwise: (schema) => schema.optional(),
      }),
    owner: string()
      .typeError(typeErrorMsg('owner'))
      .required(requiredMsg('owner'))
      .matches(/^[a-z ,.'-]+$/i, matchesMsg('owner', 'letters only'))
      .min(5, minMsg('owner', 5))
      .max(100, maxMsg('owner', 100))
      .when('$update', {
        is: false,
        then: (schema) => schema,
        otherwise: (schema) => schema.optional(),
      }),
    website: string()
      .optional()
      .url('website must be a valid URL')
      .max(200, maxMsg('website', 200)),
    address: Address.addressValidationSchema
      .typeError(typeErrorMsg('address', 'object'))
      .required(requiredMsg('address'))
      .when('$update', {
        is: false,
        then: (schema) => schema,
        otherwise: (schema) => schema.optional(),
      }),
    openFrom: OpenFrom.openFromValidationSchema
      .typeError(typeErrorMsg('openFrom', 'array'))
      .required(requiredMsg('openFrom'))
      .min(1, minMsg('openFrom', 1))
      .when('$update', {
        is: false,
        then: (schema) => schema,
        otherwise: (schema) => schema.optional(),
      }),
  });

  static async validate(
    data: Partial<IRestaurant>,
    { abortEarly = true, makeAllOptional = false }: ValidationOptions = {},
  ): Promise<Partial<IRestaurant>> {
    const success = await this.restaurantValidationSchema.validate(data, {
      strict: true,
      context: {
        update: makeAllOptional,
      },
      abortEarly,
    });

    return success;
  }
}

export default Restaurant;
export type { IRestaurant };
