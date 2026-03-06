export const config = {
  appName: 'Adopt Me Values Calculator',
  domain: 'https://www.adoptmevalues.app',
  supportEmail: 'thesolanalabs@gmail.com',

  // Firebase
  cloudFunctionsUrl: 'https://us-central1-adoptme-7b50c.cloudfunctions.net',

  // CDN
  cdnBaseUrl: 'https://adoptme.b-cdn.net',
  petDataUrl: 'https://adoptme.b-cdn.net',
  tradeAnalyticsUrl: 'https://analytics.b-cdn.net',
  valueChangesUrl: 'https://check-diff-adoptme.b-cdn.net/diff.json',

  // App Links
  androidLink: 'https://play.google.com/store/apps/details?id=com.adoptmevaluescalc&hl=en',
  iosLink: 'https://apps.apple.com/us/app/adoptme-values/id6745400111',

  // Theme Colors
  colors: {
    primary: '#ff6666',
    secondary: '#3E8BFC',
    hasBlock: 'rgb(255, 102, 102)',
    wantBlock: '#66b266',
    backgroundLight: '#f2f2f7',
    backgroundDark: '#121212',
    tabActiveLight: '#f3d0c7',
    tabActiveDark: '#5c4c49',
  },

  // Cache durations (ms)
  cache: {
    petData: 3 * 60 * 1000,           // 3 minutes
    analytics: 3 * 60 * 60 * 1000,    // 3 hours
    valueChanges: 1 * 60 * 60 * 1000, // 1 hour
    serverLink: 3 * 60 * 60 * 1000,   // 3 hours
  },

  // Admin emails
  adminEmails: [
    'thesolanalabs@gmail.com',
    'sohailnasir74business@gmail.com',
    'sohailnasir74@gmail.com',
  ],

  // Supported locales
  locales: ['en', 'es', 'fr', 'de', 'ar'] as const,
  defaultLocale: 'en' as const,
} as const;

export type Locale = (typeof config.locales)[number];
