'use client'

import { useState } from 'react'
import { Network, MailIcon, Play, Github } from 'lucide-react'

import { Button } from "@/components/ui/button"
import Arquitectura from '@/app/components/Arquitectura'
import Mail from '@/app/components/Mail'
import StreamingDescargas from '@/app/components/StreamingDescargas'
import GitHubPages from '@/app/components/GitHubPages'
import {Header} from "@/app/components/Header";

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
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-6">
          <nav className="flex flex-wrap gap-2 mb-6">
            {sections.map((section) => (
              <Button
                key={section.name}
                onClick={() => setActiveSection(section.name)}
                variant={activeSection === section.name ? "default" : "outline"}
                className="flex items-center"
              >
                <section.icon className="mr-2 h-4 w-4" />
                {section.name}
              </Button>
            ))}
          </nav>

          <div className="bg-card text-card-foreground p-8 rounded-lg shadow-md">
            {ActiveComponent && <ActiveComponent />}
          </div>
        </div>
      </main>
    </div>
  )
}

