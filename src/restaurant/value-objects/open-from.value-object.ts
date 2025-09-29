import { array, object, string, tuple } from 'yup';

interface IOpenFrom {
  days: string[];
  hours: string[][];
}

class OpenFrom {
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
    .required('openFrom.days elements must be valid week days')
    .typeError('day in the days array must be a string');

  private static readonly hourValidationSchema = string()
    .matches(
      /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
      'opening/closing time strings must have the following format (numbers only): HH:MM.'
    )
    .typeError('opening/closing time strings must be strings');

  private static readonly openFromValidationSchema = object({
    days: array()
      .of(this.dayValidationSchema)
      .required('openFrom.days array is a required property')
      .min(1, 'openFrom.days array must have at least 1 item')
      .max(7, 'openFrom.days array must have a max of 7 days')
      .typeError('openFrom.days must be an array of valid weekday strings'),
    hours: array()
      .of(
        tuple([
          this.hourValidationSchema.required('opening time is a required property'),
          this.hourValidationSchema.required('closing time is a required property'),
        ]).required('opening/closing time strings are required properties')
          .typeError('openFrom.hours array items must be tuples with at least two time strings'),
      )
      .required('openFrom.hours array is a required property')
      .min(1, 'openFrom.hours array must have at least 1 item')
      .max(7, 'openFrom.hours array must have a max of 7 working hours')
      .typeError('openFrom.hours must an array of valid arrays'),
  });

  static readonly openFromHoursValidationSchema = array()
    .of(this.openFromValidationSchema)
    .required('openFrom is a required property')
    .typeError('openFrom must be an array');
}

export default OpenFrom;
export type { IOpenFrom };
