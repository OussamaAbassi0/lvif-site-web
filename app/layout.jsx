import './globals.css';
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import QualifChat from '@/components/qualif-chat';

export const metadata = {
  metadataBase: new URL('https://lvif-showcase-concept.vercel.app'),
  title: {
    default: 'LED Visual Innovation — Location et vente d’écrans géants LED',
    template: '%s · LED Visual Innovation',
  },
  description:
    'Fabricant français d’écrans géants LED, à la location comme à l’achat. Assemblage en France, garantie 5 ans, logiciel d’affichage sans abonnement, intervention sous 48 h.',
  icons: { icon: '/logo-lvi.svg' },
  openGraph: { type: 'website', locale: 'fr_FR', siteName: 'LED Visual Innovation' },
  robots: { index: false, follow: false },
};

export const viewport = {
  themeColor: '#fcfcfc',
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
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=Figtree:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-paper"
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
