import Providers from "./providers";
import "~/styles/globals.css";
import Navbar from "./navbar";

import { Roboto } from 'next/font/google';

const font = Roboto({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: {
    template: 'I-Rifei | %s',
    default: 'Home',
  },
  description: 'Descubra um mundo de sorteios empolgantes.',
  keywords: ['rifa', 'sorteio'],
  authors: [{ name: 'Maykon Oliveira', url: 'https://github.com/maykon-oliveira' }],
  applicationName: 'I-Rifei',
  category: 'market',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={font.className}>
      <body>
        <Providers>
          <Navbar />
          <main className="container mx-auto flex min-h-screen flex-col">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}
