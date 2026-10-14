"use client";

// FIXED FILE (starter kit) — do not edit. Post cards for the blog home + list pages.
// Copy: messages "blog.posts"; images + slugs: content/pages.json "blog".
import { useTranslations } from "next-intl";
import { BlockImg } from "@/components/blocks/shared";
import SiteLink from "@/components/SiteLink";
import { Badge } from "@/components/ui/badge";
import { list, pageData, type PageVariant, type Post } from "@/lib/content";
import { cn } from "@/lib/utils";

const LAYOUTS = {
  a: { grid: "md:grid-cols-2 lg:grid-cols-3", row: false },
  b: { grid: "md:grid-cols-1 max-w-4xl mx-auto", row: true },
  c: { grid: "md:grid-cols-2", row: false },
} as const;

export default function PostList({ limit, variant }: { limit?: number; variant: PageVariant }) {
  const t = useTranslations("blog");
  const blog = pageData("blog");
  const l = LAYOUTS[variant];
  const posts = list<Post>(t.raw("posts")).slice(0, limit ?? 100);
  return (
    <div className={cn("grid gap-8", l.grid)}>
      {posts.map((post, i) => {
        const image = blog.image(`posts.${i}`, post.title);
        const href = blog.slugs[i] ? `/blog/${blog.slugs[i]}` : "/blog";
        return (
          <article
            key={i}
            className={cn(
              "group overflow-hidden rounded-lg border border-border bg-card text-card-foreground",
              l.row && "md:flex",
            )}
          >
            {image && (
              <div className={cn("overflow-hidden bg-muted", l.row ? "md:w-2/5" : "aspect-[16/10]")}>
                <BlockImg image={image} className="h-full w-full transition-transform duration-500 group-hover:scale-105" />
              </div>
            )}
            <div className="flex-1 p-6">
              <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                <Badge variant="secondary">{post.category}</Badge>
                <span>{post.date}</span>
                <span>&middot; {post.readTime}</span>
              </div>
              <h3 className="mt-3 font-display text-xl font-semibold">
                <SiteLink href={href} className="hover:text-primary">
                  {post.title}
                </SiteLink>
              </h3>
              <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{post.excerpt}</p>
              <SiteLink href={href} className="mt-4 inline-block text-sm font-semibold text-primary hover:underline">
                {t("readMore")} &rarr;
              </SiteLink>
            </div>
          </article>
        );
      })}
    </div>
  );
}
