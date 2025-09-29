import { number, object, string } from 'yup';

import {
  matchesMsg,
  maxMsg,
  requiredMsg,
  typeErrorMsg,
} from '../../shared/utils/error-messages';

interface IAddress {
  readonly number: number;
  readonly postalCode: string;
  readonly street: string;
  readonly aptUnit?: string | undefined;
}

class Address {
  static readonly addressValidationSchema = object({
    number: number()
      .integer('address.number must be an integer')
      .positive('address.number must be positive')
      .lessThan(10000, 'address.number cannot be higher than 9999')
      .moreThan(0, 'address.number cannot be 0')
      .required(requiredMsg('address.number'))
      .typeError(typeErrorMsg('address.number', 'number')),
    street: string()
      .required(requiredMsg('address.street'))
      .max(100, maxMsg('address.street', 100))
      .typeError(typeErrorMsg('address.street')),
    postalCode: string()
      .required(requiredMsg('address.postalCode'))
      .matches(
        /^\d{2}\d{3}[-]\d{3}$/gm,
        matchesMsg('address.postalCode', '99999-999'),
      )
      .max(11, maxMsg('address.postalCode', 11))
      .typeError(typeErrorMsg('address.postalCode')),
    aptUnit: string()
      .optional()
      .max(40, maxMsg('address.aptUnit', 40))
      .typeError(typeErrorMsg('address.aptUnit')),
  });
}

export default Address;
export type { IAddress };
