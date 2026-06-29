import React from "react";
import { PostBlock } from "@/components/admin/BlockBuilder";

interface BlockRendererProps {
  content: string;
}

export function BlockRenderer({ content }: BlockRendererProps) {
  let blocks: PostBlock[] = [];
  let isJson = false;

  try {
    const parsed = JSON.parse(content);
    if (Array.isArray(parsed)) {
      blocks = parsed;
      isJson = true;
    }
  } catch (e) {
    // Not JSON, fallback to raw HTML
  }

  if (!isJson) {
    // Backwards compatibility for old TinyMCE HTML content
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
  }

  return (
    <div className="space-y-6 flex flex-col">
      {blocks.map((block) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p 
                key={block.id} 
                className="whitespace-pre-wrap leading-relaxed text-lg text-foreground/90 [&_a]:text-primary [&_a]:underline [&_a]:cursor-pointer hover:[&_a]:text-primary/80"
                dangerouslySetInnerHTML={{ __html: block.content || "" }}
              />
            );
          
          case "heading": {
            const level = block.level || 2;
            const className = `font-extrabold tracking-tight mt-10 mb-4 [&_a]:text-primary [&_a]:underline hover:[&_a]:text-primary/80 ${
              level === 1 ? "text-4xl" : level === 2 ? "text-3xl" : "text-2xl"
            }`;
            
            if (level === 1) return <h1 key={block.id} className={className} dangerouslySetInnerHTML={{ __html: block.content || "" }} />;
            if (level === 3) return <h3 key={block.id} className={className} dangerouslySetInnerHTML={{ __html: block.content || "" }} />;
            return <h2 key={block.id} className={className} dangerouslySetInnerHTML={{ __html: block.content || "" }} />;
          }
          
          case "image":
            return (
              <figure key={block.id} className="my-10 flex flex-col items-center">
                <img 
                  src={block.url} 
                  alt={block.alt || block.caption || "Article image"} 
                  className="rounded-2xl shadow-xl w-full max-h-[700px] object-cover"
                />
                {(block.caption || block.credit) && (
                  <figcaption className="mt-3 text-sm text-muted-foreground text-center flex flex-col items-center gap-1">
                    {block.caption && <span className="italic">{block.caption}</span>}
                    {block.credit && <span className="text-xs opacity-75">Credit: {block.credit}</span>}
                  </figcaption>
                )}
              </figure>
            );
            
          case "quote":
            return (
              <blockquote 
                key={block.id} 
                className="my-8 border-l-4 border-primary bg-card/50 rounded-r-xl py-4 px-6 md:px-8 italic text-xl md:text-2xl text-foreground/80 leading-relaxed shadow-sm [&_a]:text-primary [&_a]:underline hover:[&_a]:text-primary/80"
                dangerouslySetInnerHTML={{ __html: `"${block.content || ""}"` }}
              />
            );
            
          default:
            return null;
        }
      })}
    </div>
  );
}
