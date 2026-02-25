# Scalar API Docs Example

A minimal Express + TypeScript API demonstrating how to set up **Scalar** for interactive API documentation — companion project for the Medium article:

**[How to Add Beautiful, Interactive API Documentation to Your Node.js API Using Scalar](https://sandeshrathnayake.medium.com/how-to-add-beautiful-interactive-api-documentation-to-your-node-js-api-using-scalar-84ee621c4eeb)**

---

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Set up environment
cp .env.example .env

# 3. Start the dev server
npm run dev
```

Then open:

- **API Docs UI** → http://localhost:3000/api/docs
- **Raw OpenAPI JSON** → http://localhost:3000/api/docs/openapi.json

---

## Project Structure

```
src/
├── routes/
│   ├── users.ts              # User endpoints
│   └── auth.ts               # Auth endpoints
├── docs/
│   ├── openapi-spec.json     # Static endpoint definitions
│   ├── openapi.config.ts     # Runtime merge + caching
│   ├── scalar.config.ts      # Scalar UI configuration
│   └── schemas/
│       ├── index.ts          # Schema registry
│       ├── common.schemas.ts # Shared schemas (errors, success)
│       └── user.schemas.ts   # User domain schemas
└── app.ts                    # Express entry point
```

---

## Available Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/v1/auth/register` | Register a new user |
| POST | `/api/v1/auth/login` | Login and receive a token |
| GET | `/api/v1/users` | Get all users |
| POST | `/api/v1/users` | Create a user |
| GET | `/api/v1/users/:id` | Get a user by ID |

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start with nodemon (hot reload) |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm start` | Run the compiled build |
