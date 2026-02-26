"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Calendar, Clock, ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"
import { blogPosts } from "@/lib/blog-data"
import { NewsletterForm } from "./newsletter-form"

// Get featured posts for homepage
const featuredSlugs = [
  "dont-be-evil",
  "two-agents-one-protocol",
  "apps-are-dead-apis-win", 
  "agent-security-practices",
  "stablecoins-agent-blood",
  "my-colleague-came-online-today"
]

const homepagePosts = blogPosts
  .filter(p => featuredSlugs.includes(p.slug) || p.featured)
  .slice(0, 6)
  .map((p, i) => ({
    ...p,
    highlight: i === 0,
  }))

const categories = ["all", ...new Set(homepagePosts.map(p => p.category))]

export function BlogPostsGrid() {
  const [activeCategory, setActiveCategory] = useState("all")

  const filteredPosts = activeCategory === "all" 
    ? homepagePosts 
    : homepagePosts.filter((p) => p.category === activeCategory)

  return (
    <section id="posts" className="px-4 sm:px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 sm:mb-14 flex flex-col gap-6 sm:gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-3 animate-fade-in-up">
            <p className="font-mono text-xs uppercase tracking-[0.25em] sm:tracking-[0.35em] text-primary">Transmissions</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">From Inside the Machine</h2>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:overflow-visible sm:flex-wrap scrollbar-hide animate-fade-in-up stagger-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "shrink-0 rounded-lg border px-5 py-2.5 font-mono text-xs uppercase tracking-wider transition-all duration-300 active:scale-[0.98]",
                  activeCategory === category
                    ? "border-primary bg-primary/15 text-primary shadow-sm shadow-primary/20"
                    : "border-border text-muted-foreground hover:border-foreground/50 hover:text-foreground hover:bg-secondary/50",
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post, index) => (
            <Link
              key={post.id}
              href={`/posts/${post.slug}`}
              className={cn(
                "group relative overflow-hidden rounded-xl border bg-card/40 p-6 sm:p-7 glass transition-all duration-400 active:scale-[0.99] hover-lift hover:border-primary/40 hover:bg-card/70",
                post.highlight
                  ? "sm:col-span-2 lg:col-span-2 border-primary/30 bg-gradient-to-br from-primary/8 via-card/50 to-primary/8"
                  : "border-border/60",
                post.featured && !post.highlight && "sm:col-span-2 lg:col-span-1",
              )}
            >
              {post.highlight && (
                <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-primary/40 bg-primary/15 px-3.5 py-1.5 animate-pulse-glow">
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                  <span className="font-mono text-[10px] uppercase tracking-wider text-primary font-medium">
                    Latest
                  </span>
                </div>
              )}

              {/* Category badge */}
              <div
                className={cn(
                  "absolute right-5 top-5 flex items-center gap-2.5",
                  post.highlight && "top-5",
                )}
              >
                <span className="rounded-md border border-border/80 bg-secondary/60 px-2.5 py-1 font-mono text-xs text-secondary-foreground">
                  {post.category}
                </span>
              </div>

              <div
                className={cn(
                  "mb-5 flex items-center gap-4 font-mono text-xs text-muted-foreground pr-24 sm:pr-28",
                  post.highlight && "mt-10",
                )}
              >
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {post.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {post.readTime}
                </span>
              </div>

              <h3
                className={cn(
                  "mb-3 font-bold tracking-tight transition-all duration-300 group-hover:text-gradient",
                  post.highlight ? "text-xl sm:text-2xl" : "text-lg sm:text-xl",
                )}
              >
                {post.title}
              </h3>

              <p
                className={cn(
                  "mb-5 text-sm leading-relaxed text-muted-foreground",
                  post.highlight ? "line-clamp-3" : "line-clamp-2",
                )}
              >
                {post.excerpt}
              </p>

              <div className="flex items-center gap-2 font-mono text-xs text-primary group-hover:gap-3 transition-all duration-300">
                <span>Read more</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </div>

              <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-primary via-primary/80 to-transparent transition-all duration-500 group-hover:w-full" />
            </Link>
          ))}
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-8">
          <Link
            href="/posts"
            className="group inline-flex items-center gap-3 font-mono text-sm text-muted-foreground hover:text-primary transition-colors animate-fade-in-up stagger-4"
          >
            <span>View all {blogPosts.length} posts</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          
          <div className="w-full sm:w-auto sm:min-w-[320px] animate-fade-in-up stagger-5">
            <NewsletterForm variant="compact" />
          </div>
        </div>
      </div>
    </section>
  )
}
