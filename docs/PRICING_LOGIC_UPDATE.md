# Pricing Logic Update - One Way vs Round Trip

## Overview
Updated the pricing logic to differentiate between **One Way** and **Round Trip** bookings:

### One Way
- **Flat rate per trip** (no hourly calculation)
- Uses `priceAirportTransfer` field from vehicle
- No duration/hours selection needed

### Round Trip  
- **Priced per hour** (6hrs or 12hrs packages)
- Uses `price6Hours` or `price12Hours` from vehicle
- Duration selection required (6-12 hours)

---

## Price List

| Vehicle | One Way (Flat) | 6 Hours | 12 Hours | Capacity |
|---------|---------------|---------|----------|----------|
| **Alphard** | $80 | $360 | $720 | 6 pax, 4 luggage |
| **Noah** | $75 | $360 | $660 | 6 pax, 4 luggage |
| **Combi** | $90 | $390 | $720 | 9 pax, 8 luggage |

**Note:** All prices exclude 10% tax

---

## Implementation Changes

### 1. Frontend Changes

#### A. `src/components/molecules/RideDetailsForm.tsx`
**Changes:**
- Hours selector now **only shows for Round Trip**
- Hidden for One Way bookings
- Validation updated: hours only required for round-trip
- Info text updated to explain pricing difference

**Code Changes:**
```typescript
// Hours only required for round-trip
if (formData.tripType === 'round-trip' && !formData.hours) {
  newErrors.hours = 'Duration is required for round trip';
}

// Hours selector conditional rendering
{formData.tripType === 'round-trip' && (
  <Select
    label="Select Hours"
    // ...
  />
)}
```

#### B. `src/components/molecules/OrderSummary.tsx`
**Changes:**
- Price calculation based on trip type
- Display logic updated for breakdown
- Shows "One Way Trip" or "6/12 Hours Booking"

**Code Changes:**
```typescript
const isOneWay = bookingData.tripType === 'one-way';

if (isOneWay) {
  // ONE WAY: Flat rate
  subtotal = selectedVehicle?.priceAirportTransfer || 80;
} else {
  // ROUND TRIP: Based on hours
  if (hours >= 12 && selectedVehicle?.price12Hours) {
    subtotal = selectedVehicle.price12Hours;
  } else if (hours >= 6 && selectedVehicle?.price6Hours) {
    subtotal = selectedVehicle.price6Hours;
  } else {
    subtotal = selectedVehicle?.price6Hours || 360;
  }
}
```

### 2. Backend Changes

#### A. `src/utils/pricing.ts`
**Complete rewrite of pricing logic:**

```typescript
export function calculateBookingPrice(params: PriceCalculationParams): number {
  const { vehicleName, service, duration } = params
  
  // Determine if ONE WAY
  const isOneWay = serviceUpper.includes('ONE') || 
                   serviceUpper.includes('ONE-WAY') || 
                   serviceUpper.includes('AIRPORT')
  
  if (isOneWay) {
    // Flat rate based on vehicle
    if (vehicleNameUpper.includes('ALPHARD')) return 80
    if (vehicleNameUpper.includes('NOAH')) return 75
    if (vehicleNameUpper.includes('COMBI')) return 90
    return 80
  }
  
  // ROUND TRIP: Calculate by hours
  let hours = extractHours(duration) || 6
  
  if (vehicleNameUpper.includes('ALPHARD')) {
    return hours >= 12 ? 720 : 360
  }
  // ... similar logic for other vehicles
}
```

#### B. `src/app/api/bookings/route.ts`
**Updated booking creation logic:**

```typescript
const isOneWay = serviceType.includes('ONE') || 
                 serviceType.includes('ONE-WAY') || 
                 serviceType.includes('TRIP') || 
                 serviceType.includes('AIRPORT');

if (isOneWay) {
  subtotal = vehicle.priceAirportTransfer || 80;
} else {
  // Round trip: 6hrs or 12hrs
  if (hours >= 12 && vehicle.price12Hours) {
    subtotal = vehicle.price12Hours;
  } else if (hours >= 6 && vehicle.price6Hours) {
    subtotal = vehicle.price6Hours;
  } else {
    subtotal = vehicle.price6Hours || 360;
  }
}
```

#### C. `src/app/api/public/booking/route.ts`
**Same logic applied to public booking API**

---

## Service Type Mapping

### One Way Triggers:
```typescript
const isOneWay = 
  serviceType.includes('ONE') ||
  serviceType.includes('ONE-WAY') ||
  serviceType.includes('ONEWAY') ||
  serviceType.includes('AIRPORT') ||
  serviceType.includes('TRANSFER') ||
  serviceType.includes('TRIP')
```

### Round Trip:
- Everything else
- Requires duration (hours) input
- Minimum 6 hours

---

## User Experience Flow

### One Way Booking:
```
1. User selects "One Way"
2. Fills pickup & drop-off locations
3. Selects date & time
4. ❌ NO hours selection
5. Selects vehicle
6. Sees flat rate: $80 (Alphard)
7. Proceeds to payment
```

### Round Trip Booking:
```
1. User selects "Round Trip"
2. Fills pickup & drop-off locations  
3. Selects date & time
4. ✅ Selects hours (6 or 12)
5. Selects vehicle
6. Sees hourly rate: $360 (6hrs) or $720 (12hrs)
7. Proceeds to payment
```

---

## Database Impact

### Booking Model:
No changes to schema required. Existing fields work:
- `service`: 'one-way' | 'round-trip'
- `duration`: '6 hours' | '12 hours' | null (for one-way)
- `totalAmount`: calculated amount

### Vehicle Model:
Uses existing price fields:
- `priceAirportTransfer`: For one-way trips
- `price6Hours`: For 6-hour round trips
- `price12Hours`: For 12-hour round trips

---

## Examples

### Example 1: One Way Alphard
```javascript
{
  tripType: 'one-way',
  vehicle: 'Toyota Alphard',
  pickupLocation: 'Changi Airport',
  dropOffLocation: 'Marina Bay Sands',
  // No hours field
}

Price Calculation:
- Base: $80 (flat rate)
- Tax (10%): $8
- Total: $88
```

### Example 2: Round Trip Noah 6 Hours
```javascript
{
  tripType: 'round-trip',
  vehicle: 'Toyota Noah',
  pickupLocation: 'Hotel',
  dropOffLocation: 'Gardens by the Bay',
  hours: '6'
}

Price Calculation:
- Base: $360 (6-hour package)
- Tax (10%): $36
- Total: $396
```

### Example 3: Round Trip Combi 12 Hours
```javascript
{
  tripType: 'round-trip',
  vehicle: 'Toyota Hiace Combi',
  pickupLocation: 'Jurong',
  dropOffLocation: 'Sentosa',
  hours: '12'
}

Price Calculation:
- Base: $720 (12-hour package)
- Tax (10%): $72
- Total: $792
```

---

## Testing Checklist

### Frontend Tests:
- [ ] One-way booking hides hours selector ✓
- [ ] Round-trip booking shows hours selector ✓
- [ ] Price display shows correct amount for one-way ✓
- [ ] Price display shows correct amount for 6hrs round-trip ✓
- [ ] Price display shows correct amount for 12hrs round-trip ✓
- [ ] Trip type toggle works correctly ✓
- [ ] Form validation works for both types ✓

### Backend Tests:
- [ ] One-way booking calculates flat rate ✓
- [ ] Round-trip 6hrs calculates correctly ✓
- [ ] Round-trip 12hrs calculates correctly ✓
- [ ] Tax (10%) applied correctly ✓
- [ ] Booking created with correct amount ✓
- [ ] Email notifications sent correctly ✓

### Integration Tests:
- [ ] Complete one-way booking flow
- [ ] Complete round-trip 6hrs booking flow
- [ ] Complete round-trip 12hrs booking flow
- [ ] Payment amount matches calculated price
- [ ] Stripe checkout amount is correct

---

## Migration Notes

### Existing Bookings:
- No migration needed
- Old bookings remain unchanged
- New pricing logic only applies to new bookings

### Admin Dashboard:
- May need to update display logic to show:
  - "One Way" vs "Round Trip"
  - Hours (if round trip)
  - Correct price breakdown

---

## API Changes

### Request Format:

#### One Way:
```json
{
  "service": "one-way",
  "vehicleId": "vehicle-id",
  "pickupLocation": "Location A",
  "dropoffLocation": "Location B",
  "startDate": "2024-01-15",
  "startTime": "10:00"
  // No duration field needed
}
```

#### Round Trip:
```json
{
  "service": "round-trip",
  "vehicleId": "vehicle-id",
  "pickupLocation": "Location A",
  "dropoffLocation": "Location B",
  "startDate": "2024-01-15",
  "startTime": "10:00",
  "duration": "6 hours"  // Required for round trip
}
```

### Response:
```json
{
  "success": true,
  "data": {
    "id": "booking-id",
    "service": "one-way",
    "totalAmount": 88.00,
    // ... other fields
  }
}
```

---

## Benefits

### User Benefits:
1. **Clearer Pricing**: Flat rate for simple trips
2. **Better UX**: No confusion about hours for one-way
3. **Flexibility**: Choose appropriate pricing model
4. **Transparency**: See exact cost upfront

### Business Benefits:
1. **Competitive Pricing**: Market-standard flat rates
2. **Revenue Optimization**: Hourly pricing for longer trips
3. **Clearer Offerings**: Two distinct service types
4. **Better Inventory Management**: Duration-based for round trips

---

## Support & Troubleshooting

### Common Issues:

**Issue 1: Hours selector not hiding for one-way**
- Check `formData.tripType` value
- Ensure conditional rendering is correct
- Clear browser cache

**Issue 2: Wrong price calculated**
- Verify vehicle has correct price fields in database
- Check `priceAirportTransfer`, `price6Hours`, `price12Hours`
- Test with console.log in pricing calculation

**Issue 3: Validation error on one-way booking**
- Ensure hours validation is conditional
- Check: `if (tripType === 'round-trip' && !hours)`

---

## Future Enhancements

### Potential Additions:
1. **Custom Hours**: Allow any hour duration for round trip
2. **Multi-day Pricing**: Special rates for multi-day bookings
3. **Distance-based**: Calculate one-way by distance
4. **Peak Hours**: Surge pricing during peak times
5. **Discounts**: Promotional codes, loyalty discounts

---

**Last Updated:** December 2024  
**Updated By:** ZBK Development Team  
**Version:** 2.0

