import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Proyecto de Infraestructura Tecnológica',
  description: 'Documentación de configuración y despliegue de infraestructura utilizando servicios modernos',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="h-full bg-gray-100">
      <body className={`${inter.className} h-full`}>
        <div className="min-h-full">
          {children}
        </div>
      </body>
    </html>
  )
}

