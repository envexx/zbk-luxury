'use client'

import { useState, useEffect } from 'react'
import { X, FileText, Upload, Eye } from '@/components/admin/Icons'

interface BlogPost {
  id?: string
  title: string
  slug: string
  excerpt: string
  content: string
  image: string
  author: string
  isPublished: boolean
  tags: string[]
  publishedAt?: string
  createdAt?: string
  updatedAt?: string
}

interface BlogModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (blog: BlogPost) => void
  blog?: BlogPost | null
  mode: 'add' | 'edit'
}

export default function BlogModal({ isOpen, onClose, onSave, blog, mode }: BlogModalProps) {
  const [formData, setFormData] = useState<BlogPost>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    image: '',
    author: 'ZBK Team',
    isPublished: false,
    tags: []
  })

  const [tagsInput, setTagsInput] = useState('')
  const [previewMode, setPreviewMode] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => {
    if (blog && mode === 'edit') {
      setFormData({
        ...blog,
        publishedAt: blog.publishedAt ? new Date(blog.publishedAt).toISOString().split('T')[0] : ''
      })
      setTagsInput(blog.tags.join(', '))
    } else {
      // Reset form for add mode
      setFormData({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        image: '',
        author: 'ZBK Team',
        isPublished: false,
        tags: []
      })
      setTagsInput('')
    }
    setPreviewMode(false)
  }, [blog, mode, isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const blogData = {
      ...formData,
      tags: tagsInput.split(',').map(t => t.trim()).filter(t => t.length > 0),
      slug: formData.slug || generateSlug(formData.title)
    }
    
    onSave(blogData)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))

    // Auto-generate slug from title
    if (name === 'title' && !formData.slug) {
      setFormData(prev => ({
        ...prev,
        slug: generateSlug(value)
      }))
    }
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  const handleFileUpload = async (file: File) => {
    console.log('🔄 Starting blog image upload...', file.name)
    setIsUploading(true)

    try {
      // Validate file
      if (!file.type.startsWith('image/')) {
        alert(`${file.name} is not an image file`)
        return
      }
      
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert(`${file.name} is too large. Maximum size is 5MB`)
        return
      }

      // Upload file to server
      const uploadFormData = new FormData()
      uploadFormData.append('files', file)
      uploadFormData.append('type', 'blog')

      console.log('📤 Uploading to server...')
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData
      })

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`)
      }

      const result = await response.json()
      console.log('✅ Upload response:', result)

      if (result.success && result.files && result.files.length > 0) {
        // Update form data with uploaded image URL
        setFormData(prev => ({
          ...prev,
          image: result.files[0]
        }))
        console.log('✅ Image URL updated:', result.files[0])
      } else {
        throw new Error(result.error || 'Upload failed')
      }
      
    } catch (error) {
      console.error('❌ Error uploading file:', error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      alert(`Error uploading image: ${errorMessage}`)
    } finally {
      setIsUploading(false)
      console.log('🏁 Upload process completed')
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {mode === 'add' ? 'Create New Blog Post' : 'Edit Blog Post'}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {mode === 'add' ? 'Write a new blog post for your website' : 'Update blog post content'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => setPreviewMode(!previewMode)}
              className="flex items-center space-x-2 px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              <Eye className="h-4 w-4" />
              <span>{previewMode ? 'Edit' : 'Preview'}</span>
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {!previewMode ? (
            <div className="space-y-6">
              {/* Basic Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Basic Information</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="lg:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 dark:bg-gray-700 dark:text-white bg-white text-gray-900"
                      placeholder="Enter blog post title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Slug *
                    </label>
                    <input
                      type="text"
                      name="slug"
                      value={formData.slug}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 dark:bg-gray-700 dark:text-white bg-white text-gray-900"
                      placeholder="url-friendly-slug"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Author
                    </label>
                    <input
                      type="text"
                      name="author"
                      value={formData.author}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 dark:bg-gray-700 dark:text-white bg-white text-gray-900"
                      placeholder="Author name"
                    />
                  </div>
                </div>
              </div>

              {/* Featured Image */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Featured Image</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Image URL
                    </label>
                    <input
                      type="url"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 dark:bg-gray-700 dark:text-white bg-white text-gray-900"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  
                  {/* Image Preview */}
                  {formData.image && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Preview
                      </label>
                      <img
                        src={formData.image}
                        alt="Featured"
                        className="w-full max-w-md h-48 object-cover rounded-lg border border-gray-200 dark:border-gray-600"
                      />
                    </div>
                  )}
                  
                  {/* Upload Alternative */}
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4">
                    <div className="text-center">
                      <Upload className={`mx-auto h-8 w-8 ${isUploading ? 'text-yellow-500 animate-pulse' : 'text-gray-400'}`} />
                      <div className="mt-2">
                        <label htmlFor="blog-image" className={`cursor-pointer ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {isUploading ? 'Uploading...' : 'Upload featured image'}
                          </span>
                          <span className="block text-xs text-gray-500 dark:text-gray-400">
                            PNG, JPG, JPEG up to 5MB
                          </span>
                        </label>
                        <input
                          id="blog-image"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          disabled={isUploading}
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) {
                              handleFileUpload(file)
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Content</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Excerpt *
                    </label>
                    <textarea
                      name="excerpt"
                      value={formData.excerpt}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 dark:bg-gray-700 dark:text-white bg-white text-gray-900"
                      placeholder="Brief description of the blog post..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Content *
                    </label>
                    <textarea
                      name="content"
                      value={formData.content}
                      onChange={handleInputChange}
                      required
                      rows={12}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 dark:bg-gray-700 dark:text-white bg-white text-gray-900"
                      placeholder="Write your blog post content here... (Supports Markdown)"
                    />
                  </div>
                </div>
              </div>

              {/* Tags & Publishing */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Tags & Publishing</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Tags (comma separated)
                    </label>
                    <input
                      type="text"
                      value={tagsInput}
                      onChange={(e) => setTagsInput(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 dark:bg-gray-700 dark:text-white bg-white text-gray-900"
                      placeholder="luxury, travel, tips, guide"
                    />
                  </div>
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="isPublished"
                        checked={formData.isPublished}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        Publish immediately
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Preview Mode */
            <div className="space-y-6">
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{formData.title}</h1>
                <p className="text-gray-600 dark:text-gray-400">By {formData.author}</p>
                
                {formData.image && (
                  <img
                    src={formData.image}
                    alt={formData.title}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                )}
                
                <p className="text-lg text-gray-700 dark:text-gray-300 italic">{formData.excerpt}</p>
                
                <div className="whitespace-pre-wrap text-gray-900 dark:text-white">
                  {formData.content}
                </div>
                
                {tagsInput && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {tagsInput.split(',').map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-xs rounded-full"
                      >
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-yellow-500 border border-transparent rounded-md shadow-sm hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            >
              {mode === 'add' ? 'Create Post' : 'Update Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
