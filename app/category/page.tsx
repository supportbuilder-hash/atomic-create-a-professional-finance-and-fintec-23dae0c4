"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Calendar, Clock, User } from 'lucide-react';
import Reveal from "@/components/Reveal";
import { staggerContainer, fadeInUp } from "@/lib/motion";
import { cn } from "@/lib/utils";

type CategoryName =
  | "Markets"
  | "Personal Finance"
  | "Fintech"
  | "Crypto"
  | "Economy";

type CategoryInfo = { name: string; description: string };

type Article = {
  title: string;
  excerpt: string;
  author: string;
  authorRole: string;
  date: string;
  category: string;
  readTime: string;
  image: string;
};

const CATEGORY_NAMES: CategoryName[] = [
  "Markets",
  "Personal Finance",
  "Fintech",
  "Crypto",
  "Economy",
];

const PAGE_SIZE = 4;

export default function CategoryPage() {
  const t = useTranslations();

  const categories = (
    Array.isArray(t.raw("category.list")) ? t.raw("category.list") : []
  ) as CategoryInfo[];

  const articles = (
    Array.isArray(t.raw("category.articles")) ? t.raw("category.articles") : []
  ) as Article[];

  const [active, setActive] = useState<CategoryName>("Markets");
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [active]);

  const activeInfo = categories.find((c) => c.name === active);

  const filtered = useMemo(
    () => articles.filter((a) => a.category === active),
    [articles, active],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paged = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    (safePage - 1) * PAGE_SIZE + PAGE_SIZE,
  );

  return (
    <main className="bg-background text-foreground">
      {/* Category header */}
      <Reveal>
        <section className="border-b border-border bg-muted/30">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
            <span className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {t("category.eyebrow")}
            </span>
            <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight text-balance md:text-5xl">
              {active}
            </h1>
            <p className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              {activeInfo?.description ?? ""}
            </p>
            <p className="mt-6 text-sm font-medium text-muted-foreground">
              {t("category.articleCount", { count: filtered.length })}
            </p>
          </div>
        </section>
      </Reveal>

      {/* Category tabs */}
      <Reveal delay={0.05}>
        <nav
          aria-label={t("category.tabsLabel")}
          className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur"
        >
          <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-6 py-4">
            {CATEGORY_NAMES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActive(cat)}
                aria-current={active === cat ? "page" : undefined}
                className={cn(
                  "shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-300 ease-out",
                  active === cat
                    ? "border-primary bg-primary text-primary-foreground shadow-glow"
                    : "border-border bg-card text-muted-foreground hover:text-foreground hover:border-foreground/30",
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </nav>
      </Reveal>

      {/* Article grid */}
      <Reveal delay={0.1}>
        <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          {paged.length > 0 ? (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2"
            >
              {paged.map((article, i) => (
                <motion.article
                  key={`${article.title}-${i}`}
                  variants={fadeInUp}
                  className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg motion-reduce:transition-none"
                >
                  <Link href="/article" className="block overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="h-56 w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <span className="inline-flex w-fit items-center rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                      {article.category}
                    </span>
                    <Link href="/article">
                      <h2 className="font-display text-xl font-semibold leading-snug tracking-tight text-balance transition-colors duration-300 group-hover:text-primary">
                        {article.title}
                      </h2>
                    </Link>
                    <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                      {article.excerpt}
                    </p>
                    <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-3 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5" aria-hidden="true" />
                        {t("category.byLabel")} {article.author}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                        {article.date}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                        {article.readTime}
                      </span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          ) : (
            <div className="rounded-xl border border-dashed border-border bg-muted/30 p-16 text-center text-muted-foreground">
              {t("category.empty")}
            </div>
          )}

          {/* Pagination */}
          <div className="mt-14 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={safePage <= 1}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors duration-300 ease-out hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-border disabled:hover:text-foreground"
              aria-label={t("category.paginationPrev")}
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPage(p)}
                  aria-current={p === safePage ? "page" : undefined}
                  className={cn(
                    "inline-flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium transition-colors duration-300 ease-out",
                    p === safePage
                      ? "bg-primary text-primary-foreground shadow-glow"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  {p}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={safePage >= totalPages}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors duration-300 ease-out hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-border disabled:hover:text-foreground"
              aria-label={t("category.paginationNext")}
            >
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            {t("category.paginationPageLabel", { page: safePage, total: totalPages })}
          </p>
        </section>
      </Reveal>
    </main>
  );
}