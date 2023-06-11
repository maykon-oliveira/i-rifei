import Link from "next/link";
import Providers from "./providers";
import "~/styles/globals.css";

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
    <html lang="en">
      <body>
        <div className="navbar bg-base-100 shadow-md">
          <Link href="/" className="btn btn-ghost normal-case text-xl">I-Rifei</Link>
        </div>
        <main className="container mx-auto flex min-h-screen flex-col">
          <Providers>
            {children}
          </Providers>
        </main>
      </body>
    </html>
  )
}
