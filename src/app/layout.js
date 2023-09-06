import './globals.css'
import { Analytics } from '@vercel/analytics/react';
export const metadata = {
  title: 'Scrambord',
  applicationName: 'Scrambord',
  description: 'Place words on the board to stay in the game. Check back every day for the daily puzzle. Try to climb the daily leaderboard.',
  keywords: ['Tile', 'Board', 'Game'],
  creator: 'Galtz',
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
    icons: {
      icon: '/favicon.ico',
    },
    openGraph: {
      title: 'Scrambord',
      description: 'Place Words on the Board to stay in the Game.',
      url: 'https://scrambord.page/',
      siteName: 'Scrambord',
      images: [
        {
          url: 'https://scrambord.page/icon.png',
          width: 256,
          height: 256,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
  },
  other: { "google-site-verification":"5kt4kg5_0GmlZgd9sais5GZR7IevVrZAeqbGPsH7LUY"}
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className=' overflow-clip'>
      <body className=' relative w-screen h-screen dark:bg-stone-950 bg-stone-50 scrollbar-hide overflow-clip'>
        {children}
        <Analytics/>
      </body>
    </html>
  )
}
