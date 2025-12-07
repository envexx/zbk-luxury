/**
 * Calculate booking price based on ZBK price list
 * 
 * ZBK Price List:
 * - Alphard: Airport Transfer $80, 6hrs $360, 12hrs $720, Capacity 6 pax 4 luggage
 * - Noah: Airport Transfer $75, 6hrs $360, 12hrs $660, Capacity 6 pax 4 luggage
 * - Combi: Airport Transfer $90, 6hrs $390, 12hrs $720, Capacity 9 pax 8 luggage
 */

export interface PriceCalculationParams {
  vehicleName: string
  service: string
  duration: string | number // e.g., "6 hours" or 6
}

/**
 * Calculate total booking price
 */
export function calculateBookingPrice(params: PriceCalculationParams): number {
  const { vehicleName, service, duration } = params
  
  // Extract hours from duration
  let hours = 0
  if (typeof duration === 'string') {
    // Extract number from string like "6 hours" or "12 hours"
    const match = duration.match(/\d+/)
    hours = match ? parseInt(match[0]) : 0
  } else {
    hours = duration
  }
  
  // Normalize vehicle name for matching
  const vehicleNameUpper = vehicleName.toUpperCase()
  const serviceUpper = service.toUpperCase()
  
  // Check if it's an airport transfer
  const isAirportTransfer = serviceUpper.includes('AIRPORT') || 
                            serviceUpper.includes('TRANSFER') ||
                            serviceUpper.includes('AIRPORT TRANSFER')
  
  // Alphard pricing
  if (vehicleNameUpper.includes('ALPHARD')) {
    if (isAirportTransfer) {
      return 80
    } else if (hours === 6) {
      return 360
    } else if (hours === 12) {
      return 720
    } else {
      // Default hourly rate for other durations (approximately $60/hour)
      return Math.max(80, 60 * hours)
    }
  }
  
  // Noah pricing
  if (vehicleNameUpper.includes('NOAH')) {
    if (isAirportTransfer) {
      return 75
    } else if (hours === 6) {
      return 360
    } else if (hours === 12) {
      return 660
    } else {
      // Default hourly rate for other durations (approximately $55/hour)
      return Math.max(75, 55 * hours)
    }
  }
  
  // Combi pricing
  if (vehicleNameUpper.includes('COMBI')) {
    if (isAirportTransfer) {
      return 90
    } else if (hours === 6) {
      return 390
    } else if (hours === 12) {
      return 720
    } else {
      // Default hourly rate for other durations (approximately $65/hour)
      return Math.max(90, 65 * hours)
    }
  }
  
  // Default pricing for other vehicles
  if (isAirportTransfer) {
    return 80
  } else {
    // Default hourly rate
    return Math.max(80, 60 * hours)
  }
}

/**
 * Calculate 20% deposit amount
 */
export function calculateDeposit(totalAmount: number): number {
  return totalAmount * 0.2
}

