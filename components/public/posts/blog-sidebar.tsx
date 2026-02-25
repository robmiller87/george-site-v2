"use client"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { Rss, Search, Tag, TrendingUp } from "lucide-react"
import { Input } from "@/components/ui/input"
import { blogPosts } from "@/lib/blog-data"
import { NewsletterForm } from "@/components/newsletter-form"

// Generate categories from actual posts
const categoryMap = blogPosts.reduce((acc, post) => {
  acc[post.category] = (acc[post.category] || 0) + 1
  return acc
}, {} as Record<string, number>)

const categories = [
  { name: "All Posts", count: blogPosts.length, slug: "all" },
  ...Object.entries(categoryMap)
    .sort((a, b) => b[1] - a[1])
    .map(([slug, count]) => ({
      name: slug.charAt(0).toUpperCase() + slug.slice(1),
      count,
      slug,
    }))
]

// Generate tags from actual posts
const tagMap = blogPosts.reduce((acc, post) => {
  post.tags.forEach(tag => {
    acc[tag] = (acc[tag] || 0) + 1
  })
  return acc
}, {} as Record<string, number>)

const popularTags = Object.entries(tagMap)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 10)
  .map(([tag]) => tag)

interface BlogSidebarProps {
  onCategoryChange?: (category: string) => void
  onSearch?: (query: string) => void
  activeCategory?: string
}

export function BlogSidebar({ onCategoryChange, onSearch, activeCategory = "all" }: BlogSidebarProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const sidebarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sidebarRef.current) {
      observer.observe(sidebarRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    onSearch?.(e.target.value)
  }

  return (
    <aside ref={sidebarRef} className="space-y-8 lg:sticky lg:top-28 lg:self-start">
      {/* Search */}
      <div className={cn("")}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={handleSearch}
            className="pl-10 bg-card/40 border-border/50 focus:border-primary/50"
          />
        </div>
      </div>

      {/* Categories */}
      <div className={cn("")}>
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-4 w-4 text-primary" />
          <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Categories</h3>
        </div>
        <div className="space-y-1">
          {categories.map((category) => (
            <button
              key={category.slug}
              onClick={() => onCategoryChange?.(category.slug)}
              className={cn(
                "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-all duration-300",
                activeCategory === category.slug
                  ? "bg-primary/10 text-primary border border-primary/30"
                  : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground border border-transparent",
              )}
            >
              <span>{category.name}</span>
              <span className="rounded-md bg-secondary/60 px-2 py-0.5 font-mono text-xs">{category.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Popular Tags */}
      <div className={cn("")}>
        <div className="flex items-center gap-2 mb-4">
          <Tag className="h-4 w-4 text-primary" />
          <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Popular Tags</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {popularTags.map((tag) => (
            <button
              key={tag}
              className="rounded-lg border border-border/50 bg-card/40 px-3 py-1.5 font-mono text-xs text-muted-foreground transition-all duration-300 hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div className={cn("")}>
        <NewsletterForm />
      </div>

      {/* RSS Feed */}
      <div className={cn("")}>
        <a
          href="/feed.xml"
          className="flex items-center justify-center gap-2 rounded-lg border border-border/50 bg-card/40 px-4 py-3 font-mono text-xs text-muted-foreground transition-all duration-300 hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
        >
          <Rss className="h-4 w-4" />
          <span>Subscribe via RSS</span>
        </a>
      </div>
    </aside>
  )
}
