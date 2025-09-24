import { object } from "yup";

interface IHoursOfOperation {
  days: string[];
  hours: string[][];
}

class HoursOfOperation {
  private static readonly hoursOfOperationValidationSchema = object();

  static async validate(data: Partial<HoursOfOperation>): Promise<void> {
    await this.hoursOfOperationValidationSchema.validate(data);
  }
}

export default HoursOfOperation;
export type { IHoursOfOperation };
