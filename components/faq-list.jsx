import Accordion from './accordion';
import { faq } from '@/lib/content';

export default function FaqList() {
  return <Accordion items={faq} />;
}
