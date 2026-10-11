import { DM_Mono, Della_Respira, Karla } from "next/font/google";

// Couple « Héritage »: Della Respira (titles) · Karla (text) · DM Mono (data, measurements).
export const dellaRespira = Della_Respira({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-della-respira",
  display: "swap",
});

export const karla = Karla({
  subsets: ["latin"],
  variable: "--font-karla",
  display: "swap",
});

export const dmMono = DM_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-dm-mono",
  display: "swap",
});

export const fontVariables = [dellaRespira.variable, karla.variable, dmMono.variable].join(" ");
