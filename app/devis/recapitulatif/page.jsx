import { Suspense } from 'react';
import QuoteSummary from '@/components/quote-summary';

export const metadata = {
  title: 'Récapitulatif de configuration',
  description:
    'Document récapitulatif de votre configuration d’écran LED : dimensions, définition, fourchette budgétaire et retour sur investissement.',
  robots: { index: false },
};

export default function RecapitulatifPage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh]" />}>
      <QuoteSummary />
    </Suspense>
  );
}
