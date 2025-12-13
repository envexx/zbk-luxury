/**
 * Calculate booking price based on ZBK price list
 * 
 * ZBK Price List:
 * - Alphard: One Way $80, 6hrs $360, 12hrs $720, Capacity 6 pax 4 luggage
 * - Noah: One Way $75, 6hrs $360, 12hrs $660, Capacity 6 pax 4 luggage
 * - Combi: One Way $90, 6hrs $390, 12hrs $720, Capacity 9 pax 8 luggage
 * 
 * Pricing Logic:
 * - One Way: Flat rate per trip (no hourly calculation)
 * - Round Trip: Calculated based on hours (6hrs or 12hrs packages)
 */

export interface PriceCalculationParams {
  vehicleName: string
  service: string // 'one-way' or 'round-trip' or 'rental'
  duration?: string | number // e.g., "6 hours" or 6 (only used for round-trip)
}

/**
 * Calculate total booking price
 */
export function calculateBookingPrice(params: PriceCalculationParams): number {
  const { vehicleName, service, duration } = params
  
  // Normalize service type
  const serviceUpper = service.toUpperCase()
  const isOneWay = serviceUpper.includes('ONE') || 
                   serviceUpper.includes('ONE-WAY') || 
                   serviceUpper.includes('ONEWAY') ||
                   serviceUpper.includes('AIRPORT') || 
                   serviceUpper.includes('TRANSFER')
  
  // Normalize vehicle name for matching
  const vehicleNameUpper = vehicleName.toUpperCase()
  
  // ONE WAY: Flat rate per trip (no hours calculation)
  if (isOneWay) {
    if (vehicleNameUpper.includes('ALPHARD')) {
      return 80
    } else if (vehicleNameUpper.includes('NOAH')) {
      return 75
    } else if (vehicleNameUpper.includes('COMBI')) {
      return 90
    } else {
      return 80 // Default one-way price
    }
  }
  
  // ROUND TRIP: Calculate based on hours
  // Extract hours from duration
  let hours = 0
  if (duration) {
    if (typeof duration === 'string') {
      // Extract number from string like "6 hours" or "12 hours"
      const match = duration.match(/\d+/)
      hours = match ? parseInt(match[0]) : 6 // Default 6 hours if not specified
    } else {
      hours = duration
    }
  } else {
    hours = 6 // Default to 6 hours for round trip
  }
  
  // Alphard round trip pricing
  if (vehicleNameUpper.includes('ALPHARD')) {
    if (hours >= 12) {
      return 720
    } else if (hours >= 6) {
      return 360
    } else {
      // For less than 6 hours, use 6-hour rate
      return 360
    }
  }
  
  // Noah round trip pricing
  if (vehicleNameUpper.includes('NOAH')) {
    if (hours >= 12) {
      return 660
    } else if (hours >= 6) {
      return 360
    } else {
      return 360
    }
  }
  
  // Combi round trip pricing
  if (vehicleNameUpper.includes('COMBI')) {
    if (hours >= 12) {
      return 720
    } else if (hours >= 6) {
      return 390
    } else {
      return 390
    }
  }
  
  // Default pricing for other vehicles (round trip)
  if (hours >= 12) {
    return 720
  } else {
    return 360
  }
}

/**
 * Calculate 20% deposit amount
 */
export function calculateDeposit(totalAmount: number): number {
  return totalAmount * 0.2
}

