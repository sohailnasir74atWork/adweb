import { DMPageClient } from './DMPageClient';

export const metadata = {
  title: 'Private Message — Adopt Me Chat',
  description: 'Send a private message to another Adopt Me player.',
};

export default function DMPage() {
  return <DMPageClient />;
}
