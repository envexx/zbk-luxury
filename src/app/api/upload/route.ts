import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

// Check if we're in production/serverless environment
const isProduction = process.env.NODE_ENV === 'production'
const isVercel = process.env.VERCEL === '1'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const files = formData.getAll('files') as File[]
    const type = formData.get('type') as string || 'vehicles' // 'vehicles' or 'blog'
    
    console.log(`📤 Upload request received:`, {
      fileCount: files.length,
      type,
      environment: isProduction ? 'production' : 'development',
      platform: isVercel ? 'Vercel' : 'other'
    })
    
    if (!files || files.length === 0) {
      console.error('❌ No files uploaded')
      return NextResponse.json(
        { error: 'No files uploaded' },
        { status: 400 }
      )
    }

    // Validate environment
    if (isProduction || isVercel) {
      console.error('❌ File system upload not available in production')
      console.error('💡 Please configure Vercel Blob Storage or cloud storage')
      return NextResponse.json({
        error: 'File uploads require cloud storage configuration',
        details: 'File system uploads are not available in serverless environments. Please configure Vercel Blob, Cloudinary, or AWS S3.',
        setup: 'See documentation: https://vercel.com/docs/storage/vercel-blob'
      }, { status: 500 })
    }

    // Local development upload
    const uploadedFiles: string[] = []
    const uploadDir = join(process.cwd(), 'public', 'uploads', type)
    
    console.log(`📁 Upload directory: ${uploadDir}`)
    
    // Create upload directory if it doesn't exist
    if (!existsSync(uploadDir)) {
      console.log(`📂 Creating directory: ${uploadDir}`)
      await mkdir(uploadDir, { recursive: true })
    }

    for (const file of files) {
      console.log(`📄 Processing file: ${file.name} (${file.type}, ${file.size} bytes)`)
      
      if (!file.type.startsWith('image/')) {
        console.warn(`⚠️ Skipping non-image file: ${file.name}`)
        continue // Skip non-image files
      }

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        console.warn(`⚠️ File too large: ${file.name} (${file.size} bytes)`)
        return NextResponse.json({
          error: `File ${file.name} is too large. Maximum size is 5MB`
        }, { status: 400 })
      }

      // Generate unique filename
      const timestamp = Date.now()
      const randomString = Math.random().toString(36).substring(2, 15)
      const extension = file.name.split('.').pop()
      const prefix = type === 'blog' ? 'blog' : 'vehicle'
      const filename = `${prefix}_${timestamp}_${randomString}.${extension}`
      
      console.log(`💾 Generated filename: ${filename}`)
      
      // Convert file to buffer
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)
      
      // Write file to public/uploads/{type}
      const filepath = join(uploadDir, filename)
      await writeFile(filepath, buffer)
      
      // Store relative path for database
      const relativePath = `/uploads/${type}/${filename}`
      uploadedFiles.push(relativePath)
      
      console.log(`✅ Uploaded: ${filename} (${buffer.length} bytes)`)
    }

    console.log(`🎉 Successfully uploaded ${uploadedFiles.length} files`)
    
    return NextResponse.json({
      success: true,
      files: uploadedFiles,
      message: `Successfully uploaded ${uploadedFiles.length} files`
    })

  } catch (error) {
    console.error('❌ Upload error:', error)
    
    // Log detailed error info
    if (error instanceof Error) {
      console.error('Error message:', error.message)
      console.error('Error stack:', error.stack)
    }
    
    return NextResponse.json({
      error: 'Failed to upload files',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
