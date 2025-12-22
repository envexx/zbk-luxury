# Customer Authentication Migration

## Migration Details

**Date:** December 16, 2025
**Migration Name:** `add_customer_authentication`

## Changes

1. **New Enum:** `Title` (MR, MS, MRS, DR, PROF)
2. **New Table:** `customers` - Customer authentication and profile
3. **Updated Table:** `bookings` - Added `customerId` field (optional)

## How to Apply Migration

### Method 1: Using Prisma Migrate (Recommended)

```bash
# From project root
npx prisma migrate deploy
npx prisma generate
```

### Method 2: Manual SQL Execution

If you need to run manually:

```bash
# Connect to your PostgreSQL database and run migration.sql
psql -U your_username -d your_database -f prisma/migrations/add_customer_authentication/migration.sql
```

### Method 3: Development Migration

```bash
# This will prompt you (interactive)
npx prisma migrate dev --name add_customer_authentication_system
```

## Verify Migration

After running the migration:

```bash
# Check if customers table exists
npx prisma studio

# Or using psql
psql -U your_username -d your_database -c "\dt customers"
```

## Rollback (if needed)

To rollback this migration:

```sql
-- Remove foreign key
ALTER TABLE "bookings" DROP CONSTRAINT "bookings_customerId_fkey";

-- Remove column from bookings
ALTER TABLE "bookings" DROP COLUMN "customerId";

-- Drop customers table
DROP TABLE "customers";

-- Drop enum
DROP TYPE "Title";
```

## Testing

After migration, you can seed test customer data:

```bash
node scripts/seed-test-customers.js
```

## Notes

- Existing bookings will have `customerId = NULL` (guest bookings)
- New bookings can link to customer accounts
- Backward compatibility maintained






