"use client";

// FIXED FILE (starter kit) — do not edit. Blog post view for app/blog/[slug].
import { useTranslations } from "next-intl";
import { BlockImg, Section, SectionHeader } from "@/components/blocks/shared";
import PostList from "@/components/kit/PostList";
import SiteLink from "@/components/SiteLink";
import { Reveal } from "@/components/Reveal";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { list, pageData, slugIndex, type Post } from "@/lib/content";
import { cn } from "@/lib/utils";

export default function PostView({ slug }: { slug: string }) {
  const t = useTranslations("post");
  const tBlog = useTranslations("blog");
  const blog = pageData("blog");
  const variant = pageData("post").variant;
  const idx = slugIndex("blog", slug);
  const post = list<Post>(tBlog.raw("posts"))[idx];

  if (!post) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-24 text-center">
        <p className="text-lg text-muted-foreground">{t("notFound")}</p>
        <SiteLink href="/blog" className={buttonVariants({ variant: "outline", className: "mt-6" })}>
          {t("back")}
        </SiteLink>
      </main>
    );
  }

  const image = blog.image(`posts.${idx}`, post.title);
  return (
    <main className="bg-background text-foreground">
      <Reveal className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <SiteLink href="/blog" className="text-sm text-muted-foreground hover:text-foreground">
          &larr; {t("back")}
        </SiteLink>
        <div className={cn("mt-8", variant === "b" && "text-center")}>
          <Badge variant="secondary">{post.category}</Badge>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">{post.title}</h1>
          <p className="mt-4 text-sm text-muted-foreground">
            {t("by")} {post.author} &middot; {post.date} &middot; {post.readTime}
          </p>
        </div>
        {image && (
          <BlockImg
            image={image}
            eager
            className={cn("mt-10 w-full rounded-lg", variant === "c" ? "aspect-square" : "aspect-[16/9]")}
          />
        )}
        <div className="mt-10 space-y-5 text-lg leading-relaxed text-foreground/90">
          {list<string>(post.body).map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </Reveal>
      <Section className="bg-muted/40">
        <SectionHeader title={t("related")} />
        <PostList limit={3} variant="a" />
      </Section>
    </main>
  );
}
