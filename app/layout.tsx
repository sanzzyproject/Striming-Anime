import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Navbar } from '@/components/Navbar';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'WibuFinal',
  description: 'Watch anime full episodes directly.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-[#050505] text-[#e0e0e0] font-sans flex flex-col`} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} forcedTheme="dark">
          <Navbar />
          <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </main>
          <footer className="border-t border-white/10 py-6 mt-10">
            <div className="max-w-7xl mx-auto px-4 text-center text-sm text-white/40">
              © {new Date().getFullYear()} WibuFinal. Not affiliated with any services.
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
