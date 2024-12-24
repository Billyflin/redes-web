'use client'

import { useState } from 'react'
import Arquitectura from './components/Arquitectura'
import Mail from './components/Mail'
import StreamingDescargas from './components/StreamingDescargas'
import GitHubPages from './components/GitHubPages'
import { Button } from "@/components/ui/button"
import { Network, MailIcon, Play, Github } from 'lucide-react'
import ThemeSwitcher from "@/app/components/ThemeSwitcher"

const sections = [
  { name: 'Arquitectura', component: Arquitectura, icon: Network },
  { name: 'Mail', component: Mail, icon: MailIcon },
  { name: 'Streaming y Descargas', component: StreamingDescargas, icon: Play },
  { name: 'GitHub Pages', component: GitHubPages, icon: Github },
]

export default function Home() {
  const [activeSection, setActiveSection] = useState('Arquitectura')

  const ActiveComponent =
    sections.find((section) => section.name === activeSection)?.component || Arquitectura

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white shadow-md">
        <div className="mx-auto max-w-screen-2xl px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Taller de Redes
          </h1>
          <ThemeSwitcher />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <div className="mx-auto max-w-screen-2xl py-6 sm:px-6 lg:px-8">
          {/* Navigation Buttons */}
          <div className="px-4 py-6 sm:px-0">
            <div className="mb-6 flex flex-wrap gap-2">
              {sections.map((section) => (
                <Button
                  key={section.name}
                  onClick={() => setActiveSection(section.name)}
                  variant={activeSection === section.name ? "default" : "outline"}
                  className="flex items-center px-4 py-2 text-sm"
                >
                  <section.icon className="mr-2 h-4 w-4" />
                  {section.name}
                </Button>
              ))}
            </div>

            {/* Active Section */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <ActiveComponent />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
