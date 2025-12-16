# Troubleshooting: Booking Service Type Detection

## Issue: Vehicle prices showing rental/hourly rates instead of airport transfer prices

### Quick Diagnostic Steps

1. **Open Browser Developer Console**
   - Chrome: Press `F12` or `Ctrl+Shift+I` (Windows) / `Cmd+Option+I` (Mac)
   - Look for console logs with these emojis:
     - ✅ = Success/Submission
     - 🔍 = Location checking
     - 🎯 = Service type determination
     - 💰 = Price calculation
     - 📤 = Data passing between steps

2. **Test the Booking Flow**
   - Step 1: Enter "Ngurah Rai Airport" as pickup location
   - Select "One Way" as trip type
   - Click Continue

3. **Check Console Logs**
   
   Expected logs at Step 2 (Vehicle Selection):
   ```
   🔍 VehicleSelection - Checking locations:
     - Pickup: Ngurah Rai Airport → ngurah rai airport
     - Dropoff: Seminyak → seminyak
     - Trip Type: one-way
     - Is Airport Service: true
   
   🎯 VehicleSelection - Service Type: AIRPORT_TRANSFER | Label: Airport Transfer
   
   💰 Getting price for Toyota Alphard:
     tripType: "one-way"
     isAirportService: true
     priceAirportTransfer: 80
     priceTrip: 75
     price6Hours: 360
     legacyPrice: null
     ✈️ Airport Transfer price: $80
   ```

### Common Issues & Solutions

#### Issue 1: Badge shows "Trip" instead of "Airport Transfer"

**Symptoms:**
- Console shows `Is Airport Service: false`
- Badge displays "Service Type: Trip"
- Prices show trip prices instead of airport transfer

**Possible Causes:**

1. **Location doesn't contain airport keywords**
   
   Check console log:
   ```
   - Pickup: seminyak → seminyak  ❌ (no airport keyword)
   ```
   
   **Solution:** Make sure pickup or destination contains one of these keywords:
   - `airport`
   - `terminal`
   - `bandara`
   
   Examples that WORK:
   - ✅ "Ngurah Rai Airport"
   - ✅ "International Airport Terminal 1"
   - ✅ "Bandara Internasional"
   - ✅ "Airport Exit Gate 3"
   
   Examples that DON'T work:
   - ❌ "DPS" (airport code only)
   - ❌ "Flight from Bali" (no keyword)
   - ❌ "Arriving at 10am" (no location)

2. **BookingData not passed to VehicleSelection**
   
   Check console log:
   ```
   ⚠️ VehicleSelection: No bookingData provided
   ```
   
   **Solution:** This is a code issue. Check `BookingForm.tsx`:
   ```tsx
   <VehicleSelection
     initialVehicleId={bookingData.selectedVehicleId}
     bookingData={bookingData}  // ← Must be present
     onComplete={handleStepComplete}
     onBack={handlePrevStep}
   />
   ```

#### Issue 2: Prices showing rental rates ($360) instead of trip prices

**Symptoms:**
- Vehicle cards show $360, $390, $720
- Console shows `Rental (6hrs) price: $360`

**Possible Causes:**

1. **Trip Type is "Round Trip" instead of "One Way"**
   
   Check console log:
   ```
   - Trip Type: round-trip  ❌ (should be one-way for airport transfer)
   ```
   
   **Solution:** 
   - Make sure "One Way" is selected in Step 1
   - Round trip will always use rental pricing (6hr/12hr packages)

2. **TripType format mismatch**
   
   The code now handles both formats:
   - `'one-way'` ✅
   - `'oneWay'` ✅
   - `'round-trip'` for rental
   - `'roundTrip'` for rental

#### Issue 3: Badge not showing at all

**Symptoms:**
- No service type indicator appears on page
- But console shows correct detection

**Possible Causes:**

1. **Trip Type is Round Trip**
   
   Badge only shows for one-way trips:
   ```tsx
   {(bookingData?.tripType === 'one-way' || bookingData?.tripType === 'oneWay') && (
     <div>Service Type: {serviceLabel}</div>
   )}
   ```
   
   **This is expected behavior** - Round trips don't need the badge since they always use rental pricing.

#### Issue 4: Wrong price even with correct service type detection

**Symptoms:**
- Console shows `Is Airport Service: true`
- Console shows `✈️ Airport Transfer price: $80`
- But vehicle card displays different price

**Possible Causes:**

1. **Vehicle data missing price fields**
   
   Check console log:
   ```
   💰 Getting price for Toyota Alphard:
     priceAirportTransfer: null  ❌ (should have a value)
     priceTrip: null
     price6Hours: null
     legacyPrice: 100  ← Fallback to legacy price
   ```
   
   **Solution:** Update vehicle data in database to include:
   - `priceAirportTransfer` (e.g., 80)
   - `priceTrip` (e.g., 75)
   - `price6Hours` (e.g., 360)
   - `price12Hours` (e.g., 720)

2. **Check vehicle data via API**
   
   Open browser console and run:
   ```javascript
   fetch('/api/vehicles')
     .then(r => r.json())
     .then(data => {
       console.log('Vehicle prices:', data.data.map(v => ({
         name: v.name,
         priceAirportTransfer: v.priceAirportTransfer,
         priceTrip: v.priceTrip,
         price6Hours: v.price6Hours
       })));
     });
   ```

### Testing Checklist

Use these test cases to verify everything works:

#### Test 1: Airport Transfer ✈️

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Open booking modal | - |
| 2 | Enter "Ngurah Rai Airport" as pickup | - |
| 3 | Enter "Seminyak" as destination | - |
| 4 | Select "One Way" | - |
| 5 | Click Continue | Badge shows "Airport Transfer" |
| 6 | Check Alphard price | Shows $80 |
| 7 | Check console | `Is Airport Service: true` |
| 8 | Check console | `✈️ Airport Transfer price: $80` |

#### Test 2: General Trip 🚗

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Open booking modal | - |
| 2 | Enter "Seminyak" as pickup | - |
| 3 | Enter "Ubud" as destination | - |
| 4 | Select "One Way" | - |
| 5 | Click Continue | Badge shows "Trip" |
| 6 | Check Alphard price | Shows $75 |
| 7 | Check console | `Is Airport Service: false` |
| 8 | Check console | `🚗 Trip price: $75` |

#### Test 3: Rental (6 Hours) 🕐

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Open booking modal | - |
| 2 | Enter "Seminyak" as pickup | - |
| 3 | Enter "Ubud" as destination | - |
| 4 | Select "Round Trip" | - |
| 5 | Select "6 hours" duration | - |
| 6 | Click Continue | No badge (expected) |
| 7 | Check Alphard price | Shows $360 |
| 8 | Check console | `🕐 Rental (6hrs) price: $360` |

### Advanced Debugging

#### Enable Detailed Logging

All components now have console logging. To see full flow:

1. Open DevTools Console
2. Clear console (Ctrl+L)
3. Start booking flow
4. Watch logs in order:
   ```
   ✅ RideDetailsForm - Submitting data: {...}
   🔍 VehicleSelection - Checking locations: {...}
   🎯 VehicleSelection - Service Type: AIRPORT_TRANSFER
   💰 Getting price for Toyota Alphard: {...}
   📤 Passing to next step: {...}
   ```

#### Check Network Requests

1. Open DevTools → Network tab
2. Filter by "Fetch/XHR"
3. Start booking flow
4. Look for `/api/vehicles` request
5. Check response to ensure vehicles have correct price fields

#### Database Check

If prices are still wrong, check database directly:

```sql
SELECT 
  name,
  "priceAirportTransfer",
  "priceTrip",
  "price6Hours",
  "price12Hours"
FROM vehicles
WHERE status = 'AVAILABLE';
```

Expected results:
| name | priceAirportTransfer | priceTrip | price6Hours | price12Hours |
|------|---------------------|-----------|-------------|--------------|
| Toyota Alphard | 80 | 75 | 360 | 720 |
| Toyota Noah | 75 | 70 | 360 | 660 |
| Toyota Combi | 90 | 85 | 390 | 720 |

### Quick Fix Commands

#### Reset to default prices (if needed)

```javascript
// Run in browser console on admin page
fetch('/api/vehicles')
  .then(r => r.json())
  .then(data => {
    data.data.forEach(v => {
      const updates = {
        priceAirportTransfer: v.name.includes('Alphard') ? 80 : v.name.includes('Noah') ? 75 : 90,
        priceTrip: v.name.includes('Alphard') ? 75 : v.name.includes('Noah') ? 70 : 85,
        price6Hours: v.name.includes('Alphard') ? 360 : v.name.includes('Noah') ? 360 : 390,
        price12Hours: v.name.includes('Alphard') ? 720 : v.name.includes('Noah') ? 660 : 720
      };
      
      fetch(`/api/vehicles/${v.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
    });
  });
```

### Still Having Issues?

1. **Clear browser cache**
   - Chrome: Ctrl+Shift+Delete → Clear cached images and files
   - Or use Incognito/Private mode

2. **Check if code changes were deployed**
   - Verify `VehicleSelection.tsx` has `getVehiclePrice()` function
   - Verify `BookingForm.tsx` passes `bookingData` prop
   - Check file timestamps match deployment

3. **Restart dev server**
   ```bash
   npm run dev
   ```

4. **Check for TypeScript errors**
   ```bash
   npm run build
   ```

### Contact Information

If issue persists:
- Check GitHub Issues: [your-repo]/issues
- Email: [your-email]
- Include:
  - Console logs
  - Test case that fails
  - Screenshot of issue
  - Browser and version

---

**Last Updated:** December 16, 2025
**Version:** 1.0.0
