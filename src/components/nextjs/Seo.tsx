import Head from "next/head";
import React from "react";

import { settings } from "@/core/settings";

import { PageConfig } from "@carapis/nextjs/utils";

interface SeoProps {
  pageConfig: PageConfig;
}

export const Seo: React.FC<SeoProps> = ({ pageConfig }) => {
  // Dictionary with static files
  const staticFiles = {
    favicons: {
      androidChrome192: "/static/favicons/android-chrome-192x192.png",
      androidChrome384: "/static/favicons/android-chrome-384x384.png",
      icon512: "/static/favicons/icon-512x512.png",
    },
  };

  const title = pageConfig.title || "";
  const description = pageConfig.description || "";

  // Base64 encode the JSON data of title and description
  // This completely avoids the need for query parameter delimiters
  const dataParam = Buffer.from(
    JSON.stringify({
      title,
      subtitle: description,
    })
  ).toString("base64");

  const ogImage = `${settings.url}/api/og/route?data=${dataParam}`;

  return (
    <Head>
      <title>{pageConfig.title}</title>
      <meta name="description" content={pageConfig.description} />

      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover"
      />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={pageConfig.title} />
      <meta property="og:description" content={pageConfig.description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={settings.url} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageConfig.title} />
      <meta name="twitter:description" content={pageConfig.description} />
      <meta name="twitter:image" content={ogImage} />

      {/* PWA and Android Chrome icons */}
      {/* <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href={staticFiles.favicons.androidChrome192}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="384x384"
        href={staticFiles.favicons.androidChrome384}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="512x512"
        href={staticFiles.favicons.icon512}
      />
      <link
        rel="apple-touch-icon"
        sizes="192x192"
        href={staticFiles.favicons.androidChrome192}
      />
      <link
        rel="apple-touch-icon"
        sizes="384x384"
        href={staticFiles.favicons.androidChrome384}
      />
      <link
        rel="apple-touch-icon"
        sizes="512x512"
        href={staticFiles.favicons.icon512}
      /> */}

      <link rel="manifest" href="/manifest.json" />

      <meta
        name="msapplication-TileImage"
        content={staticFiles.favicons.androidChrome192}
      />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content={pageConfig.title} />
      <meta name="application-name" content={pageConfig.title} />

      {/* PWA primary color */}
      <meta name="emotion-insertion-point" content="" />

      <meta name="HandheldFriendly" content="true" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="" />

      <meta name="application-name" content="" />
      <meta name="application-name" content="" />

      <link rel="shortcut icon" href="/favicon.png" type="image/png" />
      <link rel="manifest" href="/manifest.json" />

      {/* Prevent email detection */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="format-detection" content="email=no" />
      <meta name="format-detection" content="telephone=no" />
    </Head>
  );
};

export default Seo;
