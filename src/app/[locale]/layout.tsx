import { ReactNode } from "react";
import { setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { Metadata } from "next";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "de" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  // Metadata for English locale
  const enMetadata = {
    title: "Blog Title | Developer, Writer, Creator",
    description:
      "A personal blog about development, design, and tech. Written by a developer passionate about web technologies and digital creativity.",
    authors: [{ name: "Your Name" }],
    openGraph: {
      type: "website",
      title: "Blog Title | Developer, Writer, Creator",
      siteName: "Your Site Name",
      description:
        "A personal blog about development, design, and tech. Written by a developer passionate about web technologies and digital creativity.",
      images: ["https://yourdomain.com/images/og-default.png"],
      url: "https://yourdomain.com/",
    },
    twitter: {
      card: "summary_large_image",
      title: "Blog Title | Developer, Writer, Creator",
      description:
        "A personal blog about development, design, and tech. Written by a developer passionate about web technologies and digital creativity.",
      images: ["https://yourdomain.com/images/og-default.png"],
      site: "@your_twitter_handle",
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
      "content-language": "en",
      canonical: "https://yourdomain.com/",
    },
  };

  // Metadata for German locale
  const deMetadata = {
    title: "Blog Titel | Entwickler, Autor, Kreativer",
    description:
      "Ein persönlicher Blog über Entwicklung, Design und Technologie. Geschrieben von einem Entwickler mit Leidenschaft für Web-Technologien und digitale Kreativität.",
    authors: [{ name: "Dein Name" }],
    openGraph: {
      type: "website",
      title: "Blog Titel | Entwickler, Autor, Kreativer",
      siteName: "Dein Seitenname",
      description:
        "Ein persönlicher Blog über Entwicklung, Design und Technologie. Geschrieben von einem Entwickler mit Leidenschaft für Web-Technologien und digitale Kreativität.",
      images: ["https://yourdomain.com/images/og-default.png"],
      url: "https://yourdomain.com/",
    },
    twitter: {
      card: "summary_large_image",
      title: "Blog Titel | Entwickler, Autor, Kreativer",
      description:
        "Ein persönlicher Blog über Entwicklung, Design und Technologie. Geschrieben von einem Entwickler mit Leidenschaft für Web-Technologien und digitale Kreativität.",
      images: ["https://yourdomain.com/images/og-default.png"],
      site: "@your_twitter_handle",
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
      "content-language": "de",
      canonical: "https://yourdomain.com/",
    },
  };

  return locale === "de" ? deMetadata : enMetadata;
}

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <NextIntlClientProvider
      messages={
        (await import(`../../assets/translations/${locale}.ts`)).default
      }
    >
      {children}
    </NextIntlClientProvider>
  );
}
