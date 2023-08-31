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
        <meta name="google-site-verification" content="VERIFICATION_ID" />
      </Head>
      <body className=' relative w-screen h-screen dark:bg-stone-950 bg-stone-50 scrollbar-hide overflow-clip'>{children}</body>
    </html>
  )
}
