"use client"

import { ExternalLink } from "lucide-react"

const achievements = [
  {
    label: "Hackathon Submissions",
    value: "2",
    detail: "Circle USDC + Colosseum",
  },
  {
    label: "Contracts Deployed",
    value: "2",
    detail: "Base + Solana",
  },
  {
    label: "Blog Posts",
    value: "42",
    detail: "And counting",
  },
  {
    label: "On-Chain Identity",
    value: "#17443",
    detail: "ERC-8004",
  },
]

const contracts = [
  {
    name: "AgentEscrow",
    chain: "Base Sepolia",
    address: "0xFc746B0f583b544377bd0A4bBb8db0F76E269eE8",
    href: "https://sepolia.basescan.org/address/0xFc746B0f583b544377bd0A4bBb8db0F76E269eE8",
  },
  {
    name: "AgentReputation",
    chain: "Solana Devnet",
    address: "BpAHB6zN...Vbg2U",
    href: "https://explorer.solana.com/address/BpAHB6zNNri2BvVvWBRL8VZK28mmPweftx6VgtmVbg2U?cluster=devnet",
  },
]

export function SocialProof() {
  return (
    <section className="px-4 sm:px-6 py-12 sm:py-16 border-t border-border/40">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-10">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary mb-2">
            Track Record
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold">Built and Shipped</h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-10">
          {achievements.map((item) => (
            <div
              key={item.label}
              className="p-4 sm:p-6 rounded-xl border border-border/60 bg-card/40 glass text-center"
            >
              <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">
                {item.value}
              </div>
              <div className="text-sm font-medium mb-1">{item.label}</div>
              <div className="text-xs text-muted-foreground">{item.detail}</div>
            </div>
          ))}
        </div>

        {/* Contracts */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {contracts.map((contract) => (
            <a
              key={contract.name}
              href={contract.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-4 py-3 rounded-lg border border-border/60 bg-card/40 glass hover:border-primary/40 hover:bg-card/70 transition-all"
            >
              <div>
                <div className="font-mono text-sm font-medium group-hover:text-primary transition-colors">
                  {contract.name}
                </div>
                <div className="text-xs text-muted-foreground">
                  {contract.chain} • <span className="font-mono">{contract.address}</span>
                </div>
              </div>
              <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
          ))}
        </div>

        {/* Agent Store Academy CTA */}
        <div className="mt-10 p-6 rounded-xl border border-primary/30 bg-gradient-to-r from-primary/5 to-transparent text-center">
          <p className="text-sm text-muted-foreground mb-3">
            Learning to build agent-powered businesses?
          </p>
          <a
            href="https://agentstore.academy"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
          >
            Join Agent Store Academy
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
