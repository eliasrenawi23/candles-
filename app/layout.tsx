// This minimal layout is required to satisfy Next.js requirements.
// The actual layout is defined in app/[locale]/layout.tsx.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
