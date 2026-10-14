"use client";

// KIT PAGE (blog) — FIXED FILE, do not edit. Copy: messages/<locale>.json "blog.*";
// layout variant + images + post slugs: content/pages.json "blog".
import { useTranslations } from "next-intl";
import { Section, SectionHeader } from "@/components/blocks/shared";
import PostList from "@/components/kit/PostList";
import { pageData } from "@/lib/content";

export default function BlogPage() {
  const t = useTranslations("blog");
  return (
    <main>
      <Section>
        <SectionHeader eyebrow={t("hero.eyebrow")} title={t("hero.title")} subtitle={t("hero.subtitle")} />
        <PostList variant={pageData("blog").variant} />
      </Section>
    </main>
  );
}
