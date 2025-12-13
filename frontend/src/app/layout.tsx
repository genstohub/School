// app/layout.tsx
import './globals.css';
import { ReactNode } from 'react';
import { AuthProvider } from '@/context/AuthContext'; // <-- Import

export const metadata = {
  title: 'Prep',
  description: 'Smart learning platform'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider> {/* <-- Wrap everything */}
      </body>
    </html>
  );
}
