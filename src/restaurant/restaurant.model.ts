interface HoursOfOperation {
  days: string[];
  hours: string[][];
}

interface Address {
  number: number;
  postalCode: string;
  street: string;
  aptUnit?: string;
}

interface Restaurant {
  id?: string;
  name: string;
  description?: string;
  phone: string;
  cnpj: string;
  owner: string;
  website?: string;
  hoursOfOperation: HoursOfOperation[];
  address: Address;
}

export default Restaurant;
export type { HoursOfOperation, Address };
