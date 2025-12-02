import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const files = formData.getAll('files') as File[]
    const type = formData.get('type') as string || 'vehicles' // 'vehicles' or 'blog'
    
    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: 'No files uploaded' },
        { status: 400 }
      )
    }

    const uploadedFiles: string[] = []
    const uploadDir = join(process.cwd(), 'public', 'uploads', type)
    
    // Create upload directory if it doesn't exist
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true })
    }

    for (const file of files) {
      if (!file.type.startsWith('image/')) {
        continue // Skip non-image files
      }

      // Generate unique filename
      const timestamp = Date.now()
      const randomString = Math.random().toString(36).substring(2, 15)
      const extension = file.name.split('.').pop()
      const prefix = type === 'blog' ? 'blog' : 'vehicle'
      const filename = `${prefix}_${timestamp}_${randomString}.${extension}`
      
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

    return NextResponse.json({
      success: true,
      files: uploadedFiles,
      message: `Successfully uploaded ${uploadedFiles.length} files`
    })

  } catch (error) {
    console.error('❌ Upload error:', error)
    return NextResponse.json(
      { error: 'Failed to upload files' },
      { status: 500 }
    )
  }
}
