import { ChatPageClient } from './ChatPageClient';

export const metadata = {
  title: 'Adopt Me Chat — Talk with Traders',
  description:
    'Chat with other Adopt Me players in real-time. Join group chats or send private messages.',
};

export default function ChatPage() {
  return <ChatPageClient />;
}
