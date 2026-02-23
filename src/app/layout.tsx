// Root layout is minimal — locale-specific layout is at [locale]/layout.tsx
// This file exists only as a passthrough for Next.js
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
