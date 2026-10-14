"use client";

import { useMemo, useState, type FormEvent } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { MessageCircle as Twitter, Briefcase as Linkedin, Mail, Clock, Calendar, ArrowUpDown, User, FileText, Check, Sparkles } from 'lucide-react';
import Reveal from "@/components/Reveal";
import { staggerContainer, fadeInUp } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Article = {
  title: string;
  excerpt: string;
  date: string;
  dateISO: string;
  category: string;
  readTime: string;
  image: string;
};

type SortOrder = "newest" | "oldest" | "az";

const AUTHOR_ARTICLES: Article[] = [
  {
    title: "The Fed's Next Move: Reading Between the Lines of the Latest Minutes",
    excerpt:
      "A close read of the committee's language reveals more caution than the headline rate decision suggested.",
    date: "March 18, 2024",
    dateISO: "2024-03-18",
    category: "Markets",
    readTime: "7 min read",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/4ef4ec89096941f38c308660c2a77949.jpg",
  },
  {
    title: "Why Your Emergency Fund Rules Need an Update",
    excerpt:
      "Three to six months of expenses was always a rule of thumb, not a law. Here's how to size yours properly.",
    date: "March 4, 2024",
    dateISO: "2024-03-04",
    category: "Personal Finance",
    readTime: "5 min read",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/0317252313cb4087b1fcc3187bfbe063.jpg",
  },
  {
    title: "Embedded Finance Is Quietly Eating Retail Banking",
    excerpt:
      "From checkout lending to in-app wallets, the products are disappearing into the apps consumers already use.",
    date: "February 21, 2024",
    dateISO: "2024-02-21",
    category: "Fintech",
    readTime: "9 min read",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/cb1edd7c446c48559e776246e89355b5.jpg",
  },
  {
    title: "Stablecoins After the Settlement: What Actually Changed",
    excerpt:
      "A regulatory truce doesn't mean clarity. We map out which issuers gain and which face a harder road.",
    date: "February 9, 2024",
    dateISO: "2024-02-09",
    category: "Crypto",
    readTime: "8 min read",
    image: "https://picsum.photos/seed/d36d5d12af83/800/600",
  },
  {
    title: "Supply Chains Are Resilient. Margins Aren't.",
    excerpt:
      "Freight rates have normalized, but a slower, costlier rewiring of global trade routes is just beginning.",
    date: "January 26, 2024",
    dateISO: "2024-01-26",
    category: "Economy",
    readTime: "6 min read",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/8d7435a249ef4e9c82eb40085fa2e9e7.jpg",
  },
  {
    title: "The Quiet Rise of the 'Boring' Dividend Portfolio",
    excerpt:
      "While growth stocks grabbed headlines, a cohort of patient investors quietly compounded through dividends.",
    date: "January 11, 2024",
    dateISO: "2024-01-11",
    category: "Markets",
    readTime: "6 min read",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/25b18d282693435e80469d865fb6985c.jpg",
  },
];

export default function AuthorPage() {
  const t = useTranslations();
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const sortedArticles = useMemo(() => {
    const copy = [...AUTHOR_ARTICLES];
    if (sortOrder === "newest") {
      return copy.sort((a, b) => b.dateISO.localeCompare(a.dateISO));
    }
    if (sortOrder === "oldest") {
      return copy.sort((a, b) => a.dateISO.localeCompare(b.dateISO));
    }
    return copy.sort((a, b) => a.title.localeCompare(b.title));
  }, [sortOrder]);

  function handleSubscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setSubmitted(true);
  }

  return (
    <main className="bg-background">
      {/* Author hero */}
      <Reveal>
        <section className="relative overflow-hidden bg-mesh">
          <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-[auto_1fr] md:items-center">
              <div className="mx-auto h-36 w-36 shrink-0 overflow-hidden rounded-full ring-4 ring-background shadow-glow md:mx-0 md:h-44 md:w-44">
                <Image
                  src="https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/fe977a57e6fb4eaca2838188499a90f1.jpg"
                  alt={t("authorPage.hero.name")}
                  width={320}
                  height={320}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="text-center md:text-left">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-primary">
                  <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                  {t("authorPage.hero.eyebrow")}
                </span>
                <h1 className="mt-4 text-balance font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
                  {t("authorPage.hero.name")}
                </h1>
                <p className="mt-2 text-lg font-medium text-primary">{t("authorPage.hero.role")}</p>
                <p className="mt-5 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
                  {t("authorPage.hero.bio")}
                </p>

                <div className="mt-6 flex flex-wrap items-center justify-center gap-6 md:justify-start">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <FileText className="h-4 w-4 text-primary" aria-hidden="true" />
                    <span>{t("authorPage.hero.articleCount", { count: AUTHOR_ARTICLES.length })}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noreferrer"
                      aria-label={t("authorPage.hero.twitterLabel")}
                      className="rounded-full border border-border bg-card p-2 text-muted-foreground transition hover:-translate-y-0.5 hover:text-primary hover:shadow-glow motion-reduce:transition-none"
                    >
                      <Twitter className="h-4 w-4" aria-hidden="true" />
                    </a>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noreferrer"
                      aria-label={t("authorPage.hero.linkedinLabel")}
                      className="rounded-full border border-border bg-card p-2 text-muted-foreground transition hover:-translate-y-0.5 hover:text-primary hover:shadow-glow motion-reduce:transition-none"
                    >
                      <Linkedin className="h-4 w-4" aria-hidden="true" />
                    </a>
                    <a
                      href="mailto:elena.marsh@theledger.example"
                      aria-label={t("authorPage.hero.emailLabel")}
                      className="rounded-full border border-border bg-card p-2 text-muted-foreground transition hover:-translate-y-0.5 hover:text-primary hover:shadow-glow motion-reduce:transition-none"
                    >
                      <Mail className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Articles grid */}
      <Reveal>
        <section className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <div className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                {t("authorPage.articles.title")}
              </h2>
              <p className="mt-2 max-w-xl text-pretty text-muted-foreground">
                {t("authorPage.articles.subtitle")}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="author-sort" className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
                <ArrowUpDown className="h-4 w-4" aria-hidden="true" />
                {t("authorPage.articles.sortLabel")}
              </label>
              <select
                id="author-sort"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as SortOrder)}
                className="rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="newest">{t("authorPage.articles.sortNewest")}</option>
                <option value="oldest">{t("authorPage.articles.sortOldest")}</option>
                <option value="az">{t("authorPage.articles.sortAZ")}</option>
              </select>
            </div>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {sortedArticles.map((article) => (
              <motion.article
                key={article.title}
                variants={fadeInUp}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)] transition hover:-translate-y-1 hover:shadow-lg motion-reduce:transition-none"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transition duration-300 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-xs font-semibold text-primary shadow-sm backdrop-blur">
                    {article.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-balance font-display text-lg font-semibold leading-snug text-foreground">
                    {article.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {article.excerpt}
                  </p>
                  <div className="mt-4 flex items-center gap-4 border-t border-border pt-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                      {article.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                      {article.readTime}
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </section>
      </Reveal>

      {/* Newsletter */}
      <Reveal>
        <section className="relative overflow-hidden bg-gradient-brand">
          <div className="mx-auto max-w-3xl px-6 py-20 text-center md:py-24">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-foreground/15 px-3 py-1 text-xs font-medium uppercase tracking-wide text-primary-foreground">
              <User className="h-3.5 w-3.5" aria-hidden="true" />
              {t("authorPage.newsletter.eyebrow")}
            </span>
            <h2 className="mt-4 text-balance font-display text-3xl font-semibold tracking-tight text-primary-foreground md:text-4xl">
              {t("authorPage.newsletter.title")}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-pretty leading-relaxed text-primary-foreground/80">
              {t("authorPage.newsletter.subtitle")}
            </p>

            {submitted ? (
              <div className="mx-auto mt-8 flex max-w-md items-center justify-center gap-2 rounded-xl border border-primary-foreground/20 bg-primary-foreground/10 px-6 py-4 text-primary-foreground">
                <Check className="h-5 w-5" aria-hidden="true" />
                <span className="font-medium">{t("authorPage.newsletter.successMessage")}</span>
              </div>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row"
              >
                <label htmlFor="author-newsletter-name" className="sr-only">
                  {t("authorPage.newsletter.nameLabel")}
                </label>
                <input
                  id="author-newsletter-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t("authorPage.newsletter.nameLabel")}
                  className="w-full rounded-lg border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-3 text-sm text-primary-foreground placeholder:text-primary-foreground/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground sm:w-1/3"
                />
                <label htmlFor="author-newsletter-email" className="sr-only">
                  {t("authorPage.newsletter.emailLabel")}
                </label>
                <input
                  id="author-newsletter-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("authorPage.newsletter.emailLabel")}
                  className="w-full rounded-lg border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-3 text-sm text-primary-foreground placeholder:text-primary-foreground/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground sm:flex-1"
                />
                <button
                  type="submit"
                  className={cn(
                    "shrink-0 rounded-lg bg-primary-foreground px-6 py-3 text-sm font-semibold text-primary shadow-sm transition hover:-translate-y-0.5 hover:shadow-glow motion-reduce:transition-none"
                  )}
                >
                  {t("authorPage.newsletter.submitLabel")}
                </button>
              </form>
            )}
            <p className="mt-4 text-xs text-primary-foreground/70">{t("authorPage.newsletter.privacyNote")}</p>
          </div>
        </section>
      </Reveal>
    </main>
  );
}