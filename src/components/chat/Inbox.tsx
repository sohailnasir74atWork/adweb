'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { onChatMetaData } from '@/lib/firebase/database';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { PetImage } from '@/components/shared/PetImage';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Inbox as InboxIcon, LogIn } from 'lucide-react';
import type { ChatMetaData } from '@/lib/types/chat';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export function Inbox() {
    const user = useAuthStore((s) => s.user);
    const [chats, setChats] = useState<ChatMetaData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!user?.id) {
            setChats([]);
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        const unsub = onChatMetaData(user.id, (data) => {
            setChats(data);
            setIsLoading(false);
        });

        return () => unsub();
    }, [user?.id]);

    if (!user) {
        return (
            <div className="flex flex-col p-3">
                <div className="flex items-center gap-1.5 mb-3">
                    <InboxIcon className="h-4 w-4 text-app-primary" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Inbox
                    </h3>
                </div>
                <div className="flex flex-col items-center py-6 gap-2">
                    <p className="text-xs text-muted-foreground text-center">Sign in to see your messages</p>
                    <Link
                        href="/login"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-app-primary hover:underline"
                    >
                        <LogIn className="h-3 w-3" />
                        Sign In
                    </Link>
                </div>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="flex flex-col gap-2 p-3">
                <Skeleton className="h-5 w-16 mb-2" />
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-2">
                        <Skeleton className="h-9 w-9 rounded-full" />
                        <div className="flex-1">
                            <Skeleton className="h-3.5 w-20 mb-1" />
                            <Skeleton className="h-3 w-28" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="flex flex-col p-3">
            <div className="flex items-center gap-1.5 mb-3">
                <InboxIcon className="h-4 w-4 text-app-primary" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Inbox
                </h3>
                {chats.length > 0 && (
                    <span className="text-[10px] text-muted-foreground ml-auto">{chats.length}</span>
                )}
            </div>

            {chats.length === 0 ? (
                <div className="flex flex-col items-center py-6 gap-1">
                    <p className="text-xs text-muted-foreground text-center">No conversations yet</p>
                    <p className="text-[10px] text-muted-foreground text-center">
                        Search for users to start chatting
                    </p>
                </div>
            ) : (
                <div className="flex flex-col gap-0.5">
                    {chats.map((chat) => (
                        <Link
                            key={chat.receiverId}
                            href={`/chat/dm/${chat.receiverId}`}
                            className="flex items-center gap-2.5 rounded-lg px-2 py-2 hover:bg-accent/60 transition-colors group"
                        >
                            {/* Avatar */}
                            <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold overflow-hidden flex-shrink-0">
                                {chat.receiverAvatar ? (
                                    <PetImage src={chat.receiverAvatar} alt={chat.receiverName} size={36} />
                                ) : (
                                    chat.receiverName?.charAt(0)?.toUpperCase() || '?'
                                )}
                            </div>

                            {/* Text */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1.5">
                                    <p className="text-xs font-semibold truncate group-hover:text-app-primary transition-colors">
                                        {chat.receiverName || 'Anonymous'}
                                    </p>
                                    {chat.timestamp > 0 && (
                                        <span className="text-[9px] text-muted-foreground ml-auto flex-shrink-0">
                                            {dayjs(chat.timestamp).fromNow(true)}
                                        </span>
                                    )}
                                </div>
                                <p className="text-[11px] text-muted-foreground truncate">
                                    {chat.lastMessage || 'No messages yet'}
                                </p>
                            </div>

                            {/* Unread badge */}
                            {(chat.unreadCount ?? 0) > 0 && (
                                <Badge className="bg-app-primary text-white text-[8px] py-0 px-1.5 min-w-[18px] justify-center flex-shrink-0">
                                    {chat.unreadCount > 99 ? '99+' : chat.unreadCount}
                                </Badge>
                            )}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
