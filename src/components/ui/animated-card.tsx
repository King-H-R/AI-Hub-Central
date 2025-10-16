'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Eye, Heart, Share2, Calendar } from 'lucide-react'
import { useState } from 'react'

interface AnimatedCardProps {
  title: string
  description: string
  category: string
  author: string
  authorAvatar?: string
  date: string
  views: number
  likes: number
  imageUrl?: string
  tags?: string[]
  index: number
  type?: 'news' | 'video' | 'image' | 'post'
  onLike?: () => void
  onShare?: () => void
}

export default function AnimatedCard({
  title,
  description,
  category,
  author,
  authorAvatar,
  date,
  views,
  likes,
  imageUrl,
  tags = [],
  index,
  type = 'news',
  onLike,
  onShare
}: AnimatedCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(likes)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1)
    onLike?.()
  }

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut"
      }
    },
    hover: {
      y: -10,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  }

  const imageVariants = {
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  }

  const getGradientClass = () => {
    switch (type) {
      case 'video':
        return 'from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900'
      case 'image':
        return 'from-cyan-100 to-blue-100 dark:from-cyan-900 dark:to-blue-900'
      default:
        return 'from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900'
    }
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      layout
    >
      <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer">
        {/* Image/Thumbnail Section */}
        <div className="relative aspect-video overflow-hidden">
          <motion.div 
            className={`w-full h-full bg-gradient-to-br ${getGradientClass()}`}
            variants={imageVariants}
            whileHover="hover"
          >
            {imageUrl && (
              <img 
                src={imageUrl} 
                alt={title}
                className="w-full h-full object-cover"
              />
            )}
          </motion.div>
          
          {/* Overlay with play button for videos */}
          {type === 'video' && (
            <motion.div 
              className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center">
                <div className="w-0 h-0 border-l-[16px] border-l-blue-600 border-y-[8px] border-y-transparent ml-1"></div>
              </div>
            </motion.div>
          )}

          {/* Category badge */}
          <div className="absolute top-3 left-3">
            <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
              {category}
            </Badge>
          </div>

          {/* Views indicator */}
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
            <Eye className="w-3 h-3" />
            {views.toLocaleString()}
          </div>
        </div>

        {/* Content Section */}
        <CardHeader className="pb-3">
          <CardTitle className="line-clamp-2 group-hover:text-blue-600 transition-colors">
            {title}
          </CardTitle>
          <CardDescription className="line-clamp-3 text-sm">
            {description}
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-0">
          {/* Author and Date */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Avatar className="w-6 h-6">
                <AvatarImage src={authorAvatar} />
                <AvatarFallback className="text-xs">{author[0]}</AvatarFallback>
              </Avatar>
              <span className="text-sm text-slate-600 dark:text-slate-400">{author}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <Calendar className="w-3 h-3" />
              {date}
            </div>
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {tags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{tags.length - 3}
                </Badge>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="ghost" 
                size="sm" 
                className={`flex items-center gap-1 ${isLiked ? 'text-red-500' : ''}`}
                onClick={handleLike}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                {likeCount}
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex items-center gap-1"
                onClick={onShare}
              >
                <Share2 className="w-4 h-4" />
                Share
              </Button>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}