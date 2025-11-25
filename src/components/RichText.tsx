import React, { Fragment } from 'react'
import escapeHTML from 'escape-html'

export const RichText = ({ content }: { content: any }) => {
  if (!content?.root?.children) return null

  return <div className="rich-text">{serialize(content.root.children)}</div>
}

function serialize(children: any): React.ReactNode[] {
  if (!children || !Array.isArray(children)) {
    return []
  }

  return children.map((node: any, i: number) => {
    // 1. Handle Text Nodes (Bold, Italic, etc.)
    if (node.type === 'text') {
      let text = <span dangerouslySetInnerHTML={{ __html: escapeHTML(node.text) }} />

      if (node.format & 1) text = <strong>{text}</strong>
      if (node.format & 2) text = <em>{text}</em>
      if (node.format & 8) text = <u>{text}</u>
      if (node.format & 16) text = <code>{text}</code>

      return <Fragment key={i}>{text}</Fragment>
    }

    if (!node) {
      return null
    }

    // 2. Recursively serialize children
    const serializedChildren = node.children ? serialize(node.children) : null

    // 3. Handle Blocks (Lexical Format)
    switch (node.type) {
      // --- HEADINGS FIX ---
      // Lexical sends "heading" as the type, and "h1"/"h2" as the tag
      case 'heading':
        switch (node.tag) {
          case 'h1':
            // Mobile: text-2xl | Desktop: text-3xl
            return (
              <h1
                key={i}
                className="text-2xl md:text-3xl font-bold mt-6 md:mt-8 mb-4 text-slate-900"
              >
                {serializedChildren}
              </h1>
            )
          case 'h2':
            // Mobile: text-xl | Desktop: text-2xl
            return (
              <h2
                key={i}
                className="text-xl md:text-2xl font-bold mt-6 md:mt-8 mb-3 md:mb-4 text-slate-900 border-b pb-2"
              >
                {serializedChildren}
              </h2>
            )
          case 'h3':
            // Mobile: text-lg | Desktop: text-xl
            return (
              <h3
                key={i}
                className="text-lg md:text-xl font-bold mt-5 md:mt-6 mb-2 md:mb-3 text-slate-800"
              >
                {serializedChildren}
              </h3>
            )
          case 'h4':
            return (
              <h4
                key={i}
                className="text-base md:text-lg font-bold mt-4 md:mt-6 mb-2 text-slate-800"
              >
                {serializedChildren}
              </h4>
            )
          default:
            return (
              <h2 key={i} className="text-lg md:text-xl font-bold mt-6 mb-2 text-slate-800">
                {serializedChildren}
              </h2>
            )
        }

      // --- LISTS FIX ---
      // Lexical sends "list" as the type, and "bullet"/"number" as the listType
      case 'list':
        if (node.listType === 'number') {
          // Mobile: ml-4 | Desktop: ml-6
          return (
            <ol
              key={i}
              className="list-decimal list-outside ml-4 md:ml-6 mb-4 space-y-2 marker:text-blue-500"
            >
              {serializedChildren}
            </ol>
          )
        } else {
          return (
            <ul
              key={i}
              className="list-disc list-outside ml-4 md:ml-6 mb-4 space-y-2 marker:text-blue-500"
            >
              {serializedChildren}
            </ul>
          )
        }

      // Lexical calls list items "listitem" (no space)
      case 'listitem':
        return (
          <li key={i} className="pl-1">
            {serializedChildren}
          </li>
        )

      case 'quote':
        return (
          <blockquote
            key={i}
            className="border-l-4 border-blue-500 pl-4 italic text-slate-600 my-6 bg-slate-50 py-2 pr-2 rounded-r"
          >
            {serializedChildren}
          </blockquote>
        )

      case 'link':
        return (
          <a
            href={escapeHTML(node.fields?.url)}
            key={i}
            target={node.fields?.newTab ? '_blank' : '_self'}
            className="text-blue-600 hover:text-blue-800 underline decoration-blue-300 hover:decoration-blue-800 underline-offset-2 transition-colors"
          >
            {serializedChildren}
          </a>
        )

      // Explicitly handle paragraphs
      case 'paragraph':
        return (
          <p key={i} className="mb-4 leading-7 text-slate-700">
            {serializedChildren}
          </p>
        )

      default:
        return <Fragment key={i}>{serializedChildren}</Fragment>
    }
  })
}
