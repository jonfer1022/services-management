#!/bin/bash
echo "Generating database schema..."
npx prisma generate

echo "Running database migrations..."
npx prisma migrate dev

echo "Running seeders..."
npx ts-node prisma/seeds/main.ts

echo "Database setup completed."