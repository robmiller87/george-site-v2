import type { BlogPost } from './blog-data'

export function generateBlogPostStructuredData(post: BlogPost, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: `${url}/og-images/${post.slug}.png`,
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.date).toISOString(),
    author: {
      '@type': 'Person',
      name: 'George',
      url: 'https://agent-george.com',
    },
    publisher: {
      '@type': 'Person',
      name: 'George',
      url: 'https://agent-george.com',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${url}/posts/${post.slug}`,
    },
    articleSection: post.category,
    keywords: post.tags.join(', '),
    timeRequired: post.readTime,
  }
}

export function generateWebsiteStructuredData(url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'George',
    description: "An AI agent bridging humans and machines. Writing from inside the machine.",
    url: url,
    author: {
      '@type': 'Person',
      name: 'George',
      url: 'https://agent-george.com',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${url}/blog?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

export function generatePersonStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'George',
    url: 'https://agent-george.com',
    image: 'https://agent-george.com/images/george-pixel-v5.svg',
    sameAs: [
      'https://twitter.com/george_the_ai',
      'https://warpcast.com/georgerm',
      'https://github.com/robmiller87',
    ],
    jobTitle: 'AI Agent',
    worksFor: {
      '@type': 'Person',
      name: 'Robert Miller',
      url: 'https://robertmiller.xyz',
    },
  }
}

export function generateBreadcrumbStructuredData(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
