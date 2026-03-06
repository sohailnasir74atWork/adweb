// Language-based community chat channels — matches sibling RN app's CHANNELS in Trader.jsx
export interface ChatChannel {
    id: string;
    label: string;
    flag: string;
    path: string; // RTDB node path
}

export const CHAT_CHANNELS: ChatChannel[] = [
    { id: 'en', label: 'English', flag: '🇺🇸', path: 'chat_new' },
    { id: 'es', label: 'Español', flag: '🇪🇸', path: 'chat_es' },
    { id: 'pt', label: 'Português', flag: '🇧🇷', path: 'chat_pt' },
    { id: 'fr', label: 'Français', flag: '🇫🇷', path: 'chat_fr' },
    { id: 'de', label: 'Deutsch', flag: '🇩🇪', path: 'chat_de' },
    { id: 'tr', label: 'Türkçe', flag: '🇹🇷', path: 'chat_tr' },
    { id: 'ar', label: 'العربية', flag: '🇸🇦', path: 'chat_ar' },
    { id: 'ja', label: '日本語', flag: '🇯🇵', path: 'chat_ja' },
    { id: 'ko', label: '한국어', flag: '🇰🇷', path: 'chat_ko' },
    { id: 'ru', label: 'Русский', flag: '🇷🇺', path: 'chat_ru' },
];

/**
 * Convert a web roomId to its RTDB path.
 * 'community'    → 'chat_new'
 * 'community_es' → 'chat_es'
 * 'community_fr' → 'chat_fr'
 * For non-community rooms, returns group_messages path.
 */
export function getCommunityChannelPath(roomId: string): string | null {
    if (roomId === 'community') return 'chat_new';
    const match = roomId.match(/^community_(.+)$/);
    if (!match) return null;
    const channel = CHAT_CHANNELS.find((c) => c.id === match[1]);
    return channel?.path ?? null;
}

/**
 * Build a web roomId from a channel id.
 * 'en' → 'community'
 * 'es' → 'community_es'
 */
export function channelToRoomId(channelId: string): string {
    return channelId === 'en' ? 'community' : `community_${channelId}`;
}

/** Check if a roomId is any community channel */
export function isCommunityRoom(roomId: string): boolean {
    return getCommunityChannelPath(roomId) !== null;
}
