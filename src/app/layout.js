import './globals.css'

export const metadata = {
  title: 'Scrambord',
  description: "The Wordy Tile's Game",
  other: { "google-site-verification":"5kt4kg5_0GmlZgd9sais5GZR7IevVrZAeqbGPsH7LUY"}
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className=' overflow-clip'>
      <body className=' relative w-screen h-screen dark:bg-stone-950 bg-stone-50 scrollbar-hide overflow-clip'>{children}</body>
    </html>
  )
}
