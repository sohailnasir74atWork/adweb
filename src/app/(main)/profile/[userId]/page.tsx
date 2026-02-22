import { PublicProfileClient } from './PublicProfileClient';

export const metadata = {
  title: 'User Profile — Adopt Me Values',
  description: 'View this trader\'s profile, trades, and posts on Adopt Me Values.',
};

export default function PublicProfilePage() {
  return <PublicProfileClient />;
}
