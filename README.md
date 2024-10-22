# Service Management API

This project is a service management system that allows administrators to assign services to users, and users to manage their own services. It is developed using **NestJS** and follows some principles of **SOLID**. Additionally, it uses **Prisma** as the ORM for database management.

## Technologies used

- **NestJS**: A Node.js framework for building efficient and scalable backend applications.
- **Prisma**: An ORM to interact with the database.
- **Swagger**: For API documentation.
- **TypeScript**: The programming language used to develop the project.

## Project Structure

This project follows Clean Architecture principles, separating responsibilities and organizing the code to be scalable and maintainable.

```
service-management/
├── prisma/
│ ├── migrations/ # Database migrations
│ ├── seeds/ # Seed files to populate the database
│ └── schema.prisma # Database schema definition
├── src/
│ ├── application/
│ │ └── interfaces/ # Repository interfaces
│ ├── common/
│ │ ├── decorators/ # Reusable decorators
│ │ ├── dtos/ # Data Transfer Objects (DTOs)
│ │ ├── interfaces/ # Other interfaces
│ │ ├── middlewares/ # Middlewares
│ │ ├── types/ # Type definitions
│ │ └── utils/ # Common utilities
│ ├── controllers/
│ │ ├── authentication/ # Controllers for authentication
│ │ ├── services/ # Controllers for service management
│ │ └── userServices/ # Controllers for managing user services
│ ├── infrastructure/
│ │ ├── prisma/ # Prisma configuration
│ │ └── services/ # Infrastructure services (e.g., JwtAuthService)
│ ├── services/ # Business logic (Services)
│ └── app.module.ts # Main application module
├── package.json
└── README.md
```

## Installation

Follow these steps to clone and run the project locally:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/service-management.git
   ```

2. Install dependencies:

```cd service-management
npm install
```

3. Set up environment:

   • Create a .env file in the root of the project with the necessary variables (you can use .env.example as a reference if available).

4. Run the project in development mode:

```cd service-management
npm run start:dev
```

## Database Migrations

To start you will be able to execute the database migrations and seeders at same time using the next command:

```
npm run prisma:settingDb
```

however you will need to bring execution permissions to be able to execute the script, to do that use the following command in the terminal first.

```
chmod +x setup-db.sh
```

But if you decide do it step by step, you will be able following the next steps:

To sync the database schema, use the following command:

```
npm run prisma:generate
```

To run database migrations, use the following command:

```
npm run prisma:migrate
```

This will implement the migrations based on the schema.prisma file.

To populate the database with initial or test data, run the following command:

```
npm run prisma:seeds
```

This will execute the main file located in prisma/seeds/main.ts and it will be execute all the seeders.

## API Documentation

The project uses Swagger to generate and expose API documentation. To access the documentation, follow these steps:

1. Run the project:

```bash
npm run start:dev
```

2. Open your browser and go to:

```
http://localhost:{PORT}/api-docs
```

As you can see you have to include the port number in the URL, depending on your environment.
Here you will find the automatically generated Swagger documentation, where you can interact with the various API endpoints.
