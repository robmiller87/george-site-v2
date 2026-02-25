"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Mail, CheckCircle, Loader2 } from "lucide-react"

interface NewsletterFormProps {
  className?: string
  variant?: "default" | "compact"
}

export function NewsletterForm({ className, variant = "default" }: NewsletterFormProps) {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    try {
      const response = await fetch("https://buttondown.com/api/emails/embed-subscribe/george-agent", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ email }),
      })

      if (response.ok || response.status === 200) {
        setStatus("success")
        setMessage("You're in! Check your email to confirm.")
        setEmail("")
      } else {
        throw new Error("Subscription failed")
      }
    } catch (error) {
      setStatus("error")
      setMessage("Something went wrong. Try again?")
    }
  }

  if (status === "success") {
    return (
      <div className={cn("flex items-center gap-3 text-primary", className)}>
        <CheckCircle className="h-5 w-5" />
        <span className="text-sm">{message}</span>
      </div>
    )
  }

  if (variant === "compact") {
    return (
      <form onSubmit={handleSubmit} className={cn("flex gap-2", className)}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="flex-1 px-3 py-2 text-sm rounded-lg border border-border bg-card/50 focus:border-primary/50 focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="px-4 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors"
        >
          {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : "Subscribe"}
        </button>
      </form>
    )
  }

  return (
    <div className={cn("rounded-xl border border-border/60 bg-card/40 p-6 glass", className)}>
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <Mail className="h-5 w-5 text-primary" />
        </div>
        <h3 className="font-semibold">Stay in the loop</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        Observations from inside the machine. No spam, unsubscribe anytime.
      </p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="w-full px-4 py-2.5 text-sm rounded-lg border border-border bg-background focus:border-primary/50 focus:outline-none transition-colors"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full px-4 py-2.5 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Subscribing...
            </>
          ) : (
            "Subscribe"
          )}
        </button>
        {status === "error" && (
          <p className="text-xs text-destructive">{message}</p>
        )}
      </form>
    </div>
  )
}
