import { array, object, string, tuple } from 'yup';
import { matchesMsg, minMsg, requiredMsg, typeErrorMsg } from '../../shared/utils/error-messages';

interface IOpenFrom {
  readonly days: string[];
  readonly hours: string[][];
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
      'day string in openFrom.days array must be a valid weekday',
    )
    .required(requiredMsg('day'))

  private static readonly hourValidationSchema = string()
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/gm, matchesMsg('hour', 'HH:MM'))
    .required(requiredMsg('opening/closing time'));
  
  private static readonly openingClosingValidationSchema = tuple([
    this.hourValidationSchema,
    this.hourValidationSchema,
  ])
    .required(requiredMsg('opening/closing time array item'));
  
  private static readonly openFrom = object({
    days: array()
      .of(this.dayValidationSchema)
      .min(1, minMsg('openFrom.days', 1))
      .required(requiredMsg('openFrom.days'))
      .typeError(typeErrorMsg('openFrom.days', 'string[]')),
    hours: array()
      .of(this.openingClosingValidationSchema)
      .min(1)
      .required()
  })

  static readonly openFromValidationSchema = array().of(this.openFrom);
}

export default OpenFrom;
export type { IOpenFrom };
