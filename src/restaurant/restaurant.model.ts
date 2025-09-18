interface Restaurant {
  id?: string;
  name: string;
  description?: string;
  phone: string;
  cnpj: string;
  owner: string;
  website?: string;
  hoursOfOperation: {
    days: string[],
    hours: string[],
  },
  address: {
    number: number;
    postalCode: string;
    street: string;
    aptUnit?: string;
  }
}

export default Restaurant;
