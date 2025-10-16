import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, type, itemId } = body

    if (!userId || !type || !itemId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if like already exists
    const existingLike = await db.like.findFirst({
      where: {
        userId,
        [type === 'news' ? 'newsId' : 
         type === 'video' ? 'videoId' : 
         type === 'image' ? 'imageId' : 
         type === 'post' ? 'postId' : 
         type === 'comment' ? 'commentId' : null]: itemId
      }
    })

    if (existingLike) {
      // Remove like
      await db.like.delete({
        where: { id: existingLike.id }
      })
      return NextResponse.json({ liked: false })
    } else {
      // Add like
      await db.like.create({
        data: {
          userId,
          [type === 'news' ? 'newsId' : 
           type === 'video' ? 'videoId' : 
           type === 'image' ? 'imageId' : 
           type === 'post' ? 'postId' : 
           type === 'comment' ? 'commentId' : null]: itemId
        }
      })
      return NextResponse.json({ liked: true })
    }
  } catch (error) {
    console.error('Error toggling like:', error)
    return NextResponse.json(
      { error: 'Failed to toggle like' },
      { status: 500 }
    )
  }
}