import { number, object, string } from 'yup';

interface IAddress {
  number: number;
  postalCode: string;
  street: string;
  aptUnit?: string | undefined;
}

class Address {
  static readonly addressValidationSchema = object({
    number: number()
      .required('number is a required property')
      .integer('number must be a positive integer')
      .positive('number must be a positive integer')
      .typeError('number must be a number'),
    postalCode: string()
      .required('postalCode is a required property')
      .max(11, 'postalCode must have a max of 11 characters')
      .matches(/^\d{2}\d{3}-\d{3}$/gm, {
        excludeEmptyString: true,
        message: 'postalCode must be a valid CEP',
      })
      .typeError('postalCode must be a string'),
    street: string()
      .required('street is a required property')
      .max(100, 'street must have a max of 100 characters')
      .typeError('street must be a string'),
    aptUnit: string()
      .max(40, 'aptUnit must have a max of 40 characters')
      .optional()
      .typeError('aptUnit must be a string'),
  });
}

export default Address;
export type { IAddress };
