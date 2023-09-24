import './globals.css'
import '@/style/header/Header.css'
import { Open_Sans } from "next/font/google"
import type { Metadata } from 'next'
import Providers from "./providers"
import Header from '@/components/header/Header'

export const metadata: Metadata = {
  title: 'Leave Days',
  description: 'Employess must stay on course.',
}

const openSans = Open_Sans({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body style={openSans.style}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  )
}
