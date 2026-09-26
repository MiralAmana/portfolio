import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Every translatable text has an optional `_fr` twin. English is the fallback.
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    name: z.string(),
    kind: z.string().default('Project'),
    kind_fr: z.string().optional(),
    tagline: z.string(),
    tagline_fr: z.string().optional(),
    description: z.string(),
    description_fr: z.string().optional(),
    problem: z.string().optional(),
    problem_fr: z.string().optional(),
    solution: z.string().optional(),
    solution_fr: z.string().optional(),
    tech: z.array(z.string()).default([]),
    screenshots: z.array(z.string()).default([]),
    video: z.string().optional(),
    github: z.string().url().optional(),
    live: z.string().url().optional(),
    note: z.string().optional(),
    note_fr: z.string().optional(),
    status: z.enum(['building', 'shipped', 'placeholder']).default('building'),
    order: z.number().default(0)
  })
});

const knowledge = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/knowledge' }),
  schema: z.object({
    category: z.string(),
    category_fr: z.string().optional(),
    order: z.number().default(0),
    topics: z.array(
      z.object({
        name: z.string(),
        name_fr: z.string().optional(),
        definition: z.string().optional(),
        definition_fr: z.string().optional()
      })
    )
  })
});

const learning = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/learning' }),
  schema: z.object({
    track: z.string(),
    track_fr: z.string().optional(),
    order: z.number().default(0),
    items: z.array(
      z.object({
        name: z.string(),
        name_fr: z.string().optional(),
        done: z.boolean().default(false)
      })
    )
  })
});

const thoughts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/thoughts' }),
  schema: z.object({
    question: z.string(),
    question_fr: z.string().optional(),
    order: z.number().default(0),
    date: z.date().optional(),
    published: z.boolean().default(false)
  })
});

export const collections = { projects, knowledge, learning, thoughts };
