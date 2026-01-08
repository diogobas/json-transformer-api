import { JsonTransformerService } from '../../src/services/jsonTransformerService';

describe('JsonTransformerService', () => {
  let service: JsonTransformerService;

  beforeEach(() => {
    service = new JsonTransformerService(1000);
  });

  describe('String transformations', () => {
    it('should replace "dog" with "cat" in simple string', () => {
      expect(service.transform('I love my dog')).toBe('I love my cat');
    });

    it('should replace multiple occurrences of "dog"', () => {
      expect(service.transform('dog dog dog')).toBe('cat cat cat');
    });

    it('should be case-insensitive', () => {
      expect(service.transform('Dog DOG dog')).toBe('cat cat cat');
    });

    it('should not replace partial matches', () => {
      expect(service.transform('hotdog')).toBe('hotcat');
    });
  });

  describe('Primitive values', () => {
    it('should return null as-is', () => {
      expect(service.transform(null)).toBeNull();
    });

    it('should return numbers as-is', () => {
      expect(service.transform(42)).toBe(42);
    });

    it('should return booleans as-is', () => {
      expect(service.transform(true)).toBe(true);
    });
  });

  describe('Array transformations', () => {
    it('should transform strings in array', () => {
      const input = ['dog', 'cat', 'dog'];
      const expected = ['cat', 'cat', 'cat'];
      expect(service.transform(input)).toEqual(expected);
    });

    it('should handle mixed array types', () => {
      const input = ['dog', 42, true, null];
      const expected = ['cat', 42, true, null];
      expect(service.transform(input)).toEqual(expected);
    });

    it('should handle nested arrays', () => {
      const input = [['dog'], ['dog', 'dog']];
      const expected = [['cat'], ['cat', 'cat']];
      expect(service.transform(input)).toEqual(expected);
    });
  });

  describe('Object transformations', () => {
    it('should transform string values in object', () => {
      const input = { pet: 'dog', animal: 'dog' };
      const expected = { pet: 'cat', animal: 'cat' };
      expect(service.transform(input)).toEqual(expected);
    });

    it('should handle mixed value types in object', () => {
      const input = { name: 'dog', age: 5, active: true };
      const expected = { name: 'cat', age: 5, active: true };
      expect(service.transform(input)).toEqual(expected);
    });

    it('should handle nested objects', () => {
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
    it('should handle deeply nested JSON', () => {
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

  describe('Replacement limit enforcement', () => {
    it('should throw error when limit is exceeded', () => {
      const smallLimitService = new JsonTransformerService(2);
      const input = 'dog dog dog';
      
      expect(() => smallLimitService.transform(input)).toThrow(
        'Replacement limit exceeded. Max: 2'
      );
    });

    it('should allow replacements up to the limit', () => {
      const smallLimitService = new JsonTransformerService(3);
      const input = 'dog dog dog';
      
      const result = smallLimitService.transform(input);
      expect(result).toBe('cat cat cat');
    });

    it('should track replacements across nested structures', () => {
      const smallLimitService = new JsonTransformerService(5);
      const input = {
        pets: ['dog', 'dog'],
        description: 'I have a dog and another dog'
      };
      
      expect(() => smallLimitService.transform(input)).not.toThrow(
        'Replacement limit exceeded'
      );
    });

    it('should reset count between transform calls', () => {
      const result1 = service.transform('dog');
      const result2 = service.transform('dog');
      
      expect(result1).toBe("cat");
      expect(result2).toBe("cat");
    });
  });
});
