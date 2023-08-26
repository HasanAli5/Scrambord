import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Scrambord',
  description: "The Wordy Tile's Game",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='w-screen h-screen dark:bg-stone-950 bg-stone-50 scrollbar-hide'>{children}</body>
    </html>
  )
}
