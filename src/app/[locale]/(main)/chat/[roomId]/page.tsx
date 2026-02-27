import { ChatRoomPageClient } from './ChatRoomPageClient';

export const metadata = {
  title: 'Group Chat — Adopt Me Chat',
  description: 'Chat with Adopt Me traders in this group chat room.',
  robots: { index: false, follow: false },
};

export default function ChatRoomPage() {
  return <ChatRoomPageClient />;
}
