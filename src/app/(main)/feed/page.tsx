import { FeedPageClient } from './FeedPageClient';

export const metadata = {
  title: 'Adopt Me Feed — Community Posts & Designs',
  description:
    'Browse the Adopt Me community feed. Share designs, trade screenshots, and connect with other players.',
};

export default function FeedPage() {
  return <FeedPageClient />;
}
