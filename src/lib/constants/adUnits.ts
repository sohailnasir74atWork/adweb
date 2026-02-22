export const AD_UNITS = {
  headerBanner: 'your-ad-slot-header',
  inFeed: 'your-ad-slot-infeed',
  sidebar: 'your-ad-slot-sidebar',
  belowCalculator: 'your-ad-slot-below-calc',
} as const;

export const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || '';
