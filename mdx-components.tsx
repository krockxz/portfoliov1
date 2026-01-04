import type { MDXComponents } from 'mdx/types'
import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/mdx-table'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    table: ({ className, ...props }: React.ComponentProps<typeof Table>) => (
      <Table className={className} {...props} />
    ),
    thead: ({ className, ...props }: React.ComponentProps<typeof TableHeader>) => (
      <TableHeader className={className} {...props} />
    ),
    tbody: ({ className, ...props }: React.ComponentProps<typeof TableBody>) => (
      <TableBody className={className} {...props} />
    ),
    tr: ({ className, ...props }: React.ComponentProps<typeof TableRow>) => (
      <TableRow className={className} {...props} />
    ),
    th: ({ className, ...props }: React.ComponentProps<typeof TableHead>) => (
      <TableHead className={className} {...props} />
    ),
    td: ({ className, ...props }: React.ComponentProps<typeof TableCell>) => (
      <TableCell className={className} {...props} />
    ),
  }
}