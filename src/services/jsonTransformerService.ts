export interface TransformResult {
  data: any;
  replacementCount: number;
}

export class JsonTransformerService {
  private replacementCount: number = 0;
  private readonly maxReplacements: number;

  constructor(maxReplacements: number) {
    this.maxReplacements = maxReplacements;
  }

  transform(data: any): TransformResult {
    this.replacementCount = 0;
    const transformedData = this.transformRecursive(data);
    
    return transformedData;
  }

  private transformRecursive(data: any): any {
    // Handle null and undefined
    if (data === null || data === undefined) {
      return data;
    }

    // Handle strings - replace "dog" with "cat"
    if (typeof data === 'string') {
      return this.replaceInString(data);
    }

    // Handle arrays
    if (Array.isArray(data)) {
      return data.map(item => this.transformRecursive(item));
    }

    // Handle objects
    if (typeof data === 'object') {
      const result: any = {};
      for (const [key, value] of Object.entries(data)) {
        result[key] = this.transformRecursive(value);
      }
      return result;
    }

    // Handle primitives (numbers, booleans, etc.)
    return data;
  }

  private replaceInString(str: string): string {
    const regex = /dog/gi;
    let result = str;
    let match;

    while ((match = regex.exec(str)) !== null) {
      if (this.replacementCount >= this.maxReplacements) {
        throw new Error(
          `Replacement limit exceeded. Max: ${this.maxReplacements}`
        );
      }
      this.replacementCount++;
    }

    return result.replace(regex, 'cat');
  }
}