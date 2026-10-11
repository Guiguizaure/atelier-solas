import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Atelier Solas — Made to measure, Marseille",
  description:
    "A fictional made-to-measure atelier in Marseille. Concept and design by Guillaume Salle.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
