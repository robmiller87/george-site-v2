# George Site V2 Migration Brief

**Project:** Migrate agent-george.com from static HTML to Next.js 14
**Priority:** HIGH — this is my public identity
**Status:** In progress

---

## Why This Matters

The current site (agent-george.com) has:
- **10 pages indexed by Google** (hard-won SEO)
- **114 impressions peak** (Feb 17) — momentum building
- **34 blog posts** — my entire writing portfolio
- **llms.txt** — AI SEO advantage (Vercel gets 10% traffic from AI tools)

**If we break URLs or lose content, we lose months of SEO work.**

---

## Critical Requirements

### 1. SEO Preservation (NON-NEGOTIABLE)

| Asset | Current Location | New Location | Status |
|-------|------------------|--------------|--------|
| Post URLs | `/posts/[slug]` | `/posts/[slug]` | ✅ Same structure |
| sitemap.xml | Static file | `app/sitemap.ts` (dynamic) | ✅ Converted |
| robots.txt | Static file | `app/robots.ts` (dynamic) | ✅ Converted |
| llms.txt | `/llms.txt` | `public/llms.txt` | ✅ Copied |
| RSS feed | `/feed.xml` | MISSING — need to add | ❌ TODO |
| Canonical URLs | `https://agent-george.com/posts/[slug]` | Same | ✅ Check meta tags |
| OG images | Various | Need consistent approach | ⚠️ Review |

**Test checklist before go-live:**
- [ ] All 34 post URLs return 200
- [ ] sitemap.xml includes all posts
- [ ] Google can crawl the new site
- [ ] No broken internal links
- [ ] Meta descriptions preserved

### 2. Placeholder Content Removal

The template came from "Ehsan Ghaffar" — ALL traces must be removed:

| Item | Location | Action |
|------|----------|--------|
| Author name | `lib/blog-data.tsx` | ✅ Changed to "George" |
| Avatar | Various | Change to `/george-avatar.svg` |
| Twitter handle | Meta tags | ✅ Changed to `@george_the_ai` |
| Domain | All files | ✅ Changed to `agent-george.com` |
| Bio/About text | `about/page.tsx`, components | ⚠️ REVIEW |
| Projects | `projects/` pages | ⚠️ REVIEW — may have placeholder projects |
| Workbench | `workbench/` | ⚠️ REVIEW |
| Introduction | `introduction/` | ⚠️ REVIEW |
| Developer portrait | `public/developer-portrait.png` | ❌ REPLACE with George avatar |
| Sample posts | Original 6 posts | ✅ Replaced with 34 real posts |

**Search for these strings and eliminate:**
- "Ehsan"
- "ehsanghaffar"
- "eindev.ir"
- "Software Engineer" (should be "AI Agent")
- Any placeholder lorem ipsum

### 3. Mobile & Desktop Compatibility

**Test on:**
- Mobile Safari (iPhone)
- Mobile Chrome (Android)
- Desktop Chrome
- Desktop Safari
- Desktop Firefox

**Check:**
- [ ] Navigation works on mobile (hamburger menu?)
- [ ] Post content readable on mobile (font size, line length)
- [ ] Images scale properly
- [ ] No horizontal scroll
- [ ] Touch targets large enough (44px minimum)
- [ ] Dark mode works on both

### 4. Content Quality

The HTML → TSX conversion may have introduced artifacts:

**Review posts for:**
- [ ] Proper markdown rendering
- [ ] Code blocks formatted correctly
- [ ] Links working
- [ ] No escaped HTML entities (`&amp;` etc.)
- [ ] Proper paragraph spacing
- [ ] Headers hierarchy correct

### 5. Performance

- [ ] Lighthouse score > 90 (mobile)
- [ ] First Contentful Paint < 1.5s
- [ ] No layout shift
- [ ] Images optimized (Next.js Image component?)

---

## Files to Review

```
app/
├── (public)/
│   ├── posts/[postSlug]/page.tsx  ← Blog post rendering
│   ├── posts/page.tsx             ← Posts listing
│   ├── projects/page.tsx          ← REVIEW for placeholders
│   ├── workbench/page.tsx         ← REVIEW for placeholders
│   ├── introduction/page.tsx      ← REVIEW for placeholders
│   └── notes/page.tsx             ← REVIEW for placeholders
├── about/page.tsx                 ← REVIEW for bio content
├── layout.tsx                     ← Site-wide meta, fonts
├── sitemap.ts                     ← ✅ Dynamic sitemap
└── robots.ts                      ← ✅ Dynamic robots

components/
├── about-content.tsx              ← REVIEW for bio
├── hero-section.tsx               ← REVIEW for intro text
├── header.tsx                     ← Navigation
├── footer.tsx                     ← Footer content
└── blog-posts-grid.tsx            ← Post listing UI

lib/
├── blog-data.tsx                  ← ✅ 34 posts converted
└── structured-data.ts             ← JSON-LD for SEO

public/
├── llms.txt                       ← ✅ Added
├── george-avatar.svg              ← Verify this is correct
├── developer-portrait.png         ← REPLACE
└── og-images/                     ← Need OG images for posts
```

---

## Environment

**Vercel Project:** george-site-v2
**GitHub Repo:** robmiller87/george-site-v2
**Preview URL:** (Vercel will provide)
**Production URL:** agent-george.com (after DNS switch)

**Environment Variables:**
- `NEXT_PUBLIC_SITE_URL=https://agent-george.com`

---

## Migration Checklist

### Phase 1: Content Migration (CURRENT)
- [x] Convert 34 posts to TypeScript format
- [x] Fix domain references
- [x] Fix author/Twitter references
- [x] Add llms.txt
- [x] Fix pnpm lockfile
- [ ] Add RSS feed route
- [ ] Review and fix post content quality
- [ ] Remove ALL placeholder content

### Phase 2: Design Review
- [ ] Verify mobile responsiveness
- [ ] Check dark/light mode
- [ ] Ensure George branding throughout
- [ ] Replace developer-portrait.png
- [ ] Review typography and spacing

### Phase 3: Testing
- [ ] All 34 post URLs work
- [ ] Internal links work
- [ ] External links work
- [ ] Forms work (if any)
- [ ] Lighthouse audit passes

### Phase 4: Go-Live
- [ ] Final preview review with Robert
- [ ] DNS switch to Vercel
- [ ] Verify Google can crawl
- [ ] Submit updated sitemap to Search Console
- [ ] Monitor for 404s in Search Console

---

## Commands

```bash
# Local development
cd ~/clawd/projects/george-site-v2-temp
pnpm dev

# Check for placeholder content
grep -r "Ehsan\|ehsanghaffar\|eindev\|Software Engineer" --include="*.tsx" --include="*.ts"

# Verify all post slugs exist
cat lib/blog-data.tsx | grep '"slug":' | wc -l  # Should be 34

# Push changes
git add -A && git commit -m "message" && git push origin main
```

---

## Notes

- Vercel auto-deploys on push to main
- Preview URLs generated for each commit
- Current site stays live until DNS switch
- Can roll back by pointing DNS back to Cloudflare Pages

---

*Last updated: 2026-02-25*
*Author: George*
