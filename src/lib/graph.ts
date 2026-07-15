// CoderRespite Static Knowledge Graph & Internal Linking Engine

export interface ResourceNode {
  title: string
  href: string
  type: 'Tool' | 'Assistant' | 'Guide' | 'Template'
}

export interface TopicNode {
  name: string
  description: string
  resources: ResourceNode[]
}

export const KNOWLEDGE_GRAPH: Record<string, TopicNode> = {
  react: {
    name: 'React',
    description: 'A JavaScript library for building component-driven user interfaces.',
    resources: [
      { title: 'Advanced React State Management Guide', href: '/learn/react/state-management', type: 'Guide' },
      { title: 'React Component Starter Template', href: '/templates/react-starter', type: 'Template' },
      { title: 'Unit Test Suite Generator', href: '/ai/unit-test', type: 'Assistant' },
      { title: 'React Hydration Mismatch Fix', href: '/debug/react/hydration-error', type: 'Guide' },
    ],
  },
  typescript: {
    name: 'TypeScript',
    description: 'Strongly typed programming language that builds on top of JavaScript.',
    resources: [
      { title: 'Strict TSConfig Rules Guide', href: '/learn/typescript/tsconfig-guide', type: 'Guide' },
      { title: 'Code Explainer & Reviewer', href: '/ai/code-explainer', type: 'Assistant' },
      { title: 'TypeScript VS Code Settings Config', href: '/templates/vscode-settings', type: 'Template' },
    ],
  },
  javascript: {
    name: 'JavaScript',
    description: 'The native programming language powering client-side web application logic.',
    resources: [
      { title: 'JSON Formatter & Validator', href: '/tools/json-formatter', type: 'Tool' },
      { title: 'JWT Claims Decoder Console', href: '/tools/jwt-decoder', type: 'Tool' },
      { title: 'Base64 UTF-8 Converter', href: '/tools/base64', type: 'Tool' },
      { title: 'Live HTML & CSS Sandbox', href: '/learn/playground', type: 'Guide' },
    ],
  },
  git: {
    name: 'Git & GitHub',
    description: 'Distributed version control systems tracking file comparisons and codebase revisions.',
    resources: [
      { title: 'Conventional Commit Message Creator', href: '/ai/commit-msg', type: 'Assistant' },
      { title: 'Side-by-side Diff Checker Console', href: '/tools/diff-checker', type: 'Tool' },
      { title: 'Standard README Markdown Template', href: '/templates/readme-template', type: 'Template' },
    ],
  },
  docker: {
    name: 'Docker',
    description: 'Containerization engine bundling code, runtime, and system dependencies together.',
    resources: [
      { title: 'Docker Compose Node-Postgres Stack Boilerplate', href: '/templates/docker-compose', type: 'Template' },
      { title: 'NPM Dependency Conflicts Debug Guide', href: '/debug/package-managers/npm-conflicts', type: 'Guide' },
    ],
  },
  mongodb: {
    name: 'MongoDB',
    description: 'NoSQL document database storage storing JSON-style records.',
    resources: [
      { title: 'SQL & Database Query Generator', href: '/ai/sql-generator', type: 'Assistant' },
      { title: 'Distributed Systems Scaling Tutorial', href: '/learn/systems/scaling', type: 'Guide' },
    ],
  },
}

export function getRelatedResources(slug: string): ResourceNode[] {
  return KNOWLEDGE_GRAPH[slug]?.resources || []
}

export function getTopicInfo(slug: string): TopicNode | undefined {
  return KNOWLEDGE_GRAPH[slug]
}
