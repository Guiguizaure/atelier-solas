import type { Metadata, Viewport } from "next";
import { INDEXABLE, SITE_URL } from "@/config/site";
import { fontVariables } from "./fonts";
import "./globals.css";

const DESCRIPTION =
  "Atelier Solas, a fictional made-to-measure atelier in Marseille: unbutton the shirt, pick a model and a fabric. Concept and design by Guillaume Salle.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Atelier Solas — Made to measure, Marseille", template: "%s · Atelier Solas" },
  description: DESCRIPTION,
  applicationName: "Atelier Solas",
  authors: [{ name: "Guillaume Salle", url: "https://webjuno.com" }],
  creator: "Guillaume Salle",
  robots: INDEXABLE ? { index: true, follow: true } : { index: false, follow: false },
  openGraph: {
    type: "website",
    siteName: "Atelier Solas",
    title: "Atelier Solas — Made to measure, Marseille",
    description: DESCRIPTION,
    locale: "en_GB",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#ede1c6",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: the home pre-paint script sets data-intro and --vh on <html>
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
