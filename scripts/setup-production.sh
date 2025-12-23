#!/bin/bash

# Production Database Setup Script for Coolify
# This script runs migrations and seeders for initial setup

set -e  # Exit on error

echo "🚀 Starting production database setup..."
echo ""

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
    echo "❌ Error: DATABASE_URL environment variable is not set"
    exit 1
fi

echo "📦 Step 1: Generating Prisma Client..."
npx prisma generate

echo ""
echo "🔄 Step 2: Running database migrations..."
npx prisma migrate deploy

echo ""
echo "🌱 Step 3: Seeding database..."
npm run db:seed

echo ""
echo "✅ Production database setup complete!"
echo ""
echo "📊 You can now access your application."
echo "💡 To view database, run: npx prisma studio"

