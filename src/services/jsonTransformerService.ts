export class JsonTransformerService {
  transform(data: any): any {
    // Handle null and undefined
    if (data === null || data === undefined) {
      return data;
    }

    // Handle strings - replace "dog" with "cat"
    if (typeof data === 'string') {
      return data.replace(/dog/gi, 'cat');
    }

    // Handle arrays
    if (Array.isArray(data)) {
      return data.map(item => this.transform(item));
    }

    // Handle objects
    if (typeof data === 'object') {
      const result: any = {};
      for (const [key, value] of Object.entries(data)) {
        result[key] = this.transform(value);
      }
      return result;
    }

    // Handle primitives (numbers, booleans, etc.)
    return data;
  }
}