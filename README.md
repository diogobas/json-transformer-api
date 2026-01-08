# JSON Transformer API

A lightweight REST API service that transforms JSON data by replacing all occurrences of "dog" with "cat" throughout nested structures.

## Features

- 🔄 Recursive JSON transformation
- 🛡️ Rate limiting protection
- 📊 Replacement count tracking
- 🔒 Configurable replacement limits
- 🧪 Comprehensive test coverage
- 📝 TypeScript support

## Installation

```bash
# Install dependencies
npm install
```

## Configuration

Create a `.env` file in the root directory with the following variables (optional):

```env
PORT=3000
MAX_REPLACEMENTS=1000
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=100
```

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `MAX_REPLACEMENTS` | Maximum number of "dog" → "cat" replacements per request | `1000` |
| `RATE_LIMIT_WINDOW_MS` | Rate limit time window in milliseconds | `60000` (1 minute) |
| `RATE_LIMIT_MAX_REQUESTS` | Maximum requests per time window per IP | `100` |

## Usage

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Production

```bash
npm run build
npm start
```

## API Endpoint

### POST /transform

Transforms JSON data by replacing all occurrences of "dog" (case-insensitive) with "cat".

**Request Body:**

```json
{
  "data": <any-json-value>
}
```

**Response:**

Returns the transformed data with the same structure.

### Examples

#### Simple String

**Request:**
```bash
curl -X POST http://localhost:3000/transform \
  -H "Content-Type: application/json" \
  -d '{"data": "I love my dog"}'
```

**Response:**
```json
"I love my cat"
```

#### Nested Object

**Request:**
```bash
curl -X POST http://localhost:3000/transform \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "pet": "dog",
      "owner": {
        "name": "John",
        "pets": ["dog", "bird"]
      }
    }
  }'
```

**Response:**
```json
{
  "pet": "cat",
  "owner": {
    "name": "John",
    "pets": ["cat", "bird"]
  }
}
```

#### Array

**Request:**
```bash
curl -X POST http://localhost:3000/transform \
  -H "Content-Type: application/json" \
  -d '{"data": ["dog", "cat", "dog"]}'
```

**Response:**
```json
["cat", "cat", "cat"]
```

## Error Handling

### 400 Bad Request
Missing "data" field in request body:
```json
{
  "error": "Bad Request",
  "message": "Request body must contain a \"data\" field"
}
```

### 429 Too Many Requests
Rate limit exceeded:
```json
{
  "error": "Too Many Requests",
  "message": "Too many requests from this IP, please try again later."
}
```

### 500 Internal Server Error
Replacement limit exceeded:
```json
{
  "error": "Internal Server Error",
  "message": "Replacement limit exceeded. Max: 1000"
}
```

## Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## Project Structure

```
json-transformer-api/
├── src/
│   ├── app.ts                          # Express app configuration
│   ├── server.ts                       # Server entry point
│   ├── config/
│   │   └── index.ts                    # Configuration management
│   ├── controllers/
│   │   └── jsonTransformerController.ts # API endpoint controller
│   ├── middleware/
│   │   └── errorHandler.ts             # Error handling middleware
│   └── services/
│       └── jsonTransformerService.ts   # Transformation logic
├── tests/
│   ├── integration/
│   │   └── jsonTransformerApi.integration.test.ts
│   └── unit/
│       ├── jsonTransformerController.test.ts
│       └── jsonTransformerService.test.ts
├── jest.config.js
├── tsconfig.json
└── package.json
```

## Tech Stack

- **Runtime:** Node.js
- **Language:** TypeScript
- **Framework:** Express.js
- **Testing:** Jest + Supertest
- **Rate Limiting:** express-rate-limit
- **Environment:** dotenv

## License

ISC

## Author

Diogo Bastos
