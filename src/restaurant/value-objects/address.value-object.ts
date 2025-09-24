import { number, object, string } from "yup";

interface IAddress {
  number: number;
  postalCode: string;
  street: string;
  aptUnit?: string;
}

class Address {
  private static readonly addressValidationSchema = object({
    number: number()
      .required('number is a required property')
      .integer('number must be a positive integer')
      .positive('number must be a positive integer')
      .typeError('number must of a number'),
    postalCode: string()
      .required('postalCode is a required property')
      .max(11, 'postalCode must have a max of 11 characters')
      .matches(/[0-9]{2}(\.|\s)?[0-9]{3}(\.|\s)?[0-9]{2}\n/gm, { excludeEmptyString: true, message: 'postalCode must be a valid CEP' })
      .typeError('postalCode must of a string'),
    street: string()
      .required('street is a required property')
      .max(100, 'street must have a max of 100 characters')
      .typeError('street must of a string'),
    aptUnit: string()
      .max(40, 'aptUnit must have a max of 40 characters')
      .optional()
      .typeError('aptUnit must of a string'),
  });

  static async validate(data: Partial<Address>): Promise<void> {
    await this.addressValidationSchema.validate(data);
  }
}

export default Address;
export type { IAddress };
