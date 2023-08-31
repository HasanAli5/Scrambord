import './globals.css'
import Head from 'next/head'
export const metadata = {
  title: 'Scrambord',
  description: "The Wordy Tile's Game",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className=' overflow-clip'>
      <Head>
        <meta name="google-site-verification" content="5kt4kg5_0GmlZgd9sais5GZR7IevVrZAeqbGPsH7LUY" />
      </Head>
      <body className=' relative w-screen h-screen dark:bg-stone-950 bg-stone-50 scrollbar-hide overflow-clip'>{children}</body>
    </html>
  )
}
