"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Clock, Calendar, ArrowRight, ArrowLeft, CheckCircle2, Quote, Mail } from 'lucide-react';
import Reveal from "@/components/Reveal";
import { fadeInUp } from "@/lib/motion";

type RelatedItem = {
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  image: string;
  alt: string;
};

const COVER_IMAGE = {
  src: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/06d1708414364378941aeb27d32dc359.jpg",
  alt: "Digital payment terminals and financial data screens representing cross-border fintech infrastructure",
};

const AUTHOR_AVATAR_INITIALS = "ME";

export default function ArticlePage() {
  const t = useTranslations();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const takeaways = (Array.isArray(t.raw("article.takeaways")) ? t.raw("article.takeaways") : []) as string[];
  const related = (Array.isArray(t.raw("article.related")) ? t.raw("article.related") : []) as RelatedItem[];

  const handleSubscribe = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setSubscribed(true);
  };

  return (
    <main className="bg-background">
      {/* Header / meta band */}
      <Reveal>
        <section className="border-b border-border bg-muted/40">
          <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              {t("article.backLink")}
            </Link>

            <div className="mt-6 flex items-center gap-3">
              <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-foreground">
                {t("article.category")}
              </span>
              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {t("article.breadcrumbHome")}
              </span>
            </div>

            <h1 className="mt-5 text-balance font-display text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-5xl">
              {t("article.title")}
            </h1>

            <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
              {t("article.deck")}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-6 border-t border-border pt-6">
              <Link href="/author" className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                  {AUTHOR_AVATAR_INITIALS}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-foreground">
                    {t("article.authorName")}
                  </span>
                  <span className="block text-xs text-muted-foreground">
                    {t("article.authorRole")}
                  </span>
                </span>
              </Link>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" aria-hidden="true" />
                  {t("article.date")}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-4 w-4" aria-hidden="true" />
                  {t("article.readTime")}
                </span>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Cover image */}
      <Reveal delay={0.05}>
        <section className="mx-auto max-w-5xl px-6 pt-10 md:pt-14">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)]">
            <Image
              src={COVER_IMAGE.src}
              alt={COVER_IMAGE.alt}
              fill
              sizes="(min-width: 1024px) 896px, 100vw"
              className="object-cover"
              priority
            />
          </div>
        </section>
      </Reveal>

      {/* Article body + takeaways */}
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 px-6 py-14 md:py-20 lg:grid-cols-[1fr_280px]">
        <Reveal delay={0.08}>
          <article className="max-w-none">
            <p className="text-lg leading-relaxed text-foreground">{t("article.lead")}</p>

            <p className="mt-6 leading-relaxed text-foreground/80">{t("article.body1")}</p>

            <h2 className="mt-10 font-display text-2xl font-semibold tracking-tight text-foreground">
              {t("article.sectionOneHeading")}
            </h2>
            <p className="mt-4 leading-relaxed text-foreground/80">{t("article.body2")}</p>

            <div className="my-10 flex gap-4 rounded-2xl border border-border bg-muted/40 p-6">
              <Quote className="h-6 w-6 shrink-0 text-primary" aria-hidden="true" />
              <p className="text-lg font-medium leading-relaxed text-foreground">
                {t("article.pullQuote")}
              </p>
            </div>

            <h2 className="mt-10 font-display text-2xl font-semibold tracking-tight text-foreground">
              {t("article.sectionTwoHeading")}
            </h2>
            <p className="mt-4 leading-relaxed text-foreground/80">{t("article.body3")}</p>
            <p className="mt-4 leading-relaxed text-foreground/80">{t("article.body4")}</p>

            <h2 className="mt-10 font-display text-2xl font-semibold tracking-tight text-foreground">
              {t("article.takeawaysHeading")}
            </h2>
            <ul className="mt-4 space-y-3">
              {takeaways.map((item, i) => (
                <li key={i} className="flex items-start gap-3 leading-relaxed text-foreground/80">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </Reveal>

        {/* Author bio sidebar panel */}
        <Reveal delay={0.12} className="lg:sticky lg:top-24 lg:self-start">
          <aside className="rounded-2xl border border-border bg-card p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)]">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {t("article.aboutAuthorLabel")}
            </p>
            <Link href="/author" className="mt-4 flex items-center gap-3">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary text-base font-semibold text-primary-foreground">
                {AUTHOR_AVATAR_INITIALS}
              </span>
              <span>
                <span className="block text-sm font-semibold text-card-foreground">
                  {t("article.authorName")}
                </span>
                <span className="block text-xs text-muted-foreground">
                  {t("article.authorRole")}
                </span>
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {t("article.authorBio")}
            </p>
            <Link
              href="/author"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
            >
              {t("article.viewProfile")}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </aside>
        </Reveal>
      </div>

      {/* Related articles */}
      <Reveal delay={0.05}>
        <section className="border-t border-border bg-muted/30 py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex items-end justify-between gap-4">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                {t("article.relatedHeading")}
              </h2>
              <Link
                href="/blog"
                className="hidden items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary/80 sm:inline-flex"
              >
                {t("article.relatedCta")}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    href="/article"
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_1px_2px_rgba(0,0,0,0.05),0_16px_32px_-10px_rgba(0,0,0,0.18)] motion-reduce:transition-none"
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.alt}
                        fill
                        sizes="(min-width: 1024px) 25vw, 50vw"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <span className="text-xs font-semibold uppercase tracking-wide text-primary">
                        {item.category}
                      </span>
                      <h3 className="mt-2 text-base font-semibold leading-snug text-card-foreground">
                        {item.title}
                      </h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                        {item.excerpt}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                        {item.readTime}
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* Newsletter signup */}
      <Reveal delay={0.05}>
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-2xl px-6 text-center">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Mail className="h-6 w-6" aria-hidden="true" />
            </span>
            <h2 className="mt-5 text-balance font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              {t("article.newsletterTitle")}
            </h2>
            <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
              {t("article.newsletterSubtitle")}
            </p>

            {subscribed ? (
              <div
                role="status"
                className="mt-8 flex flex-col items-center gap-2 rounded-2xl border border-border bg-card p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)]"
              >
                <CheckCircle2 className="h-8 w-8 text-primary" aria-hidden="true" />
                <p className="text-base font-semibold text-card-foreground">
                  {t("article.newsletterSuccessTitle")}
                </p>
                <p className="text-sm text-muted-foreground">
                  {t("article.newsletterSuccessMessage")}
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="mt-8 flex flex-col gap-3 rounded-2xl border border-border bg-card p-6 text-left shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)] sm:p-8"
              >
                <div>
                  <label htmlFor="newsletter-name" className="mb-1.5 block text-sm font-medium text-card-foreground">
                    {t("article.newsletterNameLabel")}
                  </label>
                  <input
                    id="newsletter-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t("article.newsletterNamePlaceholder")}
                    required
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>
                <div>
                  <label htmlFor="newsletter-email" className="mb-1.5 block text-sm font-medium text-card-foreground">
                    {t("article.newsletterEmailLabel")}
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("article.newsletterEmailPlaceholder")}
                    required
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>
                <button
                  type="submit"
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_4px_16px_-4px_rgba(0,0,0,0.3)] focus:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
                >
                  {t("article.newsletterSubmit")}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
                <p className="text-xs text-muted-foreground">{t("article.newsletterDisclaimer")}</p>
              </form>
            )}
          </div>
        </section>
      </Reveal>
    </main>
  );
}