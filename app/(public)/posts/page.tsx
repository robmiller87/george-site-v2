"use client"

import { useState, useMemo } from "react"
import { BlogHero } from "@/components/public/posts/blog-hero"
import { BlogSidebar } from "@/components/public/posts/blog-sidebar"
import { blogPosts } from "@/lib/blog-data"
import Link from "next/link"
import { Calendar, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      // Category filter
      if (activeCategory !== "all" && post.category !== activeCategory) {
        return false
      }
      
      // Tag filter
      if (activeTag && !post.tags.includes(activeTag)) {
        return false
      }
      
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        return (
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.tags.some(tag => tag.toLowerCase().includes(query))
        )
      }
      
      return true
    })
  }, [activeCategory, searchQuery, activeTag])

  return (
    <div>
      <BlogHero />
      <section className="px-4 sm:px-6 py-16 sm:py-20 border-t border-border/30">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
            {/* Posts List */}
            <div className="space-y-6">
              {activeTag && (
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-sm text-muted-foreground">Filtering by tag:</span>
                  <button
                    onClick={() => setActiveTag(null)}
                    className="inline-flex items-center gap-1 rounded-full bg-primary/10 border border-primary/30 px-3 py-1 text-sm text-primary hover:bg-primary/20"
                  >
                    #{activeTag}
                    <span className="ml-1">×</span>
                  </button>
                </div>
              )}
              
              {filteredPosts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No posts found matching your criteria.</p>
                  <button
                    onClick={() => {
                      setActiveCategory("all")
                      setSearchQuery("")
                      setActiveTag(null)
                    }}
                    className="mt-4 text-primary hover:underline"
                  >
                    Clear filters
                  </button>
                </div>
              ) : (
                filteredPosts.map((post, index) => (
                  <Link
                    key={post.id}
                    href={`/posts/${post.slug}`}
                    className={cn(
                      "group relative cursor-pointer overflow-hidden rounded-xl border border-border bg-card/40 glass p-6 sm:p-7 transition-all duration-400 hover:border-primary/40 hover:bg-card/60 active:scale-[0.995] hover-lift block",
                      post.featured && "ring-1 ring-primary/20"
                    )}
                  >
                    {/* Category badge */}
                    <div className="absolute right-5 top-5 flex items-center gap-2.5">
                      <span className="rounded-md border border-border/80 bg-secondary/60 px-2.5 py-1 font-mono text-xs text-secondary-foreground">
                        {post.category}
                      </span>
                    </div>

                    {/* Date & Read time */}
                    <div className="mb-4 flex items-center gap-4 font-mono text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        {post.readTime}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="mb-3 text-lg sm:text-xl font-bold tracking-tight transition-all duration-300 group-hover:text-primary">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="mb-4 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                      {post.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {post.tags.slice(0, 3).map(tag => (
                        <span
                          key={tag}
                          className="rounded-md bg-secondary/40 px-2 py-0.5 font-mono text-xs text-muted-foreground"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Hover line */}
                    <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-primary via-primary/80 to-transparent transition-all duration-500 group-hover:w-full" />
                  </Link>
                ))
              )}
              
              <p className="text-center text-sm text-muted-foreground pt-4">
                Showing {filteredPosts.length} of {blogPosts.length} posts
              </p>
            </div>

            {/* Sidebar */}
            <BlogSidebar
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
              onSearch={setSearchQuery}
              onTagClick={setActiveTag}
              activeTag={activeTag}
            />
          </div>
        </div>
      </section>
    </div>
  )
}
