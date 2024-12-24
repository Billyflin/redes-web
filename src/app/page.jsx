"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, Play, FileText, Network } from 'lucide-react'
import WebmailSection from '@/components/WebmailSection'
import StreamingSection from '@/components/StreamingSection'
import ReportSection from '@/components/ReportSection'
import ArchitectureSection from '@/components/ArchitectureSection'

export default function TallerDeRedes() {
  const [activeTab, setActiveTab] = useState("webmail")

  return (
    (<div
      className="container mx-auto p-4 min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <motion.h1
        className="text-5xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}>
        Proyecto Taller de Redes
      </motion.h1>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="webmail" className="flex items-center justify-center">
            <Mail className="mr-2 h-4 w-4" />
            Webmail
          </TabsTrigger>
          <TabsTrigger value="streaming" className="flex items-center justify-center">
            <Play className="mr-2 h-4 w-4" />
            Streaming
          </TabsTrigger>
          <TabsTrigger value="report" className="flex items-center justify-center">
            <FileText className="mr-2 h-4 w-4" />
            Informe
          </TabsTrigger>
          <TabsTrigger value="architecture" className="flex items-center justify-center">
            <Network className="mr-2 h-4 w-4" />
            Arquitectura
          </TabsTrigger>
        </TabsList>
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}>
          <TabsContent value="webmail">
            <WebmailSection />
          </TabsContent>
          <TabsContent value="streaming">
            <StreamingSection />
          </TabsContent>
          <TabsContent value="report">
            <ReportSection />
          </TabsContent>
          <TabsContent value="architecture">
            <ArchitectureSection />
          </TabsContent>
        </motion.div>
      </Tabs>
    </div>)
  );
}

