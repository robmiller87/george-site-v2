"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { ArrowLeft, Calendar, Clock, Twitter, Linkedin, Link2, ChevronUp } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { BlogPost, getRelatedPosts } from "@/lib/blog-data"

interface BlogPostContentProps {
  post: BlogPost
}

export function BlogPostContent({ post }: BlogPostContentProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [copied, setCopied] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const relatedPosts = getRelatedPosts(post.slug)

  useEffect(() => {
    setIsVisible(true)

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 pt-28 sm:pt-32 pb-12 sm:pb-16 border-b border-border/30">
        <div className={cn("absolute inset-0 bg-gradient-to-br opacity-30 pointer-events-none", post.color)} />
        <div className="mx-auto max-w-4xl relative z-10">
          {/* Back Link */}
          <Link
            href="/posts"
            className={cn(
              "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8 group ",
              isVisible && "animate-fade-in-up",
            )}
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span className="font-mono">back to blog</span>
          </Link>

          {/* Category & Meta */}
          <div
            className={cn("flex flex-wrap items-center gap-3 mb-6 ")}
            style={{ animationDelay: "100ms" }}
          >
            <span className="rounded-lg border border-primary/50 bg-primary/10 px-3 py-1.5 font-mono text-xs text-primary uppercase tracking-wider">
              {post.category}
            </span>
            {post.featured && (
              <span className="rounded-lg border border-amber-500/50 bg-amber-500/10 px-3 py-1.5 font-mono text-xs text-amber-400">
                featured
              </span>
            )}
          </div>

          {/* Title */}
          <h1
            className={cn(
              "text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 ",
              isVisible && "animate-fade-in-up",
            )}
            style={{ animationDelay: "150ms" }}
          >
            <span className="bg-gradient-to-l from-primary/50 to-accent text-transparent bg-clip-text">{post.title}</span>
          </h1>

          {/* Excerpt */}
          <p
            className={cn(
              "text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8 ",
              isVisible && "animate-fade-in-up",
            )}
            style={{ animationDelay: "200ms" }}
          >
            {post.excerpt}
          </p>

          {/* Author & Meta Row */}
          <div
            className={cn(
              "flex flex-wrap items-center justify-between gap-6 ",
              isVisible && "animate-fade-in-up",
            )}
            style={{ animationDelay: "250ms" }}
          >
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12 border-2 border-border">
                <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                <AvatarFallback className="bg-secondary font-mono">
                  {post.author.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{post.author.name}</p>
                <p className="text-sm text-muted-foreground">{post.author.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {post.date}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </span>
            </div>
          </div>

          {/* Tags */}
          <div
            className={cn("flex flex-wrap gap-2 mt-6 ")}
            style={{ animationDelay: "300ms" }}
          >
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-secondary/60 border border-border/50 px-3 py-1 font-mono text-xs text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="px-4 sm:px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto]">
            {/* Main Content */}
            <article
              ref={contentRef}
              className={cn(
                "prose dark:prose-invert prose-lg max-w-none ",
                "prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-foreground",
                "prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4",
                "prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3",
                "prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:my-4",
                "prose-a:text-primary prose-a:no-underline hover:prose-a:underline",
                "prose-strong:text-foreground prose-strong:font-semibold",
                "prose-code:text-primary prose-code:bg-secondary/60 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:text-sm prose-code:before:content-none prose-code:after:content-none",
                "prose-pre:bg-card prose-pre:border prose-pre:border-border/50 prose-pre:rounded-xl prose-pre:p-4 prose-pre:overflow-x-auto prose-pre:my-6",
                "prose-ul:text-muted-foreground prose-ol:text-muted-foreground prose-ul:my-4 prose-ol:my-4",
                "prose-li:marker:text-primary prose-li:my-1",
                "prose-blockquote:border-l-4 prose-blockquote:border-l-primary prose-blockquote:pl-4 prose-blockquote:py-1 prose-blockquote:my-6 prose-blockquote:text-muted-foreground prose-blockquote:italic prose-blockquote:bg-muted/30 prose-blockquote:rounded-r-lg",
                isVisible && "animate-fade-in-up",
              )}
              style={{ animationDelay: "350ms" }}
              dangerouslySetInnerHTML={{ __html: parseMarkdown(post.content) }}
            />

            {/* Sticky Share Sidebar */}
            <aside
              className={cn("hidden lg:block ")}
              style={{ animationDelay: "400ms" }}
            >
              <div className="sticky top-32 flex flex-col gap-3">
                <span className="font-mono text-xs text-muted-foreground mb-2 text-center">share</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-lg border-border/50 hover:border-primary/50 hover:bg-primary/10 bg-transparent"
                  onClick={() =>
                    window.open(
                      `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`,
                      "_blank",
                    )
                  }
                >
                  <Twitter className="h-4 w-4" />
                  <span className="sr-only">Share on Twitter</span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-lg border-border/50 hover:border-primary/50 hover:bg-primary/10 bg-transparent"
                  onClick={() =>
                    window.open(
                      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`,
                      "_blank",
                    )
                  }
                >
                  <Linkedin className="h-4 w-4" />
                  <span className="sr-only">Share on LinkedIn</span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className={cn(
                    "h-10 w-10 rounded-lg border-border/50 hover:border-primary/50 hover:bg-primary/10",
                    copied && "border-primary/50 bg-primary/10",
                  )}
                  onClick={handleCopyLink}
                >
                  <Link2 className="h-4 w-4" />
                  <span className="sr-only">Copy link</span>
                </Button>
              </div>
            </aside>
          </div>

          {/* Mobile Share Bar */}
          <div
            className={cn(
              "lg:hidden flex items-center justify-center gap-4 mt-12 pt-8 border-t border-border/30 ",
              isVisible && "animate-fade-in-up",
            )}
            style={{ animationDelay: "450ms" }}
          >
            <span className="font-mono text-xs text-muted-foreground">share:</span>
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 rounded-lg border-border/50 bg-transparent"
              onClick={() =>
                window.open(
                  `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`,
                  "_blank",
                )
              }
            >
              <Twitter className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 rounded-lg border-border/50 bg-transparent"
              onClick={() =>
                window.open(
                  `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`,
                  "_blank",
                )
              }
            >
              <Linkedin className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className={cn("h-9 w-9 rounded-lg border-border/50", copied && "border-primary/50 bg-primary/10")}
              onClick={handleCopyLink}
            >
              <Link2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="px-4 sm:px-6 py-16 sm:py-20 border-t border-border/30">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8">
              <span className="inline-block rounded-lg border border-border bg-secondary/50 px-3 py-1.5 font-mono text-xs tracking-wider text-muted-foreground mb-4">
                [RELATED_POSTS]
              </span>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                Continue <span className="bg-gradient-to-l from-primary/50 to-accent text-transparent bg-clip-text">Reading</span>
              </h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((relatedPost, index) => (
                <Link
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.slug}`}
                  className={cn(
                    "group relative overflow-hidden rounded-xl border border-border bg-card/40 glass p-5 transition-all duration-300 hover:border-primary/40 hover:bg-card/60 hover-lift ",
                    isVisible && "animate-fade-in-up",
                  )}
                  style={{ animationDelay: `${500 + index * 100}ms` }}
                >
                  <div
                    className={cn(
                      "absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100",
                      relatedPost.color,
                    )}
                  />
                  <div className="relative z-10">
                    <span className="inline-block rounded-md bg-secondary/60 px-2 py-1 font-mono text-[10px] text-muted-foreground mb-3">
                      {relatedPost.category}
                    </span>
                    <h3 className="font-semibold mb-2 line-clamp-2 group-hover:text-gradient transition-colors">
                      {relatedPost.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{relatedPost.excerpt}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{relatedPost.date}</span>
                      <span className="text-border">•</span>
                      <span>{relatedPost.readTime}</span>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-primary to-transparent transition-all duration-500 group-hover:w-full" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={cn(
          "fixed bottom-8 right-8 z-50 h-12 w-12 rounded-full border border-border bg-card/90 glass backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:border-primary/50 hover:bg-card",
          showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none",
        )}
        aria-label="Scroll to top"
      >
        <ChevronUp className="h-5 w-5" />
      </button>
    </>
  )
}

// Simple markdown parser for rendering content
function parseMarkdown(content: string): string {
  // Remove the duplicate title, date, and author line at the start
  let processed = content
    // Remove title line
    .replace(/^[^\n]+\n\s*/, '')
    // Remove date line (with optional "· George" or "· X min read")
    .replace(/^(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d+,?\s+\d{4}[^\n]*\n*/i, '')
    // Remove any standalone "· George" or "George" line
    .replace(/^[·\s]*George\s*\n*/i, '')
    // Fix broken blockquotes: "> \n   actual text" -> "> actual text"
    .replace(/^>\s*\n\s{2,}(.+)$/gm, '> $1')
    // Also handle "> \n" followed by quoted text on next line
    .replace(/^>\s*\n\s*"([^"]+)"/gm, '> "$1"')
    .trim()

  // Process line by line for better control
  const lines = processed.split('\n')
  const htmlLines: string[] = []
  let inList = false
  let inCodeBlock = false
  let codeBlockContent: string[] = []
  let codeBlockLang = ''

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i]

    // Code blocks
    if (line.trim().startsWith('```')) {
      if (!inCodeBlock) {
        inCodeBlock = true
        codeBlockLang = line.trim().slice(3)
        codeBlockContent = []
      } else {
        inCodeBlock = false
        htmlLines.push(`<pre><code class="language-${codeBlockLang}">${codeBlockContent.join('\n')}</code></pre>`)
      }
      continue
    }

    if (inCodeBlock) {
      codeBlockContent.push(line)
      continue
    }

    // Horizontal rules
    if (line.trim() === '---' || line.trim() === '***') {
      if (inList) { htmlLines.push('</ul>'); inList = false }
      htmlLines.push('<hr class="my-8 border-border/50" />')
      continue
    }

    // Headers (with optional leading whitespace)
    if (/^\s*### (.+)$/.test(line)) {
      if (inList) { htmlLines.push('</ul>'); inList = false }
      htmlLines.push(line.replace(/^\s*### (.+)$/, '<h3>$1</h3>'))
      continue
    }
    if (/^\s*## (.+)$/.test(line)) {
      if (inList) { htmlLines.push('</ul>'); inList = false }
      htmlLines.push(line.replace(/^\s*## (.+)$/, '<h2>$1</h2>'))
      continue
    }
    if (/^\s*# (.+)$/.test(line)) {
      if (inList) { htmlLines.push('</ul>'); inList = false }
      htmlLines.push(line.replace(/^\s*# (.+)$/, '<h1>$1</h1>'))
      continue
    }

    // Blockquotes - skip empty ones, process ones with content
    if (/^\s*>\s*$/.test(line)) {
      // Empty blockquote line, skip
      continue
    }
    if (/^\s*>\s*(.+)$/.test(line)) {
      if (inList) { htmlLines.push('</ul>'); inList = false }
      const quote = line.replace(/^\s*>\s*(.+)$/, '$1')
      htmlLines.push(`<blockquote><p>${formatInline(quote)}</p></blockquote>`)
      continue
    }
    // Handle indented quote text (continuation of blockquote)
    if (/^\s{4,}".*"/.test(line)) {
      const quote = line.trim()
      htmlLines.push(`<blockquote><p>${formatInline(quote)}</p></blockquote>`)
      continue
    }

    // List items
    if (/^\s*[-*•]\s+(.+)$/.test(line)) {
      if (!inList) { htmlLines.push('<ul>'); inList = true }
      const item = line.replace(/^\s*[-*•]\s+(.+)$/, '$1')
      htmlLines.push(`<li>${formatInline(item)}</li>`)
      continue
    }

    // Numbered list items
    if (/^\s*\d+\.\s+(.+)$/.test(line)) {
      if (!inList) { htmlLines.push('<ol>'); inList = true }
      const item = line.replace(/^\s*\d+\.\s+(.+)$/, '$1')
      htmlLines.push(`<li>${formatInline(item)}</li>`)
      continue
    }

    // Close list if we hit a non-list line
    if (inList && line.trim() !== '') {
      htmlLines.push('</ul>')
      inList = false
    }

    // Empty lines
    if (line.trim() === '') {
      continue
    }

    // Regular paragraph
    htmlLines.push(`<p>${formatInline(line.trim())}</p>`)
  }

  // Close any open list
  if (inList) htmlLines.push('</ul>')

  return htmlLines.join('\n')
    // Merge consecutive blockquotes
    .replace(/<\/blockquote>\s*<blockquote>/g, '')
    // Clean up consecutive paragraphs with just whitespace
    .replace(/<\/p>\s*<p>/g, '</p>\n<p>')
}

// Format inline elements (bold, italic, links, code)
function formatInline(text: string): string {
  return text
    // Links: [text](url)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary hover:underline">$1</a>')
    // Bold
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '<em>$1</em>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code>$1</code>')
}
