import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

// Serve uploaded files from public/uploads directory
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    // Await params (Next.js 16+ requires params to be awaited)
    const resolvedParams = await params
    // Reconstruct the path from params
    const filePath = resolvedParams.path.join('/')
    
    // Security: Only allow files from uploads directory
    if (filePath.includes('..') || !filePath.startsWith('vehicles/') && !filePath.startsWith('blog/')) {
      return NextResponse.json(
        { error: 'Invalid file path' },
        { status: 400 }
      )
    }

    // Construct full file path
    const fullPath = join(process.cwd(), 'public', 'uploads', filePath)
    
    // Check if file exists
    if (!existsSync(fullPath)) {
      console.error(`❌ File not found: ${fullPath}`)
      return NextResponse.json(
        { error: 'File not found' },
        { status: 404 }
      )
    }

    // Read file
    const fileBuffer = await readFile(fullPath)
    
    // Determine content type from file extension
    const extension = filePath.split('.').pop()?.toLowerCase()
    const contentType = getContentType(extension || '')
    
    // Return file with appropriate headers
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch (error) {
    console.error('❌ Error serving file:', error)
    return NextResponse.json(
      { error: 'Failed to serve file' },
      { status: 500 }
    )
  }
}

function getContentType(extension: string): string {
  const contentTypes: Record<string, string> = {
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'gif': 'image/gif',
    'webp': 'image/webp',
    'svg': 'image/svg+xml',
    'pdf': 'application/pdf',
  }
  
  return contentTypes[extension] || 'application/octet-stream'
}

