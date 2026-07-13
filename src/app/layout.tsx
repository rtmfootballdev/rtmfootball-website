import type { Metadata, Viewport } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { LocaleProvider } from "@/lib/i18n/locale-provider";
import { getDictionary } from "@/lib/i18n/get-dictionary";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const oswald = Oswald({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rtmfootball.vercel.app"),
  title: {
    default: "RTM Football — More than just a jersey",
    template: "%s | RTM Football",
  },
  description:
    "RTM Football is an online shop for Modern, Retro, National Team and Promotional football jerseys, with optional name and number personalization. More than just a jersey, it's a passion in action.",
  openGraph: {
    title: "RTM Football",
    description:
      "More than just a jersey, it's a passion in action. Shop Modern, Retro and National Team jerseys.",
    siteName: "RTM Football",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0e3b2c",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { locale } = await getDictionary();

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${oswald.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <LocaleProvider locale={locale}>
          <TooltipProvider delay={150}>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <Toaster position="bottom-center" richColors closeButton />
          </TooltipProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
