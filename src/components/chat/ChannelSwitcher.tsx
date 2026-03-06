'use client';

import { useMemo } from 'react';
import { CHAT_CHANNELS, type ChatChannel } from '@/lib/constants/chatChannels';
import { cn } from '@/lib/utils';

interface ChannelSwitcherProps {
    activeChannelId: string;
    onChannelChange: (channel: ChatChannel) => void;
}

export function ChannelSwitcher({ activeChannelId, onChannelChange }: ChannelSwitcherProps) {
    // Reorder: active channel first, then the rest
    const orderedChannels = useMemo(() => {
        const idx = CHAT_CHANNELS.findIndex((c) => c.id === activeChannelId);
        if (idx <= 0) return CHAT_CHANNELS;
        return [CHAT_CHANNELS[idx], ...CHAT_CHANNELS.slice(0, idx), ...CHAT_CHANNELS.slice(idx + 1)];
    }, [activeChannelId]);

    return (
        <div className="flex flex-wrap gap-1 lg:gap-1.5 px-2 lg:px-3 py-1.5 lg:py-2 border-b">
            {orderedChannels.map((channel) => {
                const isActive = channel.id === activeChannelId;
                return (
                    <button
                        key={channel.id}
                        onClick={() => onChannelChange(channel)}
                        className={cn(
                            'flex items-center gap-1 lg:gap-1.5 px-2 lg:px-3 py-1 lg:py-1.5 rounded-full text-[10px] lg:text-xs font-medium whitespace-nowrap transition-all border flex-shrink-0',
                            isActive
                                ? 'bg-app-primary text-white border-app-primary shadow-sm shadow-app-primary/25'
                                : 'bg-transparent text-muted-foreground border-border hover:bg-accent hover:text-foreground',
                        )}
                    >
                        <span className="text-xs lg:text-sm">{channel.flag}</span>
                        {channel.label}
                    </button>
                );
            })}
        </div>
    );
}
