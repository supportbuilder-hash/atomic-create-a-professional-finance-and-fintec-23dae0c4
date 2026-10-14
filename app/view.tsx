"use client";

// KIT PAGE (blog) — FIXED FILE, do not edit. Copy: messages/<locale>.json "home.*"
// (posts: "blog.posts"); layout variant + images: content/pages.json "home".
import { useTranslations } from "next-intl";
import CTA from "@/components/blocks/CTA";
import FeatureGrid from "@/components/blocks/FeatureGrid";
import Hero from "@/components/blocks/Hero";
import { CtaButton, Section, SectionHeader } from "@/components/blocks/shared";
import PostList from "@/components/kit/PostList";
import { list, pageData, type Feature } from "@/lib/content";
import { primaryCta } from "@/lib/data";

const LAYOUTS = {
  a: { hero: "mesh", posts: "a", topics: "minimal", cta: "gradient" },
  b: { hero: "centered", posts: "b", topics: "glass", cta: "card" },
  c: { hero: "background", posts: "c", topics: "list", cta: "split" },
} as const;

export default function HomePage() {
  const t = useTranslations("home");
  const p = pageData("home");
  const l = LAYOUTS[p.variant];
  const heroImage = p.image("hero", t("hero.title"));
  return (
    <main>
      <Hero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        primaryCta={{ label: t("hero.cta"), href: "/blog" }}
        secondaryCta={{ label: t("hero.secondaryCta"), href: "/about" }}
        image={heroImage}
        variant={l.hero}
      />
      <Section>
        <SectionHeader eyebrow={t("latest.eyebrow")} title={t("latest.title")} subtitle={t("latest.subtitle")} />
        <PostList limit={3} variant={l.posts} />
        <div className="mt-10 text-center">
          <CtaButton cta={{ label: t("latest.cta"), href: "/blog" }} variant="outline" />
        </div>
      </Section>
      <FeatureGrid
        eyebrow={t("topics.eyebrow")}
        title={t("topics.title")}
        subtitle={t("topics.subtitle")}
        items={list<Feature>(t.raw("topics.items"))}
        variant={l.topics}
      />
      <CTA
        title={t("cta.title")}
        subtitle={t("cta.subtitle")}
        primaryCta={{ label: t("cta.button"), href: primaryCta.href }}
        image={heroImage}
        variant={l.cta}
      />
    </main>
  );
}
