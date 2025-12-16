# Booking Service Type Logic

## Overview
This document explains the service type detection and pricing logic for the ZBK booking system.

## Service Types

The booking system supports three service types:

1. **AIRPORT_TRANSFER** - One-way transfer to/from airport
2. **TRIP** - One-way trip (non-airport)
3. **RENTAL** - Round-trip/multi-hour rental

## Detection Logic

### Step 1: User Input (RideDetailsForm)
User enters:
- Trip Type: One-way or Round-trip
- Pickup Location
- Drop-off Location
- Duration (for round-trip)

### Step 2: Service Type Detection (VehicleSelection)

When user reaches the vehicle selection step, the system automatically detects the service type:

```typescript
// Check if pickup or dropoff contains airport keywords
const pickupLower = pickupLocation.toLowerCase();
const dropoffLower = dropOffLocation.toLowerCase();

const isAirportService = 
  pickupLower.includes('airport') || 
  pickupLower.includes('terminal') ||
  pickupLower.includes('bandara') ||  // Indonesian for "airport"
  dropoffLower.includes('airport') || 
  dropoffLower.includes('terminal') ||
  dropoffLower.includes('bandara');

if (tripType === 'one-way') {
  serviceType = isAirportService ? 'AIRPORT_TRANSFER' : 'TRIP';
} else {
  serviceType = 'RENTAL';
}
```

### Step 3: Vehicle Display with Correct Pricing

Based on the detected service type, vehicles display the appropriate price:

- **Airport Transfer**: Shows `priceAirportTransfer`
- **Trip**: Shows `priceTrip`
- **Rental**: Shows `price6Hours` (base price)

### Step 4: Order Summary & Payment

The service type is passed through the booking flow and used for:
- Price calculation
- Display labels
- Booking record
- Email notifications
- Stripe payment description

## Pricing Structure

### One-Way Trips

#### Airport Transfer
- **Alphard**: $80
- **Noah**: $75
- **Combi**: $90

#### General Trip (Non-Airport)
- **Alphard**: $75
- **Noah**: $70
- **Combi**: $85

### Round-Trip / Rental

#### 6 Hours
- **Alphard**: $360
- **Noah**: $360
- **Combi**: $390

#### 12 Hours
- **Alphard**: $720
- **Noah**: $660
- **Combi**: $720

### Tax
- All prices: +10% tax

## Implementation Files

### Frontend Components

1. **BookingForm.tsx**
   - Main booking flow container
   - Passes booking data between steps
   - Includes `serviceType` in BookingData interface

2. **VehicleSelection.tsx**
   - Detects service type based on locations
   - Displays correct pricing per vehicle
   - Shows service type indicator badge
   - Passes detected service type to next step

3. **OrderSummary.tsx**
   - Uses service type from booking data
   - Falls back to location detection if not set
   - Displays detailed price breakdown
   - Shows appropriate service label

### Backend APIs

1. **API: `/api/bookings` (POST)**
   - Accepts `serviceType` in request body
   - Falls back to location detection if not provided
   - Stores `serviceType` in booking record
   - Calculates price based on service type

2. **API: `/api/stripe/create-checkout-session` (POST)**
   - Reads `serviceType` from booking record
   - Uses correct pricing for payment
   - Includes service type in Stripe metadata
   - Displays accurate service description

### Utilities

1. **pricing.ts**
   - `calculateBookingPrice()` - Calculates price based on vehicle and service
   - Supports all three service types
   - Handles legacy data formats

## Airport Keywords Supported

The system recognizes the following keywords and airport names (case-insensitive):

### Generic Keywords
- `airport`
- `terminal`
- `bandara` (Indonesian)
- `arrival`
- `departure`
- `flight`
- `gate`

### Specific Airport Names & Codes

#### Indonesia
- **Bali:** `ngurah rai`, `denpasar`, `dps`
- **Jakarta:** `soekarno-hatta`, `soekarno hatta`, `soetta`, `cengkareng`, `cgk`, `halim`
- **Surabaya:** `juanda`, `sub`
- **Lombok:** `lombok airport`, `praya`, `lop`
- **Yogyakarta:** `adisucipto`, `jog`

#### Southeast Asia
- **Singapore:** `changi`, `singapore airport`, `sin`
- **Malaysia:** `klia`, `kul`, `penang airport`, `pen`
- **Thailand:** `suvarnabhumi`, `bkk`, `don mueang`, `dmk`, `phuket airport`, `hkt`, `chiang mai`, `cnx`
- **Vietnam:** `tan son nhat`, `sgn`, `noi bai`, `han`
- **Philippines:** `ninoy aquino`, `naia`, `mnl`

#### Other
- **Hong Kong:** `hong kong airport`, `hkg`, `chek lap kok`
- **Australia:** `sydney airport`, `syd`, `melbourne airport`, `mel`, `brisbane`, `bne`, `perth`, `per`

### Terminal References
- `terminal 1`, `terminal 2`, `terminal 3`, `terminal 4`
- `t1`, `t2`, `t3`, `t4`
- `international terminal`, `domestic terminal`

**Examples:**
- ✅ "Ngurah Rai International Airport" → Airport Transfer
- ✅ "Changi" → Airport Transfer (Singapore)
- ✅ "Terminal 1, Soekarno-Hatta" → Airport Transfer
- ✅ "Bandara Internasional Lombok" → Airport Transfer
- ✅ "DPS Arrival Gate 3" → Airport Transfer
- ✅ "Singapore Changi T3" → Airport Transfer
- ❌ "Seminyak Beach" → General Trip
- ❌ "Ubud Monkey Forest" → General Trip

## User Experience Flow

1. **Step 1 - Ride Details**
   - User enters pickup and destination
   - No service type shown yet

2. **Step 2 - Vehicle Selection**
   - System automatically detects service type
   - Shows badge: "Service Type: Airport Transfer" or "Service Type: Trip"
   - Displays correct price for each vehicle
   - Price label shows "/trip" for one-way, "/6hrs" for rental

3. **Step 3 - Order Summary**
   - Shows service type label in price breakdown
   - Displays final price matching what was shown in vehicle selection
   - All pricing is consistent across steps

## Testing Checklist

### Airport Transfer
- [ ] Enter pickup: "Ngurah Rai Airport"
- [ ] Choose one-way trip
- [ ] Verify "Airport Transfer" badge appears in vehicle selection
- [ ] Verify airport transfer price is displayed
- [ ] Verify order summary shows "Airport Transfer (One Way)"

### General Trip
- [ ] Enter pickup: "Seminyak"
- [ ] Enter destination: "Ubud"
- [ ] Choose one-way trip
- [ ] Verify "Trip" badge appears in vehicle selection
- [ ] Verify trip price is displayed (lower than airport transfer)
- [ ] Verify order summary shows "Trip (One Way)"

### Rental
- [ ] Choose round-trip
- [ ] Enter 6 hours duration
- [ ] Verify 6-hour rental price is displayed
- [ ] Verify order summary shows "6 Hours Rental"
- [ ] Change to 12 hours
- [ ] Verify 12-hour rental price is displayed
- [ ] Verify order summary shows "12 Hours Rental"

## Notes

- Service type detection happens in real-time at vehicle selection step
- Pricing is consistent across frontend (display) and backend (payment)
- The system supports both English and Indonesian airport keywords
- Legacy bookings without `serviceType` will fall back to location detection
- All prices include 10% tax in the final total
