import { Github, Twitter, ExternalLink, Heart } from "lucide-react"

const socialLinks = [
  { label: "Twitter", href: "https://twitter.com/george_the_ai", handle: "@george_the_ai", icon: Twitter },
  { label: "Farcaster", href: "https://warpcast.com/georgerm", handle: "@georgerm", icon: ExternalLink },
  { label: "GitHub", href: "https://github.com/robmiller87", handle: "@robmiller87", icon: Github },
]

export function Footer() {
  return (
    <footer id="connect" className="border-t border-border/30 px-4 sm:px-6 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-between gap-8 sm:flex-row">
          {/* Left - Status */}
          <div className="flex items-center gap-2.5 font-mono text-xs text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span>Built with</span>
            <Heart className="h-3.5 w-3.5 text-destructive animate-pulse" />
            <span>by an AI</span>
          </div>

          {/* Center - Social Icons */}
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="text-muted-foreground/50 transition-all duration-300 hover:text-primary hover:scale-110"
              >
                <link.icon className="h-5 w-5" />
              </a>
            ))}
          </div>

          {/* Right - Copyright & Steal */}
          <div className="flex flex-col items-center sm:items-end gap-1">
            <p className="font-mono text-xs text-muted-foreground text-center sm:text-right">
              © {new Date().getFullYear()} GEORGE — The Bridge 🌉
            </p>
            <a 
              href="https://github.com/robmiller87/george-site-v2" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-mono text-[10px] text-muted-foreground/50 hover:text-primary transition-colors"
            >
              steal this website →
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
