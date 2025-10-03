import { ValidationError } from 'yup';
import { faker } from '@faker-js/faker/locale/pt_BR';

import { matchesMsg, minMsg, requiredMsg } from '../shared/utils/error-messages';
import Restaurant from './restaurant.model';

describe('Restaurant validations', () => {
  test.each([
    {
      property: 'name',
      value: faker.string.alpha({ length: { min: 1, max: 2 } }),
      minLength: 3,
    },
    {
      property: 'description',
      value: faker.string.alpha({ length: { min: 1, max: 39 } }),
      minLength: 40,
    },
    {
      property: 'owner',
      value: faker.string.alpha({ length: { min: 1, max: 4 } }),
      minLength: 5,
    },
  ])(
    'Ensure that $property must have a min length of $minLength',
    async ({ property, value, minLength }) => {
      await expect(
        Restaurant.validate(
          {
            [property]: value,
          },
          { makeAllOptional: true },
        ),
      ).rejects.toThrow(minMsg(property, minLength));
    },
  );

  test.each([
    { property: 'name', actualValue: undefined },
    { property: 'phone', actualValue: undefined },
    { property: 'cnpj', actualValue: undefined },
    { property: 'owner', actualValue: undefined },
    { property: 'openFrom', actualValue: undefined },
    { property: 'address', actualValue: undefined },
  ])(
    'Ensure that $property is a required property',
    async ({ property, actualValue }) => {
      try {
        await Restaurant.validate(
          {
            [property]: actualValue,
          },
          { abortEarly: false },
        );
      } catch (errors) {
        const errorMsg = (errors as ValidationError).errors
          .filter((error) => error === requiredMsg(property))
          .at(0);

        expect(errorMsg).toBe(requiredMsg(property));
      }
    },
  );

  test('Ensure that phone is a valid BR phone', async () => {
    const phone = faker.phone.number();

    try {
      const result = await Restaurant.validate(
        {
          phone,
        },
        {
          makeAllOptional: true,
        },
      );

      expect(result.phone).toEqual(phone);
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe(matchesMsg('phone', '00 (99) 9999[9]-9999'));
      }
    }
  });

  test('Ensure that the CNPJ is valid', async () => {
    const cnpj = faker.helpers.replaceSymbols('##.###.###/0001-##');

    try {
      const result = await Restaurant.validate({
        cnpj,
      }, {
        makeAllOptional: true,
      });

      expect(result.cnpj).toEqual(cnpj);
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe(matchesMsg('cnpjk', '99.999.999/9999-99 or 99999999999999'))
      }
    }
  })
});
