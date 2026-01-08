import { JsonTransformerService } from '../../src/services/jsonTransformerService';

describe('JsonTransformerService', () => {
  let service: JsonTransformerService;

  beforeEach(() => {
    service = new JsonTransformerService();
  });

  describe('String transformations', () => {
    test('should replace "dog" with "cat" in simple string', () => {
      expect(service.transform('I love my dog')).toBe('I love my cat');
    });

    test('should replace multiple occurrences of "dog"', () => {
      expect(service.transform('dog dog dog')).toBe('cat cat cat');
    });

    test('should be case-insensitive', () => {
      expect(service.transform('Dog DOG dog')).toBe('cat cat cat');
    });

    test('should not replace partial matches', () => {
      expect(service.transform('hotdog')).toBe('hotcat');
    });
  });

  describe('Primitive values', () => {
    test('should return null as-is', () => {
      expect(service.transform(null)).toBeNull();
    });

    test('should return undefined as-is', () => {
      expect(service.transform(undefined)).toBeUndefined();
    });

    test('should return numbers as-is', () => {
      expect(service.transform(42)).toBe(42);
    });

    test('should return booleans as-is', () => {
      expect(service.transform(true)).toBe(true);
    });
  });

  describe('Array transformations', () => {
    test('should transform strings in array', () => {
      const input = ['dog', 'cat', 'dog'];
      const expected = ['cat', 'cat', 'cat'];
      expect(service.transform(input)).toEqual(expected);
    });

    test('should handle mixed array types', () => {
      const input = ['dog', 42, true, null];
      const expected = ['cat', 42, true, null];
      expect(service.transform(input)).toEqual(expected);
    });

    test('should handle nested arrays', () => {
      const input = [['dog'], ['dog', 'dog']];
      const expected = [['cat'], ['cat', 'cat']];
      expect(service.transform(input)).toEqual(expected);
    });
  });

  describe('Object transformations', () => {
    test('should transform string values in object', () => {
      const input = { pet: 'dog', animal: 'dog' };
      const expected = { pet: 'cat', animal: 'cat' };
      expect(service.transform(input)).toEqual(expected);
    });

    test('should handle mixed value types in object', () => {
      const input = { name: 'dog', age: 5, active: true };
      const expected = { name: 'cat', age: 5, active: true };
      expect(service.transform(input)).toEqual(expected);
    });

    test('should handle nested objects', () => {
      const input = {
        owner: { name: 'John', pet: 'dog' },
        pets: ['dog', 'bird']
      };
      const expected = {
        owner: { name: 'John', pet: 'cat' },
        pets: ['cat', 'bird']
      };
      expect(service.transform(input)).toEqual(expected);
    });
  });

  describe('Complex nested structures', () => {
    test('should handle deeply nested JSON', () => {
      const input = {
        users: [
          {
            name: 'Alice',
            pets: ['dog', 'cat'],
            profile: { bio: 'I love my dog' }
          },
          {
            name: 'Bob',
            pets: [],
            profile: { bio: 'No dogs here' }
          }
        ]
      };
      const expected = {
        users: [
          {
            name: 'Alice',
            pets: ['cat', 'cat'],
            profile: { bio: 'I love my cat' }
          },
          {
            name: 'Bob',
            pets: [],
            profile: { bio: 'No cats here' }
          }
        ]
      };
      expect(service.transform(input)).toEqual(expected);
    });
  });
});
