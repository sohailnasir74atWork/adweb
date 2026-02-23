import { fetchPostsServer } from '@/lib/data/posts';
import { FeedPageClient } from './FeedPageClient';

export const metadata = {
  title: 'Adopt Me Feed — Community Posts & Designs',
  description:
    'Browse the Adopt Me community feed. Share designs, trade screenshots, and connect with other players.',
};

export const revalidate = 300; // ISR: 5 minutes

export default async function FeedPage() {
  const initialPosts = await fetchPostsServer(5);

  return <FeedPageClient initialPosts={initialPosts} />;
}
