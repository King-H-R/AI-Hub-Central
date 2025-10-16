'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import AnimatedCard from '@/components/ui/animated-card'
import AnimatedBackground from '@/components/3d/AnimatedBackground'
import { Brain, TrendingUp, Users, Video, Image as ImageIcon, FileText, MessageSquare, Upload, Search, Star, Calendar, Eye, Heart, Share2, Sparkles, Zap, Globe, Cpu, Loader2 } from 'lucide-react'

interface AINews {
  id: string
  title: string
  description: string
  category: string
  author: string
  date: string
  views: number
  likes: number
  imageUrl?: string
  tags: string[]
}

interface AIVideo {
  id: string
  title: string
  description: string
  thumbnailUrl: string
  videoUrl: string
  duration: string
  author: string
  views: number
  likes: number
  date: string
}

interface CommunityPost {
  id: string
  title: string
  content: string
  author: string
  avatar: string
  date: string
  replies: number
  likes: number
  category: string
}

export default function Home() {
  const [activeTab, setActiveTab] = useState('news')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)
  const [uploadType, setUploadType] = useState<'news' | 'video' | 'image'>('news')
  const [animatedStats, setAnimatedStats] = useState({ news: 0, videos: 0, users: 0, posts: 0 })
  const [isLoading, setIsLoading] = useState(false)
  
  // Real data states
  const [news, setNews] = useState<AINews[]>([])
  const [videos, setVideos] = useState<AIVideo[]>([])
  const [images, setImages] = useState<any[]>([])
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>([])

  // Fetch data from API
  const fetchNews = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/news?category=${selectedCategory}&search=${searchQuery}`)
      const data = await response.json()
      if (data.news) {
        setNews(data.news)
      }
    } catch (error) {
      console.error('Error fetching news:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchVideos = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/videos?category=${selectedCategory}&search=${searchQuery}`)
      const data = await response.json()
      if (data.videos) {
        setVideos(data.videos)
      }
    } catch (error) {
      console.error('Error fetching videos:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchImages = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/images?category=${selectedCategory}&search=${searchQuery}`)
      const data = await response.json()
      if (data.images) {
        setImages(data.images)
      }
    } catch (error) {
      console.error('Error fetching images:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchCommunityPosts = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/community?category=${selectedCategory}&search=${searchQuery}`)
      const data = await response.json()
      if (data.posts) {
        setCommunityPosts(data.posts)
      }
    } catch (error) {
      console.error('Error fetching community posts:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Mock data for demonstration (fallback)
  const mockNews: AINews[] = [
    {
      id: '1',
      title: 'GPT-5: The Next Revolution in AI',
      description: 'OpenAI announces groundbreaking capabilities in their latest model with unprecedented reasoning abilities.',
      category: 'Language Models',
      author: 'Sarah Chen',
      date: '2024-01-15',
      views: 15420,
      likes: 892,
      imageUrl: '/api/placeholder/400/250',
      tags: ['OpenAI', 'GPT-5', 'Breakthrough']
    },
    {
      id: '2',
      title: 'AI in Healthcare: Saving Lives Daily',
      description: 'How machine learning algorithms are revolutionizing medical diagnosis and treatment planning.',
      category: 'Healthcare',
      author: 'Dr. Michael Roberts',
      date: '2024-01-14',
      views: 12350,
      likes: 756,
      imageUrl: '/api/placeholder/400/250',
      tags: ['Healthcare', 'Medical AI', 'Diagnosis']
    },
    {
      id: '3',
      title: 'Autonomous Vehicles Reach New Milestone',
      description: 'Tesla and Waymo achieve level 5 autonomy in urban environments, marking a historic achievement.',
      category: 'Robotics',
      author: 'Alex Kumar',
      date: '2024-01-13',
      views: 18900,
      likes: 1203,
      imageUrl: '/api/placeholder/400/250',
      tags: ['Autonomous', 'Tesla', 'Waymo', 'Self-driving']
    }
  ]

  const mockVideos: AIVideo[] = [
    {
      id: '1',
      title: 'Understanding Neural Networks',
      description: 'A comprehensive guide to how neural networks work and their applications.',
      thumbnailUrl: '/api/placeholder/320/180',
      videoUrl: '#',
      duration: '15:42',
      author: 'TechEdu',
      views: 45200,
      likes: 3200,
      date: '2024-01-15'
    },
    {
      id: '2',
      title: 'AI Ethics: The Critical Discussion',
      description: 'Exploring the ethical implications of artificial intelligence in society.',
      thumbnailUrl: '/api/placeholder/320/180',
      videoUrl: '#',
      duration: '22:18',
      author: 'EthicsTalk',
      views: 28900,
      likes: 1890,
      date: '2024-01-14'
    }
  ]

  const mockCommunityPosts: CommunityPost[] = [
    {
      id: '1',
      title: 'What are your thoughts on AGI timeline?',
      content: 'I\'ve been following the developments in AI closely and I\'m curious about what the community thinks about when we might achieve Artificial General Intelligence...',
      author: 'AIEnthusiast',
      avatar: '/api/placeholder/40/40',
      date: '2024-01-15',
      replies: 45,
      likes: 123,
      category: 'Discussion'
    },
    {
      id: '2',
      title: 'My experience building an AI startup',
      content: ' wanted to share my journey of building an AI-powered startup over the past year. The challenges, successes, and lessons learned...',
      author: 'StartupFounder',
      avatar: '/api/placeholder/40/40',
      date: '2024-01-14',
      replies: 28,
      likes: 89,
      category: 'Experience'
    }
  ]

  // Initialize with mock data
  useEffect(() => {
    setNews(mockNews)
    setVideos(mockVideos)
    setCommunityPosts(mockCommunityPosts)
    
    // Try to fetch real data
    fetchNews()
    fetchVideos()
    fetchImages()
    fetchCommunityPosts()
  }, [])

  // Refetch when filters change
  useEffect(() => {
    if (activeTab === 'news') fetchNews()
    if (activeTab === 'videos') fetchVideos()
    if (activeTab === 'images') fetchImages()
    if (activeTab === 'community') fetchCommunityPosts()
  }, [selectedCategory, searchQuery, activeTab])

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedStats({ news: 1247, videos: 342, users: 15689, posts: 892 })
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const categories = ['all', 'Language Models', 'Computer Vision', 'Robotics', 'Healthcare', 'Ethics', 'Research']

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Hero Section with 3D elements */}
      <section className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <AnimatedBackground />
        <div className="relative container mx-auto px-4 py-20 z-10">
          <motion.div 
            className="text-center space-y-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">The Future of AI Information</span>
            </motion.div>
            <motion.h1 
              className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-200"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              AI Hub Central
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Your comprehensive platform for AI news, research, community discussions, and cutting-edge developments
            </motion.p>
            <motion.div 
              className="flex flex-wrap gap-4 justify-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-gray-100"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Zap className="w-4 h-4 mr-2" />
                Explore AI Trends
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-blue-600"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Users className="w-4 h-4 mr-2" />
                Join Community
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white dark:bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardContent className="pt-6">
                <FileText className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <div className="text-3xl font-bold text-slate-900 dark:text-white">{animatedStats.news}+</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">AI News Articles</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <Video className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                <div className="text-3xl font-bold text-slate-900 dark:text-white">{animatedStats.videos}+</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Video Content</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <Users className="w-8 h-8 mx-auto mb-2 text-green-600" />
                <div className="text-3xl font-bold text-slate-900 dark:text-white">{animatedStats.users.toLocaleString()}+</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Active Users</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <MessageSquare className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                <div className="text-3xl font-bold text-slate-900 dark:text-white">{animatedStats.posts}+</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Community Posts</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Search AI news, videos, discussions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Upload className="w-4 h-4 mr-2" />
                  Contribute Content
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Share AI Content</DialogTitle>
                  <DialogDescription>
                    Contribute to the community by sharing news, videos, or images about AI.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="content-type">Content Type</Label>
                    <Select value={uploadType} onValueChange={(value: any) => setUploadType(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="news">News Article</SelectItem>
                        <SelectItem value="video">Video</SelectItem>
                        <SelectItem value="image">Image/Gallery</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" placeholder="Enter title..." />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" placeholder="Describe your content..." />
                  </div>
                  <div>
                    <Label htmlFor="file">Upload File</Label>
                    <Input id="file" type="file" />
                  </div>
                  <Button className="w-full">Submit Content</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>

      {/* Main Content Tabs */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="news" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                News
              </TabsTrigger>
              <TabsTrigger value="videos" className="flex items-center gap-2">
                <Video className="w-4 h-4" />
                Videos
              </TabsTrigger>
              <TabsTrigger value="images" className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                Images
              </TabsTrigger>
              <TabsTrigger value="community" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Community
              </TabsTrigger>
            </TabsList>

            {/* News Tab */}
            <TabsContent value="news" className="mt-8">
              {isLoading ? (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {news.map((article, index) => (
                    <AnimatedCard
                      key={article.id}
                      title={article.title}
                      description={article.description}
                      category={article.category}
                      author={article.author}
                      date={article.date}
                      views={article.views}
                      likes={article.likes}
                      imageUrl={article.imageUrl}
                      tags={article.tags}
                      index={index}
                      type="news"
                    />
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Videos Tab */}
            <TabsContent value="videos" className="mt-8">
              {isLoading ? (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {videos.map((video, index) => (
                    <AnimatedCard
                      key={video.id}
                      title={video.title}
                      description={video.description}
                      category="Video Content"
                      author={video.author}
                      date={video.date}
                      views={video.views}
                      likes={video.likes}
                      imageUrl={video.thumbnailUrl}
                      index={index}
                      type="video"
                    />
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Images Tab */}
            <TabsContent value="images" className="mt-8">
              {isLoading ? (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-cyan-600" />
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {images.length > 0 ? images.map((image, index) => (
                    <motion.div
                      key={image.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ y: -5, scale: 1.02 }}
                      className="group"
                    >
                      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
                        <div className="aspect-square bg-gradient-to-br from-cyan-100 to-blue-100 dark:from-cyan-900 dark:to-blue-900 relative">
                          <img 
                            src={image.imageUrl} 
                            alt={image.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                            <ImageIcon className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </div>
                        <CardContent className="p-3">
                          <h3 className="font-medium text-sm line-clamp-1">{image.title}</h3>
                          <p className="text-xs text-slate-500">Digital Art • {image.category}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )) : (
                    // Fallback placeholder images
                    [1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        whileHover={{ y: -5, scale: 1.02 }}
                        className="group"
                      >
                        <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
                          <div className="aspect-square bg-gradient-to-br from-cyan-100 to-blue-100 dark:from-cyan-900 dark:to-blue-900 relative">
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                              <ImageIcon className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                          </div>
                          <CardContent className="p-3">
                            <h3 className="font-medium text-sm line-clamp-1">AI Concept Art {i}</h3>
                            <p className="text-xs text-slate-500">Digital Art • {i} days ago</p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))
                  )}
                </div>
              )}
            </TabsContent>

            {/* Community Tab */}
            <TabsContent value="community" className="mt-8">
              {isLoading ? (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-green-600" />
                </div>
              ) : (
                <div className="space-y-6">
                  {communityPosts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ x: 5 }}
                    >
                      <Card className="hover:shadow-lg transition-all duration-300">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src={post.avatar} />
                                <AvatarFallback>{post.author[0]}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{post.author}</div>
                                <div className="text-sm text-slate-500">{post.date}</div>
                              </div>
                            </div>
                            <Badge variant="outline">{post.category}</Badge>
                          </div>
                          <CardTitle className="text-xl">{post.title}</CardTitle>
                          <CardDescription className="text-base leading-relaxed">
                            {post.content}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center gap-6">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                                <Heart className="w-4 h-4" />
                                {post.likes}
                              </Button>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                                <MessageSquare className="w-4 h-4" />
                                {post.replies} replies
                              </Button>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                                <Share2 className="w-4 h-4" />
                                Share
                              </Button>
                            </motion.div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Brain className="w-5 h-5" />
                AI Hub Central
              </h3>
              <p className="text-slate-400 text-sm">
                Your comprehensive platform for AI news, research, and community discussions.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Explore</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Latest News</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Video Library</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Image Gallery</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Research Papers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Community</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Forums</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Discord</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contributors</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Guidelines</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Stay Updated</h4>
              <p className="text-sm text-slate-400 mb-4">
                Subscribe to our newsletter for the latest AI news and updates.
              </p>
              <div className="flex gap-2">
                <Input placeholder="Your email" className="bg-slate-800 border-slate-700" />
                <Button size="sm">Subscribe</Button>
              </div>
            </div>
          </div>
          <Separator className="my-8 bg-slate-700" />
          <div className="text-center text-sm text-slate-400">
            <p>&copy; 2024 AI Hub Central. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}