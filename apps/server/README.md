# Server

A Hono-based backend service for the Wedjat project.

## Architecture

This server follows Hono's official best practices:

- **No controllers**: Business logic is directly in route handlers
- **Modular routes**: Uses `app.route()` for code organization
- **Type safety**: Full TypeScript support with proper type inference
- **Validation**: Zod schemas for request validation

## Project Structure

```
src/
├── index.ts                    # Main entry point
├── routes/                     # Route modules
│   ├── health.ts              # Health check routes
│   └── query.ts               # Query processing routes
├── schemas/                    # Validation schemas
│   └── query.schema.ts        # Query validation schema
├── types/                      # Type definitions
│   └── api.ts                 # API types
└── middleware/                 # Middleware
    └── cors.ts                # CORS configuration
```

## Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

## API Endpoints

- `GET /` - Root endpoint
- `GET /api/v1/health` - Health check
- `POST /api/v1/query` - Process queries with validation

## Technologies

- Hono - Lightweight web framework
- TypeScript - Type safety
- Zod - Schema validation
- Node.js - Runtime environment
