import './globals.css';
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import QualifChat from '@/components/qualif-chat';

export const metadata = {
  metadataBase: new URL('https://lvif-site-web.vercel.app'),
  title: {
    default: 'LED Visual Innovation — Fabricant français d’écrans géants LED',
    template: '%s · LED Visual Innovation',
  },
  description:
    'Fabricant français d’écrans géants LED à l’achat et à la location. Assemblage en France, garantie 5 ans, logiciel d’affichage sans abonnement, intervention sous 48 h.',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'LED Visual Innovation',
  },
  robots: { index: false, follow: false },
};

export const viewport = {
  themeColor: '#060607',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..800&family=Instrument+Sans:wght@400;500;600&family=Geist+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-signal focus:px-4 focus:py-2 focus:text-black"
        >
          Aller au contenu
        </a>
        <SiteHeader />
        <main id="contenu">{children}</main>
        <SiteFooter />
        <QualifChat />
      </body>
    </html>
  );
}
