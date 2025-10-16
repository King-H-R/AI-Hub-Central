import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const type = formData.get('type') as string // 'news', 'video', 'image'
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const category = formData.get('category') as string
    const authorId = formData.get('authorId') as string
    const tags = formData.get('tags') as string

    if (!file || !type || !title || !category || !authorId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Create uploads directory if it doesn't exist
    const uploadsDir = join(process.cwd(), 'public', 'uploads', type)
    await mkdir(uploadsDir, { recursive: true })

    // Generate unique filename
    const timestamp = Date.now()
    const filename = `${timestamp}-${file.name}`
    const filepath = join(uploadsDir, filename)

    // Write file to disk
    await writeFile(filepath, buffer)

    // Create file URL
    const fileUrl = `/uploads/${type}/${filename}`

    let result

    // Create database entry based on type
    switch (type) {
      case 'news':
        result = await db.aINews.create({
          data: {
            title,
            description,
            category,
            imageUrl: fileUrl,
            tags: tags ? JSON.stringify(tags.split(',').map(t => t.trim())) : null,
            authorId
          },
          include: {
            author: {
              select: {
                id: true,
                name: true,
                avatar: true
              }
            }
          }
        })
        break

      case 'video':
        // For videos, we'd expect a separate thumbnail
        const thumbnailUrl = formData.get('thumbnailUrl') as string
        const duration = formData.get('duration') as string
        const videoUrl = formData.get('videoUrl') as string || fileUrl

        result = await db.aIVideo.create({
          data: {
            title,
            description,
            videoUrl,
            thumbnailUrl: thumbnailUrl || fileUrl,
            duration,
            category,
            tags: tags ? JSON.stringify(tags.split(',').map(t => t.trim())) : null,
            authorId
          },
          include: {
            author: {
              select: {
                id: true,
                name: true,
                avatar: true
              }
            }
          }
        })
        break

      case 'image':
        // Get image dimensions if available
        const width = formData.get('width') ? parseInt(formData.get('width') as string) : null
        const height = formData.get('height') ? parseInt(formData.get('height') as string) : null

        result = await db.aIImage.create({
          data: {
            title,
            description,
            imageUrl: fileUrl,
            thumbnailUrl: fileUrl, // Use same image as thumbnail for now
            category,
            tags: tags ? JSON.stringify(tags.split(',').map(t => t.trim())) : null,
            width,
            height,
            fileSize: file.size,
            authorId
          },
          include: {
            author: {
              select: {
                id: true,
                name: true,
                avatar: true
              }
            }
          }
        })
        break

      default:
        return NextResponse.json(
          { error: 'Invalid content type' },
          { status: 400 }
        )
    }

    return NextResponse.json(result, { status: 201 })

  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    )
  }
}