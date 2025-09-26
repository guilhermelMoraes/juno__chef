import { array, date, object, string, tuple } from 'yup';

interface IHoursOfOperation {
  days: string[];
  hours: Date[][];
}

class HoursOfOperation {
  private static readonly dayValidationSchema = string()
    .oneOf(
      [
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
        'sunday',
      ],
      'day must be a valid day of the week',
  )
    .required('days are required properties')
    .typeError('day in the days array must be a string');

  private static readonly hourValidationSchema = date()
    .typeError('opening/closing time string must be a valid date string').nonNullable();

  private static readonly hourOfOperationValidationSchema = object({
    days: array()
      .of(this.dayValidationSchema)
      .required('days array is a required property')
      .max(7, 'days array must have a max of 7 days'),
    hours: array()
      .of(
        tuple([
          this.hourValidationSchema.required(''),
          this.hourValidationSchema.required(''),
        ])
        .required('opening/closing time strings are required properties')
      )
      .required('hours array is a required property')
      .max(7, 'hours array must have a max of 7 working hours'),
  });

  static readonly hoursOfOperationValidationSchema = array()
    .of(this.hourOfOperationValidationSchema)
    .required('hoursOfOperation is a required property')
    .typeError('hoursOfOperation must be an array');

  static async validate(
    data: Partial<HoursOfOperation[]>,
  ): Promise<HoursOfOperation[]> {
    const success = await this.hoursOfOperationValidationSchema.validate(data);
    return success;
  }
}

export default HoursOfOperation;
export type { IHoursOfOperation };
