import './globals.css'
export const metadata = {
  title: 'Scrambord',
  description: "The Wordy Tile's Game",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className=' relative w-screen h-screen dark:bg-stone-950 bg-stone-50 scrollbar-hide overflow-hidden'>{children}</body>
    </html>
  )
}
