import './globals.css'

export const metadata = {
  title: 'Scrambord',
  siteName: 'Scrambord',
  applicationName: 'Scrambord',
  description: 'The Wordy Tiles Game.',
  keywords: ['Tile', 'Board', 'Game'],
  creator: 'Galtz',
  type: 'website',
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
  },
  other: { "google-site-verification":"5kt4kg5_0GmlZgd9sais5GZR7IevVrZAeqbGPsH7LUY"}
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className=' overflow-clip'>
      <body className=' relative w-screen h-screen dark:bg-stone-950 bg-stone-50 scrollbar-hide overflow-clip'>{children}</body>
    </html>
  )
}
