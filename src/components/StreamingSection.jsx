import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"

export default function StreamingSection() {
  const [expandedStep, setExpandedStep] = useState(null)

  const steps = [
    { id: "software", title: "Selección del software", description: "Elección e instalación del software de streaming (por ejemplo, OBS Studio)" },
    { id: "server", title: "Configuración del servidor", description: "Configuración del servidor para manejar streams (por ejemplo, Nginx-RTMP)" },
    { id: "dns", title: "Configuración de DNS", description: "Configuración de los registros DNS para stream.andreavet.cl" },
    { id: "optimize", title: "Optimización", description: "Ajuste de la calidad del stream y configuración del ancho de banda" },
  ]

  const errors = [
    { title: "Problemas de latencia", solution: "Ajustar la configuración del buffer" },
    { title: "Caídas de conexión", solution: "Verificar la estabilidad de la red" },
    { title: "Baja calidad de video", solution: "Revisar la configuración de codificación" },
  ]

  return (
    (<Card>
      <CardHeader>
        <CardTitle className="text-2xl">Servidor de Streaming</CardTitle>
        <CardDescription>
          Alojado en <a
          href="https://stream.andreavet.cl"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline">stream.andreavet.cl</a>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <h3 className="text-xl font-semibold mb-4">Pasos de Implementación</h3>
        <div className="space-y-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}>
              <Card
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setExpandedStep(expandedStep === step.id ? null : step.id)}>
                <CardHeader className="p-4">
                  <CardTitle className="text-lg flex items-center">
                    <Badge variant="outline" className="mr-2">{index + 1}</Badge>
                    {step.title}
                  </CardTitle>
                </CardHeader>
                {expandedStep === step.id && (
                  <CardContent className="p-4 pt-0">
                    <p>{step.description}</p>
                  </CardContent>
                )}
              </Card>
            </motion.div>
          ))}
        </div>

        <h3 className="text-xl font-semibold mt-8 mb-4">Errores Comunes y Soluciones</h3>
        <Accordion type="single" collapsible className="w-full">
          {errors.map((error, index) => (
            <AccordionItem key={index} value={`error-${index}`}>
              <AccordionTrigger>{error.title}</AccordionTrigger>
              <AccordionContent>{error.solution}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>)
  );
}

