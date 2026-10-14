// KIT PAGE (blog) — FIXED FILE, do not edit. One page per post slug in
// content/pages.json "blog.slugs"; the view (copy in messages "post.*" + "blog.posts").
import PostView from "@/components/kit/PostView";
import { pageData } from "@/lib/content";
import { pageMetadata } from "@/lib/kit-meta";

export function generateStaticParams() {
  return pageData("blog").slugs.map((slug) => ({ slug }));
}

export const metadata = pageMetadata("blog");

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <PostView slug={slug} />;
}
