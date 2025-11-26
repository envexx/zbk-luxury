import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seedVehicles() {
  console.log('🚗 Seeding vehicles...')

  // Vehicle 1: Wedding Affairs - Toyota Alphard
  const weddingAlphard = await prisma.vehicle.upsert({
    where: { plateNumber: 'B-1234-WED' },
    update: {},
    create: {
      name: 'TOYOTA ALPHARD',
      model: 'ALPHARD',
      year: 2024,
      category: 'WEDDING_AFFAIRS',
      status: 'AVAILABLE',
      location: 'Jakarta',
      plateNumber: 'B-1234-WED',
      capacity: 7,
      color: 'Black',
      price: 300.00, // $300.00 per hour
      minimumHours: 5, // Minimum 5 hours
      purchaseDate: new Date('2024-01-01'),
      purchasePrice: 150000.00,
      mileage: '15000 km',
      features: [
        'Wedding Function Specialist',
        'Premium Interior',
        'Professional Chauffeur',
        'Wedding Decoration Ready',
        'Air Conditioning',
        'Sound System',
        'Leather Seats',
        'Privacy Glass'
      ],
      images: [
        '/vehicles/wedding-alphard-1.jpg', // Placeholder - akan diupdate
        '/vehicles/wedding-alphard-2.jpg',
        '/vehicles/wedding-alphard-3.jpg'
      ],
      description: 'Luxury Toyota Alphard specially prepared for wedding functions. Minimum 5 hours booking with professional chauffeur service. Perfect for bride and groom transportation with elegant interior and premium comfort.'
    }
  })

  // Vehicle 2: Alphard/Vellfire Premium
  const alphardVellfire = await prisma.vehicle.upsert({
    where: { plateNumber: 'B-5678-LUX' },
    update: {},
    create: {
      name: 'TOYOTA ALPHARD / VELLFIRE',
      model: 'ALPHARD/VELLFIRE',
      year: 2024,
      category: 'ALPHARD_PREMIUM',
      status: 'AVAILABLE',
      location: 'Jakarta',
      plateNumber: 'B-5678-LUX',
      capacity: 4, // 4 passengers (premium seating)
      color: 'Pearl White',
      price: 140.00, // $140.00 per hour
      minimumHours: 3, // Minimum 3 hours
      purchaseDate: new Date('2024-01-15'),
      purchasePrice: 160000.00,
      mileage: '8000 km',
      features: [
        'Premium Executive Seating',
        'Captain Chairs',
        'Entertainment System',
        'Mini Bar',
        'Air Conditioning',
        'WiFi Hotspot',
        'USB Charging Ports',
        'Privacy Curtains',
        'Massage Seats',
        'Premium Sound System'
      ],
      images: [
        '/vehicles/alphard-vellfire-1.jpg', // Placeholder - akan diupdate
        '/vehicles/alphard-vellfire-2.jpg',
        '/vehicles/alphard-vellfire-3.jpg'
      ],
      description: 'Premium Toyota Alphard/Vellfire with executive seating for 4 passengers. Perfect for business meetings, airport transfers, and luxury transportation. Features captain chairs and premium amenities for ultimate comfort.'
    }
  })

  console.log('✅ Vehicles seeded successfully!')
  console.log(`Wedding Alphard: ${weddingAlphard.id}`)
  console.log(`Alphard/Vellfire: ${alphardVellfire.id}`)
}

async function main() {
  try {
    await seedVehicles()
  } catch (error) {
    console.error('❌ Error seeding vehicles:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

if (require.main === module) {
  main()
}

export { seedVehicles }
