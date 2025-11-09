# Ward Manager Backend

Authentication and Authorization backend for the Ward Manager application.

## Prerequisites

- Node.js 24.11.0 (LTS) - Use nvm: `nvm use`
- PostgreSQL 14+
- Redis 6+

## Setup

1. Install dependencies:
```bash
npm install
```

2. Copy environment variables:
```bash
cp .env.example .env
```

3. Update `.env` with your configuration:
   - Database credentials
   - Redis connection details
   - JWT secret (generate a secure random string)
   - Other security settings

4. Set up the database:
```bash
# Create database
createdb ward_manager

# Run migrations (once implemented)
npm run migrate
```

5. Seed initial data (once implemented):
```bash
npm run seed
```

## Development

Start the development server with hot reload:
```bash
npm run dev
```

The API will be available at `http://localhost:3000/api`

## Building

Build the TypeScript code:
```bash
npm run build
```

## Production

Start the production server:
```bash
npm start
```

## Testing

Run tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

## Linting

Run ESLint:
```bash
npm run lint
```

## Project Structure

```
backend/
├── src/
│   ├── config/          # Configuration files
│   │   ├── index.ts     # Main config
│   │   ├── database.ts  # Database connection
│   │   └── redis.ts     # Redis connection
│   ├── controllers/     # HTTP request handlers
│   ├── middleware/      # Express middleware
│   ├── models/          # Data models
│   ├── repositories/    # Database access layer
│   ├── routes/          # API routes
│   ├── services/        # Business logic
│   ├── types/           # TypeScript types
│   ├── utils/           # Utility functions
│   │   └── logger.ts    # Winston logger
│   ├── app.ts           # Express app setup
│   └── index.ts         # Application entry point
├── dist/                # Compiled JavaScript (generated)
├── logs/                # Application logs (generated)
├── .env                 # Environment variables (not in git)
├── .env.example         # Example environment variables
├── package.json         # Dependencies and scripts
└── tsconfig.json        # TypeScript configuration
```

## Environment Variables

See `.env.example` for all available configuration options.

Critical variables for production:
- `JWT_SECRET` - Must be a secure random string
- `DB_PASSWORD` - Database password
- `REDIS_PASSWORD` - Redis password (if enabled)
- `NODE_ENV=production` - Set to production mode

## API Endpoints

### Health Check
- `GET /health` - Server health status

### Authentication (to be implemented)
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Refresh token
- `GET /api/auth/me` - Get current user

### User Management (to be implemented)
- `POST /api/users` - Create user
- `GET /api/users` - List users
- `GET /api/users/:id` - Get user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Deactivate user

### Roles & Permissions (to be implemented)
- `POST /api/roles` - Create role
- `GET /api/roles` - List roles
- `PUT /api/roles/:id` - Update role
- `DELETE /api/roles/:id` - Delete role

### Modules (to be implemented)
- `GET /api/modules` - List accessible modules
- `POST /api/modules` - Register module

## Security Features

- Password hashing with bcrypt (cost factor 12)
- JWT-based authentication
- Session management with Redis
- Rate limiting on API endpoints
- CORS configuration
- Helmet.js security headers
- Input validation and sanitization
- SQL injection prevention (parameterized queries)
- XSS prevention

## Logging

Logs are written to:
- Console (development only)
- `logs/app.log` - All logs
- `logs/error.log` - Error logs only

Log levels: error, warn, info, debug

## License

MIT
