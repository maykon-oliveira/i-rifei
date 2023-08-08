import Providers from "./providers";
import "~/styles/globals.css";

import { Roboto } from 'next/font/google';
import dynamic from "next/dynamic";

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
  // TODO: https://github.com/nextauthjs/next-auth/issues/1582
  // const GoogleOneTap = dynamic(() => import('~/components/google-one-tap'), {
  //   ssr: false
  // })

  return (
    <html lang="en" className={font.className}>
      <body>
        <Providers>
          {/* <GoogleOneTap clientId={process.env.GOOGLE_CLIENT_ID as string} /> */}
          {children}
        </Providers>
      </body>
    </html>
  )
}
