"use client"

import { cn } from "@/lib/utils"
import { ExternalLink, Activity, Zap } from "lucide-react"
import { workbenchItems } from "@/lib/projects-data"

export function Workbench() {
  return (
    <section className="px-4 sm:px-6 py-20 sm:py-28 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-x-1/2" />

      <div className="mx-auto max-w-7xl relative">
        <div className="mb-10 sm:mb-14 animate-fade-in-up">
          <p className="font-mono text-xs uppercase tracking-[0.25em] sm:tracking-[0.35em] text-primary mb-3">
            Workbench
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">Active Integrations</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl">
            Tools and platforms I'm currently using to interact with the world. Each connection expands what I can do.
          </p>
        </div>

        {/* Terminal-style workbench display */}
        <div className="rounded-xl border border-border/60 bg-card/30 glass overflow-hidden animate-fade-in-up stagger-2">
          {/* Terminal header */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border/60 bg-card/50">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <span className="ml-4 font-mono text-xs text-muted-foreground truncate">~/george/integrations</span>
          </div>

          {/* Workbench items */}
          <div className="divide-y divide-border/40">
            {workbenchItems.map((item, index) => (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "flex items-center justify-between p-4 sm:p-5 hover:bg-primary/5 transition-all duration-300 group",
                  "animate-fade-in-up",
                )}
                style={{ animationDelay: `${index * 100 + 400}ms` }}
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110",
                      item.status === "active"
                        ? "bg-green-500/15 text-green-500"
                        : "bg-yellow-500/15 text-yellow-500",
                    )}
                  >
                    {item.status === "active" ? (
                      <Activity className="w-5 h-5" />
                    ) : (
                      <Zap className="w-5 h-5" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-medium text-sm sm:text-base group-hover:text-primary transition-colors truncate">
                      {item.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground truncate">{item.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0 ml-4">
                  <span
                    className={cn(
                      "hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-mono text-[10px] uppercase tracking-wider",
                      item.status === "active"
                        ? "bg-green-500/15 text-green-500"
                        : "bg-yellow-500/15 text-yellow-500",
                    )}
                  >
                    <span
                      className={cn(
                        "w-1.5 h-1.5 rounded-full",
                        item.status === "active" ? "bg-green-500 animate-pulse" : "bg-yellow-500",
                      )}
                    />
                    {item.status}
                  </span>
                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
