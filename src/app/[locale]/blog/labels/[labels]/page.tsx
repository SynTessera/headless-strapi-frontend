import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { getBlogPosts, getCategories, getLabels } from "@/lib/api";
import { marked } from "marked";
import { Labels } from "@/container/Labels";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { BlogOverviewStructuredData } from "@/components/BlogOverviewStructuredData";
import { img } from "@/lib/path";
import supportedLocales from "@/lib/locales";

// Dynamic Metadata Generation for the Blog Page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { data: posts } = await getBlogPosts({ locale });

  const descriptionBase =
    posts.length > 0
      ? "Explore the latest blog posts on modern development, frameworks, and more."
      : "No blog posts available.";

  const siteTitle = "Blog | Your Blog Name";
  const siteDescription = descriptionBase;
  const siteUrl = "https://yourdomain.com/blog";
  const previewImage = "https://yourdomain.com/images/blog-preview.png";

  return {
    title: siteTitle,
    description: siteDescription,
    openGraph: {
      type: "website",
      title: siteTitle,
      siteName: "Your Blog Name",
      description: siteDescription,
      images: [previewImage],
      url: siteUrl,
    },
    twitter: {
      card: "summary_large_image",
      title: siteTitle,
      description: siteDescription,
      images: [previewImage],
      site: "@your_twitter_handle", // Replace or keep as placeholder
    },
    icons: {
      icon: [
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      ],
      apple: "/apple-touch-icon.png",
    },
    manifest: "/site.webmanifest",
    other: {
      "msapplication-TileColor": "#da532c",
      "content-language": locale,
      canonical: siteUrl,
    },
  };
}

// Blog Page Component
export default async function BlogPage({ params }: any) {
  const {
    locale,
    category: categoryName,
    labels: labelNamesStr = "",
  } = await params;

  const labelNames = decodeURIComponent(labelNamesStr)
    .split(",")
    .filter(Boolean);

  const { data: posts = [] } = await getBlogPosts({
    locale,
    categoryName,
    labelNames,
  });
  const { data: categories = [] } = await getCategories({ locale });
  const { data: labels = [] } = await getLabels({ locale });

  return (
    <>
      <BlogOverviewStructuredData posts={posts} />
      <div className="max-h-screen relative">
        <Image
          src="/images/wallpaper/19.webp"
          className="w-screen h-screen absolute"
          width={1024}
          height={768}
          alt="Blog background image"
        />
        <div className="block w-full justify-center h-screen overflow-y-auto p-1 md:p-4">
          <main className="bg-black/40 w-full mx-auto p-2 md:p-4 drop-shadow-2xl flex flex-col gap-4">
            <div className="flex justify-between">
              <h1 className="mb-4 text-3xl font-bold">Blog</h1>
              <LanguageSwitcher availableLocales={supportedLocales} />
            </div>

            <Labels
              labels={labels}
              labelNames={labelNames}
              className="flex md:hidden"
            />

            <div className="flex justify-between h-fit">
              <div className="flex border-b-2 border-gray-500 overflow-x-auto">
                {categories.map((cat: any) => {
                  const active = categoryName === cat.slug;
                  const href = active
                    ? `/${locale}/blog`
                    : `/${locale}/blog/category/${cat.slug}`;

                  return (
                    <Link
                      key={cat.id}
                      href={href}
                      className={`category whitespace-nowrap p-2 px-3 text-sm transition ${
                        active
                          ? "bg-yellow-600 hover:bg-yellow-400"
                          : "bg-gray-700 hover:bg-yellow-500"
                      } text-white`}
                    >
                      {cat.name}
                    </Link>
                  );
                })}
              </div>

              <Labels
                labels={labels}
                labelNames={labelNames}
                className="hidden md:flex"
              />
            </div>

            {posts.length === 0 ? (
              <p className="text-center text-gray-400">No posts found.</p>
            ) : (
              <div className="flex flex-col gap-2">
                {posts
                  .sort((a: any, b: any) =>
                    b.publishedAt.localeCompare(a.publishedAt)
                  )
                  .map((post: any) => {
                    const htmlExcerpt = marked(post.excerpt);
                    const availableLocales = post.localizations?.map(
                      (p: any) => p.locale
                    ) || [];

                    if (!availableLocales.includes(locale))
                      availableLocales.unshift(locale);

                    return (
                      <article
                        key={post.id}
                        className="flex flex-col md:flex-row bg-black/50 rounded-md overflow-hidden shadow-lg"
                      >
                        <div className="relative w-full md:w-1/3 justify-between">
                          <Link href={`/blog/${post.slug}-${post.documentId}`}>
                            <Image
                              src={img`${post.coverImage.url}`}
                              alt={post.title}
                              width={400}
                              height={250}
                              className="object-cover h-full w-full"
                            />
                            <h2 className="absolute inset-x-0 top-0 bg-black/50 text-center p-2 text-lg font-semibold">
                              {post.title}
                            </h2>
                          </Link>
                        </div>
                        <div className="flex-1 p-4 flex flex-col justify-between">
                          <div
                            dangerouslySetInnerHTML={{ __html: htmlExcerpt }}
                          />
                          <div className="flex gap-2 mt-4 flex-wrap">
                            {post.category && (
                              <Link
                                href={`/blog/category/${post.category.slug}`}
                                className="bg-yellow-600 p-1 px-2 rounded-full text-sm text-white"
                              >
                                {post.category.name}
                              </Link>
                            )}
                            {post.tags?.map((label: any) => (
                              <Link
                                key={label.id}
                                href={`/blog/labels/${label.slug}`}
                                className="bg-purple-600 p-1 px-2 rounded-full text-sm text-white"
                              >
                                {label.name}
                              </Link>
                            ))}
                            <div className="ml-auto">
                              <LanguageSwitcher
                                key={post.id}
                                showCurrent
                                availableLocales={availableLocales}
                                href={`/${locale}/blog/${post.slug}-${post.documentId}`}
                              />
                            </div>
                          </div>
                        </div>
                      </article>
                    );
                  })}
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
}
