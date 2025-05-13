import Image from "next/image";
import { marked } from "marked";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import BlogPostStructuredData from "@/components/BlogStructuredData";
import { img } from "@/lib/path";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { IconButton } from "@/components/Button";
import Link from "next/link";
import { getBlogPost } from "@/lib/api";

// Define the type for the blog post data
interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  coverImage: { url: string };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const id = slug.split("-").pop();

  if (!id) throw new Error("Invalid ID");

  const { data: post } = await getBlogPost(id, { locale });

  if (!post || post.length === 0) {
    return { title: "Blog Post Not Found" };
  }

  return {
    title: `${post.title} | Blog Name`,
    description:
      post.excerpt || "A detailed blog post on modern development topics.",
    openGraph: {
      type: "article",
      title: post.title,
      description:
        post.excerpt || "A detailed blog post on modern development topics.",
      images: [post.coverImage?.url || "/images/default-cover.webp"],
      url: `https://yourdomain.com/blog/${post.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description:
        post.excerpt || "A detailed blog post on modern development topics.",
      images: [post.coverImage?.url || "/images/default-cover.webp"],
      site: "@your_twitter_handle",
    },
  };
}

interface BlogPageProps {
  params: Promise<{ slug: string; locale: string }>;
}

const BlogPage = async ({ params }: BlogPageProps) => {
  const { slug, locale } = await params;
  const id = slug.split("-").pop();

  try {
    if (!id) throw new Error("Invalid ID");

    const { data: post } = await getBlogPost(id, { locale });
    const { localizations = [] } = post;

    const availableLocales = localizations.map((ele: any) => ele.locale);
    if (!post) notFound();

    const htmlContent = marked(post.content || "");

    return (
      <>
        <BlogPostStructuredData post={post} />
        <div className="max-h-screen">
          <Image
            src={
              post.coverImage
                ? img`${post.coverImage?.url}`
                : "/images/default-cover.webp"
            }
            className="w-screen h-screen absolute"
            width={1024}
            height={768}
            alt={post.title || "Blog Post Cover Image"}
          />
          <div className="block w-full justify-center h-screen overflow-y-auto p-1 md:p-4">
            <main className="bg-black/40 w-full mx-auto p-1 md:p-4 flex flex-col gap-1">
              <div className="flex gap-1 items-center">
                <Link href={`/${locale}/blog`}>
                  <IconButton icon="FaHome" />
                </Link>
                <LanguageSwitcher availableLocales={availableLocales} />
              </div>
              <h1 className="p-4 pl-2 bg-black/40 w-fit rounded-sm title">
                {post.title}
              </h1>

              <article key={post.id} className="bg-black/30 p-2 post">
                <p dangerouslySetInnerHTML={{ __html: htmlContent }} />
              </article>
            </main>
          </div>
        </div>
      </>
    );
  } catch (error) {
    console.error("Error while rendering blog post:", error);
    notFound();
  }
};

export default BlogPage;
