// app/[locale]/layout.tsx
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

  // Hardcoded metadata for English locale
  const enMetadata = {
    title:
      "Moritz Roessler | Senior Frontend Developer in Freiburg im Breisgau",
    description:
      "Moritz Roessler is a Senior Frontend Developer based in Freiburg im Breisgau. Specialized in JavaScript, TypeScript, React, Node.js, SQL, AWS, and Serverless. Explore portfolio, experience, and contact information.",
    authors: [{ name: "Moritz Roessler" }],
    openGraph: {
      type: "website",
      title:
        "Moritz Roessler | Senior Frontend Developer in Freiburg im Breisgau",
      siteName: "Moe's Website",
      description:
        "Moritz Roessler is a Senior Frontend Developer based in Freiburg im Breisgau. Specialized in JavaScript, TypeScript, React, Node.js, SQL, AWS, and Serverless.",
      images: ["https://javascript.moe/images/previews/hello.png"],
      url: "https://javascript.moe/",
    },
    twitter: {
      card: "summary_large_image",
      title:
        "Moritz Roessler | Senior Frontend Developer in Freiburg im Breisgau",
      description:
        "Moritz Roessler is a Senior Frontend Developer based in Freiburg im Breisgau. Specialized in JavaScript, TypeScript, React, Node.js, SQL, AWS, and Serverless.",
      images: ["https://javascript.moe/images/previews/hello.png"],
      site: "@your_twitter_handle", // Replace with your Twitter handle
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
      canonical: "https://javascript.moe/",
    },
  };

  // Hardcoded metadata for German locale
  const deMetadata = {
    title:
      "Moritz Roessler | Senior Frontend Entwickler in Freiburg im Breisgau",
    description:
      "Moritz Roessler ist ein Senior Frontend Entwickler mit Sitz in Freiburg im Breisgau. Spezialisiert auf JavaScript, TypeScript, React, Node.js, SQL, AWS und Serverless. Entdecken Sie Portfolio, Erfahrung und Kontaktinformationen.",
    authors: [{ name: "Moritz Roessler" }],
    openGraph: {
      type: "website",
      title:
        "Moritz Roessler | Senior Frontend Entwickler in Freiburg im Breisgau",
      siteName: "Moe's Website",
      description:
        "Moritz Roessler ist ein Senior Frontend Entwickler mit Sitz in Freiburg im Breisgau. Spezialisiert auf JavaScript, TypeScript, React, Node.js, SQL, AWS und Serverless.",
      images: ["https://javascript.moe/images/previews/hello.png"],
      url: "https://javascript.moe/",
    },
    twitter: {
      card: "summary_large_image",
      title:
        "Moritz Roessler | Senior Frontend Entwickler in Freiburg im Breisgau",
      description:
        "Moritz Roessler ist ein Senior Frontend Entwickler mit Sitz in Freiburg im Breisgau. Spezialisiert auf JavaScript, TypeScript, React, Node.js, SQL, AWS und Serverless.",
      images: ["https://javascript.moe/images/previews/hello.png"],
      site: "@your_twitter_handle", // Replace with your Twitter handle
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
      canonical: "https://javascript.moe/",
    },
  };

  // Select the metadata based on the locale
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
  // Use `params` directly (no await needed)
  setRequestLocale(locale);
  return (
    // <html lang={locale}>
    <NextIntlClientProvider
      messages={
        (await import(`../../assets/translations/${locale}.ts`)).default
        // … and provide the relevant messages
      }
    >
      {children}
    </NextIntlClientProvider>
    // </html>
  );
}
